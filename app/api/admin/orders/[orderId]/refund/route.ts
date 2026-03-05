import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { recordPaymentEvent } from '@/lib/stripe/order-payments';

export async function POST(req: Request, context: { params: Promise<{ orderId: string }> }) {
  try {
    const { orderId } = await context.params;
    const body = await req.json().catch(() => ({} as { amount?: number; reason?: 'duplicate' | 'fraudulent' | 'requested_by_customer' }));
    const requestedAmount = Number(body?.amount || 0);
    const reason = body?.reason || 'requested_by_customer';

    const { data: order, error: orderError } = await supabaseAdmin.from('orders').select('*').eq('id', orderId).single();
    if (orderError) throw orderError;

    const { data: payment, error: paymentError } = await supabaseAdmin
      .from('order_payments')
      .select('*')
      .eq('order_id', orderId)
      .eq('event_type', 'checkout.session.completed')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    if (paymentError) throw paymentError;
    if (!payment?.stripe_payment_intent_id && !payment?.stripe_charge_id) {
      return NextResponse.json({ error: 'No refundable payment intent found for this order.' }, { status: 404 });
    }

    const refund = await stripe.refunds.create({
      payment_intent: payment.stripe_payment_intent_id || undefined,
      charge: payment.stripe_charge_id || undefined,
      amount: requestedAmount > 0 ? requestedAmount : undefined,
      reason,
      metadata: {
        order_id: order.id,
        order_no: order.order_no,
      },
    });

    const isFull = refund.amount >= (order.amount_total || refund.amount);
    const now = new Date().toISOString();
    const note = isFull
      ? (order.locale === 'zh' ? '已完成退款，订单关闭。' : 'Refund completed. Order closed.')
      : (order.locale === 'zh' ? '已完成部分退款。' : 'Partial refund completed.');

    await supabaseAdmin.from('orders').update({
      status: isFull ? 'cancelled' : order.status,
      internal_status: isFull ? 'cancelled' : order.internal_status,
      client_status: isFull ? 'cancelled' : order.client_status,
      client_note: note,
      updated_at: now,
    }).eq('id', order.id);

    await supabaseAdmin.from('order_events').insert({
      order_id: order.id,
      type: 'refund_issued',
      message: `Admin issued ${isFull ? 'full' : 'partial'} refund`,
      meta: {
        stripe_refund_id: refund.id,
        amount: refund.amount,
        currency: refund.currency,
        reason: refund.reason,
      },
    });

    await supabaseAdmin.from('orders_history').insert({
      order_id: order.id,
      client_status: isFull ? 'cancelled' : (order.client_status || 'under_verification'),
      note,
      created_by: 'admin',
    });

    await recordPaymentEvent({
      orderId: order.id,
      eventType: 'refund.issued',
      status: refund.status || null,
      amount: refund.amount,
      currency: refund.currency,
      stripePaymentIntentId: typeof refund.payment_intent === 'string' ? refund.payment_intent : refund.payment_intent?.id,
      stripeChargeId: typeof refund.charge === 'string' ? refund.charge : refund.charge?.id,
      stripeRefundId: refund.id,
      payload: refund,
    });

    return NextResponse.json({
      ok: true,
      refund: {
        id: refund.id,
        amount: refund.amount,
        currency: refund.currency,
        status: refund.status,
        reason: refund.reason,
      },
    });
  } catch (error: any) {
    console.error('Admin refund failed', error);
    return NextResponse.json({ error: error?.message || 'Failed to create refund.' }, { status: 500 });
  }
}
