# Local End-to-End Setup

## 1) Install dependencies

```bash
npm install
```

## 2) Configure environment variables

Copy `.env.example` to `.env.local`, then fill in:
- Supabase keys
- Stripe keys
- `ADMIN_PASSWORD`
- Optional mail delivery:
  - `RESEND_API_KEY`
  - `MAIL_FROM` (example: `ELITE GLOBAL SOLUTIONS PTY LTD <no-reply@yourdomain.com>`)

If `RESEND_API_KEY` is empty, email sending falls back to dry-run logs.

## 3) Run Supabase migrations

Option A (CLI):

```bash
supabase db push
```

Option B (SQL Editor): execute:
- `supabase/migrations/202602220001_orders_workflow.sql`
- `supabase/migrations/202602270001_structured_order_upgrade.sql`

## 4) Start Next.js app

```bash
npm run dev
```

## 5) Start Stripe webhook forwarding

```bash
stripe listen --forward-to localhost:3000/api/webhook/stripe
```

Copy the signing secret to `STRIPE_WEBHOOK_SECRET`.

## 6) Test checkout + success redirect

1. Open `/en/order/new` (or `/zh/order/new`)
2. Complete steps and enter Stripe Checkout
3. Finish payment with test card
4. Verify redirect to `/en/order/success?session_id=...&order_id=...`
5. Confirm page shows reference number, current status, next steps, and tracking entry

## 7) Test public tracking and upload

1. Use `/en/order/track` with `order_no + access_token`
2. Confirm timeline/status/history are visible
3. If action-required, upload via `/en/order/upload`

## 8) Test admin portal

1. Open `/admin/orders`
2. Basic Auth:
   - username: `admin`
   - password: `ADMIN_PASSWORD`
3. Update internal status and optional client status sync
4. Upload admin files and verify history entries

## 9) Mail verification

- If `RESEND_API_KEY` is set, confirmation and status-update emails are sent via Resend.
- If not set, payload is logged as `[mail][dry-run]`.

## Security Notes

- Public query endpoints return minimal fields.
- Portal endpoint requires `order_no + access_token` and returns extended details.
- Database tables remain RLS-enabled with deny-all policies; server uses service role.
