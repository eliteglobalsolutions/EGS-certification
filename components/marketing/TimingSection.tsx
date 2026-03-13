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
            <div className="tbl-wrap">
              <table className="tbl">
                <thead>
                  <tr>
                    {timing.tableHeaders.map((header) => (
                      <th key={header}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timing.rows.map((row) => (
                    <tr key={row.country}>
                      <td>{row.country}</td>
                      <td>{row.timing}</td>
                      <td><span className="route-tag">{row.tag}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
