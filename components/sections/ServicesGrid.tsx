import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import type { AppCopy } from '@/lib/i18n/dictionaries';

export function ServicesGrid({ locale, t }: { locale: string; t: AppCopy }) {
  return (
    <Card>
      <div className="stack-md">
        <p className="kicker">{t.home.servicesTitle}</p>
        <div className="services-grid">
          {t.home.services.map((service) => (
            <article className="stack-sm" key={service.title}>
              <h3>{service.title}</h3>
              <p className="small-text">{service.body}</p>
            </article>
          ))}
        </div>
        <div className="split-line stack-sm">
          <p className="kicker">{t.home.quickTypesTitle}</p>
          <div className="actions">
            {t.home.quickTypes.map((item) => (
              <span className="status-badge status-neutral" key={item}>
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="split-line">
          <Link className="btn btn-ghost" href={`/${locale}/services`}>
            {t.nav.services}
          </Link>
        </div>
      </div>
    </Card>
  );
}
