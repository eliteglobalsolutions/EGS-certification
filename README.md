# ELITE GLOBAL SOLUTIONS PTY LTD Workflow

## Entrypoint
- Single production entrypoint: Next.js App Router (`app/[locale]/...`).
- Legacy static HTML is backup-only under `legacy/` and is not a deployment entry.

## Legacy Redirects
Configured in `next.config.mjs`:
- `/index.html` -> `/en` (308)
- `/v3.html` -> `/en` (308)
- `/*.html` -> `/en` (308)

## Deployment
- This repo is deployed as a Next.js application (`npm run build` output).
- No static HTML root publish path is used.

详见 [SETUP.md](./SETUP.md)。

## Route Checker Rules (v1)
- API: `POST /api/route/estimate`
- Input: issuing country, destination country, document type, quantity, translation/original handling flags, speed, and optional Hague hint.
- Logic:
  - If both issuing and destination are inside the curated Hague list, route defaults to `apostille`.
  - If user selects non-Hague, route becomes `consular_legalisation`.
  - Otherwise fallback is `needs_review` or conservative consular route.
- Output always includes compliance language: final route is confirmed before processing; timelines are estimates; third parties make final decisions.

## Public Tracking Privacy Constraints
- Public API: `GET /api/orders/public-status?order_code=...`
- Public response includes only:
  - `order_code`
  - `client_status`
  - `client_note`
  - `estimated_days`
  - `updated_at`
- No personal fields (email, phone, address, uploaded files, payment info) are returned from public tracking endpoints.
