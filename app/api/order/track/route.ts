import { NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rate-limit';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { safeEqual } from '@/lib/security';
import { normalizeClientStatus } from '@/lib/status';

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
    const limited = rateLimit(req, { namespace: 'order_track', limit: 40, windowMs: 60_000 });
    if (!limited.ok) {
      return NextResponse.json(
        { error: 'Too many requests. Please retry shortly.' },
        { status: 429, headers: { 'Retry-After': String(limited.retryAfterSec) } }
      );
    }

    const { orderNo, accessToken, surname } = await req.json();
    if (!orderNo || !accessToken) {
      return NextResponse.json({ error: 'Missing order number or access token.' }, { status: 400 });
    }

    const { data: order, error } = await supabaseAdmin
      .from('orders')
      .select('*')
      .eq('order_no', orderNo)
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    if (!order) return NextResponse.json({ error: 'Order not found.' }, { status: 404 });

    if (!order.access_token || !safeEqual(order.access_token, accessToken)) {
      return NextResponse.json({ error: 'Invalid access token.' }, { status: 403 });
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
    const providedSurname = extractSurname(String(surname || ''));

    if (expectedSurname && (!providedSurname || providedSurname !== expectedSurname)) {
      return NextResponse.json({ error: 'Surname verification failed.' }, { status: 403 });
    }

    const [{ data: history }, { data: events }] = await Promise.all([
      supabaseAdmin
        .from('orders_history')
        .select('id, client_status, note, created_at')
        .eq('order_id', order.id)
        .order('created_at', { ascending: false })
        .limit(20),
      supabaseAdmin.from('order_events').select('id, type, message, created_at').eq('order_id', order.id).order('created_at', { ascending: false }).limit(10),
    ]);

    return NextResponse.json({
      order: {
        id: order.id,
        order_no: order.order_no,
        client_status: normalizeClientStatus(order.client_status ?? order.status),
        client_note: order.client_note,
        updated_at: order.updated_at,
        destination_country: order.destination_country,
        service_type: order.service_type,
        document_quantity: order.document_quantity,
        delivery_method: order.delivery_method,
        estimated_days: order.estimated_days,
      },
      history: history ?? [],
      events: events ?? [],
    });
  } catch (error) {
    console.error('Track API failed', error);
    return NextResponse.json({ error: 'Server error, please retry.' }, { status: 500 });
  }
}
