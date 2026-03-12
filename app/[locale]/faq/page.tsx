import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { FaqHubClient } from '@/components/faq/FaqHubClient';
import { localizedPath, localizedUrl, resolveLocale } from '@/lib/i18n/locale';
import { buildPageMetadata, siteUrl } from '@/lib/seo';
import { getFaqIndexSections, getFaqs } from '@/lib/knowledge-faqs';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);

  return buildPageMetadata({
    locale,
    path: '/faq',
    title: 'FAQ | Apostille, Authentication, My eQuals, and Route Questions',
    description:
      'FAQ hub covering apostille vs authentication, DFAT, My eQuals, Australian documents for overseas use, overseas-issued documents for Australia, and intake-first route questions.',
    keywords: [
      'apostille faq australia',
      'authentication faq australia',
      'my equals faq',
      'dfat legalisation faq',
    ],
    type: 'website',
  });
}

export default async function FaqHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  const faqs = getFaqs();
  const sections = getFaqIndexSections();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'EGS FAQ Hub',
    url: localizedUrl(locale, siteUrl, '/faq'),
    description:
      'Knowledge base hub for apostille, authentication, education documents, overseas-issued documents, intake logic, and route warnings.',
  };

  return (
    <Container>
      <Section>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <div className="stack-lg">
          <Card className="card-main guides-index-hero">
            <div className="stack-md">
              <p className="kicker">{locale === 'zh' ? 'FAQ Hub' : 'FAQ Hub'}</p>
              <h1>
                {locale === 'zh'
                  ? 'Knowledge base for apostille, authentication, DFAT, My eQuals, and route questions'
                  : 'Knowledge base for apostille, authentication, DFAT, My eQuals, and route questions'}
              </h1>
              <p className="body-text">
                {locale === 'zh'
                  ? 'This hub is built for route clarity, not generic blogging. It answers high-frequency customer questions using conditional, review-based wording and links users into route check, intake, guides, and route pages.'
                  : 'This hub is built for route clarity, not generic blogging. It answers high-frequency customer questions using conditional, review-based wording and links users into route check, intake, guides, and route pages.'}
              </p>
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

          <FaqHubClient
            categorySections={sections.categories.map((section) => ({
              id: section.id,
              label: section.label.en,
              faqs: section.faqs,
            }))}
            destinationBuckets={sections.byDestinationCountry}
            documentBuckets={sections.byDocumentType}
            faqs={faqs}
            issuingBuckets={sections.byIssuingCountry}
            locale={locale}
            routeTypeBuckets={sections.byRouteType}
          />

          <Card className="card-main guides-index-cta">
            <div className="guides-cta-grid">
              <div className="stack-sm">
                <p className="kicker">{locale === 'zh' ? 'Conversion' : 'Conversion'}</p>
                <h2>{locale === 'zh' ? 'Move from FAQs into route review' : 'Move from FAQs into route review'}</h2>
                <p className="small-text">
                  {locale === 'zh'
                    ? 'If your question is already tied to a real file, route check and intake are usually more useful than reading one more generic answer.'
                    : 'If your question is already tied to a real file, route check and intake are usually more useful than reading one more generic answer.'}
                </p>
              </div>
              <div className="guides-cta-actions">
                <Link className="btn btn-secondary" href={localizedPath(locale, '/apostille-australia')}>
                  {locale === 'zh' ? '澳洲海牙认证' : 'Apostille Australia'}
                </Link>
                <Link className="btn btn-secondary" href={localizedPath(locale, '/used-in/china')}>
                  {locale === 'zh' ? '用于中国' : 'Used in China'}
                </Link>
                <Link className="btn btn-secondary" href={localizedPath(locale, '/guides')}>
                  {locale === 'zh' ? 'Guides' : 'Guides'}
                </Link>
                <Link className="btn btn-secondary" href={localizedPath(locale, '/routes')}>
                  {locale === 'zh' ? 'Route pages' : 'Route pages'}
                </Link>
                <Link className="btn btn-primary" href={localizedPath(locale, '/intake')}>
                  {locale === 'zh' ? 'Begin Intake' : 'Begin Intake'}
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </Section>
    </Container>
  );
}
