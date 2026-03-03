'use client';

import { FormEvent, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { PageHeader } from '@/components/ui/PageHeader';
import { Timeline } from '@/components/ui/Timeline';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { InfoRow } from '@/components/ui/InfoRow';
import { EmptyState, ErrorState } from '@/components/ui/States';
import { clientTimelineIndex, normalizeClientStatus } from '@/lib/status';
import { getCopy, getStatusLabel, timelineText, type Locale } from '@/lib/i18n/dictionaries';

export default function TrackPage() {
  const params = useParams<{ locale: Locale }>();
  const locale = params.locale;
  const t = getCopy(locale);
  const [orderNo, setOrderNo] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [surname, setSurname] = useState('');
  const [error, setError] = useState('');
  const [data, setData] = useState<any>(null);

  const timeline = useMemo(() => timelineText[locale], [locale]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setData(null);

    const res = await fetch('/api/order/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderNo, accessToken, surname }),
    });
    const json = await res.json();
    if (!res.ok) {
      setError(json.error || 'Failed');
      return;
    }
    setData(json);
  }

  const status = normalizeClientStatus(data?.order?.client_status);
  const activeIndex = clientTimelineIndex(status);

  return (
    <Container>
      <Section>
        <Card>
          <PageHeader kicker={t.track.kicker} title={t.track.title} subtitle={t.track.subtitle} />
          <form className="stack-sm" onSubmit={onSubmit}>
            <input className="input" placeholder={t.track.ref} value={orderNo} onChange={(e) => setOrderNo(e.target.value)} />
            <input className="input" placeholder={t.track.token} value={accessToken} onChange={(e) => setAccessToken(e.target.value)} />
            <input className="input" placeholder={t.track.surname} value={surname} onChange={(e) => setSurname(e.target.value)} />
            <button className="btn btn-primary" type="submit">
              {t.track.submit}
            </button>
          </form>
          {error ? <ErrorState title={t.common.error} body={error} /> : null}
        </Card>

        {!data ? <EmptyState title={t.track.summaryTitle} body={t.track.subtitle} /> : null}

        {data ? (
          <Card>
            <div className="stack-md">
              <div className="status-line">
                <StatusBadge status={status} label={getStatusLabel(locale, status)} />
                <span className="small-text">
                  {t.track.updated}: {new Date(data.order.updated_at).toLocaleString()}
                </span>
              </div>

              {status === 'action_required' ? <p className="warn-text">{t.track.actionBody}</p> : null}
              {data.order.client_note ? (
                <p className="small-text">
                  {t.track.note}: {data.order.client_note}
                </p>
              ) : null}

              <Timeline items={timeline} currentIndex={activeIndex} />

              <div className="ui-card ui-card-muted stack-sm">
                <h3>{t.track.summaryTitle}</h3>
                <InfoRow label={t.track.ref} value={data.order.order_no || '-'} />
                <InfoRow label={t.order.labels.destination} value={data.order.destination_country || '-'} />
                <InfoRow label={t.order.labels.service} value={data.order.service_type || '-'} />
                <InfoRow label={t.order.labels.docQty} value={String(data.order.document_quantity || '-')} />
                <InfoRow label={t.order.labels.delivery} value={data.order.delivery_method || '-'} />
                <InfoRow label={t.order.summary.eta} value={data.order.estimated_days || '-'} />
              </div>

              <div className="stack-sm">
                <h3>{t.track.historyTitle}</h3>
                {(data.history || []).length === 0 ? (
                  <p className="small-text">{t.track.noHistory}</p>
                ) : (
                  <ul className="list-plain">
                    {data.history.map((h: any) => (
                      <li key={h.id}>
                        {new Date(h.created_at).toLocaleString()} - {getStatusLabel(locale, normalizeClientStatus(h.client_status))}
                        {h.note ? `: ${h.note}` : ''}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </Card>
        ) : null}
      </Section>
    </Container>
  );
}
