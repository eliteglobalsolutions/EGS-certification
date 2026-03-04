import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');

<<<<<<< HEAD
    let query = supabaseAdmin.from('orders').select('*').order('created_at', { ascending: false }).limit(50);
    if (status) query = query.eq('status', status);
=======
    let query = supabaseAdmin
      .from('orders')
      .select('id, order_no, client_status, internal_status, customer_email, created_at, updated_at')
      .order('created_at', { ascending: false })
      .limit(80);

    if (status) query = query.eq('client_status', status);
>>>>>>> sync-export

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json({ orders: data ?? [] });
  } catch (error) {
    console.error(error);
<<<<<<< HEAD
    return NextResponse.json({ error: '获取订单失败' }, { status: 500 });
=======
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
>>>>>>> sync-export
  }
}
