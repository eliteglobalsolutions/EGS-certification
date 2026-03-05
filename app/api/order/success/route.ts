import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const sessionId = url.searchParams.get('session_id');
    const orderId = url.searchParams.get('order_id');

    let query = supabaseAdmin.from('orders').select('*').limit(1).maybeSingle();
    if (orderId) query = supabaseAdmin.from('orders').select('*').eq('id', orderId).limit(1).maybeSingle();
    else if (sessionId) query = supabaseAdmin.from('orders').select('*').eq('stripe_session_id', sessionId).limit(1).maybeSingle();
    else return NextResponse.json({ error: 'Missing session_id/order_id' }, { status: 400 });

    const { data: order, error } = await query;
    if (error) throw error;
    if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    const paymentConfirmed = Boolean(order.stripe_session_id) && ['paid', 'requires_manual_review'].includes(order.status || '');
    if (!paymentConfirmed) {
      return NextResponse.json({ error: 'Payment not confirmed yet.', pending: true }, { status: 409 });
    }

    return NextResponse.json({
      order: {
        id: order.id,
        order_no: order.order_no,
        access_token: order.access_token,
        client_status: order.client_status ?? order.status,
        estimated_days: order.estimated_days,
        destination_country: order.destination_country,
        service_type: order.service_type,
        document_quantity: order.document_quantity,
        delivery_method: order.delivery_method,
        amount_total: order.amount_total,
        currency: order.currency,
        invoice_url: order.invoice_url,
      },
    });
  } catch (error) {
    console.error('Order success lookup failed', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
