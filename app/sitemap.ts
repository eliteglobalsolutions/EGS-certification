import type { MetadataRoute } from 'next';
import { getSampleSlugs } from '@/lib/sample-library';
import { priorityRoutes } from '@/lib/priority-routes-data';
import { documentPriorityRoutes } from '@/lib/document-priority-routes-data';
import {
  documentTypeEntries,
  issuingCountryEntries,
  destinationCountryEntries,
} from '@/lib/search-entry-data';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.eliteglobalsolutions.co';
const locales = ['en', 'zh'] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseRoutes = ['', '/services', '/intake', '/track', '/resources', '/samples'];
  const seoRoutes = [
    '/apostille-australia',
    '/consular-legalisation-australia',
    '/document-authentication-sydney',
  ];

  const entries: MetadataRoute.Sitemap = [];
  const sampleSlugs = await getSampleSlugs();

  for (const locale of locales) {
    for (const route of [...baseRoutes, ...seoRoutes]) {
      entries.push({
        url: `${siteUrl}/${locale}${route}`,
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : 0.7,
        lastModified: new Date(),
      });
    }

    for (const slug of sampleSlugs) {
      entries.push({
        url: `${siteUrl}/${locale}/samples/${slug}`,
        changeFrequency: 'monthly',
        priority: 0.65,
        lastModified: new Date(),
      });
    }

    for (const route of priorityRoutes) {
      entries.push({
        url: `${siteUrl}/${locale}/routes/${route.slug}`,
        changeFrequency: 'weekly',
        priority: 0.85,
        lastModified: new Date(),
      });
    }

    for (const route of documentPriorityRoutes) {
      entries.push({
        url: `${siteUrl}/${locale}/routes/${route.slug}`,
        changeFrequency: 'weekly',
        priority: 0.82,
        lastModified: new Date(),
      });
    }

    for (const entry of documentTypeEntries) {
      entries.push({
        url: `${siteUrl}/${locale}/documents/${entry.slug}`,
        changeFrequency: 'weekly',
        priority: 0.8,
        lastModified: new Date(),
      });
    }

    for (const entry of issuingCountryEntries) {
      entries.push({
        url: `${siteUrl}/${locale}/issued-in/${entry.slug}`,
        changeFrequency: 'weekly',
        priority: 0.78,
        lastModified: new Date(),
      });
    }

    for (const entry of destinationCountryEntries) {
      entries.push({
        url: `${siteUrl}/${locale}/used-in/${entry.slug}`,
        changeFrequency: 'weekly',
        priority: 0.78,
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
