import 'server-only';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { renderInvoicePdf } from '@/lib/invoice/pdf/renderInvoicePdf';
import type { InvoicePdfData, InvoicePdfLineItem } from '@/lib/invoice/pdf/InvoiceDocument';

const INVOICE_BUCKET = 'invoices';
const SIGNED_URL_TTL_SECONDS = 60 * 60 * 24 * 30;

type InvoiceLineItemRow = {
  id: string;
  order_id: string;
  description: string;
  qty: number;
  unit_amount_cents: number;
  amount_cents: number;
  sort_order: number;
};

type OrderRow = {
  id: string;
  order_no: string;
  customer_email: string | null;
  service_type: string | null;
  amount_total: number | null;
  currency: string | null;
  subtotal_amount: number | null;
  service_fee: number | null;
  paid_at: string | null;
  stripe_session_id: string | null;
  invoice_number: string | null;
  invoice_issue_date: string | null;
  invoice_pdf_path: string | null;
  invoice_pdf_url: string | null;
  invoice_generated_at: string | null;
  destination_country: string | null;
};

type PaymentRow = {
  stripe_payment_intent_id: string | null;
  stripe_session_id: string | null;
};

type Result = {
  invoice_number: string;
  pdf_buffer: Buffer;
  pdf_filename: string;
  pdf_path: string;
  pdf_signed_url: string | null;
};

function isoDateText(input: string) {
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return '00000000';
  return d.toISOString().slice(0, 10).replace(/-/g, '');
}

function safeTail(source: string, len: number) {
  const cleaned = (source || '').replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
  if (!cleaned) return '000000';
  return cleaned.slice(-len).padStart(len, '0');
}

function buildInvoiceNumber(order: OrderRow, issueDate: string) {
  const shortRef = safeTail(order.order_no || order.id, 6);
  return `EGS-INV-${isoDateText(issueDate)}-${shortRef}`;
}

function parseService(order: OrderRow) {
  const raw = String(order.service_type || '').trim();
  if (!raw) return { serviceName: 'Document Coordination', serviceSpeed: 'Standard' };
  const pieces = raw.split(/[_/|>-]+/).map((v) => v.trim()).filter(Boolean);
  if (pieces.length === 0) return { serviceName: 'Document Coordination', serviceSpeed: 'Standard' };
  if (pieces.length === 1) return { serviceName: pieces[0], serviceSpeed: 'Standard' };
  return { serviceName: pieces.slice(0, -1).join(' '), serviceSpeed: pieces[pieces.length - 1] };
}

function normalizeLineItems(rows: InvoiceLineItemRow[]): InvoicePdfLineItem[] {
  return rows.map((row) => {
    const qty = Number.isFinite(row.qty) && row.qty > 0 ? Math.trunc(row.qty) : 1;
    const unit = Number.isFinite(row.unit_amount_cents) ? Math.trunc(row.unit_amount_cents) : 0;
    const amount = Number.isFinite(row.amount_cents) ? Math.trunc(row.amount_cents) : qty * unit;
    return {
      description: row.description || 'Service Fee',
      qty,
      unitAmountCents: unit,
      amountCents: amount,
    };
  });
}

async function lookupBillToName(orderId: string): Promise<string> {
  const { data: event } = await supabaseAdmin
    .from('order_events')
    .select('meta')
    .eq('order_id', orderId)
    .eq('type', 'created')
    .order('created_at', { ascending: true })
    .limit(1)
    .maybeSingle();
  const meta = event?.meta as Record<string, unknown> | null;
  const recipient = typeof meta?.recipient_name === 'string' ? meta.recipient_name.trim() : '';
  return recipient || 'Client';
}

async function createSignedUrl(path: string): Promise<string | null> {
  const signed = await supabaseAdmin.storage.from(INVOICE_BUCKET).createSignedUrl(path, SIGNED_URL_TTL_SECONDS);
  if (signed.error) return null;
  return signed.data?.signedUrl || null;
}

export async function generateInvoiceForOrder(orderId: string): Promise<Result> {
  const { data: order, error: orderError } = await supabaseAdmin
    .from('orders')
    .select(
      'id,order_no,customer_email,service_type,amount_total,currency,subtotal_amount,service_fee,paid_at,stripe_session_id,destination_country,invoice_number,invoice_issue_date,invoice_pdf_path,invoice_pdf_url,invoice_generated_at'
    )
    .eq('id', orderId)
    .limit(1)
    .maybeSingle<OrderRow>();
  if (orderError) throw orderError;
  if (!order) throw new Error(`Order not found: ${orderId}`);

  const issueDate = order.invoice_issue_date || order.paid_at || new Date().toISOString();
  const invoiceNumber = order.invoice_number || buildInvoiceNumber(order, issueDate);
  const pdfFilename = `${invoiceNumber}.pdf`;
  const pdfPath = order.invoice_pdf_path || `invoices/${order.id}/${pdfFilename}`;

  if (!order.invoice_number || !order.invoice_issue_date) {
    const { error: metaUpdateError } = await supabaseAdmin
      .from('orders')
      .update({
        invoice_number: invoiceNumber,
        invoice_issue_date: issueDate,
        updated_at: new Date().toISOString(),
      })
      .eq('id', order.id);
    if (metaUpdateError) throw metaUpdateError;
  }

  if (order.invoice_generated_at && order.invoice_pdf_path) {
    const download = await supabaseAdmin.storage.from(INVOICE_BUCKET).download(order.invoice_pdf_path);
    if (!download.error && download.data) {
      const pdfBuffer = Buffer.from(await download.data.arrayBuffer());
      const signedUrl = order.invoice_pdf_url || (await createSignedUrl(order.invoice_pdf_path));
      if (!order.invoice_pdf_url && signedUrl) {
        await supabaseAdmin.from('orders').update({ invoice_pdf_url: signedUrl }).eq('id', order.id);
      }
      return {
        invoice_number: invoiceNumber,
        pdf_buffer: pdfBuffer,
        pdf_filename: pdfFilename,
        pdf_path: order.invoice_pdf_path,
        pdf_signed_url: signedUrl,
      };
    }
  }

  const { data: rawItems, error: itemError } = await supabaseAdmin
    .from('invoice_line_items')
    .select('id,order_id,description,qty,unit_amount_cents,amount_cents,sort_order')
    .eq('order_id', order.id)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true });
  if (itemError) throw itemError;

  let lineItems = normalizeLineItems((rawItems || []) as InvoiceLineItemRow[]);
  if (lineItems.length === 0) {
    const { serviceName, serviceSpeed } = parseService(order);
    const fallbackAmount = Math.max(
      0,
      Number.isFinite(order.amount_total) ? Math.trunc(order.amount_total as number) : 0
    );
    const fallbackDescription = `Service Fee — ${serviceName} (${serviceSpeed})`;
    const { error: insertLineError } = await supabaseAdmin.from('invoice_line_items').insert({
      order_id: order.id,
      description: fallbackDescription,
      qty: 1,
      unit_amount_cents: fallbackAmount,
      amount_cents: fallbackAmount,
      sort_order: 10,
    });
    if (!insertLineError) {
      lineItems = [{ description: fallbackDescription, qty: 1, unitAmountCents: fallbackAmount, amountCents: fallbackAmount }];
    } else {
      lineItems = [{ description: fallbackDescription, qty: 1, unitAmountCents: fallbackAmount, amountCents: fallbackAmount }];
    }
  }

  const subtotalCents = lineItems.reduce((sum, item) => sum + item.amountCents, 0);
  const totalFromOrder = Math.max(0, Number.isFinite(order.amount_total) ? Math.trunc(order.amount_total as number) : subtotalCents);
  const totalCents = totalFromOrder || subtotalCents;
  const taxCents = 0;
  const amountPaidCents = totalCents;
  const balanceDueCents = 0;

  const paymentRef = await supabaseAdmin
    .from('order_payments')
    .select('stripe_payment_intent_id,stripe_session_id')
    .eq('order_id', order.id)
    .eq('event_type', 'checkout.session.completed')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle<PaymentRow>();
  const payment = paymentRef.data;

  const billToName = await lookupBillToName(order.id);
  const pdfData: InvoicePdfData = {
    invoiceNumber,
    issueDate,
    orderReference: order.order_no,
    orderId: order.id,
    billToName,
    billToEmail: order.customer_email || '-',
    paymentStatus: 'PAID',
    paidAt: order.paid_at || new Date().toISOString(),
    paymentMethod: 'Card (Stripe)',
    stripePaymentIntentId: payment?.stripe_payment_intent_id || '',
    stripeSessionId: payment?.stripe_session_id || order.stripe_session_id || '',
    currency: (order.currency || 'AUD').toUpperCase(),
    subtotalCents,
    taxCents,
    totalCents,
    amountPaidCents,
    balanceDueCents,
    lineItems,
  };

  const pdfBuffer = await renderInvoicePdf(pdfData);
  const upload = await supabaseAdmin.storage.from(INVOICE_BUCKET).upload(pdfPath, pdfBuffer, {
    contentType: 'application/pdf',
    upsert: true,
  });
  if (upload.error) throw upload.error;

  const signedUrl = await createSignedUrl(pdfPath);
  const generatedAt = new Date().toISOString();
  const { error: updateError } = await supabaseAdmin
    .from('orders')
    .update({
      invoice_number: invoiceNumber,
      invoice_issue_date: issueDate,
      invoice_pdf_path: pdfPath,
      invoice_pdf_url: signedUrl,
      invoice_generated_at: generatedAt,
      invoice_url: signedUrl,
      updated_at: generatedAt,
    })
    .eq('id', order.id);
  if (updateError) throw updateError;

  return {
    invoice_number: invoiceNumber,
    pdf_buffer: pdfBuffer,
    pdf_filename: pdfFilename,
    pdf_path: pdfPath,
    pdf_signed_url: signedUrl,
  };
}
