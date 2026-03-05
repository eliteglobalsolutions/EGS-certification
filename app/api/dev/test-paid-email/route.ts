import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { sendOrderPaidEmail } from '@/lib/notifications';
import { generateInvoiceForOrder } from '@/lib/invoice/generateInvoiceForOrder';
import { getStatusLabel } from '@/lib/i18n/dictionaries';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  try {
    const body = await req.json();
    const orderId = String(body?.orderId || '').trim();
    if (!orderId) return NextResponse.json({ error: 'Missing orderId' }, { status: 400 });

    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .select('id,order_no,access_token,locale,customer_email,client_status,service_type,destination_country,invoice_url')
      .eq('id', orderId)
      .limit(1)
      .maybeSingle();
    if (orderError) throw orderError;
    if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });

    const to = String(body?.to || order.customer_email || '').trim();
    if (!to) return NextResponse.json({ error: 'Missing recipient email' }, { status: 400 });

    const locale = order.locale === 'zh' ? 'zh' : 'en';
    const siteBase = (process.env.NEXT_PUBLIC_SITE_URL || '').replace(/\/$/, '');
    const portalLink = siteBase
      ? `${siteBase}/${locale}/portal/orders/${order.id}?orderNo=${encodeURIComponent(order.order_no)}&accessToken=${encodeURIComponent(order.access_token || '')}`
      : `/${locale}/portal/orders/${order.id}?orderNo=${encodeURIComponent(order.order_no)}&accessToken=${encodeURIComponent(order.access_token || '')}`;
    const trackLink = siteBase ? `${siteBase}/${locale}/order/track` : `/${locale}/order/track`;
    const invoice = await generateInvoiceForOrder(order.id);

    await sendOrderPaidEmail({
      locale,
      to,
      reference: order.order_no,
      status: getStatusLabel(locale, order.client_status || 'under_verification'),
      trackingLink: trackLink,
      summary: `${order.service_type || '-'} / ${order.destination_country || '-'}`,
      orderId: order.id,
      portalLink,
      invoiceUrl: invoice.pdf_signed_url || order.invoice_url || '',
      attachments: [
        {
          filename: invoice.pdf_filename,
          content: invoice.pdf_buffer.toString('base64'),
          type: 'application/pdf',
        },
      ],
    });

    return NextResponse.json({
      ok: true,
      to,
      orderId: order.id,
      orderNo: order.order_no,
      invoiceNumber: invoice.invoice_number,
      invoicePath: invoice.pdf_path,
      invoiceUrl: invoice.pdf_signed_url,
    });
  } catch (error: any) {
    console.error('test-paid-email failed', error);
    return NextResponse.json({ error: error?.message || 'Failed to send paid email' }, { status: 500 });
  }
}
