#!/usr/bin/env swift
import Foundation
import AppKit
import PDFKit

let watermarkText = "EGS AUSTRALIA Eliteglobalsolutions.co"
let watermarkAlpha: CGFloat = 0.16
let watermarkAngle: CGFloat = 32
let dpi: CGFloat = 220

let countryKeywords: [(String, [String])] = [
    ("Australia", ["australia", "australian", "aus", "澳洲", "澳大利亚"]),
    ("China", ["china", "chinese", "中国"]),
    ("Singapore", ["singapore", "新加坡"]),
    ("UK", ["uk", "united kingdom", "britain", "英国"]),
    ("EU", ["eu", "europe", "european", "欧盟", "germany", "france"]),
    ("USA", ["usa", "us", "united states", "america", "美国"]),
    ("Mexico", ["mexico", "墨西哥"]),
    ("Canada", ["canada", "加拿大"]),
    ("Vietnam", ["vietnam", "越南"]),
    ("Philippines", ["philippines", "philippine", "菲律宾", "philipines"]),
    ("Malaysia", ["malaysia", "马来西亚", "马来"]),
    ("Indonesia", ["indonesia", "印尼", "印度尼西亚", "indonisia"]),
    ("South Africa", ["south africa", "南非"]),
    ("India", ["india", "印度"]),
    ("Japan", ["japan", "日本"]),
    ("Korea", ["korea", "韩国"]),
]

let docTypeRules: [(String, String)] = [
    ("(birth|出生)", "Birth Certificate"),
    ("(marriage|结婚)", "Marriage Certificate"),
    ("(police|npc|无犯罪|犯罪)", "Police Check"),
    ("(passport|护照)", "Passport"),
    ("(driver|licence|license|驾照|驾驶证)", "Driver Licence"),
    ("(degree|diploma|transcript|academic|学历|学位|成绩单|毕业)", "Academic Document"),
    ("(poa|power of attorney|委托|授权)", "Power of Attorney"),
    ("(affidavit|declaration|stat dec|声明)", "Declaration"),
    ("(company|asic|business|corporate|商事|公司)", "Company Document"),
    ("(translation|翻译)", "Translation"),
    ("(apostille|海牙)", "Apostille"),
    ("(legali[sz]ation|认证|领馆|使馆)", "Legalisation"),
]

let noteRules: [(String, String)] = [
    ("(non[\\s-]?hague|not[\\s-]?hague|非海牙)", "Non-Hague"),
    ("(hague|convention|海牙)", "Hague"),
    ("(consulate|consular|embassy|领馆|使馆)", "Consulate"),
    ("(dfat)", "DFAT"),
]

func normalizeSpaces(_ s: String) -> String {
    return s.replacingOccurrences(of: "\\s+", with: " ", options: .regularExpression).trimmingCharacters(in: .whitespacesAndNewlines)
}

func cleanPart(_ s: String) -> String {
    let noIllegal = s.replacingOccurrences(of: "[\\\\/:*?\"<>|]+", with: " ", options: .regularExpression)
    let noSeparators = noIllegal.replacingOccurrences(of: "_", with: " ").replacingOccurrences(of: "-", with: " ")
    return normalizeSpaces(noSeparators)
}

func regexMatch(_ pattern: String, _ text: String) -> Bool {
    return text.range(of: pattern, options: [.regularExpression, .caseInsensitive]) != nil
}

func inferCountry(for fileURL: URL) -> String {
    let haystack = "\(fileURL.deletingLastPathComponent().lastPathComponent) \(fileURL.deletingPathExtension().lastPathComponent)".lowercased()
    for (country, keys) in countryKeywords {
        if keys.contains(where: { haystack.contains($0.lowercased()) }) {
            return country
        }
    }
    return "Unknown"
}

func inferDocType(for fileURL: URL) -> String {
    let haystack = "\(fileURL.deletingLastPathComponent().lastPathComponent) \(fileURL.deletingPathExtension().lastPathComponent)".lowercased()
    for (pattern, value) in docTypeRules {
        if regexMatch(pattern, haystack) { return value }
    }
    return "Unknown"
}

func inferNote(for fileURL: URL) -> String? {
    let haystack = "\(fileURL.deletingLastPathComponent().lastPathComponent) \(fileURL.deletingPathExtension().lastPathComponent)".lowercased()
    for (pattern, value) in noteRules {
        if regexMatch(pattern, haystack) { return value }
    }
    return nil
}

func buildTargetFileName(for fileURL: URL) -> String {
    let country = cleanPart(inferCountry(for: fileURL))
    let docType = cleanPart(inferDocType(for: fileURL))
    if let note = inferNote(for: fileURL) {
        return normalizeSpaces("\(country) - \(docType) - \(cleanPart(note)) - SAMPLE.pdf")
    }
    return normalizeSpaces("\(country) - \(docType) - SAMPLE.pdf")
}

func uniqueTargetURL(in directory: URL, preferredName: String) -> URL {
    let fm = FileManager.default
    var candidate = directory.appendingPathComponent(preferredName)
    if !fm.fileExists(atPath: candidate.path) { return candidate }

    let stem = (preferredName as NSString).deletingPathExtension
    let ext = (preferredName as NSString).pathExtension
    var i = 2
    while true {
        let name = "\(stem) (\(i)).\(ext)"
        candidate = directory.appendingPathComponent(name)
        if !fm.fileExists(atPath: candidate.path) { return candidate }
        i += 1
    }
}

func renderPageToImage(_ page: PDFPage, dpi: CGFloat) -> NSImage? {
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

func addTiledWatermark(to image: NSImage) -> NSImage? {
    let size = image.size
    guard size.width > 0, size.height > 0 else { return nil }

    let out = NSImage(size: size)
    out.lockFocus()
    defer { out.unlockFocus() }

    NSColor.white.setFill()
    NSBezierPath(rect: NSRect(origin: .zero, size: size)).fill()
    image.draw(in: NSRect(origin: .zero, size: size), from: .zero, operation: .sourceOver, fraction: 1.0)

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

    return out
}

func processPDF(_ src: URL) throws -> URL {
    guard let document = PDFDocument(url: src) else {
        throw NSError(domain: "samples", code: 1, userInfo: [NSLocalizedDescriptionKey: "Cannot open PDF"])
    }

    let out = PDFDocument()
    let pageCount = document.pageCount
    if pageCount == 0 {
        throw NSError(domain: "samples", code: 2, userInfo: [NSLocalizedDescriptionKey: "Empty PDF"])
    }

    for i in 0..<pageCount {
        guard let page = document.page(at: i) else { continue }
        guard let raster = renderPageToImage(page, dpi: dpi),
              let watermarked = addTiledWatermark(to: raster),
              let newPage = PDFPage(image: watermarked) else {
            throw NSError(domain: "samples", code: 3, userInfo: [NSLocalizedDescriptionKey: "Failed render/watermark page \(i + 1)"])
        }
        out.insert(newPage, at: out.pageCount)
    }

    let tmp = src.deletingLastPathComponent().appendingPathComponent(src.deletingPathExtension().lastPathComponent + ".__tmp_processed__.pdf")
    if out.write(to: tmp) == false {
        throw NSError(domain: "samples", code: 4, userInfo: [NSLocalizedDescriptionKey: "Failed to write output PDF"])
    }
    return tmp
}

func resolveRoot(_ input: String) -> URL {
    let fm = FileManager.default
    let raw = URL(fileURLWithPath: input)
    if fm.fileExists(atPath: raw.path) { return raw }

    let variants = [
        input.replacingOccurrences(of: "organised samples", with: "organised-samples"),
        input.replacingOccurrences(of: "organised-samples", with: "organised samples"),
        input.replacingOccurrences(of: "organised", with: "orgnised"),
        input.replacingOccurrences(of: "orgnised", with: "organised"),
    ]
    for v in variants {
        let url = URL(fileURLWithPath: v)
        if fm.fileExists(atPath: url.path) { return url }
    }
    return raw
}

struct ProcessResult {
    let src: URL
    let dst: URL?
    let ok: Bool
    let reason: String?
}

func collectPDFs(root: URL) -> [URL] {
    let fm = FileManager.default
    guard let en = fm.enumerator(at: root, includingPropertiesForKeys: [.isRegularFileKey], options: [.skipsHiddenFiles]) else {
        return []
    }
    var out: [URL] = []
    for case let fileURL as URL in en {
        if fileURL.pathExtension.lowercased() == "pdf" {
            out.append(fileURL)
        }
    }
    return out.sorted { $0.path < $1.path }
}

let args = CommandLine.arguments
if args.count < 2 {
    fputs("Usage: swift scripts/watermark_and_rename_samples.swift \"organised samples\"\n", stderr)
    exit(2)
}

let root = resolveRoot(args[1])
let fm = FileManager.default
if !fm.fileExists(atPath: root.path) {
    fputs("ERROR: directory not found: \(root.path)\n", stderr)
    exit(2)
}

let pdfs = collectPDFs(root: root)
var results: [ProcessResult] = []

for src in pdfs {
    do {
        let tmp = try processPDF(src)
        let targetName = buildTargetFileName(for: src)
        let target = uniqueTargetURL(in: src.deletingLastPathComponent(), preferredName: targetName)

        try fm.removeItem(at: src)
        try fm.moveItem(at: tmp, to: target)

        results.append(ProcessResult(src: src, dst: target, ok: true, reason: nil))
    } catch {
        results.append(ProcessResult(src: src, dst: nil, ok: false, reason: error.localizedDescription))
    }
}

let ok = results.filter { $0.ok }
let bad = results.filter { !$0.ok }

print("=== Summary ===")
print("Processed files: \(results.count)")
print("Success: \(ok.count)")
print("Failed: \(bad.count)")
print("\n=== Renamed (old -> new) ===")
for r in ok {
    print("\(r.src.path) -> \(r.dst!.path)")
}
if !bad.isEmpty {
    print("\n=== Failed files ===")
    for r in bad {
        print("\(r.src.path) :: \(r.reason ?? "Unknown error")")
    }
}

exit(bad.isEmpty ? 0 : 1)
