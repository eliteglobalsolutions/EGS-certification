import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { stripe } from '@/lib/stripe';
import { generateAccessToken } from '@/lib/security';
import { generateOrderNo } from '@/lib/format';
import { sendOrderPaidEmail } from '@/lib/notifications';
import { getStatusLabel } from '@/lib/i18n/dictionaries';
import { recordPaymentEvent } from '@/lib/stripe/order-payments';
import { generateInvoiceForOrder } from '@/lib/invoice/generateInvoiceForOrder';

type ProcessSource = 'webhook' | 'admin_replay';

type PaymentSnapshot = {
  paymentIntentId: string | null;
  chargeId: string | null;
  receiptUrl: string | null;
  invoiceUrl: string | null;
  invoicePdfUrl: string | null;
  riskLevel: string | null;
  riskScore: number | null;
};

function toStripeId(value: string | Stripe.PaymentIntent | Stripe.Charge | null | undefined) {
  if (!value) return null;
  return typeof value === 'string' ? value : value.id;
}

async function readPaymentSnapshot(session: Stripe.Checkout.Session): Promise<PaymentSnapshot> {
  const paymentIntentId = toStripeId(session.payment_intent);
  let invoiceUrl: string | null = null;
  let invoicePdfUrl: string | null = null;
  const invoiceId = typeof session.invoice === 'string' ? session.invoice : session.invoice?.id;
  if (invoiceId) {
    try {
      const invoice = await stripe.invoices.retrieve(invoiceId);
      invoiceUrl = invoice.hosted_invoice_url || invoice.invoice_pdf || null;
      invoicePdfUrl = invoice.invoice_pdf || null;
    } catch {
      invoiceUrl = null;
      invoicePdfUrl = null;
    }
  }
  if (!paymentIntentId) {
    return { paymentIntentId: null, chargeId: null, receiptUrl: null, invoiceUrl, invoicePdfUrl, riskLevel: null, riskScore: null };
  }

  const intent = await stripe.paymentIntents.retrieve(paymentIntentId, { expand: ['latest_charge'] });
  const latestCharge = intent.latest_charge;
  if (!latestCharge || typeof latestCharge === 'string') {
    return { paymentIntentId, chargeId: null, receiptUrl: null, invoiceUrl, invoicePdfUrl, riskLevel: null, riskScore: null };
  }

  const outcome = latestCharge.outcome;
  return {
    paymentIntentId,
    chargeId: latestCharge.id,
    receiptUrl: latestCharge.receipt_url || null,
    invoiceUrl,
    invoicePdfUrl,
    riskLevel: outcome?.risk_level || null,
    riskScore: typeof outcome?.risk_score === 'number' ? outcome.risk_score : null,
  };
}

function buildPortalLink(siteBase: string, locale: 'en' | 'zh', orderId: string, orderNo: string, accessToken: string) {
  return siteBase
    ? `${siteBase}/${locale}/portal/orders/${orderId}?orderNo=${encodeURIComponent(orderNo)}&accessToken=${encodeURIComponent(accessToken || '')}`
    : `/${locale}/portal/orders/${orderId}?orderNo=${encodeURIComponent(orderNo)}&accessToken=${encodeURIComponent(accessToken || '')}`;
}

function buildTrackLink(siteBase: string, locale: 'en' | 'zh') {
  return siteBase ? `${siteBase}/${locale}/order/track` : `/${locale}/order/track`;
}

async function sendPaidEmailOnce(input: {
  order: any;
  locale: 'en' | 'zh';
  statusLabel: string;
  summary: string;
  siteBase: string;
}) {
  if (!input.order?.customer_email) return;
  if (input.order?.paid_email_sent_at) return;

  const now = new Date().toISOString();
  const portalLink = buildPortalLink(
    input.siteBase,
    input.locale,
    input.order.id,
    input.order.order_no,
    input.order.access_token || ''
  );
  const trackLink = buildTrackLink(input.siteBase, input.locale);

  try {
    const invoice = await generateInvoiceForOrder(input.order.id);
    await sendOrderPaidEmail({
      locale: input.locale,
      to: input.order.customer_email,
      reference: input.order.order_no,
      status: input.statusLabel,
      trackingLink: trackLink,
      summary: input.summary,
      orderId: input.order.id,
      portalLink,
      invoiceUrl: invoice.pdf_signed_url || input.order.invoice_url || '',
      attachments: [
        {
          filename: invoice.pdf_filename,
          content: invoice.pdf_buffer.toString('base64'),
          type: 'application/pdf',
        },
      ],
    });

    await supabaseAdmin.from('orders').update({
      paid_email_sent_at: now,
      email_last_error: null,
      invoice_url: invoice.pdf_signed_url || input.order.invoice_url || null,
      updated_at: now,
    }).eq('id', input.order.id);
  } catch (error: any) {
    const message = String(error?.message || error || 'failed_to_send_paid_email').slice(0, 2000);
    console.error('Paid email dispatch failed', { orderId: input.order.id, message });
    await supabaseAdmin.from('orders').update({
      email_last_error: message,
      updated_at: now,
    }).eq('id', input.order.id);
  }
}

function acceptanceNote(locale: 'en' | 'zh') {
  return locale === 'zh' ? '付款已确认，订单进入初始核验。' : 'Payment confirmed. Order moved to initial verification.';
}

function manualReviewNote(locale: 'en' | 'zh') {
  return locale === 'zh'
    ? '付款已收到，但同意记录异常，订单已转人工复核。'
    : 'Payment received but consent record is incomplete. Order moved to manual review.';
}

export async function processCheckoutSessionCompleted(
  session: Stripe.Checkout.Session,
  source: ProcessSource = 'webhook',
  stripeEventId?: string
) {
  const sessionId = session.id;
  const metadata = session.metadata ?? {};
  const payment = await readPaymentSnapshot(session);

  let query = supabaseAdmin.from('orders').select('*').eq('stripe_session_id', sessionId).limit(1).maybeSingle();
  if (metadata.order_id) {
    query = supabaseAdmin.from('orders').select('*').eq('id', metadata.order_id).limit(1).maybeSingle();
  }
  const { data: existing, error: findError } = await query;
  if (findError) throw findError;

  const locale = (metadata.locale === 'zh' ? 'zh' : 'en') as 'en' | 'zh';
  const siteBase = (process.env.NEXT_PUBLIC_SITE_URL || '').replace(/\/$/, '');
  const paidNow = new Date().toISOString();
  const basePayload = {
    customer_email: session.customer_details?.email ?? session.customer_email ?? null,
    amount_total: session.amount_total,
    currency: session.currency,
    stripe_session_id: sessionId,
    paid_at: paidNow,
    invoice_url: payment.invoiceUrl || payment.receiptUrl,
    updated_at: paidNow,
  };

  if (existing) {
    const alreadySynced = existing.stripe_session_id === sessionId
      && existing.status === 'paid'
      && existing.client_status === 'under_verification';
    if (alreadySynced) {
      await sendPaidEmailOnce({
        order: existing,
        locale,
        statusLabel: getStatusLabel(locale, existing.client_status || 'under_verification'),
        summary: `${existing.service_type || '-'} / ${existing.destination_country || '-'}`,
        siteBase,
      });
      return { ok: true as const, action: 'already_synced' as const, orderId: existing.id, orderNo: existing.order_no };
    }

    const { data: consent, error: consentError } = await supabaseAdmin
      .from('order_consents')
      .select('*')
      .eq('order_id', existing.id)
      .maybeSingle();
    if (consentError) throw consentError;

    const consentValid = Boolean(consent && consent.tos_accepted && consent.privacy_accepted && consent.auth_accepted);
    if (!consentValid) {
      await supabaseAdmin.from('orders').update({
        ...basePayload,
        status: 'paid',
        internal_status: 'requires_manual_review',
        client_status: 'action_required',
        client_note: manualReviewNote(locale),
      }).eq('id', existing.id);

      await supabaseAdmin.from('order_events').insert({
        order_id: existing.id,
        type: 'consent_missing',
        message: source === 'admin_replay' ? 'Consent missing during admin replay' : 'Missing/invalid legal consent at webhook verification',
        meta: { session_id: sessionId, source, stripe_event_id: stripeEventId || null },
      });

      await recordPaymentEvent({
        orderId: existing.id,
        eventType: 'checkout.session.completed',
        status: session.payment_status || session.status || null,
        amount: session.amount_total,
        currency: session.currency,
        stripeEventId: stripeEventId || null,
        stripeSessionId: sessionId,
        stripePaymentIntentId: payment.paymentIntentId,
        stripeChargeId: payment.chargeId,
        receiptUrl: payment.receiptUrl,
        riskLevel: payment.riskLevel,
        riskScore: payment.riskScore,
        payload: { source, consent_valid: false },
      });

      await sendPaidEmailOnce({
        order: {
          ...existing,
          customer_email: basePayload.customer_email,
          invoice_url: basePayload.invoice_url || existing.invoice_url || null,
        },
        locale,
        statusLabel: getStatusLabel(locale, 'action_required'),
        summary: `${existing.service_type || '-'} / ${existing.destination_country || '-'}`,
        siteBase,
      });

      return { ok: true as const, action: 'consent_missing' as const, orderId: existing.id, orderNo: existing.order_no };
    }

    const highRisk = payment.riskLevel === 'highest' || payment.riskLevel === 'elevated';
    const nextValues = {
      ...basePayload,
      status: 'paid',
      internal_status: highRisk ? 'requires_manual_review' : 'initial_verification',
      client_status: highRisk ? 'action_required' : 'under_verification',
      client_note: highRisk
        ? (locale === 'zh' ? '付款已确认，但触发风控复核，请等待人工审核。' : 'Payment confirmed, pending additional risk review.')
        : acceptanceNote(locale),
    };

    const { error: updateError } = await supabaseAdmin.from('orders').update(nextValues).eq('id', existing.id);
    if (updateError) throw updateError;

    await supabaseAdmin.from('order_events').insert({
      order_id: existing.id,
      type: highRisk ? 'payment_risk_review' : 'paid',
      message: highRisk ? 'Payment accepted with elevated risk score' : (source === 'admin_replay' ? 'Stripe checkout replayed by admin' : 'Stripe checkout.session.completed'),
      meta: {
        session_id: sessionId,
        source,
        stripe_event_id: stripeEventId || null,
        risk_level: payment.riskLevel,
        risk_score: payment.riskScore,
      },
    });

    await supabaseAdmin.from('orders_history').insert({
      order_id: existing.id,
      client_status: nextValues.client_status,
      note: nextValues.client_note,
      created_by: source === 'admin_replay' ? 'admin' : 'system',
    });

    await recordPaymentEvent({
      orderId: existing.id,
      eventType: 'checkout.session.completed',
      status: session.payment_status || session.status || null,
      amount: session.amount_total,
      currency: session.currency,
      stripeEventId: stripeEventId || null,
      stripeSessionId: sessionId,
      stripePaymentIntentId: payment.paymentIntentId,
      stripeChargeId: payment.chargeId,
      receiptUrl: payment.receiptUrl,
      riskLevel: payment.riskLevel,
      riskScore: payment.riskScore,
      payload: { source, consent_valid: true, high_risk: highRisk },
    });

    const summaryText = `${existing.service_type || '-'} / ${existing.destination_country || '-'}`;
    const statusLabel = getStatusLabel(locale, nextValues.client_status);
    await sendPaidEmailOnce({
      order: {
        ...existing,
        customer_email: nextValues.customer_email,
        invoice_url: nextValues.invoice_url || existing.invoice_url || null,
        paid_email_sent_at: existing.paid_email_sent_at || null,
      },
      locale,
      statusLabel,
      summary: summaryText,
      siteBase,
    });

    return { ok: true as const, action: 'updated_existing' as const, orderId: existing.id, orderNo: existing.order_no };
  }

  const accessToken = generateAccessToken();
  const { data: created, error: createError } = await supabaseAdmin
    .from('orders')
    .insert({
      order_no: metadata.order_no ?? generateOrderNo(),
      order_code: metadata.order_no ?? generateOrderNo(),
      access_token: accessToken,
      status: 'paid',
      internal_status: 'requires_manual_review',
      client_status: 'action_required',
      client_note: locale === 'zh' ? '付款已收到，但缺少预建订单记录，订单已转人工复核。' : 'Payment received without pre-created order. Moved to manual review.',
      locale,
      ...basePayload,
    })
    .select('*')
    .single();

  if (createError) {
    if (createError.code === '23505') return { ok: true as const, action: 'duplicate_ignored' as const };
    throw createError;
  }

  await supabaseAdmin.from('order_events').insert([
    {
      order_id: created.id,
      type: 'created',
      message: 'Order created from Stripe webhook',
      meta: { session_id: sessionId, source, stripe_event_id: stripeEventId || null },
    },
    {
      order_id: created.id,
      type: 'paid',
      message: source === 'admin_replay' ? 'Stripe checkout replayed by admin' : 'Stripe checkout.session.completed',
      meta: { session_id: sessionId, source, stripe_event_id: stripeEventId || null },
    },
  ]);

  await supabaseAdmin.from('orders_history').insert({
    order_id: created.id,
    client_status: 'action_required',
    note: locale === 'zh' ? '系统自动建单，等待人工复核。' : 'Order auto-created from payment. Pending manual review.',
    created_by: source === 'admin_replay' ? 'admin' : 'system',
  });

  await recordPaymentEvent({
    orderId: created.id,
    eventType: 'checkout.session.completed',
    status: session.payment_status || session.status || null,
    amount: session.amount_total,
    currency: session.currency,
    stripeEventId: stripeEventId || null,
    stripeSessionId: sessionId,
    stripePaymentIntentId: payment.paymentIntentId,
    stripeChargeId: payment.chargeId,
    receiptUrl: payment.receiptUrl,
    riskLevel: payment.riskLevel,
    riskScore: payment.riskScore,
    payload: { source, auto_created_order: true },
  });

  await sendPaidEmailOnce({
    order: created,
    locale,
    statusLabel: getStatusLabel(locale, 'action_required'),
    summary: `${created.service_type || '-'} / ${created.destination_country || '-'}`,
    siteBase,
  });

  return { ok: true as const, action: 'created_from_session' as const, orderId: created.id, orderNo: created.order_no };
}
