import Foundation
import AppKit
import PDFKit
import Vision

let args = CommandLine.arguments
if args.count < 3 {
    fputs("Usage: generate_sample_previews_strict.swift <input_dir> <output_dir>\n", stderr)
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
        for obs in textResults {
            rects.append(obs.boundingBox)
        }
    }

    if let barcodeResults = barcodeRequest.results {
        for obs in barcodeResults {
            rects.append(obs.boundingBox)
        }
    }

    if let faceResults = faceRequest.results {
        for obs in faceResults {
            rects.append(obs.boundingBox)
        }
    }

    if let blockResults = textBlocksRequest.results {
        for obs in blockResults {
            rects.append(obs.boundingBox)
        }
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

func drawWatermarkAndRedaction(in image: NSImage) -> NSImage {
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

        // Opaque white sticker redaction.
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

    // Safety masks for signatures / handwritten / small numeric zones.
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

    // Dense white sticker bands to eliminate residual readable lines.
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

    // Full-screen repeated watermark.
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

    for y in stride(from: -size.height, through: size.height, by: watermarkStepY) {
        for x in stride(from: -size.width, through: size.width, by: stepX) {
            let r1 = NSRect(x: x - 135, y: y, width: 270, height: 36)
            let r2 = NSRect(x: x - 135, y: y - 24, width: 270, height: 22)
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
    return drawWatermarkAndRedaction(in: img)
}

func saveJPEG(_ image: NSImage, to url: URL) throws {
    guard let tiff = image.tiffRepresentation,
          let rep = NSBitmapImageRep(data: tiff),
          let data = rep.representation(using: .jpeg, properties: [.compressionFactor: 0.52]) else {
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
        let thumbHeight = max(220, targetWidth / max(0.4, min(aspect, 2.2)))
        let thumb = page.thumbnail(of: NSSize(width: targetWidth, height: thumbHeight), for: .mediaBox)

        let img = renderPage({ rect in
            thumb.draw(in: rect, from: .zero, operation: .copy, fraction: 1.0)
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

print("STRICT mode processed files: \(processed), skipped: \(skipped)")
