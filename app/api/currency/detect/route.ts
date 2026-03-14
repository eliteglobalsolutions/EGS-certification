import { NextResponse } from 'next/server';
import { detectCurrencyFromRequestHeaders, normalizeDisplayCurrency } from '@/lib/currency';

export const runtime = 'nodejs';

export async function GET(req: Request) {
  const detected = detectCurrencyFromRequestHeaders(req.headers, 'AUD');
  const currency = normalizeDisplayCurrency(detected, detected === 'USD' ? 'USD' : 'AUD');
  const country =
    req.headers.get('x-vercel-ip-country')
    || req.headers.get('cf-ipcountry')
    || req.headers.get('x-country-code')
    || null;

  return NextResponse.json({ currency, country });
}
