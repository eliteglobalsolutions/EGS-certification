import { notFound, redirect } from 'next/navigation';
import { RoutePriorityPage } from '@/components/marketing/RoutePriorityPage';
import { resolveLocale } from '@/lib/i18n/locale';
import { buildPrefillHref } from '@/lib/prefill';
import { buildPageMetadata, siteUrl } from '@/lib/seo';
import { getEntryText, getSearchEntry } from '@/lib/search-entry-data';
import { getCopyText, getPriorityRoute, priorityRoutes } from '@/lib/priority-routes-data';
import {
  documentPriorityRoutes,
  getDocumentPriorityRoute,
  getCopyText as getDocumentCopyText,
  findDocumentRouteByParentAndDocument,
} from '@/lib/document-priority-routes-data';
import { getKnowledgeRoute, getKnowledgeRouteSlugs, getRouteCopy } from '@/lib/knowledge-routes';
import { getFaqBySlug } from '@/lib/knowledge-faqs';
import { getGuideBySlug, getGuideCopy } from '@/lib/guides';

function softenSubheading(text: string, locale: 'en' | 'zh') {
  if (locale === 'zh') {
    return text
      .replace(/^面向/, '')
      .replace(/的路线入口页。$/, '。')
      .replace(/的文件级路线页。$/, '。');
  }

  return text
    .replace(/^Route page for /, '')
    .replace(/^Document-specific route page for /, '')
    .replace(/\.$/, '');
}

function softenWhoUsesThis(text: string, locale: 'en' | 'zh') {
  if (locale === 'zh') {
    return text.replace(/^通常用于/, '常见于');
  }

  return text.replace(/^Usually used for /, 'Commonly needed for ');
}

function softenOfficialBaseline(text: string, locale: 'en' | 'zh') {
  if (locale === 'zh') {
    return text
      .replace(/^从官方路径看，/, '')
      .replace(/^从官方基线看，/, '');
  }

  return text
    .replace(/^Officially, /, '')
    .replace(/^On the official side, /, '');
}

function softenReviewText(text: string, locale: 'en' | 'zh') {
  if (locale === 'zh') {
    return text
      .replace(/^EGS 会先/, '通常会先')
      .replace(/^EGS 会/, '通常会')
      .replace(/^付款前，EGS 会先/, '正式确认前，通常会先')
      .replace(/^付款前，EGS 会/, '正式确认前，通常会');
  }

  return text
    .replace(/^EGS screens /, 'The first review usually covers ')
    .replace(/^EGS reviews /, 'The first review usually covers ')
    .replace(/^Before payment, EGS reviews /, 'Before anything is confirmed, the file is reviewed for ')
    .replace(/^Before payment, EGS checks /, 'Before anything is confirmed, the file is checked for ')
    .replace(/^Before payment, EGS screens /, 'Before anything is confirmed, the file is screened for ');
}

export function generateStaticParams() {
  return [...priorityRoutes, ...documentPriorityRoutes, ...getKnowledgeRouteSlugs().map((slug) => ({ slug }))].flatMap((route) => [
    { locale: 'en', route: route.slug },
    { locale: 'zh', route: route.slug },
  ]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; route: string }>;
}) {
  const { locale: localeParam, route } = await params;
  const locale = resolveLocale(localeParam);
  const customRoute = getKnowledgeRoute(route);
  const priorityRoute = customRoute ? null : getPriorityRoute(route);
  const documentRoute = customRoute || priorityRoute ? null : getDocumentPriorityRoute(route);

  if (!customRoute && !priorityRoute && !documentRoute) return {};

  const title = customRoute
    ? getRouteCopy(locale, customRoute.title)
    : priorityRoute
      ? getCopyText(priorityRoute.title, locale)
      : getDocumentCopyText(documentRoute!.title, locale);
  const description = customRoute
    ? getRouteCopy(locale, customRoute.subheading)
    : priorityRoute
      ? getCopyText(priorityRoute.subheading, locale)
      : getDocumentCopyText(documentRoute!.subheading, locale);

  return buildPageMetadata({
    locale,
    path: `/routes/${route}`,
    title: `${title} | EGS Routes`,
    description,
    keywords: [title.toLowerCase(), route.replace(/-/g, ' ')],
    type: 'article',
  });
}

export default async function PriorityRoutePage({
  params,
}: {
  params: Promise<{ locale: string; route: string }>;
}) {
  const { locale: localeParam, route } = await params;
  const locale = resolveLocale(localeParam);
  const matchingGuide = getGuideBySlug(route);
  const customRoute = getKnowledgeRoute(route);
  const routeEntry = getPriorityRoute(route);
  const documentRouteEntry = routeEntry || customRoute ? null : getDocumentPriorityRoute(route);

  if (!customRoute && !routeEntry && !documentRouteEntry) {
    notFound();
  }

  if (matchingGuide && (customRoute || documentRouteEntry)) {
    redirect(`/${locale}/guides/${route}`);
  }

  if (customRoute) {
    const keyLinks = [
      ...customRoute.relatedGuideSlugs
        .map((slug) => getGuideBySlug(slug))
        .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry))
        .map((entry) => ({
          href: `/${locale}/guides/${entry.slug}`,
          label: getGuideCopy(locale, entry.title),
        })),
      ...customRoute.relatedFaqSlugs
        .map((slug) => getFaqBySlug(slug))
        .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry))
        .map((entry) => ({
          href: `/${locale}/faq/${entry.slug}`,
          label: entry.question.en,
        })),
      {
        href: buildPrefillHref(locale, '/intake', {
          locale,
          issuingSlug: customRoute.prefill?.issuingSlug,
          destinationSlug: customRoute.prefill?.destinationSlug,
          documentSlug: customRoute.prefill?.documentSlug,
        }),
        label: locale === 'zh' ? 'Begin intake' : 'Begin intake',
      },
    ].slice(0, 6);

    const articleJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: getRouteCopy(locale, customRoute.title),
      description: getRouteCopy(locale, customRoute.subheading),
      url: `${siteUrl}/${locale}/routes/${customRoute.slug}`,
      mainEntityOfPage: `${siteUrl}/${locale}/routes/${customRoute.slug}`,
      author: { '@type': 'Organization', name: 'EGS Verification' },
      publisher: { '@type': 'Organization', name: 'EGS Verification' },
    };
    const breadcrumbJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/${locale}` },
        { '@type': 'ListItem', position: 2, name: 'Routes', item: `${siteUrl}/${locale}/routes` },
        { '@type': 'ListItem', position: 3, name: getRouteCopy(locale, customRoute.title), item: `${siteUrl}/${locale}/routes/${customRoute.slug}` },
      ],
    };

    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <RoutePriorityPage
          locale={locale}
          title={getRouteCopy(locale, customRoute.title)}
          subheading={getRouteCopy(locale, customRoute.subheading)}
          whoUsesThis={getRouteCopy(locale, customRoute.whoUsesThis)}
          officialBaseline={getRouteCopy(locale, customRoute.officialBaseline)}
          screeningDiscipline={getRouteCopy(locale, customRoute.screeningDiscipline)}
          routeType={getRouteCopy(locale, customRoute.routeType)}
          searchIntents={[getRouteCopy(locale, customRoute.title)]}
          typicalRequirements={customRoute.typicalRequirements.map((item) => getRouteCopy(locale, item))}
          expedited={getRouteCopy(locale, customRoute.expedited)}
          reviewFocus={customRoute.reviewFocus.map((item) => getRouteCopy(locale, item))}
          commonIssues={customRoute.commonIssues.map((item) => getRouteCopy(locale, item))}
          userNeedsFirst={customRoute.typicalRequirements.slice(0, 3).map((item) => getRouteCopy(locale, item))}
          beforePaymentReview={getRouteCopy(locale, customRoute.beforePaymentReview)}
          keyLinks={keyLinks}
          intakeHref={buildPrefillHref(locale, '/intake', {
            locale,
            issuingSlug: customRoute.prefill?.issuingSlug,
            destinationSlug: customRoute.prefill?.destinationSlug,
            documentSlug: customRoute.prefill?.documentSlug,
          })}
        />
      </>
    );
  }

  const activeRoute = routeEntry
    ? routeEntry
    : getPriorityRoute(documentRouteEntry!.parentRouteSlug);

  if (!activeRoute) {
    notFound();
  }

  const issuingEntry = getSearchEntry('issuing', activeRoute.issuingCountrySlug);
  const destinationEntry = getSearchEntry('destination', activeRoute.destinationCountrySlug);
  const activeDocumentEntry = documentRouteEntry
    ? getSearchEntry('document', documentRouteEntry.documentSlug)
    : null;

  if (!issuingEntry || !destinationEntry) {
    notFound();
  }

  const commonDocumentLinks = (documentRouteEntry
    ? [documentRouteEntry.documentSlug]
    : activeRoute.commonDocumentSlugs)
    .map((slug) => getSearchEntry('document', slug))
    .filter((value): value is NonNullable<typeof value> => Boolean(value))
    .map((value) => ({
      href: `/${locale}/documents/${value.slug}`,
      label: getEntryText(value.name, locale),
    }));

  const documentRouteLinks = documentRouteEntry
    ? []
    : activeRoute.commonDocumentSlugs
        .map((documentSlug) => findDocumentRouteByParentAndDocument(activeRoute.slug, documentSlug))
        .filter((value): value is NonNullable<typeof value> => Boolean(value))
        .slice(0, 3)
        .map((value) => ({
          href: `/${locale}/routes/${value.slug}`,
          label: getDocumentCopyText(value.title, locale),
        }));

  const relatedRouteGroups = documentRouteEntry
    ? [
        {
          title: locale === 'zh' ? '同签发国热门路线' : 'Popular routes from the same issuing country',
          links: documentPriorityRoutes
            .filter((item) => {
              const parent = getPriorityRoute(item.parentRouteSlug);
              return parent && parent.issuingCountrySlug === activeRoute.issuingCountrySlug && item.slug !== documentRouteEntry.slug;
            })
            .slice(0, 4)
            .map((item) => ({
              href: `/${locale}/routes/${item.slug}`,
              label: `${locale === 'zh' ? 'View route' : 'View route'}: ${getDocumentCopyText(item.title, locale)}`,
            })),
        },
        {
          title: locale === 'zh' ? '同目的地热门路线' : 'Popular routes for the same destination',
          links: documentPriorityRoutes
            .filter((item) => {
              const parent = getPriorityRoute(item.parentRouteSlug);
              return parent && parent.destinationCountrySlug === activeRoute.destinationCountrySlug && item.slug !== documentRouteEntry.slug;
            })
            .slice(0, 4)
            .map((item) => ({
              href: `/${locale}/routes/${item.slug}`,
              label: `${locale === 'zh' ? 'View route' : 'View route'}: ${getDocumentCopyText(item.title, locale)}`,
            })),
        },
        {
          title: locale === 'zh' ? '同文件类型热门路线' : 'Popular routes for the same document type',
          links: documentPriorityRoutes
            .filter((item) => item.documentSlug === documentRouteEntry.documentSlug && item.slug !== documentRouteEntry.slug)
            .slice(0, 4)
            .map((item) => ({
              href: `/${locale}/routes/${item.slug}`,
              label: `${locale === 'zh' ? 'View route' : 'View route'}: ${getDocumentCopyText(item.title, locale)}`,
            })),
        },
      ].filter((group) => group.links.length > 0)
    : [
        {
          title: locale === 'zh' ? '细分页路线' : 'Document-specific route pages',
          links: documentRouteLinks.map((item) => ({
            ...item,
            label: `${locale === 'zh' ? 'View route' : 'View route'}: ${item.label}`,
          })),
        },
        {
          title: locale === 'zh' ? '相邻热门路线' : 'Nearby popular routes',
          links: priorityRoutes
            .filter(
              (item) =>
                item.slug !== activeRoute.slug &&
                (item.issuingCountrySlug === activeRoute.issuingCountrySlug ||
                  item.destinationCountrySlug === activeRoute.destinationCountrySlug),
            )
            .slice(0, 3)
            .map((item) => ({
              href: `/${locale}/routes/${item.slug}`,
              label: `${locale === 'zh' ? 'View route' : 'View route'}: ${getCopyText(item.title, locale)}`,
            })),
        },
      ].filter((group) => group.links.length > 0);

  const keyLinks = [
    ...(documentRouteEntry
      ? [
          {
            href: `/${locale}/routes/${activeRoute.slug}`,
            label: getCopyText(activeRoute.title, locale),
          },
        ]
      : []),
    {
      href: `/${locale}/issued-in/${issuingEntry.slug}`,
      label: getEntryText(issuingEntry.name, locale),
    },
    {
      href: `/${locale}/used-in/${destinationEntry.slug}`,
      label: getEntryText(destinationEntry.name, locale),
    },
    ...(activeDocumentEntry
      ? [
          {
            href: `/${locale}/documents/${activeDocumentEntry.slug}`,
            label: getEntryText(activeDocumentEntry.name, locale),
          },
        ]
      : []),
    {
      href: buildPrefillHref(locale, '/intake', {
        locale,
        issuingSlug: activeRoute.issuingCountrySlug,
        destinationSlug: activeRoute.destinationCountrySlug,
        documentSlug: documentRouteEntry?.documentSlug,
      }),
      label: locale === 'zh' ? 'Start intake' : 'Start intake',
    },
  ].slice(0, 4);

  return (
    <RoutePriorityPage
      locale={locale}
      title={routeEntry ? getCopyText(routeEntry.title, locale) : getDocumentCopyText(documentRouteEntry!.title, locale)}
      subheading={softenSubheading(routeEntry ? getCopyText(routeEntry.subheading, locale) : getDocumentCopyText(documentRouteEntry!.subheading, locale), locale)}
      whoUsesThis={documentRouteEntry ? softenWhoUsesThis(getDocumentCopyText(documentRouteEntry.whoUsesThis, locale), locale) : undefined}
      officialBaseline={
        routeEntry
          ? routeEntry.officialBaseline
            ? softenOfficialBaseline(getCopyText(routeEntry.officialBaseline, locale), locale)
            : undefined
          : documentRouteEntry!.officialBaseline
            ? softenOfficialBaseline(getDocumentCopyText(documentRouteEntry!.officialBaseline, locale), locale)
            : undefined
      }
      screeningDiscipline={
        routeEntry
          ? routeEntry.screeningDiscipline
            ? softenReviewText(getCopyText(routeEntry.screeningDiscipline, locale), locale)
            : undefined
          : documentRouteEntry!.screeningDiscipline
            ? softenReviewText(getDocumentCopyText(documentRouteEntry!.screeningDiscipline, locale), locale)
            : undefined
      }
      routeType={routeEntry ? getCopyText(routeEntry.routeType, locale) : getDocumentCopyText(documentRouteEntry!.routePosition, locale)}
      searchIntents={
        routeEntry
          ? routeEntry.searchIntents.map((item) => getCopyText(item, locale))
          : [getDocumentCopyText(documentRouteEntry!.title, locale)]
      }
      typicalRequirements={
        routeEntry
          ? routeEntry.typicalRequirements.map((item) => getCopyText(item, locale))
          : documentRouteEntry!.typicalRequirements.map((item) => getDocumentCopyText(item, locale))
      }
      expedited={routeEntry ? getCopyText(routeEntry.expedited, locale) : getDocumentCopyText(documentRouteEntry!.expedited, locale)}
      reviewFocus={
        routeEntry
          ? routeEntry.reviewFocus.map((item) => getCopyText(item, locale))
          : documentRouteEntry!.reviewFocus.map((item) => getDocumentCopyText(item, locale))
      }
      commonIssues={
        routeEntry
          ? routeEntry.commonIssues.map((item) => getCopyText(item, locale))
          : documentRouteEntry!.commonIssues.map((item) => getDocumentCopyText(item, locale))
      }
      userNeedsFirst={
        routeEntry
          ? routeEntry.userNeedsFirst.map((item) => getCopyText(item, locale))
          : documentRouteEntry!.typicalRequirements.slice(0, 3).map((item) => getDocumentCopyText(item, locale))
      }
      beforePaymentReview={
        routeEntry
          ? softenReviewText(getCopyText(routeEntry.beforePaymentReview, locale), locale)
          : softenReviewText(getDocumentCopyText(documentRouteEntry!.beforePaymentReview, locale), locale)
      }
      relatedRouteGroups={relatedRouteGroups}
      keyLinks={keyLinks}
      intakeHref={buildPrefillHref(locale, '/intake', {
        locale,
        issuingSlug: activeRoute.issuingCountrySlug,
        destinationSlug: activeRoute.destinationCountrySlug,
        documentSlug: documentRouteEntry?.documentSlug,
      })}
    />
  );
}
