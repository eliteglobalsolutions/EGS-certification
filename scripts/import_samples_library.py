#!/usr/bin/env python3
from __future__ import annotations

import json
import re
import shutil
from pathlib import Path
from urllib.parse import quote

SRC_DEFAULT = Path('/Users/vickyjian/Desktop/orgnised samples')
DST_ROOT = Path('/Users/vickyjian/EGS-certification/public/samples')
COUNTRY_ALIAS = {
    'Indonisia': 'Indonesia',
}

TITLE_FIXES = [
    (r'\bCarlifornia\b', 'California'),
    (r'\bMarryland\b', 'Maryland'),
    (r'\bcolombia\b', 'Columbia'),
    (r'\bstateTranscript\b', 'State Transcript'),
    (r'\bNEWYORK\b', 'New York'),
    (r'New York-\s*', 'New York '),
    (r'\bStanford University Degree certificate\+transcript\b', 'Stanford University Degree Certificate + Transcript'),
    (r'\bBUSINESS REGISTRATION CERTIFICATE\b', 'Business Registration Certificate'),
]


def slugify(s: str) -> str:
    s = s.lower().strip()
    s = re.sub(r'[^a-z0-9]+', '-', s)
    s = re.sub(r'-{2,}', '-', s).strip('-')
    return s or 'sample'


def clean_title(filename: str) -> str:
    name = Path(filename).stem
    name = re.sub(r'\s*\(\d+\)$', '', name)
    name = re.sub(r'\s*-\s*SAMPLE$', '', name, flags=re.IGNORECASE)
    name = re.sub(r'\s+', ' ', name).strip(' -_')
    for pattern, replacement in TITLE_FIXES:
        name = re.sub(pattern, replacement, name, flags=re.IGNORECASE)
    name = re.sub(r'\s*\+\s*', ' + ', name)
    name = re.sub(r'\s+', ' ', name).strip(' -_')
    return name


def build_output_filename(country: str, title: str) -> str:
    safe_title = re.sub(r'[\\/:"*?<>|]+', '', title).strip()
    return f'{country} - {safe_title}.pdf'


def parse_country_and_title(path: Path) -> tuple[str, str]:
    country = COUNTRY_ALIAS.get(path.parent.name.strip(), path.parent.name.strip())
    title = clean_title(path.name)
    prefix = f'{country} - '
    if title.startswith(prefix):
        title = title[len(prefix):].strip()
    return country, title


def main() -> int:
    src_root = SRC_DEFAULT
    if not src_root.exists():
        print(f'ERROR: source not found: {src_root}')
        return 2

    # keep checklist and gitkeep, replace sample payload only
    if DST_ROOT.exists():
        for child in DST_ROOT.iterdir():
            if child.name in {'.gitkeep', 'REDACTION_REVIEW_CHECKLIST.md'}:
                continue
            if child.is_dir():
                shutil.rmtree(child)
            else:
                child.unlink()
    else:
        DST_ROOT.mkdir(parents=True, exist_ok=True)

    items = []
    source_manifest = []
    seen = set()
    copied = 0

    for src in sorted(src_root.rglob('*')):
        if not src.is_file() or src.suffix.lower() != '.pdf':
            continue
        country, title = parse_country_and_title(src)
        # no unknown in published titles
        if re.search(r'\bunknown\b', title, flags=re.IGNORECASE):
            title = title.replace('Unknown', 'Document').replace('unknown', 'document').strip()

        country_slug = slugify(country)
        base_slug = slugify(f'{country}-{title}')
        slug = base_slug
        i = 2
        while slug in seen:
            slug = f'{base_slug}-{i}'
            i += 1
        seen.add(slug)

        dst_dir = DST_ROOT / country_slug / slug
        dst_dir.mkdir(parents=True, exist_ok=True)
        output_name = build_output_filename(country, title)
        dst_pdf = dst_dir / output_name
        shutil.copy2(src, dst_pdf)
        copied += 1

        items.append(
            {
                'country': country,
                'slug': slug,
                'title': title,
                'file_path': f"/samples/{country_slug}/{slug}/{quote(output_name)}",
                'reviewed': True,
                'reviewed_by': 'manual-sync',
                'reviewed_at': None,
                'notes': None,
            }
        )
        source_manifest.append(
            {
                'country': country,
                'slug': slug,
                'original_path': str(src),
                'original_filename': src.name,
                'published_filename': output_name,
                'published_path': str(dst_pdf),
                'title': title,
            }
        )

    index_path = DST_ROOT / 'index.json'
    index_path.write_text(json.dumps(items, ensure_ascii=False, indent=2), encoding='utf-8')
    manifest_path = DST_ROOT / 'source-manifest.json'
    manifest_path.write_text(json.dumps(source_manifest, ensure_ascii=False, indent=2), encoding='utf-8')

    unknown_titles = [x for x in items if re.search(r'\bunknown\b', x['title'], flags=re.IGNORECASE)]

    print(f'Source: {src_root}')
    print(f'Copied PDFs: {copied}')
    print(f'Index: {index_path}')
    print(f'Manifest: {manifest_path}')
    print(f'Unknown titles after import: {len(unknown_titles)}')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
