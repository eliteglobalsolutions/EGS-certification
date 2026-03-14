'use client';

import Link from 'next/link';
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
  const reassurancePoints = locale === 'zh'
    ? [
        '仅显示客户可见状态，不公开内部处理细节。',
        '如需补件或核验，我们会在这里给出下一步提示。',
        '寄出原件后，请保留 courier tracking number 以便对照。',
      ]
    : [
        'Only client-facing status is shown here, without exposing internal workflow data.',
        'If action is needed, this page becomes the next-step prompt.',
        'Keep your courier tracking number after sending originals for reference.',
      ];
  const supportHref = locale === 'zh' ? '/zh/intake' : '/intake';

  return (
    <Container>
      <Section>
        <div className="track-hero">
          <Card className="track-lookup-card">
            <PageHeader
              kicker={locale === 'zh' ? '公开进度查询' : 'Public tracking'}
              title={locale === 'zh' ? '查询文件处理进度' : 'Track your document order'}
              subtitle={locale === 'zh' ? '输入订单号，查看当前所处阶段、最近更新时间和是否需要你采取行动。' : 'Enter your order code to see the current stage, the latest update, and whether any action is needed from you.'}
            />
            <form className="track-lookup-form" onSubmit={onSubmit}>
              <input className="input" placeholder={locale === 'zh' ? '输入订单号，例如 EGS-1024' : 'Enter order code, for example EGS-1024'} value={orderCode} onChange={(e) => setOrderCode(e.target.value)} />
              <button className="btn btn-primary" disabled={loading} type="submit">
                {loading ? t.common.loading : (locale === 'zh' ? '查询状态' : 'Check Status')}
              </button>
            </form>
            {error ? <ErrorState title={t.common.error} body={error} /> : null}
          </Card>

          <Card className="track-reassurance-card">
            <div className="stack-md">
              <div className="stack-xs">
                <p className="kicker">{locale === 'zh' ? '查询说明' : 'Tracking notes'}</p>
                <h2>{locale === 'zh' ? '等待原件返回时，信息应该简洁但可靠。' : 'When originals are in transit, the information needs to feel simple and dependable.'}</h2>
              </div>
              <ul className="list-plain track-reassurance-list">
                {reassurancePoints.map((item) => (
                  <li className="small-text" key={item}>{item}</li>
                ))}
              </ul>
              <div className="track-help-actions">
                <Link className="btn btn-secondary" href={supportHref}>
                  {locale === 'zh' ? '开始新申请' : 'Start a new order'}
                </Link>
              </div>
            </div>
          </Card>
        </div>

        {!data ? (
          <Card className="track-empty-card">
            <EmptyState title={locale === 'zh' ? '状态结果' : 'Status result'} body={locale === 'zh' ? '输入订单号后，这里会显示当前阶段、最后更新时间和是否需要补件。' : 'After you enter an order code, this area will show the current stage, the last update time, and whether additional documents are required.'} />
          </Card>
        ) : null}

        {data ? (
          <Card className="track-results-card">
            <div className="stack-md">
              <div className="track-summary-grid">
                <div className="track-summary-tile">
                  <span className="track-summary-label">{locale === 'zh' ? '订单号' : 'Order code'}</span>
                  <strong>{data.order.order_code}</strong>
                </div>
                <div className="track-summary-tile">
                  <span className="track-summary-label">{locale === 'zh' ? '预计时效' : 'Estimated timeline'}</span>
                  <strong>{data.order.estimated_days || '-'}</strong>
                </div>
                <div className="track-summary-tile">
                  <span className="track-summary-label">{locale === 'zh' ? '状态' : 'Status'}</span>
                  <strong>{getStatusLabel(locale, status)}</strong>
                </div>
              </div>
              <div className="status-line">
                <StatusBadge status={status} label={getStatusLabel(locale, status)} />
                <span className="small-text">
                  {locale === 'zh' ? '最后更新' : 'Last updated'}: {new Date(data.order.updated_at).toLocaleString()}
                </span>
              </div>
              <Timeline items={timeline} currentIndex={activeIndex} />
              <div className="stack-sm">
                {data.order.client_note ? <p className="small-text">{locale === 'zh' ? '客户备注' : 'Client note'}: {data.order.client_note}</p> : null}
              </div>
            </div>
          </Card>
        ) : null}
      </Section>
    </Container>
  );
}
