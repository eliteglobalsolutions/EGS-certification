import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SearchEntryPage } from '@/components/marketing/SearchEntryPage';
import { localizedPath, localizedUrl, resolveLocale } from '@/lib/i18n/locale';
import { buildPrefillHref } from '@/lib/prefill';
import { buildPageMetadata, siteUrl } from '@/lib/seo';
import {
  getEntryList,
  getEntryText,
  getSearchEntry,
  destinationCountryEntries,
} from '@/lib/search-entry-data';

export function generateStaticParams() {
  return destinationCountryEntries.flatMap((entry) => [{ locale: 'en', country: entry.slug }, { locale: 'zh', country: entry.slug }]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; country: string }>;
}): Promise<Metadata> {
  const { locale: localeParam, country } = await params;
  const locale = resolveLocale(localeParam);
  const entry = getSearchEntry('destination', country);

  if (!entry) {
    return {};
  }

  const countryName = getEntryText(entry.name, locale);
  const title =
    locale === 'zh'
      ? `${countryName}｜海牙认证、领事认证与路线说明`
      : `${countryName} | Apostille, authentication, and route guidance`;
  const description =
    locale === 'zh'
      ? `查看${countryName}常见的认证路径、文件类型、基本流程、常见情况和 intake 预审入口。`
      : `Review common document routes for ${countryName}, including file types, process basics, practical requirements, and intake-first route review.`;

  return buildPageMetadata({
    locale,
    path: `/used-in/${country}`,
    title,
    description,
    keywords: [
      `${locale === 'zh' ? '文件用于' : 'documents for use in'} ${countryName}`,
      locale === 'zh' ? '海牙认证' : 'apostille',
      locale === 'zh' ? '领事认证' : 'authentication',
      locale === 'zh' ? '文件协调' : 'document coordination',
    ],
  });
}

export default async function DestinationCountryEntryPage({
  params,
}: {
  params: Promise<{ locale: string; country: string }>;
}) {
  const { locale: localeParam, country } = await params;
  const locale = resolveLocale(localeParam);
  const entry = getSearchEntry('destination', country);

  if (!entry) {
    notFound();
  }

  const relatedLinks = [
    ...(entry.relatedIssuingSlugs || [])
      .map((slug) => getSearchEntry('issuing', slug))
      .filter((value): value is NonNullable<typeof value> => Boolean(value))
      .map((value) => ({
        href: localizedPath(locale, `/issued-in/${value.slug}`),
        label: getEntryText(value.name, locale),
      })),
    ...entry.relatedDocumentSlugs
      .map((slug) => getSearchEntry('document', slug))
      .filter((value): value is NonNullable<typeof value> => Boolean(value))
      .map((value) => ({
        href: localizedPath(locale, `/documents/${value.slug}`),
        label: getEntryText(value.name, locale),
      })),
  ].slice(0, 6);

  const countryName = getEntryText(entry.name, locale);
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: locale === 'zh' ? '首页' : 'Home',
        item: localizedUrl(locale, siteUrl, ''),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: locale === 'zh' ? '目的地页面' : 'Used-in pages',
        item: localizedUrl(locale, siteUrl, '/routes'),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: countryName,
        item: localizedUrl(locale, siteUrl, `/used-in/${entry.slug}`),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <SearchEntryPage
        locale={locale}
        sectionLabel={
          locale === 'zh'
            ? `用于${countryName}`
            : `For use in ${countryName}`
        }
        title={countryName}
        intro={getEntryText(entry.scope, locale)}
        checkpoints={getEntryList(entry.checkpoints, locale)}
        intakeHref={buildPrefillHref(locale, '/intake', { locale, destinationSlug: entry.slug })}
        intakeLabel={locale === 'zh' ? '进入受理页' : 'Go to intake'}
        helperTitle={
          entry.helperTitle
            ? getEntryText(entry.helperTitle, locale)
            : locale === 'zh'
              ? '先确认什么'
              : 'What to confirm first'
        }
        helperText={
          entry.helperText
            ? getEntryText(entry.helperText, locale)
            : locale === 'zh'
              ? '先确认接收方要求，再判断签发地和文件形式。'
              : 'Start with the receiving-side requirement, then check the issuing side and document format.'
        }
        relatedTitle={locale === 'zh' ? '相关页面' : 'Related pages'}
        relatedLinks={relatedLinks}
        servicesTitle={locale === 'zh' ? '相关服务与下一步' : 'Related services and next steps'}
        servicesLinks={[
          { href: localizedPath(locale, '/services'), label: locale === 'zh' ? '查看服务总页' : 'View services' },
          { href: localizedPath(locale, '/faq'), label: locale === 'zh' ? '查看常见问题' : 'View FAQ' },
          { href: localizedPath(locale, '/guides'), label: locale === 'zh' ? '查看指南页' : 'Browse guides' },
          { href: localizedPath(locale, '/intake'), label: locale === 'zh' ? '开始 intake' : 'Begin intake' },
        ]}
        regionalRequirements={
          entry.regionalRequirements?.map((item) => ({
            region: getEntryText(item.region, locale),
            summary: getEntryText(item.summary, locale),
            officialRequirements: getEntryList(item.officialRequirements, locale),
            egsRequirements: getEntryList(item.egsRequirements, locale),
            commonExamples: item.commonExamples ? getEntryList(item.commonExamples, locale) : undefined,
            expedite: getEntryText(item.expedite, locale),
            note: item.note ? getEntryText(item.note, locale) : undefined,
          })) || []
        }
        siblingTitle={locale === 'zh' ? '更多目的地' : 'More destinations'}
        siblings={destinationCountryEntries.filter((item) => item.slug !== entry.slug)}
        siblingBasePath="/used-in"
        siblingPrefillType="destination"
      />
    </>
  );
}
