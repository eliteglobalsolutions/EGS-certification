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

      const body = await req.json();
      const orderNo = String(body?.orderNo || "").trim();
      const amountCents = Number(body?.amountCents ?? body?.totalCents ?? 0);
      const currency = String(body?.currency || "aud").toLowerCase();

      if (!orderNo) {
        return NextResponse.json({ error: "orderNo is required" }, { status:
  400 });
      }

      if (!Number.isInteger(amountCents) || amountCents <= 0) {
        return NextResponse.json({ error: "bad amount" }, { status: 400 });
      }

      const base = (process.env.NEXT_PUBLIC_SITE_URL ||
  "https://eliteglobalsolutions.co").replace(/\/$/, "");

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
      return NextResponse.json({ error: "checkout failed" }, { status: 500 });
    }
  }