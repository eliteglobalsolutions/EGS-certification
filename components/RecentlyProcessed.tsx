import Link from 'next/link';
import type { EnrichedSampleRecord } from '@/lib/sample-library';
import type { Locale } from '@/lib/i18n/dictionaries';
import { localizedPath } from '@/lib/i18n/locale';

function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function RecentlyProcessed({
  items,
  locale,
}: {
  items: EnrichedSampleRecord[];
  locale: Locale;
}) {
  if (!items.length) return null;

  return (
    <div className="recently-processed-section">
      <div className="recently-processed-header">
        <span className="kicker">
          {locale === 'zh' ? '最新处理文件' : 'Recently Processed'}
        </span>
        <p className="recently-processed-sub">
          {locale === 'zh'
            ? '以下为近期完成处理的真实文件样本（已打码）'
            : 'Redacted samples from recently completed document handling'}
        </p>
      </div>
      <div className="recently-processed-grid">
        {items.map((item) => (
          <Link
            key={item.slug}
            href={localizedPath(locale, `/samples/${item.slug}`)}
            className="recently-processed-card"
          >
            <div className="recently-processed-card-top">
              <span className="recently-processed-doc-type">{item.documentType}</span>
              <span className="recently-processed-badge">
                {locale === 'zh' ? '1个工作日' : '1 business day'}
              </span>
            </div>
            <strong className="recently-processed-title">{item.sampleTitle}</strong>
            <div className="recently-processed-meta">
              <span>{item.issuingCountryLabel}</span>
              {item.reviewed_at && (
                <span className="recently-processed-date">{formatDate(item.reviewed_at)}</span>
              )}
            </div>
            <p className="recently-processed-desc">{item.routeDescription}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
