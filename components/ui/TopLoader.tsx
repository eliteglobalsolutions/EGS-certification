'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

export function TopLoader() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const [done, setDone] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    setActive(true);
    setDone(false);

    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setDone(true);
      window.setTimeout(() => {
        setActive(false);
        setDone(false);
      }, 160);
    }, 420);

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [pathname]);

  return (
    <div aria-hidden className={`top-loader ${active ? 'is-active' : ''} ${done ? 'is-done' : ''}`}>
      <span className="top-loader-bar" />
    </div>
  );
}
