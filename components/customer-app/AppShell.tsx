'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { getSupabaseBrowserClient } from '@/lib/supabase/browser';

export function AppShell({
  locale,
  title,
  subtitle,
  children,
}: {
  locale: 'en' | 'zh';
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const navItems = [
    {
      href: `/${locale}/app`,
      label: locale === 'zh' ? '概览' : 'Overview',
      shortLabel: locale === 'zh' ? '首页' : 'Home',
    },
    {
      href: `/${locale}/app/products`,
      label: locale === 'zh' ? '产品介绍' : 'Products',
      shortLabel: locale === 'zh' ? '产品' : 'Products',
    },
    {
      href: `/${locale}/app/orders`,
      label: locale === 'zh' ? '我的订单' : 'My Orders',
      shortLabel: locale === 'zh' ? '订单' : 'Orders',
    },
    {
      href: `/${locale}/order/new`,
      label: locale === 'zh' ? '开始下单' : 'New Order',
      shortLabel: locale === 'zh' ? '下单' : 'New',
    },
  ];

  async function signOut() {
    const supabase = getSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.replace(`/${locale}/app/auth`);
  }

  return (
    <div className="customer-app-shell">
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
              {item.label}
            </Link>
          ))}
        </nav>

        <button className="customer-app-signout" onClick={signOut} type="button">
          {locale === 'zh' ? '退出登录' : 'Sign Out'}
        </button>
      </aside>

      <main className="customer-app-main">
        <header className="customer-app-header">
          <div className="customer-app-header-copy">
            <p className="customer-app-eyebrow">{locale === 'zh' ? '已登录客户工作区' : 'Signed-in workspace'}</p>
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>
          <div className="customer-app-header-actions">
            <Link className="btn btn-secondary" href={`/${locale}/app/orders`}>
              {locale === 'zh' ? '查看订单' : 'View Orders'}
            </Link>
            <Link className="btn btn-primary" href={`/${locale}/order/new`}>
              {locale === 'zh' ? '新建订单' : 'Start Order'}
            </Link>
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
              {item.shortLabel}
            </Link>
          ))}
        </nav>
      </main>
    </div>
  );
}
