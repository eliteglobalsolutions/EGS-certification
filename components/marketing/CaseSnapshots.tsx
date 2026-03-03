import type { AppCopy } from '@/lib/i18n/dictionaries';

export function CaseSnapshots({ t }: { t: AppCopy }) {
  return (
    <section className="ui-section surface-0" aria-labelledby="case-snapshots-heading">
      <div className="page-header">
        <div>
          <p className="kicker">{t.landing.caseSnapshots.kicker}</p>
          <h2 id="case-snapshots-heading">{t.landing.caseSnapshots.title}</h2>
          <p className="small-text">{t.landing.caseSnapshots.subtitle}</p>
        </div>
        <p className="small-text case-nodes-label">
          {t.landing.caseSnapshots.nodesLabel}: <strong>{t.landing.caseSnapshots.nodesValue}</strong>
        </p>
      </div>
      <div className="case-panorama">
        {t.landing.caseSnapshots.items.map((item) => (
          <article className="section-card card-sub stack-sm case-snapshot-card" key={`${item.issuing}-${item.destination}`}>
            <p className="small-text case-snapshot-issuing">{item.issuing}</p>
            <p className="small-text case-snapshot-destination">{item.destination}</p>
            <p className="small-text case-snapshot-route">{item.route}</p>
            <p className="small-text">{item.timeline}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
