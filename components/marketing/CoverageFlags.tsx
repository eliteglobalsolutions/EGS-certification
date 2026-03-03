import type { AppCopy } from '@/lib/i18n/dictionaries';
import { CoverageRail } from './CoverageRail';
import Link from 'next/link';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

export async function CoverageFlags({ locale, t }: { locale: 'en' | 'zh'; t: AppCopy }) {
  let sampleItems: Array<{ title: string; country: string; thumb_path?: string }> = [];
  try {
    const indexPath = path.join(process.cwd(), 'public', 'samples', 'index.json');
    const raw = await readFile(indexPath, 'utf8');
    const parsed = JSON.parse(raw) as Array<{ title: string; country: string; thumb_path?: string }>;
    const byCountry = new Map<string, Array<{ title: string; country: string; thumb_path?: string }>>();
    for (const item of parsed) {
      if (!byCountry.has(item.country)) byCountry.set(item.country, []);
      byCountry.get(item.country)!.push(item);
    }
    const buckets = Array.from(byCountry.values());
    const mixed: Array<{ title: string; country: string; thumb_path?: string }> = [];
    let idx = 0;
    while (mixed.length < 12) {
      let added = false;
      for (const bucket of buckets) {
        if (bucket[idx]) {
          mixed.push(bucket[idx]);
          added = true;
          if (mixed.length >= 12) break;
        }
      }
      if (!added) break;
      idx += 1;
    }
    sampleItems = mixed;
  } catch {
    sampleItems = [];
  }

  return (
    <section className="ui-section surface-1 coverage-section" aria-labelledby="coverage-heading">
      <div className="page-header">
        <div>
          <p className="kicker">{t.landing.coverage.kicker}</p>
          <h2 id="coverage-heading">{t.landing.coverage.title}</h2>
          <p className="small-text">{t.landing.coverage.subtitle}</p>
        </div>
      </div>
      <div className="sample-showcase stack-sm">
        <div className="sample-showcase-head">
          <p className="small-text showcase-block-title">{locale === 'zh' ? '样本库' : 'Sample library'}</p>
          <Link className="btn btn-secondary" href={`/${locale}/samples`}>
            {t.resources.samplesLinkLabel}
          </Link>
        </div>

        <div className="stack-sm showcase-merged">
          <CoverageRail items={t.landing.coverage.items} />
          <div className="sample-rail">
            {sampleItems.map((item, index) => (
              <Link className="sample-rail-card stack-sm" href={`/${locale}/samples`} key={`${item.country}-${item.title}-${index}`}>
                <div className="sample-rail-preview">
                  {item.thumb_path ? <img src={item.thumb_path} alt={item.title} loading="lazy" /> : <span className="sample-file-icon">SAMPLE</span>}
                </div>
                <p className="sample-meta">
                  <strong>{item.title}</strong>
                </p>
                <p className="small-text">{item.country}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
