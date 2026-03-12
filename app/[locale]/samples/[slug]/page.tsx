import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { SampleDetailPreview } from '@/components/SampleDetailPreview';
import { resolveLocale } from '@/lib/i18n/locale';
import {
  getRelatedSamples,
  getSampleBySlug,
  getSampleSlugs,
  toSampleDocumentPageSlug,
} from '@/lib/sample-library';
import { buildPageMetadata, siteUrl } from '@/lib/seo';

export async function generateStaticParams() {
  const slugs = await getSampleSlugs();
  return slugs.flatMap((slug) => [{ locale: 'en', slug }, { locale: 'zh', slug }]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  const locale = resolveLocale(localeParam);
  const item = await getSampleBySlug(slug);

  if (!item) {
    return {};
  }

  return buildPageMetadata({
    locale,
    path: `/samples/${slug}`,
    title: locale === 'zh' ? `${item.sampleTitle}｜样本说明` : `${item.sampleTitle} | Sample Detail`,
    description: locale === 'zh' ? item.routeDescription : item.routeDescription,
    keywords: [item.documentType, item.issuingCountry, ...item.tags].filter(Boolean),
  });
}

export default async function SampleDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: localeParam, slug } = await params;
  const locale = resolveLocale(localeParam);
  const item = await getSampleBySlug(slug);
  const related = item ? await getRelatedSamples(slug, 4) : [];

  if (!item) {
    return (
      <section className="ui-section">
        <div className="section-card stack-sm">
          <h1>{locale === 'zh' ? '未找到样本' : 'Sample not found'}</h1>
          <p className="small-text">
            {locale === 'zh' ? '该样本不存在或尚未发布。' : 'This sample does not exist or is not published yet.'}
          </p>
          <Button href={`/${locale}/samples`} variant="secondary">
            {locale === 'zh' ? '返回样本库' : 'Back to library'}
          </Button>
        </div>
      </section>
    );
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: item.sampleTitle,
    description: item.routeDescription,
    url: `${siteUrl}/${locale}/samples/${item.slug}`,
    keywords: item.tags.join(', '),
    about: item.documentType,
    countryOfOrigin: item.issuingCountry,
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
        name: locale === 'zh' ? '样本库' : 'Document Sample Library',
        item: `${siteUrl}/${locale}/samples`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: item.sampleTitle,
        item: `${siteUrl}/${locale}/samples/${item.slug}`,
      },
    ],
  };
  const documentSlug = toSampleDocumentPageSlug(item.documentType);
  return (
    <section className="ui-section" aria-labelledby="sample-detail-heading">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="sample-detail-page stack-md">
        <div className="page-header">
          <div className="stack-sm">
            <h1 id="sample-detail-heading">{item.sampleTitle}</h1>
            <p className="body-text">{item.routeDescription}</p>
            <div className="actions">
              <Button href={`/${locale}/intake`} variant="primary">
                {locale === 'zh' ? '开始类似 intake' : 'Start similar intake'}
              </Button>
            </div>
          </div>
        </div>

        <div className="sample-detail-layout">
          <div className="section-card stack-sm">
            <SampleDetailPreview
              altText={item.altText}
              filePath={item.file_path}
              thumbPath={item.thumb_path}
            />
            <p className="small-text">{item.caption}</p>
          </div>

          <div className="sample-detail-sidebar stack-sm">
            <div className="section-card stack-sm">
              <h2>{locale === 'zh' ? '文件说明' : 'File notes'}</h2>
              <p className="small-text">
                <strong>{locale === 'zh' ? '签发国家：' : 'Issuing country: '}</strong>
                {item.issuingCountry}
              </p>
              <p className="small-text">
                <strong>{locale === 'zh' ? '典型用途：' : 'Typical use: '}</strong>
                {item.typicalUse}
              </p>
              <p className="small-text">{item.routeNote}</p>
            </div>

            <div className="section-card stack-sm">
              <h2>{locale === 'zh' ? '常见使用场景' : 'Common use cases'}</h2>
              <ul className="samples-bullet-list">
                {item.useCases.map((entry) => (
                  <li key={entry}>{entry}</li>
                ))}
              </ul>
            </div>

            <div className="section-card stack-sm">
              <h2>{locale === 'zh' ? '通常先看什么' : 'What is usually reviewed first'}</h2>
              <ul className="samples-bullet-list">
                {item.reviewFirst.map((entry) => (
                  <li key={entry}>{entry}</li>
                ))}
              </ul>
            </div>

            <div className="section-card stack-sm">
              <h2>{locale === 'zh' ? '继续查看' : 'Continue'}</h2>
              <p className="small-text">
                {locale === 'zh'
                  ? '样本只用于参考展示，正式受理仍需根据文件形态和接收要求复核。'
                  : 'This sample is for reference only. Formal intake still re-checks the document setup and receiving-side requirements.'}
              </p>
              <div className="samples-inline-links">
                {documentSlug ? (
                  <Link className="inline-link" href={`/${locale}/documents/${documentSlug}`}>
                    {locale === 'zh' ? '查看文件页' : 'View document page'}
                  </Link>
                ) : null}
                <Link className="inline-link" href={`/${locale}/intake`}>
                  {locale === 'zh' ? '开始 intake' : 'Start intake'}
                </Link>
              </div>
            </div>

            {related.length ? (
              <div className="section-card stack-sm">
                <h2>{locale === 'zh' ? '相关样本' : 'Related samples'}</h2>
                <div className="samples-related-list">
                  {related.map((entry) => (
                    <Link className="samples-related-link" href={`/${locale}/samples/${entry.slug}`} key={entry.slug}>
                      <strong>{entry.sampleTitle}</strong>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
