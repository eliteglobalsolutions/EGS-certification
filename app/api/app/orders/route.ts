import { NextResponse } from 'next/server';
import { getAuthenticatedCustomer } from '@/lib/supabase/auth-server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { normalizeClientStatus } from '@/lib/status';

export async function GET(req: Request) {
  try {
    const user = await getAuthenticatedCustomer(req);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data, error } = await supabaseAdmin
      .from('orders')
      .select('id, order_no, order_code, destination_country, service_type, amount_total, currency, client_status, estimated_days, updated_at, created_at')
      .eq('customer_user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) throw error;

    return NextResponse.json({
      orders: (data || []).map((order) => ({
        ...order,
        client_status: normalizeClientStatus(order.client_status),
      })),
    });
  } catch (error) {
    console.error('Customer orders list failed', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
