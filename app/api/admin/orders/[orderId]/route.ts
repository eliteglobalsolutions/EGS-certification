import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

const DOWNLOAD_TTL_SECONDS = 60 * 60 * 24 * 7;

export async function GET(_req: Request, context: { params: Promise<{ orderId: string }> }) {
  try {
    const { orderId } = await context.params;

    const [{ data: order, error: orderError }, { data: events }, { data: files }, { data: history }, { data: submissionEvents }, { data: payments }] = await Promise.all([
      supabaseAdmin.from('orders').select('*').eq('id', orderId).single(),
      supabaseAdmin.from('order_events').select('*').eq('order_id', orderId).order('created_at', { ascending: false }),
      supabaseAdmin.from('order_files').select('*').eq('order_id', orderId).order('created_at', { ascending: false }),
      supabaseAdmin.from('orders_history').select('*').eq('order_id', orderId).order('created_at', { ascending: false }),
      supabaseAdmin.from('order_submission_events').select('*').eq('order_id', orderId).order('created_at', { ascending: false }),
      supabaseAdmin.from('order_payments').select('*').eq('order_id', orderId).order('created_at', { ascending: false }),
    ]);

    if (orderError) throw orderError;

    const filesWithLinks = await Promise.all(
      (files || []).map(async (file: any) => {
        const signed = await supabaseAdmin.storage.from('order-uploads').createSignedUrl(file.storage_path, DOWNLOAD_TTL_SECONDS);
        return {
          ...file,
          download_url: signed.error ? null : signed.data?.signedUrl || null,
        };
      })
    );

    return NextResponse.json({
      order,
      events: events ?? [],
      files: filesWithLinks,
      history: history ?? [],
      submissionEvents: submissionEvents ?? [],
      payments: payments ?? [],
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch order detail' }, { status: 500 });
  }
}
