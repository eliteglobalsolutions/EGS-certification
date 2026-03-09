import Foundation
import AppKit
import PDFKit
import Vision

let args = CommandLine.arguments
if args.count < 2 {
    fputs("Usage: process_uk_samples.swift <uk_folder>\n", stderr)
    exit(1)
}

let inputDir = URL(fileURLWithPath: args[1], isDirectory: true)
let outputDir = inputDir.appendingPathComponent("UK_processed_white", isDirectory: true)
let fm = FileManager.default

let templateNames: Set<String> = [
    "马绍尔群岛公司文件做英国海牙模板.pdf",
    "英国毕业证+成绩单海牙认证打码模板.pdf",
    "英国出生纸调取+海牙打码样板.pdf",
]

let maxPages = 3
let targetWidth: CGFloat = 1100
let watermarkLine1 = "EGS SAMPLE"
let watermarkLine2 = "Eliteglobalsolutions.co"

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

    let textBlocksRequest = VNDetectTextRectanglesRequest()
    textBlocksRequest.reportCharacterBoxes = false
    let barcodeRequest = VNDetectBarcodesRequest()
    let faceRequest = VNDetectFaceRectanglesRequest()

    do {
        try handler.perform([textRequest, textBlocksRequest, barcodeRequest, faceRequest])
    } catch {
        return rects
    }

    if let textResults = textRequest.results {
        for obs in textResults { rects.append(obs.boundingBox) }
    }
    if let blockResults = textBlocksRequest.results {
        for obs in blockResults { rects.append(obs.boundingBox) }
    }
    if let barcodeResults = barcodeRequest.results {
        for obs in barcodeResults { rects.append(obs.boundingBox) }
    }
    if let faceResults = faceRequest.results {
        for obs in faceResults { rects.append(obs.boundingBox) }
    }
    return rects
}

func mergeRects(_ rects: [CGRect], threshold: CGFloat = 16) -> [CGRect] {
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
            var keep: [CGRect] = []
            for r in sorted {
                if current.insetBy(dx: -threshold, dy: -threshold).intersects(r) {
                    current = current.union(r)
                    changed = true
                } else {
                    keep.append(r)
                }
            }
            sorted = keep
        }
        merged.append(current)
    }
    return merged
}

func strictRedactAndWatermark(_ image: NSImage) -> NSImage {
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
        let imageRects = normRects.map { toImageCoord($0, imageSize: size).insetBy(dx: -28, dy: -16) }
        let merged = mergeRects(imageRects, threshold: 18)

        ctx.setFillColor(NSColor.white.cgColor)
        for r in merged {
            let clipped = r.intersection(CGRect(origin: .zero, size: size))
            if clipped.width > 6, clipped.height > 6 {
                let path = NSBezierPath(roundedRect: clipped, xRadius: 5, yRadius: 5)
                path.fill()
                ctx.setStrokeColor(NSColor(calibratedWhite: 0.86, alpha: 1.0).cgColor)
                ctx.setLineWidth(1.0)
                ctx.stroke(clipped)
            }
        }
    }

    // Fixed safety stickers: signature lines, seal zones, common personal-info rows.
    let fixedMasks: [CGRect] = [
        CGRect(x: size.width * 0.03, y: size.height * 0.08, width: size.width * 0.94, height: size.height * 0.11),
        CGRect(x: size.width * 0.03, y: size.height * 0.42, width: size.width * 0.94, height: size.height * 0.09),
        CGRect(x: size.width * 0.03, y: size.height * 0.76, width: size.width * 0.94, height: size.height * 0.10),
        CGRect(x: size.width * 0.58, y: size.height * 0.02, width: size.width * 0.40, height: size.height * 0.18), // seal/sign area
        CGRect(x: size.width * 0.00, y: size.height * 0.00, width: size.width * 0.24, height: size.height * 0.16), // corner signature stamps
    ]
    ctx.setFillColor(NSColor.white.cgColor)
    for rect in fixedMasks {
        let path = NSBezierPath(roundedRect: rect, xRadius: 6, yRadius: 6)
        path.fill()
        ctx.setStrokeColor(NSColor(calibratedWhite: 0.84, alpha: 1.0).cgColor)
        ctx.setLineWidth(1.0)
        ctx.stroke(rect)
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

    let stepY: CGFloat = 170
    let stepX: CGFloat = 300
    for y in stride(from: -size.height, through: size.height, by: stepY) {
        for x in stride(from: -size.width, through: size.width, by: stepX) {
            watermarkLine1.draw(in: NSRect(x: x - 135, y: y, width: 270, height: 36), withAttributes: attrs1)
            watermarkLine2.draw(in: NSRect(x: x - 135, y: y - 24, width: 270, height: 22), withAttributes: attrs2)
        }
    }
    ctx.restoreGState()

    out.unlockFocus()
    return out
}

func renderPage(_ source: NSImage) -> NSImage {
    let aspect = source.size.width / max(1, source.size.height)
    let h = max(260, targetWidth / max(0.45, min(aspect, 2.2)))
    let canvas = NSImage(size: NSSize(width: targetWidth, height: h))
    canvas.lockFocus()
    NSColor.white.setFill()
    NSBezierPath(rect: NSRect(x: 0, y: 0, width: targetWidth, height: h)).fill()
    source.draw(in: NSRect(x: 0, y: 0, width: targetWidth, height: h), from: .zero, operation: .copy, fraction: 1.0)
    canvas.unlockFocus()
    return strictRedactAndWatermark(canvas)
}

func processPDF(_ src: URL, _ out: URL) {
    guard let doc = PDFDocument(url: src) else { return }
    let outDoc = PDFDocument()
    let count = min(maxPages, doc.pageCount)

    for idx in 0..<count {
        guard let page = doc.page(at: idx) else { continue }
        let media = page.bounds(for: .mediaBox)
        if media.width <= 0 || media.height <= 0 { continue }
        let thumb = page.thumbnail(of: NSSize(width: targetWidth, height: 1600), for: .mediaBox)
        let result = renderPage(thumb)
        if let outPage = PDFPage(image: result) {
            outDoc.insert(outPage, at: outDoc.pageCount)
        }
    }
    outDoc.write(to: out)
}

do {
    try fm.createDirectory(at: outputDir, withIntermediateDirectories: true)
    let files = try fm.contentsOfDirectory(at: inputDir, includingPropertiesForKeys: nil)
        .filter { $0.pathExtension.lowercased() == "pdf" }
        .filter { !templateNames.contains($0.lastPathComponent) }
        .sorted { $0.lastPathComponent < $1.lastPathComponent }

    var done = 0
    for src in files {
        let out = outputDir.appendingPathComponent(src.lastPathComponent)
        processPDF(src, out)
        done += 1
    }
    print("Processed UK files: \(done)")
    print("Output: \(outputDir.path)")
} catch {
    fputs("Error: \(error)\n", stderr)
    exit(1)
}
