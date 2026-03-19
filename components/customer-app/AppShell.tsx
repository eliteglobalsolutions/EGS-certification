'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { getSupabaseBrowserClient } from '@/lib/supabase/browser';
import { Home, ClipboardList, MessageSquare, UserCircle } from '@/lib/lucide-react';
import { TawkChat } from '@/components/customer-app/TawkChat';

export function AppShell({
  locale,
  title,
  subtitle,
  userEmail,
  children,
}: {
  locale: 'en' | 'zh';
  title: string;
  subtitle: string;
  userEmail?: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const navItems = [
    {
      href: `/${locale}/app`,
      label: locale === 'zh' ? '首页' : 'Home',
      shortLabel: locale === 'zh' ? '首页' : 'Home',
      icon: <Home size={20} />,
    },
    {
      href: `/${locale}/app/orders`,
      label: locale === 'zh' ? '我的订单' : 'Orders',
      shortLabel: locale === 'zh' ? '订单' : 'Orders',
      icon: <ClipboardList size={20} />,
    },
    {
      href: `/${locale}/app/messages`,
      label: locale === 'zh' ? '消息' : 'Messages',
      shortLabel: locale === 'zh' ? '消息' : 'Messages',
      icon: <MessageSquare size={20} />,
    },
    {
      href: `/${locale}/app/account`,
      label: locale === 'zh' ? '账户' : 'Account',
      shortLabel: locale === 'zh' ? '账户' : 'Account',
      icon: <UserCircle size={20} />,
    },
  ];

  async function signOut() {
    const supabase = getSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.replace(`/${locale}/app/auth`);
  }

  return (
    <div className="customer-app-shell">
      <TawkChat email={userEmail} />
      <aside className="customer-app-sidebar">
        <div className="customer-app-sidebar-top">
          <div className="customer-app-brand">
            <span className="customer-app-brand-mark">E</span>
            <div>
              <p>{locale === 'zh' ? '客户系统' : 'Customer App'}</p>
              <strong>EGS Workspace</strong>
            </div>
          </div>

          <div className="customer-app-sidebar-note">
            <p>{locale === 'zh' ? '订单、支付、补件与进度统一管理。' : 'Orders, payments, uploads, and progress in one workspace.'}</p>
          </div>
        </div>

        <nav className="customer-app-nav" aria-label="Customer app">
          {navItems.map((item) => (
            <Link
              className={`customer-app-nav-link${pathname === item.href ? ' is-active' : ''}`}
              href={item.href}
              key={item.href}
            >
              {item.shortLabel}
            </Link>
          ))}
        </nav>

        <button className="customer-app-signout" onClick={signOut} type="button">
          {locale === 'zh' ? '退出登录' : 'Sign Out'}
        </button>
      </aside>

      <main className="customer-app-main">
        <div className="customer-app-nbar">
          <span className="customer-app-nbar-brand">E</span>
          <span className="customer-app-nbar-title">{title}</span>
          <span className="customer-app-avatar" aria-hidden="true" />
        </div>

        <header className="customer-app-header">
          <div className="customer-app-header-copy">
            <p className="customer-app-eyebrow">{locale === 'zh' ? '已登录客户工作区' : 'Signed-in workspace'}</p>
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>
        </header>

        <div className="customer-app-content">{children}</div>

        <nav className="customer-app-mobile-nav" aria-label="Customer app mobile">
          {navItems.map((item) => (
            <Link
              className={`customer-app-mobile-link${pathname === item.href ? ' is-active' : ''}`}
              href={item.href}
              key={item.href}
            >
              {item.icon}
              <span>{item.shortLabel}</span>
            </Link>
          ))}
        </nav>
      </main>
    </div>
  );
}
