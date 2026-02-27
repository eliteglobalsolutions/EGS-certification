'use client';

import { useI18n } from '@/components/providers/AppProviders';

export default function HelpPage() {
  const { t } = useI18n();
  return (
    <section className="card stack">
      <h2>{t('faqTitle')}</h2>
      <p>Typical timeline: 3-10 business days depending on destination and processing queue.</p>
      <p>Common required files: source document, passport copy, and supporting IDs.</p>
      <p>Need help? Contact support with your order number for faster handling.</p>
    </section>
  );
}
