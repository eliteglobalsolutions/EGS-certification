'use client';

import { FormEvent, useEffect, useState } from 'react';

const statuses = ['processing', 'need_more_docs', 'completed', 'cancelled'];

export default function AdminOrderDetailPage({ params }: { params: { orderId: string } }) {
  const [data, setData] = useState<any>(null);
  const [status, setStatus] = useState('processing');
  const [note, setNote] = useState('');
  const [msg, setMsg] = useState('');

  async function load() {
    const res = await fetch(`/api/admin/orders/${params.orderId}`);
    const json = await res.json();
    setData(json);
  }

  useEffect(() => {
    load();
  }, []);

  async function changeStatus(e: FormEvent) {
    e.preventDefault();
    const res = await fetch(`/api/admin/orders/${params.orderId}/status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, note }),
    });
    const json = await res.json();
    if (!res.ok) {
      setMsg(json.error || '更新失败');
      return;
    }
    setMsg('状态更新成功');
    load();
  }

  async function uploadFiles(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = (e.currentTarget.elements.namedItem('files') as HTMLInputElement);
    if (!input.files?.length) return;

    const form = new FormData();
    Array.from(input.files).forEach((f) => form.append('files', f));

    const res = await fetch(`/api/admin/orders/${params.orderId}/upload`, { method: 'POST', body: form });
    const json = await res.json();
    if (!res.ok) {
      setMsg(json.error || '上传失败');
      return;
    }
    setMsg('交付文件上传成功');
    e.currentTarget.reset();
    load();
  }

  if (!data?.order) return <div className="card">加载中...</div>;

  return (
    <div className="card">
      <h2>订单详情：{data.order.order_no}</h2>
      <p>状态：{data.order.status}</p>
      <p>邮箱：{data.order.customer_email || '-'}</p>

      <form onSubmit={changeStatus}>
        <h3>更新状态</h3>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          {statuses.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <textarea placeholder="备注（可选）" value={note} onChange={(e) => setNote(e.target.value)} />
        <button type="submit">提交状态更新</button>
      </form>

      <form onSubmit={uploadFiles}>
        <h3>上传交付文件</h3>
        <input name="files" type="file" accept=".pdf,.jpg,.jpeg,.png" multiple />
        <button type="submit">上传</button>
      </form>

      {msg ? <p>{msg}</p> : null}

      <h3>事件日志</h3>
      <ul>
        {(data.events || []).map((e: any) => <li key={e.id}>[{e.type}] {e.message || '-'} ({new Date(e.created_at).toLocaleString()})</li>)}
      </ul>

      <h3>文件</h3>
      <ul>
        {(data.files || []).map((f: any) => <li key={f.id}>[{f.role}] {f.file_name} - {f.storage_path}</li>)}
      </ul>
    </div>
  );
}
