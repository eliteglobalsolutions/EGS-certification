import { NextResponse } from 'next/server';
import { isAuthorized } from '@/lib/admin-auth';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function GET(request: Request) {
  try {
    if (!isAuthorized(request)) {
      return new NextResponse('Unauthorized', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="Admin"' },
      });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    let query = supabaseAdmin
      .from('feedback_submissions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(200);

    if (status === 'pending' || status === 'approved' || status === 'rejected') {
      query = query.eq('status', status);
    }

    const { data, error } = await query;
    if (error) throw error;
    return NextResponse.json({ feedback: data ?? [] });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch feedback' }, { status: 500 });
  }
}
