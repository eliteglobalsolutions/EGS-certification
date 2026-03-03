import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { requireEnv } from '@/lib/env';
import { generateAccessToken } from '@/lib/security';
import { generateOrderNo } from '@/lib/format';
import { sendOrderConfirmation } from '@/lib/notifications';
import { getStatusLabel } from '@/lib/i18n/dictionaries';

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

    const locale = (metadata.locale === 'zh' ? 'zh' : 'en') as 'en' | 'zh';
    const paidNow = new Date().toISOString();

    const basePayload = {
      customer_email: session.customer_details?.email ?? session.customer_email ?? null,
      amount_total: session.amount_total,
      currency: session.currency,
      stripe_session_id: sessionId,
      paid_at: paidNow,
      updated_at: paidNow,
    };

    if (existing) {
      const { data: consent, error: consentError } = await supabaseAdmin
        .from('order_consents')
        .select('*')
        .eq('order_id', existing.id)
        .maybeSingle();
      if (consentError) throw consentError;

      const consentValid = Boolean(consent && consent.tos_accepted && consent.privacy_accepted && consent.auth_accepted);
      if (!consentValid) {
        await supabaseAdmin.from('orders').update({
          status: 'requires_manual_review',
          internal_status: 'requires_manual_review',
          client_status: 'action_required',
          client_note: locale === 'zh' ? '付款已收到，但同意记录异常，订单已转人工复核。' : 'Payment received but consent record is incomplete. Order moved to manual review.',
          updated_at: paidNow,
        }).eq('id', existing.id);

        await supabaseAdmin.from('order_events').insert({
          order_id: existing.id,
          type: 'consent_missing',
          message: 'Missing/invalid legal consent at webhook verification',
          meta: { session_id: sessionId },
        });
        console.error('[consent][missing]', { orderId: existing.id, sessionId });
        return NextResponse.json({ ok: true });
      }

      const nextValues = {
        ...basePayload,
        status: 'paid',
        internal_status: 'initial_verification',
        client_status: 'under_verification',
        client_note: locale === 'zh' ? '付款已确认，订单进入初始核验。' : 'Payment confirmed. Order moved to initial verification.',
      };

      const { error: updateError } = await supabaseAdmin.from('orders').update(nextValues).eq('id', existing.id);
      if (updateError) throw updateError;

      await supabaseAdmin.from('order_events').insert({
        order_id: existing.id,
        type: 'paid',
        message: 'Stripe checkout.session.completed',
        meta: { session_id: sessionId },
      });

      await supabaseAdmin.from('orders_history').insert({
        order_id: existing.id,
        client_status: 'under_verification',
        note: locale === 'zh' ? '付款已确认，进入核验阶段。' : 'Payment confirmed and moved to verification.',
        created_by: 'system',
      });

      if (nextValues.customer_email) {
        await sendOrderConfirmation({
          locale,
          to: nextValues.customer_email,
          reference: existing.order_no,
          status: getStatusLabel(locale, 'under_verification'),
          trackingLink: `/${locale}/order/track`,
          summary: `${existing.service_type || '-'} / ${existing.destination_country || '-'}`,
        });
      }
      return NextResponse.json({ ok: true });
    }

    const accessToken = generateAccessToken();
    const { data: created, error: createError } = await supabaseAdmin
      .from('orders')
      .insert({
        order_no: metadata.order_no ?? generateOrderNo(),
        order_code: metadata.order_no ?? generateOrderNo(),
        access_token: accessToken,
        status: 'requires_manual_review',
        internal_status: 'requires_manual_review',
        client_status: 'action_required',
        client_note: locale === 'zh' ? '付款已收到，但同意记录缺失，订单已转人工复核。' : 'Payment received but consent record missing. Order moved to manual review.',
        locale,
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
      {
        order_id: created.id,
        type: 'consent_missing',
        message: 'Webhook created order without pre-existing consent record',
        meta: { session_id: sessionId },
      },
    ]);

    await supabaseAdmin.from('orders_history').insert({
      order_id: created.id,
      client_status: 'action_required',
      note: locale === 'zh' ? '同意记录缺失，已转人工复核。' : 'Consent record missing. Moved to manual review.',
      created_by: 'system',
    });

    if (created.customer_email) {
      await sendOrderConfirmation({
        locale,
        to: created.customer_email,
        reference: created.order_no,
        status: getStatusLabel(locale, 'action_required'),
        trackingLink: `/${locale}/order/track`,
        summary: `${created.service_type || '-'} / ${created.destination_country || '-'}`,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Stripe webhook failed', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
