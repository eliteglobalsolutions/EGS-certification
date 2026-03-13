import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import type { AppCopy } from '@/lib/i18n/dictionaries';
import { localizedPath } from '@/lib/i18n/locale';

export function SiteNav({ locale, t }: { locale: 'en' | 'zh'; t: AppCopy }) {
  const homeHref = localizedPath(locale);
  const guidesHref = localizedPath(locale, '/guides');
  const routesHref = localizedPath(locale, '/routes');
  const servicesHref = `${localizedPath(locale)}#services`;
  const trackHref = localizedPath(locale, '/track');
  const intakeHref = localizedPath(locale, '/intake');
  const zhHref = localizedPath('zh');

  return (
    <>
      <div className="nav-topbar">
        <div className="nav-topbar-inner">
          <div className="nav-topbar-left">
            <span>{locale === 'zh' ? '澳大利亚认证专家' : 'Australia\'s apostille & legalisation specialists'}</span>
            <span className="nav-topbar-sep">·</span>
            <span>{locale === 'zh' ? 'ABN 注册机构' : 'ABN registered'}</span>
          </div>
          <div className="nav-topbar-right">
            <div className="lang-pair">
              <Link className={locale === 'en' ? 'on' : ''} href="/">EN</Link>
              <Link className={locale === 'zh' ? 'on' : ''} href={zhHref}>中文</Link>
            </div>
          </div>
        </div>
      </div>
      <header className="marketing-nav" aria-label="Primary">
        <div className="marketing-nav-inner page-container">
          <Link className="wordmark" href={homeHref}>
            <div className="nav-logo-seal">
              <span className="nav-logo-seal-letter">E</span>
            </div>
            <div>
              <span className="wordmark-kicker">{t.landing.nav.wordmarkKicker}</span>
              <strong>EGS Verification</strong>
            </div>
          </Link>

          <nav className="marketing-nav-links" aria-label="Section links">
            <Link href={guidesHref}>{t.landing.nav.guides}</Link>
            <Link href={routesHref}>{t.landing.nav.routes}</Link>
            <Link href={servicesHref}>{t.landing.nav.services}</Link>
            <Link href={trackHref}>{t.landing.nav.track}</Link>
          </nav>

          <div className="marketing-nav-actions">
            <div className="lang-segment" role="group" aria-label={t.landing.nav.languageLabel}>
              <Link className="lang-segment-item" aria-current={locale === 'en' ? 'page' : undefined} href="/">
                EN
              </Link>
              <Link className="lang-segment-item" aria-current={locale === 'zh' ? 'page' : undefined} href={zhHref}>
                中文
              </Link>
            </div>
            <Button href={intakeHref} variant="primary">
              <span className="nav-cta-full">{t.landing.nav.startOrder}</span>
              <span className="nav-cta-short">{locale === 'zh' ? '下单' : 'Start'}</span>
            </Button>
          </div>
        </div>
        <nav className="marketing-nav-mobile-links" aria-label="Mobile section links">
          <Link href={guidesHref}>{t.landing.nav.guides}</Link>
          <Link href={routesHref}>{t.landing.nav.routes}</Link>
          <Link href={servicesHref}>{t.landing.nav.services}</Link>
          <Link href={trackHref}>{t.landing.nav.track}</Link>
        </nav>
      </header>
    </>
  );
}
