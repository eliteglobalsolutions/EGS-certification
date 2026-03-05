import { Locale } from '@/lib/i18n/dictionaries';

type EmailPayload = {
  reference: string;
  status: string;
  trackingLink: string;
  summary: string;
};

export function orderConfirmationEmail(locale: Locale, payload: EmailPayload) {
  if (locale === 'zh') {
    return {
      subject: `订单确认 - ${payload.reference}`,
      body: `订单已确认。\n\n订单号: ${payload.reference}\n当前状态: ${payload.status}\n订单摘要: ${payload.summary}\n查询链接: ${payload.trackingLink}\n\n说明：办理时效仅为预估，实际进度受相关机构处理时间影响。`,
    };
  }

  return {
    subject: `Order Confirmation - ${payload.reference}`,
    body: `Your order is confirmed.\n\nReference: ${payload.reference}\nCurrent Status: ${payload.status}\nOrder Summary: ${payload.summary}\nTracking Link: ${payload.trackingLink}\n\nCompliance notice: timeline is estimated and subject to authority processing time.`,
  };
}

export function statusUpdateEmail(locale: Locale, payload: EmailPayload) {
  if (locale === 'zh') {
    return {
      subject: `订单状态更新 - ${payload.reference}`,
      body: `订单状态已更新。\n\n订单号: ${payload.reference}\n最新状态: ${payload.status}\n查询链接: ${payload.trackingLink}\n\n说明：办理时效受机构处理进度影响。`,
    };
  }

  return {
    subject: `Order Status Update - ${payload.reference}`,
    body: `Order status has been updated.\n\nReference: ${payload.reference}\nCurrent Status: ${payload.status}\nTracking Link: ${payload.trackingLink}\n\nCompliance notice: timeline remains estimated and subject to authority processing time.`,
  };
}

export function paymentAcceptedEmail(locale: Locale, payload: EmailPayload) {
  if (locale === 'zh') {
    return {
      subject: `付款成功受理 - ${payload.reference}`,
      body: `我们已收到并受理你的付款。\n\n订单号: ${payload.reference}\n当前状态: ${payload.status}\n订单摘要: ${payload.summary}\n查询链接: ${payload.trackingLink}\n\n说明：如需补件，我们会通过邮件通知。`,
    };
  }

  return {
    subject: `Payment Accepted - ${payload.reference}`,
    body: `We have received and accepted your payment.\n\nReference: ${payload.reference}\nCurrent Status: ${payload.status}\nOrder Summary: ${payload.summary}\nTracking Link: ${payload.trackingLink}\n\nNote: if additional documents are required, we will notify you by email.`,
  };
}
