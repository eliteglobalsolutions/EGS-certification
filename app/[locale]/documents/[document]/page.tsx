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
  documentTypeEntries,
} from '@/lib/search-entry-data';

export function generateStaticParams() {
  return documentTypeEntries.flatMap((entry) => [{ locale: 'en', document: entry.slug }, { locale: 'zh', document: entry.slug }]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; document: string }>;
}): Promise<Metadata> {
  const { locale: localeParam, document } = await params;
  const locale = resolveLocale(localeParam);
  const entry = getSearchEntry('document', document);

  if (!entry) return {};

  const documentName = getEntryText(entry.name, locale);

  return buildPageMetadata({
    locale,
    path: `/documents/${document}`,
    title:
      locale === 'zh'
        ? `${documentName}｜文件类型说明、认证路线与使用场景`
        : `${documentName} | Document type guidance, apostille, and authentication routes`,
    description:
      locale === 'zh'
        ? `查看${documentName}的常见用途、文件形式、基本流程、常见情况以及相关国家与服务入口。`
        : `Review common use cases, file form expectations, route basics, and related country and service links for ${documentName}.`,
    keywords: [documentName, locale === 'zh' ? '文件类型认证' : 'document route guidance', 'apostille', 'authentication'],
  });
}

export default async function DocumentTypeEntryPage({
  params,
}: {
  params: Promise<{ locale: string; document: string }>;
}) {
  const { locale: localeParam, document } = await params;
  const locale = resolveLocale(localeParam);
  const entry = getSearchEntry('document', document);

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
    ...(entry.relatedDestinationSlugs || [])
      .map((slug) => getSearchEntry('destination', slug))
      .filter((value): value is NonNullable<typeof value> => Boolean(value))
      .map((value) => ({
        href: localizedPath(locale, `/used-in/${value.slug}`),
        label: getEntryText(value.name, locale),
      })),
  ].slice(0, 6);

  const documentName = getEntryText(entry.name, locale);
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: locale === 'zh' ? '首页' : 'Home', item: localizedUrl(locale, siteUrl, '') },
      { '@type': 'ListItem', position: 2, name: locale === 'zh' ? '文件类型页面' : 'Document pages', item: localizedUrl(locale, siteUrl, '/routes') },
      { '@type': 'ListItem', position: 3, name: documentName, item: localizedUrl(locale, siteUrl, `/documents/${entry.slug}`) },
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
        sectionLabel={documentName}
        title={documentName}
        intro={getEntryText(entry.scope, locale)}
        checkpoints={getEntryList(entry.checkpoints, locale)}
        intakeHref={buildPrefillHref(locale, '/intake', { locale, documentSlug: entry.slug })}
        intakeLabel={locale === 'zh' ? '进入受理页' : 'Go to intake'}
        helperTitle={
          entry.helperTitle
            ? getEntryText(entry.helperTitle, locale)
            : locale === 'zh'
              ? '先看什么'
              : 'What usually matters first'
        }
        helperText={
          entry.helperText
            ? getEntryText(entry.helperText, locale)
            : locale === 'zh'
              ? '先看文件本身，再看签发地、目的地和接收要求。'
              : 'Start with the document itself, then check the issuing side, destination side, and receiving requirements.'
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
        institutionReferences={
          entry.institutionReferences?.map((item) => ({
            region: getEntryText(item.region, locale),
            schools: getEntryList(item.schools, locale),
            note: item.note ? getEntryText(item.note, locale) : undefined,
          })) || []
        }
        siblingTitle={locale === 'zh' ? '更多文件类型' : 'More document types'}
        siblings={documentTypeEntries.filter((item) => item.slug !== entry.slug)}
        siblingBasePath="/documents"
        siblingPrefillType="document"
      />
    </>
  );
}
