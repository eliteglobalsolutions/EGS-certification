import { Locale } from '@/lib/i18n/dictionaries';
import { COMPANY_ABN, COMPANY_ADDRESS, COMPANY_BRAND_NAME, COMPANY_EMAIL, COMPANY_LEGAL_NAME } from '@/lib/company';

type EmailPayload = {
  reference: string;
  status: string;
  trackingLink: string;
  summary: string;
  orderId?: string;
  portalLink?: string;
  invoiceUrl?: string;
};

export function orderConfirmationEmail(locale: Locale, payload: EmailPayload) {
  if (locale === 'zh') {
    return {
      subject: `EGS Verification | 订单确认 - ${payload.reference}`,
      body: `订单已确认。\n\n订单号: ${payload.reference}\n当前状态: ${payload.status}\n订单摘要: ${payload.summary}\n查询链接: ${payload.trackingLink}\n\n说明：办理时效仅为预估，实际进度受相关机构处理时间影响。`,
    };
  }

  return {
    subject: `EGS Verification | Order Confirmation - ${payload.reference}`,
    body: `Your order is confirmed.\n\nReference: ${payload.reference}\nCurrent Status: ${payload.status}\nOrder Summary: ${payload.summary}\nTracking Link: ${payload.trackingLink}\n\nCompliance notice: timeline is estimated and subject to authority processing time.`,
  };
}

export function statusUpdateEmail(locale: Locale, payload: EmailPayload) {
  if (locale === 'zh') {
    return {
      subject: `EGS Verification | 订单状态更新 - ${payload.reference}`,
      body: `订单状态已更新。\n\n订单号: ${payload.reference}\n最新状态: ${payload.status}\n查询链接: ${payload.trackingLink}\n\n说明：办理时效受机构处理进度影响。`,
    };
  }

  return {
    subject: `EGS Verification | Order Status Update - ${payload.reference}`,
    body: `Order status has been updated.\n\nReference: ${payload.reference}\nCurrent Status: ${payload.status}\nTracking Link: ${payload.trackingLink}\n\nCompliance notice: timeline remains estimated and subject to authority processing time.`,
  };
}

export function paymentAcceptedEmail(locale: Locale, payload: EmailPayload) {
  const invoiceLine = payload.invoiceUrl || (locale === 'zh' ? '待生成（系统处理中）' : 'Pending (still processing)');
  const portalLine = payload.portalLink || payload.trackingLink;
  const orderIdLine = payload.orderId || '-';

  if (locale === 'zh') {
    return {
      subject: `EGS Verification | 付款成功受理通知 | ${payload.reference}`,
      body: `尊敬的客户，您好：

感谢你选择 ${COMPANY_BRAND_NAME}。我们已成功收到并受理你的付款。

【订单信息】
订单ID: ${orderIdLine}
订单号: ${payload.reference}
当前状态: ${payload.status}
订单摘要: ${payload.summary}

【查询与发票】
订单查询链接: ${portalLine}
状态追踪页: ${payload.trackingLink}
发票链接: ${invoiceLine}
邮件附件: Invoice PDF（已附上）

如需补充材料，我们将通过邮件通知你。请妥善保存本邮件中的订单号以便后续查询。

此致
${COMPANY_BRAND_NAME}
Customer Support
ABN: ${COMPANY_ABN}
Legal Entity: ${COMPANY_LEGAL_NAME}
Address: ${COMPANY_ADDRESS}
Email: ${COMPANY_EMAIL}

免责声明：办理时效为预估时间，最终处理进度以相关主管机构为准。`,
    };
  }

  return {
    subject: `EGS Verification | Payment Acceptance Notice | ${payload.reference}`,
    body: `Dear Client,

Thank you for choosing ${COMPANY_BRAND_NAME}. We confirm your payment has been successfully received and accepted.

[Order Details]
Order ID: ${orderIdLine}
Reference: ${payload.reference}
Current Status: ${payload.status}
Order Summary: ${payload.summary}

[Tracking & Invoice]
Order Portal Link: ${portalLine}
Status Tracking Link: ${payload.trackingLink}
Invoice Link: ${invoiceLine}
Email Attachment: Invoice PDF (attached)

If additional documents are required, we will notify you by email. Please keep this email for your records, including your reference.

Sincerely,
${COMPANY_BRAND_NAME}
Customer Support
ABN: ${COMPANY_ABN}
Legal Entity: ${COMPANY_LEGAL_NAME}
Address: ${COMPANY_ADDRESS}
Email: ${COMPANY_EMAIL}

Disclaimer: processing timelines are estimates and remain subject to the relevant authority's handling time.`,
  };
}
