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
import { localizedUrl } from '@/lib/i18n/locale';

const locales = ['en', 'zh'] as const;
const lastModified = new Date('2026-03-12T00:00:00.000Z');

function buildAlternates(path: string) {
  return {
    languages: {
      en: localizedUrl('en', siteUrl, path),
      zh: localizedUrl('zh', siteUrl, path),
      'x-default': localizedUrl('en', siteUrl, path),
    },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseRoutes = ['', '/services', '/services/apostille', '/services/legalisation', '/routes', '/intake', '/track', '/resources', '/samples', '/guides', '/faq', '/post-documents'];
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
      const url = localizedUrl(locale, siteUrl, route);
      if (seen.has(url)) continue;
      seen.add(url);
      entries.push({
        url,
        alternates: buildAlternates(route),
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
      const url = localizedUrl(locale, siteUrl, `/samples/${slug}`);
      if (seen.has(url)) continue;
      seen.add(url);
      entries.push({
        url,
        alternates: buildAlternates(`/samples/${slug}`),
        changeFrequency: 'monthly',
        priority: 0.65,
        lastModified,
      });
    }

    for (const slug of guideSlugs) {
      const url = localizedUrl(locale, siteUrl, `/guides/${slug}`);
      if (seen.has(url)) continue;
      seen.add(url);
      entries.push({
        url,
        alternates: buildAlternates(`/guides/${slug}`),
        changeFrequency: 'weekly',
        priority: 0.76,
        lastModified,
      });
    }

    for (const slug of faqSlugs) {
      const url = localizedUrl(locale, siteUrl, `/faq/${slug}`);
      if (seen.has(url)) continue;
      seen.add(url);
      entries.push({
        url,
        alternates: buildAlternates(`/faq/${slug}`),
        changeFrequency: 'monthly',
        priority: 0.72,
        lastModified,
      });
    }

    for (const slug of citySlugs) {
      const cityUrl = localizedUrl(locale, siteUrl, `/cities/${slug}`);
      if (!seen.has(cityUrl)) {
        seen.add(cityUrl);
        entries.push({
          url: cityUrl,
          alternates: buildAlternates(`/cities/${slug}`),
          changeFrequency: 'weekly',
          priority: 0.74,
          lastModified,
        });
      }
      const consularUrl = localizedUrl(locale, siteUrl, `/cities/${slug}/consular-authentication`);
      if (seen.has(consularUrl)) continue;
      seen.add(consularUrl);
      entries.push({
        url: consularUrl,
        alternates: buildAlternates(`/cities/${slug}/consular-authentication`),
        changeFrequency: 'weekly',
        priority: 0.73,
        lastModified,
      });
    }

    for (const route of priorityRoutes) {
      const url = localizedUrl(locale, siteUrl, `/routes/${route.slug}`);
      if (seen.has(url)) continue;
      seen.add(url);
      entries.push({
        url,
        alternates: buildAlternates(`/routes/${route.slug}`),
        changeFrequency: 'weekly',
        priority: 0.85,
        lastModified,
      });
    }

    for (const route of documentPriorityRoutes) {
      if (guideSlugSet.has(route.slug)) continue;
      const url = localizedUrl(locale, siteUrl, `/routes/${route.slug}`);
      if (seen.has(url)) continue;
      seen.add(url);
      entries.push({
        url,
        alternates: buildAlternates(`/routes/${route.slug}`),
        changeFrequency: 'weekly',
        priority: 0.82,
        lastModified,
      });
    }

    for (const slug of knowledgeRouteSlugs) {
      if (guideSlugSet.has(slug)) continue;
      const url = localizedUrl(locale, siteUrl, `/routes/${slug}`);
      if (seen.has(url)) continue;
      seen.add(url);
      entries.push({
        url,
        alternates: buildAlternates(`/routes/${slug}`),
        changeFrequency: 'weekly',
        priority: 0.82,
        lastModified,
      });
    }

    for (const entry of documentTypeEntries) {
      const url = localizedUrl(locale, siteUrl, `/documents/${entry.slug}`);
      if (seen.has(url)) continue;
      seen.add(url);
      entries.push({
        url,
        alternates: buildAlternates(`/documents/${entry.slug}`),
        changeFrequency: 'weekly',
        priority: 0.8,
        lastModified,
      });
    }

    for (const entry of issuingCountryEntries) {
      const url = localizedUrl(locale, siteUrl, `/issued-in/${entry.slug}`);
      if (seen.has(url)) continue;
      seen.add(url);
      entries.push({
        url,
        alternates: buildAlternates(`/issued-in/${entry.slug}`),
        changeFrequency: 'weekly',
        priority: 0.78,
        lastModified,
      });
    }

    for (const entry of destinationCountryEntries) {
      const url = localizedUrl(locale, siteUrl, `/used-in/${entry.slug}`);
      if (seen.has(url)) continue;
      seen.add(url);
      entries.push({
        url,
        alternates: buildAlternates(`/used-in/${entry.slug}`),
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
      alternates: buildAlternates(''),
      changeFrequency: 'weekly',
      priority: 1,
      lastModified,
    });
  }

  return entries;
}
