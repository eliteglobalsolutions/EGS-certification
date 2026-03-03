import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { generateOrderCode } from '@/lib/order';
import { generateAccessToken } from '@/lib/security';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const locale = body.locale === 'zh' ? 'zh' : 'en';
    const email = String(body.email || '');
    const destinationCountry = String(body.destinationCountry || '');
    const documentType = String(body.documentType || '');

    const orderCode = generateOrderCode();
    const accessToken = generateAccessToken();

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
        document_type: documentType || null,
        document_quantity: 1,
        delivery_method: 'domestic',
        currency: 'aud',
        subtotal_amount: 0,
        service_fee: 0,
        amount_total: 0,
      })
      .select('id,order_code,order_no')
      .single();

    if (error) throw error;
    return NextResponse.json({ order: data, accessToken });
  } catch (error) {
    console.error('Create order draft failed', error);
    return NextResponse.json({ error: 'Failed to create order draft.' }, { status: 500 });
  }
}
