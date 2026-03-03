import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');

    let query = supabaseAdmin
      .from('orders')
      .select('id, order_no, client_status, internal_status, customer_email, created_at, updated_at')
      .order('created_at', { ascending: false })
      .limit(80);

    if (status) query = query.eq('client_status', status);

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json({ orders: data ?? [] });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}
