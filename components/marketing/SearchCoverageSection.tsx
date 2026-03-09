import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import type { Locale } from '@/lib/i18n/dictionaries';
import type { PriorityRoute } from '@/lib/priority-routes-data';
import { getCopyText } from '@/lib/priority-routes-data';

export function SearchCoverageSection({
  locale,
  routes,
}: {
  locale: Locale;
  routes: PriorityRoute[];
}) {
  return (
    <Card>
      <div className="stack-md">
        <div className="page-header">
          <div className="stack-sm">
            <p className="kicker">{locale === 'zh' ? '搜索覆盖矩阵' : 'Search coverage matrix'}</p>
            <h2>{locale === 'zh' ? '主营国家与高价值路径覆盖' : 'Core country and route coverage'}</h2>
            <p className="small-text">
              {locale === 'zh'
                ? '这部分不是堆词，而是把主营国家、真实路线和常见文件意图拆成可索引的内容入口。'
                : 'This is not keyword stuffing. It turns your core countries, real routes, and common document intents into indexable entry points.'}
            </p>
          </div>
        </div>
        <div className="search-entry-grid">
          {routes.map((route) => (
            <article className="search-entry-card" key={route.slug}>
              <div className="stack-sm">
                <h3>{getCopyText(route.title, locale)}</h3>
                <p className="small-text">{getCopyText(route.serviceScope, locale)}</p>
                <ul className="list-plain">
                  {route.searchIntents.map((item) => (
                    <li className="small-text" key={getCopyText(item, locale)}>
                      {getCopyText(item, locale)}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="actions">
                <Link className="btn btn-ghost" href={`/${locale}/routes/${route.slug}`}>
                  {locale === 'zh' ? '查看路线页' : 'Open route page'}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Card>
  );
}
