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

function formatDate(value: string) {
  return new Date(value).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function OrdersContent({
  locale,
  session,
  user,
}: {
  locale: Locale;
  session: Session;
  user: User;
}) {
  const [orders, setOrders] = useState<OrderSummary[]>([]);

  useEffect(() => {
    fetch('/api/app/orders', {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    })
      .then((res) => res.json())
      .then((json) => setOrders(json.orders || []))
      .catch(() => setOrders([]));
  }, [session.access_token]);

  return (
    <AppShell
      locale={locale}
      subtitle={locale === 'zh' ? '按账户查看你的全部订单。' : 'View all orders attached to your account.'}
      title={locale === 'zh' ? '我的订单' : 'My Orders'}
      userEmail={user.email ?? undefined}
    >
      <section className="customer-app-list-page">
        {orders.map((order) => {
          const isActive = order.client_status !== 'Completed' && order.client_status !== 'Dispatched';
          return (
            <Link className="customer-app-order-card" href={`/${locale}/app/orders/${order.id}`} key={order.id}>
              <div className={`customer-order-strip ${isActive ? 'customer-order-strip-active' : 'customer-order-strip-done'}`} />
              <div className="customer-app-order-card-body">
                <div className="customer-app-order-topline">
                  <strong>{order.order_no}</strong>
                  <span className={`customer-app-status-pill${isActive ? ' is-active' : ''}`}>{order.client_status || '-'}</span>
                </div>
                <span>{order.destination_country || '-'}</span>
                <span>{order.service_type || '-'} &middot; {formatDate(order.updated_at)}</span>
              </div>
            </Link>
          );
        })}
        {orders.length === 0 ? (
          <article className="customer-app-card">
            <p>{locale === 'zh' ? '当前没有归属到该账户的订单。' : 'No orders are attached to this account yet.'}</p>
            <Link className="btn btn-primary" href={`/${locale}/order/new`}>
              {locale === 'zh' ? '开始下单' : 'Start Order'}
            </Link>
          </article>
        ) : null}
      </section>
    </AppShell>
  );
}

export default function CustomerOrdersPage() {
  const params = useParams<{ locale: Locale }>();
  const locale = params.locale;

  return <AppSessionGate locale={locale}>{(session, user) => <OrdersContent locale={locale} session={session} user={user} />}</AppSessionGate>;
}
