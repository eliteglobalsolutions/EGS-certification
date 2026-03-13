import type { AppCopy } from '@/lib/i18n/dictionaries';

export function DataStrip({ t }: { t: AppCopy }) {
  const ds = t.landing.dataStrip;

  return (
    <div className="data-strip-section">
      <div className="data-strip-grid">
        {ds.items.map((item) => (
          <div className="data-cell" key={item.label}>
            <div className="data-num">{item.num}</div>
            <div className="data-label">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
