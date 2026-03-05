import type { Metadata } from 'next';
import { resolveLocale } from '@/lib/i18n/locale';
import { getCopy } from '@/lib/i18n/dictionaries';
import { SamplesGallery, type SampleRecord } from '@/components/SamplesGallery';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.eliteglobalsolutions.co';

  if (locale === 'zh') {
    return {
      title: '样本库｜文件认证打码样本｜ELITE GLOBAL SOLUTIONS PTY LTD',
      description: '浏览 EGS 文件认证打码样本库，按国家和文件类型筛选参考样本。',
      keywords: ['文件认证样本', '打码样本', '海牙认证样本', '领馆认证样本', 'EGS 样本库'],
      alternates: { canonical: `${siteUrl}/zh/samples` },
    };
  }

  return {
    title: 'Sample Library | Redacted Certification Samples | ELITE GLOBAL SOLUTIONS PTY LTD',
    description: 'Browse EGS redacted sample library by country and document type for apostille and legalisation workflows.',
    keywords: ['apostille sample', 'legalisation sample', 'redacted document sample', 'sample library EGS'],
    alternates: { canonical: `${siteUrl}/en/samples` },
  };
}

export default async function SamplesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  const t = getCopy(locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.eliteglobalsolutions.co';
  let items: SampleRecord[] = [];

  try {
    const indexPath = path.join(process.cwd(), 'public', 'samples', 'index.json');
    const raw = await readFile(indexPath, 'utf8');
    items = JSON.parse(raw) as SampleRecord[];
  } catch {
    items = [];
  }

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: locale === 'zh' ? 'EGS 样本库' : 'EGS Sample Library',
    description: locale === 'zh'
      ? '按国家和文件类型浏览已打码样本。'
      : 'Browse redacted samples by country and document type.',
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
          <p className="small-text">{t.resources.samples.disclaimer}</p>
          <p className="small-text">
            {t.resources.samples.totalLabel}: {items.length}
          </p>
          <div className="actions">
            <Button href={`/${locale}`} variant="secondary">
              {locale === 'zh' ? '返回首页' : 'Back to home'}
            </Button>
            <Button href={`/${locale}/intake`} variant="primary">
              {locale === 'zh' ? '开始受理' : 'Begin intake'}
            </Button>
          </div>
        </div>
      </div>
      <SamplesGallery
        items={items}
        text={{
          searchLabel: t.resources.samples.searchLabel,
          searchPlaceholder: t.resources.samples.searchPlaceholder,
          filterLabel: t.resources.samples.filterLabel,
          allCountries: t.resources.samples.allCountries,
          empty: t.resources.samples.empty,
          previewTitle: t.resources.samples.previewTitle,
          openButton: t.resources.samples.openButton,
          reviewedLabel: t.resources.samples.reviewedLabel,
        }}
      />
      <div className="section-card stack-sm" style={{ marginTop: '1rem' }}>
        <p className="kicker">{locale === 'zh' ? '样本检索词' : 'Sample search terms'}</p>
        {locale === 'zh' ? (
          <>
            <p className="small-text">
              常见检索词：海牙认证样本、领馆认证样本、文件认证样本、打码样本、Apostille sample、legalisation sample。
            </p>
            <p className="small-text">
              相关页面：
              <Link className="inline-link" href={`/${locale}/services`}> 服务范围</Link> ·
              <Link className="inline-link" href={`/${locale}/apostille-australia`}> 澳洲海牙认证</Link> ·
              <Link className="inline-link" href={`/${locale}/consular-legalisation-australia`}> 澳洲领事认证</Link>
            </p>
          </>
        ) : (
          <>
            <p className="small-text">
              Common search terms: apostille sample, legalisation sample, redacted certification sample, document authentication sample,
              Australia apostille sample format.
            </p>
            <p className="small-text">
              Related pages:
              <Link className="inline-link" href={`/${locale}/services`}> Services</Link> ·
              <Link className="inline-link" href={`/${locale}/apostille-australia`}> Apostille Australia</Link> ·
              <Link className="inline-link" href={`/${locale}/consular-legalisation-australia`}> Consular Legalisation Australia</Link>
            </p>
          </>
        )}
      </div>
    </section>
  );
}
