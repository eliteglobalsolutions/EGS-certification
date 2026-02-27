'use client';

import Link from 'next/link';
import { useI18n } from '@/components/providers/AppProviders';
import { CollapsibleDisclaimer } from '@/components/ui/CollapsibleDisclaimer';

export default function HomePage() {
  const { t } = useI18n();
  return (
    <section className="stack">
      <div className="hero card">
        <h1>{t('heroTitle')}</h1>
        <p>{t('heroBody')}</p>
        <Link href="/start-order" className="btn">{t('heroCta')}</Link>
      </div>
      <CollapsibleDisclaimer />
    </section>
  );
}
