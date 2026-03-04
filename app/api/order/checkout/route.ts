  import { NextResponse } from "next/server";
  import Stripe from "stripe";
  import { supabaseAdmin } from "@/lib/supabase/admin";

  export const runtime = "nodejs";

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

  function toSafeObjectName(original: string) {
    const ext = "bin";
  }

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

      const body = await req.json();
      const orderNo = String(body?.orderNo || "").trim();
      const amountCents = Number(body?.amountCents);
      const currency = String(body?.currency || "aud").toLowerCase();
      const files = Array.isArray(body?.files) ? body.files : [];

      if (!orderNo) return NextResponse.json({ error: "orderNo is required" },
  { status: 400 });
      if (!Number.isInteger(amountCents) || amountCents <= 0) {
        return NextResponse.json({ error: "amountCents must be positive
      }

      const { data: orderRow, error: orderErr } = await supabaseAdmin
        .from("orders")
        .select("id")
        .eq("order_no", orderNo)
        .single();

      if (orderErr || !orderRow?.id) {
        return NextResponse.json({ error: orderErr?.message || "Order not
  found" }, { status: 400 });
      }

      for (const f of files) {
        const rawName = String(f?.name || "upload.bin");
        const base64 = String(f?.contentBase64 || "");
        if (!base64) continue;

        const safeName = toSafeObjectName(rawName);
        const key = `orders/${orderRow.id}/intake/customer/${safeName}`;
        const bytes = Buffer.from(base64, "base64");

        const { error: upErr } = await supabaseAdmin.storage
          .from("order-files")
          .upload(key, bytes, { upsert: false, contentType: "application/octet-
  stream" });

        if (upErr) {
          throw upErr;
        }
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
        {
          error: error?.message || "checkout init failed",
          type: error?.type || null,
          code: error?.code || null,
          status: error?.status || null,
        },
        { status: 500 }
      );
    }
  }
  EOF
  git add app/api/order/checkout/route.ts
  git commit -m "Fix checkout storage key with safe filename generator"
  git push origin main
