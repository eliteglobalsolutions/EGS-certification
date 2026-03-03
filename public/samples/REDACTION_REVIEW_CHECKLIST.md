# Sample Redaction Review Checklist

Review each generated sample PDF before publishing.

## Required checks
- Page count is 1-3 pages only.
- Orientation is correct (upright, readable).
- White opaque sticker redactions cover:
  - names
  - addresses
  - phone numbers
  - emails
  - IDs / document numbers
  - age / DOB
  - company names
  - signatures
  - QR codes / barcodes
  - any identifiable personal information
- Watermark appears on every page:
  - `EGS`
  - `eliteglobalsolutions.co`
- No visible leakage around sticker edges.

## Review workflow
1. Open `/[locale]/samples`
2. Filter by country.
3. Open each sample PDF in viewer.
4. If approved, run:
   `node scripts/mark_reviewed.js --slug=<slug> --by="<name>" --notes="review ok"`
5. If not approved, update `samples_raw/{country}/{slug}/redaction.json`, rebuild, and re-review.
