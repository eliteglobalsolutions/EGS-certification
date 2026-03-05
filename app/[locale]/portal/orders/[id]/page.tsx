'use client';

import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { PageHeader } from '@/components/ui/PageHeader';
import { Timeline } from '@/components/ui/Timeline';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { InfoRow } from '@/components/ui/InfoRow';
import { EmptyState } from '@/components/ui/States';
import { clientTimelineIndex, normalizeClientStatus } from '@/lib/status';
import { getCopy, getStatusLabel, timelineText, type Locale } from '@/lib/i18n/dictionaries';

function submissionEventLabel(locale: Locale, type: string) {
  if (locale === 'zh') {
    if (type === 'UPLOAD_PORTAL') return '首次上传（Portal）';
    if (type === 'UPLOAD_SUPPLEMENTAL') return '补充上传（Portal）';
    if (type === 'EMAIL_SUBMISSION_CONFIRMED') return '邮箱提交确认';
    return type;
  }
  if (type === 'UPLOAD_PORTAL') return 'Initial Upload (Portal)';
  if (type === 'UPLOAD_SUPPLEMENTAL') return 'Supplemental Upload (Portal)';
  if (type === 'EMAIL_SUBMISSION_CONFIRMED') return 'Email Submission Confirmed';
  return type;
}

export default function PortalOrderPage() {
  const params = useParams<{ locale: Locale; id: string }>();
  const locale = params.locale;
  const t = getCopy(locale);
  const search = useSearchParams();

  const [orderNo, setOrderNo] = useState(search.get('orderNo') || '');
  const [accessToken, setAccessToken] = useState(search.get('accessToken') || '');
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState('');

  async function load(e?: FormEvent) {
    e?.preventDefault();
    setError('');
    const res = await fetch('/api/portal/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderNo, accessToken }),
    });
    const json = await res.json();
    if (!res.ok) {
      setError(json.error || 'Failed');
      setData(null);
      return;
    }
    setData(json);
  }

  useEffect(() => {
    if (orderNo && accessToken) load();
  }, []);

  const status = normalizeClientStatus(data?.order?.client_status);

  return (
    <Container>
      <Section>
        <Card>
          <PageHeader kicker={t.portal.kicker} title={t.portal.title} subtitle={t.portal.subtitle} />
          <form className="stack-sm" onSubmit={load}>
            <input className="input" placeholder={t.track.ref} value={orderNo} onChange={(e) => setOrderNo(e.target.value)} />
            <input className="input" placeholder={t.track.token} value={accessToken} onChange={(e) => setAccessToken(e.target.value)} />
            <button className="btn btn-primary" type="submit">
              {t.track.submit}
            </button>
          </form>
          {error ? <p className="error-text">{error}</p> : null}
        </Card>

        {!data ? (
          <EmptyState title={t.portal.emptyTitle} body={t.portal.emptyBody} />
        ) : (
          <Card>
            <div className="stack-md">
              <StatusBadge status={status} label={getStatusLabel(locale, status)} />
              <Timeline items={timelineText[locale]} currentIndex={clientTimelineIndex(status)} />

              <div className="ui-card ui-card-muted stack-sm">
                <h3>{t.track.summaryTitle}</h3>
                <InfoRow label={t.track.ref} value={data.order.order_no} />
                <InfoRow label={t.order.labels.destination} value={data.order.destination_country || '-'} />
                <InfoRow label={t.order.labels.service} value={data.order.service_type || '-'} />
                <InfoRow label={t.order.labels.docType} value={data.order.document_type || '-'} />
                <InfoRow label={t.order.labels.docQty} value={String(data.order.document_quantity || '-')} />
                <InfoRow label={t.order.labels.delivery} value={data.order.delivery_method || '-'} />
                <InfoRow label={t.order.summary.eta} value={data.order.estimated_days || '-'} />
                <InfoRow label={t.common.invoice} value={data.order.invoice_url || '-'} />
              </div>

              <div className="actions">
                <Link className="btn btn-ghost" href={`/${locale}/order/upload`}>
                  {t.nav.upload}
                </Link>
              </div>

              <div className="ui-card ui-card-muted stack-sm">
                <h3>{t.portal.checklist.title}</h3>
                <p className="small-text">{t.portal.checklist.identity.passportRule}</p>
                <ul className="list-plain">
                  {t.portal.checklist.scan.rules.map((rule) => (
                    <li className="small-text" key={rule}>
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="stack-sm">
                <h3>{t.common.files}</h3>
                <ul className="list-plain">
                  {(data.files || []).map((f: any) => (
                    <li key={f.id}>
                      [{f.role}] {f.file_name} ({new Date(f.created_at).toLocaleString()})
                      {f.download_url ? (
                        <>
                          {' '}
                          <a className="inline-link" href={f.download_url} target="_blank" rel="noreferrer">
                            {locale === 'zh' ? '下载' : 'Download'}
                          </a>
                        </>
                      ) : null}
                      {f.storage_path ? (
                        <>
                          <br />
                          <span className="small-text">{f.storage_path}</span>
                        </>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="stack-sm">
                <h3>{t.portal.submissionEvents.title}</h3>
                {(data.submissionEvents || []).length === 0 ? <p className="small-text">{t.portal.submissionEvents.noData}</p> : null}
                <ul className="list-plain">
                  {(data.submissionEvents || []).map((event: any) => (
                    <li key={event.id}>
                      [{submissionEventLabel(locale, event.event_type)}] {event.channel} · {new Date(event.created_at).toLocaleString()}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        )}
      </Section>
    </Container>
  );
}
