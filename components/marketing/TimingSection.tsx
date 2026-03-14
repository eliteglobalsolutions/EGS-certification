import type { AppCopy } from '@/lib/i18n/dictionaries';

export function TimingSection({ t }: { t: AppCopy }) {
  const timing = t.landing.timing;

  return (
    <section className="timing-section" aria-labelledby="timing-heading">
      <div className="page-container">
        <div className="sec-head">
          <p className="sec-kicker">{timing.kicker}</p>
          <h2 id="timing-heading" className="sec-h">{timing.title}</h2>
          <p className="sec-sub">{timing.subtitle}</p>
        </div>

        <div className="timing-layout">
          <div>
            <div className="timing-cards" role="list" aria-label={timing.title}>
              {timing.rows.map((row) => (
                <article className="timing-card" key={row.country} role="listitem">
                  <div className="timing-card-main">
                    <p className="timing-card-country">{row.country}</p>
                    <p className="timing-card-window">{row.timing}</p>
                  </div>
                  <div className="timing-card-meta">
                    <span className="timing-card-label">{timing.tableHeaders[1]}</span>
                    <span className="route-tag">{row.tag}</span>
                  </div>
                </article>
              ))}
            </div>
            <div className="timing-disclaimer">{timing.disclaimer}</div>
          </div>

          <div className="timing-aside">
            {timing.asideCards.map((card) => (
              <div className="aside-card" key={card.title}>
                <div className="aside-card-h">{card.title}</div>
                <p>{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
