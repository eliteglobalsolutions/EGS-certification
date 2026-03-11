import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { GuideConversionSection } from '@/components/guides/GuideConversionSection';
import { GuideCard } from '@/components/guides/GuideCard';
import { AcademicSupportGraphic } from '@/components/guides/AcademicSupportGraphic';
import { PdfReferencePreview } from '@/components/guides/PdfReferencePreview';
import { resolveLocale } from '@/lib/i18n/locale';
import { buildPageMetadata, siteUrl } from '@/lib/seo';
import {
  getAllGuides,
  getGuideBySlug,
  getGuideCopy,
  getGuideImage,
  getGuideRelated,
  getGuideSlugs,
} from '@/lib/guides';
import { getDocumentPriorityRoute } from '@/lib/document-priority-routes-data';
import { getKnowledgeRoute } from '@/lib/knowledge-routes';
import { getPriorityRoute } from '@/lib/priority-routes-data';
import { getRelatedFaqsForGuide } from '@/lib/knowledge-faqs';
import { getSampleBySlug } from '@/lib/sample-library';

export async function generateStaticParams() {
  const slugs = getGuideSlugs();
  return slugs.flatMap((slug) => [{ locale: 'en', slug }, { locale: 'zh', slug }]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  const locale = resolveLocale(localeParam);
  const guide = getGuideBySlug(slug);
  if (!guide) return {};

  return buildPageMetadata({
    locale,
    path: `/guides/${guide.slug}`,
    title: getGuideCopy(locale, guide.seoTitle),
    description: getGuideCopy(locale, guide.metaDescription),
    keywords: guide.keywords,
    type: 'article',
  });
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: localeParam, slug } = await params;
  const locale = resolveLocale(localeParam);
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const relatedGuides = getGuideRelated(guide);
  const additionalGuides = getAllGuides().filter((entry) => entry.slug !== guide.slug).slice(0, 6);
  const directRoute =
    getKnowledgeRoute(guide.slug) ||
    getDocumentPriorityRoute(guide.slug) ||
    getPriorityRoute(guide.slug);
  const relatedFaqs = getRelatedFaqsForGuide(
    {
      issuingCountry: guide.issuingCountry,
      destinationCountry: guide.destinationCountry,
      documentTypes: guide.documentTypes,
    },
    4,
  );
  const relatedSamples = (
    await Promise.all(guide.relatedSampleKeys.map((sampleSlug) => getSampleBySlug(sampleSlug)))
  ).filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: getGuideCopy(locale, guide.h1),
    description: getGuideCopy(locale, guide.metaDescription),
    author: {
      '@type': 'Organization',
      name: 'EGS Verification',
    },
    publisher: {
      '@type': 'Organization',
      name: 'EGS Verification',
    },
    url: `${siteUrl}/${locale}/guides/${guide.slug}`,
    mainEntityOfPage: `${siteUrl}/${locale}/guides/${guide.slug}`,
    datePublished: guide.publishedAt,
    articleSection: getGuideCopy(locale, guide.routeLabel),
    keywords: guide.keywords.join(', '),
  };

  const faqJsonLd =
    guide.faq.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: guide.faq.map((item) => ({
            '@type': 'Question',
            name: getGuideCopy(locale, item.question),
            acceptedAnswer: {
              '@type': 'Answer',
              text: getGuideCopy(locale, item.answer),
            },
          })),
        }
      : null;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: locale === 'zh' ? 'Home' : 'Home',
        item: `${siteUrl}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: locale === 'zh' ? 'Guides' : 'Guides',
        item: `${siteUrl}/${locale}/guides`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: getGuideCopy(locale, guide.title),
        item: `${siteUrl}/${locale}/guides/${guide.slug}`,
      },
    ],
  };

  const routeFramingSection =
    guide.guideType === 'overseas-to-australia'
      ? {
          title: locale === 'zh' ? 'How to read this route' : 'How to read this route',
          paragraphs: [
            locale === 'zh'
              ? 'When a document was issued outside Australia and is being used in Australia, the main certification question usually belongs to the issuing country first. Australia is commonly the destination, not the state that authenticates the origin of the foreign document after the fact.'
              : 'When a document was issued outside Australia and is being used in Australia, the main certification question usually belongs to the issuing country first. Australia is commonly the destination, not the state that authenticates the origin of the foreign document after the fact.',
            locale === 'zh'
              ? 'That is why this guide focuses on source-country handling, translation, and Australian receiver expectations together. The practical route is usually confirmed after review of the issuing country, the current document form, and the Australian filing purpose.'
              : 'That is why this guide focuses on source-country handling, translation, and Australian receiver expectations together. The practical route is usually confirmed after review of the issuing country, the current document form, and the Australian filing purpose.',
          ],
        }
      : {
          title: locale === 'zh' ? 'What apostille / authentication usually means here' : 'What apostille / authentication usually means here',
          paragraphs: [
            locale === 'zh'
              ? 'In broad terms, an apostille is used under the Hague Apostille Convention to authenticate the origin of an eligible public document for use in another participating jurisdiction. In Australian practice, DFAT handles apostilles and authentications for eligible documents, but that does not mean every file a client holds is automatically ready for that stage.'
              : 'In broad terms, an apostille is used under the Hague Apostille Convention to authenticate the origin of an eligible public document for use in another participating jurisdiction. In Australian practice, DFAT handles apostilles and authentications for eligible documents, but that does not mean every file a client holds is automatically ready for that stage.',
            locale === 'zh'
              ? 'The working issue is usually whether the document is the correct document class, whether it carries the right issuing structure, and whether the destination authority is actually asking for an apostille route, an authentication route, or some broader legalisation sequence. That is why this guide treats the route as review-led rather than keyword-led.'
              : 'The working issue is usually whether the document is the correct document class, whether it carries the right issuing structure, and whether the destination authority is actually asking for an apostille route, an authentication route, or some broader legalisation sequence. That is why this guide treats the route as review-led rather than keyword-led.',
          ],
        };

  return (
    <Container>
      <Section>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
        {faqJsonLd ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          />
        ) : null}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />

        <div className="guides-detail-layout">
          <article className="guides-detail-main stack-lg">
            <Card className="card-main guides-detail-hero">
              <div className="stack-md">
                <p className="kicker">{getGuideCopy(locale, guide.heroKicker)}</p>
                <div className="guides-detail-head">
                  <div className="stack-sm">
                    <h1>{getGuideCopy(locale, guide.h1)}</h1>
                    <p className="body-text">{getGuideCopy(locale, guide.excerpt)}</p>
                  </div>
                  {guide.guideType === 'university-my-equals' && !guide.heroPdf ? (
                    <AcademicSupportGraphic
                      emphasis="EGS-designed academic support graphic used instead of low-value school-logo imagery. It focuses on what customers usually need to review first."
                      subtitle="Typical university record review path"
                      title="Academic review support"
                    />
                  ) : guide.heroPdf ? (
                    <PdfReferencePreview
                      fileSrc={guide.heroPdf.src}
                      previewSrc={getGuideImage(guide.slug)}
                      previewImages={guide.heroPdf.previewImages}
                      pageCount={guide.heroPdf.pages}
                      title={getGuideCopy(locale, guide.title)}
                      watermarked={guide.heroPdf.watermarked}
                    />
                  ) : (
                    <div className={`guides-detail-hero-visual ${guide.heroImageWatermarked ? 'guides-detail-hero-visual-watermarked' : ''}`}>
                      <img
                        alt={getGuideCopy(locale, guide.title)}
                        className="guides-detail-hero-image"
                        src={getGuideImage(guide.slug)}
                      />
                    </div>
                  )}
                </div>

                <div className="guides-detail-metadata">
                  <span>{guide.issuingCountry}</span>
                  <span>{guide.destinationCountry}</span>
                  <span>{guide.documentTypes.join(', ')}</span>
                </div>

                <div className="stack-sm">
                  {guide.intro.map((paragraph) => (
                    <p className="small-text" key={paragraph.en}>
                      {getGuideCopy(locale, paragraph)}
                    </p>
                  ))}
                </div>

                <div className="actions">
                  <Link className="btn btn-secondary" href={`/${locale}#route-checker`}>
                    {locale === 'zh' ? 'Check My Route' : 'Check My Route'}
                  </Link>
                  <Link className="btn btn-primary" href={`/${locale}/intake`}>
                    {locale === 'zh' ? 'Begin Intake' : 'Begin Intake'}
                  </Link>
                </div>
              </div>
            </Card>

            <Card className="card-sub guide-article-card">
              <article className="guide-article-flow">
                <section className="guide-article-section">
                  <h2>{locale === 'zh' ? 'Key points summary' : 'Key points summary'}</h2>
                  <ul className="samples-bullet-list">
                    {guide.summaryPoints.map((point) => (
                      <li key={point.en}>{getGuideCopy(locale, point)}</li>
                    ))}
                  </ul>
                </section>

                <section className="guide-article-section">
                  <h2>{routeFramingSection.title}</h2>
                  {routeFramingSection.paragraphs.map((item) => (
                    <p className="small-text" key={item}>
                      {item}
                    </p>
                  ))}
                </section>

                <section className="guide-article-section">
                  <h2>{locale === 'zh' ? 'Who this guide is for' : 'Who this guide is for'}</h2>
                  <ul className="samples-bullet-list">
                    {guide.whoThisGuideIsFor.map((item) => (
                      <li key={item.en}>{getGuideCopy(locale, item)}</li>
                    ))}
                  </ul>
                </section>

                <section className="guide-article-section">
                  <h2>{locale === 'zh' ? 'What this document or record usually is' : 'What this document or record usually is'}</h2>
                  {guide.documentRecordNotes.map((item) => (
                    <p className="small-text" key={item.en}>
                      {getGuideCopy(locale, item)}
                    </p>
                  ))}
                  <h3>{locale === 'zh' ? 'Common document types covered' : 'Common document types covered'}</h3>
                  <ul className="samples-bullet-list">
                    {guide.commonDocumentTypesCovered.map((item) => (
                      <li key={item.en}>{getGuideCopy(locale, item)}</li>
                    ))}
                  </ul>
                </section>

                <section className="guide-article-section">
                  <h2>{getGuideCopy(locale, guide.routeOverview.heading)}</h2>
                  {guide.routeOverview.paragraphs.map((item) => (
                    <p className="small-text" key={item.en}>
                      {getGuideCopy(locale, item)}
                    </p>
                  ))}
                  {guide.routeOverview.bullets?.length ? (
                    <ul className="samples-bullet-list">
                      {guide.routeOverview.bullets.map((item) => (
                        <li key={item.en}>{getGuideCopy(locale, item)}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>

                <section className="guide-article-section">
                  <h2>{locale === 'zh' ? 'What we usually need before review' : 'What we usually need before review'}</h2>
                  <ul className="samples-bullet-list">
                    {guide.requirements.map((item) => (
                      <li key={item.en}>{getGuideCopy(locale, item)}</li>
                    ))}
                  </ul>
                </section>

                {guide.officialLinks?.length ? (
                  <section className="guide-article-section">
                    <h2>{locale === 'zh' ? 'Official application links' : 'Official application links'}</h2>
                    <p className="small-text">
                      {locale === 'zh'
                        ? '以下是与当前文件路径最相关的官方页面。申请前应先核对当前规则、文件格式和受理要求。'
                        : 'These are the official pages most relevant to this document path. Review the current rules, document format, and acceptance requirements before proceeding.'}
                    </p>
                    <div className="guides-link-list">
                      {guide.officialLinks.map((link) => (
                        <a href={link.url} key={link.url} rel="noreferrer" target="_blank">
                          {getGuideCopy(locale, link.label)}
                        </a>
                      ))}
                    </div>
                  </section>
                ) : null}

                {guide.digitalDocumentNotes?.length ? (
                  <section className="guide-article-section">
                    <h2>{locale === 'zh' ? 'Digital / My eQuals notes' : 'Digital / My eQuals notes'}</h2>
                    {guide.digitalDocumentNotes.map((item) => (
                      <p className="small-text" key={item.en}>
                        {getGuideCopy(locale, item)}
                      </p>
                    ))}
                  </section>
                ) : null}

                {guide.originalDocumentNotes?.length ? (
                  <section className="guide-article-section">
                    <h2>{locale === 'zh' ? 'Original hard-copy notes' : 'Original hard-copy notes'}</h2>
                    {guide.originalDocumentNotes.map((item) => (
                      <p className="small-text" key={item.en}>
                        {getGuideCopy(locale, item)}
                      </p>
                    ))}
                  </section>
                ) : null}

                {guide.reportSections.map((section) => (
                  <section className="guide-article-section" key={section.heading.en}>
                    <h2>{getGuideCopy(locale, section.heading)}</h2>
                    {section.paragraphs.map((item) => (
                      <p className="small-text" key={item.en}>
                        {getGuideCopy(locale, item)}
                      </p>
                    ))}
                    {section.bullets?.length ? (
                      <ul className="samples-bullet-list">
                        {section.bullets.map((item) => (
                          <li key={item.en}>{getGuideCopy(locale, item)}</li>
                        ))}
                      </ul>
                    ) : null}
                  </section>
                ))}

                <section className="guide-article-section">
                  <h2>{locale === 'zh' ? 'Common rejection risks or review flags' : 'Common rejection risks or review flags'}</h2>
                  <ul className="samples-bullet-list">
                    {guide.commonRisks.map((item) => (
                      <li key={item.en}>{getGuideCopy(locale, item)}</li>
                    ))}
                  </ul>
                </section>

                <section className="guide-article-section">
                  <h2>{locale === 'zh' ? 'What customers should prepare before intake' : 'What customers should prepare before intake'}</h2>
                  <ul className="samples-bullet-list">
                    {guide.conversion.prepareBeforeIntake.map((item) => (
                      <li key={item.en}>{getGuideCopy(locale, item)}</li>
                    ))}
                  </ul>
                </section>

                <section className="guide-article-section">
                  <h2>{locale === 'zh' ? 'Timeline notes' : 'Timeline notes'}</h2>
                  {guide.timelineNotes.map((item) => (
                    <p className="small-text" key={item.en}>
                      {getGuideCopy(locale, item)}
                    </p>
                  ))}
                </section>

                <section className="guide-article-section">
                  <h2>{locale === 'zh' ? 'Fee notes' : 'Fee notes'}</h2>
                  {guide.feeNotes.map((item) => (
                    <p className="small-text" key={item.en}>
                      {getGuideCopy(locale, item)}
                    </p>
                  ))}
                </section>

                <section className="guide-article-section">
                  <h2>{locale === 'zh' ? 'When extra steps may be required' : 'When extra steps may be required'}</h2>
                  <ul className="samples-bullet-list">
                    {guide.extraStepNotes.map((item) => (
                      <li key={item.en}>{getGuideCopy(locale, item)}</li>
                    ))}
                  </ul>
                </section>
              </article>
            </Card>

            <GuideConversionSection guide={guide} locale={locale} />

            {relatedSamples.length ? (
              <Card className="card-sub guide-report-card">
                <div className="stack-sm">
                  <h2>{locale === 'zh' ? 'Related sample library items' : 'Related sample library items'}</h2>
                  <div className="guide-sample-grid">
                    {relatedSamples.map((sample) => (
                      <Link className="guide-sample-card" href={`/${locale}/samples/${sample.slug}`} key={sample.slug}>
                        {sample.thumb_path ? (
                          <img alt={sample.altText} className="guide-sample-thumb" src={sample.thumb_path} />
                        ) : null}
                        <strong>{sample.sampleTitle}</strong>
                        <span>{sample.routeDescription}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </Card>
            ) : null}

            {relatedFaqs.length ? (
              <Card className="card-sub guide-report-card">
                <div className="stack-sm">
                  <h2>{locale === 'zh' ? 'Related FAQs' : 'Related FAQs'}</h2>
                  <div className="guides-link-list">
                    {relatedFaqs.map((faq) => (
                      <Link href={`/${locale}/faq/${faq.slug}`} key={faq.slug}>
                        {faq.question.en}
                      </Link>
                    ))}
                  </div>
                </div>
              </Card>
            ) : null}

            {(relatedGuides.length || directRoute) ? (
              <Card className="card-sub guide-report-card">
                <div className="stack-sm">
                  <h2>{locale === 'zh' ? 'Related guides and routes' : 'Related guides and routes'}</h2>
                  <div className="guides-link-list">
                    {relatedGuides.map((entry) => (
                      <Link href={`/${locale}/guides/${entry.slug}`} key={entry.slug}>
                        {getGuideCopy(locale, entry.title)}
                      </Link>
                    ))}
                    {directRoute ? (
                      <Link href={`/${locale}/routes/${guide.slug}`}>
                        {locale === 'zh' ? 'Related route page' : 'Related route page'}
                      </Link>
                    ) : null}
                    {relatedSamples.length ? (
                      <Link href={`/${locale}/samples/${relatedSamples[0].slug}`}>
                        {locale === 'zh' ? 'View sample format' : 'View sample format'}
                      </Link>
                    ) : null}
                  </div>
                </div>
              </Card>
            ) : null}

            <Card className="card-sub guide-report-card">
              <div className="stack-sm">
                <h2>{locale === 'zh' ? 'Frequently asked questions' : 'Frequently asked questions'}</h2>
                <div className="guides-faq-list">
                  {guide.faq.map((item) => (
                    <div className="guides-faq-item" key={item.question.en}>
                      <h3>{getGuideCopy(locale, item.question)}</h3>
                      <p className="small-text">{getGuideCopy(locale, item.answer)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="card-sub guide-report-card guide-disclaimer-card">
              <div className="stack-sm">
                <h2>{locale === 'zh' ? 'Compliance note' : 'Compliance note'}</h2>
                <p className="small-text">{getGuideCopy(locale, guide.disclaimer)}</p>
              </div>
            </Card>
          </article>

          <aside className="guides-detail-sidebar stack-md">
            <Card className="card-sub guides-sidebar-card">
              <div className="stack-sm">
                <p className="kicker">{locale === 'zh' ? 'Guide profile' : 'Guide profile'}</p>
                <h2>{locale === 'zh' ? 'Quick reference' : 'Quick reference'}</h2>
                <div className="guides-sidebar-meta">
                  <div>
                    <strong>{locale === 'zh' ? 'Route type' : 'Route type'}</strong>
                    <span>{getGuideCopy(locale, guide.routeLabel)}</span>
                  </div>
                  <div>
                    <strong>{locale === 'zh' ? 'Issuing country' : 'Issuing country'}</strong>
                    <span>{guide.issuingCountry}</span>
                  </div>
                  <div>
                    <strong>{locale === 'zh' ? 'Destination' : 'Destination'}</strong>
                    <span>{guide.destinationCountry}</span>
                  </div>
                </div>
                <div className="footer-links">
                  <Link href={`/${locale}#route-checker`}>{locale === 'zh' ? 'Check My Route' : 'Check My Route'}</Link>
                  <Link href={`/${locale}/intake`}>{locale === 'zh' ? 'Begin Intake' : 'Begin Intake'}</Link>
                  <Link href={`/${locale}/samples`}>{locale === 'zh' ? 'Sample Library' : 'Sample Library'}</Link>
                </div>
              </div>
            </Card>

            {relatedGuides.length ? (
              <Card className="card-sub guides-sidebar-card">
                <div className="stack-sm">
                  <h2>{locale === 'zh' ? 'Related guides' : 'Related guides'}</h2>
                  <div className="guides-link-list">
                    {relatedGuides.map((entry) => (
                      <Link href={`/${locale}/guides/${entry.slug}`} key={entry.slug}>
                        {getGuideCopy(locale, entry.title)}
                      </Link>
                    ))}
                  </div>
                </div>
              </Card>
            ) : null}

            {relatedFaqs.length ? (
              <Card className="card-sub guides-sidebar-card">
                <div className="stack-sm">
                  <h2>{locale === 'zh' ? 'Related FAQs' : 'Related FAQs'}</h2>
                  <div className="guides-link-list">
                    {relatedFaqs.slice(0, 3).map((faq) => (
                      <Link href={`/${locale}/faq/${faq.slug}`} key={faq.slug}>
                        {faq.question.en}
                      </Link>
                    ))}
                  </div>
                </div>
              </Card>
            ) : null}
          </aside>
        </div>

        <section className="guides-index-section stack-md">
          <div className="guides-section-head">
            <div className="stack-xs">
              <p className="kicker">{locale === 'zh' ? 'Continue exploring' : 'Continue exploring'}</p>
              <h2>{locale === 'zh' ? 'More route reports' : 'More route reports'}</h2>
            </div>
          </div>
          <div className="guide-card-list">
            {additionalGuides.slice(0, 3).map((entry) => (
              <GuideCard compact guide={entry} key={entry.slug} locale={locale} />
            ))}
          </div>
        </section>
      </Section>
    </Container>
  );
}
