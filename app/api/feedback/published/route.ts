import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') === 'zh' ? 'zh' : 'en';

    const { data, error } = await supabaseAdmin
      .from('feedback_submissions')
      .select('id, name, service_type, quote, rating, locale')
      .eq('status', 'approved')
      .eq('locale', locale)
      .order('reviewed_at', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(6);

    if (error) throw error;
    return NextResponse.json(
      { feedback: data ?? [] },
      {
        headers: {
          'cache-control': 'public, max-age=60, s-maxage=300, stale-while-revalidate=600',
        },
      }
    );
  } catch {
    return NextResponse.json(
      { feedback: [] },
      {
        headers: {
          'cache-control': 'public, max-age=30, s-maxage=60',
        },
      }
    );
  }
}
