#!/usr/bin/env swift

import Foundation
import AppKit
import PDFKit

struct PairRow: Decodable {
    struct Bridge: Decodable {
        struct OrganizedCandidate: Decodable {
            let country: String
            let name: String
            let path: String
            let score: Int
        }

        let rawTitle: String
        let rawSlug: String
        let rawCountry: String
        let rawSourcePath: String
        let rawScore: Int
        let organisedCandidates: [OrganizedCandidate]
    }

    let sampleName: String
    let samplePath: String
    let sampleSize: Int
    let bridges: [Bridge]
}

struct MatchReport: Encodable {
    let sampleName: String
    let samplePath: String
    let outputPath: String?
    let matchedReference: String?
    let country: String?
    let similarityScore: Double?
    let maskCount: Int
    let status: String
    let note: String?
}

let pairManifestPath = "/Users/vickyjian/Desktop/precise-sample-pairs.json"
let organisedRoot = "/Users/vickyjian/Desktop/orgnised samples"
let outputRoot = "/Users/vickyjian/Desktop/EGS precise redacted samples lib"
let watermarkText = "EGS AUSTRALIA Eliteglobalsolutions.co"
let watermarkAlpha: CGFloat = 0.16
let watermarkAngle: CGFloat = 32
let renderDPI: CGFloat = 160
let matchDPI: CGFloat = 72

func loadPairs() throws -> [PairRow] {
    let data = try Data(contentsOf: URL(fileURLWithPath: pairManifestPath))
    return try JSONDecoder().decode([PairRow].self, from: data)
}

func sanitizeName(_ value: String) -> String {
    return value.replacingOccurrences(of: "[\\\\/:*?\"<>|]+", with: " ", options: .regularExpression)
        .replacingOccurrences(of: "\\s+", with: " ", options: .regularExpression)
        .trimmingCharacters(in: .whitespacesAndNewlines)
}

func inferCountry(from pair: PairRow) -> String {
    if let bridge = pair.bridges.first {
        return bridge.rawCountry
    }
    return "unmatched"
}

func collectOrganisedCandidates(for pair: PairRow) -> [String] {
    var seen = Set<String>()
    var paths: [String] = []

    for bridge in pair.bridges {
        for candidate in bridge.organisedCandidates where seen.insert(candidate.path).inserted {
            paths.append(candidate.path)
        }
    }

    if !paths.isEmpty {
        return paths
    }

    let country = inferCountry(from: pair).lowercased()
    let fm = FileManager.default
    guard let countryDir = try? fm.contentsOfDirectory(atPath: organisedRoot).first(where: { $0.lowercased().replacingOccurrences(of: " ", with: "-") == country.replacingOccurrences(of: " ", with: "-") || $0.lowercased() == country }) else {
        return []
    }

    let dir = URL(fileURLWithPath: organisedRoot).appendingPathComponent(countryDir)
    guard let files = try? fm.contentsOfDirectory(at: dir, includingPropertiesForKeys: nil) else {
        return []
    }
    return files.filter { $0.pathExtension.lowercased() == "pdf" }.map(\.path)
}

func renderPage(_ page: PDFPage, dpi: CGFloat) -> NSImage? {
    let media = page.bounds(for: .mediaBox)
    let scale = dpi / 72.0
    let width = max(1, Int((media.width * scale).rounded()))
    let height = max(1, Int((media.height * scale).rounded()))

    guard let colorSpace = CGColorSpace(name: CGColorSpace.sRGB),
          let ctx = CGContext(
            data: nil,
            width: width,
            height: height,
            bitsPerComponent: 8,
            bytesPerRow: 0,
            space: colorSpace,
            bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue
          ) else {
        return nil
    }

    ctx.setFillColor(NSColor.white.cgColor)
    ctx.fill(CGRect(x: 0, y: 0, width: width, height: height))
    ctx.saveGState()
    ctx.scaleBy(x: scale, y: scale)
    page.draw(with: .mediaBox, to: ctx)
    ctx.restoreGState()

    guard let cg = ctx.makeImage() else { return nil }
    return NSImage(cgImage: cg, size: media.size)
}

func bitmapRep(from image: NSImage) -> NSBitmapImageRep? {
    guard let tiff = image.tiffRepresentation else { return nil }
    return NSBitmapImageRep(data: tiff)
}

func grayscaleSignature(for image: NSImage, dimension: Int = 32) -> [Double]? {
    guard let rep = bitmapRep(from: image) else { return nil }
    guard let small = NSBitmapImageRep(
        bitmapDataPlanes: nil,
        pixelsWide: dimension,
        pixelsHigh: dimension,
        bitsPerSample: 8,
        samplesPerPixel: 4,
        hasAlpha: true,
        isPlanar: false,
        colorSpaceName: .deviceRGB,
        bytesPerRow: 0,
        bitsPerPixel: 0
    ) else { return nil }

    NSGraphicsContext.saveGraphicsState()
    let ctx = NSGraphicsContext(bitmapImageRep: small)
    NSGraphicsContext.current = ctx
    NSColor.white.setFill()
    NSBezierPath(rect: NSRect(x: 0, y: 0, width: dimension, height: dimension)).fill()
    rep.draw(in: NSRect(x: 0, y: 0, width: dimension, height: dimension))
    ctx?.flushGraphics()
    NSGraphicsContext.restoreGraphicsState()

    var values: [Double] = []
    for y in 0..<dimension {
      for x in 0..<dimension {
        guard let color = small.colorAt(x: x, y: y)?.usingColorSpace(.deviceRGB) else {
          values.append(255)
          continue
        }
        let gray = (Double(color.redComponent) + Double(color.greenComponent) + Double(color.blueComponent)) / 3.0
        values.append(gray * 255.0)
      }
    }
    return values
}

func signatureDistance(_ a: [Double], _ b: [Double]) -> Double {
    guard a.count == b.count else { return Double.greatestFiniteMagnitude }
    let total = zip(a, b).reduce(0.0) { partial, pair in
        partial + abs(pair.0 - pair.1)
    }
    return total / Double(a.count)
}

func bestReference(for samplePath: String, candidates: [String]) -> (String, Double)? {
    let sampleURL = URL(fileURLWithPath: samplePath)
    guard let sampleDoc = PDFDocument(url: sampleURL), let samplePage = sampleDoc.page(at: 0), let sampleImage = renderPage(samplePage, dpi: matchDPI), let sampleSig = grayscaleSignature(for: sampleImage) else {
        return nil
    }

    var best: (String, Double)?
    for candidate in candidates {
        let url = URL(fileURLWithPath: candidate)
        guard let doc = PDFDocument(url: url), let page = doc.page(at: 0), let image = renderPage(page, dpi: matchDPI), let sig = grayscaleSignature(for: image) else {
            continue
        }
        let pagePenalty = abs(sampleDoc.pageCount - doc.pageCount) * 20
        let score = signatureDistance(sampleSig, sig) + Double(pagePenalty)
        if best == nil || score < best!.1 {
            best = (candidate, score)
        }
    }
    return best
}

func diffMasks(original: NSBitmapImageRep, reference: NSBitmapImageRep) -> [CGRect] {
    let width = min(original.pixelsWide, reference.pixelsWide)
    let height = min(original.pixelsHigh, reference.pixelsHigh)
    var bands: [(Int, Int)] = []
    var currentStart: Int?

    func brightness(_ rep: NSBitmapImageRep, _ x: Int, _ y: Int) -> Double {
        guard let color = rep.colorAt(x: x, y: y)?.usingColorSpace(.deviceRGB) else { return 255 }
        return ((Double(color.redComponent) + Double(color.greenComponent) + Double(color.blueComponent)) / 3.0) * 255.0
    }

    for y in 0..<height {
        var strongCount = 0
        for x in stride(from: 0, to: width, by: 3) {
            let o = brightness(original, x, y)
            let r = brightness(reference, x, y)
            if r > 242 && (r - o) > 48 {
                strongCount += 1
            }
        }
        let isBand = strongCount > max(12, width / 45)
        if isBand {
            if currentStart == nil { currentStart = y }
        } else if let start = currentStart {
            if y - start > 6 {
                bands.append((start, y - 1))
            }
            currentStart = nil
        }
    }

    if let start = currentStart {
        bands.append((start, height - 1))
    }

    var rects: [CGRect] = []
    for (startY, endY) in bands {
        var currentStartX: Int?
        for x in 0..<width {
            var strongCount = 0
            for y in stride(from: startY, through: endY, by: 2) {
                let o = brightness(original, x, y)
                let r = brightness(reference, x, y)
                if r > 242 && (r - o) > 48 {
                    strongCount += 1
                }
            }
            let isColumn = strongCount > max(3, (endY - startY) / 5)
            if isColumn {
                if currentStartX == nil { currentStartX = x }
            } else if let startX = currentStartX {
                if x - startX > 12 {
                    rects.append(CGRect(x: startX, y: startY, width: x - startX, height: endY - startY + 1))
                }
                currentStartX = nil
            }
        }
        if let startX = currentStartX {
            rects.append(CGRect(x: startX, y: startY, width: width - startX, height: endY - startY + 1))
        }
    }

    return rects.filter { $0.width > 24 && $0.height > 10 }
}

func addWatermark(on size: NSSize) {
    let fontSize = max(22.0, size.width * 0.032)
    let attrs: [NSAttributedString.Key: Any] = [
        .font: NSFont.systemFont(ofSize: fontSize, weight: .semibold),
        .foregroundColor: NSColor(calibratedWhite: 0.35, alpha: watermarkAlpha)
    ]
    let text = NSString(string: watermarkText)
    let textSize = text.size(withAttributes: attrs)
    let stepX = max(220.0, textSize.width * 0.65)
    let stepY = max(170.0, textSize.height * 3.0)

    var y = -textSize.height * 2.0
    while y < size.height + textSize.height * 2.0 {
        var x = -textSize.width * 1.5
        while x < size.width + textSize.width * 1.5 {
            NSGraphicsContext.saveGraphicsState()
            let t = NSAffineTransform()
            t.translateX(by: x, yBy: y)
            t.rotate(byDegrees: watermarkAngle)
            t.concat()
            text.draw(at: .zero, withAttributes: attrs)
            NSGraphicsContext.restoreGraphicsState()
            x += stepX
        }
        y += stepY
    }
}

func applyMasksAndWatermark(image: NSImage, rects: [CGRect]) -> NSImage? {
    let size = image.size
    let out = NSImage(size: size)
    out.lockFocus()
    defer { out.unlockFocus() }

    NSColor.white.setFill()
    NSBezierPath(rect: NSRect(origin: .zero, size: size)).fill()
    image.draw(in: NSRect(origin: .zero, size: size), from: .zero, operation: .sourceOver, fraction: 1.0)

    NSColor.white.setFill()
    for rect in rects {
        let expanded = rect.insetBy(dx: -6, dy: -4)
        NSBezierPath(rect: expanded).fill()
    }
    addWatermark(on: size)
    return out
}

func buildOutput(for pair: PairRow, referencePath: String) throws -> MatchReport {
    let sampleURL = URL(fileURLWithPath: pair.samplePath)
    let referenceURL = URL(fileURLWithPath: referencePath)
    guard let sampleDoc = PDFDocument(url: sampleURL), let referenceDoc = PDFDocument(url: referenceURL) else {
        return MatchReport(sampleName: pair.sampleName, samplePath: pair.samplePath, outputPath: nil, matchedReference: referencePath, country: inferCountry(from: pair), similarityScore: nil, maskCount: 0, status: "failed", note: "Could not open source or reference PDF")
    }

    let pageCount = min(sampleDoc.pageCount, referenceDoc.pageCount)
    let out = PDFDocument()
    var totalMasks = 0

    for index in 0..<pageCount {
        guard let samplePage = sampleDoc.page(at: index), let refPage = referenceDoc.page(at: index),
              let sampleImage = renderPage(samplePage, dpi: renderDPI), let refImage = renderPage(refPage, dpi: renderDPI),
              let sampleRep = bitmapRep(from: sampleImage), let refRep = bitmapRep(from: refImage) else {
            continue
        }

        let masks = diffMasks(original: sampleRep, reference: refRep)
        totalMasks += masks.count
        guard let redacted = applyMasksAndWatermark(image: sampleImage, rects: masks), let page = PDFPage(image: redacted) else {
            continue
        }
        out.insert(page, at: out.pageCount)
    }

    let country = inferCountry(from: pair)
    let outDir = URL(fileURLWithPath: outputRoot).appendingPathComponent(country, isDirectory: true)
    try FileManager.default.createDirectory(at: outDir, withIntermediateDirectories: true)
    let outputURL = outDir.appendingPathComponent(pair.sampleName)
    if out.write(to: outputURL) == false {
        return MatchReport(sampleName: pair.sampleName, samplePath: pair.samplePath, outputPath: nil, matchedReference: referencePath, country: country, similarityScore: nil, maskCount: totalMasks, status: "failed", note: "Could not write output PDF")
    }

    return MatchReport(sampleName: pair.sampleName, samplePath: pair.samplePath, outputPath: outputURL.path, matchedReference: referencePath, country: country, similarityScore: nil, maskCount: totalMasks, status: totalMasks > 0 ? "built" : "needs-review", note: totalMasks > 0 ? nil : "No mask regions detected from reference")
}

let fm = FileManager.default
let pairs = try loadPairs()
try? fm.removeItem(atPath: outputRoot)
try fm.createDirectory(atPath: outputRoot, withIntermediateDirectories: true)

var reports: [MatchReport] = []
for (index, pair) in pairs.enumerated() {
    print("[\(index + 1)/\(pairs.count)] matching \(pair.sampleName)")
    let candidates = collectOrganisedCandidates(for: pair)
    guard let best = bestReference(for: pair.samplePath, candidates: candidates) else {
        reports.append(MatchReport(sampleName: pair.sampleName, samplePath: pair.samplePath, outputPath: nil, matchedReference: nil, country: inferCountry(from: pair), similarityScore: nil, maskCount: 0, status: "unmatched", note: "No usable organised reference found"))
        continue
    }

    print("  reference: \(best.0)")
    var report = try buildOutput(for: pair, referencePath: best.0)
    report = MatchReport(
        sampleName: report.sampleName,
        samplePath: report.samplePath,
        outputPath: report.outputPath,
        matchedReference: report.matchedReference,
        country: report.country,
        similarityScore: best.1,
        maskCount: report.maskCount,
        status: report.status,
        note: report.note
    )
    reports.append(report)
}

let reportURL = URL(fileURLWithPath: outputRoot).appendingPathComponent("build-report.json")
let encoder = JSONEncoder()
encoder.outputFormatting = [.prettyPrinted, .sortedKeys]
try encoder.encode(reports).write(to: reportURL)

let built = reports.filter { $0.status == "built" }.count
let review = reports.filter { $0.status == "needs-review" }.count
let unmatched = reports.filter { $0.status == "unmatched" }.count
print("outputRoot=\(outputRoot)")
print("built=\(built)")
print("needs-review=\(review)")
print("unmatched=\(unmatched)")
