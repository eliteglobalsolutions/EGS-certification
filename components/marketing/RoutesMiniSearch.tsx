'use client';

import Link from 'next/link';
import { useDeferredValue, useMemo, useState } from 'react';
import type { Locale } from '@/lib/i18n/dictionaries';

type SearchItem = {
  href: string;
  label: string;
  kind: 'route' | 'country' | 'destination' | 'document';
  description: string;
};

const kindOrder: Array<SearchItem['kind']> = ['route', 'country', 'destination', 'document'];

export function RoutesMiniSearch({
  locale,
  items,
}: {
  locale: Locale;
  items: SearchItem[];
}) {
  const [query, setQuery] = useState('');
  const [kind, setKind] = useState<'all' | SearchItem['kind']>('all');
  const deferredQuery = useDeferredValue(query);
  const labels = {
    kicker: locale === 'zh' ? '快速查找' : 'Quick find',
    helper:
      locale === 'zh'
        ? '按路线、签发国、目的地或文件类型快速跳转。'
        : 'Jump by route, issuing country, destination, or document type.',
    placeholder:
      locale === 'zh'
        ? '例如 Australia, China, Birth Certificate'
        : 'For example: Australia, China, Birth Certificate',
    empty:
      locale === 'zh'
        ? '没有找到对应页面。试试国家名、目的地或文件类型。'
        : 'No matching page found. Try a country, destination, or document type.',
  };

  const filtered = useMemo(() => {
    const normalized = deferredQuery.trim().toLowerCase();
    const base = items.filter((item) => (kind === 'all' ? true : item.kind === kind));

    if (!normalized) {
      return base.slice(0, 8);
    }

    return base
      .filter((item) => {
        const haystack = `${item.label} ${item.description}`.toLowerCase();
        return haystack.includes(normalized);
      })
      .sort((a, b) => {
        const aIndex = kindOrder.indexOf(a.kind);
        const bIndex = kindOrder.indexOf(b.kind);
        return aIndex - bIndex;
      })
      .slice(0, 8);
  }, [deferredQuery, items, kind]);

  return (
    <div className="ui-card ui-card-muted routes-mini-search stack-sm">
      <div className="stack-sm">
        <p className="kicker">{labels.kicker}</p>
        <p className="small-text">{labels.helper}</p>
      </div>
      <div className="routes-mini-search-bar">
        <input
          className="input"
          aria-label={labels.kicker}
          placeholder={labels.placeholder}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <div className="routes-mini-search-pills">
          {(['all', 'route', 'country', 'destination', 'document'] as const).map((option) => (
            <button
              className="pill"
              key={option}
              onClick={() => setKind(option)}
              type="button"
              aria-pressed={kind === option}
            >
              {option === 'all'
                ? locale === 'zh'
                  ? '全部'
                  : 'All'
                : option === 'route'
                  ? locale === 'zh'
                    ? '路线'
                    : 'Routes'
                  : option === 'country'
                    ? locale === 'zh'
                      ? '签发国'
                      : 'Countries'
                    : option === 'destination'
                      ? locale === 'zh'
                        ? '目的地'
                        : 'Destinations'
                      : locale === 'zh'
                        ? '文件'
                        : 'Documents'}
            </button>
          ))}
        </div>
      </div>
      <div className="routes-mini-search-results">
        {filtered.length > 0 ? (
          filtered.map((item) => (
            <Link className="routes-mini-search-result" href={item.href} key={`${item.kind}-${item.href}`}>
              <strong>{item.label}</strong>
              <span className="small-text">{item.description}</span>
            </Link>
          ))
        ) : (
          <div className="routes-mini-search-empty">
            <span className="small-text">{labels.empty}</span>
          </div>
        )}
      </div>
    </div>
  );
}
