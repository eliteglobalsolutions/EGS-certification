import { Card } from '@/components/ui/Card';
import type { AppCopy } from '@/lib/i18n/dictionaries';

export function ClientFeedback({ t }: { t: AppCopy }) {
  return (
    <Card muted>
      <div className="stack-md">
        <p className="kicker">{t.home.reviewsTitle}</p>
        <div className="services-grid">
          {t.home.reviews.map((review) => (
            <article className="stack-sm" key={`${review.who}-${review.meta}`}>
              <strong>{review.who}</strong>
              <p className="small-text">{review.meta}</p>
              <p className="small-text">{review.text}</p>
            </article>
          ))}
        </div>
      </div>
    </Card>
  );
}
