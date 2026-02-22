import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function GET(_req: Request, { params }: { params: { orderId: string } }) {
  try {
    const [{ data: order, error: orderError }, { data: events }, { data: files }] = await Promise.all([
      supabaseAdmin.from('orders').select('*').eq('id', params.orderId).single(),
      supabaseAdmin.from('order_events').select('*').eq('order_id', params.orderId).order('created_at', { ascending: false }),
      supabaseAdmin.from('order_files').select('*').eq('order_id', params.orderId).order('created_at', { ascending: false }),
    ]);

    if (orderError) throw orderError;
    return NextResponse.json({ order, events: events ?? [], files: files ?? [] });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: '获取详情失败' }, { status: 500 });
  }
}
