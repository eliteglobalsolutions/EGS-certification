import React from 'react';
import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { COMPANY_ABN, COMPANY_ADDRESS, COMPANY_BRAND_NAME, COMPANY_EMAIL, COMPANY_LEGAL_NAME } from '@/lib/company';

export type InvoicePdfLineItem = {
  description: string;
  qty: number;
  unitAmountCents: number;
  amountCents: number;
};

export type InvoicePdfData = {
  invoiceNumber: string;
  issueDate: string;
  orderReference: string;
  orderId: string;
  billToName: string;
  billToEmail: string;
  paymentStatus: 'PAID';
  paidAt: string;
  paymentMethod: string;
  stripePaymentIntentId: string;
  stripeSessionId: string;
  currency: string;
  subtotalCents: number;
  taxCents: number;
  totalCents: number;
  amountPaidCents: number;
  balanceDueCents: number;
  lineItems: InvoicePdfLineItem[];
};

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: '#0f172a',
    paddingTop: 32,
    paddingBottom: 32,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 16,
    marginBottom: 6,
  },
  section: {
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 11,
    marginBottom: 5,
  },
  line: {
    marginBottom: 3,
  },
  tableHead: {
    marginTop: 4,
    marginBottom: 3,
  },
  row: {
    marginBottom: 2,
  },
  muted: {
    color: '#475569',
  },
  strong: {
    fontSize: 10.5,
  },
});

function formatMoney(currency: string, cents: number) {
  const value = (Number.isFinite(cents) ? cents : 0) / 100;
  try {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: (currency || 'AUD').toUpperCase(),
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return `${(currency || 'AUD').toUpperCase()} ${value.toFixed(2)}`;
  }
}

function printableDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value || '');
  return date.toISOString().slice(0, 10);
}

export function buildInvoicePdfDocument(data: InvoicePdfData): React.ReactElement {
  const money = (cents: number) => formatMoney(data.currency, cents);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>{String(COMPANY_BRAND_NAME)} INVOICE</Text>
        <Text style={styles.line}>{String(COMPANY_BRAND_NAME)}</Text>
        <Text style={styles.line}>Legal Entity: {String(COMPANY_LEGAL_NAME)}</Text>
        <Text style={styles.line}>ABN: {String(COMPANY_ABN)}</Text>
        <Text style={styles.line}>{String(COMPANY_ADDRESS)}</Text>
        <Text style={styles.line}>Email: {String(COMPANY_EMAIL)}</Text>
        <Text style={styles.line}>Website: https://www.eliteglobalsolutions.co</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Invoice Meta</Text>
          <Text style={styles.line}>Invoice Number: {String(data.invoiceNumber || '-')}</Text>
          <Text style={styles.line}>Issue Date: {printableDate(String(data.issueDate || ''))}</Text>
          <Text style={styles.line}>Order Reference: {String(data.orderReference || '-')}</Text>
          <Text style={styles.line}>Order ID: {String(data.orderId || '-')}</Text>
          <Text style={styles.line}>Bill To: {String(data.billToName || 'Client')} ({String(data.billToEmail || '-')})</Text>
          <Text style={styles.line}>Payment Status: {String(data.paymentStatus || 'PAID')}</Text>
          <Text style={styles.line}>Paid At: {printableDate(String(data.paidAt || ''))}</Text>
          <Text style={styles.line}>Payment Method: {String(data.paymentMethod || 'Card')}</Text>
          <Text style={styles.line}>Stripe Reference: {String(data.stripePaymentIntentId || '-')} / {String(data.stripeSessionId || '-')}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Line Items</Text>
          <Text style={styles.tableHead}>Description | Qty | Unit Price | Amount</Text>
          {data.lineItems.map((line, idx) => (
            <Text key={`line-${idx}`} style={styles.row}>
              {String(line.description || 'Service Fee')} | {String(Math.max(1, Number(line.qty) || 1))} | {money(Number(line.unitAmountCents) || 0)} | {money(Number(line.amountCents) || 0)}
            </Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Totals</Text>
          <Text style={styles.line}>Subtotal: {money(Number(data.subtotalCents) || 0)}</Text>
          <Text style={styles.line}>GST: {money(Number(data.taxCents) || 0)} (GST not applied)</Text>
          <Text style={[styles.line, styles.strong]}>Total: {money(Number(data.totalCents) || 0)}</Text>
          <Text style={styles.line}>Amount Paid: {money(Number(data.amountPaidCents) || 0)}</Text>
          <Text style={[styles.line, styles.strong]}>Balance Due: {money(Number(data.balanceDueCents) || 0)}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notes / Disclaimer</Text>
          <Text style={[styles.line, styles.muted]}>
            EGS Verification is an independent document coordination service provider. We are not a law firm,
            not a public notary, and not a government authority. We do not provide legal advice. Outcomes and timelines are
            determined by relevant third parties.
          </Text>
          <Text style={[styles.line, styles.muted]}>This invoice is issued upon successful payment.</Text>
        </View>
      </Page>
    </Document>
  );
}

export function InvoiceDocument({ data }: { data: InvoicePdfData }) {
  return buildInvoicePdfDocument(data);
}
