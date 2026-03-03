import Link from 'next/link';
import type { AppCopy } from '@/lib/i18n/dictionaries';

export function ActionLoopStrip({ locale, t }: { locale: string; t: AppCopy }) {
  return (
    <section className="action-loop-strip surface-0" aria-label={t.landing.actionLoop.title}>
      <div className="page-container action-loop-inner">
        <p className="small-text action-loop-title">{t.landing.actionLoop.title}</p>
        <nav className="action-loop-links" aria-label={t.landing.actionLoop.title}>
          <Link href={`/${locale}#route-checker`}>{t.landing.actionLoop.route}</Link>
          <span aria-hidden="true">→</span>
          <Link href={`/${locale}/intake`}>{t.landing.actionLoop.intake}</Link>
          <span aria-hidden="true">→</span>
          <Link href={`/${locale}/track`}>{t.landing.actionLoop.track}</Link>
        </nav>
      </div>
    </section>
  );
}
