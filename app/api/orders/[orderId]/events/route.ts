import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { safeEqual } from '@/lib/security';

const ALLOWED_EVENT_TYPES = new Set(['EMAIL_SUBMISSION_CONFIRMED']);

export async function POST(req: Request, context: { params: Promise<{ orderId: string }> }) {
  try {
    const { orderId } = await context.params;
    const body = await req.json();

    const orderNo = String(body?.orderNo || '');
    const accessToken = String(body?.accessToken || '');
    const eventType = String(body?.eventType || '');
    const ackSubjectRule = body?.ackSubjectRule === true;
    const ackEmailRisk = body?.ackEmailRisk === true;
    const note = String(body?.note || '').trim();

    if (!orderNo || !accessToken || !eventType) {
      return NextResponse.json({ error: 'Missing required parameters.' }, { status: 400 });
    }

    if (!ALLOWED_EVENT_TYPES.has(eventType)) {
      return NextResponse.json({ error: 'Event type is not allowed.' }, { status: 400 });
    }

    if (!ackSubjectRule || !ackEmailRisk) {
      return NextResponse.json({ error: 'Required acknowledgements are missing.' }, { status: 400 });
    }

    const { data: order, error } = await supabaseAdmin.from('orders').select('*').eq('id', orderId).limit(1).maybeSingle();
    if (error) throw error;
    if (!order) return NextResponse.json({ error: 'Order not found.' }, { status: 404 });
    if (order.order_no !== orderNo) {
      return NextResponse.json({ error: 'Order reference does not match.' }, { status: 400 });
    }
    if (!order.access_token || !safeEqual(order.access_token, accessToken)) {
      return NextResponse.json({ error: 'Invalid token.' }, { status: 403 });
    }

    const payload = {
      ack_subject_rule: ackSubjectRule,
      ack_email_risk: ackEmailRisk,
      note: note || null,
    };

    const { data: event, error: insertError } = await supabaseAdmin
      .from('order_submission_events')
      .insert({
        order_id: order.id,
        actor: 'customer',
        event_type: eventType,
        channel: 'email',
        payload,
      })
      .select('id, order_id, actor, event_type, channel, payload, created_at')
      .single();

    if (insertError) throw insertError;

    await supabaseAdmin.from('order_events').insert({
      order_id: order.id,
      type: 'submission_event',
      message: 'Customer confirmed email submission fallback',
      meta: { event_type: eventType, channel: 'email' },
    });

    return NextResponse.json({ ok: true, event });
  } catch (error) {
    console.error('Order submission event API failed', error);
    return NextResponse.json({ error: 'Failed to record event.' }, { status: 500 });
  }
}
