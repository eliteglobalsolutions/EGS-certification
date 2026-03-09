import type { Metadata } from 'next';

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.eliteglobalsolutions.co';

export const brandName = 'EGS Verification';

type Locale = 'en' | 'zh';

type SeoConfig = {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  keywords: string[];
  type?: 'website' | 'article';
};

export function buildLocaleAlternates(path: string) {
  return {
    canonical: `${siteUrl}/en${path}`,
    languages: {
      en: `${siteUrl}/en${path}`,
      zh: `${siteUrl}/zh${path}`,
      'x-default': `${siteUrl}/en${path}`,
    },
  };
}

export function buildPageMetadata({
  locale,
  path,
  title,
  description,
  keywords,
  type = 'website',
}: SeoConfig): Metadata {
  const localePath = `${siteUrl}/${locale}${path}`;
  const imagePath = '/opengraph-image';

  return {
    title,
    description,
    keywords,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: localePath,
      languages: buildLocaleAlternates(path).languages,
    },
    openGraph: {
      title,
      description,
      url: localePath,
      siteName: brandName,
      type,
      locale: locale === 'zh' ? 'zh_CN' : 'en_AU',
      images: [
        {
          url: imagePath,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imagePath],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    category: locale === 'zh' ? '文件认证服务' : 'Document legalisation service',
  };
}
