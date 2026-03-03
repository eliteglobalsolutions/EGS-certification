 'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { AppCopy } from '@/lib/i18n/dictionaries';

export function MobileActionBar({ locale, t }: { locale: string; t: AppCopy }) {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      const delta = y - lastY.current;

      if (y < 80) {
        setHidden(false);
      } else if (delta > 8) {
        setHidden(false);
      } else if (delta < -8) {
        setHidden(true);
      }

      lastY.current = y;
    }

    lastY.current = window.scrollY;
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`mobile-action-bar${hidden ? ' is-hidden' : ''}`} aria-label="Mobile quick actions">
      <div className="mobile-action-bar-inner">
        <Link className="mobile-action-link" href={`/${locale}#route-checker`}>
          {t.landing.hero.ctaPrimary}
        </Link>
        <Link className="mobile-action-link mobile-action-link-primary" href={`/${locale}/intake`}>
          {t.landing.hero.ctaSecondary}
        </Link>
        <Link className="mobile-action-link" href={`/${locale}/track`}>
          {t.nav.track}
        </Link>
      </div>
    </nav>
  );
}
