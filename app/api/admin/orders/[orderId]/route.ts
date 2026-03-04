import { NextResponse } from 'next/server';
  import { supabaseAdmin } from '@/lib/supabase/admin';

  export async function GET(_req: Request, context: { params: Promise<{ orderId: string }
  > }) {
    try {
      const { orderId } = await context.params;

      const [
        { data: order, error: orderError },
        { data: events },
        { data: files },
        { data: history },
        { data: submissionEvents },
      ] = await Promise.all([
        supabaseAdmin.from('orders').select('*').eq('id', orderId).single(),
        supabaseAdmin.from('order_events').select('*').eq('order_id',
  orderId).order('created_at', { ascending: false }),
        supabaseAdmin.from('order_files').select('*').eq('order_id',
  orderId).order('created_at', { ascending: false }),
        supabaseAdmin.from('orders_history').select('*').eq('order_id',
  orderId).order('created_at', { ascending: false }),
        supabaseAdmin.from('order_submission_events').select('*').eq('order_id',
  orderId).order('created_at', { ascending: false }),
      ]);

      if (orderError) throw orderError;

      return NextResponse.json({
        order,
        events: events ?? [],
        files: files ?? [],
        history: history ?? [],
        submissionEvents: submissionEvents ?? [],
      });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Failed to fetch order detail' }, { status: 500 });
    }
  }
