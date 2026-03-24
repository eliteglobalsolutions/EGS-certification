'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { PageHeader } from '@/components/ui/PageHeader';
import { Timeline } from '@/components/ui/Timeline';
import { InfoRow } from '@/components/ui/InfoRow';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ErrorState, LoadingState } from '@/components/ui/States';
import { getCopy, getStatusLabel, timelineText, type Locale } from '@/lib/i18n/dictionaries';
import { clientTimelineIndex, normalizeClientStatus } from '@/lib/status';

export default function PortalSuccessPage() {
  const params = useParams<{ locale: Locale }>();
  const locale = params.locale;
  const t = getCopy(locale);
  const searchParams = useSearchParams();
  const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || 'AW-17994379586';
  const googleAdsConversionLabel =
    process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL || 'F-OlCNmLlIMcEMLisYRD';
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState('');
  const adsEventSent = useRef(false);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    const orderId = searchParams.get('order_id');

    const url = new URL('/api/order/success', window.location.origin);
    if (sessionId) url.searchParams.set('session_id', sessionId);
    if (orderId) url.searchParams.set('order_id', orderId);

    let cancelled = false;
    let attempts = 0;

    async function pull() {
      try {
        const r = await fetch(url.toString(), { cache: 'no-store' });
        const body = await r.json();
        if (cancelled) return;
        if (r.status === 409 && body?.pending && attempts < 15) {
          attempts += 1;
          setTimeout(pull, 2000);
          return;
        }
        if (!r.ok) {
          setError(body.error || 'Order not found');
          return;
        }
        setData(body.order);
      } catch {
        if (!cancelled) setError('Failed to fetch order');
      }
    }

    pull();
    return () => {
      cancelled = true;
    };
  }, [searchParams]);

  useEffect(() => {
    if (!data || adsEventSent.current) return;
    const gtag = (window as any).gtag;
    if (typeof gtag !== 'function') return;

    gtag('event', 'conversion', {
      send_to: `${googleAdsId}/${googleAdsConversionLabel}`,
      value: typeof data.amount_total === 'number' ? data.amount_total / 100 : 1.0,
      currency: (data.currency || 'AUD').toUpperCase(),
    });
    gtag('event', 'ads_conversion___1', {
      order_id: data.id || undefined,
      order_no: data.order_no || undefined,
      value: typeof data.amount_total === 'number' ? data.amount_total / 100 : undefined,
      currency: (data.currency || 'AUD').toUpperCase(),
    });

    adsEventSent.current = true;
  }, [data, googleAdsConversionLabel, googleAdsId]);

  if (error) {
    return (
      <section className="ui-card stack-md">
        <ErrorState title={t.success.fallbackTitle} body={t.success.fallbackBody} />
        <p className="small-text">{t.success.recovery}</p>
        <Link className="btn btn-secondary" href={`/${locale}/order/track`}>
          {t.nav.track}
        </Link>
      </section>
    );
  }

  if (!data) {
    return (
      <section className="ui-card">
        <LoadingState title={t.common.loading} body={t.success.subtitle} />
      </section>
    );
  }

  const status = normalizeClientStatus(data.client_status || 'under_verification');
  const currentIndex = useMemo(() => clientTimelineIndex(status), [status]);

  return (
    <section className="ui-card stack-md">
      <PageHeader kicker={t.success.kicker} title={t.success.title} subtitle={t.success.subtitle} />

      <div className="status-line">
        <StatusBadge status={status} label={getStatusLabel(locale, status)} />
      </div>

      <div className="ui-card ui-card-muted stack-sm">
        <h3>{t.track.summaryTitle}</h3>
        <InfoRow label={t.success.ref} value={data.order_no} />
        <InfoRow label={t.success.status} value={getStatusLabel(locale, status)} />
        <InfoRow label={t.order.summary.eta} value={data.estimated_days || '-'} />
      </div>

      <Timeline items={timelineText[locale]} currentIndex={currentIndex} />

      <div className="stack-sm">
        <h3>{t.success.nextStepsTitle}</h3>
        <ul className="list-plain">
          {t.success.nextSteps.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="actions">
        <Link className="btn btn-primary" href={`/${locale}/order/track`}>
          {t.success.track}
        </Link>
        <a className="btn btn-secondary" href={data.invoice_url || '#'}>
          {t.success.invoice}
        </a>
        <Link className="btn btn-ghost" href={`/${locale}/order/upload`}>
          {t.success.upload}
        </Link>
      </div>
    </section>
  );
}
