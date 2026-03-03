import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const orderId = String(body.orderId || '');
    const routeSnapshot = body.routeSnapshot || null;
    if (!orderId) return NextResponse.json({ error: 'Missing orderId.' }, { status: 400 });

    const { error } = await supabaseAdmin
      .from('order_events')
      .insert({
        order_id: orderId,
        type: 'route_confirmed',
        message: 'Route confirmed before processing',
        meta: routeSnapshot,
      });

    if (error) throw error;

    await supabaseAdmin
      .from('orders')
      .update({
        client_note: 'Route confirmed before processing.',
      })
      .eq('id', orderId);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Confirm order route failed', error);
    return NextResponse.json({ error: 'Failed to confirm route.' }, { status: 500 });
  }
}
