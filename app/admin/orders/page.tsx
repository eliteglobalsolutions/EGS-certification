'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type Order = {
  id: string;
  order_no: string;
  client_status: string;
  internal_status: string;
  customer_email: string | null;
  created_at: string;
  updated_at: string;
};

const statuses = ['', 'received', 'under_verification', 'submitted_processing', 'action_required', 'completed', 'dispatched', 'cancelled'];

export default function AdminOrdersPage() {
  const [status, setStatus] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const query = status ? `?status=${status}` : '';
    fetch(`/api/admin/orders${query}`)
      .then((r) => r.json())
      .then((j) => setOrders(j.orders || []));
  }, [status]);

  return (
    <div className="section-card stack-md">
      <h2>Admin Orders</h2>
      <div className="actions">
        <Link className="btn btn-ghost" href="/admin/feedback">
          Review Feedback
        </Link>
      </div>
      <select className="select" value={status} onChange={(e) => setStatus(e.target.value)}>
        {statuses.map((s) => (
          <option key={s || 'all'} value={s}>
            {s || 'all'}
          </option>
        ))}
      </select>

      <div className="stack-sm">
        {orders.map((o) => (
          <div className="state-block" key={o.id}>
            <Link href={`/admin/orders/${o.id}`}>
              <strong>{o.order_no}</strong>
            </Link>
            <p className="small-text">client: {o.client_status} | internal: {o.internal_status}</p>
            <p className="small-text">{o.customer_email || '-'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
