import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { processCheckoutSessionCompleted } from '@/lib/stripe/process-checkout-session';

function pickSessionByMetadata(
  sessions: { id: string; created: number; payment_status: string | null; metadata: Record<string, string> | null }[],
  orderId: string,
  orderNo: string
) {
  const match = sessions
    .filter((s) => {
      const metadata = s.metadata || {};
      return metadata.order_id === orderId || metadata.order_no === orderNo;
    })
    .sort((a, b) => b.created - a.created)[0];

  return match || null;
}

export async function POST(req: Request, context: { params: Promise<{ orderId: string }> }) {
  try {
    const { orderId } = await context.params;
    const body = await req.json().catch(() => ({} as { sessionId?: string }));
    const explicitSessionId = String(body?.sessionId || '').trim();

    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .select('id,order_no,stripe_session_id')
      .eq('id', orderId)
      .single();
    if (orderError) throw orderError;

    let sessionId = explicitSessionId || String(order.stripe_session_id || '').trim();

    if (!sessionId) {
      const listed = await stripe.checkout.sessions.list({ limit: 100 });
      const candidate = pickSessionByMetadata(
        listed.data.map((s) => ({
          id: s.id,
          created: s.created,
          payment_status: s.payment_status || null,
          metadata: (s.metadata as Record<string, string> | null) ?? null,
        })),
        order.id,
        order.order_no
      );
      if (candidate) sessionId = candidate.id;
    }

    if (!sessionId) {
      return NextResponse.json({ error: 'No Stripe session found for this order.' }, { status: 404 });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== 'paid') {
      return NextResponse.json({ error: `Session is not paid yet (status: ${session.payment_status || 'unknown'}).` }, { status: 409 });
    }

    const result = await processCheckoutSessionCompleted(session, 'admin_replay');
    return NextResponse.json({ ok: true, sessionId, result });
  } catch (error: any) {
    console.error('Replay Stripe checkout failed', error);
    return NextResponse.json({ error: error?.message || 'Failed to replay Stripe checkout.' }, { status: 500 });
  }
}
