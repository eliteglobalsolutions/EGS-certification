import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

const MAX_BYTES = 10 * 1024 * 1024;
const ALLOWED = ['application/pdf', 'image/jpeg', 'image/png'];
const DOWNLOAD_TTL_SECONDS = 60 * 60 * 24 * 7;

function sanitizeFilenameBase(name: string): string {
  const raw = name.replace(/\.[^.]+$/, '').trim().toLowerCase();
  const cleaned = raw.replace(/[^a-z0-9\u00c0-\u024f\u4e00-\u9fff]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  return cleaned || 'document';
}

function sanitizeExt(name: string): string {
  return Array.from((name.split('.').pop() || 'bin').toLowerCase())
    .filter((c) => 'abcdefghijklmnopqrstuvwxyz0123456789'.includes(c))
    .join('') || 'bin';
}

function buildStoragePath(orderNo: string, orderId: string, originalName: string) {
  const now = new Date();
  const yyyy = String(now.getUTCFullYear());
  const mm = String(now.getUTCMonth() + 1).padStart(2, '0');
  const stamp = now.toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);
  const ext = sanitizeExt(originalName);
  const base = sanitizeFilenameBase(originalName).slice(0, 40);
  return `orders/${orderNo}/${yyyy}/${mm}/${orderId}/admin/delivery/${stamp}-${base}-${crypto.randomUUID()}.${ext}`;
}

export async function POST(req: Request, context: { params: Promise<{ orderId: string }> }) {
  try {
    const { orderId } = await context.params;
    const form = await req.formData();
    const files = form.getAll('files') as File[];
    if (files.length === 0) return NextResponse.json({ error: 'No files selected' }, { status: 400 });

    const { data: order, error: findError } = await supabaseAdmin.from('orders').select('*').eq('id', orderId).single();
    if (findError) throw findError;

    const uploaded: { file_name: string; storage_path: string }[] = [];

    for (const file of files) {
      if (!ALLOWED.includes(file.type)) return NextResponse.json({ error: `${file.name} unsupported type` }, { status: 400 });
      if (file.size > MAX_BYTES) return NextResponse.json({ error: `${file.name} exceeds 10MB` }, { status: 400 });

      const storagePath = buildStoragePath(order.order_no || order.id, orderId, file.name);
      const body = Buffer.from(await file.arrayBuffer());
      const { error } = await supabaseAdmin.storage.from('order-uploads').upload(storagePath, body, {
        contentType: file.type,
        upsert: false,
      });
      if (error) throw error;
      uploaded.push({ file_name: file.name, storage_path: storagePath });
    }

    await supabaseAdmin.from('order_files').insert(uploaded.map((f) => ({ order_id: orderId, role: 'admin', ...f })));

    await supabaseAdmin
      .from('orders')
      .update({
        client_status: 'dispatched',
        internal_status: 'dispatched',
        status: 'completed',
        client_note: order.locale === 'zh' ? '交付文件已上传，请查看订单详情。' : 'Delivery files uploaded and available in your order portal.',
        updated_at: new Date().toISOString(),
      })
      .eq('id', orderId);

    await supabaseAdmin.from('orders_history').insert({
      order_id: orderId,
      client_status: 'dispatched',
      note: order.locale === 'zh' ? '交付文件已上传。' : 'Delivery files uploaded.',
      created_by: 'admin',
    });

    await supabaseAdmin.from('order_events').insert({
      order_id: orderId,
      type: 'file_uploaded',
      message: `Admin uploaded ${uploaded.length} delivery file(s)`,
      meta: { count: uploaded.length, role: 'admin' },
    });

    const filesWithLinks = await Promise.all(
      uploaded.map(async (item) => {
        const signed = await supabaseAdmin.storage.from('order-uploads').createSignedUrl(item.storage_path, DOWNLOAD_TTL_SECONDS);
        return {
          ...item,
          download_url: signed.error ? null : signed.data?.signedUrl || null,
        };
      })
    );

    return NextResponse.json({ ok: true, files: filesWithLinks });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
