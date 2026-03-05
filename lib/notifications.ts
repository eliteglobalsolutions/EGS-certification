import { Locale } from '@/lib/i18n/dictionaries';
import { orderConfirmationEmail, paymentAcceptedEmail, statusUpdateEmail } from './email/templates';

type MailArgs = {
  to: string;
  subject: string;
  body: string;
};

async function sendEmail({ to, subject, body }: MailArgs) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.MAIL_FROM || 'ELITE GLOBAL SOLUTIONS PTY LTD <no-reply@egs.example>';

  if (!apiKey) {
    console.info('[mail][dry-run]', { to, subject, body });
    return;
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      text: body,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('[mail][send-failed]', { status: res.status, text, to, subject });
    throw new Error(`Mail provider request failed: ${res.status}`);
  }
}

export async function sendOrderConfirmation(args: {
  locale: Locale;
  to: string;
  reference: string;
  status: string;
  trackingLink: string;
  summary: string;
}) {
  const mail = orderConfirmationEmail(args.locale, args);
  await sendEmail({ to: args.to, subject: mail.subject, body: mail.body });
}

export async function sendStatusUpdate(args: {
  locale: Locale;
  to: string;
  reference: string;
  status: string;
  trackingLink: string;
  summary: string;
}) {
  const mail = statusUpdateEmail(args.locale, args);
  await sendEmail({ to: args.to, subject: mail.subject, body: mail.body });
}

export async function sendPaymentAccepted(args: {
  locale: Locale;
  to: string;
  reference: string;
  status: string;
  trackingLink: string;
  summary: string;
}) {
  const mail = paymentAcceptedEmail(args.locale, args);
  await sendEmail({ to: args.to, subject: mail.subject, body: mail.body });
}
