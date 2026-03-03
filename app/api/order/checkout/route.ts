import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { generateAccessToken } from '@/lib/security';
import { generateOrderCode, estimateOrder } from '@/lib/order';
import { isSupportedShippingCountry, routeLabel } from '@/lib/catalog';
import { getLegalContent, TOS_VERSION, PRIVACY_VERSION, AUTH_VERSION, sha256 } from '@/lib/legal-documents';

export const runtime = 'nodejs';

const MAX_BYTES = 10 * 1024 * 1024;
const ALLOWED = ['application/pdf', 'image/jpeg', 'image/png'];

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const locale = String(form.get('locale') || 'en') as 'en' | 'zh';
    const tosAccepted = String(form.get('tosAccepted') || '') === 'true';
    const privacyAccepted = String(form.get('privacyAccepted') || '') === 'true';
    const authAccepted = String(form.get('authAccepted') || '') === 'true';
    const destinationCode = String(form.get('destinationCode') || '');
    const destinationCountry = String(form.get('destinationCountry') || '');
    const routeOverride = String(form.get('routeOverride') || 'auto') as 'auto' | 'hague' | 'non';
    const issuedIn = String(form.get('issuedIn') || 'AU') as 'AU' | 'OVERSEAS';
    const issuingCountry = String(form.get('issuingCountry') || '');
    const serviceLevel = String(form.get('serviceLevel') || 'standard') as 'standard' | 'express';
    const docCategory = String(form.get('docCategory') || 'personal') as 'personal' | 'company';
    const documentType = String(form.get('documentType') || '');
    const documentQuantity = Number(form.get('documentQuantity') || 1);
    const pages = Number(form.get('pages') || 1);
    const deliveryMethod = String(form.get('deliveryMethod') || 'domestic') as 'domestic' | 'intl_dhl';
    const recipientName = String(form.get('recipientName') || '');
    const phone = String(form.get('phone') || '');
    const postcode = String(form.get('postcode') || '');
    const addressLine1 = String(form.get('addressLine1') || '');
    const addressLine2 = String(form.get('addressLine2') || '');
    const city = String(form.get('city') || '');
    const state = String(form.get('state') || '');
    const country = String(form.get('country') || '');
    const mailingAddress = String(form.get('mailingAddress') || '');
    const certificateType = String(form.get('certificateType') || 'none');
    const certificateQuantity = Number(form.get('certificateQuantity') || 0);
    const email = String(form.get('email') || '');
    const files = form.getAll('files') as File[];
    const passportDocs = form.getAll('passportDocs') as File[];
    const supportingIdDocs = form.getAll('supportingIdDocs') as File[];
    const legacyIdDocs = form.getAll('idDocs') as File[];
    const normalizedSupportingIdDocs = supportingIdDocs.length > 0 ? supportingIdDocs : legacyIdDocs;

    if (
      !destinationCountry
      || !documentType
      || !deliveryMethod
      || !recipientName
      || !phone
      || !postcode
      || !email
      || !addressLine1
      || !city
      || !state
      || !country
      || !mailingAddress
      || files.length === 0
      || passportDocs.length === 0
      || normalizedSupportingIdDocs.length === 0
    ) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }
    if (issuedIn === 'OVERSEAS' && !issuingCountry.trim()) {
      return NextResponse.json({ error: 'Issuing country is required for overseas-issued documents.' }, { status: 400 });
    }
    if (!isSupportedShippingCountry(country)) {
      return NextResponse.json({ error: 'Selected shipping country is currently not supported.' }, { status: 400 });
    }
    if (deliveryMethod === 'domestic' && !['australia', '澳大利亚', '澳洲'].includes(country.trim().toLowerCase())) {
      return NextResponse.json({ error: 'Domestic delivery is only available for Australia addresses.' }, { status: 400 });
    }
    if (issuedIn === 'OVERSEAS' && deliveryMethod !== 'intl_dhl') {
      return NextResponse.json({ error: 'For overseas-issued documents, delivery method must be International DHL.' }, { status: 400 });
    }
    if (!tosAccepted || !privacyAccepted || !authAccepted) {
      return NextResponse.json({ error: 'All mandatory legal consents are required.' }, { status: 400 });
    }

    const estimate = estimateOrder({
      locale,
      destinationCountry,
      destinationCode,
      routeOverride,
      serviceLevel,
      docCategory,
      documentType,
      documentQuantity,
      pages,
      deliveryMethod,
      certificateType,
      certificateQuantity,
      email,
    });
    const resolvedRouteLabel = routeLabel(locale, estimate.resolvedRoute);
    const serviceLevelLabel = locale === 'zh' ? (serviceLevel === 'express' ? '加急' : '标准') : serviceLevel === 'express' ? 'Express' : 'Standard';
    const serviceType = `${resolvedRouteLabel} / ${serviceLevelLabel}`;

    const orderCode = generateOrderCode();
    const accessToken = generateAccessToken();

    const { data: order, error: createError } = await supabaseAdmin
      .from('orders')
      .insert({
        order_no: orderCode,
        order_code: orderCode,
        access_token: accessToken,
        status: 'created',
        internal_status: 'received',
        client_status: 'received',
        client_note: locale === 'zh' ? '订单已建立，等待付款确认。' : 'Order created and waiting for payment confirmation.',
        customer_email: email,
        locale,
        destination_country: destinationCountry,
        service_type: serviceType,
        document_type: documentType,
        document_quantity: documentQuantity,
        delivery_method: deliveryMethod,
        estimated_days: estimate.estimatedDays,
        subtotal_amount: estimate.subtotal,
        service_fee: estimate.serviceFee,
        amount_total: estimate.total,
        currency: estimate.currency,
      })
      .select('*')
      .single();

    if (createError) throw createError;

    const legalDocs = getLegalContent(locale);
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || null;
    const userAgent = req.headers.get('user-agent') || null;

    const { error: consentError } = await supabaseAdmin.from('order_consents').insert({
      order_id: order.id,
      tos_accepted: tosAccepted,
      privacy_accepted: privacyAccepted,
      auth_accepted: authAccepted,
      accepted_ip: ip,
      accepted_user_agent: userAgent,
      accepted_locale: locale,
      tos_version: TOS_VERSION,
      privacy_version: PRIVACY_VERSION,
      auth_version: AUTH_VERSION,
      tos_sha256: sha256(legalDocs.tos),
      privacy_sha256: sha256(legalDocs.privacy),
      auth_sha256: sha256(legalDocs.auth),
      acceptance_source: 'web_checkout',
    });
    if (consentError) throw consentError;

    const allFiles = [
      ...files.map((file) => ({ file, role: 'customer' })),
      ...passportDocs.map((file) => ({ file, role: 'passport' })),
      ...normalizedSupportingIdDocs.map((file) => ({ file, role: 'supporting_id' })),
    ];

    const fileRecords: { order_id: string; role: string; file_name: string; storage_path: string }[] = [];

    for (const { file, role } of allFiles) {
      if (!ALLOWED.includes(file.type)) {
        return NextResponse.json({ error: `${file.name} type not allowed.` }, { status: 400 });
      }
      if (file.size > MAX_BYTES) {
        return NextResponse.json({ error: `${file.name} exceeds 10MB.` }, { status: 400 });
      }

      const storagePath = `orders/${order.id}/intake/${role}/${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabaseAdmin.storage
        .from('order-uploads')
        .upload(storagePath, Buffer.from(await file.arrayBuffer()), {
          contentType: file.type,
          upsert: false,
        });
      if (uploadError) throw uploadError;
      fileRecords.push({ order_id: order.id, role, file_name: file.name, storage_path: storagePath });
    }

    if (fileRecords.length) {
      const { error: fileError } = await supabaseAdmin.from('order_files').insert(fileRecords);
      if (fileError) throw fileError;

      const { error: submissionEventError } = await supabaseAdmin.from('order_submission_events').insert({
        order_id: order.id,
        actor: 'customer',
        event_type: 'UPLOAD_PORTAL',
        channel: 'portal',
        payload: { file_count: fileRecords.length },
      });
      if (submissionEventError) throw submissionEventError;
    }

    await supabaseAdmin.from('orders_history').insert({
      order_id: order.id,
      client_status: 'received',
      note: locale === 'zh' ? '订单创建，等待付款。' : 'Order created and waiting for payment.',
      created_by: 'system',
    });

    await supabaseAdmin.from('order_events').insert({
      order_id: order.id,
      type: 'created',
      message: 'Checkout initialized',
      meta: {
        locale,
        deliveryMethod,
        mailing_address: mailingAddress,
        recipient_name: recipientName,
        phone,
        postcode,
        address_line_1: addressLine1,
        address_line_2: addressLine2,
        city,
        state,
        country,
        serviceType,
        issued_in: issuedIn,
        issuing_country: issuingCountry,
        routeOverride,
        serviceLevel,
        docCategory,
        pages,
        certificateType,
        certificateQuantity,
      },
    });

    const reqUrl = new URL(req.url);
    const origin = reqUrl.origin;

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: email,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: estimate.currency,
            unit_amount: estimate.total,
            product_data: {
              name: locale === 'zh' ? 'EGS 文件流程服务' : 'EGS Document Processing Service',
              description: `${resolvedRouteLabel} / ${destinationCountry}`,
            },
          },
        },
      ],
      metadata: {
        order_id: order.id,
        order_no: order.order_no,
        locale,
        recipient_name: recipientName.slice(0, 120),
        phone: phone.slice(0, 60),
        postcode: postcode.slice(0, 30),
        address_line_1: addressLine1.slice(0, 160),
        address_line_2: addressLine2.slice(0, 160),
        city: city.slice(0, 80),
        state: state.slice(0, 80),
        country: country.slice(0, 80),
        mailing_address: mailingAddress.slice(0, 300),
        issued_in: issuedIn,
        issuing_country: issuingCountry.slice(0, 120),
        tos_accepted: String(tosAccepted),
        privacy_accepted: String(privacyAccepted),
        auth_accepted: String(authAccepted),
        tos_version: TOS_VERSION,
        privacy_version: PRIVACY_VERSION,
        auth_version: AUTH_VERSION,
      },
      success_url: `${origin}/${locale}/portal/success?session_id={CHECKOUT_SESSION_ID}&order_id=${order.id}`,
      cancel_url: `${origin}/${locale}/order/new?cancelled=1`,
    });

    await supabaseAdmin.from('orders').update({ stripe_session_id: session.id }).eq('id', order.id);

    return NextResponse.json({ url: session.url, orderNo: order.order_no, accessToken });
  } catch (error) {
    console.error('Checkout API failed', error);
    return NextResponse.json({ error: 'Failed to initialize checkout.' }, { status: 500 });
  }
}
