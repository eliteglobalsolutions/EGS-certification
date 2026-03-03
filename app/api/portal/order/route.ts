import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { safeEqual } from '@/lib/security';
import { normalizeClientStatus } from '@/lib/status';

export async function POST(req: Request) {
  try {
    const { orderNo, accessToken } = await req.json();
    if (!orderNo || !accessToken) {
      return NextResponse.json({ error: 'Missing orderNo/accessToken' }, { status: 400 });
    }

    const { data: order, error } = await supabaseAdmin.from('orders').select('*').eq('order_no', orderNo).limit(1).maybeSingle();
    if (error) throw error;
    if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    if (!order.access_token || !safeEqual(order.access_token, accessToken)) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 403 });
    }

    const [{ data: files }, { data: history }, { data: submissionEvents }] = await Promise.all([
      supabaseAdmin.from('order_files').select('id, role, file_name, created_at').eq('order_id', order.id).order('created_at', { ascending: false }),
      supabaseAdmin
        .from('orders_history')
        .select('id, client_status, note, created_at')
        .eq('order_id', order.id)
        .order('created_at', { ascending: false })
        .limit(20),
      supabaseAdmin
        .from('order_submission_events')
        .select('id, actor, event_type, channel, payload, created_at')
        .eq('order_id', order.id)
        .order('created_at', { ascending: false })
        .limit(30),
    ]);

    return NextResponse.json({
      order: {
        id: order.id,
        order_no: order.order_no,
        client_status: normalizeClientStatus(order.client_status ?? order.status),
        client_note: order.client_note,
        destination_country: order.destination_country,
        service_type: order.service_type,
        document_type: order.document_type,
        document_quantity: order.document_quantity,
        delivery_method: order.delivery_method,
        amount_total: order.amount_total,
        currency: order.currency,
        invoice_url: order.invoice_url,
        updated_at: order.updated_at,
      },
      files: files ?? [],
      history: history ?? [],
      submissionEvents: submissionEvents ?? [],
    });
  } catch (error) {
    console.error('Portal order query failed', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
