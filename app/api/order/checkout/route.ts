  import { NextResponse } from "next/server";
  import Stripe from "stripe";

  export const runtime = "nodejs";

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

  export async function POST(req: Request) {
    try {
      if (!process.env.STRIPE_SECRET_KEY) {
        return NextResponse.json({ error: "Missing STRIPE_SECRET_KEY" },
  { status: 500 });
      }
      if (!process.env.NEXT_PUBLIC_SITE_URL) {
        return NextResponse.json({ error: "Missing NEXT_PUBLIC_SITE_URL" },
  { status: 500 });
      }

      const raw = await req.text();
      let body: any = {};
      try {
        body = raw ? JSON.parse(raw) : {};
      } catch {
        const params = new URLSearchParams(raw);
        if (Array.from(params.keys()).length > 0) {
          body = Object.fromEntries(params.entries());
        } else {
          return NextResponse.json({ error: "Invalid JSON body" }, { status:
  400 });
        }
      }

      const orderNo = String(body?.orderNo || body?.order_no || "").trim();
      const amountCents = Number(body?.amountCents ?? body?.totalCents ??
  body?.amount ?? 0);
      const currency = String(body?.currency || "aud").toLowerCase();

      if (!orderNo) {
        return NextResponse.json({ error: "orderNo is required" }, { status:
  400 });
      }
      if (!Number.isInteger(amountCents) || amountCents <= 0) {
        return NextResponse.json({ error: "amountCents must be positive
  integer" }, { status: 400 });
      }

      const base = process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency,
              unit_amount: amountCents,
              product_data: {
                name: `EGS Order ${orderNo}`,
                description: "Apostille / legalisation service",
              },
            },
          },
        ],
        metadata: { orderNo },
        success_url: `${base}/order/success?session_id={CHECKOUT_SESSION_ID}
  &order_no=${encodeURIComponent(orderNo)}`,
        cancel_url: `${base}/order/new?
  cancelled=1&order_no=${encodeURIComponent(orderNo)}`,
      });

      return NextResponse.json({ url: session.url });
    } catch (error: any) {
      console.error("Checkout API failed", error);
      return NextResponse.json(
        { error: error?.message || "checkout init failed", type: error?.type ||
  null, code: error?.code || null },
        { status: 500 }
      );
    }
  }
