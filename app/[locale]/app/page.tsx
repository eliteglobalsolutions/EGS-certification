'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import type { Session, User } from '@supabase/supabase-js';
import { AppSessionGate } from '@/components/customer-app/AppSessionGate';
import { AppShell } from '@/components/customer-app/AppShell';
import type { Locale } from '@/lib/i18n/dictionaries';

type OrderSummary = {
  id: string;
  order_no: string;
  destination_country: string | null;
  service_type: string | null;
  amount_total: number | null;
  currency: string | null;
  client_status: string | null;
  updated_at: string;
};

function DashboardContent({
  locale,
  session,
}: {
  locale: Locale;
  session: Session;
  user: User;
}) {
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const activeOrders = orders.filter((order) => order.client_status !== 'Completed' && order.client_status !== 'Dispatched').length;

  useEffect(() => {
    async function loadOrders() {
      const res = await fetch('/api/app/orders', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });
      const json = await res.json();
      setOrders(json.orders || []);
      setLoading(false);
    }

    loadOrders().catch(() => setLoading(false));
  }, [session.access_token]);

  return (
    <AppShell locale={locale} title={locale === 'zh' ? '我的门户' : 'My Portal'} subtitle="">
      <div className="customer-app-body">
        {/* Service pills */}
        <div className="customer-app-pill-row">
          <span className="customer-app-pill"><span className="customer-app-pill-dot" />Apostille Service</span>
          <span className="customer-app-pill"><span className="customer-app-pill-dot" />{locale === 'zh' ? '公证认证' : 'Legalisation Service'}</span>
        </div>

        {/* Stats grid */}
        <div className="customer-app-stats-grid">
          <div className="customer-app-stat-cell">
            <strong className="customer-app-stat-num">{loading ? '…' : activeOrders}</strong>
            <span className="customer-app-stat-label">{locale === 'zh' ? '处理中' : 'Active orders'}</span>
          </div>
          <div className="customer-app-stat-cell">
            <strong className="customer-app-stat-num">120+</strong>
            <span className="customer-app-stat-label">{locale === 'zh' ? '覆盖地区' : 'Jurisdictions'}</span>
          </div>
          <div className="customer-app-stat-cell customer-app-stat-cell-last">
            <strong className="customer-app-stat-num">{orders.length}</strong>
            <span className="customer-app-stat-label">{locale === 'zh' ? '全部订单' : 'Total orders'}</span>
          </div>
        </div>

        {/* Active orders kicker */}
        <p className="customer-app-kicker">{locale === 'zh' ? '处理中订单' : 'Active orders'}</p>

        {loading ? (
          <p className="customer-app-loading-inline">{locale === 'zh' ? '载入中…' : 'Loading…'}</p>
        ) : orders.length === 0 ? (
          <div className="customer-app-empty">
            <p className="customer-app-empty-text">{locale === 'zh' ? '暂无订单。' : 'No active orders.'}</p>
            <p className="customer-app-empty-sub">{locale === 'zh' ? '下方开始新申请。' : 'Begin a new application below.'}</p>
          </div>
        ) : (
          <div className="customer-app-order-list">
            {orders.slice(0, 4).map((order) => {
              const isActive = order.client_status !== 'Completed' && order.client_status !== 'Dispatched';
              return (
                <Link className="customer-app-order-card" href={`/${locale}/app/orders/${order.id}`} key={order.id}>
                  <div className={`customer-order-strip ${isActive ? 'customer-order-strip-active' : 'customer-order-strip-done'}`} />
                  <div className="customer-app-order-card-body">
                    <div className="customer-app-order-topline">
                      <div>
                        <strong className="customer-app-order-title">{order.destination_country || '-'}</strong>
                        <span className="customer-app-order-service">{order.service_type || '-'}</span>
                        <span className="customer-app-order-ref">#{order.order_no}</span>
                      </div>
                      <span className={`customer-app-status-pill${isActive ? ' is-active' : ''}`}>
                        {isActive ? (locale === 'zh' ? '处理中' : 'Active') : (locale === 'zh' ? '已完成' : 'Complete')}
                      </span>
                    </div>
                    <p className={`customer-app-order-note${isActive ? ' is-active' : ''}`}>
                      {order.client_status || '-'}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        <div className="customer-app-rule" />
        <Link className="customer-app-btn-primary" href={`/${locale}/order/new`}>
          {locale === 'zh' ? '新建申请' : 'New Application'}
        </Link>
      </div>
    </AppShell>
  );
}

export default function CustomerAppHomePage() {
  const params = useParams<{ locale: Locale }>();
  const locale = params.locale;

  return <AppSessionGate locale={locale}>{(session, user) => <DashboardContent locale={locale} session={session} user={user} />}</AppSessionGate>;
}
