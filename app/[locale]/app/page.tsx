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
  user,
}: {
  locale: Locale;
  session: Session;
  user: User;
}) {
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const activeOrders = orders.filter((order) => order.client_status !== 'Completed').length;
  const latestOrder = orders[0] || null;

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
    <AppShell
      locale={locale}
      subtitle={locale === 'zh' ? '管理你的认证订单、支付与文件提交。' : 'Manage orders, payments, and uploads in one customer workspace.'}
      title={locale === 'zh' ? '客户概览' : 'Customer Overview'}
    >
      <section className="customer-app-grid">
        <article className="customer-app-card customer-app-card-hero">
          <p className="customer-app-card-kicker">{locale === 'zh' ? '欢迎回来' : 'Welcome back'}</p>
          <h2>{user.email}</h2>
          <p>
            {locale === 'zh'
              ? '从这里开始下单、查看当前订单、继续上传材料，或者查看产品与适用路径。'
              : 'Start a new order, continue an existing one, and review product options without leaving the app shell.'}
          </p>
          <div className="customer-app-stat-strip">
            <div>
              <strong className="customer-app-stat-num">{orders.length}</strong>
              <span>{locale === 'zh' ? '总订单' : 'Total orders'}</span>
            </div>
            <div>
              <strong className="customer-app-stat-num">{activeOrders}</strong>
              <span>{locale === 'zh' ? '处理中' : 'Active'}</span>
            </div>
            <div>
              <strong className="customer-app-stat-num">{latestOrder?.order_no || '--'}</strong>
              <span>{locale === 'zh' ? '最近订单' : 'Latest order'}</span>
            </div>
          </div>
          <div className="customer-app-card-actions">
            <Link className="btn btn-primary" href={`/${locale}/order/new`}>
              {locale === 'zh' ? '开始下单' : 'Start Order'}
            </Link>
            <Link className="btn btn-secondary" href={`/${locale}/app/products`}>
              {locale === 'zh' ? '产品介绍' : 'Product Guide'}
            </Link>
          </div>
        </article>

        <article className="customer-app-card">
          <p className="customer-app-card-kicker">{locale === 'zh' ? '最近订单' : 'Recent orders'}</p>
          {loading ? <p>{locale === 'zh' ? '载入中…' : 'Loading…'}</p> : null}
          {!loading && orders.length === 0 ? (
            <p>{locale === 'zh' ? '还没有订单。你可以立即开始第一个订单。' : 'No orders yet. Start your first order now.'}</p>
          ) : null}
          <div className="customer-app-order-list">
            {orders.slice(0, 4).map((order) => {
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
                    <span>{order.service_type || '-'}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </article>

        <article className="customer-app-card">
          <p className="customer-app-card-kicker">{locale === 'zh' ? '下一步' : 'Next actions'}</p>
          <div className="customer-app-task-list">
            <div className="customer-app-task-item">
              <strong>{locale === 'zh' ? '1. 确认服务路径' : '1. Confirm the route'}</strong>
              <p>{locale === 'zh' ? '先从产品页或下单页进入服务选择。' : 'Start from products or go directly into the order flow.'}</p>
            </div>
            <div className="customer-app-task-item">
              <strong>{locale === 'zh' ? '2. 提交订单并支付' : '2. Submit and pay'}</strong>
              <p>{locale === 'zh' ? '订单创建后继续走现有 Stripe 支付流程。' : 'After order creation, continue into the existing Stripe checkout.'}</p>
            </div>
            <div className="customer-app-task-item">
              <strong>{locale === 'zh' ? '3. 查看更新与补件' : '3. Review updates and uploads'}</strong>
              <p>{locale === 'zh' ? '后续在订单详情页查看状态和上传要求。' : 'Use order detail to monitor status and respond to upload requests.'}</p>
            </div>
          </div>
        </article>
      </section>
    </AppShell>
  );
}

export default function CustomerAppHomePage() {
  const params = useParams<{ locale: Locale }>();
  const locale = params.locale;

  return <AppSessionGate locale={locale}>{(session, user) => <DashboardContent locale={locale} session={session} user={user} />}</AppSessionGate>;
}
