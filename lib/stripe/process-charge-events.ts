import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { findOrderByPaymentRefs, recordPaymentEvent } from '@/lib/stripe/order-payments';

export async function processChargeRefunded(charge: Stripe.Charge, stripeEventId?: string) {
  const order = await findOrderByPaymentRefs({
    stripePaymentIntentId: typeof charge.payment_intent === 'string' ? charge.payment_intent : charge.payment_intent?.id,
    stripeChargeId: charge.id,
  });
  if (!order) return { ok: true as const, action: 'order_not_found' as const };

  const amountRefunded = charge.amount_refunded || 0;
  const isFullyRefunded = amountRefunded >= charge.amount;
  const now = new Date().toISOString();
  const note = isFullyRefunded
    ? (order.locale === 'zh' ? '款项已全额退款。' : 'Payment fully refunded.')
    : (order.locale === 'zh' ? '款项已部分退款。' : 'Payment partially refunded.');

  await supabaseAdmin.from('orders').update({
    status: isFullyRefunded ? 'cancelled' : order.status,
    internal_status: isFullyRefunded ? 'cancelled' : order.internal_status,
    client_status: isFullyRefunded ? 'cancelled' : order.client_status,
    client_note: note,
    updated_at: now,
  }).eq('id', order.id);

  await supabaseAdmin.from('order_events').insert({
    order_id: order.id,
    type: 'payment_refunded',
    message: isFullyRefunded ? 'Stripe charge fully refunded' : 'Stripe charge partially refunded',
    meta: {
      stripe_event_id: stripeEventId || null,
      stripe_charge_id: charge.id,
      amount: charge.amount,
      amount_refunded: amountRefunded,
      currency: charge.currency,
    },
  });

  await supabaseAdmin.from('orders_history').insert({
    order_id: order.id,
    client_status: isFullyRefunded ? 'cancelled' : (order.client_status || 'under_verification'),
    note,
    created_by: 'system',
  });

  const latestRefund = charge.refunds?.data?.[0];
  await recordPaymentEvent({
    orderId: order.id,
    eventType: 'charge.refunded',
    status: isFullyRefunded ? 'succeeded' : 'partial',
    amount: amountRefunded,
    currency: charge.currency,
    stripeEventId: stripeEventId || null,
    stripePaymentIntentId: typeof charge.payment_intent === 'string' ? charge.payment_intent : charge.payment_intent?.id,
    stripeChargeId: charge.id,
    stripeRefundId: latestRefund?.id || null,
      payload: {
        amount: charge.amount,
        amount_refunded: amountRefunded,
        refund_count: charge.refunds?.data?.length || 0,
      },
    });

  return { ok: true as const, action: 'refund_synced' as const, orderId: order.id, orderNo: order.order_no };
}

export async function processDisputeCreated(dispute: Stripe.Dispute, stripeEventId?: string) {
  const order = await findOrderByPaymentRefs({
    stripeChargeId: typeof dispute.charge === 'string' ? dispute.charge : dispute.charge?.id,
    stripeDisputeId: dispute.id,
  });
  if (!order) return { ok: true as const, action: 'order_not_found' as const };

  const now = new Date().toISOString();
  const note = order.locale === 'zh'
    ? '支付争议已触发，订单已进入人工风控复核。'
    : 'Payment dispute opened. Order moved to manual risk review.';

  await supabaseAdmin.from('orders').update({
    status: 'requires_manual_review',
    internal_status: 'requires_manual_review',
    client_status: 'action_required',
    client_note: note,
    updated_at: now,
  }).eq('id', order.id);

  await supabaseAdmin.from('order_events').insert({
    order_id: order.id,
    type: 'payment_dispute',
    message: 'Stripe dispute created',
    meta: {
      stripe_event_id: stripeEventId || null,
      stripe_dispute_id: dispute.id,
      reason: dispute.reason,
      amount: dispute.amount,
      currency: dispute.currency,
      status: dispute.status,
    },
  });

  await supabaseAdmin.from('orders_history').insert({
    order_id: order.id,
    client_status: 'action_required',
    note,
    created_by: 'system',
  });

  await recordPaymentEvent({
    orderId: order.id,
    eventType: 'charge.dispute.created',
    status: dispute.status,
    amount: dispute.amount,
    currency: dispute.currency,
    stripeEventId: stripeEventId || null,
    stripeChargeId: typeof dispute.charge === 'string' ? dispute.charge : dispute.charge?.id,
    stripeDisputeId: dispute.id,
    payload: {
      reason: dispute.reason,
      evidence_due_by: dispute.evidence_details?.due_by || null,
      is_charge_refundable: dispute.is_charge_refundable,
    },
  });

  return { ok: true as const, action: 'dispute_synced' as const, orderId: order.id, orderNo: order.order_no };
}
