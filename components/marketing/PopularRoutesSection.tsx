import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { Locale } from '@/lib/i18n/dictionaries';
import type { PriorityRoute } from '@/lib/priority-routes-data';
import { getCopyText } from '@/lib/priority-routes-data';
import { buildPrefillHref } from '@/lib/prefill';

export function PopularRoutesSection({
  locale,
  routes,
}: {
  locale: Locale;
  routes: PriorityRoute[];
}) {
  return (
    <Card muted>
      <div className="stack-md">
        <div className="page-header">
          <div className="stack-sm">
            <p className="kicker">{locale === 'zh' ? '搜索入口路线' : 'Search-entry routes'}</p>
            <h2>{locale === 'zh' ? '主营路线入口' : 'Core route entry pages'}</h2>
            <p className="small-text">
              {locale === 'zh'
                ? '首页只保留这一组主营路线入口，用来承接搜索流量并继续引导到具体路线页和受理页。'
                : 'Keep one focused route block on the homepage to catch search traffic and move users into the relevant route page and intake.'}
            </p>
          </div>
        </div>
        <div className="search-entry-grid">
          {routes.map((route) => (
            <article className="search-entry-card" key={route.slug}>
              <div className="stack-sm">
                <h3>{getCopyText(route.title, locale)}</h3>
                <p className="small-text">{getCopyText(route.subheading, locale)}</p>
                <p className="small-text">{getCopyText(route.routeType, locale)}</p>
              </div>
              <div className="actions">
                <Button href={`/${locale}/routes/${route.slug}`} variant="ghost">
                  {locale === 'zh' ? '查看路线页' : 'Open route page'}
                </Button>
                <Link
                  className="search-entry-intake-link"
                  href={buildPrefillHref(locale, '/intake', {
                    locale,
                    issuingSlug: route.issuingCountrySlug,
                    destinationSlug: route.destinationCountrySlug,
                  })}
                >
                  {locale === 'zh' ? '直接受理' : 'Go to intake'}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Card>
  );
}
