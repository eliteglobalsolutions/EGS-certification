import type { Metadata } from 'next';
import { resolveLocale } from '@/lib/i18n/locale';
import { getCopy } from '@/lib/i18n/dictionaries';
import { SamplesGallery } from '@/components/SamplesGallery';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { loadSampleLibrary, toSampleDocumentPageSlug } from '@/lib/sample-library';
import { buildPageMetadata, siteUrl } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);

  if (locale === 'zh') {
    return buildPageMetadata({
      locale,
      path: '/samples',
      title: '样本文档库｜打码文件样本｜EGS Verification',
      description: '浏览按文件类型、签发国家和使用目的整理的打码文件样本，查看更清晰的跨境文件路径示例。',
      keywords: ['文件认证样本', '打码样本', '海牙认证样本', '领馆认证样本', '文件样本库', 'EGS 样本库'],
    });
  }

  return buildPageMetadata({
    locale,
    path: '/samples',
    title: 'Document Sample Library | Redacted Route Samples | EGS Verification',
    description: 'Browse redacted document sample previews organised by document type, issuing country, and route context.',
    keywords: ['document sample library', 'apostille sample', 'legalisation sample', 'redacted document sample', 'route sample EGS'],
  });
}

export default async function SamplesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  const t = getCopy(locale);
  const items = await loadSampleLibrary();
  const topDocumentTypes = Array.from(
    items.reduce((map, item) => map.set(item.documentType, (map.get(item.documentType) || 0) + 1), new Map<string, number>())
  )
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 6)
    .map(([label]) => label);

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: locale === 'zh' ? 'EGS 样本文档库' : 'EGS Document Sample Library',
    description: locale === 'zh'
      ? '按文件类型、签发国家和用途路径浏览打码样本。'
      : 'Browse redacted samples by document type, issuing country, and route context.',
    url: `${siteUrl}/${locale}/samples`,
    inLanguage: locale,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: items.length,
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: locale === 'zh' ? '首页' : 'Home',
        item: `${siteUrl}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: locale === 'zh' ? '样本库' : 'Sample Library',
        item: `${siteUrl}/${locale}/samples`,
      },
    ],
  };

  return (
    <section className="ui-section" aria-labelledby="samples-heading">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="page-header">
        <div className="stack-sm">
          <h1 id="samples-heading">{t.resources.samples.title}</h1>
          <p className="body-text">{t.resources.samples.subtitle}</p>
          <div className="actions">
            <Button href={`/${locale}/intake`} variant="primary">
              {locale === 'zh' ? '开始受理' : 'Begin intake'}
            </Button>
          </div>
        </div>
      </div>
      <SamplesGallery
        items={items}
        locale={locale}
        text={{
          empty: t.resources.samples.empty,
          previewTitle: t.resources.samples.previewTitle,
          openButton: t.resources.samples.openButton,
          groupDocumentType: t.resources.samples.groupDocumentType,
          groupIssuingCountry: t.resources.samples.groupIssuingCountry,
          clearFilters: t.resources.samples.clearFilters,
          detailCta: t.resources.samples.detailCta,
          previewCaptionLabel: t.resources.samples.previewCaptionLabel,
          protectedLabel: t.resources.samples.protectedLabel,
          selectPrompt: t.resources.samples.selectPrompt,
        }}
      />
      <div className="section-card stack-sm">
        <p className="kicker">{locale === 'zh' ? '相关文件页' : 'Related document pages'}</p>
        <div className="samples-inline-links">
          {topDocumentTypes.map((label) => {
            const slug = toSampleDocumentPageSlug(label);
            return slug ? (
              <Link className="inline-link" href={`/${locale}/documents/${slug}`} key={label}>
                {label}
              </Link>
            ) : null;
          })}
        </div>
      </div>
    </section>
  );
}
