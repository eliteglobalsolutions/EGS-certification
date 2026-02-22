import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { safeEqual } from '@/lib/security';

export async function POST(req: Request) {
  try {
    const { orderNo, accessToken } = await req.json();
    if (!orderNo || !accessToken) {
      return NextResponse.json({ error: '请输入订单号和访问码。' }, { status: 400 });
    }

    const { data: order, error } = await supabaseAdmin
      .from('orders')
      .select('*')
      .eq('order_no', orderNo)
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    if (!order) return NextResponse.json({ error: '订单不存在。' }, { status: 404 });

    if (!order.access_token || !safeEqual(order.access_token, accessToken)) {
      return NextResponse.json({ error: '校验失败，访问码不正确。' }, { status: 403 });
    }

    const [{ data: events }, { data: files }] = await Promise.all([
      supabaseAdmin.from('order_events').select('*').eq('order_id', order.id).order('created_at', { ascending: false }).limit(20),
      supabaseAdmin.from('order_files').select('*').eq('order_id', order.id).order('created_at', { ascending: false }),
    ]);

    return NextResponse.json({
      order: {
        id: order.id,
        order_no: order.order_no,
        status: order.status,
        created_at: order.created_at,
        updated_at: order.updated_at,
      },
      events: events ?? [],
      files: files ?? [],
    });
  } catch (error) {
    console.error('Track API failed', error);
    return NextResponse.json({ error: '服务器错误，请稍后重试。' }, { status: 500 });
  }
}
