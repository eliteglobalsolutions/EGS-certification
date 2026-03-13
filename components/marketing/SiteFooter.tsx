import Link from 'next/link';
import type { AppCopy } from '@/lib/i18n/dictionaries';
import { COMPANY_BRAND_NAME } from '@/lib/company';
import { localizedPath } from '@/lib/i18n/locale';

export function SiteFooter({ locale, t }: { locale: string; t: AppCopy }) {
  const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL;
  const year = new Date().getFullYear();
  const path = (value = '') => localizedPath(locale as 'en' | 'zh', value);
  const copyright =
    locale === 'zh'
      ? `© ${year} ${COMPANY_BRAND_NAME}. 版权所有。`
      : `© ${year} ${COMPANY_BRAND_NAME}. All rights reserved.`;

  return (
    <footer id="contact" className="site-footer" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        {t.landing.footer.contactTitle}
      </h2>

      <div className="site-footer-grid">
        <section className="site-footer-brand" aria-label={t.landing.footer.contactTitle}>
          <div className="nav-logo-seal" style={{ borderColor: 'rgba(255,255,255,0.25)' }}>
            <span className="nav-logo-seal-letter" style={{ color: 'var(--white)' }}>E</span>
          </div>
          <p className="footer-brand-name">EGS Verification</p>
          <p className="footer-brand-tagline">{locale === 'zh' ? '公证认证 · 澳大利亚' : "Apostille & Legalisation"}</p>
          <p className="footer-brand-descriptor">{t.landing.footer.descriptor}</p>
          <div className="footer-contact">
            <div>{t.landing.footer.address}</div>
            {t.landing.footer.poBox && <div>{t.landing.footer.poBox}</div>}
            <div>{t.landing.footer.phone}</div>
            {supportEmail && <div>{t.landing.footer.emailLabel}: {supportEmail}</div>}
          </div>
        </section>

        <section aria-label={t.landing.footer.legalTitle}>
          <p className="kicker">{t.landing.footer.legalTitle}</p>
          <div className="footer-links">
            <Link href={path('/legal/terms')}>{t.common.terms}</Link>
            <Link href={path('/legal/privacy')}>{t.common.privacy}</Link>
            <Link href={path('/legal/authorisation')}>{t.common.authorisation}</Link>
            <Link href={path('/resources')}>{t.resources.linkLabel}</Link>
          </div>
        </section>

        <section aria-label={t.landing.footer.clientAccessTitle}>
          <p className="kicker">{t.landing.footer.clientAccessTitle}</p>
          <div className="footer-links">
            <Link href={path('/track')}>{t.nav.track}</Link>
            <Link href={path('/order/upload')}>{t.nav.upload}</Link>
            <Link href={path('/samples')}>{t.resources.samplesLinkLabel}</Link>
          </div>
        </section>

        <section aria-label={locale === 'zh' ? '主要服务' : 'Primary services'}>
          <p className="kicker">{locale === 'zh' ? '主要服务' : 'Primary services'}</p>
          <div className="footer-links">
            <Link href={path('/services')}>{locale === 'zh' ? '服务总页' : 'Services overview'}</Link>
            <Link href={path('/apostille-australia')}>{locale === 'zh' ? '澳洲海牙认证' : 'Apostille Australia'}</Link>
            <Link href={path('/consular-legalisation-australia')}>{locale === 'zh' ? '领馆认证' : 'Consular legalisation'}</Link>
            <Link href={path('/used-in/china')}>{locale === 'zh' ? '用于中国' : 'Used in China'}</Link>
            <Link href={path('/used-in/singapore')}>{locale === 'zh' ? '用于新加坡' : 'Used in Singapore'}</Link>
            <Link href={path('/used-in/united-states')}>{locale === 'zh' ? '用于美国' : 'Used in United States'}</Link>
          </div>
        </section>
      </div>

      <div className="site-footer-bottom">
        <p className="footer-copy">{copyright}</p>
        <p className="footer-legal">
          {t.landing.footer.roleDisclosure}
        </p>
      </div>
    </footer>
  );
}
