import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { SiteNav } from '@/components/marketing/SiteNav';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { RoutesMiniSearch } from '@/components/marketing/RoutesMiniSearch';
import { resolveLocale } from '@/lib/i18n/locale';
import { getCopy } from '@/lib/i18n/dictionaries';
import { priorityRoutes, getCopyText } from '@/lib/priority-routes-data';
import { buildPrefillHref } from '@/lib/prefill';
import {
  destinationCountryEntries,
  documentTypeEntries,
  getEntryText,
  issuingCountryEntries,
} from '@/lib/search-entry-data';
import {
  documentPriorityRoutes,
  getCopyText as getDocumentCopyText,
} from '@/lib/document-priority-routes-data';

export default async function RoutesOverviewPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  const t = getCopy(locale);

  const secondaryLinks = [
    ...issuingCountryEntries.slice(0, 6).map((entry) => ({
      href: `/${locale}/issued-in/${entry.slug}`,
      label: `${locale === 'zh' ? '签发地' : 'Issued in'} · ${getEntryText(entry.name, locale)}`,
      intakeHref: buildPrefillHref(locale, '/intake', { locale, issuingSlug: entry.slug }),
    })),
    ...destinationCountryEntries.slice(0, 6).map((entry) => ({
      href: `/${locale}/used-in/${entry.slug}`,
      label: `${locale === 'zh' ? '目的地' : 'Used in'} · ${getEntryText(entry.name, locale)}`,
      intakeHref: buildPrefillHref(locale, '/intake', { locale, destinationSlug: entry.slug }),
    })),
    ...documentTypeEntries.slice(0, 6).map((entry) => ({
      href: `/${locale}/documents/${entry.slug}`,
      label: `${locale === 'zh' ? '文件' : 'Document'} · ${getEntryText(entry.name, locale)}`,
      intakeHref: buildPrefillHref(locale, '/intake', { locale, documentSlug: entry.slug }),
    })),
  ];

  const miniSearchItems = [
    ...priorityRoutes.map((route) => ({
      href: `/${locale}/routes/${route.slug}`,
      label: getCopyText(route.title, locale),
      kind: 'route' as const,
      description: getCopyText(route.subheading, locale),
    })),
    ...documentPriorityRoutes.map((route) => ({
      href: `/${locale}/routes/${route.slug}`,
      label: getDocumentCopyText(route.title, locale),
      kind: 'route' as const,
      description: getDocumentCopyText(route.subheading, locale),
    })),
    ...issuingCountryEntries.map((entry) => ({
      href: `/${locale}/issued-in/${entry.slug}`,
      label: getEntryText(entry.name, locale),
      kind: 'country' as const,
      description: getEntryText(entry.intro, locale),
    })),
    ...destinationCountryEntries.map((entry) => ({
      href: `/${locale}/used-in/${entry.slug}`,
      label: getEntryText(entry.name, locale),
      kind: 'destination' as const,
      description: getEntryText(entry.intro, locale),
    })),
    ...documentTypeEntries.map((entry) => ({
      href: `/${locale}/documents/${entry.slug}`,
      label: getEntryText(entry.name, locale),
      kind: 'document' as const,
      description: getEntryText(entry.intro, locale),
    })),
  ];

  return (
    <Container>
      <Section>
        <SiteNav locale={locale} t={t} />

        <Card>
          <div className="stack-md">
            <p className="kicker">{locale === 'zh' ? '路线总览' : 'Route overview'}</p>
            <h1>{locale === 'zh' ? 'Main Routes 与 Secondary Routes' : 'Main Routes and Secondary Routes'}</h1>
            <p className="body-text">
              {locale === 'zh'
                ? '这里集中放主营路线和副线入口。主线优先承接核心搜索流量，副线继续补充签发地、目的地和文件类型搜索页。'
                : 'This page groups the core commercial routes and the supporting secondary route-entry pages. Main routes take priority; secondary routes expand issuing-country, destination-country, and document-type coverage.'}
            </p>
          </div>
        </Card>

        <RoutesMiniSearch locale={locale} items={miniSearchItems} />

        <Card muted>
          <div className="stack-md">
            <div className="page-header">
              <div className="stack-sm">
                <p className="kicker">Main Routes</p>
                <h2>{locale === 'zh' ? '主线' : 'Primary commercial routes'}</h2>
              </div>
            </div>
            <div className="search-entry-grid">
              {priorityRoutes.map((route) => (
                <article className="search-entry-card" key={route.slug}>
                  <div className="stack-sm">
                    <h3>{getCopyText(route.title, locale)}</h3>
                    <p className="small-text">{getCopyText(route.subheading, locale)}</p>
                    <p className="small-text">{getCopyText(route.routeType, locale)}</p>
                  </div>
                  <div className="actions">
                    <Link className="btn btn-ghost" href={`/${locale}/routes/${route.slug}`}>
                      {locale === 'zh' ? 'View route' : 'View route'}
                    </Link>
                    <Link
                      className="search-entry-intake-link"
                      href={buildPrefillHref(locale, '/intake', {
                        locale,
                        issuingSlug: route.issuingCountrySlug,
                        destinationSlug: route.destinationCountrySlug,
                      })}
                    >
                      {locale === 'zh' ? 'Start intake' : 'Start intake'}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Card>

        <Card muted>
          <div className="stack-md">
            <div className="page-header">
              <div className="stack-sm">
                <p className="kicker">Document-specific Routes</p>
                <h2>{locale === 'zh' ? '文件级主线页面' : 'Document-specific commercial pages'}</h2>
              </div>
            </div>
            <div className="search-entry-grid">
              {documentPriorityRoutes.map((route) => (
                <article className="search-entry-card" key={route.slug}>
                  <div className="stack-sm">
                    <h3>{getDocumentCopyText(route.title, locale)}</h3>
                    <p className="small-text">{getDocumentCopyText(route.subheading, locale)}</p>
                    <p className="small-text">{getDocumentCopyText(route.whoUsesThis, locale)}</p>
                  </div>
                  <div className="actions">
                    <Link className="btn btn-ghost" href={`/${locale}/routes/${route.slug}`}>
                      {locale === 'zh' ? 'View route' : 'View route'}
                    </Link>
                    <Link
                      className="search-entry-intake-link"
                      href={buildPrefillHref(locale, '/intake', {
                        locale,
                        documentSlug: route.documentSlug,
                      })}
                    >
                      {locale === 'zh' ? 'Start intake' : 'Start intake'}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Card>

        <Card>
          <div className="stack-md">
            <div className="page-header">
              <div className="stack-sm">
                <p className="kicker">Secondary Routes</p>
                <h2>{locale === 'zh' ? '副线' : 'Supporting route-entry pages'}</h2>
              </div>
            </div>
            <div className="search-entry-grid">
              {secondaryLinks.map((item) => (
                <article className="search-entry-card" key={item.href}>
                  <div className="stack-sm">
                    <h3>{item.label}</h3>
                    <p className="small-text">
                      {locale === 'zh'
                        ? '作为副线入口页，继续承接国家词、目的地词和文件词搜索。'
                        : 'Supporting entry page for country, destination, and document-type search traffic.'}
                    </p>
                  </div>
                  <div className="actions">
                    <Link className="btn btn-ghost" href={item.href}>
                      {locale === 'zh' ? 'View route' : 'View route'}
                    </Link>
                    <Link className="search-entry-intake-link" href={item.intakeHref}>
                      {locale === 'zh' ? 'Start intake' : 'Start intake'}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Card>

        <SiteFooter locale={locale} t={t} />
      </Section>
    </Container>
  );
}
