import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { normalizeClientStatus } from '@/lib/status';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const orderCode = String(searchParams.get('order_code') || '').trim();
    if (!orderCode) {
      return NextResponse.json({ error: 'Missing order_code.' }, { status: 400 });
    }

    const { data: order, error } = await supabaseAdmin
      .from('orders')
      .select('id,order_code,order_no,client_status,status,client_note,estimated_days,updated_at')
      .or(`order_code.eq.${orderCode},order_no.eq.${orderCode}`)
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    if (!order) return NextResponse.json({ error: 'Order not found.' }, { status: 404 });

    return NextResponse.json({
      order: {
        order_code: order.order_code || order.order_no,
        client_status: normalizeClientStatus(order.client_status ?? order.status),
        client_note: order.client_note ?? null,
        estimated_days: order.estimated_days ?? null,
        updated_at: order.updated_at,
      },
    });
  } catch (error) {
    console.error('Public status lookup failed', error);
    return NextResponse.json({ error: 'Server error, please retry.' }, { status: 500 });
  }
}
