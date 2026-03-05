import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { generateAccessToken } from '@/lib/security';
import { generateOrderNo } from '@/lib/format';
import { sendOrderConfirmation } from '@/lib/notifications';
import { getStatusLabel } from '@/lib/i18n/dictionaries';

type ProcessSource = 'webhook' | 'admin_replay';

export async function processCheckoutSessionCompleted(
  session: Stripe.Checkout.Session,
  source: ProcessSource = 'webhook'
) {
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
    const alreadySynced = existing.stripe_session_id === sessionId
      && existing.status === 'paid'
      && existing.client_status === 'under_verification';
    if (alreadySynced) {
      return { ok: true as const, action: 'already_synced' as const, orderId: existing.id, orderNo: existing.order_no };
    }

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
        message: source === 'admin_replay' ? 'Consent missing during admin replay' : 'Missing/invalid legal consent at webhook verification',
        meta: { session_id: sessionId, source },
      });

      return { ok: true as const, action: 'consent_missing' as const, orderId: existing.id, orderNo: existing.order_no };
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
      message: source === 'admin_replay' ? 'Stripe checkout replayed by admin' : 'Stripe checkout.session.completed',
      meta: { session_id: sessionId, source },
    });

    await supabaseAdmin.from('orders_history').insert({
      order_id: existing.id,
      client_status: 'under_verification',
      note: locale === 'zh' ? '付款已确认，进入核验阶段。' : 'Payment confirmed and moved to verification.',
      created_by: source === 'admin_replay' ? 'admin' : 'system',
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

    return { ok: true as const, action: 'updated_existing' as const, orderId: existing.id, orderNo: existing.order_no };
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
    if (createError.code === '23505') {
      return { ok: true as const, action: 'duplicate_ignored' as const };
    }
    throw createError;
  }

  await supabaseAdmin.from('order_events').insert([
    {
      order_id: created.id,
      type: 'created',
      message: 'Order created from Stripe webhook',
      meta: { session_id: sessionId, source },
    },
    {
      order_id: created.id,
      type: 'paid',
      message: source === 'admin_replay' ? 'Stripe checkout replayed by admin' : 'Stripe checkout.session.completed',
      meta: { session_id: sessionId, source },
    },
    {
      order_id: created.id,
      type: 'consent_missing',
      message: 'Webhook created order without pre-existing consent record',
      meta: { session_id: sessionId, source },
    },
  ]);

  await supabaseAdmin.from('orders_history').insert({
    order_id: created.id,
    client_status: 'action_required',
    note: locale === 'zh' ? '同意记录缺失，已转人工复核。' : 'Consent record missing. Moved to manual review.',
    created_by: source === 'admin_replay' ? 'admin' : 'system',
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

  return { ok: true as const, action: 'created_from_session' as const, orderId: created.id, orderNo: created.order_no };
}
