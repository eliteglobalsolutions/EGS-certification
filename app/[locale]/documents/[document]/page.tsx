import { notFound } from 'next/navigation';
import { SearchEntryPage } from '@/components/marketing/SearchEntryPage';
import { resolveLocale } from '@/lib/i18n/locale';
import { buildPrefillHref } from '@/lib/prefill';
import {
  getEntryList,
  getEntryText,
  getSearchEntry,
  documentTypeEntries,
} from '@/lib/search-entry-data';

export function generateStaticParams() {
  return documentTypeEntries.flatMap((entry) => [{ locale: 'en', document: entry.slug }, { locale: 'zh', document: entry.slug }]);
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
        href: `/${locale}/issued-in/${value.slug}`,
        label: getEntryText(value.name, locale),
      })),
    ...(entry.relatedDestinationSlugs || [])
      .map((slug) => getSearchEntry('destination', slug))
      .filter((value): value is NonNullable<typeof value> => Boolean(value))
      .map((value) => ({
        href: `/${locale}/used-in/${value.slug}`,
        label: getEntryText(value.name, locale),
      })),
  ].slice(0, 6);

  return (
    <SearchEntryPage
      locale={locale}
      sectionLabel={
        locale === 'zh'
          ? `${getEntryText(entry.name, locale)}`
          : `${getEntryText(entry.name, locale)}`
      }
      title={getEntryText(entry.name, locale)}
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
  );
}
