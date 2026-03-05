import { NextResponse } from 'next/server';
import { generateInvoiceForOrder } from '@/lib/invoice/generateInvoiceForOrder';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  try {
    const body = await req.json();
    const orderId = String(body?.orderId || '').trim();
    if (!orderId) return NextResponse.json({ error: 'Missing orderId' }, { status: 400 });

    const result = await generateInvoiceForOrder(orderId);
    return new NextResponse(new Uint8Array(result.pdf_buffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${result.pdf_filename}"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (error: any) {
    console.error('test-invoice-pdf failed', error);
    return NextResponse.json({ error: error?.message || 'Failed to render invoice PDF' }, { status: 500 });
  }
}
