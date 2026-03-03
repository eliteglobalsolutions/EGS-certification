import Link from 'next/link';
import type { AppCopy, Locale } from '@/lib/i18n/dictionaries';

export function ServiceLanes({ locale, t }: { locale: Locale; t: AppCopy }) {
  return (
    <section className="ui-section surface-0" aria-labelledby="service-lanes-heading">
      <div className="page-header">
        <div>
          <p className="kicker">{t.landing.lanes.kicker}</p>
          <h2 id="service-lanes-heading">{t.landing.lanes.title}</h2>
          <p className="small-text">{t.landing.lanes.subtitle}</p>
        </div>
      </div>

      <div className="grid-2">
        {t.landing.lanes.items.map((lane) => (
          <article className="section-card stack-md" key={lane.title}>
            <div className="stack-sm">
              <h3>{lane.title}</h3>
              <p className="small-text">{lane.body}</p>
            </div>
            <div className="stack-sm">
              <p className="kicker">{t.landing.lanes.coversTitle}</p>
              <ul className="list-plain">
                {lane.covers.map((item) => (
                  <li className="small-text" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="stack-sm">
              <p className="kicker">{t.landing.lanes.requiredTitle}</p>
              <ul className="list-plain">
                {lane.requiredItems.map((item) => (
                  <li className="small-text" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid-2">
              <div className="state-block stack-sm">
                <p className="kicker">{t.landing.lanes.standardTitle}</p>
                <p className="small-text">{lane.standardEta}</p>
              </div>
              <div className="state-block stack-sm">
                <p className="kicker">{t.landing.lanes.expressTitle}</p>
                <p className="small-text">{lane.expressEta}</p>
              </div>
            </div>
            <div className="actions">
              <Link className="btn btn-primary" href={`/${locale}#route-checker`}>
                {t.landing.lanes.ctaCheckRoute}
              </Link>
              <Link className="btn btn-secondary" href={`/${locale}/intake`}>
                {t.landing.lanes.ctaIntake}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
