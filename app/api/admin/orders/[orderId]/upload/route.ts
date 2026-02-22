import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

const MAX_BYTES = 10 * 1024 * 1024;
const ALLOWED = ['application/pdf', 'image/jpeg', 'image/png'];

export async function POST(req: Request, { params }: { params: { orderId: string } }) {
  try {
    const form = await req.formData();
    const files = form.getAll('files') as File[];
    if (files.length === 0) return NextResponse.json({ error: '请选择文件' }, { status: 400 });

    const uploaded: { file_name: string; storage_path: string }[] = [];

    for (const file of files) {
      if (!ALLOWED.includes(file.type)) return NextResponse.json({ error: `${file.name} 类型不支持` }, { status: 400 });
      if (file.size > MAX_BYTES) return NextResponse.json({ error: `${file.name} 超过10MB` }, { status: 400 });

      const storagePath = `orders/${params.orderId}/admin/${Date.now()}-${file.name}`;
      const body = Buffer.from(await file.arrayBuffer());
      const { error } = await supabaseAdmin.storage.from('order-uploads').upload(storagePath, body, {
        contentType: file.type,
        upsert: false,
      });
      if (error) throw error;
      uploaded.push({ file_name: file.name, storage_path: storagePath });
    }

    await supabaseAdmin.from('order_files').insert(uploaded.map((f) => ({ order_id: params.orderId, role: 'admin', ...f })));

    await supabaseAdmin.from('order_events').insert({
      order_id: params.orderId,
      type: 'file_uploaded',
      message: `管理员上传 ${uploaded.length} 个交付文件`,
      meta: { count: uploaded.length, role: 'admin' },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: '上传失败' }, { status: 500 });
  }
}
