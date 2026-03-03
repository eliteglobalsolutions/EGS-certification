import type { AppCopy } from '@/lib/i18n/dictionaries';

export function InstitutionalStrip({ t }: { t: AppCopy }) {
  return (
    <section className="ui-section surface-0 institutional-strip" aria-label={t.landing.institutionalStrip.title}>
      <div className="page-header institutional-strip-header">
        <div>
          <p className="kicker">{t.landing.institutionalStrip.kicker}</p>
          <h2>{t.landing.institutionalStrip.title}</h2>
          <p className="small-text">{t.landing.institutionalStrip.subtitle}</p>
        </div>
      </div>
      <div className="institutional-strip-grid">
        {t.landing.institutionalStrip.items.map((item) => (
          <p className="institutional-pill" key={item}>
            {item}
          </p>
        ))}
      </div>
    </section>
  );
}
