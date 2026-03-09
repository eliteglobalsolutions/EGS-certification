import { notFound } from 'next/navigation';
import { SearchEntryPage } from '@/components/marketing/SearchEntryPage';
import { resolveLocale } from '@/lib/i18n/locale';
import { buildPrefillHref } from '@/lib/prefill';
import {
  getEntryList,
  getEntryText,
  getSearchEntry,
  destinationCountryEntries,
} from '@/lib/search-entry-data';

export function generateStaticParams() {
  return destinationCountryEntries.flatMap((entry) => [{ locale: 'en', country: entry.slug }, { locale: 'zh', country: entry.slug }]);
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
        href: `/${locale}/issued-in/${value.slug}`,
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
          ? `用于${getEntryText(entry.name, locale)}`
          : `For use in ${getEntryText(entry.name, locale)}`
      }
      title={getEntryText(entry.name, locale)}
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
  );
}
