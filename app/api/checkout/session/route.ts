import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    const origin = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ quantity: 1, price_data: { currency: 'aud', unit_amount: 12000, product_data: { name: 'EGS Certification Service' } } }],
      success_url: `${origin}/track-order?paid=1`,
      cancel_url: `${origin}/start-order?cancelled=1`,
    });
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Failed to create checkout', error);
    return NextResponse.json({ error: 'Unable to start payment session.' }, { status: 500 });
  }
}
