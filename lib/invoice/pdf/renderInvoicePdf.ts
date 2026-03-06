import 'server-only';
import { spawn } from 'child_process';
import path from 'path';
import { buildSimplePdf } from '@/lib/pdf/simple-pdf';
import { COMPANY_ABN, COMPANY_ADDRESS, COMPANY_BRAND_NAME, COMPANY_EMAIL, COMPANY_LEGAL_NAME } from '@/lib/company';
import type { InvoicePdfData } from '@/lib/invoice/pdf/InvoiceDocument';

function printableDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toISOString().slice(0, 10);
}

function formatMoney(currency: string, cents: number) {
  const value = (Number.isFinite(cents) ? cents : 0) / 100;
  return `${(currency || 'AUD').toUpperCase()} ${value.toFixed(2)}`;
}

async function renderWithReactPdfWorker(data: InvoicePdfData): Promise<Buffer> {
  const workerPath = path.resolve(process.cwd(), 'scripts/render-invoice-react-pdf.cjs');
  const payload = JSON.stringify({
    company: {
      brandName: COMPANY_BRAND_NAME,
      legalName: COMPANY_LEGAL_NAME,
      abn: COMPANY_ABN,
      address: COMPANY_ADDRESS,
      email: COMPANY_EMAIL,
    },
    data,
  });

  return await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [workerPath], {
      stdio: ['pipe', 'pipe', 'pipe'],
    });

    const stdoutChunks: Buffer[] = [];
    const stderrChunks: Buffer[] = [];
    const timeout = setTimeout(() => {
      child.kill('SIGKILL');
      reject(new Error('react-pdf worker timeout'));
    }, 20_000);

    child.stdout.on('data', (chunk) => stdoutChunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)));
    child.stderr.on('data', (chunk) => stderrChunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)));
    child.on('error', (error) => {
      clearTimeout(timeout);
      reject(error);
    });
    child.on('close', (code) => {
      clearTimeout(timeout);
      const stderr = Buffer.concat(stderrChunks).toString('utf8').trim();
      if (code !== 0) {
        reject(new Error(stderr || `react-pdf worker exited with code ${code}`));
        return;
      }
      const stdout = Buffer.concat(stdoutChunks).toString('utf8').trim();
      if (!stdout) {
        reject(new Error('react-pdf worker returned empty output'));
        return;
      }
      resolve(Buffer.from(stdout, 'base64'));
    });

    child.stdin.write(payload, 'utf8');
    child.stdin.end();
  });
}

export async function renderInvoicePdf(data: InvoicePdfData): Promise<Buffer> {
  try {
    return await renderWithReactPdfWorker(data);
  } catch (error) {
    console.error('renderInvoicePdf react-pdf failed, using simple-pdf fallback', error);
  }

  const lines: string[] = [
    COMPANY_BRAND_NAME,
    `Legal Entity: ${COMPANY_LEGAL_NAME}`,
    `ABN: ${COMPANY_ABN}`,
    `Address: ${COMPANY_ADDRESS}`,
    `Email: ${COMPANY_EMAIL}`,
    'Website: https://www.eliteglobalsolutions.co',
    '',
    'INVOICE',
    `Invoice Number: ${data.invoiceNumber}`,
    `Issue Date: ${printableDate(data.issueDate)}`,
    `Order Reference: ${data.orderReference}`,
    `Order ID: ${data.orderId}`,
    `Bill To: ${data.billToName} <${data.billToEmail}>`,
    `Payment Status: ${data.paymentStatus}`,
    `Paid At: ${printableDate(data.paidAt)}`,
    `Payment Method: ${data.paymentMethod}`,
    `Stripe Reference: ${data.stripePaymentIntentId || '-'} / ${data.stripeSessionId || '-'}`,
    '',
    'LINE ITEMS',
    'Description | Qty | Unit Price | Amount',
    ...data.lineItems.map((item) =>
      `${item.description} | ${item.qty} | ${formatMoney(data.currency, item.unitAmountCents)} | ${formatMoney(data.currency, item.amountCents)}`
    ),
    '',
    `Subtotal: ${formatMoney(data.currency, data.subtotalCents)}`,
    `GST: ${formatMoney(data.currency, data.taxCents)} (GST not applied)`,
    `Total: ${formatMoney(data.currency, data.totalCents)}`,
    `Amount Paid: ${formatMoney(data.currency, data.amountPaidCents)}`,
    `Balance Due: ${formatMoney(data.currency, data.balanceDueCents)}`,
    '',
    'Notes / Disclaimer',
    'EGS Verification is an independent document coordination service provider.',
    'We are not a law firm, not a public notary, and not a government authority.',
    'We do not provide legal advice. Outcomes and timelines are determined by relevant third parties.',
    'This invoice is issued upon successful payment.',
  ];

  return buildSimplePdf(lines);
}
