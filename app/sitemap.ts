import type { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.eliteglobalsolutions.co';
const locales = ['en', 'zh'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseRoutes = ['', '/services', '/intake', '/track', '/resources', '/samples'];
  const seoRoutes = [
    '/apostille-australia',
    '/consular-legalisation-australia',
    '/document-authentication-sydney',
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of [...baseRoutes, ...seoRoutes]) {
      entries.push({
        url: `${siteUrl}/${locale}${route}`,
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : 0.7,
        lastModified: new Date(),
      });
    }
  }

  entries.push({
    url: `${siteUrl}/`,
    changeFrequency: 'weekly',
    priority: 1,
    lastModified: new Date(),
  });

  return entries;
}
