import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { requireEnv } from '@/lib/env';
import { generateAccessToken } from '@/lib/security';
import { generateOrderNo } from '@/lib/format';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const signature = req.headers.get('stripe-signature');
    if (!signature) return NextResponse.json({ error: 'Missing signature' }, { status: 400 });

    const body = await req.text();
    const event = stripe.webhooks.constructEvent(body, signature, requireEnv('STRIPE_WEBHOOK_SECRET'));

    if (event.type !== 'checkout.session.completed') {
      return NextResponse.json({ ok: true });
    }

    const session = event.data.object;
    const sessionId = session.id;
    const metadata = session.metadata ?? {};

    let query = supabaseAdmin.from('orders').select('*').eq('stripe_session_id', sessionId).limit(1).maybeSingle();
    if (metadata.order_id) {
      query = supabaseAdmin.from('orders').select('*').eq('id', metadata.order_id).limit(1).maybeSingle();
    }
    const { data: existing, error: findError } = await query;
    if (findError) throw findError;

    const basePayload = {
      customer_email: session.customer_details?.email ?? session.customer_email ?? null,
      amount_total: session.amount_total,
      currency: session.currency,
      stripe_session_id: sessionId,
      updated_at: new Date().toISOString(),
    };

    if (existing) {
      if (existing.status !== 'paid') {
        const { error: updateError } = await supabaseAdmin
          .from('orders')
          .update({ ...basePayload, status: 'paid' })
          .eq('id', existing.id);
        if (updateError) throw updateError;

        await supabaseAdmin.from('order_events').insert({
          order_id: existing.id,
          type: 'paid',
          message: 'Stripe checkout.session.completed',
          meta: { session_id: sessionId },
        });
      }
      return NextResponse.json({ ok: true });
    }

    const accessToken = generateAccessToken();
    const { data: created, error: createError } = await supabaseAdmin
      .from('orders')
      .insert({
        order_no: metadata.order_no ?? generateOrderNo(),
        access_token: accessToken,
        status: 'paid',
        ...basePayload,
      })
      .select('*')
      .single();

    if (createError) {
      if (createError.code === '23505') return NextResponse.json({ ok: true });
      throw createError;
    }

    await supabaseAdmin.from('order_events').insert([
      {
        order_id: created.id,
        type: 'created',
        message: 'Order created from Stripe webhook',
        meta: { session_id: sessionId },
      },
      {
        order_id: created.id,
        type: 'paid',
        message: 'Stripe checkout.session.completed',
        meta: { session_id: sessionId },
      },
    ]);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Stripe webhook failed', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
