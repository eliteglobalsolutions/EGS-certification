import Link from 'next/link';
import type { AppCopy } from '@/lib/i18n/dictionaries';

export function DestinationsGrid({ locale, t }: { locale: string; t: AppCopy }) {
  const dest = t.landing.destinations;

  return (
    <section className="destinations-section" aria-labelledby="destinations-heading">
      <div className="page-container">
        <div className="sec-head">
          <p className="sec-kicker">{dest.kicker}</p>
          <h2 id="destinations-heading" className="sec-h">{dest.title}</h2>
          <p className="sec-sub">{dest.subtitle}</p>
        </div>

        <div className="dest-grid">
          {dest.items.map((item) => (
            <Link
              key={item.slug}
              href={`/${locale}/used-in/${item.slug}`}
              className="dest-cell"
            >
              <span className="dest-arrow">→</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://flagcdn.com/w40/${item.iso.toLowerCase()}.png`}
                alt={item.name}
                className="dest-flag-img"
                width={28}
                height={19}
                loading="lazy"
              />
              <div className="dest-iso">{item.iso}</div>
              <div className="dest-name">{item.name}</div>
              <div className="dest-route">{item.route}</div>
            </Link>
          ))}
          <Link href={`/${locale}/routes`} className="dest-cell more">
            <span className="dest-arrow">→</span>
            <div className="dest-flag-img flag-gl"></div>
            <div className="dest-iso" style={{ color: 'rgba(255,255,255,.35)' }}>120+</div>
            <div className="dest-name">{dest.viewAll}</div>
            <div className="dest-route">{dest.viewAllSub}</div>
          </Link>
        </div>
      </div>
    </section>
  );
}
