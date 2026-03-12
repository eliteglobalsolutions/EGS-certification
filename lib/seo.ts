import type { Metadata } from 'next';

const canonicalOrigin = 'https://eliteglobalsolutions.co';

export const siteUrl = canonicalOrigin;

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

export function cleanPath(path: string) {
  if (!path) return '';
  const normalized = path.trim().replace(/\/{2,}/g, '/');
  if (!normalized || normalized === '/') return '';
  const withoutQuery = normalized.split('?')[0].split('#')[0];
  return withoutQuery.endsWith('/') ? withoutQuery.slice(0, -1) : withoutQuery;
}

export function buildCanonicalUrl(locale: Locale, path: string) {
  const normalizedPath = cleanPath(path);
  return `${siteUrl}/${locale}${normalizedPath}`;
}

export function buildLocaleAlternates(locale: Locale, path: string) {
  const normalizedPath = cleanPath(path);

  return {
    canonical: `${siteUrl}/${locale}${normalizedPath}`,
    languages: {
      en: `${siteUrl}/en${normalizedPath}`,
      zh: `${siteUrl}/zh${normalizedPath}`,
      'x-default': `${siteUrl}/en${normalizedPath}`,
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
  const localePath = buildCanonicalUrl(locale, path);
  const imagePath = '/opengraph-image';
  const alternates = buildLocaleAlternates(locale, path);

  return {
    title,
    description,
    keywords,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: alternates.canonical,
      languages: alternates.languages,
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
