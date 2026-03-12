import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SearchEntryPage } from '@/components/marketing/SearchEntryPage';
import { resolveLocale } from '@/lib/i18n/locale';
import { buildPrefillHref } from '@/lib/prefill';
import { buildPageMetadata, siteUrl } from '@/lib/seo';
import {
  documentTypeEntries,
  getEntryList,
  getEntryText,
  getSearchEntry,
  issuingCountryEntries,
  destinationCountryEntries,
} from '@/lib/search-entry-data';

export function generateStaticParams() {
  return issuingCountryEntries.flatMap((entry) => [{ locale: 'en', country: entry.slug }, { locale: 'zh', country: entry.slug }]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; country: string }>;
}): Promise<Metadata> {
  const { locale: localeParam, country } = await params;
  const locale = resolveLocale(localeParam);
  const entry = getSearchEntry('issuing', country);

  if (!entry) return {};

  const countryName = getEntryText(entry.name, locale);

  return buildPageMetadata({
    locale,
    path: `/issued-in/${country}`,
    title:
      locale === 'zh'
        ? `${countryName}｜签发地文件认证与路线说明`
        : `${countryName} | Issuing-country document route guidance`,
    description:
      locale === 'zh'
        ? `查看${countryName}相关文件在跨境使用时常见的签发地规则、文件类型、流程和 intake 预审入口。`
        : `Review issuing-country guidance for ${countryName}, including document types, practical route checks, and intake-first next steps.`,
    keywords: [countryName, locale === 'zh' ? '签发地文件认证' : 'issuing-country document route', 'apostille', 'authentication'],
  });
}

export default async function IssuingCountryEntryPage({
  params,
}: {
  params: Promise<{ locale: string; country: string }>;
}) {
  const { locale: localeParam, country } = await params;
  const locale = resolveLocale(localeParam);
  const entry = getSearchEntry('issuing', country);

  if (!entry) {
    notFound();
  }

  const relatedLinks = [
    ...(entry.relatedDestinationSlugs || [])
      .map((slug) => getSearchEntry('destination', slug))
      .filter((value): value is NonNullable<typeof value> => Boolean(value))
      .map((value) => ({
        href: `/${locale}/used-in/${value.slug}`,
        label: getEntryText(value.name, locale),
      })),
    ...entry.relatedDocumentSlugs
      .map((slug) => getSearchEntry('document', slug))
      .filter((value): value is NonNullable<typeof value> => Boolean(value))
      .map((value) => ({
        href: `/${locale}/documents/${value.slug}`,
        label: getEntryText(value.name, locale),
      })),
  ].slice(0, 6);

  const countryName = getEntryText(entry.name, locale);
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: locale === 'zh' ? '首页' : 'Home', item: `${siteUrl}/${locale}` },
      { '@type': 'ListItem', position: 2, name: locale === 'zh' ? '签发地页面' : 'Issued-in pages', item: `${siteUrl}/${locale}/routes` },
      { '@type': 'ListItem', position: 3, name: countryName, item: `${siteUrl}/${locale}/issued-in/${entry.slug}` },
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
            ? `${countryName}签发`
            : `Issued in ${countryName}`
        }
        title={countryName}
        intro={getEntryText(entry.scope, locale)}
        checkpoints={getEntryList(entry.checkpoints, locale)}
        intakeHref={buildPrefillHref(locale, '/intake', { locale, issuingSlug: entry.slug })}
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
              ? '先看签发地规则，再看目的地和文件类型。'
              : 'Start with the issuing side, then check the destination and the document type.'
        }
        relatedTitle={locale === 'zh' ? '相关页面' : 'Related pages'}
        relatedLinks={relatedLinks}
        servicesTitle={locale === 'zh' ? '相关服务与下一步' : 'Related services and next steps'}
        servicesLinks={[
          { href: `/${locale}/services`, label: locale === 'zh' ? '查看服务总页' : 'View services' },
          { href: `/${locale}/faq`, label: locale === 'zh' ? '查看常见问题' : 'View FAQ' },
          { href: `/${locale}/guides`, label: locale === 'zh' ? '查看指南页' : 'Browse guides' },
          { href: `/${locale}/intake`, label: locale === 'zh' ? '开始 intake' : 'Begin intake' },
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
        siblingTitle={locale === 'zh' ? '更多签发地' : 'More issuing countries'}
        siblings={issuingCountryEntries.filter((item) => item.slug !== entry.slug)}
        siblingBasePath="/issued-in"
        siblingPrefillType="issuing"
      />
    </>
  );
}
