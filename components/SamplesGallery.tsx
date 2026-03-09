'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState, type KeyboardEvent } from 'react';
import type { EnrichedSampleRecord } from '@/lib/sample-library';

type SamplesGalleryText = {
  empty: string;
  previewTitle: string;
  openButton: string;
  groupDocumentType: string;
  groupIssuingCountry: string;
  clearFilters: string;
  detailCta: string;
  previewCaptionLabel: string;
  protectedLabel: string;
  selectPrompt: string;
};

function uniqueValues(items: EnrichedSampleRecord[], key: 'groupDocumentType' | 'issuingCountry' | 'groupDestination') {
  return Array.from(new Set(items.map((item) => item[key]))).sort((a, b) => a.localeCompare(b));
}

export function SamplesGallery({
  items,
  locale,
  text,
}: {
  items: EnrichedSampleRecord[];
  locale: string;
  text: SamplesGalleryText;
}) {
  const [country, setCountry] = useState('all');
  const [documentType, setDocumentType] = useState('');
  const [query, setQuery] = useState('');
  const [shielded, setShielded] = useState(false);

  const countries = useMemo(
    () => ['all', ...Array.from(new Set(items.map((i) => i.country))).sort()],
    [items]
  );
  const documentTypes = useMemo(() => uniqueValues(items, 'groupDocumentType'), [items]);
  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchesCountry = country === 'all' || item.country === country;
      const matchesDocumentType = !documentType || item.groupDocumentType === documentType;
      const haystack = `${item.sampleTitle} ${item.routeMetaLine} ${item.documentType} ${item.issuingCountry} ${item.destinationUse}`.toLowerCase();
      const matchesQuery = !query.trim() || haystack.includes(query.trim().toLowerCase());
      return matchesCountry && matchesDocumentType && matchesQuery;
    });
  }, [items, country, documentType, query]);

  const [selectedSlug, setSelectedSlug] = useState('');

  useEffect(() => {
    if (!filtered.length) {
      setSelectedSlug('');
      return;
    }

    if (!selectedSlug || !filtered.some((item) => item.slug === selectedSlug)) {
      setSelectedSlug(filtered[0].slug);
    }
  }, [filtered, selectedSlug]);

  const selected = filtered.find((item) => item.slug === selectedSlug) ?? null;

  const blockHotkeys = (e: KeyboardEvent<HTMLElement>) => {
    if (!selected) return;
    const key = e.key.toLowerCase();
    if ((e.metaKey || e.ctrlKey) && (key === 's' || key === 'p' || key === 'u')) {
      e.preventDefault();
    }
    if (key === 'printscreen') {
      e.preventDefault();
      setShielded(true);
    }
  };

  useEffect(() => {
    const onBlur = () => setShielded(true);
    const onFocus = () => setShielded(false);
    const onVisibility = () => setShielded(document.hidden);

    window.addEventListener('blur', onBlur);
    window.addEventListener('focus', onFocus);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      window.removeEventListener('blur', onBlur);
      window.removeEventListener('focus', onFocus);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  const clearFilters = () => {
    setCountry('all');
    setDocumentType('');
    setQuery('');
  };

  return (
    <div className="samples-shell stack-md">
      <div className="section-card samples-facet-card stack-sm">
        <input
          aria-label={locale === 'zh' ? '搜索样本' : 'Search samples'}
          className="samples-search-input"
          onChange={(event) => setQuery(event.target.value)}
          placeholder={locale === 'zh' ? '按国家、文件或目的地搜索' : 'Search by country, document, or destination'}
          type="search"
          value={query}
        />
        <div className="samples-facet-groups">
          <div className="samples-facet-group">
            <p className="kicker">{text.groupDocumentType}</p>
            <div className="samples-chip-row">
              {documentTypes.map((value) => (
                <button
                  className={`samples-chip ${documentType === value ? 'is-active' : ''}`}
                  key={value}
                  onClick={() => setDocumentType(documentType === value ? '' : value)}
                  type="button"
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
          <div className="samples-facet-group">
            <p className="kicker">{text.groupIssuingCountry}</p>
            <div className="samples-chip-row">
              {countries
                .filter((value) => value !== 'all')
                .map((value) => (
                  <button
                    className={`samples-chip ${country === value ? 'is-active' : ''}`}
                    key={value}
                    onClick={() => setCountry(country === value ? 'all' : value)}
                    type="button"
                  >
                    {value}
                  </button>
                ))}
            </div>
          </div>
        </div>
        <button className="samples-clear-link" onClick={clearFilters} type="button">
          {text.clearFilters}
        </button>
      </div>

      <section
        className="section-card samples-viewer-panel stack-sm"
        aria-label={text.previewTitle}
        onContextMenu={(e) => e.preventDefault()}
        onKeyDown={blockHotkeys}
      >
        {selected ? (
          <>
            <div className="samples-viewer-head">
              <div className="stack-xs">
                <h2>{selected.sampleTitle}</h2>
                <p className="small-text">{selected.routeMetaLine}</p>
              </div>
              <span className="small-text">{text.protectedLabel}</span>
            </div>
            <div className="samples-viewer-wrap">
              {selected.thumb_path ? (
                <img
                  alt={selected.altText}
                  className="samples-image-preview"
                  loading="lazy"
                  src={selected.thumb_path}
                />
              ) : (
                <iframe
                  className="samples-pdf-viewer"
                  src={`${selected.file_path}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                  title={selected.altText}
                  loading="lazy"
                />
              )}
              <div className="samples-guard-overlay" aria-hidden="true">
                <span>EGS EliteGlobalSolutions.co</span>
                <span>EGS EliteGlobalSolutions.co</span>
                <span>EGS EliteGlobalSolutions.co</span>
                <span>EGS EliteGlobalSolutions.co</span>
              </div>
              {shielded ? (
                <div className="samples-shield">
                  <p>Protected mode is active.</p>
                  <p className="small-text">Switch back to this tab and click resume to continue preview.</p>
                  <button className="btn btn-secondary" type="button" onClick={() => setShielded(false)}>
                    Resume preview
                  </button>
                </div>
              ) : null}
            </div>
            <div className="samples-caption stack-xs">
              <p className="small-text">{selected.routeDescription}</p>
              <div className="actions">
                <a
                  className="btn btn-secondary"
                  href={selected.file_path}
                  rel="noreferrer"
                  target="_blank"
                >
                  View full sample
                </a>
                <Link className="btn btn-secondary" href={`/${locale}/samples/${selected.slug}`}>
                  {text.detailCta}
                </Link>
                <Link className="btn btn-primary" href={`/${locale}/intake`}>
                  {text.openButton}
                </Link>
              </div>
            </div>
          </>
        ) : (
          <p className="small-text">{text.selectPrompt}</p>
        )}
      </section>
    </div>
  );
}
