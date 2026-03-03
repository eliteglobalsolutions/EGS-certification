import type { AppCopy } from '@/lib/i18n/dictionaries';

export function SystemMetricsStrip({ t }: { t: AppCopy }) {
  return (
    <section className="system-metrics-strip" aria-label={t.landing.metrics.title}>
      <div className="system-metrics-grid">
        {t.landing.metrics.items.map((item) => (
          <p className="system-metric-item" key={item}>
            {item}
          </p>
        ))}
      </div>
    </section>
  );
}
