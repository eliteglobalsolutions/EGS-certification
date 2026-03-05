import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import type { AppCopy } from '@/lib/i18n/dictionaries';

export function Footer({ locale, t }: { locale: string; t: AppCopy }) {
  const year = new Date().getFullYear();
  const copyright =
    locale === 'zh'
      ? `© ${year} EGS Certification Pty Ltd. 版权所有。`
      : `© ${year} EGS Certification Pty Ltd. All rights reserved.`;

  return (
    <Card>
      <footer className="footer stack-sm">
        <p className="small-text">{t.home.footer.address}</p>
        <p className="small-text">{t.home.footer.phone}</p>
        <p className="small-text">{t.home.footer.hours}</p>
        <p className="small-text">{t.home.footer.email}</p>
        <div className="split-line stack-sm">
          <p className="kicker">{t.home.footer.legalSummary}</p>
          <p className="small-text">{t.home.footer.legalBody1}</p>
          <p className="small-text">{t.home.footer.legalBody2}</p>
          <p className="small-text">{t.home.footer.legalBody3}</p>
        </div>
        <Link className="small-text" href={`/${locale}/disclaimer`}>
          {t.home.footer.disclaimerLink}
        </Link>
        <p className="small-text">{copyright}</p>
      </footer>
    </Card>
  );
}
