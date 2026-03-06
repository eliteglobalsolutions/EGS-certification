const React = require('react');
const { Document, Page, Text, View, StyleSheet, renderToBuffer } = require('@react-pdf/renderer');

function formatMoney(currency, cents) {
  const value = (Number.isFinite(cents) ? cents : 0) / 100;
  try {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: String(currency || 'AUD').toUpperCase(),
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return `${String(currency || 'AUD').toUpperCase()} ${value.toFixed(2)}`;
  }
}

function printableDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value || '');
  return date.toISOString().slice(0, 10);
}

function safeText(value) {
  const input = String(value ?? '');
  return input
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[–—]/g, '-')
    .replace(/[^\x20-\x7E]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeLineDescription(value) {
  let text = safeText(value)
    .replace(/\?+/g, ' ')
    .replace(/\(\s*\)/g, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/\s+([,)])/g, '$1')
    .replace(/[(]\s+/g, '(')
    .replace(/\s+[)]/g, ')')
    .trim();

  if (!text) return 'Service Fee';

  if (/\bservice fee\b/i.test(text) && /apostille/i.test(text)) {
    text = text
      .replace(/\s*-\s*/g, ' - ')
      .replace(/\s{2,}/g, ' ')
      .trim();
  }

  return text;
}

function readStdin() {
  return new Promise((resolve, reject) => {
    let body = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk) => { body += chunk; });
    process.stdin.on('end', () => resolve(body));
    process.stdin.on('error', reject);
  });
}

async function main() {
  const raw = await readStdin();
  const payload = JSON.parse(raw || '{}');
  const data = payload.data || {};
  const company = payload.company || {};
  const money = (cents) => formatMoney(data.currency, cents);

  const styles = StyleSheet.create({
    page: {
      paddingTop: 28,
      paddingBottom: 34,
      paddingHorizontal: 32,
      fontFamily: 'Helvetica',
      fontSize: 10,
      color: '#111827',
      backgroundColor: '#FFFFFF',
    },
    accentRule: { height: 4, backgroundColor: '#0F2D52', marginBottom: 14, borderRadius: 2 },
    row: { flexDirection: 'row' },
    headLeft: { flexGrow: 1, paddingRight: 14 },
    headRight: { width: 228, borderWidth: 1, borderColor: '#C6CFDB', padding: 11, backgroundColor: '#F8FAFC' },
    title: { fontSize: 20, fontWeight: 700, marginBottom: 10, color: '#0F2D52' },
    company: { fontSize: 15, fontWeight: 700, marginBottom: 7, color: '#0B1E35' },
    line: { marginBottom: 4, color: '#1F2937' },
    block: { marginTop: 18 },
    blockTitle: { fontSize: 11, fontWeight: 700, marginBottom: 8, color: '#0F2D52' },
    metaCard: { borderWidth: 1, borderColor: '#D5DEE9', backgroundColor: '#FBFCFD', padding: 10 },
    metaLeft: { flexGrow: 1, paddingRight: 8 },
    metaRight: { width: 228 },
    metaLabel: { color: '#64748B', marginBottom: 2 },
    metaValue: { marginBottom: 6, color: '#1E293B' },
    table: { borderWidth: 1, borderColor: '#D1D5DB' },
    tableHead: { flexDirection: 'row', backgroundColor: '#EAF0F7', borderBottomWidth: 1, borderColor: '#D1D5DB', padding: 8 },
    thDesc: { flexGrow: 1, fontWeight: 700 },
    thQty: { width: 45, textAlign: 'right', fontWeight: 700 },
    thUnit: { width: 92, textAlign: 'right', fontWeight: 700 },
    thAmt: { width: 92, textAlign: 'right', fontWeight: 700 },
    tr: { flexDirection: 'row', borderBottomWidth: 1, borderColor: '#E5E7EB', padding: 8 },
    trAlt: { backgroundColor: '#FCFDFF' },
    tdDesc: { flexGrow: 1, paddingRight: 8 },
    tdQty: { width: 45, textAlign: 'right' },
    tdUnit: { width: 92, textAlign: 'right' },
    tdAmt: { width: 92, textAlign: 'right', fontWeight: 700 },
    totals: { marginTop: 12, marginLeft: 'auto', width: 296, borderWidth: 1, borderColor: '#D1D5DB', padding: 10, backgroundColor: '#FBFCFD' },
    totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
    totalLabel: { color: '#334155' },
    totalValue: { fontWeight: 700, color: '#0B1E35' },
    totalGrand: { marginTop: 6, paddingTop: 6, borderTopWidth: 1, borderTopColor: '#CBD5E1' },
    muted: { color: '#6B7280', fontSize: 9.5 },
    noteWrap: { borderWidth: 1, borderColor: '#E2E8F0', backgroundColor: '#FCFDFE', padding: 10 },
    note: { color: '#374151', lineHeight: 1.45, marginBottom: 4 },
    footer: { marginTop: 12, fontSize: 9, color: '#64748B' },
  });

  const lineItems = Array.isArray(data.lineItems) ? data.lineItems : [];

  const doc = React.createElement(
    Document,
    null,
    React.createElement(
      Page,
      { size: 'A4', style: styles.page },
      React.createElement(View, { style: styles.accentRule }),
      React.createElement(
        View,
        { style: styles.row },
        React.createElement(
          View,
          { style: styles.headLeft },
          React.createElement(Text, { style: styles.company }, safeText(company.legalName || 'ELITE GLOBAL SOLUTIONS PTY LTD')),
          React.createElement(Text, { style: styles.line }, `ABN: ${safeText(company.abn || '')}`),
          React.createElement(Text, { style: styles.line }, safeText(company.address || '')),
          React.createElement(Text, { style: styles.line }, `Email: ${safeText(company.email || '')}`),
          React.createElement(Text, { style: styles.line }, 'Website: https://www.eliteglobalsolutions.co')
        ),
        React.createElement(
          View,
          { style: styles.headRight },
          React.createElement(Text, { style: styles.title }, 'TAX INVOICE'),
          React.createElement(Text, { style: styles.line }, `Invoice Number: ${safeText(data.invoiceNumber || '-')}`),
          React.createElement(Text, { style: styles.line }, `Issue Date: ${printableDate(data.issueDate || '')}`),
          React.createElement(Text, { style: styles.line }, `Payment Status: ${safeText(data.paymentStatus || 'PAID')}`),
          React.createElement(Text, { style: styles.line }, `Paid At: ${printableDate(data.paidAt || '')}`)
        )
      ),
      React.createElement(
        View,
        { style: styles.block },
        React.createElement(Text, { style: styles.blockTitle }, 'Invoice Meta'),
        React.createElement(
          View,
          { style: styles.row },
          React.createElement(
            View,
            { style: [styles.metaCard, styles.metaLeft] },
            React.createElement(Text, { style: styles.metaLabel }, 'Order Reference'),
            React.createElement(Text, { style: styles.metaValue }, safeText(data.orderReference || '-')),
            React.createElement(Text, { style: styles.metaLabel }, 'Order ID'),
            React.createElement(Text, { style: styles.metaValue }, safeText(data.orderId || '-')),
            React.createElement(Text, { style: styles.metaLabel }, 'Bill To'),
            React.createElement(Text, { style: styles.metaValue }, `${safeText(data.billToName || 'Client')} (${safeText(data.billToEmail || '-')})`)
          ),
          React.createElement(
            View,
            { style: [styles.metaCard, styles.metaRight] },
            React.createElement(Text, { style: styles.metaLabel }, 'Payment Method'),
            React.createElement(Text, { style: styles.metaValue }, safeText(data.paymentMethod || 'Card')),
            React.createElement(Text, { style: styles.metaLabel }, 'Stripe Reference'),
            React.createElement(Text, { style: styles.metaValue }, `${safeText(data.stripePaymentIntentId || '-')} / ${safeText(data.stripeSessionId || '-')}`)
          )
        )
      ),
      React.createElement(
        View,
        { style: styles.block },
        React.createElement(Text, { style: styles.blockTitle }, 'Line Items'),
        React.createElement(
          View,
          { style: styles.table },
          React.createElement(
            View,
            { style: styles.tableHead },
            React.createElement(Text, { style: styles.thDesc }, 'Description'),
            React.createElement(Text, { style: styles.thQty }, 'Qty'),
            React.createElement(Text, { style: styles.thUnit }, 'Unit Price'),
            React.createElement(Text, { style: styles.thAmt }, 'Amount')
          ),
          ...lineItems.map((line, idx) => React.createElement(
            View,
            { key: `item-${idx}`, style: idx % 2 === 0 ? styles.tr : [styles.tr, styles.trAlt] },
            React.createElement(Text, { style: styles.tdDesc }, normalizeLineDescription(line.description || 'Service Fee')),
            React.createElement(Text, { style: styles.tdQty }, String(Math.max(1, Number(line.qty) || 1))),
            React.createElement(Text, { style: styles.tdUnit }, money(Number(line.unitAmountCents) || 0)),
            React.createElement(Text, { style: styles.tdAmt }, money(Number(line.amountCents) || 0))
          ))
        )
      ),
      React.createElement(
        View,
        { style: styles.totals },
        React.createElement(View, { style: styles.totalRow }, React.createElement(Text, { style: styles.totalLabel }, 'Subtotal'), React.createElement(Text, { style: styles.totalValue }, money(Number(data.subtotalCents) || 0))),
        React.createElement(View, { style: styles.totalRow }, React.createElement(Text, { style: styles.totalLabel }, 'GST'), React.createElement(Text, { style: styles.totalValue }, money(Number(data.taxCents) || 0))),
        React.createElement(Text, { style: styles.muted }, 'GST not applied'),
        React.createElement(View, { style: [styles.totalRow, styles.totalGrand] }, React.createElement(Text, { style: styles.totalLabel }, 'Total'), React.createElement(Text, { style: styles.totalValue }, money(Number(data.totalCents) || 0))),
        React.createElement(View, { style: styles.totalRow }, React.createElement(Text, { style: styles.totalLabel }, 'Amount Paid'), React.createElement(Text, { style: styles.totalValue }, money(Number(data.amountPaidCents) || 0))),
        React.createElement(View, { style: styles.totalRow }, React.createElement(Text, { style: styles.totalLabel }, 'Balance Due'), React.createElement(Text, { style: styles.totalValue }, money(Number(data.balanceDueCents) || 0)))
      ),
      React.createElement(
        View,
        { style: styles.block },
        React.createElement(Text, { style: styles.blockTitle }, 'Notes / Disclaimer'),
        React.createElement(
          View,
          { style: styles.noteWrap },
          React.createElement(
            Text,
            { style: styles.note },
            'ELITE GLOBAL SOLUTIONS PTY LTD is an independent document coordination service provider. We are not a law firm, not a public notary, and not a government authority. We do not provide legal advice. Outcomes and timelines are determined by relevant third parties.'
          ),
          React.createElement(Text, { style: styles.note }, 'This invoice is issued upon successful payment.')
        )
      ),
      React.createElement(Text, { style: styles.footer }, `Generated at ${new Date().toISOString()} by EGS Verification`)
    )
  );

  const buffer = await renderToBuffer(doc);
  process.stdout.write(Buffer.from(buffer).toString('base64'));
}

main().catch((error) => {
  process.stderr.write(String(error?.stack || error?.message || error));
  process.exit(1);
});
