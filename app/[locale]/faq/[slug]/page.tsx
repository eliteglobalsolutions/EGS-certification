import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { localizedPath, localizedUrl, resolveLocale } from '@/lib/i18n/locale';
import { buildPageMetadata, siteUrl } from '@/lib/seo';
import {
  getFaqBySlug,
  getFaqCopy,
  getFaqSlugs,
  getRelatedFaqsForGuide,
} from '@/lib/knowledge-faqs';

export async function generateStaticParams() {
  const slugs = getFaqSlugs();
  return slugs.flatMap((slug) => [{ locale: 'en', slug }, { locale: 'zh', slug }]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  const locale = resolveLocale(localeParam);
  const faq = getFaqBySlug(slug);
  if (!faq) return {};

  return buildPageMetadata({
    locale,
    path: `/faq/${slug}`,
    title: `${getFaqCopy(locale, faq.question)} | EGS FAQ`,
    description: getFaqCopy(locale, faq.shortAnswer),
    keywords: faq.keywords,
    type: 'article',
  });
}

export default async function FaqDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: localeParam, slug } = await params;
  const locale = resolveLocale(localeParam);
  const faq = getFaqBySlug(slug);
  if (!faq) notFound();

  const related = getRelatedFaqsForGuide(
    {
      issuingCountry: faq.issuingCountry[0],
      destinationCountry: faq.destinationCountry[0],
      documentTypes: faq.documentType,
    },
    4,
  ).filter((entry) => entry.slug !== faq.slug);

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: getFaqCopy(locale, faq.question),
        acceptedAnswer: {
          '@type': 'Answer',
          text: getFaqCopy(locale, faq.detailedAnswer),
        },
      },
    ],
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: localizedUrl(locale, siteUrl, '') },
      { '@type': 'ListItem', position: 2, name: 'FAQ', item: localizedUrl(locale, siteUrl, '/faq') },
      { '@type': 'ListItem', position: 3, name: getFaqCopy(locale, faq.question), item: localizedUrl(locale, siteUrl, `/faq/${faq.slug}`) },
    ],
  };

  return (
    <Container>
      <Section>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />

        <div className="guides-detail-layout">
          <article className="guides-detail-main stack-lg">
            <Card className="card-main guides-detail-hero">
              <div className="stack-md">
                <p className="kicker">{faq.category}</p>
                <h1>{getFaqCopy(locale, faq.question)}</h1>
                <p className="body-text">{getFaqCopy(locale, faq.shortAnswer)}</p>
                <div className="actions">
                  <Link className="btn btn-secondary" href={`${localizedPath(locale)}#route-checker`}>
                    {locale === 'zh' ? 'Check My Route' : 'Check My Route'}
                  </Link>
                  <Link className="btn btn-primary" href={localizedPath(locale, '/intake')}>
                    {locale === 'zh' ? 'Begin Intake' : 'Begin Intake'}
                  </Link>
                </div>
              </div>
            </Card>

            <Card className="card-sub guide-report-card">
              <div className="stack-sm">
                <h2>{locale === 'zh' ? 'Detailed answer' : 'Detailed answer'}</h2>
                <p className="small-text">{getFaqCopy(locale, faq.detailedAnswer)}</p>
              </div>
            </Card>

            <div className="guide-two-column-grid">
              <Card className="card-sub guide-report-card">
                <div className="stack-sm">
                  <h2>{locale === 'zh' ? 'Common risks' : 'Common risks'}</h2>
                  <ul className="samples-bullet-list">
                    {faq.commonRisks.map((entry) => (
                      <li key={entry.en}>{getFaqCopy(locale, entry)}</li>
                    ))}
                  </ul>
                </div>
              </Card>

              <Card className="card-sub guide-report-card">
                <div className="stack-sm">
                  <h2>{locale === 'zh' ? 'What we usually need' : 'What we usually need'}</h2>
                  <ul className="samples-bullet-list">
                    {faq.whatWeNeed.map((entry) => (
                      <li key={entry.en}>{getFaqCopy(locale, entry)}</li>
                    ))}
                  </ul>
                </div>
              </Card>
            </div>

            <Card className="card-sub guide-report-card">
              <div className="stack-sm">
                <h2>{locale === 'zh' ? 'Implementation note' : 'Implementation note'}</h2>
                <p className="small-text">{getFaqCopy(locale, faq.implementationNote)}</p>
              </div>
            </Card>

            <Card className="card-sub guide-report-card">
              <div className="stack-sm">
                <h2>{locale === 'zh' ? 'Related pages' : 'Related pages'}</h2>
                <div className="guides-link-list">
                  {faq.relatedPages.map((path) => (
                    <Link href={localizedPath(locale, path)} key={path}>
                      {path.replace(/^\//, '')}
                    </Link>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="card-sub guide-disclaimer-card">
              <div className="stack-sm">
                <h2>{locale === 'zh' ? 'Compliance note' : 'Compliance note'}</h2>
                <p className="small-text">{getFaqCopy(locale, faq.disclaimer)}</p>
              </div>
            </Card>
          </article>

          <aside className="guides-detail-sidebar stack-md">
            <Card className="card-sub guides-sidebar-card">
              <div className="stack-sm">
                <h2>{locale === 'zh' ? 'Route flags' : 'Route flags'}</h2>
                <div className="guides-sidebar-meta">
                  <div>
                    <strong>Requires notary</strong>
                    <span>{faq.requiresNotary}</span>
                  </div>
                  <div>
                    <strong>Requires DFAT</strong>
                    <span>{faq.requiresDfat}</span>
                  </div>
                  <div>
                    <strong>Embassy check</strong>
                    <span>{faq.requiresEmbassyCheck}</span>
                  </div>
                </div>
              </div>
            </Card>

            {related.length ? (
              <Card className="card-sub guides-sidebar-card">
                <div className="stack-sm">
                  <h2>{locale === 'zh' ? 'Related FAQs' : 'Related FAQs'}</h2>
                  <div className="guides-link-list">
                    {related.map((entry) => (
                      <Link href={localizedPath(locale, `/faq/${entry.slug}`)} key={entry.slug}>
                        {entry.question.en}
                      </Link>
                    ))}
                  </div>
                </div>
              </Card>
            ) : null}
          </aside>
        </div>
      </Section>
    </Container>
  );
}
