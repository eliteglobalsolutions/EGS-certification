import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { mapInternalToClient, mapClientToLegacyStatus } from '@/lib/status';
import { sendStatusUpdate } from '@/lib/notifications';
import { getStatusLabel } from '@/lib/i18n/dictionaries';

const ALLOWED_INTERNAL = ['received', 'initial_verification', 'processing', 'awaiting_documents', 'completed', 'dispatched', 'cancelled'];

const CLIENT_NOTE_TEMPLATE: Record<string, { en: string; zh: string }> = {
  under_verification: {
    en: 'Under verification. Please wait for the next update.',
    zh: '订单核验中，请等待下一步通知。',
  },
  submitted_processing: {
    en: 'Submitted for processing. Timeline remains estimated and subject to authority processing time.',
    zh: '已提交处理，时效仅为预估，受相关机构进度影响。',
  },
  completed: {
    en: 'Processing complete. Dispatch arrangement is in progress.',
    zh: '处理已完成，正在安排交付。',
  },
  dispatched: {
    en: 'Dispatched. Please monitor your delivery channel for updates.',
    zh: '文件已寄出，请留意配送更新。',
  },
  action_required: {
    en: 'Action required: additional documents are needed before processing can continue.',
    zh: '需补充材料：请尽快上传所需文件后继续处理。',
  },
};

export async function POST(req: Request, context: { params: Promise<{ orderId: string }> }) {
  try {
    const { orderId } = await context.params;
    const { internalStatus, internalNote, clientStatus, clientNote, syncClientStatus = true } = await req.json();

    if (!ALLOWED_INTERNAL.includes(internalStatus)) {
      return NextResponse.json({ error: 'Invalid internal status' }, { status: 400 });
    }

    const { data: order, error: findError } = await supabaseAdmin.from('orders').select('*').eq('id', orderId).single();
    if (findError) throw findError;

    const locale = order.locale === 'zh' ? 'zh' : 'en';
    const mappedClientStatus = clientStatus || (syncClientStatus ? mapInternalToClient(internalStatus) : order.client_status || 'under_verification');
    const finalClientNote = clientNote || CLIENT_NOTE_TEMPLATE[mappedClientStatus]?.[locale] || order.client_note || null;

    const { error: updateError } = await supabaseAdmin
      .from('orders')
      .update({
        internal_status: internalStatus,
        internal_note: internalNote || null,
        client_status: mappedClientStatus,
        client_note: finalClientNote,
        status: mapClientToLegacyStatus(mappedClientStatus),
        updated_at: new Date().toISOString(),
      })
      .eq('id', orderId);
    if (updateError) throw updateError;

    await supabaseAdmin.from('orders_history').insert({
      order_id: orderId,
      client_status: mappedClientStatus,
      note: finalClientNote,
      created_by: 'admin',
    });

    await supabaseAdmin.from('order_events').insert({
      order_id: orderId,
      type: 'status_changed',
      message: internalNote || `Admin updated status to ${internalStatus}`,
      meta: { internal_status: internalStatus, client_status: mappedClientStatus },
    });

    const notifyStatus = ['under_verification', 'completed', 'dispatched'];
    if (order.customer_email && notifyStatus.includes(mappedClientStatus)) {
      await sendStatusUpdate({
        locale,
        to: order.customer_email,
        reference: order.order_no,
        status: getStatusLabel(locale, mappedClientStatus),
        trackingLink: `/${locale}/order/track`,
        summary: `${order.service_type || '-'} / ${order.destination_country || '-'}`,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update status' }, { status: 500 });
  }
}
