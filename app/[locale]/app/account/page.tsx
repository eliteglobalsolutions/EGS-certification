'use client';

import { useParams } from 'next/navigation';
import type { User } from '@supabase/supabase-js';
import { AppSessionGate } from '@/components/customer-app/AppSessionGate';
import { AppShell } from '@/components/customer-app/AppShell';
import type { Locale } from '@/lib/i18n/dictionaries';

function AccountContent({ locale, user }: { locale: Locale; user: User }) {
  const initials = user.email?.slice(0, 2).toUpperCase() || '?';

  return (
    <AppShell
      locale={locale}
      title={locale === 'zh' ? '账户' : 'Account'}
      subtitle=""
    >
      <div className="customer-app-body">
        {/* Avatar + name */}
        <div className="customer-app-account-hero">
          <div className="customer-app-account-avatar">
            <span className="customer-app-account-initials">{initials}</span>
          </div>
          <div>
            <p className="customer-app-account-email">{user.email}</p>
            <p className="customer-app-account-since">
              {locale === 'zh' ? '成员自' : 'Member since'} {new Date(user.created_at).getFullYear()}
            </p>
          </div>
        </div>

        <div className="customer-app-rule" />

        {/* Service pills */}
        <p className="customer-app-kicker">{locale === 'zh' ? '服务' : 'Services'}</p>
        <div className="customer-app-pill-row" style={{ marginBottom: 20 }}>
          <span className="customer-app-pill"><span className="customer-app-pill-dot" />Apostille Service</span>
          <span className="customer-app-pill"><span className="customer-app-pill-dot" />{locale === 'zh' ? '公证认证' : 'Legalisation Service'}</span>
        </div>

        {/* Settings list */}
        <p className="customer-app-kicker">{locale === 'zh' ? '设置' : 'Settings'}</p>
        <div className="customer-app-settings-list">
          <div className="customer-app-settings-item">
            <span>{locale === 'zh' ? '邮箱地址' : 'Email address'}</span>
            <span className="customer-app-settings-value">{user.email}</span>
          </div>
          <div className="customer-app-settings-item">
            <span>{locale === 'zh' ? '账户类型' : 'Account type'}</span>
            <span className="customer-app-settings-value">Customer</span>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

export default function CustomerAccountPage() {
  const params = useParams<{ locale: Locale }>();
  const locale = params.locale;
  return (
    <AppSessionGate locale={locale}>
      {(_session, user) => <AccountContent locale={locale} user={user} />}
    </AppSessionGate>
  );
}
