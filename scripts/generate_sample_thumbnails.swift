#!/usr/bin/env swift
import Foundation
import PDFKit
import AppKit

let root = URL(fileURLWithPath: "/Users/vickyjian/EGS-certification/public/samples")
let indexPath = root.appendingPathComponent("index.json")

guard let data = try? Data(contentsOf: indexPath),
      var arr = (try? JSONSerialization.jsonObject(with: data)) as? [[String: Any]] else {
  fputs("Failed to read index.json\n", stderr)
  exit(1)
}

func makeThumb(pdfURL: URL, outURL: URL) -> Bool {
  guard let doc = PDFDocument(url: pdfURL), let page = doc.page(at: 0) else { return false }
  let pageRect = page.bounds(for: .mediaBox)
  let rotation = ((page.rotation % 360) + 360) % 360
  let isQuarterTurn = rotation == 90 || rotation == 270
  let drawRect = isQuarterTurn
    ? NSRect(x: 0, y: 0, width: pageRect.height, height: pageRect.width)
    : pageRect
  let targetW: CGFloat = 560
  let scale = targetW / max(1, drawRect.width)
  let targetH = max(1, Int((drawRect.height * scale).rounded()))
  let size = NSSize(width: Int(targetW), height: targetH)

  let img = NSImage(size: size)
  img.lockFocus()
  NSColor.white.setFill()
  NSBezierPath(rect: NSRect(origin: .zero, size: size)).fill()
  guard let ctx = NSGraphicsContext.current?.cgContext else {
    img.unlockFocus()
    return false
  }

  ctx.saveGState()
  ctx.translateBy(x: 0, y: size.height)
  ctx.scaleBy(x: scale, y: -scale)
  switch rotation {
  case 90:
    ctx.translateBy(x: drawRect.width, y: 0)
    ctx.rotate(by: .pi / 2)
  case 180:
    ctx.translateBy(x: drawRect.width, y: drawRect.height)
    ctx.rotate(by: .pi)
  case 270:
    ctx.translateBy(x: 0, y: drawRect.height)
    ctx.rotate(by: -.pi / 2)
  default:
    break
  }
  page.draw(with: .mediaBox, to: ctx)
  ctx.restoreGState()
  img.unlockFocus()

  guard let tiff = img.tiffRepresentation,
        let rep = NSBitmapImageRep(data: tiff),
        let jpg = rep.representation(using: .jpeg, properties: [.compressionFactor: 0.86]) else { return false }

  do {
    try jpg.write(to: outURL)
    return true
  } catch {
    return false
  }
}

var success = 0
var failed = 0

for i in 0..<arr.count {
  guard let fp = arr[i]["file_path"] as? String else { continue }
  let rel = fp.replacingOccurrences(of: "/samples/", with: "").removingPercentEncoding ?? fp.replacingOccurrences(of: "/samples/", with: "")
  let pdfURL = root.appendingPathComponent(rel)
  let thumbURL = pdfURL.deletingLastPathComponent().appendingPathComponent("thumb.jpg")

  if makeThumb(pdfURL: pdfURL, outURL: thumbURL) {
    let baseDir = rel.split(separator: "/").dropLast().joined(separator: "/")
    arr[i]["thumb_path"] = "/samples/" + baseDir + "/thumb.jpg"
    success += 1
  } else {
    failed += 1
  }
}

if let outData = try? JSONSerialization.data(withJSONObject: arr, options: [.prettyPrinted]) {
  try? outData.write(to: indexPath)
}

print("thumb success: \(success)")
print("thumb failed: \(failed)")
