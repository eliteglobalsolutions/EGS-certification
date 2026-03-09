import { notFound } from 'next/navigation';
import { SearchEntryPage } from '@/components/marketing/SearchEntryPage';
import { resolveLocale } from '@/lib/i18n/locale';
import { buildPrefillHref } from '@/lib/prefill';
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

  return (
    <SearchEntryPage
      locale={locale}
      sectionLabel={
        locale === 'zh'
          ? `${getEntryText(entry.name, locale)}签发`
          : `Issued in ${getEntryText(entry.name, locale)}`
      }
      title={getEntryText(entry.name, locale)}
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
  );
}
