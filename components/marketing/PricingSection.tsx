import { Button } from '@/components/ui/Button';
import type { AppCopy } from '@/lib/i18n/dictionaries';

export function PricingSection({ locale, t }: { locale: string; t: AppCopy }) {
  return (
    <section id="pricing" className="ui-section surface-1" aria-labelledby="pricing-heading">
      <div className="page-header">
        <div>
          <p className="kicker">{t.landing.pricing.kicker}</p>
          <h2 id="pricing-heading">{t.landing.pricing.title}</h2>
          <p className="small-text">{t.landing.pricing.confirmationLine}</p>
        </div>
      </div>

      <div className="pricing-tier-grid">
        {t.landing.pricing.tiers.map((tier) => (
          <article className="pricing-tier-card card-sub stack-sm" key={tier.name}>
            <p className="kicker">{tier.name}</p>
            <p className="pricing-price">{tier.price}</p>
            <p className="small-text">{tier.note}</p>
          </article>
        ))}
      </div>

      <article className="pricing-addon-card pricing-addon-wrap card-sub stack-sm">
        <h3>{t.landing.pricing.addOnsTitle}</h3>
        <ul className="list-plain compact-list pricing-addon-list">
          {t.landing.pricing.addOns.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="small-text">{t.landing.pricing.disclaimer}</p>
        <div className="actions">
          <Button href={`/${locale}/order/new`} variant="primary">
            {t.landing.pricing.cta}
          </Button>
        </div>
      </article>
    </section>
  );
}
