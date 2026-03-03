import Link from 'next/link';
import type { AppCopy } from '@/lib/i18n/dictionaries';

export function ComplianceStrip({ locale, t }: { locale: string; t: AppCopy }) {
  return (
    <section className="compliance-strip" aria-label={t.landing.compliance.title}>
      <div className="compliance-strip-inner">
        <ul className="compliance-points">
          {t.landing.compliance.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <nav className="compliance-links" aria-label="Legal links">
          <Link href={`/${locale}/legal/terms`}>{t.common.terms}</Link>
          <Link href={`/${locale}/legal/privacy`}>{t.common.privacy}</Link>
          <Link href={`/${locale}/legal/authorisation`}>{t.common.authorisation}</Link>
        </nav>
      </div>
    </section>
  );
}
