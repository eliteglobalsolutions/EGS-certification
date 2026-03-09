#!/usr/bin/env python3
"""
Build processed sample PDFs from samples_raw into public/samples.

Requirements:
- Python 3.9+
- PyMuPDF (fitz): pip install pymupdf

Input structure:
samples_raw/{country}/{slug}/
  - source.pdf
  - redaction.json
  - metadata.json (optional, e.g. {"title":"..."})

Output:
public/samples/{country}/{slug}/sample.pdf
public/samples/index.json
"""

from __future__ import annotations

import json
import math
import shutil
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Dict, List

try:
    import fitz  # type: ignore
except Exception as exc:  # pragma: no cover
    raise SystemExit(
        "PyMuPDF (fitz) is required. Install with: pip install pymupdf\n"
        f"Import error: {exc}"
    )


ROOT = Path(__file__).resolve().parents[1]
RAW_ROOT = ROOT / "samples_raw"
OUT_ROOT = ROOT / "public" / "samples"
INDEX_PATH = OUT_ROOT / "index.json"

MAX_PAGES = 3
WATERMARK_TEXT = "EGS  ·  eliteglobalsolutions.co"
WATERMARK_OPACITY = 0.10
WATERMARK_ANGLE_DEG = 30
WATERMARK_FONT_SIZE = 24
WATERMARK_STEP_X = 300
WATERMARK_STEP_Y = 210


@dataclass
class SampleEntry:
    country: str
    slug: str
    title: str
    file_path: str
    reviewed: bool
    reviewed_by: str | None
    reviewed_at: str | None
    notes: str | None


def load_json(path: Path, default: Any) -> Any:
    if not path.exists():
        return default
    with path.open("r", encoding="utf-8") as f:
        return json.load(f)


def save_json(path: Path, data: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


def percent_to_rect(page_rect: fitz.Rect, item: Dict[str, float]) -> fitz.Rect:
    x = float(item["x"]) * page_rect.width
    y = float(item["y"]) * page_rect.height
    w = float(item["w"]) * page_rect.width
    h = float(item["h"]) * page_rect.height
    return fitz.Rect(x, y, x + w, y + h)


def apply_sticker_redactions(page: fitz.Page, page_redactions: List[Dict[str, float]]) -> None:
    for block in page_redactions:
        rect = percent_to_rect(page.rect, block)
        # Expand a bit to avoid edge leakage.
        rect = fitz.Rect(rect.x0 - 2, rect.y0 - 2, rect.x1 + 2, rect.y1 + 2)
        page.draw_rect(
            rect,
            color=(1, 1, 1),
            fill=(1, 1, 1),
            overlay=True,
            width=0,
        )


def apply_watermark(page: fitz.Page) -> None:
    rect = page.rect
    angle = math.radians(WATERMARK_ANGLE_DEG)
    cos_a = math.cos(angle)
    sin_a = math.sin(angle)
    matrix = fitz.Matrix(cos_a, sin_a, -sin_a, cos_a, 0, 0)

    start_x = -rect.width
    end_x = rect.width * 2
    start_y = -rect.height
    end_y = rect.height * 2

    for y in range(int(start_y), int(end_y), WATERMARK_STEP_Y):
        for x in range(int(start_x), int(end_x), WATERMARK_STEP_X):
            p = fitz.Point(x, y)
            page.insert_text(
                p,
                WATERMARK_TEXT,
                fontsize=WATERMARK_FONT_SIZE,
                color=(0.25, 0.25, 0.25),
                fill_opacity=WATERMARK_OPACITY,
                stroke_opacity=WATERMARK_OPACITY,
                overlay=True,
                morph=(p, matrix),
            )


def normalize_page_to_pixmap(src_page: fitz.Page) -> fitz.Pixmap:
    # Render the page as visually upright based on source rotation.
    # Using pixmap avoids orientation ambiguity from embedded rotation flags.
    rotate = src_page.rotation % 360
    matrix = fitz.Matrix(2.0, 2.0).prerotate(-rotate)
    return src_page.get_pixmap(matrix=matrix, alpha=False, annots=False)


def build_one_sample(source_pdf: Path, redaction_config: Dict[str, Any], out_pdf: Path) -> int:
    src = fitz.open(source_pdf.as_posix())
    out = fitz.open()
    try:
        total = min(MAX_PAGES, src.page_count)
        pages_cfg = redaction_config.get("pages", {})

        for idx in range(total):
            src_page = src[idx]
            pix = normalize_page_to_pixmap(src_page)
            page = out.new_page(width=float(pix.width), height=float(pix.height))
            page.insert_image(page.rect, pixmap=pix, overlay=False)

            page_no = str(idx + 1)
            blocks = pages_cfg.get(page_no, [])
            apply_sticker_redactions(page, blocks)
            apply_watermark(page)

        out_pdf.parent.mkdir(parents=True, exist_ok=True)
        out.save(out_pdf.as_posix(), deflate=True, garbage=4)
        return total
    finally:
        out.close()
        src.close()


def collect_samples() -> List[Path]:
    if not RAW_ROOT.exists():
        return []
    return sorted(
        [
            p
            for p in RAW_ROOT.glob("*/*")
            if p.is_dir() and (p / "source.pdf").exists() and (p / "redaction.json").exists()
        ]
    )


def load_existing_review_map() -> Dict[str, Dict[str, Any]]:
    data = load_json(INDEX_PATH, [])
    review_map: Dict[str, Dict[str, Any]] = {}
    if isinstance(data, list):
        for row in data:
            key = f'{row.get("country","")}/{row.get("slug","")}'
            review_map[key] = row
    return review_map


def title_from_slug(slug: str) -> str:
    return slug.replace("-", " ").replace("_", " ").strip().title()


def main() -> None:
    samples = collect_samples()
    if not samples:
        print("No samples found under samples_raw/*/* with source.pdf + redaction.json")
        OUT_ROOT.mkdir(parents=True, exist_ok=True)
        save_json(INDEX_PATH, [])
        return

    # Clear output directories except index.json (will rewrite anyway)
    OUT_ROOT.mkdir(parents=True, exist_ok=True)
    for child in OUT_ROOT.iterdir():
        if child.is_dir():
            shutil.rmtree(child)

    existing = load_existing_review_map()
    rows: List[SampleEntry] = []

    for sample_dir in samples:
        country = sample_dir.parent.name.lower()
        slug = sample_dir.name.lower()
        source_pdf = sample_dir / "source.pdf"
        redaction_json = sample_dir / "redaction.json"
        metadata_json = sample_dir / "metadata.json"

        cfg = load_json(redaction_json, {"pages": {}})
        meta = load_json(metadata_json, {})
        title = str(meta.get("title") or title_from_slug(slug))

        out_pdf = OUT_ROOT / country / slug / "sample.pdf"
        page_count = build_one_sample(source_pdf, cfg, out_pdf)
        if page_count == 0:
            continue

        key = f"{country}/{slug}"
        prev = existing.get(key, {})
        rows.append(
            SampleEntry(
                country=country,
                slug=slug,
                title=title,
                file_path=f"/samples/{country}/{slug}/sample.pdf",
                reviewed=bool(prev.get("reviewed", False)),
                reviewed_by=prev.get("reviewed_by"),
                reviewed_at=prev.get("reviewed_at"),
                notes=prev.get("notes"),
            )
        )

    rows.sort(key=lambda x: (x.country, x.slug))
    save_json(INDEX_PATH, [r.__dict__ for r in rows])
    print(
        f"Built samples: {len(rows)} | Generated at: {datetime.now(timezone.utc).isoformat()} | Index: {INDEX_PATH}"
    )


if __name__ == "__main__":
    main()
