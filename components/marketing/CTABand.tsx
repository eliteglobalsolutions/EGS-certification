import Link from 'next/link';
import type { AppCopy } from '@/lib/i18n/dictionaries';
import { localizedPath } from '@/lib/i18n/locale';

export function CTABand({ locale, t }: { locale: string; t: AppCopy }) {
  const cta = t.landing.ctaBand;
  const titleLines = cta.title.split('\n');

  return (
    <div className="cta-band">
      <div className="cta-band-inner">
        <div className="cta-band-copy">
          <div className="cta-band-label">{cta.label}</div>
          <div className="cta-band-title">
            {titleLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < titleLines.length - 1 && <br />}
              </span>
            ))}
          </div>
        </div>
        <div className="cta-band-actions">
          <Link
            href={localizedPath(locale as 'en' | 'zh', '/intake')}
            className="btn-cta-white"
          >
            {cta.ctaPrimary} →
          </Link>
          <Link
            href="#route-check"
            className="btn-cta-outline"
          >
            {cta.ctaSecondary}
          </Link>
        </div>
      </div>
    </div>
  );
}
