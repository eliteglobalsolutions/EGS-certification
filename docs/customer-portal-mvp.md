# Customer Portal MVP

## Goal
Upgrade the current marketing + order site into a customer-facing portal where a buyer can:

1. create an account or continue as guest
2. place an order
3. pay via Stripe
4. upload files
5. track progress in one signed-in workspace

## Why this path is fastest
- Keep `Supabase` for auth, data, and storage
- Keep `Stripe` for checkout and payment lifecycle
- Reuse existing order, upload, success, and portal pages
- Add account ownership on top of the current token-based order access flow

## Existing foundation already present
- `app/[locale]/order/new/page.tsx`: multi-step order flow
- `app/api/order/checkout/route.ts`: Stripe checkout creation
- `app/[locale]/portal/success/page.tsx`: post-payment success and next steps
- `app/[locale]/portal/orders/[id]/page.tsx`: portal-style order detail access
- `app/[locale]/track/page.tsx`: public tracking

## MVP stages
### Stage 1: Account foundation
- Add `customer_profiles`
- Add `orders.customer_user_id`
- Support guest checkout and later account-claim flow
- Introduce signed-in "My Orders"

### Stage 2: Signed-in portal
- Email/password or magic-link auth with Supabase
- Dashboard page listing owned orders
- Order detail page without manual token entry
- Upload supplemental files inside account portal

### Stage 3: Checkout integration
- If signed in, attach Stripe checkout order to `customer_user_id`
- If guest, allow claim-link after payment success
- Preserve current guest flow as fallback

### Stage 4: Product polish
- Email notifications
- Invoice/history visibility
- Saved profile details for repeat checkout
- Subscription / prepaid plans only if needed later

## Product decision
Default recommendation:
- launch with **guest checkout + optional account creation**

Reason:
- fastest conversion path
- lowest friction for first purchase
- still allows repeat customers to graduate into a real portal
