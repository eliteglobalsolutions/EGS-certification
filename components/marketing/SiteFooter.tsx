import Link from 'next/link';
import type { AppCopy } from '@/lib/i18n/dictionaries';
import { COMPANY_BRAND_NAME } from '@/lib/company';

export function SiteFooter({ locale, t }: { locale: string; t: AppCopy }) {
  const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL;
  const year = new Date().getFullYear();
  const copyright =
    locale === 'zh'
      ? `© ${year} ${COMPANY_BRAND_NAME}. 版权所有。`
      : `© ${year} ${COMPANY_BRAND_NAME}. All rights reserved.`;

  return (
    <footer id="contact" className="site-footer surface-0" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        {t.landing.footer.contactTitle}
      </h2>

      <div className="site-footer-grid">
        <section className="stack-sm" aria-label={t.landing.footer.contactTitle}>
          <p className="kicker">{t.landing.footer.contactTitle}</p>
          <p className="small-text">{t.landing.footer.address}</p>
          <p className="small-text">{t.landing.footer.poBox}</p>
          <p className="small-text">{t.landing.footer.phone}</p>
          {supportEmail ? <p className="small-text">{t.landing.footer.emailLabel}: {supportEmail}</p> : null}
        </section>

        <section className="stack-sm" aria-label={t.landing.footer.legalTitle}>
          <p className="kicker">{t.landing.footer.legalTitle}</p>
          <div className="footer-links">
            <Link href={`/${locale}/legal/terms`}>{t.common.terms}</Link>
            <Link href={`/${locale}/legal/privacy`}>{t.common.privacy}</Link>
            <Link href={`/${locale}/legal/authorisation`}>{t.common.authorisation}</Link>
            <Link href={`/${locale}/resources`}>{t.resources.linkLabel}</Link>
          </div>
        </section>

        <section className="stack-sm" aria-label={t.landing.footer.clientAccessTitle}>
          <p className="kicker">{t.landing.footer.clientAccessTitle}</p>
          <div className="footer-links">
            <Link href={`/${locale}/track`}>{t.nav.track}</Link>
            <Link href={`/${locale}/order/upload`}>{t.nav.upload}</Link>
            <Link href={`/${locale}/samples`}>{t.resources.samplesLinkLabel}</Link>
          </div>
        </section>

        <section className="stack-sm" aria-label={locale === 'zh' ? '主要服务' : 'Primary services'}>
          <p className="kicker">{locale === 'zh' ? '主要服务' : 'Primary services'}</p>
          <div className="footer-links">
            <Link href={`/${locale}/services`}>{locale === 'zh' ? '服务总页' : 'Services overview'}</Link>
            <Link href={`/${locale}/apostille-australia`}>{locale === 'zh' ? '澳洲海牙认证' : 'Apostille Australia'}</Link>
            <Link href={`/${locale}/consular-legalisation-australia`}>{locale === 'zh' ? '领馆认证' : 'Consular legalisation'}</Link>
            <Link href={`/${locale}/document-authentication-sydney`}>{locale === 'zh' ? '文件认证协调' : 'Document authentication Sydney'}</Link>
          </div>
        </section>

        <section className="stack-sm" aria-label={locale === 'zh' ? '主要国家页' : 'Priority destination pages'}>
          <p className="kicker">{locale === 'zh' ? '主要国家页' : 'Priority destination pages'}</p>
          <div className="footer-links">
            <Link href={`/${locale}/used-in/china`}>{locale === 'zh' ? '用于中国' : 'Used in China'}</Link>
            <Link href={`/${locale}/used-in/canada`}>{locale === 'zh' ? '用于加拿大' : 'Used in Canada'}</Link>
            <Link href={`/${locale}/used-in/singapore`}>{locale === 'zh' ? '用于新加坡' : 'Used in Singapore'}</Link>
            <Link href={`/${locale}/used-in/united-states`}>{locale === 'zh' ? '用于美国' : 'Used in United States'}</Link>
            <Link href={`/${locale}/used-in/united-kingdom`}>{locale === 'zh' ? '用于英国' : 'Used in United Kingdom'}</Link>
            <Link href={`/${locale}/used-in/new-zealand`}>{locale === 'zh' ? '用于新西兰' : 'Used in New Zealand'}</Link>
          </div>
        </section>
      </div>
      <p className="small-text" style={{ marginTop: '1rem' }}>{copyright}</p>
    </footer>
  );
}
