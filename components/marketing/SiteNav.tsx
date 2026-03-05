import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import type { AppCopy } from '@/lib/i18n/dictionaries';

export function SiteNav({ locale, t }: { locale: 'en' | 'zh'; t: AppCopy }) {
  return (
    <header className="marketing-nav" aria-label="Primary">
      <div className="marketing-nav-inner page-container">
        <Link className="wordmark" href={`/${locale}`}>
          <span className="wordmark-kicker">{t.landing.nav.wordmarkKicker}</span>
          <strong>EGS Certification</strong>
        </Link>

        <nav className="marketing-nav-links" aria-label="Section links">
          <Link href={`/${locale}#services`}>{t.landing.nav.services}</Link>
          <Link href={`/${locale}#process`}>{t.landing.nav.process}</Link>
          <Link href={`/${locale}#pricing`}>{t.landing.nav.pricing}</Link>
          <Link href={`/${locale}#faq`}>{t.landing.nav.faq}</Link>
          <Link href={`/${locale}/track`}>{t.landing.nav.track}</Link>
        </nav>

        <div className="marketing-nav-actions">
          <div className="lang-segment" role="group" aria-label={t.landing.nav.languageLabel}>
            <Link className="lang-segment-item" aria-current={locale === 'en' ? 'page' : undefined} href="/en">
              EN
            </Link>
            <Link className="lang-segment-item" aria-current={locale === 'zh' ? 'page' : undefined} href="/zh">
              中文
            </Link>
          </div>
          <Button href={`/${locale}/intake`} variant="primary">
            {t.landing.nav.startOrder}
          </Button>
        </div>
      </div>
      <nav className="marketing-nav-mobile-links" aria-label="Mobile section links">
        <Link href={`/${locale}#services`}>{t.landing.nav.services}</Link>
        <Link href={`/${locale}#process`}>{t.landing.nav.process}</Link>
        <Link href={`/${locale}#pricing`}>{t.landing.nav.pricing}</Link>
        <Link href={`/${locale}#faq`}>{t.landing.nav.faq}</Link>
        <Link href={`/${locale}/track`}>{t.landing.nav.track}</Link>
      </nav>
    </header>
  );
}
