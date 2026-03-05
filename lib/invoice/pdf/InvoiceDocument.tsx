import React from 'react';
import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { COMPANY_ABN, COMPANY_ADDRESS, COMPANY_EMAIL, COMPANY_LEGAL_NAME } from '@/lib/company';

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
    fontSize: 10.5,
    color: '#111827',
    paddingTop: 34,
    paddingBottom: 34,
    paddingHorizontal: 32,
  },
  row: { flexDirection: 'row' },
  headerLeft: { flexGrow: 1, paddingRight: 10 },
  headerRight: { width: 190, borderWidth: 1, borderColor: '#D1D5DB', padding: 10 },
  company: { fontSize: 14, fontWeight: 700, marginBottom: 6 },
  sub: { color: '#374151', marginBottom: 3 },
  website: { color: '#1F2937', marginBottom: 3 },
  title: { fontSize: 18, fontWeight: 700, marginBottom: 8 },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  metaLabel: { color: '#4B5563', width: 74 },
  metaValue: { color: '#111827', flexGrow: 1, textAlign: 'right' },
  block: { marginTop: 18 },
  blockTitle: { fontSize: 11, fontWeight: 700, marginBottom: 7, color: '#111827' },
  billText: { color: '#1F2937', marginBottom: 3 },
  table: { borderWidth: 1, borderColor: '#D1D5DB' },
  tableHeader: { backgroundColor: '#F3F4F6', borderBottomWidth: 1, borderColor: '#D1D5DB', paddingVertical: 7, paddingHorizontal: 8 },
  thDesc: { flexGrow: 1, fontWeight: 700 },
  thQty: { width: 45, textAlign: 'right', fontWeight: 700 },
  thPrice: { width: 90, textAlign: 'right', fontWeight: 700 },
  thAmount: { width: 90, textAlign: 'right', fontWeight: 700 },
  tableRow: { flexDirection: 'row', paddingVertical: 7, paddingHorizontal: 8, borderBottomWidth: 1, borderColor: '#E5E7EB' },
  desc: { flexGrow: 1, color: '#1F2937', paddingRight: 8 },
  qty: { width: 45, textAlign: 'right', color: '#111827' },
  price: { width: 90, textAlign: 'right', color: '#111827' },
  amount: { width: 90, textAlign: 'right', color: '#111827', fontWeight: 700 },
  totalsWrap: { marginTop: 10, marginLeft: 'auto', width: 260 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  totalLabel: { color: '#374151' },
  totalValue: { color: '#111827', fontWeight: 700 },
  totalMuted: { color: '#6B7280', fontSize: 9.5, marginTop: 2 },
  grand: {
    marginTop: 6,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#D1D5DB',
  },
  notes: { marginTop: 18, borderTopWidth: 1, borderTopColor: '#E5E7EB', paddingTop: 10 },
  noteTitle: { fontSize: 10.5, fontWeight: 700, marginBottom: 5 },
  noteLine: { color: '#374151', lineHeight: 1.45, marginBottom: 3 },
  footer: { marginTop: 15, color: '#6B7280', fontSize: 9.5 },
});

function formatMoney(currency: string, cents: number) {
  const value = (Number.isFinite(cents) ? cents : 0) / 100;
  try {
    const formatted = new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: (currency || 'AUD').toUpperCase(),
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
    return formatted;
  } catch {
    return `${(currency || 'AUD').toUpperCase()} ${value.toFixed(2)}`;
  }
}

function printableDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toISOString().slice(0, 10);
}

export function InvoiceDocument({ data }: { data: InvoicePdfData }) {
  const money = (cents: number) => formatMoney(data.currency, cents);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={[styles.row]}>
          <View style={styles.headerLeft}>
            <Text style={styles.company}>{COMPANY_LEGAL_NAME}</Text>
            <Text style={styles.sub}>ABN: {COMPANY_ABN}</Text>
            <Text style={styles.sub}>{COMPANY_ADDRESS}</Text>
            <Text style={styles.sub}>Email: {COMPANY_EMAIL}</Text>
            <Text style={styles.website}>Website: https://www.eliteglobalsolutions.co</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.title}>INVOICE</Text>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Number</Text>
              <Text style={styles.metaValue}>{data.invoiceNumber}</Text>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Issue Date</Text>
              <Text style={styles.metaValue}>{printableDate(data.issueDate)}</Text>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Status</Text>
              <Text style={styles.metaValue}>{data.paymentStatus}</Text>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Paid At</Text>
              <Text style={styles.metaValue}>{printableDate(data.paidAt)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.block}>
          <Text style={styles.blockTitle}>Bill To</Text>
          <Text style={styles.billText}>{data.billToName || 'Client'}</Text>
          <Text style={styles.billText}>{data.billToEmail || '-'}</Text>
          <Text style={styles.billText}>Order Reference: {data.orderReference || '-'}</Text>
          <Text style={styles.billText}>Order ID: {data.orderId || '-'}</Text>
          <Text style={styles.billText}>Payment Method: {data.paymentMethod || 'Card'}</Text>
          <Text style={styles.billText}>Stripe Reference: {data.stripePaymentIntentId || '-'} / {data.stripeSessionId || '-'}</Text>
        </View>

        <View style={styles.block}>
          <Text style={styles.blockTitle}>Line Items</Text>
          <View style={styles.table}>
            <View style={[styles.tableHeader, styles.row]}>
              <Text style={styles.thDesc}>Description</Text>
              <Text style={styles.thQty}>Qty</Text>
              <Text style={styles.thPrice}>Unit Price</Text>
              <Text style={styles.thAmount}>Amount</Text>
            </View>
            {data.lineItems.map((line, idx) => (
              <View key={`${line.description}-${idx}`} style={styles.tableRow}>
                <Text style={styles.desc}>{line.description}</Text>
                <Text style={styles.qty}>{line.qty}</Text>
                <Text style={styles.price}>{money(line.unitAmountCents)}</Text>
                <Text style={styles.amount}>{money(line.amountCents)}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.totalsWrap}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal</Text>
            <Text style={styles.totalValue}>{money(data.subtotalCents)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>GST</Text>
            <Text style={styles.totalValue}>{money(data.taxCents)}</Text>
          </View>
          <Text style={styles.totalMuted}>GST not applied</Text>
          <View style={[styles.totalRow, styles.grand]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{money(data.totalCents)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Amount Paid</Text>
            <Text style={styles.totalValue}>{money(data.amountPaidCents)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Balance Due</Text>
            <Text style={styles.totalValue}>{money(data.balanceDueCents)}</Text>
          </View>
        </View>

        <View style={styles.notes}>
          <Text style={styles.noteTitle}>Notes / Disclaimer</Text>
          <Text style={styles.noteLine}>
            ELITE GLOBAL SOLUTIONS PTY LTD is an independent document coordination service provider. We are not a law firm,
            not a public notary, and not a government authority. We do not provide legal advice. Outcomes and timelines are
            determined by relevant third parties.
          </Text>
          <Text style={styles.noteLine}>This invoice is issued upon successful payment.</Text>
        </View>

        <Text style={styles.footer}>Generated by EGS Certification system for compliance and audit records.</Text>
      </Page>
    </Document>
  );
}
