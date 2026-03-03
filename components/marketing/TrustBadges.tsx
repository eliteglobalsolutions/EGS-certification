import type { AppCopy } from '@/lib/i18n/dictionaries';

export function TrustBadges({ t }: { t: AppCopy }) {
  return (
    <div className="trust-badges" aria-label={t.landing.hero.badgesLabel}>
      {t.landing.hero.badges.map((item) => (
        <span key={item} className="trust-badge-item">
          {item}
        </span>
      ))}
    </div>
  );
}
