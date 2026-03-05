import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { requireEnv } from '@/lib/env';
import { processCheckoutSessionCompleted } from '@/lib/stripe/process-checkout-session';
import { processChargeRefunded, processDisputeCreated } from '@/lib/stripe/process-charge-events';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const signature = req.headers.get('stripe-signature');
    if (!signature) return NextResponse.json({ error: 'Missing signature' }, { status: 400 });

    const body = await req.text();
    const event = stripe.webhooks.constructEvent(body, signature, requireEnv('STRIPE_WEBHOOK_SECRET'));

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      await processCheckoutSessionCompleted(session, 'webhook', event.id);
      return NextResponse.json({ ok: true });
    }

    if (event.type === 'charge.refunded') {
      const charge = event.data.object;
      await processChargeRefunded(charge, event.id);
      return NextResponse.json({ ok: true });
    }

    if (event.type === 'charge.dispute.created') {
      const dispute = event.data.object;
      await processDisputeCreated(dispute, event.id);
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Stripe webhook failed', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
