'use client';

import { useRef } from 'react';

export function CoverageRail({ items }: { items: string[] }) {
  const railRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: 'left' | 'right') => {
    const rail = railRef.current;
    if (!rail) return;
    const step = Math.max(260, Math.floor(rail.clientWidth * 0.7));
    rail.scrollBy({ left: direction === 'left' ? -step : step, behavior: 'smooth' });
  };

  return (
    <div className="coverage-rail-wrap">
      <button
        aria-label="Scroll coverage left"
        className="coverage-rail-arrow"
        onClick={() => scrollByCard('left')}
        type="button"
      >
        ‹
      </button>
      <div className="coverage-rail" ref={railRef}>
        {items.map((item) => (
          <article className="coverage-item" key={item}>
            <span className="small-text">{item}</span>
          </article>
        ))}
      </div>
      <button
        aria-label="Scroll coverage right"
        className="coverage-rail-arrow"
        onClick={() => scrollByCard('right')}
        type="button"
      >
        ›
      </button>
    </div>
  );
}
