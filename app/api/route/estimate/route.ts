import { NextResponse } from 'next/server';
import { estimateRoute } from '@/lib/route/rules';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const issuingCountry = String(body.issuingCountry || '');
    const destinationCountry = String(body.destinationCountry || '');
    const documentType = String(body.documentType || '');
    const quantity = Math.max(1, Number(body.quantity || 1));
    const translationRequired = Boolean(body.translationRequired);
    const originalHandling = Boolean(body.originalHandling);
    const speed = (body.speed === 'express' ? 'express' : 'standard') as 'standard' | 'express';
    const haguePreference =
      body.haguePreference === 'hague' || body.haguePreference === 'non_hague' || body.haguePreference === 'unsure'
        ? body.haguePreference
        : 'unsure';

    if (!issuingCountry || !destinationCountry || !documentType) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    const result = estimateRoute({
      issuingCountry,
      destinationCountry,
      documentType,
      quantity,
      translationRequired,
      originalHandling,
      speed,
      haguePreference,
    });

    return NextResponse.json({ result });
  } catch (error) {
    console.error('Route estimate failed', error);
    return NextResponse.json({ error: 'Failed to estimate route.' }, { status: 500 });
  }
}
