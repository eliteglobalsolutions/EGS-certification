'use client';

import { FormEvent, useState } from 'react';
import { TrackDashboard } from '@/components/order/TrackDashboard';
import { useI18n } from '@/components/providers/AppProviders';

export default function TrackOrderPage() {
  const { t } = useI18n();
  const [orderNo, setOrderNo] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [error, setError] = useState('');
  const [data, setData] = useState<any>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    const res = await fetch('/api/order/track', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ orderNo, accessToken }) });
    const json = await res.json();
    if (!res.ok) return setError(json.error || t('orderNotFound'));
    setData(json);
  }

  return (
    <section className="stack">
      <form className="card stack" onSubmit={onSubmit}>
        <h2>{t('trackOrder')}</h2>
        <p className="small">{t('trackHint')}</p>
        <input value={orderNo} onChange={(e) => setOrderNo(e.target.value)} placeholder="EGS-xxxx" />
        <input value={accessToken} onChange={(e) => setAccessToken(e.target.value)} placeholder="Access token" />
        <button className="btn" type="submit">Search</button>
      </form>
      {error ? <div className="card"><p className="error">{t('orderNotFound')}</p><p className="small">{t('findOrderTips')}</p></div> : null}
      {data ? <TrackDashboard data={data} /> : null}
    </section>
  );
}
