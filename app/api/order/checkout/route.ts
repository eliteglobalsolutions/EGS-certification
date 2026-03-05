import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { rateLimit } from '@/lib/rate-limit';
import { COMPANY_ABN, COMPANY_ADDRESS, COMPANY_EMAIL, COMPANY_LEGAL_NAME } from '@/lib/company';

export const runtime = 'nodejs';

let stripeClient: Stripe | null = null;

function getStripeClient(secretKey: string) {
  if (!stripeClient) stripeClient = new Stripe(secretKey);
  return stripeClient;
}

export async function POST(req: Request) {
  try {
    const limited = rateLimit(req, { namespace: 'order_checkout', limit: 20, windowMs: 60_000 });
    if (!limited.ok) {
      return NextResponse.json(
        { error: 'Too many requests. Please retry shortly.' },
        { status: 429, headers: { 'Retry-After': String(limited.retryAfterSec) } }
      );
    }

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    if (!stripeSecretKey) {
      return NextResponse.json({ error: 'Missing STRIPE_SECRET_KEY' }, { status: 500 });
    }
    if (!siteUrl) {
      return NextResponse.json({ error: 'Missing NEXT_PUBLIC_SITE_URL' }, { status: 500 });
    }

    const body = await req.json();
    const orderNo = String(body?.orderNo || '').trim();
    const amountCents = Number(body?.amountCents ?? body?.totalCents ?? 0);
    const currency = String(body?.currency || 'aud').toLowerCase();
    const locale = body?.locale === 'zh' ? 'zh' : 'en';
    const orderId = body?.orderId ? String(body.orderId) : '';
    const customerEmail = String(body?.email || '').trim();

    if (!orderNo) {
      return NextResponse.json({ error: 'orderNo is required' }, { status: 400 });
    }

    if (!Number.isInteger(amountCents) || amountCents <= 0) {
      return NextResponse.json({ error: 'amountCents must be positive integer' }, { status: 400 });
    }

    const base = siteUrl.replace(/\/$/, '');
    const stripe = getStripeClient(stripeSecretKey);
    const successUrl = new URL(`${base}/${locale}/order/success`);
    successUrl.searchParams.set('session_id', '{CHECKOUT_SESSION_ID}');
    successUrl.searchParams.set('order_no', orderNo);
    if (orderId) successUrl.searchParams.set('order_id', orderId);

    const cancelUrl = new URL(`${base}/${locale}/order/new`);
    cancelUrl.searchParams.set('cancelled', '1');
    cancelUrl.searchParams.set('order_no', orderNo);

    const metadata: Record<string, string> = { order_no: orderNo, locale };
    if (orderId) metadata.order_id = orderId;

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: customerEmail || undefined,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency,
            unit_amount: amountCents,
            product_data: {
              name: `EGS Order ${orderNo}`,
              description: 'Apostille / legalisation service',
            },
          },
        },
      ],
      invoice_creation: {
        enabled: true,
        invoice_data: {
          description: `Service invoice for order ${orderNo}`,
          footer: `${COMPANY_LEGAL_NAME} | ABN ${COMPANY_ABN} | ${COMPANY_ADDRESS} | ${COMPANY_EMAIL}`,
          metadata,
          custom_fields: [
            { name: 'Order Reference', value: orderNo },
            { name: 'ABN', value: COMPANY_ABN },
          ],
        },
      },
      metadata,
      success_url: successUrl.toString(),
      cancel_url: cancelUrl.toString(),
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Checkout API failed', error);
    return NextResponse.json(
      {
        error: error?.message || 'checkout init failed',
        type: error?.type || null,
        code: error?.code || null,
      },
      { status: 500 }
    );
  }
}
