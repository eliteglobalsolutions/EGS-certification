import { COMPANY_ABN, COMPANY_ADDRESS, COMPANY_EMAIL, COMPANY_LEGAL_NAME } from '@/lib/company';
import { buildSimplePdf } from '@/lib/pdf/simple-pdf';

type OrderSummaryPdfInput = {
  locale: 'en' | 'zh';
  orderId: string;
  orderNo: string;
  status: string;
  summary: string;
  portalLink: string;
  trackingLink: string;
  invoiceUrl: string;
  amount: number | null | undefined;
  currency: string | null | undefined;
  issuedAtIso?: string;
};

export function buildOrderSummaryPdf(input: OrderSummaryPdfInput): Buffer {
  const issuedAt = input.issuedAtIso || new Date().toISOString();
  const amountText = typeof input.amount === 'number'
    ? `${(input.amount / 100).toFixed(2)} ${(input.currency || '').toUpperCase() || 'AUD'}`
    : '-';

  const lines = [
    COMPANY_LEGAL_NAME,
    `ABN: ${COMPANY_ABN}`,
    `Address: ${COMPANY_ADDRESS}`,
    `Email: ${COMPANY_EMAIL}`,
    '',
    input.locale === 'zh' ? 'ORDER SUMMARY / 订单摘要' : 'ORDER SUMMARY',
    `Issued At: ${issuedAt}`,
    '',
    `Order ID: ${input.orderId}`,
    `Reference: ${input.orderNo}`,
    `Status: ${input.status}`,
    `Amount: ${amountText}`,
    `Summary: ${input.summary || '-'}`,
    '',
    `Order Portal: ${input.portalLink}`,
    `Tracking: ${input.trackingLink}`,
    `Invoice: ${input.invoiceUrl || 'Pending (still processing)'}`,
    '',
    'Note: This document is generated automatically for client reference.',
  ];

  return buildSimplePdf(lines);
}

