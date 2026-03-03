'use client';

import { useMemo, useState, type KeyboardEvent } from 'react';
import { useEffect } from 'react';

export type SampleRecord = {
  country: string;
  slug: string;
  title: string;
  file_path: string;
  reviewed: boolean;
  reviewed_by?: string | null;
  reviewed_at?: string | null;
  notes?: string | null;
};

type SamplesGalleryText = {
  searchLabel: string;
  searchPlaceholder: string;
  filterLabel: string;
  allCountries: string;
  empty: string;
  previewTitle: string;
  openButton: string;
  reviewedLabel: string;
};

export function SamplesGallery({
  items,
  text,
}: {
  items: SampleRecord[];
  text: SamplesGalleryText;
}) {
  const [query, setQuery] = useState('');
  const [country, setCountry] = useState('all');
  const [shielded, setShielded] = useState(false);
  const countries = useMemo(
    () => ['all', ...Array.from(new Set(items.map((i) => i.country))).sort()],
    [items]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesCountry = country === 'all' || item.country === country;
      const haystack = `${item.title} ${item.slug} ${item.country}`.toLowerCase();
      const matchesQuery = !q || haystack.includes(q);
      return matchesCountry && matchesQuery;
    });
  }, [items, query, country]);

  const [selectedSlug, setSelectedSlug] = useState('');
  const selected = filtered.find((x) => x.slug === selectedSlug);

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

  return (
    <div className="samples-layout">
      <aside className="section-card samples-list-panel stack-sm">
        <label className="small-text" htmlFor="samples-query">
          {text.searchLabel}
        </label>
        <input
          id="samples-query"
          type="search"
          value={query}
          placeholder={text.searchPlaceholder}
          onChange={(e) => setQuery(e.target.value)}
        />

        <label className="small-text" htmlFor="samples-country">
          {text.filterLabel}
        </label>
        <select
          id="samples-country"
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
            setSelectedSlug('');
          }}
        >
          <option value="all">{text.allCountries}</option>
          {countries
            .filter((c) => c !== 'all')
            .map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
        </select>

        <div className="samples-list">
          {filtered.length === 0 ? (
            <p className="small-text">{text.empty}</p>
          ) : (
            filtered.map((item) => (
              <button
                className={`samples-item ${selected?.slug === item.slug ? 'is-active' : ''}`}
                key={`${item.country}/${item.slug}`}
                onClick={() => setSelectedSlug(item.slug)}
                type="button"
              >
                <strong>{item.title}</strong>
                <span className="small-text">{item.country}</span>
                <span className="small-text">
                  {text.reviewedLabel}: {item.reviewed ? 'Yes' : 'No'}
                </span>
              </button>
            ))
          )}
        </div>
      </aside>

      <section
        className="section-card samples-viewer-panel stack-sm"
        aria-label={text.previewTitle}
        onContextMenu={(e) => e.preventDefault()}
        onKeyDown={blockHotkeys}
      >
        {selected ? (
          <>
            <div className="samples-viewer-head">
              <h2>{selected.title}</h2>
              <span className="small-text">Protected preview</span>
            </div>
            <div className="samples-viewer-wrap">
              <iframe
                className="samples-pdf-viewer"
                src={`${selected.file_path}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                title={selected.title}
                loading="lazy"
              />
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
          </>
        ) : (
          <p className="small-text">Select a sample file from the left panel to load preview.</p>
        )}
      </section>
    </div>
  );
}
