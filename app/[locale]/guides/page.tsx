import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { GuideCard } from '@/components/guides/GuideCard';
import { resolveLocale } from '@/lib/i18n/locale';
import { buildPageMetadata, siteUrl } from '@/lib/seo';
import { getAllGuides, getGuideCopy, type Guide } from '@/lib/guides';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);

  return buildPageMetadata({
    locale,
    path: '/guides',
    title: 'Guides | Editorial Resource Hub for Document Routes',
    description:
      'Curated guide section covering academic routes, personal documents, company documents, overseas-issued files for Australia, and practical route questions.',
    keywords: [
      'apostille guide australia',
      'document authentication guide',
      'my equals guide',
      'overseas documents australia guide',
    ],
  });
}

function isAcademicGuide(guide: Guide) {
  return (
    guide.guideType === 'university-my-equals' ||
    guide.documentTypes.some((entry) =>
      ['Degree Certificate', 'Academic Transcript', 'My eQuals Record', 'Testamur', 'Graduation Statement'].includes(entry),
    ) ||
    guide.slug.includes('degree') ||
    guide.slug.includes('transcript')
  );
}

function isPersonalGuide(guide: Guide) {
  return guide.documentTypes.some((entry) => ['Birth Certificate', 'Marriage Certificate', 'Police Check'].includes(entry));
}

function isCompanyGuide(guide: Guide) {
  return guide.routeCategory === 'company' || guide.documentTypes.some((entry) => entry.toLowerCase().includes('company'));
}

function isInboundGuide(guide: Guide) {
  return guide.guideType === 'overseas-to-australia';
}

function isRouteQuestionGuide(guide: Guide) {
  return [
    'dfat-authentication-of-university-degree-and-transcript',
    'my-equals-degree-and-transcript-review-path',
    'overseas-issued-documents-for-use-in-australia',
  ].includes(guide.slug);
}

function uniqueBySlug(guides: Guide[]) {
  const seen = new Set<string>();
  return guides.filter((guide) => {
    if (seen.has(guide.slug)) return false;
    seen.add(guide.slug);
    return true;
  });
}

function buildThematicSections(allGuides: Guide[]) {
  return [
    {
      id: 'academic-documents',
      title: 'Academic documents',
      description: 'University, degree, transcript, and My eQuals route guides.',
      guides: uniqueBySlug(allGuides.filter(isAcademicGuide)).slice(0, 6),
    },
    {
      id: 'personal-documents',
      title: 'Personal documents',
      description: 'Birth, marriage, and police-check guides for overseas use.',
      guides: uniqueBySlug(allGuides.filter(isPersonalGuide)).slice(0, 6),
    },
    {
      id: 'company-documents',
      title: 'Company documents',
      description: 'Corporate record and company-document guides for cross-border use.',
      guides: uniqueBySlug(allGuides.filter(isCompanyGuide)).slice(0, 6),
    },
    {
      id: 'overseas-issued',
      title: 'Overseas-issued documents for use in Australia',
      description: 'Inbound routes where the source-country chain matters first.',
      guides: uniqueBySlug(allGuides.filter(isInboundGuide)).slice(0, 6),
    },
    {
      id: 'route-questions',
      title: 'Route questions and review paths',
      description: 'Broader route-framing guides tied closely to route check and FAQ use.',
      guides: uniqueBySlug(allGuides.filter(isRouteQuestionGuide)).slice(0, 6),
    },
  ].filter((section) => section.guides.length > 0) as Array<{
    id: string;
    title: string;
    description: string;
    guides: Guide[];
  }>;
}

function buildCountrySections(allGuides: Guide[]) {
  const orderedCountries = ['Australia', 'Singapore', 'United States', 'United Kingdom'];
  const mapped = orderedCountries
    .map((country) => ({
      id: `country-${country.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      title: country,
      guides: uniqueBySlug(allGuides.filter((guide) => guide.issuingCountry === country)).slice(0, 4),
    }))
    .filter((section) => section.guides.length > 0);
  const known = new Set(orderedCountries);
  const otherGuides = uniqueBySlug(
    allGuides.filter((guide) => guide.issuingCountry && !known.has(guide.issuingCountry)),
  ).slice(0, 4);

  return otherGuides.length
    ? [...mapped, { id: 'country-others', title: 'Others', guides: otherGuides }]
    : mapped;
}

export default async function GuidesIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  const allGuides = getAllGuides();
  const featuredGuides = allGuides.filter((guide) => guide.featured);
  const primaryFeatured =
    allGuides.find((guide) => guide.slug === 'australian-birth-certificate-for-overseas-use') ||
    featuredGuides[0] ||
    allGuides[0];
  const secondaryFeatured = featuredGuides.filter((guide) => guide.slug !== primaryFeatured.slug).slice(0, 4);
  const hiddenSlugs = new Set([primaryFeatured.slug, ...secondaryFeatured.map((guide) => guide.slug)]);
  const thematicSections = buildThematicSections(allGuides.filter((guide) => !hiddenSlugs.has(guide.slug)));
  const primaryNav = [
    { label: 'Home', href: `/${locale}` },
    { label: 'Featured', href: '#featured-guides' },
    { label: 'FAQ', href: `/${locale}/faq` },
    { label: 'Begin Intake', href: `/${locale}/intake` },
  ];
  const fileTypeNav = [
    { label: 'Academic', href: '#academic-documents' },
    { label: 'Personal', href: '#personal-documents' },
    { label: 'Company', href: '#company-documents' },
  ];
  const countrySections = buildCountrySections(allGuides.filter((guide) => !hiddenSlugs.has(guide.slug)));
  const countryNav = countrySections.map((section) => ({
    label: section.title,
    href: `#${section.id}`,
  }));

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'EGS Guides',
    url: `${siteUrl}/${locale}/guides`,
    description:
      'Editorial-style guide section for academic records, personal documents, company documents, overseas-issued documents, and route review topics.',
  };
  const primaryFeaturedVisual = primaryFeatured.heroImage || null;

  return (
    <Container>
      <Section>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
        />

        <div className="guides-index-shell stack-lg">
          <Card className="card-main guides-index-hero">
            <div className="stack-md">
              <p className="kicker">Guides</p>
              <h1>Apostille and authentication guides for document use and route review</h1>
              <p className="body-text">
                Practical guides grouped by scenario, document family, and issuing country before you move into route check or intake.
              </p>
              <div className="guides-nav-stack">
                <nav className="guides-anchor-row" aria-label="Primary guides navigation">
                  {primaryNav.map((item) => (
                    <Link className={`guides-anchor-pill${item.label === 'Home' ? ' guides-anchor-pill-home' : ''}`} href={item.href} key={item.label}>
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <div className="guides-filter-row" aria-label="Browse guides by file type">
                  <span className="guides-filter-label">By file type</span>
                  <div className="guides-anchor-row">
                    {fileTypeNav.map((item) => (
                      <Link className="guides-anchor-pill" href={item.href} key={item.label}>
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
                {countryNav.length ? (
                  <div className="guides-filter-row" aria-label="Browse guides by country">
                    <span className="guides-filter-label">By country</span>
                    <div className="guides-anchor-row">
                      {countryNav.map((item) => (
                        <Link className="guides-anchor-pill" href={item.href} key={item.label}>
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </Card>

          {primaryFeatured ? (
            <section className="guides-editorial-lead" id="featured-guides">
              <Card className="card-main guides-lead-card">
                <div className="guides-lead-split">
                  <div className="stack-md">
                    <p className="kicker">Featured guide</p>
                    <h2 className="guides-lead-title">
                      <Link href={`/${locale}/guides/${primaryFeatured.slug}`}>{getGuideCopy(locale, primaryFeatured.title)}</Link>
                    </h2>
                    <p className="small-text guides-lead-summary">{getGuideCopy(locale, primaryFeatured.excerpt)}</p>
                    <ul className="guide-card-tags" aria-label="Featured guide tags">
                      {[primaryFeatured.issuingCountry, primaryFeatured.destinationCountry, primaryFeatured.documentTypes[0], primaryFeatured.guideType === 'university-my-equals' ? 'My eQuals' : primaryFeatured.routeCategory]
                        .filter(Boolean)
                        .slice(0, 4)
                        .map((tag) => (
                          <li className="guide-card-tag" key={tag}>
                            <span>{tag}</span>
                          </li>
                        ))}
                    </ul>
                    <div className="guide-card-actions" role="group" aria-label="Featured guide actions">
                      <Link className="guide-card-action-primary" href={`/${locale}/guides/${primaryFeatured.slug}`}>
                        Open guide
                      </Link>
                      <Link className="guide-card-action-secondary" href={`/${locale}/intake`}>
                        Begin intake
                      </Link>
                    </div>
                  </div>
                  <figure className="guides-featured-preview">
                    {primaryFeaturedVisual ? (
                      <div
                        className={`guides-featured-preview-frame ${primaryFeatured.heroImageWatermarked ? 'guides-featured-preview-frame-watermarked' : ''}`}
                      >
                        <Image
                          alt={getGuideCopy(locale, primaryFeatured.title)}
                          className="guides-featured-preview-image"
                          height={900}
                          src={primaryFeaturedVisual}
                          width={720}
                        />
                      </div>
                    ) : (
                      <div className="guides-featured-preview-fallback" />
                    )}
                    <figcaption className="guides-featured-preview-caption">
                      <strong>Featured reference</strong>
                      <span>
                        A high-intent document guide selected as the main entry point for this section.
                      </span>
                    </figcaption>
                  </figure>
                </div>
              </Card>

              <div className="guides-secondary-rail">
                {secondaryFeatured.map((guide) => (
                  <GuideCard compact guide={guide} key={guide.slug} locale={locale} />
                ))}
              </div>
            </section>
          ) : null}

          <section className="guides-index-section" aria-labelledby="browse-guides-heading">
            <div className="guides-section-head">
              <div className="stack-xs">
                <p className="kicker">Browse</p>
                <h2 id="browse-guides-heading">Browse guides by category</h2>
              </div>
              <p className="small-text">A smaller set of organised buckets, grouped by file family and route type.</p>
            </div>
            <div className="guides-bucket-grid">
              {thematicSections.map((section) => (
                <div id={section.id} key={section.id}>
                  <Card className="card-main guides-bucket-card">
                    <div className="stack-md">
                      <div className="stack-xs">
                        <p className="kicker">Section</p>
                        <h3>{section.title}</h3>
                        <p className="small-text">{section.description}</p>
                      </div>
                      <div className="guide-card-list">
                        {section.guides.slice(0, 3).map((guide) => (
                          <GuideCard compact guide={guide} key={guide.slug} locale={locale} />
                        ))}
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </section>

          {countrySections.length ? (
            <section className="guides-index-section" aria-labelledby="browse-guides-country-heading">
              <div className="guides-section-head">
                <div className="stack-xs">
                  <p className="kicker">Browse</p>
                  <h2 id="browse-guides-country-heading">Browse guides by country</h2>
                </div>
                <p className="small-text">Grouped by issuing country so the route context is easier to scan.</p>
              </div>
              <div className="guides-bucket-grid">
                {countrySections.map((section) => (
                  <div id={section.id} key={section.id}>
                    <Card className="card-main guides-bucket-card">
                      <div className="stack-md">
                        <div className="stack-xs">
                          <p className="kicker">Country</p>
                          <h3>{section.title}</h3>
                        </div>
                        <div className="guide-card-list">
                          {section.guides.slice(0, 3).map((guide) => (
                            <GuideCard compact guide={guide} key={guide.slug} locale={locale} />
                          ))}
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          <Card className="card-main guides-index-cta">
            <div className="guides-cta-grid">
              <div className="stack-sm">
                <p className="kicker">Next step</p>
                <h2>Move from browsing into route review</h2>
                <p className="small-text">
                  If the document is already in hand, route check and intake usually matter more than reading another generic page.
                </p>
              </div>
              <div className="guides-cta-actions">
                <Link className="btn btn-secondary" href={`/${locale}#route-checker`}>
                  Check My Route
                </Link>
                <Link className="btn btn-secondary" href={`/${locale}/faq`}>
                  FAQ Hub
                </Link>
                <Link className="btn btn-primary" href={`/${locale}/intake`}>
                  Begin Intake
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </Section>
    </Container>
  );
}
