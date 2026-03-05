import { NextResponse } from 'next/server';
import { getLegalContent, sha256 } from '@/lib/legal-documents';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { generateOrderCode } from '@/lib/order';
import { generateAccessToken } from '@/lib/security';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const locale = body.locale === 'zh' ? 'zh' : 'en';
    const email = String(body.email || '');
    const recipientName = String(body.recipientName || '');
    const phone = String(body.phone || '');
    const postcode = String(body.postcode || '');
    const addressLine1 = String(body.addressLine1 || '');
    const addressLine2 = String(body.addressLine2 || '');
    const city = String(body.city || '');
    const stateProvince = String(body.stateProvince || '');
    const country = String(body.country || '');
    const mailingAddress = String(body.mailingAddress || '');
    const routeOverride = String(body.routeOverride || '');
    const serviceLevel = String(body.serviceLevel || '');
    const docCategory = String(body.docCategory || '');
    const issuedIn = String(body.issuedIn || '');
    const destinationCountry = String(body.destinationCountry || '');
    const documentType = String(body.documentType || '');
    const deliveryMethod = String(body.deliveryMethod || '');
    const estimatedDays = String(body.estimatedDays || '');
    const tosAccepted = body.tosAccepted === true;
    const privacyAccepted = body.privacyAccepted === true;
    const authAccepted = body.authAccepted === true;
    const documentQuantity = Number.isInteger(body.documentQuantity) ? Number(body.documentQuantity) : 1;
    const subtotalAmount = Number.isInteger(body.subtotalAmount) ? Number(body.subtotalAmount) : 0;
    const serviceFee = Number.isInteger(body.serviceFee) ? Number(body.serviceFee) : 0;
    const amountTotal = Number.isInteger(body.amountTotal) ? Number(body.amountTotal) : 0;
    const acceptedIp = (req.headers.get('x-forwarded-for') || '').split(',')[0]?.trim() || null;
    const acceptedUserAgent = req.headers.get('user-agent');

    const orderCode = generateOrderCode();
    const accessToken = generateAccessToken();
    const legal = getLegalContent(locale);
    const legalVersion = '2026-02-27';

    const { data, error } = await supabaseAdmin
      .from('orders')
      .insert({
        order_no: orderCode,
        order_code: orderCode,
        access_token: accessToken,
        status: 'created',
        internal_status: 'received',
        client_status: 'received',
        customer_email: email || null,
        locale,
        destination_country: destinationCountry || null,
        service_type: [routeOverride, serviceLevel].filter(Boolean).join('_') || serviceLevel || null,
        document_type: documentType || null,
        document_quantity: Math.max(1, documentQuantity || 1),
        delivery_method: deliveryMethod || 'domestic',
        estimated_days: estimatedDays || null,
        currency: 'aud',
        subtotal_amount: Math.max(0, subtotalAmount || 0),
        service_fee: Math.max(0, serviceFee || 0),
        amount_total: Math.max(0, amountTotal || 0),
      })
      .select('id,order_code,order_no')
      .single();

    if (error) throw error;
    const orderId = data.id;

    const { error: consentError } = await supabaseAdmin.from('order_consents').insert({
      order_id: orderId,
      tos_accepted: tosAccepted,
      privacy_accepted: privacyAccepted,
      auth_accepted: authAccepted,
      accepted_ip: acceptedIp,
      accepted_user_agent: acceptedUserAgent,
      accepted_locale: locale,
      tos_version: legalVersion,
      privacy_version: legalVersion,
      auth_version: legalVersion,
      tos_sha256: sha256(legal.tos),
      privacy_sha256: sha256(legal.privacy),
      auth_sha256: sha256(legal.auth),
      acceptance_source: 'web_checkout',
    });
    if (consentError) throw consentError;

    const { error: createdEventError } = await supabaseAdmin.from('order_events').insert({
      order_id: orderId,
      type: 'created',
      message: 'Order created before checkout',
      meta: {
        recipient_name: recipientName || null,
        email: email || null,
        phone: phone || null,
        postcode: postcode || null,
        address_line1: addressLine1 || null,
        address_line2: addressLine2 || null,
        city: city || null,
        state_province: stateProvince || null,
        country: country || null,
        mailing_address: mailingAddress || null,
        route_override: routeOverride || null,
        service_level: serviceLevel || null,
        doc_category: docCategory || null,
        issued_in: issuedIn || null,
      },
    });
    if (createdEventError) throw createdEventError;

    const { error: historyError } = await supabaseAdmin.from('orders_history').insert({
      order_id: orderId,
      client_status: 'received',
      note: locale === 'zh' ? '订单已创建，等待付款确认。' : 'Order created and awaiting payment confirmation.',
      created_by: 'system',
    });
    if (historyError) throw historyError;

    return NextResponse.json({ order: data, accessToken });
  } catch (error) {
    console.error('Create order draft failed', error);
    return NextResponse.json({ error: 'Failed to create order draft.' }, { status: 500 });
  }
}
