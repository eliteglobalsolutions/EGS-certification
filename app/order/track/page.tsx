'use client';

import { FormEvent, useState } from 'react';

type TrackData = {
  order: { id: string; order_no: string; status: string; created_at: string; updated_at: string };
  events: { id: string; type: string; message: string; created_at: string }[];
  files: { id: string; role: string; file_name: string; storage_path: string; created_at: string }[];
};

export default function TrackPage() {
  const [orderNo, setOrderNo] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [error, setError] = useState('');
  const [data, setData] = useState<TrackData | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setData(null);

    const res = await fetch('/api/order/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderNo, accessToken }),
    });
    const json = await res.json();
    if (!res.ok) {
      setError(json.error || '查询失败');
      return;
    }
    setData(json);
  }

  return (
    <div className="card">
      <h2>订单查询</h2>
      <p className="small">输入订单号 + 访问码查询进度、事件和文件。</p>
      <p className="small">
        免责声明：我方为文件处理与流程协调服务，非公证人/使领馆；结果与时效受第三方机构影响；我们会尽力但不作绝对保证。
      </p>
      <form onSubmit={onSubmit}>
        <input placeholder="订单号 (EGS-...)" value={orderNo} onChange={(e) => setOrderNo(e.target.value)} />
        <input placeholder="访问码" value={accessToken} onChange={(e) => setAccessToken(e.target.value)} />
        <button type="submit">查询</button>
      </form>
      {error ? <p className="error">{error}</p> : null}

      {data ? (
        <div>
          <h3>状态：{data.order.status}</h3>
          <p className="small">下单时间：{new Date(data.order.created_at).toLocaleString()}</p>

          <h4>最近事件</h4>
          <ul>
            {data.events.map((e) => (
              <li key={e.id}>
                [{e.type}] {e.message || '-'} ({new Date(e.created_at).toLocaleString()})
              </li>
            ))}
          </ul>

          <h4>文件列表</h4>
          <ul>
            {data.files.map((f) => (
              <li key={f.id}>
                [{f.role}] {f.file_name} - <code>{f.storage_path}</code>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
