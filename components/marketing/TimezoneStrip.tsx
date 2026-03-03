'use client';

import { useEffect, useMemo, useState } from 'react';
import type { AppCopy } from '@/lib/i18n/dictionaries';

function formatHubTime(tz: string, now: Date) {
  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: tz,
  }).format(now);
}

export function TimezoneStrip({ t }: { t: AppCopy }) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const entries = useMemo(
    () =>
      t.landing.timezoneStrip.hubs.map((hub) => ({
        code: hub.code,
        time: formatHubTime(hub.tz, now),
      })),
    [now, t.landing.timezoneStrip.hubs]
  );

  return (
    <section className="timezone-strip" aria-label={t.landing.timezoneStrip.title}>
      <div className="page-container timezone-strip-inner">
        <p className="small-text timezone-strip-title">{t.landing.timezoneStrip.title}</p>
        <div className="timezone-strip-list">
          {entries.map((entry) => (
            <p className="timezone-item" key={entry.code}>
              <span>{entry.code}</span>
              <strong>{entry.time}</strong>
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
