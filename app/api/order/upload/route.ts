import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { safeEqual } from '@/lib/security';

const MAX_BYTES = 10 * 1024 * 1024;
const ALLOWED = ['application/pdf', 'image/jpeg', 'image/png'];

function normalizeName(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\u00c0-\u024f\u4e00-\u9fff]+/g, ' ');
}

function extractSurname(fullName: string): string {
  const cleaned = normalizeName(fullName);
  if (!cleaned) return '';
  const parts = cleaned.split(/\s+/).filter(Boolean);
  return parts[parts.length - 1] || '';
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const orderNo = String(form.get('orderNo') || '');
    const accessToken = String(form.get('accessToken') || '');
    const surname = String(form.get('surname') || '');
    const files = form.getAll('files') as File[];
    const passportDocs = form.getAll('passportDocs') as File[];
    const supportingIdDocs = form.getAll('supportingIdDocs') as File[];
    const legacyIdDocs = form.getAll('idDocs') as File[];
    const normalizedSupportingIdDocs = supportingIdDocs.length > 0 ? supportingIdDocs : legacyIdDocs;

    if (!orderNo || !accessToken || !surname || files.length === 0 || passportDocs.length === 0 || normalizedSupportingIdDocs.length === 0) {
      return NextResponse.json({ error: 'Missing required parameters.' }, { status: 400 });
    }

    const { data: order } = await supabaseAdmin.from('orders').select('*').eq('order_no', orderNo).limit(1).maybeSingle();
    if (!order) return NextResponse.json({ error: 'Order not found.' }, { status: 404 });
    if (!order.access_token || !safeEqual(order.access_token, accessToken)) {
      return NextResponse.json({ error: 'Invalid token.' }, { status: 403 });
    }

    const { data: createdEvent } = await supabaseAdmin
      .from('order_events')
      .select('meta')
      .eq('order_id', order.id)
      .eq('type', 'created')
      .order('created_at', { ascending: true })
      .limit(1)
      .maybeSingle();

    const recipientName = String(createdEvent?.meta?.recipient_name || '');
    const expectedSurname = extractSurname(recipientName);
    const providedSurname = extractSurname(surname);

    if (!expectedSurname) {
      return NextResponse.json({ error: 'Surname verification is unavailable for this order. Please contact support.' }, { status: 422 });
    }
    if (!providedSurname || providedSurname !== expectedSurname) {
      return NextResponse.json({ error: 'Surname verification failed.' }, { status: 403 });
    }

    const uploaded: { file_name: string; storage_path: string; role: string }[] = [];
    const allFiles = [
      ...files.map((file) => ({ file, role: 'customer' })),
      ...passportDocs.map((file) => ({ file, role: 'passport' })),
      ...normalizedSupportingIdDocs.map((file) => ({ file, role: 'supporting_id' })),
    ];

    for (const { file, role } of allFiles) {
      if (!ALLOWED.includes(file.type)) {
        return NextResponse.json({ error: `${file.name} file type is not supported.` }, { status: 400 });
      }
      if (file.size > MAX_BYTES) {
        return NextResponse.json({ error: `${file.name} exceeds 10MB.` }, { status: 400 });
      }

      const ext = Array.from((file.name.split(".").pop() || "bin").toLowerCase()).filter((c) =>"abcdefghijklmnopqrstuvwxyz0123456789".includes(c)).join("") || "bin";
  const safeName = `${Date.now()}-${crypto.randomUUID()}.${ext}`;
  const storagePath = `orders/${order.id}/customer/${role}/${safeName}`;
      const arrayBuffer = await file.arrayBuffer();
      const { error: uploadError } = await supabaseAdmin.storage
        .from('order-uploads')
        .upload(storagePath, Buffer.from(arrayBuffer), {
          contentType: file.type,
          upsert: false,
        });

      if (uploadError) throw uploadError;
      uploaded.push({ file_name: file.name, storage_path: storagePath, role });
    }

    const records = uploaded.map((f) => ({ order_id: order.id, role: f.role, file_name: f.file_name, storage_path: f.storage_path }));
    const { error: fileInsertError } = await supabaseAdmin.from('order_files').insert(records);
    if (fileInsertError) throw fileInsertError;

    const { error: submissionEventError } = await supabaseAdmin.from('order_submission_events').insert({
      order_id: order.id,
      actor: 'customer',
      event_type: 'UPLOAD_SUPPLEMENTAL',
      channel: 'portal',
      payload: { file_count: uploaded.length },
    });
    if (submissionEventError) throw submissionEventError;

    await supabaseAdmin.from('orders').update({
      client_status: 'under_verification',
      internal_status: 'initial_verification',
      client_note: order.locale === 'zh' ? '已收到补充材料，正在核验。' : 'Additional files received and under verification.',
      updated_at: new Date().toISOString(),
    }).eq('id', order.id);

    await supabaseAdmin.from('orders_history').insert({
      order_id: order.id,
      client_status: 'under_verification',
      note: order.locale === 'zh' ? `客户补充上传 ${uploaded.length} 份文件。` : `Customer uploaded ${uploaded.length} additional file(s).`,
      created_by: 'customer',
    });

    await supabaseAdmin.from('order_events').insert({
      order_id: order.id,
      type: 'file_uploaded',
      message: `Customer uploaded ${uploaded.length} file(s)`,
      meta: { count: uploaded.length, role: 'customer' },
    });

    return NextResponse.json({ ok: true, count: uploaded.length });
  } catch (error) {
    console.error('Upload API failed', error);
    return NextResponse.json({ error: 'Upload failed, please retry.' }, { status: 500 });
  }
}
