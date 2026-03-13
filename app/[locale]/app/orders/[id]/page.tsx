'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import type { Session, User } from '@supabase/supabase-js';
import { AppSessionGate } from '@/components/customer-app/AppSessionGate';
import { AppShell } from '@/components/customer-app/AppShell';
import type { Locale } from '@/lib/i18n/dictionaries';

function formatDateTime(value?: string | null) {
  if (!value) {
    return '--';
  }

  return new Date(value).toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

function OrderDetailContent({
  locale,
  session,
}: {
  locale: Locale;
  session: Session;
  user: User;
}) {
  const params = useParams<{ id: string }>();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/app/orders/${params.id}`, {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    })
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch(() => setData(null));
  }, [params.id, session.access_token]);

  return (
    <AppShell
      locale={locale}
      subtitle={locale === 'zh' ? '查看单个订单的状态、文件与历史。' : 'Review one order, its files, and its status history.'}
      title={locale === 'zh' ? '订单详情' : 'Order Detail'}
    >
      {!data?.order ? (
        <section className="customer-app-card">
          <p>{locale === 'zh' ? '订单加载中或不存在。' : 'Order is loading or unavailable.'}</p>
        </section>
      ) : (
        <section className="customer-app-detail-grid">
          <article className="customer-app-card">
            <p className="customer-app-card-kicker">{locale === 'zh' ? '概览' : 'Overview'}</p>
            <h2>{data.order.order_no}</h2>
            <p>{data.order.destination_country || '-'}</p>
            <div className="customer-app-meta-list">
              <span className="customer-app-status-pill">{data.order.client_status || '-'}</span>
              <span>{data.order.estimated_days || '-'}</span>
              <span>{data.order.delivery_method || '-'}</span>
              <span>{formatDateTime(data.order.updated_at)}</span>
            </div>
            <div className="customer-app-card-actions">
              <Link className="btn btn-secondary" href={`/${locale}/order/upload`}>
                {locale === 'zh' ? '补充上传' : 'Upload Files'}
              </Link>
              {data.order.invoice_url ? (
                <a className="btn btn-ghost" href={data.order.invoice_url}>
                  {locale === 'zh' ? '查看发票' : 'Invoice'}
                </a>
              ) : null}
            </div>
          </article>

          <article className="customer-app-card">
            <p className="customer-app-card-kicker">{locale === 'zh' ? '文件' : 'Files'}</p>
            <div className="customer-app-file-list">
              {(data.files || []).map((file: any) => (
                <div className="customer-app-file-item" key={file.id}>
                  <div className="customer-app-order-topline">
                    <strong>{file.file_name}</strong>
                    <span className="customer-app-row-meta">{file.role}</span>
                  </div>
                  {file.download_url ? <a className="inline-link" href={file.download_url}>{locale === 'zh' ? '下载' : 'Download'}</a> : null}
                </div>
              ))}
            </div>
          </article>

          <article className="customer-app-card">
            <p className="customer-app-card-kicker">{locale === 'zh' ? '状态历史' : 'Status history'}</p>
            <div className="customer-app-history-list">
              {(data.history || []).map((item: any) => (
                <div className="customer-app-history-item" key={item.id}>
                  <div className="customer-app-order-topline">
                    <strong>{item.client_status}</strong>
                    <span className="customer-app-row-meta">{formatDateTime(item.created_at)}</span>
                  </div>
                  <p>{item.note || '-'}</p>
                </div>
              ))}
            </div>
          </article>
        </section>
      )}
    </AppShell>
  );
}

export default function CustomerOrderDetailPage() {
  const params = useParams<{ locale: Locale }>();
  const locale = params.locale;

  return <AppSessionGate locale={locale}>{(session, user) => <OrderDetailContent locale={locale} session={session} user={user} />}</AppSessionGate>;
}
