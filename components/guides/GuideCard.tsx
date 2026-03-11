import Link from 'next/link';
import type { Guide } from '@/lib/guides';
import { getGuideCopy } from '@/lib/guides';

export function GuideCard({
  guide,
  locale,
  compact = false,
}: {
  guide: Guide;
  locale: 'en' | 'zh';
  compact?: boolean;
}) {
  const badge =
    guide.guideType === 'university-my-equals'
      ? 'University guide'
      : guide.guideType === 'overseas-to-australia'
        ? 'Inbound guide'
        : 'Document guide';
  const tags = [
    guide.issuingCountry,
    guide.destinationCountry,
    guide.routeCategory === 'academic'
      ? 'Academic'
      : guide.routeCategory === 'company'
        ? 'Company'
        : guide.routeCategory === 'police'
          ? 'Police'
          : guide.routeCategory === 'cross-border'
            ? 'Cross-border'
            : 'Civil',
    guide.guideType === 'university-my-equals' ? 'My eQuals' : guide.documentTypes[0],
  ].filter(Boolean);

  return (
    <article className={`guide-card ${compact ? 'guide-card-compact' : ''}`}>
      <div className="guide-card-body">
        <div className="guide-card-head">
          <span className="guide-card-badge">{badge}</span>
        </div>
        <h3 className="guide-card-title">
          <Link href={`/${locale}/guides/${guide.slug}`}>{getGuideCopy(locale, guide.title)}</Link>
        </h3>
        {!compact ? <p className="small-text guide-card-summary">{getGuideCopy(locale, guide.excerpt)}</p> : null}
        <ul className="guide-card-tags" aria-label={locale === 'zh' ? '指南标签' : 'Guide tags'}>
          {tags.slice(0, compact ? 3 : 4).map((tag) => (
            <li className="guide-card-tag" key={tag}>
              <span>{tag}</span>
            </li>
          ))}
        </ul>
        <div className="guide-card-actions" role="group" aria-label={locale === 'zh' ? '指南操作' : 'Guide actions'}>
          <Link className="guide-card-action-primary" href={`/${locale}/guides/${guide.slug}`}>
            {locale === 'zh' ? '打开指南' : 'Open guide'}
          </Link>
          <Link className="guide-card-action-secondary" href={`/${locale}/intake`}>
            {locale === 'zh' ? '开始受理' : 'Begin intake'}
          </Link>
        </div>
      </div>
    </article>
  );
}
