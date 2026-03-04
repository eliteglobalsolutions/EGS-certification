import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const sourceIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || null;
    const userAgent = request.headers.get('user-agent') || null;
    const locale = body?.locale === 'zh' ? 'zh' : 'en';
    const name = String(body?.name || '').trim();
    const serviceType = String(body?.serviceType || '').trim();
    const quote = String(body?.quote || '').trim();
    const rating = Number.parseInt(String(body?.rating || '0'), 10);

    if (!name || !quote || rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Invalid feedback payload' }, { status: 400 });
    }

    if (sourceIp) {
      const { data: latest, error: latestError } = await supabaseAdmin
        .from('feedback_submissions')
        .select('created_at')
        .eq('source_ip', sourceIp)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (latestError) throw latestError;

      if (latest?.created_at) {
        const seconds = (Date.now() - new Date(latest.created_at).getTime()) / 1000;
        if (Number.isFinite(seconds) && seconds < 60) {
          return NextResponse.json({ error: 'Please wait before submitting again.' }, { status: 429 });
        }
      }
    }

    const { error } = await supabaseAdmin.from('feedback_submissions').insert({
      locale,
      name: name.slice(0, 80),
      service_type: serviceType.slice(0, 120),
      quote: quote.slice(0, 600),
      rating,
      status: 'pending',
      source_ip: sourceIp,
      user_agent: userAgent,
    });

    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Unable to submit feedback' }, { status: 500 });
  }
}
