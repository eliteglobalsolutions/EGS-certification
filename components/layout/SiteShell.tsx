'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useI18n } from '@/components/providers/AppProviders';

const navItems = [
  { href: '/', key: 'home' },
  { href: '/start-order', key: 'startOrder' },
  { href: '/upload-requirements', key: 'uploadRequirements' },
  { href: '/track-order', key: 'trackOrder' },
];

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { locale, setLocale, t } = useI18n();

  return (
    <>
      <header className="topbar">
        <div className="container nav-row">
          <div>
            <p className="brand">{t('brand')}</p>
            <p className="small">{t('tagline')}</p>
          </div>
          <nav className="nav-links">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={pathname === item.href ? 'active' : ''}>{t(item.key)}</Link>
            ))}
            <Link href="/help">{t('help')}</Link>
          </nav>
          <button className="ghost" onClick={() => setLocale(locale === 'en' ? 'zh' : 'en')}>{locale.toUpperCase()}</button>
        </div>
      </header>
      <main className="container page">{children}</main>
      <nav className="mobile-tabs">
        <Link href="/start-order">{t('startOrder')}</Link>
        <Link href="/upload-requirements">{t('uploadRequirements')}</Link>
        <Link href="/track-order">{t('trackOrder')}</Link>
        <Link href="/help">{t('help')}</Link>
      </nav>
    </>
  );
}
