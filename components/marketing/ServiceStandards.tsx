import Link from 'next/link';
import type { AppCopy } from '@/lib/i18n/dictionaries';
import { localizedPath } from '@/lib/i18n/locale';

export function ServiceStandards({ locale, t }: { locale: string; t: AppCopy }) {
  const s = t.landing.serviceStandards;

  return (
    <section id="services" className="service-standards-section" aria-labelledby="standards-heading">
      <div className="page-container">
        <div className="sec-head">
          <p className="sec-kicker">{s.kicker}</p>
          <h2 id="standards-heading" className="sec-h">{s.title}</h2>
          <p className="sec-sub">{s.subtitle}</p>
        </div>

        <div className="standards-grid">
          {s.items.map((item) => (
            <div className="std-cell" key={item.num}>
              <div className="std-num">{item.num}</div>
              <div className="std-title">{item.title}</div>
              <p className="std-desc">{item.body}</p>
            </div>
          ))}
        </div>

        <div className="standards-foot">
          {s.enquiryNote}&nbsp;—&nbsp;
          <Link href={localizedPath(locale as 'en' | 'zh', '/intake')}>{s.enquiryCta} →</Link>
        </div>
      </div>
    </section>
  );
}
