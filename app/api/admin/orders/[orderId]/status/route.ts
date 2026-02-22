import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

const ALLOWED = ['processing', 'need_more_docs', 'completed', 'cancelled'];

export async function POST(req: Request, { params }: { params: { orderId: string } }) {
  try {
    const { status, note } = await req.json();
    if (!ALLOWED.includes(status)) {
      return NextResponse.json({ error: '状态不合法' }, { status: 400 });
    }

    const { error: updateError } = await supabaseAdmin
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', params.orderId);
    if (updateError) throw updateError;

    await supabaseAdmin.from('order_events').insert({
      order_id: params.orderId,
      type: 'status_changed',
      message: note || `管理员更新状态为 ${status}`,
      meta: { status },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: '更新失败' }, { status: 500 });
  }
}
