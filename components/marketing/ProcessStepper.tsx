import Link from 'next/link';
import type { AppCopy } from '@/lib/i18n/dictionaries';

export function ProcessStepper({ locale, t }: { locale: string; t: AppCopy }) {
  const stepLinks = [
    `/${locale}/intake`,
    `/${locale}/intake`,
    `/${locale}/intake`,
    `/${locale}/track`,
    `/${locale}/track`,
  ];

  return (
    <section id="process" className="ui-section surface-0 process-section" aria-labelledby="process-heading">
      <div className="page-header">
        <div>
          <p className="kicker">{t.landing.process.kicker}</p>
          <h2 id="process-heading">{t.landing.process.title}</h2>
          <p className="small-text">{t.landing.process.timingLine}</p>
        </div>
      </div>

      <ol className="process-timeline" aria-label={t.landing.process.title}>
        {t.landing.process.steps.map((step, index) => (
          <li className="process-timeline-item" key={step.title}>
            <div className="process-index" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </div>
            <Link className="process-content process-link" href={stepLinks[index] || `/${locale}/intake`}>
              <h3>{step.title}</h3>
              <p className="small-text">{step.body}</p>
            </Link>
          </li>
        ))}
      </ol>

      <aside className="process-callout" aria-label={t.landing.process.calloutTitle}>
        <p className="kicker">{t.landing.process.calloutTitle}</p>
        <p className="small-text">{t.landing.process.calloutBody}</p>
      </aside>
    </section>
  );
}
