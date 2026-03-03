# EGS Certification Product Guardrails

## Brand Direction
- Experience goals: structured, transparent, predictable.
- Visual style: minimal black/white/deep-gray, generous whitespace, restrained information density.
- Accent usage: only for critical status highlights and primary action hover/active states.
- Build hierarchy with typography, spacing rhythm, and 1px separators.
- Avoid decorative gradients/illustrations/icon-heavy UI.

## Compliance Language Rules
- Positioning: independent document processing service provider.
- Must not imply representation of any government authority, embassy, consulate, DFAT, or notary office.
- Must not claim guaranteed outcomes or guaranteed processing time.
- Use wording such as: estimated timeline, subject to authority processing time.
- Forbidden implication examples:
  - "we represent DFAT"
  - "we are the embassy's official partner"
  - "government guaranteed approval"

## i18n Routing Rules
- Public site routes are locale-scoped:
  - `/en/...` for English
  - `/zh/...` for Chinese
- Do not mix English and Chinese in one page.
- Every user-facing string should come from dictionaries.
- Legacy routes should remain reachable by redirect.
- Single production entrypoint: Next.js App Router routes only.
- Legacy static HTML is backup-only under `/legacy/*` and must not be deployed as live entry.

## Key Experience Pages
- Home: `/[locale]`
- Services: `/[locale]/services`
- Order: `/[locale]/order/new`
- Success: `/[locale]/portal/success?session_id=...`
- Public Track: `/[locale]/order/track`
- Portal Track: `/[locale]/portal/orders/[id]`

## Legacy Path Mapping
- `/index.html` -> `/en`
- `/v3.html` -> `/en`
- `/*.html` (legacy static paths) -> `/en`

## Data Model Notes
- Keep legacy `orders.status` for backward compatibility.
- Preferred fields:
  - `internal_status`, `internal_note`
  - `client_status`, `client_note`
- Timeline states:
  1. received
  2. under_verification
  3. submitted_processing
  4. completed
  5. dispatched

## Security and Exposure Rules
- Public query endpoints return minimal required information.
- Portal endpoints can return richer details after stronger verification.
- No status mutation in success page display endpoints.

## Local Commands
- Install: `npm install`
- Dev: `npm run dev`
- Build check: `npm run build`
- Stripe webhook forward: `stripe listen --forward-to localhost:3000/api/webhook/stripe`
