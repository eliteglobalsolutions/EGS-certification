'use client';

import { useEffect, useMemo, useState } from 'react';
import type { AppCopy, Locale } from '@/lib/i18n/dictionaries';

type PublishedFeedback = {
  id: string;
  name: string;
  service_type: string | null;
  quote: string;
  rating: number;
  locale: Locale;
};

type FeedbackFormState = {
  name: string;
  serviceType: string;
  quote: string;
  rating: number;
};

const DEFAULT_FORM: FeedbackFormState = {
  name: '',
  serviceType: '',
  quote: '',
  rating: 5,
};

export function Testimonials({ t, locale }: { t: AppCopy; locale: Locale }) {
  const [published, setPublished] = useState<PublishedFeedback[]>([]);
  const [form, setForm] = useState<FeedbackFormState>(DEFAULT_FORM);
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const run = () => {
      fetch(`/api/feedback/published?locale=${locale}`, { signal: controller.signal })
        .then((r) => r.json())
        .then((j) => setPublished(Array.isArray(j.feedback) ? j.feedback : []))
        .catch(() => setPublished([]));
    };

    const timeoutId = setTimeout(run, 300);
    const abortId = setTimeout(() => controller.abort(), 1800);
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(abortId);
      controller.abort();
    };
  }, [locale]);

  const cards = useMemo(() => {
    if (published.length > 0) {
      return published.map((item) => ({
        key: item.id,
        name: item.name,
        type: item.service_type || '-',
        quote: item.quote,
        rating: item.rating,
      }));
    }
    return t.landing.testimonials.items.map((item, index) => ({
      key: `${item.name}-${index}`,
      name: item.name,
      type: item.type,
      quote: item.quote,
      rating: 5,
    }));
  }, [published, t.landing.testimonials.items]);

  async function submitFeedback() {
    setStatus('');
    if (!form.name.trim() || !form.quote.trim() || form.rating < 1 || form.rating > 5) {
      setStatus(t.landing.testimonials.formError);
      return;
    }

    setSubmitting(true);
    const res = await fetch('/api/feedback/submit', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        locale,
        name: form.name,
        serviceType: form.serviceType,
        quote: form.quote,
        rating: form.rating,
      }),
    });
    setSubmitting(false);

    if (!res.ok) {
      setStatus(t.landing.testimonials.formError);
      return;
    }

    setStatus(t.landing.testimonials.formSuccess);
    setForm(DEFAULT_FORM);
  }

  return (
    <section className="ui-section surface-0 testimonials-section" aria-labelledby="testimonials-heading">
      <div className="page-header">
        <div>
          <p className="kicker">{t.landing.testimonials.kicker}</p>
          <h2 id="testimonials-heading">{t.landing.testimonials.title}</h2>
        </div>
      </div>
      <div className="testimonials-grid">
        {cards.map((item) => (
          <article className="testimonial-card stack-sm" key={item.key}>
            <p className="testimonial-quote">{item.quote}</p>
            <div aria-label={t.landing.testimonials.starLabel} className="testimonial-stars">
              {Array.from({ length: 5 }).map((_, index) => (
                <span aria-hidden="true" className="testimonial-star" key={`${item.key}-star-${index + 1}`}>
                  {index < item.rating ? '★' : '☆'}
                </span>
              ))}
            </div>
            <p className="small-text">
              {item.name} · {item.type}
            </p>
          </article>
        ))}
      </div>

      <details className="testimonial-interactive">
        <summary>
          <span>{t.landing.testimonials.interactivePrompt}</span>
          <span className="faq-chevron" aria-hidden="true">▾</span>
        </summary>
        <p className="small-text">{t.landing.testimonials.interactiveHint}</p>
        <div className="stack-sm">
          <input
            className="input"
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            placeholder={t.landing.testimonials.formName}
            value={form.name}
          />
          <input
            className="input"
            onChange={(e) => setForm((prev) => ({ ...prev, serviceType: e.target.value }))}
            placeholder={t.landing.testimonials.formServiceType}
            value={form.serviceType}
          />
          <textarea
            className="textarea"
            onChange={(e) => setForm((prev) => ({ ...prev, quote: e.target.value }))}
            placeholder={t.landing.testimonials.formQuote}
            value={form.quote}
          />
          <div className="testimonial-star-picker" role="radiogroup">
            {[1, 2, 3, 4, 5].map((score) => (
              <button
                aria-checked={form.rating === score}
                className="star-button"
                key={`form-rate-${score}`}
                onClick={() => setForm((prev) => ({ ...prev, rating: score }))}
                role="radio"
                type="button"
              >
                <span aria-hidden="true">{score <= form.rating ? '★' : '☆'}</span>
              </button>
            ))}
          </div>
          <div className="actions">
            <button className="btn btn-primary" disabled={submitting} onClick={submitFeedback} type="button">
              {submitting ? t.common.loading : t.landing.testimonials.submit}
            </button>
          </div>
          {status ? <p className="small-text">{status}</p> : null}
        </div>
      </details>
    </section>
  );
}
