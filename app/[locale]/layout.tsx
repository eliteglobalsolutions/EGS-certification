import type { Metadata } from 'next';
import { resolveLocale } from '@/lib/i18n/locale';
import { getCopy } from '@/lib/i18n/dictionaries';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  const t = getCopy(locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.eliteglobalsolutions.co';
  const title =
    locale === 'zh'
      ? 'EGS Verification | 海牙认证与领事认证 | 澳洲及全球文件协调'
      : 'EGS Verification | Apostille & Legalisation | Global Document Coordination';
  const description =
    locale === 'zh'
      ? 'EGS 提供澳洲及全球文件跨境协调服务：Apostille、领事认证、文件上传、订单追踪与合规流程管理。'
      : 'EGS provides global cross-border document coordination: apostille, legalisation, secure intake, tracking, and compliance-first workflow.';
  const keywords =
    locale === 'zh'
      ? [
          '海牙认证',
          '领事认证',
          'apostille 澳洲',
          '国际文件认证',
          '悉尼公证协调',
          '跨境文件办理',
          '文件认证澳洲',
          '外交部认证澳洲',
          '订单追踪认证服务',
          'EGS Verification',
        ]
      : [
          'apostille Australia',
          'document legalisation',
          'consular legalisation Australia',
          'international document authentication',
          'Sydney apostille service',
          'cross-border document coordination',
          'notary coordination Australia',
          'certificate legalisation',
          'document attestation service',
          'EGS Verification',
        ];

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: {
        en: `${siteUrl}/en`,
        zh: `${siteUrl}/zh`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${locale}`,
      siteName: 'EGS Verification',
      type: 'website',
      locale: locale === 'zh' ? 'zh_CN' : 'en_AU',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
    metadataBase: new URL(siteUrl),
    other: {
      'x-egs-brand': t.brand.title,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  resolveLocale(localeParam);

  return (
    <main>
      <div className="page-shell">{children}</div>
    </main>
  );
}
