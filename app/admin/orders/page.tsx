'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type Order = { id: string; order_no: string; status: string; customer_email: string | null; created_at: string };

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
    <div className="card">
      <h2>管理后台 - 订单列表</h2>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">全部状态</option>
        <option value="created">created</option>
        <option value="paid">paid</option>
        <option value="processing">processing</option>
        <option value="need_more_docs">need_more_docs</option>
        <option value="completed">completed</option>
        <option value="cancelled">cancelled</option>
      </select>

      <ul>
        {orders.map((o) => (
          <li key={o.id}>
            <Link href={`/admin/orders/${o.id}`}>{o.order_no}</Link> - {o.status} - {o.customer_email || '-'}
          </li>
        ))}
      </ul>
    </div>
  );
}
