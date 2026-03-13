'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { AppSessionGate } from '@/components/customer-app/AppSessionGate';
import { AppShell } from '@/components/customer-app/AppShell';
import type { Locale } from '@/lib/i18n/dictionaries';

function ProductsContent({ locale }: { locale: Locale }) {
  const cards = locale === 'zh'
    ? [
        {
          title: '海牙认证 / 领馆认证',
          body: '根据签发国家、使用国家与文件类型，确认适用路径并发起订单。',
          points: ['路径判断', '报价与支付', '后续进度追踪'],
        },
        {
          title: '文件上传与补件',
          body: '订单建立后，客户仍可继续补充文件，不需要重新开始下单。',
          points: ['原件或扫描件', '补充说明', '补件请求响应'],
        },
        {
          title: '订单查询',
          body: '一个地方查看状态、付款情况、更新时间和后续动作。',
          points: ['状态时间线', '发票或支付记录', '订单归档'],
        },
      ]
    : [
        {
          title: 'Apostille / Legalisation',
          body: 'Confirm the correct route based on issuing country, destination, and document type before checkout.',
          points: ['Route confirmation', 'Payment handoff', 'Fulfilment tracking'],
        },
        {
          title: 'Uploads and supplemental files',
          body: 'Customers can continue adding files after the order is created without restarting the process.',
          points: ['Scans or originals', 'Supporting notes', 'Upload requests'],
        },
        {
          title: 'Order tracking',
          body: 'Review status, payments, updates, and next actions in a single customer workspace.',
          points: ['Status timeline', 'Invoices and payment records', 'Order archive'],
        },
      ];

  return (
    <AppShell
      locale={locale}
      subtitle={locale === 'zh' ? '在 App 内说明核心服务，并直接连接下单流程。' : 'Present core services inside the app and connect directly into ordering.'}
      title={locale === 'zh' ? '产品与服务' : 'Products'}
    >
      <section className="customer-products-panel">
        <article className="customer-products-hero">
          <p>{locale === 'zh' ? 'EGS Services' : 'EGS Services'}</p>
          <h1>{locale === 'zh' ? '客户先看懂，再下单' : 'Understand the service, then place the order'}</h1>
          <p>
            {locale === 'zh'
              ? '这里保留适合客户决策的简版说明，不再让 App 看起来像营销站。'
              : 'This page keeps the product explanation concise, operational, and ready to hand off into ordering.'}
          </p>
          <div className="customer-products-actions">
            <Link className="btn btn-primary" href={`/${locale}/order/new`}>
              {locale === 'zh' ? '开始新订单' : 'Start New Order'}
            </Link>
            <Link className="btn btn-secondary" href={`/${locale}/app/orders`}>
              {locale === 'zh' ? '查看我的订单' : 'Open My Orders'}
            </Link>
          </div>
        </article>

        <div className="customer-products-grid">
          {cards.map((card) => (
            <article className="customer-products-card" key={card.title}>
              <h2>{card.title}</h2>
              <p>{card.body}</p>
              <ul className="customer-products-points">
                {card.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}

export default function CustomerProductsPage() {
  const params = useParams<{ locale: Locale }>();
  const locale = params.locale;

  return <AppSessionGate locale={locale}>{() => <ProductsContent locale={locale} />}</AppSessionGate>;
}
