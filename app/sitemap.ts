import type { MetadataRoute } from 'next';
import { getSampleSlugs } from '@/lib/sample-library';
import { priorityRoutes } from '@/lib/priority-routes-data';
import { documentPriorityRoutes } from '@/lib/document-priority-routes-data';
import {
  documentTypeEntries,
  issuingCountryEntries,
  destinationCountryEntries,
} from '@/lib/search-entry-data';
import { getGuideSlugs } from '@/lib/guides';
import { getCityPageSlugs } from '@/lib/city-pages';
import { getFaqSlugs } from '@/lib/knowledge-faqs';
import { getKnowledgeRouteSlugs } from '@/lib/knowledge-routes';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.eliteglobalsolutions.co';
const locales = ['en', 'zh'] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseRoutes = ['', '/services', '/intake', '/track', '/resources', '/samples', '/guides', '/faq'];
  const seoRoutes = [
    '/apostille-australia',
    '/consular-legalisation-australia',
    '/document-authentication-sydney',
  ];

  const entries: MetadataRoute.Sitemap = [];
  const sampleSlugs = await getSampleSlugs();
  const guideSlugs = getGuideSlugs();
  const guideSlugSet = new Set(guideSlugs);
  const faqSlugs = getFaqSlugs();
  const citySlugs = getCityPageSlugs();
  const knowledgeRouteSlugs = getKnowledgeRouteSlugs();

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

    for (const slug of guideSlugs) {
      entries.push({
        url: `${siteUrl}/${locale}/guides/${slug}`,
        changeFrequency: 'weekly',
        priority: 0.76,
        lastModified: new Date(),
      });
    }

    for (const slug of faqSlugs) {
      entries.push({
        url: `${siteUrl}/${locale}/faq/${slug}`,
        changeFrequency: 'monthly',
        priority: 0.72,
        lastModified: new Date(),
      });
    }

    for (const slug of citySlugs) {
      entries.push({
        url: `${siteUrl}/${locale}/cities/${slug}`,
        changeFrequency: 'weekly',
        priority: 0.74,
        lastModified: new Date(),
      });
      entries.push({
        url: `${siteUrl}/${locale}/cities/${slug}/consular-authentication`,
        changeFrequency: 'weekly',
        priority: 0.73,
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
      if (guideSlugSet.has(route.slug)) continue;
      entries.push({
        url: `${siteUrl}/${locale}/routes/${route.slug}`,
        changeFrequency: 'weekly',
        priority: 0.82,
        lastModified: new Date(),
      });
    }

    for (const slug of knowledgeRouteSlugs) {
      if (guideSlugSet.has(slug)) continue;
      entries.push({
        url: `${siteUrl}/${locale}/routes/${slug}`,
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
