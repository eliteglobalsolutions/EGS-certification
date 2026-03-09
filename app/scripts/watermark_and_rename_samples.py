#!/usr/bin/env python3
from __future__ import annotations

import argparse
import io
import re
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, List, Optional, Tuple

try:
    import fitz  # PyMuPDF
except Exception:  # pragma: no cover
    fitz = None

try:
    from PIL import Image, ImageDraw, ImageFont
except Exception:  # pragma: no cover
    Image = ImageDraw = ImageFont = None

WATERMARK_TEXT = "EGS AUSTRALIA Eliteglobalsolutions.co"
WATERMARK_ALPHA = 40  # 0-255, ~0.16
WATERMARK_ANGLE = 32
DPI = 220


def normalize_spaces(s: str) -> str:
    return re.sub(r"\s+", " ", s).strip()


def clean_filename_part(s: str) -> str:
    s = re.sub(r"[\\/:*?\"<>|]+", " ", s)
    s = normalize_spaces(s.replace("_", " ").replace("-", " "))
    return s


COUNTRY_KEYWORDS: Dict[str, List[str]] = {
    "Australia": ["australia", "australian", "aus", "澳洲", "澳大利亚"],
    "China": ["china", "chinese", "中国"],
    "Singapore": ["singapore", "新加坡"],
    "EU": ["eu", "europe", "european", "欧盟", "英国", "uk", "united kingdom", "germany", "france"],
    "USA": ["usa", "us", "united states", "america", "美国"],
    "Mexico": ["mexico", "墨西哥"],
    "Canada": ["canada", "加拿大"],
    "Vietnam": ["vietnam", "越南"],
    "Philippines": ["philippines", "philippine", "菲律宾", "philipines"],
    "Malaysia": ["malaysia", "马来西亚", "马来"],
    "Indonesia": ["indonesia", "印尼", "印度尼西亚", "indonisia"],
    "South Africa": ["south africa", "南非"],
    "India": ["india", "印度"],
}

DOC_TYPE_RULES: List[Tuple[str, str]] = [
    (r"(birth|出生)", "Birth Certificate"),
    (r"(marriage|结婚)", "Marriage Certificate"),
    (r"(police|npc|无犯罪|犯罪)", "Police Check"),
    (r"(passport|护照)", "Passport"),
    (r"(driver|licence|license|驾照|驾驶证)", "Driver Licence"),
    (r"(degree|diploma|transcript|academic|学历|学位|成绩单|毕业)", "Academic Document"),
    (r"(poa|power of attorney|委托|授权)", "Power of Attorney"),
    (r"(affidavit|declaration|stat dec|声明)", "Declaration"),
    (r"(company|asic|business|corporate|商事|公司)", "Company Document"),
    (r"(translation|翻译)", "Translation"),
    (r"(apostille|海牙)", "Apostille"),
    (r"(legali[sz]ation|认证|领馆|使馆)", "Legalisation"),
]

NOTE_RULES: List[Tuple[str, str]] = [
    (r"(consulate|consular|embassy|领馆|使馆)", "Consulate"),
    (r"(dfat)", "DFAT"),
    (r"(hague|convention|海牙)", "Hague"),
    (r"(non[\s\-]?hague|not[\s\-]?hague|非海牙)", "Non-Hague"),
]


@dataclass
class Result:
    src: Path
    dst: Optional[Path]
    ok: bool
    reason: str = ""


def infer_country(pdf_path: Path) -> str:
    haystack = f"{pdf_path.parent.name} {pdf_path.stem}".lower()
    for country, words in COUNTRY_KEYWORDS.items():
        if any(w.lower() in haystack for w in words):
            return country
    return "Unknown"


def infer_doc_type(pdf_path: Path) -> str:
    haystack = f"{pdf_path.parent.name} {pdf_path.stem}".lower()
    for pat, out in DOC_TYPE_RULES:
        if re.search(pat, haystack, flags=re.IGNORECASE):
            return out
    return "Unknown"


def infer_note(pdf_path: Path) -> Optional[str]:
    haystack = f"{pdf_path.parent.name} {pdf_path.stem}".lower()
    for pat, out in NOTE_RULES:
        if re.search(pat, haystack, flags=re.IGNORECASE):
            return out
    return None


def build_target_name(pdf_path: Path) -> str:
    country = clean_filename_part(infer_country(pdf_path))
    doc_type = clean_filename_part(infer_doc_type(pdf_path))
    note = infer_note(pdf_path)
    if note:
        name = f"{country} - {doc_type} - {clean_filename_part(note)} - SAMPLE.pdf"
    else:
        name = f"{country} - {doc_type} - SAMPLE.pdf"
    return normalize_spaces(name)


def unique_target(directory: Path, preferred_name: str) -> Path:
    target = directory / preferred_name
    if not target.exists():
        return target
    stem = target.stem
    suffix = target.suffix
    i = 2
    while True:
        candidate = directory / f"{stem} ({i}){suffix}"
        if not candidate.exists():
            return candidate
        i += 1


def load_font(size: int):
    assert ImageFont is not None
    for font_path in [
        "/System/Library/Fonts/Supplemental/Arial Unicode.ttf",
        "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
    ]:
        try:
            return ImageFont.truetype(font_path, size=size)
        except Exception:
            continue
    return ImageFont.load_default()


def watermark_image(base_img):
    assert Image is not None and ImageDraw is not None and ImageFont is not None
    if base_img.mode != "RGB":
        base_img = base_img.convert("RGB")

    w, h = base_img.size
    overlay = Image.new("RGBA", (w, h), (255, 255, 255, 0))
    draw = ImageDraw.Draw(overlay)

    font_size = max(26, int(w * 0.035))
    font = load_font(font_size)
    text_w = int(font_size * len(WATERMARK_TEXT) * 0.58)
    text_h = int(font_size * 1.4)
    step_x = max(260, int(w * 0.24))
    step_y = max(200, int(h * 0.20))

    tile = Image.new("RGBA", (text_w + 40, text_h + 20), (255, 255, 255, 0))
    td = ImageDraw.Draw(tile)
    td.text((20, 8), WATERMARK_TEXT, font=font, fill=(80, 80, 80, WATERMARK_ALPHA))
    tile = tile.rotate(WATERMARK_ANGLE, expand=1)

    tw, th = tile.size
    for y in range(-th, h + th, step_y):
        for x in range(-tw, w + tw, step_x):
            overlay.alpha_composite(tile, (x, y))

    out = Image.alpha_composite(base_img.convert("RGBA"), overlay).convert("RGB")
    return out


def process_pdf(src: Path) -> Path:
    assert fitz is not None and Image is not None
    tmp_path = src.with_name(src.stem + ".__tmp_processed__.pdf")
    if tmp_path.exists():
        tmp_path.unlink()

    doc = fitz.open(src.as_posix())
    out = fitz.open()
    try:
        keep_pages = min(3, doc.page_count)
        for i in range(keep_pages):
            page = doc.load_page(i)
            # render with corrected rotation
            m = fitz.Matrix(DPI / 72.0, DPI / 72.0).prerotate(-page.rotation)
            pix = page.get_pixmap(matrix=m, alpha=False, annots=False)
            mode = "RGB"
            img = Image.frombytes(mode, [pix.width, pix.height], pix.samples)
            img = watermark_image(img)

            # Keep original page physical size (points)
            page_rect = page.rect
            out_page = out.new_page(width=page_rect.width, height=page_rect.height)
            bio = io.BytesIO()
            img.save(bio, format="JPEG", quality=86, optimize=True)
            img_bytes = bio.getvalue()
            out_page.insert_image(page_rect, stream=img_bytes)

        out.save(tmp_path.as_posix(), deflate=True, garbage=4)
    finally:
        out.close()
        doc.close()
    return tmp_path


def resolve_root(input_arg: str) -> Path:
    p = Path(input_arg)
    if p.exists():
        return p
    # Compatibility with hyphen/space typo variants
    variants = [
        Path(str(input_arg).replace("organised samples", "organised-samples")),
        Path(str(input_arg).replace("organised-samples", "organised samples")),
        Path(str(input_arg).replace("organised", "orgnised")),
    ]
    for v in variants:
        if v.exists():
            return v
    return p


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("root", help='Root directory, e.g. "organised samples"')
    args = parser.parse_args()

    if fitz is None or Image is None:
        print("ERROR: Missing dependencies.")
        print("Install:")
        print("  /usr/bin/python3 -m pip install --user pymupdf pillow")
        return 2

    root = resolve_root(args.root)
    if not root.exists():
        print(f"ERROR: directory not found: {root}")
        return 2

    pdfs = sorted([p for p in root.rglob("*") if p.is_file() and p.suffix.lower() == ".pdf"])
    results: List[Result] = []

    for src in pdfs:
        try:
            tmp_pdf = process_pdf(src)
            target_name = build_target_name(src)
            target_path = unique_target(src.parent, target_name)

            # Atomic-ish replace: remove src only after tmp generated
            src.unlink()
            tmp_pdf.rename(target_path)
            results.append(Result(src=src, dst=target_path, ok=True))
        except Exception as e:  # pragma: no cover
            results.append(Result(src=src, dst=None, ok=False, reason=str(e)))

    ok = [r for r in results if r.ok]
    bad = [r for r in results if not r.ok]

    print("=== Summary ===")
    print(f"Processed files: {len(results)}")
    print(f"Success: {len(ok)}")
    print(f"Failed: {len(bad)}")
    print("\n=== Renamed (old -> new) ===")
    for r in ok:
        print(f"{r.src} -> {r.dst}")
    if bad:
        print("\n=== Failed files ===")
        for r in bad:
            print(f"{r.src} :: {r.reason}")

    return 0 if not bad else 1


if __name__ == "__main__":
    sys.exit(main())
