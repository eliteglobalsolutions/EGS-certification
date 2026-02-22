import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { safeEqual } from '@/lib/security';

const MAX_BYTES = 10 * 1024 * 1024;
const ALLOWED = ['application/pdf', 'image/jpeg', 'image/png'];

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const orderNo = String(form.get('orderNo') || '');
    const accessToken = String(form.get('accessToken') || '');
    const files = form.getAll('files') as File[];

    if (!orderNo || !accessToken || files.length === 0) {
      return NextResponse.json({ error: '参数不完整，请填写订单号、访问码并选择文件。' }, { status: 400 });
    }

    const { data: order } = await supabaseAdmin.from('orders').select('*').eq('order_no', orderNo).limit(1).maybeSingle();
    if (!order) return NextResponse.json({ error: '订单不存在。' }, { status: 404 });
    if (!order.access_token || !safeEqual(order.access_token, accessToken)) {
      return NextResponse.json({ error: '访问码错误。' }, { status: 403 });
    }

    const uploaded: { file_name: string; storage_path: string }[] = [];

    for (const file of files) {
      if (!ALLOWED.includes(file.type)) {
        return NextResponse.json({ error: `${file.name} 类型不支持。` }, { status: 400 });
      }
      if (file.size > MAX_BYTES) {
        return NextResponse.json({ error: `${file.name} 超过10MB限制。` }, { status: 400 });
      }

      const storagePath = `orders/${order.id}/customer/${Date.now()}-${file.name}`;
      const arrayBuffer = await file.arrayBuffer();
      const { error: uploadError } = await supabaseAdmin.storage
        .from('order-uploads')
        .upload(storagePath, Buffer.from(arrayBuffer), {
          contentType: file.type,
          upsert: false,
        });

      if (uploadError) throw uploadError;
      uploaded.push({ file_name: file.name, storage_path: storagePath });
    }

    const records = uploaded.map((f) => ({ order_id: order.id, role: 'customer', ...f }));
    const { error: fileInsertError } = await supabaseAdmin.from('order_files').insert(records);
    if (fileInsertError) throw fileInsertError;

    await supabaseAdmin.from('order_events').insert({
      order_id: order.id,
      type: 'file_uploaded',
      message: `客户上传 ${uploaded.length} 个文件`,
      meta: { count: uploaded.length, role: 'customer' },
    });

    return NextResponse.json({ ok: true, count: uploaded.length });
  } catch (error) {
    console.error('Upload API failed', error);
    return NextResponse.json({ error: '上传失败，请重试。' }, { status: 500 });
  }
}
