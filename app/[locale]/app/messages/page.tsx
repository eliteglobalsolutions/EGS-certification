'use client';

import { useParams } from 'next/navigation';
import { AppSessionGate } from '@/components/customer-app/AppSessionGate';
import { AppShell } from '@/components/customer-app/AppShell';
import type { Locale } from '@/lib/i18n/dictionaries';

function MessagesContent({ locale }: { locale: Locale }) {
  return (
    <AppShell
      locale={locale}
      title={locale === 'zh' ? '消息' : 'Messages'}
      subtitle=""
    >
      <div className="customer-app-body">
        <p className="customer-app-kicker">{locale === 'zh' ? '订单消息' : 'Order messages'}</p>
        <div className="customer-app-empty">
          <p className="customer-app-empty-text">{locale === 'zh' ? '暂无消息。' : 'No messages yet.'}</p>
          <p className="customer-app-empty-sub">{locale === 'zh' ? '提交订单后与团队沟通。' : 'Message the team after submitting an order.'}</p>
        </div>
      </div>
    </AppShell>
  );
}

export default function CustomerMessagesPage() {
  const params = useParams<{ locale: Locale }>();
  const locale = params.locale;
  return <AppSessionGate locale={locale}>{() => <MessagesContent locale={locale} />}</AppSessionGate>;
}
