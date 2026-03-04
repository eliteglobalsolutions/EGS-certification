import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');

    let query = supabaseAdmin.from('orders').select('*').order('created_at', { ascending: false }).limit(50);
    if (status) query = query.eq('status', status);

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json({ orders: data ?? [] });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: '获取订单失败' }, { status: 500 });
  }
}
