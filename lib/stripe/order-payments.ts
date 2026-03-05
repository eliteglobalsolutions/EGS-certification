import { supabaseAdmin } from '@/lib/supabase/admin';

type PaymentRecordInput = {
  orderId: string;
  eventType: string;
  status?: string | null;
  amount?: number | null;
  currency?: string | null;
  stripeEventId?: string | null;
  stripeSessionId?: string | null;
  stripePaymentIntentId?: string | null;
  stripeChargeId?: string | null;
  stripeRefundId?: string | null;
  stripeDisputeId?: string | null;
  receiptUrl?: string | null;
  riskLevel?: string | null;
  riskScore?: number | null;
  payload?: unknown;
};

export async function recordPaymentEvent(input: PaymentRecordInput) {
  const { error } = await supabaseAdmin.from('order_payments').insert({
    order_id: input.orderId,
    event_type: input.eventType,
    status: input.status ?? null,
    amount: input.amount ?? null,
    currency: input.currency ?? null,
    stripe_event_id: input.stripeEventId ?? null,
    stripe_session_id: input.stripeSessionId ?? null,
    stripe_payment_intent_id: input.stripePaymentIntentId ?? null,
    stripe_charge_id: input.stripeChargeId ?? null,
    stripe_refund_id: input.stripeRefundId ?? null,
    stripe_dispute_id: input.stripeDisputeId ?? null,
    receipt_url: input.receiptUrl ?? null,
    risk_level: input.riskLevel ?? null,
    risk_score: input.riskScore ?? null,
    payload: input.payload ?? {},
  });
  if (error && error.code !== '23505') throw error;
}

export async function findOrderByPaymentRefs(refs: {
  stripeSessionId?: string | null;
  stripePaymentIntentId?: string | null;
  stripeChargeId?: string | null;
  stripeDisputeId?: string | null;
}) {
  if (refs.stripeSessionId) {
    const bySession = await supabaseAdmin
      .from('orders')
      .select('*')
      .eq('stripe_session_id', refs.stripeSessionId)
      .limit(1)
      .maybeSingle();
    if (bySession.error) throw bySession.error;
    if (bySession.data) return bySession.data;
  }

  let query = supabaseAdmin.from('order_payments').select('order_id').limit(1);
  if (refs.stripePaymentIntentId) query = query.eq('stripe_payment_intent_id', refs.stripePaymentIntentId);
  else if (refs.stripeChargeId) query = query.eq('stripe_charge_id', refs.stripeChargeId);
  else if (refs.stripeDisputeId) query = query.eq('stripe_dispute_id', refs.stripeDisputeId);
  else return null;

  const paymentRef = await query.maybeSingle();
  if (paymentRef.error) throw paymentRef.error;
  if (!paymentRef.data?.order_id) return null;

  const order = await supabaseAdmin.from('orders').select('*').eq('id', paymentRef.data.order_id).limit(1).maybeSingle();
  if (order.error) throw order.error;
  return order.data ?? null;
}
