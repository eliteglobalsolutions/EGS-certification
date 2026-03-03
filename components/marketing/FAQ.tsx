import type { AppCopy } from '@/lib/i18n/dictionaries';

export function MarketingFAQ({ t }: { t: AppCopy }) {
  return (
    <section id="faq" className="ui-section surface-1" aria-labelledby="faq-heading">
      <div className="page-header">
        <div>
          <p className="kicker">{t.landing.faq.kicker}</p>
          <h2 id="faq-heading">{t.landing.faq.title}</h2>
        </div>
      </div>
      <div className="stack-sm">
        {t.landing.faq.items.map((item) => (
          <details className="faq-item" key={item.q}>
            <summary>
              <span>{item.q}</span>
              <span className="faq-chevron" aria-hidden="true">▾</span>
            </summary>
            <p className="small-text">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
