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
import { siteUrl } from '@/lib/seo';

const locales = ['en', 'zh'] as const;
const lastModified = new Date('2026-03-12T00:00:00.000Z');

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseRoutes = ['', '/services', '/routes', '/intake', '/track', '/resources', '/samples', '/guides', '/faq', '/post-documents'];
  const legalRoutes = ['/legal/privacy', '/legal/terms', '/legal/authorisation'];
  const seoRoutes = [
    '/apostille-australia',
    '/consular-legalisation-australia',
    '/document-authentication-sydney',
  ];

  const entries: MetadataRoute.Sitemap = [];
  const seen = new Set<string>();
  const sampleSlugs = await getSampleSlugs();
  const guideSlugs = getGuideSlugs();
  const guideSlugSet = new Set(guideSlugs);
  const faqSlugs = getFaqSlugs();
  const citySlugs = getCityPageSlugs();
  const knowledgeRouteSlugs = getKnowledgeRouteSlugs();

  for (const locale of locales) {
    for (const route of [...baseRoutes, ...legalRoutes, ...seoRoutes]) {
      const url = `${siteUrl}/${locale}${route}`;
      if (seen.has(url)) continue;
      seen.add(url);
      entries.push({
        url,
        changeFrequency:
          route === ''
            ? 'weekly'
            : route === '/services' || route === '/routes' || route === '/guides' || route === '/faq'
              ? 'weekly'
              : 'monthly',
        priority:
          route === ''
            ? 1
            : route === '/services' || route === '/routes'
              ? 0.82
              : route === '/guides' || route === '/faq' || route === '/post-documents'
                ? 0.76
                : route.startsWith('/legal/')
                  ? 0.42
                  : 0.7,
        lastModified,
      });
    }

    for (const slug of sampleSlugs) {
      const url = `${siteUrl}/${locale}/samples/${slug}`;
      if (seen.has(url)) continue;
      seen.add(url);
      entries.push({
        url,
        changeFrequency: 'monthly',
        priority: 0.65,
        lastModified,
      });
    }

    for (const slug of guideSlugs) {
      const url = `${siteUrl}/${locale}/guides/${slug}`;
      if (seen.has(url)) continue;
      seen.add(url);
      entries.push({
        url,
        changeFrequency: 'weekly',
        priority: 0.76,
        lastModified,
      });
    }

    for (const slug of faqSlugs) {
      const url = `${siteUrl}/${locale}/faq/${slug}`;
      if (seen.has(url)) continue;
      seen.add(url);
      entries.push({
        url,
        changeFrequency: 'monthly',
        priority: 0.72,
        lastModified,
      });
    }

    for (const slug of citySlugs) {
      const cityUrl = `${siteUrl}/${locale}/cities/${slug}`;
      if (!seen.has(cityUrl)) {
        seen.add(cityUrl);
        entries.push({
          url: cityUrl,
          changeFrequency: 'weekly',
          priority: 0.74,
          lastModified,
        });
      }
      const consularUrl = `${siteUrl}/${locale}/cities/${slug}/consular-authentication`;
      if (seen.has(consularUrl)) continue;
      seen.add(consularUrl);
      entries.push({
        url: consularUrl,
        changeFrequency: 'weekly',
        priority: 0.73,
        lastModified,
      });
    }

    for (const route of priorityRoutes) {
      const url = `${siteUrl}/${locale}/routes/${route.slug}`;
      if (seen.has(url)) continue;
      seen.add(url);
      entries.push({
        url,
        changeFrequency: 'weekly',
        priority: 0.85,
        lastModified,
      });
    }

    for (const route of documentPriorityRoutes) {
      if (guideSlugSet.has(route.slug)) continue;
      const url = `${siteUrl}/${locale}/routes/${route.slug}`;
      if (seen.has(url)) continue;
      seen.add(url);
      entries.push({
        url,
        changeFrequency: 'weekly',
        priority: 0.82,
        lastModified,
      });
    }

    for (const slug of knowledgeRouteSlugs) {
      if (guideSlugSet.has(slug)) continue;
      const url = `${siteUrl}/${locale}/routes/${slug}`;
      if (seen.has(url)) continue;
      seen.add(url);
      entries.push({
        url,
        changeFrequency: 'weekly',
        priority: 0.82,
        lastModified,
      });
    }

    for (const entry of documentTypeEntries) {
      const url = `${siteUrl}/${locale}/documents/${entry.slug}`;
      if (seen.has(url)) continue;
      seen.add(url);
      entries.push({
        url,
        changeFrequency: 'weekly',
        priority: 0.8,
        lastModified,
      });
    }

    for (const entry of issuingCountryEntries) {
      const url = `${siteUrl}/${locale}/issued-in/${entry.slug}`;
      if (seen.has(url)) continue;
      seen.add(url);
      entries.push({
        url,
        changeFrequency: 'weekly',
        priority: 0.78,
        lastModified,
      });
    }

    for (const entry of destinationCountryEntries) {
      const url = `${siteUrl}/${locale}/used-in/${entry.slug}`;
      if (seen.has(url)) continue;
      seen.add(url);
      entries.push({
        url,
        changeFrequency: 'weekly',
        priority: 0.78,
        lastModified,
      });
    }
  }

  const rootUrl = `${siteUrl}/`;
  if (!seen.has(rootUrl)) {
    seen.add(rootUrl);
    entries.push({
      url: rootUrl,
      changeFrequency: 'weekly',
      priority: 1,
      lastModified,
    });
  }

  return entries;
}
