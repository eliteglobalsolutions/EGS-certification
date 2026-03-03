import { NextResponse } from 'next/server';
import { isAuthorized } from '@/lib/admin-auth';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    if (!isAuthorized(request)) {
      return new NextResponse('Unauthorized', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="Admin"' },
      });
    }

    const { id } = await context.params;
    const body = await request.json();
    const status = body?.status;
    const adminNote = String(body?.adminNote || '').trim();

    if (status !== 'approved' && status !== 'rejected') {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from('feedback_submissions')
      .update({
        status,
        admin_note: adminNote || null,
        reviewed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', id);

    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Failed to update feedback' }, { status: 500 });
  }
}
