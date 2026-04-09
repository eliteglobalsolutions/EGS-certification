import { schedule } from '@netlify/functions';

// Runs every day at 8am UTC to keep Supabase project active
export const handler = schedule('0 8 * * *', async () => {
  const siteUrl = process.env.URL || 'https://eliteglobalsolutions.co';
  const secret = process.env.KEEPALIVE_SECRET || '';

  try {
    const res = await fetch(`${siteUrl}/api/keepalive`, {
      headers: { authorization: `Bearer ${secret}` },
    });
    const body = await res.json();
    console.log('[keepalive] Supabase ping result:', body);
  } catch (err) {
    console.error('[keepalive] Failed to ping Supabase:', err);
  }

  return { statusCode: 200 };
});
