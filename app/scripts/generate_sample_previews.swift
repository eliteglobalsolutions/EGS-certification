import Foundation
import AppKit
import PDFKit

let args = CommandLine.arguments
if args.count < 3 {
    fputs("Usage: generate_sample_previews.swift <input_dir> <output_dir>\n", stderr)
    exit(1)
}

let inputRoot = URL(fileURLWithPath: args[1], isDirectory: true)
let outputRoot = URL(fileURLWithPath: args[2], isDirectory: true)
let fm = FileManager.default

let supported = Set(["pdf", "png", "jpg", "jpeg", "webp"])
let maxPages = 3
let targetWidth: CGFloat = 920
let watermarkLine1 = "EGS SAMPLE"
let watermarkLine2 = "Eliteglobalsolutions.co"

func sanitize(_ raw: String) -> String {
    let invalid = CharacterSet(charactersIn: "/:\\?%*|\"<>")
    let cleaned = raw.components(separatedBy: invalid).joined(separator: "_")
    return cleaned.replacingOccurrences(of: "\n", with: " ").trimmingCharacters(in: .whitespacesAndNewlines)
}

func ensureDir(_ url: URL) throws {
    try fm.createDirectory(at: url, withIntermediateDirectories: true)
}

func drawWatermark(in image: NSImage) -> NSImage {
    let size = image.size
    let out = NSImage(size: size)
    out.lockFocus()
    image.draw(in: NSRect(origin: .zero, size: size))

    guard let ctx = NSGraphicsContext.current?.cgContext else {
        out.unlockFocus()
        return image
    }

    // privacy veil
    ctx.setFillColor(NSColor(calibratedWhite: 1.0, alpha: 0.15).cgColor)
    ctx.fill(NSRect(origin: .zero, size: size))

    let p = NSMutableParagraphStyle()
    p.alignment = .center
    let attrs1: [NSAttributedString.Key: Any] = [
        .font: NSFont.systemFont(ofSize: 26, weight: .bold),
        .foregroundColor: NSColor(calibratedWhite: 0.12, alpha: 0.20),
        .paragraphStyle: p,
    ]
    let attrs2: [NSAttributedString.Key: Any] = [
        .font: NSFont.systemFont(ofSize: 16, weight: .medium),
        .foregroundColor: NSColor(calibratedWhite: 0.12, alpha: 0.20),
        .paragraphStyle: p,
    ]

    ctx.saveGState()
    ctx.translateBy(x: size.width / 2, y: size.height / 2)
    ctx.rotate(by: -.pi / 6)

    let stepY: CGFloat = 180
    let stepX: CGFloat = 300

    for y in stride(from: -size.height, through: size.height, by: stepY) {
        for x in stride(from: -size.width, through: size.width, by: stepX) {
            let r1 = NSRect(x: x - 120, y: y, width: 240, height: 34)
            let r2 = NSRect(x: x - 120, y: y - 24, width: 240, height: 22)
            watermarkLine1.draw(in: r1, withAttributes: attrs1)
            watermarkLine2.draw(in: r2, withAttributes: attrs2)
        }
    }

    ctx.restoreGState()
    out.unlockFocus()
    return out
}

func renderPage(_ drawBlock: (_ rect: NSRect) -> Void, width: CGFloat, aspect: CGFloat) -> NSImage {
    let h = max(220, width / max(0.4, min(aspect, 2.2)))
    let size = NSSize(width: width, height: h)
    let img = NSImage(size: size)
    img.lockFocus()
    NSColor.white.setFill()
    NSBezierPath(rect: NSRect(origin: .zero, size: size)).fill()

    let rect = NSRect(origin: .zero, size: size)
    drawBlock(rect)

    img.unlockFocus()
    return drawWatermark(in: img)
}

func saveJPEG(_ image: NSImage, to url: URL) throws {
    guard let tiff = image.tiffRepresentation,
          let rep = NSBitmapImageRep(data: tiff),
          let data = rep.representation(using: .jpeg, properties: [.compressionFactor: 0.58]) else {
        throw NSError(domain: "preview", code: 1)
    }
    try data.write(to: url)
}

func processPDF(_ src: URL, to outDir: URL) throws {
    guard let doc = PDFDocument(url: src) else { return }
    let count = min(maxPages, doc.pageCount)
    for i in 0..<count {
        guard let page = doc.page(at: i) else { continue }
        let media = page.bounds(for: .mediaBox)
        if media.width <= 0 || media.height <= 0 { continue }
        let aspect = media.width / media.height

        let img = renderPage({ rect in
            guard let ctx = NSGraphicsContext.current?.cgContext else { return }
            ctx.saveGState()
            ctx.translateBy(x: rect.minX, y: rect.maxY)
            let scale = rect.width / media.width
            ctx.scaleBy(x: scale, y: -scale)
            page.draw(with: .mediaBox, to: ctx)
            ctx.restoreGState()
        }, width: targetWidth, aspect: aspect)

        let outName = sanitize(src.deletingPathExtension().lastPathComponent) + "_p\(i+1).jpg"
        try saveJPEG(img, to: outDir.appendingPathComponent(outName))
    }
}

func processImage(_ src: URL, to outDir: URL) throws {
    guard let image = NSImage(contentsOf: src) else { return }
    let aspect = image.size.width / max(1, image.size.height)
    let img = renderPage({ rect in
        image.draw(in: rect, from: .zero, operation: .copy, fraction: 1.0)
    }, width: targetWidth, aspect: aspect)

    let outName = sanitize(src.deletingPathExtension().lastPathComponent) + "_p1.jpg"
    try saveJPEG(img, to: outDir.appendingPathComponent(outName))
}

try ensureDir(outputRoot)

let enumerator = fm.enumerator(at: inputRoot, includingPropertiesForKeys: [.isRegularFileKey], options: [.skipsHiddenFiles])
var processed = 0
var skipped = 0

while let fileURL = enumerator?.nextObject() as? URL {
    let values = try fileURL.resourceValues(forKeys: [.isRegularFileKey])
    guard values.isRegularFile == true else { continue }

    let ext = fileURL.pathExtension.lowercased()
    guard supported.contains(ext) else {
        skipped += 1
        continue
    }

    do {
        if ext == "pdf" {
            try processPDF(fileURL, to: outputRoot)
        } else {
            try processImage(fileURL, to: outputRoot)
        }
        processed += 1
    } catch {
        fputs("Failed: \(fileURL.lastPathComponent) -> \(error)\n", stderr)
    }
}

print("Processed files: \(processed), skipped: \(skipped)")
