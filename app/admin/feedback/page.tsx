'use client';

import { useEffect, useState } from 'react';

type FeedbackItem = {
  id: string;
  locale: 'en' | 'zh';
  name: string;
  service_type: string | null;
  quote: string;
  rating: number;
  status: 'pending' | 'approved' | 'rejected';
  admin_note: string | null;
  created_at: string;
  reviewed_at: string | null;
};

const FILTERS = ['', 'pending', 'approved', 'rejected'] as const;

export default function AdminFeedbackPage() {
  const [status, setStatus] = useState<(typeof FILTERS)[number]>('pending');
  const [items, setItems] = useState<FeedbackItem[]>([]);
  const [savingId, setSavingId] = useState('');
  const [adminNote, setAdminNote] = useState<Record<string, string>>({});

  function getAuthHeader(): string | null {
    const existing = window.sessionStorage.getItem('admin_basic_auth');
    if (existing) return existing;

    const username = window.prompt('Admin username', 'admin') || '';
    const password = window.prompt('Admin password') || '';
    if (!username || !password) return null;

    const token = `Basic ${btoa(`${username}:${password}`)}`;
    window.sessionStorage.setItem('admin_basic_auth', token);
    return token;
  }

  async function load() {
    const auth = getAuthHeader();
    if (!auth) return;
    const query = status ? `?status=${status}` : '';
    const res = await fetch(`/api/admin/feedback${query}`, { headers: { authorization: auth } });
    if (res.status === 401) {
      window.sessionStorage.removeItem('admin_basic_auth');
      return;
    }
    const json = await res.json();
    setItems(json.feedback || []);
  }

  useEffect(() => {
    load();
  }, [status]);

  async function review(id: string, nextStatus: 'approved' | 'rejected') {
    const auth = getAuthHeader();
    if (!auth) return;
    setSavingId(id);
    await fetch(`/api/admin/feedback/${id}`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json', authorization: auth },
      body: JSON.stringify({
        status: nextStatus,
        adminNote: adminNote[id] || '',
      }),
    });
    setSavingId('');
    await load();
  }

  return (
    <div className="section-card stack-md">
      <h2>Admin Feedback Review</h2>
      <select className="select" onChange={(e) => setStatus(e.target.value as (typeof FILTERS)[number])} value={status}>
        {FILTERS.map((value) => (
          <option key={value || 'all'} value={value}>
            {value || 'all'}
          </option>
        ))}
      </select>

      <div className="stack-sm">
        {items.map((item) => (
          <div className="state-block stack-sm" key={item.id}>
            <p>
              <strong>{item.name}</strong> · {item.service_type || '-'} · {item.locale} · {item.rating}/5
            </p>
            <p>{item.quote}</p>
            <p className="small-text">status: {item.status}</p>
            <textarea
              className="textarea"
              onChange={(e) => setAdminNote((prev) => ({ ...prev, [item.id]: e.target.value }))}
              placeholder="Admin note (optional)"
              value={adminNote[item.id] ?? item.admin_note ?? ''}
            />
            <div className="actions">
              <button className="btn btn-primary" disabled={savingId === item.id} onClick={() => review(item.id, 'approved')} type="button">
                Approve
              </button>
              <button className="btn btn-secondary" disabled={savingId === item.id} onClick={() => review(item.id, 'rejected')} type="button">
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
