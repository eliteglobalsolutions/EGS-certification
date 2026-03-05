import 'server-only';
import React from 'react';
import { renderToBuffer } from '@react-pdf/renderer';
import { InvoiceDocument, type InvoicePdfData } from '@/lib/invoice/pdf/InvoiceDocument';

export async function renderInvoicePdf(data: InvoicePdfData): Promise<Buffer> {
  const doc = React.createElement(InvoiceDocument, { data }) as unknown as React.ReactElement;
  const buffer = await renderToBuffer(doc);
  return Buffer.isBuffer(buffer) ? buffer : Buffer.from(buffer);
}
