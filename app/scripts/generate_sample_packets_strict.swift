import Foundation
import AppKit
import PDFKit
import Vision

let args = CommandLine.arguments
if args.count < 3 {
    fputs("Usage: generate_sample_packets_strict.swift <input_dir> <output_dir>\n", stderr)
    exit(1)
}

let inputRoot = URL(fileURLWithPath: args[1], isDirectory: true)
let outputRoot = URL(fileURLWithPath: args[2], isDirectory: true)
let fm = FileManager.default

let supported = Set(["pdf", "png", "jpg", "jpeg", "webp"])
let maxPages = 3
let targetWidth: CGFloat = 1100
let watermarkLine1 = "EGS SAMPLE"
let watermarkLine2 = "Eliteglobalsolutions.co"

typealias Rule = (regex: NSRegularExpression, value: String)

func makeRule(_ pattern: String, _ value: String) -> Rule {
    let regex = try! NSRegularExpression(pattern: pattern, options: [.caseInsensitive])
    return (regex, value)
}

let countryRules: [Rule] = [
    makeRule("(australia|australian|aus|澳洲|澳大利亚|\\bau\\b)", "AU"),
    makeRule("(china|chinese|中国|\\bcn\\b)", "CN"),
    makeRule("(india|印度|\\bin\\b)", "IN"),
    makeRule("(usa|united states|america|美国|\\bus\\b)", "US"),
    makeRule("(canada|加拿大|\\bca\\b)", "CA"),
    makeRule("(philippines|philippine|菲律宾|\\bph\\b)", "PH"),
    makeRule("(vietnam|越南|\\bvn\\b)", "VN"),
    makeRule("(indonesia|印尼|印度尼西亚|\\bid\\b)", "ID"),
    makeRule("(malaysia|马来西亚|\\bmy\\b)", "MY"),
    makeRule("(south africa|南非|\\bza\\b)", "ZA"),
    makeRule("(singapore|新加坡|\\bsg\\b)", "SG"),
    makeRule("(japan|日本|\\bjp\\b)", "JP"),
    makeRule("(korea|韩国|\\bkr\\b)", "KR"),
    makeRule("(uk|united kingdom|britain|england|英国|\\buk\\b)", "UK"),
    makeRule("(germany|德国|\\bde\\b)", "DE"),
    makeRule("(france|法国|\\bfr\\b)", "FR"),
    makeRule("(mexico|墨西哥|\\bmx\\b)", "MX"),
]

let typeRules: [Rule] = [
    makeRule("(birth|出生)", "BIRTH_CERT"),
    makeRule("(marriage|结婚)", "MARRIAGE_CERT"),
    makeRule("(police|无犯罪|犯罪)", "POLICE_CHECK"),
    makeRule("(degree|diploma|毕业|学位)", "DEGREE"),
    makeRule("(transcript|成绩单)", "TRANSCRIPT"),
    makeRule("(passport|护照)", "PASSPORT_COPY"),
    makeRule("(power of attorney|委托书|授权书|poa)", "POA"),
    makeRule("(company|corporate|business|公司|商事)", "CORPORATE_DOC"),
    makeRule("(death|死亡)", "DEATH_CERT"),
    makeRule("(single|同一人|单身|声明)", "DECLARATION"),
    makeRule("(divorce|离婚)", "DIVORCE_DOC"),
]

func detect(_ text: String, rules: [Rule], fallback: String) -> String {
    let ns = text as NSString
    for rule in rules {
        let range = NSRange(location: 0, length: ns.length)
        if rule.regex.firstMatch(in: text, options: [], range: range) != nil {
            return rule.value
        }
    }
    return fallback
}

func ensureDir(_ url: URL) throws {
    try fm.createDirectory(at: url, withIntermediateDirectories: true)
}

func toImageCoord(_ normRect: CGRect, imageSize: CGSize) -> CGRect {
    let x = normRect.origin.x * imageSize.width
    let y = (1.0 - normRect.origin.y - normRect.height) * imageSize.height
    return CGRect(x: x, y: y, width: normRect.width * imageSize.width, height: normRect.height * imageSize.height)
}

func detectSensitiveRects(_ cgImage: CGImage) -> [CGRect] {
    var rects: [CGRect] = []
    let handler = VNImageRequestHandler(cgImage: cgImage, options: [:])

    let textRequest = VNRecognizeTextRequest()
    textRequest.recognitionLevel = .accurate
    textRequest.usesLanguageCorrection = false
    textRequest.minimumTextHeight = 0.004
    textRequest.recognitionLanguages = ["en-US", "zh-Hans", "zh-Hant"]
    textRequest.automaticallyDetectsLanguage = true

    let barcodeRequest = VNDetectBarcodesRequest()
    let faceRequest = VNDetectFaceRectanglesRequest()
    let textBlocksRequest = VNDetectTextRectanglesRequest()
    textBlocksRequest.reportCharacterBoxes = false

    do {
        try handler.perform([textRequest, textBlocksRequest, barcodeRequest, faceRequest])
    } catch {
        return rects
    }

    if let textResults = textRequest.results {
        for obs in textResults { rects.append(obs.boundingBox) }
    }
    if let barcodeResults = barcodeRequest.results {
        for obs in barcodeResults { rects.append(obs.boundingBox) }
    }
    if let faceResults = faceRequest.results {
        for obs in faceResults { rects.append(obs.boundingBox) }
    }
    if let blockResults = textBlocksRequest.results {
        for obs in blockResults { rects.append(obs.boundingBox) }
    }
    return rects
}

func mergeRects(_ rects: [CGRect], threshold: CGFloat = 10) -> [CGRect] {
    guard !rects.isEmpty else { return [] }
    var sorted = rects.sorted { (a, b) in
        if abs(a.minY - b.minY) < threshold { return a.minX < b.minX }
        return a.minY < b.minY
    }
    var merged: [CGRect] = []
    while let first = sorted.first {
        sorted.removeFirst()
        var current = first
        var changed = true
        while changed {
            changed = false
            var remaining: [CGRect] = []
            for r in sorted {
                let expanded = current.insetBy(dx: -threshold, dy: -threshold)
                if expanded.intersects(r) {
                    current = current.union(r)
                    changed = true
                } else {
                    remaining.append(r)
                }
            }
            sorted = remaining
        }
        merged.append(current)
    }
    return merged
}

func drawStrict(_ image: NSImage) -> NSImage {
    let size = image.size
    let out = NSImage(size: size)
    out.lockFocus()
    image.draw(in: NSRect(origin: .zero, size: size))
    guard let ctx = NSGraphicsContext.current?.cgContext else {
        out.unlockFocus()
        return image
    }

    if let tiff = image.tiffRepresentation,
       let rep = NSBitmapImageRep(data: tiff),
       let cg = rep.cgImage {
        let normRects = detectSensitiveRects(cg)
        let imageRects = normRects.map { toImageCoord($0, imageSize: size).insetBy(dx: -26, dy: -14) }
        let merged = mergeRects(imageRects, threshold: 20)

        ctx.setFillColor(NSColor.white.cgColor)
        for r in merged {
            let clipped = r.intersection(CGRect(origin: .zero, size: size))
            if clipped.width > 4, clipped.height > 4 {
                let path = NSBezierPath(roundedRect: clipped, xRadius: 4, yRadius: 4)
                path.fill()
                ctx.setStrokeColor(NSColor(calibratedWhite: 0.86, alpha: 1.0).cgColor)
                ctx.setLineWidth(1.0)
                ctx.stroke(clipped)
            }
        }
    }

    ctx.setFillColor(NSColor.white.cgColor)
    let safetyBands: [CGRect] = [
        CGRect(x: size.width * 0.03, y: size.height * 0.08, width: size.width * 0.94, height: size.height * 0.12),
        CGRect(x: size.width * 0.03, y: size.height * 0.43, width: size.width * 0.94, height: size.height * 0.09),
        CGRect(x: size.width * 0.03, y: size.height * 0.76, width: size.width * 0.94, height: size.height * 0.10),
    ]
    for band in safetyBands {
        let path = NSBezierPath(roundedRect: band, xRadius: 6, yRadius: 6)
        path.fill()
        ctx.setStrokeColor(NSColor(calibratedWhite: 0.84, alpha: 1.0).cgColor)
        ctx.setLineWidth(1.0)
        ctx.stroke(band)
    }

    let bandHeight = size.height * 0.055
    let startY = size.height * 0.12
    let stepY = size.height * 0.10
    var y = startY
    while y < size.height * 0.90 {
        let strip = CGRect(x: size.width * 0.03, y: y, width: size.width * 0.94, height: bandHeight)
        let path = NSBezierPath(roundedRect: strip, xRadius: 5, yRadius: 5)
        path.fill()
        ctx.setStrokeColor(NSColor(calibratedWhite: 0.84, alpha: 1.0).cgColor)
        ctx.setLineWidth(0.9)
        ctx.stroke(strip)
        y += stepY
    }

    let p = NSMutableParagraphStyle()
    p.alignment = .center
    let attrs1: [NSAttributedString.Key: Any] = [
        .font: NSFont.systemFont(ofSize: 28, weight: .bold),
        .foregroundColor: NSColor(calibratedWhite: 0.10, alpha: 0.18),
        .paragraphStyle: p,
    ]
    let attrs2: [NSAttributedString.Key: Any] = [
        .font: NSFont.systemFont(ofSize: 16, weight: .medium),
        .foregroundColor: NSColor(calibratedWhite: 0.10, alpha: 0.18),
        .paragraphStyle: p,
    ]

    ctx.saveGState()
    ctx.translateBy(x: size.width / 2, y: size.height / 2)
    ctx.rotate(by: -.pi / 6)
    let watermarkStepY: CGFloat = 165
    let stepX: CGFloat = 290
    for yy in stride(from: -size.height, through: size.height, by: watermarkStepY) {
        for xx in stride(from: -size.width, through: size.width, by: stepX) {
            watermarkLine1.draw(in: NSRect(x: xx - 135, y: yy, width: 270, height: 36), withAttributes: attrs1)
            watermarkLine2.draw(in: NSRect(x: xx - 135, y: yy - 24, width: 270, height: 22), withAttributes: attrs2)
        }
    }
    ctx.restoreGState()

    out.unlockFocus()
    return out
}

func renderPage(_ drawBlock: (_ rect: NSRect) -> Void, aspect: CGFloat) -> NSImage {
    let h = max(220, targetWidth / max(0.4, min(aspect, 2.2)))
    let size = NSSize(width: targetWidth, height: h)
    let img = NSImage(size: size)
    img.lockFocus()
    NSColor.white.setFill()
    NSBezierPath(rect: NSRect(origin: .zero, size: size)).fill()
    drawBlock(NSRect(origin: .zero, size: size))
    img.unlockFocus()
    return drawStrict(img)
}

func collectRedactedPages(for src: URL) -> [NSImage] {
    let ext = src.pathExtension.lowercased()
    if ext == "pdf" {
        guard let doc = PDFDocument(url: src) else { return [] }
        let count = min(maxPages, doc.pageCount)
        var pages: [NSImage] = []
        for i in 0..<count {
            guard let page = doc.page(at: i) else { continue }
            let media = page.bounds(for: .mediaBox)
            if media.width <= 0 || media.height <= 0 { continue }
            let aspect = media.width / media.height
            let thumbHeight = max(220, targetWidth / max(0.4, min(aspect, 2.2)))
            let thumb = page.thumbnail(of: NSSize(width: targetWidth, height: thumbHeight), for: .mediaBox)
            let rendered = renderPage({ rect in
                thumb.draw(in: rect, from: .zero, operation: .copy, fraction: 1.0)
            }, aspect: aspect)
            pages.append(rendered)
        }
        return pages
    }

    guard let image = NSImage(contentsOf: src) else { return [] }
    let aspect = image.size.width / max(1, image.size.height)
    let rendered = renderPage({ rect in
        image.draw(in: rect, from: .zero, operation: .copy, fraction: 1.0)
    }, aspect: aspect)
    return [rendered]
}

func saveAsPDF(_ pages: [NSImage], to url: URL) throws {
    let outDoc = PDFDocument()
    for (idx, image) in pages.enumerated() {
        if let page = PDFPage(image: image) {
            outDoc.insert(page, at: idx)
        }
    }
    guard outDoc.pageCount > 0 else { return }
    outDoc.write(to: url)
}

try ensureDir(outputRoot)
let files = (fm.enumerator(at: inputRoot, includingPropertiesForKeys: [.isRegularFileKey], options: [.skipsHiddenFiles])?
    .compactMap { $0 as? URL }
    .filter {
        ((try? $0.resourceValues(forKeys: [.isRegularFileKey]).isRegularFile) ?? false) &&
        supported.contains($0.pathExtension.lowercased())
    } ?? [])
    .sorted { $0.lastPathComponent.localizedCaseInsensitiveCompare($1.lastPathComponent) == .orderedAscending }

var idx = 1
var processed = 0
for src in files {
    let raw = src.lastPathComponent.replacingOccurrences(of: "_", with: " ").replacingOccurrences(of: "-", with: " ")
    let country = detect(raw, rules: countryRules, fallback: "AU")
    let type = detect(raw, rules: typeRules, fallback: "GENERAL_DOC")
    let name = String(format: "EGS_%@_%@_%04d.pdf", country, type, idx)
    idx += 1

    let pages = collectRedactedPages(for: src)
    if pages.isEmpty { continue }
    try saveAsPDF(pages, to: outputRoot.appendingPathComponent(name))
    processed += 1
}

print("STRICT packet mode processed files: \(processed), output: \(files.count)")
