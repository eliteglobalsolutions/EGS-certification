import type { AppCopy } from '@/lib/i18n/dictionaries';

export function WhyEGS({ t }: { t: AppCopy }) {
  return (
    <section className="ui-section surface-1 why-egs-section" aria-labelledby="why-egs-heading">
      <div className="page-header">
        <div>
          <p className="kicker">{t.landing.proof.kicker}</p>
          <h2 id="why-egs-heading">{t.landing.proof.title}</h2>
          <p className="small-text">{t.landing.proof.subtitle}</p>
        </div>
      </div>
      <div className="grid-3">
        {t.landing.proof.items.map((item) => (
          <article className="section-card stack-sm" key={item.title}>
            <p className="kicker">{item.kicker}</p>
            <h3>{item.title}</h3>
            <p className="small-text">{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
