import Link from 'next/link';
import type { Guide } from '@/lib/guides';
import { getGuideCopy } from '@/lib/guides';
import { localizedPath } from '@/lib/i18n/locale';
import { buildPrefillHref } from '@/lib/prefill';

export function GuideConversionSection({
  locale,
  guide,
}: {
  locale: 'en' | 'zh';
  guide: Guide;
}) {
  const prepareItems = guide.conversion.prepareBeforeIntake.map((entry) => getGuideCopy(locale, entry));
  const intakeHref = guide.prefill
    ? buildPrefillHref(locale, '/intake', {
        locale,
        issuingSlug: guide.prefill.issuingSlug,
        destinationSlug: guide.prefill.destinationSlug,
        documentSlug: guide.prefill.documentSlug,
      })
    : localizedPath(locale, '/intake');

  return (
    <section className="guide-conversion-section section-card stack-md" aria-labelledby="guide-conversion-heading">
      <div className="stack-sm">
        <p className="kicker">{locale === 'zh' ? '下一步' : 'Next step'}</p>
        <h2 id="guide-conversion-heading">
          {locale === 'zh' ? '在阅读之后，把判断推进到 route check 或 intake' : 'Move from reading into route check or intake'}
        </h2>
      </div>

      <div className="guide-conversion-grid">
        <div className="stack-sm">
          <h3>{locale === 'zh' ? 'Typical next step' : 'Typical next step'}</h3>
          <p className="small-text">{getGuideCopy(locale, guide.conversion.typicalNextStep)}</p>
        </div>

        <div className="stack-sm">
          <h3>{locale === 'zh' ? 'What to prepare before intake' : 'What to prepare before intake'}</h3>
          <ul className="samples-bullet-list">
            {prepareItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="stack-sm">
        <h3>{locale === 'zh' ? 'Route uncertainty note' : 'Route uncertainty note'}</h3>
        <p className="small-text">{getGuideCopy(locale, guide.conversion.routeUncertaintyNote)}</p>
      </div>

      <div className="actions">
        <Link className="btn btn-secondary" href={`${localizedPath(locale)}#route-checker`}>
          {locale === 'zh' ? 'Check My Route' : 'Check My Route'}
        </Link>
        <Link className="btn btn-primary" href={intakeHref}>
          {locale === 'zh' ? 'Begin Intake' : 'Begin Intake'}
        </Link>
      </div>
    </section>
  );
}
