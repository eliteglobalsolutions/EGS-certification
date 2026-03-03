'use client';

import { FormEvent, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Timeline } from '@/components/ui/Timeline';
import { EmptyState, ErrorState } from '@/components/ui/States';
import { getCopy, getStatusLabel, timelineText, type Locale } from '@/lib/i18n/dictionaries';
import { clientTimelineIndex, normalizeClientStatus } from '@/lib/status';

export default function PublicTrackPage() {
  const params = useParams<{ locale: Locale }>();
  const locale = params.locale;
  const t = getCopy(locale);
  const [orderCode, setOrderCode] = useState('');
  const [error, setError] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const timeline = useMemo(() => timelineText[locale], [locale]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setData(null);
    setLoading(true);
    const res = await fetch(`/api/orders/public-status?order_code=${encodeURIComponent(orderCode.trim())}`);
    const json = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(json.error || t.common.error);
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
          <PageHeader
            kicker={locale === 'zh' ? '公开进度查询' : 'Public tracking'}
            title={locale === 'zh' ? '按订单号查询状态' : 'Track by order code'}
            subtitle={locale === 'zh' ? '仅显示最小必要状态信息。' : 'Minimal status information only.'}
          />
          <form className="stack-sm" onSubmit={onSubmit}>
            <input className="input" placeholder={locale === 'zh' ? '输入订单号' : 'Enter order code'} value={orderCode} onChange={(e) => setOrderCode(e.target.value)} />
            <button className="btn btn-primary" disabled={loading} type="submit">
              {loading ? t.common.loading : (locale === 'zh' ? '查询状态' : 'Check Status')}
            </button>
          </form>
          {error ? <ErrorState title={t.common.error} body={error} /> : null}
        </Card>

        {!data ? <EmptyState title={locale === 'zh' ? '状态结果' : 'Status result'} body={locale === 'zh' ? '输入订单号后显示状态。' : 'Status appears after code lookup.'} /> : null}

        {data ? (
          <Card>
            <div className="stack-md">
              <div className="status-line">
                <StatusBadge status={status} label={getStatusLabel(locale, status)} />
                <span className="small-text">
                  {locale === 'zh' ? '最后更新' : 'Last updated'}: {new Date(data.order.updated_at).toLocaleString()}
                </span>
              </div>
              <Timeline items={timeline} currentIndex={activeIndex} />
              <div className="stack-sm">
                <p className="small-text">{locale === 'zh' ? '订单号' : 'Order code'}: {data.order.order_code}</p>
                <p className="small-text">{locale === 'zh' ? '预计时效' : 'Estimated timeline'}: {data.order.estimated_days || '-'}</p>
                {data.order.client_note ? <p className="small-text">{locale === 'zh' ? '客户备注' : 'Client note'}: {data.order.client_note}</p> : null}
              </div>
            </div>
          </Card>
        ) : null}
      </Section>
    </Container>
  );
}
