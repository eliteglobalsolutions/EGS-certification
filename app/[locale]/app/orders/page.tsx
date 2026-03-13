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
    >
      <section className="customer-app-list-page">
        {orders.map((order) => (
          <Link className="customer-app-order-row" href={`/${locale}/app/orders/${order.id}`} key={order.id}>
            <div>
              <strong>{order.order_no}</strong>
              <p>{order.destination_country || '-'}</p>
              <span className="customer-app-row-meta">{order.service_type || '-'}</span>
            </div>
            <div>
              <strong className="customer-app-status-pill">{order.client_status || '-'}</strong>
              <p>{formatDate(order.updated_at)}</p>
            </div>
          </Link>
        ))}
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
