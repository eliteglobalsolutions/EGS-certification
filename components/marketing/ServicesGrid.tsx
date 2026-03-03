import Link from 'next/link';
import { FileCheck2, Landmark, Languages, ShieldCheck } from 'lucide-react';
import type { AppCopy } from '@/lib/i18n/dictionaries';

const serviceIcons = [FileCheck2, Landmark, Languages, ShieldCheck] as const;

export function ServicesGrid({ locale, t }: { locale: string; t: AppCopy }) {
  return (
    <section id="services" className="ui-section surface-1" aria-labelledby="services-heading">
      <div className="page-header">
        <div>
          <p className="kicker">{t.landing.services.kicker}</p>
          <h2 id="services-heading">{t.landing.services.title}</h2>
        </div>
      </div>
      <div className="marketing-grid-4">
        {t.landing.services.items.map((service, index) => {
          const Icon = serviceIcons[index] ?? ShieldCheck;
          return (
            <article className="service-card stack-sm" key={service.title}>
              <span className="service-icon" aria-hidden="true">
                <Icon size={15} strokeWidth={1.7} />
              </span>
              <h3>{service.title}</h3>
              <p className="service-meta">{service.meta}</p>
              <p className="small-text">{service.body}</p>
              <Link className="inline-link" href={`/${locale}/services`}>
                {t.landing.services.linkLabel}
              </Link>
            </article>
          );
        })}
      </div>
      <p className="small-text">{t.landing.services.disclaimer}</p>
    </section>
  );
}
