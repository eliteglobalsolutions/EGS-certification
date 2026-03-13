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

  const nums = ['01', '02', '03', '04', '05'];

  return (
    <section id="process" className="process-section" aria-labelledby="process-heading">
      <div className="page-container">
        <div className="sec-head">
          <p className="sec-kicker">{t.landing.process.kicker}</p>
          <h2 id="process-heading" className="sec-h">{t.landing.process.title}</h2>
          <p className="sec-sub">{t.landing.process.timingLine}</p>
        </div>

        <div className="process-row">
          {t.landing.process.steps.map((step, index) => (
            <Link
              key={step.title}
              href={stepLinks[index] || `/${locale}/intake`}
              className="p-step"
            >
              <div className="p-num">{nums[index]}</div>
              <div className="p-title">{step.title}</div>
              <div className="p-desc">{step.body}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
