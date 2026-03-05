import Link from 'next/link';
import type { AppCopy } from '@/lib/i18n/dictionaries';

export function SiteFooter({ locale, t }: { locale: string; t: AppCopy }) {
  const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL;
  const year = new Date().getFullYear();
  const copyright =
    locale === 'zh'
      ? `© ${year} ELITE GLOBAL SOLUTIONS PTY LTD. 版权所有。`
      : `© ${year} ELITE GLOBAL SOLUTIONS PTY LTD. All rights reserved.`;

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
      </div>
      <p className="small-text" style={{ marginTop: '1rem' }}>{copyright}</p>
    </footer>
  );
}
