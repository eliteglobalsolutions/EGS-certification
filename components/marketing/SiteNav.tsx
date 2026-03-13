import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import type { AppCopy } from '@/lib/i18n/dictionaries';
import { localizedPath } from '@/lib/i18n/locale';

export function SiteNav({ locale, t }: { locale: 'en' | 'zh'; t: AppCopy }) {
  const homeHref = localizedPath(locale);
  const guidesHref = localizedPath(locale, '/guides');
  const routesHref = localizedPath(locale, '/routes');
  const servicesHref = `${localizedPath(locale)}#services`;
  const faqHref = localizedPath(locale, '/faq');
  const samplesHref = localizedPath(locale, '/samples');
  const trackHref = localizedPath(locale, '/track');
  const intakeHref = localizedPath(locale, '/intake');
  const zhHref = localizedPath('zh');

  return (
    <>
      <header className="marketing-nav" aria-label="Primary">
        <div className="marketing-nav-inner page-container">
          <Link className="wordmark" href={homeHref}>
            <div className="nav-logo-seal">
              <span className="nav-logo-seal-letter">E</span>
            </div>
            <div>
              <span className="wordmark-kicker">{t.landing.nav.wordmarkKicker}</span>
              <strong>
                <span className="wordmark-full">EGS Verification</span>
                <span className="wordmark-compact">EGS</span>
              </strong>
            </div>
          </Link>

          <nav className="marketing-nav-links" aria-label="Section links">
            <Link href={servicesHref}>{t.landing.nav.services}</Link>
            <Link href={routesHref}>{t.landing.nav.routes}</Link>
            <Link href={guidesHref}>{t.landing.nav.guides}</Link>
            <Link href={faqHref}>{t.landing.nav.faq}</Link>
            <Link href={samplesHref}>{t.landing.nav.samples}</Link>
          </nav>

          <div className="marketing-nav-actions">
            <div className="lang-segment" role="group" aria-label={t.landing.nav.languageLabel}>
              <Link className="lang-segment-item" aria-current={locale === 'en' ? 'page' : undefined} href="/">
                EN
              </Link>
              <Link className="lang-segment-item" aria-current={locale === 'zh' ? 'page' : undefined} href={zhHref}>
                中
              </Link>
            </div>
            <div className="marketing-nav-action marketing-nav-action-track">
              <Button href={trackHref} variant="ghost">
                <span className="nav-cta-full">{t.landing.nav.track}</span>
              </Button>
            </div>
            <div className="marketing-nav-action marketing-nav-action-primary">
              <Button href={intakeHref} variant="primary">
                <span className="nav-cta-full">{t.landing.nav.startOrder}</span>
                <span className="nav-cta-short">{locale === 'zh' ? '申请' : 'Apply'}</span>
              </Button>
            </div>
          </div>
        </div>
        <nav className="marketing-nav-mobile-links" aria-label="Mobile section links">
          <Link href={servicesHref}>{t.landing.nav.services}</Link>
          <Link href={routesHref}>{t.landing.nav.routes}</Link>
          <Link href={guidesHref}>{t.landing.nav.guides}</Link>
          <Link href={faqHref}>{t.landing.nav.faq}</Link>
          <Link href={samplesHref}>{t.landing.nav.samples}</Link>
        </nav>
      </header>
    </>
  );
}
