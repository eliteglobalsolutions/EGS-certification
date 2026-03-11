'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { KnowledgeFaq } from '@/lib/knowledge-faqs';

type Bucket = {
  label: string;
  faqs: KnowledgeFaq[];
};

export function FaqHubClient({
  locale,
  faqs,
  categorySections,
  documentBuckets,
  issuingBuckets,
  destinationBuckets,
  routeTypeBuckets,
}: {
  locale: 'en' | 'zh';
  faqs: KnowledgeFaq[];
  categorySections: Array<{ id: string; label: string; faqs: KnowledgeFaq[] }>;
  documentBuckets: Bucket[];
  issuingBuckets: Bucket[];
  destinationBuckets: Bucket[];
  routeTypeBuckets: Bucket[];
}) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return faqs;

    return faqs.filter((faq) => {
      return (
        faq.question.en.toLowerCase().includes(normalized) ||
        faq.shortAnswer.en.toLowerCase().includes(normalized) ||
        faq.keywords.some((keyword) => keyword.toLowerCase().includes(normalized)) ||
        faq.documentType.some((entry) => entry.toLowerCase().includes(normalized)) ||
        faq.issuingCountry.some((entry) => entry.toLowerCase().includes(normalized)) ||
        faq.destinationCountry.some((entry) => entry.toLowerCase().includes(normalized))
      );
    });
  }, [faqs, query]);

  return (
    <div className="faq-shell stack-lg">
      <section className="section-card stack-md faq-search-card">
        <div className="stack-sm">
          <p className="kicker">{locale === 'zh' ? 'Search FAQ' : 'Search FAQ'}</p>
          <h2>{locale === 'zh' ? 'Find the closest route question first' : 'Find the closest route question first'}</h2>
          <p className="small-text">
            {locale === 'zh'
              ? 'Search by document, country, or route wording. The answers stay conditional and route-based.'
              : 'Search by document, country, or route wording. The answers stay conditional and route-based.'}
          </p>
        </div>
        <input
          className="input"
          onChange={(event) => setQuery(event.target.value)}
          placeholder={locale === 'zh' ? 'Search: birth certificate, My eQuals, DFAT, Hong Kong...' : 'Search: birth certificate, My eQuals, DFAT, Hong Kong...'}
          value={query}
        />
        <div className="faq-chip-row">
          <a className="faq-chip" href="#faq-by-category">{locale === 'zh' ? 'By category' : 'By category'}</a>
          <a className="faq-chip" href="#faq-by-document">{locale === 'zh' ? 'By document type' : 'By document type'}</a>
          <a className="faq-chip" href="#faq-by-country">{locale === 'zh' ? 'By country' : 'By country'}</a>
          <a className="faq-chip" href="#faq-by-route">{locale === 'zh' ? 'By route type' : 'By route type'}</a>
        </div>
      </section>

      {query ? (
        <section className="stack-md" id="faq-search-results">
          <div className="guides-section-head">
            <div className="stack-xs">
              <p className="kicker">{locale === 'zh' ? 'Search results' : 'Search results'}</p>
              <h2>{locale === 'zh' ? 'Matched questions' : 'Matched questions'}</h2>
            </div>
          </div>
          <div className="faq-card-grid">
            {filtered.map((faq) => (
              <FaqCard faq={faq} key={faq.slug} locale={locale} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="stack-md" id="faq-by-category">
        <div className="guides-section-head">
          <div className="stack-xs">
            <p className="kicker">{locale === 'zh' ? 'Categories' : 'Categories'}</p>
            <h2>{locale === 'zh' ? 'Browse by category' : 'Browse by category'}</h2>
          </div>
        </div>
        <div className="faq-bucket-grid">
          {categorySections.map((section) => (
            <div className="section-card faq-bucket-card stack-sm" key={section.id}>
              <h3>{section.label}</h3>
              <div className="guides-link-list">
                {section.faqs.map((faq) => (
                  <Link href={`/${locale}/faq/${faq.slug}`} key={faq.slug}>
                    {faq.question.en}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="stack-md" id="faq-by-document">
        <div className="guides-section-head">
          <div className="stack-xs">
            <p className="kicker">{locale === 'zh' ? 'Document type' : 'Document type'}</p>
            <h2>{locale === 'zh' ? 'Browse by document type' : 'Browse by document type'}</h2>
          </div>
        </div>
        <BucketList buckets={documentBuckets} locale={locale} />
      </section>

      <section className="stack-md" id="faq-by-country">
        <div className="guides-section-head">
          <div className="stack-xs">
            <p className="kicker">{locale === 'zh' ? 'Country' : 'Country'}</p>
            <h2>{locale === 'zh' ? 'Browse by issuing and destination country' : 'Browse by issuing and destination country'}</h2>
          </div>
        </div>
        <div className="faq-bucket-grid">
          <BucketBlock buckets={issuingBuckets} title={locale === 'zh' ? 'By issuing country' : 'By issuing country'} />
          <BucketBlock buckets={destinationBuckets} title={locale === 'zh' ? 'By destination country' : 'By destination country'} />
        </div>
      </section>

      <section className="stack-md" id="faq-by-route">
        <div className="guides-section-head">
          <div className="stack-xs">
            <p className="kicker">{locale === 'zh' ? 'Route type' : 'Route type'}</p>
            <h2>{locale === 'zh' ? 'Browse by route logic' : 'Browse by route logic'}</h2>
          </div>
        </div>
        <BucketList buckets={routeTypeBuckets} locale={locale} />
      </section>
    </div>
  );
}

function BucketList({ buckets, locale }: { buckets: Bucket[]; locale: 'en' | 'zh' }) {
  return (
    <div className="faq-bucket-grid">
      {buckets.filter((bucket) => bucket.faqs.length > 0).map((bucket) => (
        <div className="section-card faq-bucket-card stack-sm" key={bucket.label}>
          <h3>{bucket.label}</h3>
          <div className="guides-link-list">
            {bucket.faqs.map((faq) => (
              <Link href={`/${locale}/faq/${faq.slug}`} key={faq.slug}>
                {faq.question.en}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function BucketBlock({ buckets, title }: { buckets: Bucket[]; title: string }) {
  return (
    <div className="section-card faq-bucket-card stack-sm">
      <h3>{title}</h3>
      <div className="faq-chip-row">
        {buckets.filter((bucket) => bucket.faqs.length > 0).map((bucket) => (
          <span className="faq-chip faq-chip-static" key={bucket.label}>
            {bucket.label} ({bucket.faqs.length})
          </span>
        ))}
      </div>
    </div>
  );
}

function FaqCard({ faq, locale }: { faq: KnowledgeFaq; locale: 'en' | 'zh' }) {
  return (
    <article className="section-card faq-card stack-sm">
      <p className="kicker">{faq.category}</p>
      <h3>
        <Link href={`/${locale}/faq/${faq.slug}`}>{faq.question.en}</Link>
      </h3>
      <p className="small-text">{faq.shortAnswer.en}</p>
      <div className="faq-chip-row">
        {faq.documentType.slice(0, 3).map((tag) => (
          <span className="faq-chip faq-chip-static" key={tag}>
            {tag}
          </span>
        ))}
      </div>
      <div className="footer-links">
        <Link href={`/${locale}/faq/${faq.slug}`}>{locale === 'zh' ? 'Open FAQ' : 'Open FAQ'}</Link>
        <Link href={`/${locale}#route-checker`}>{locale === 'zh' ? 'Check My Route' : 'Check My Route'}</Link>
      </div>
    </article>
  );
}
