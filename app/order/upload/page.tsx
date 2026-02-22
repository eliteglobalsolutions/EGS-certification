'use client';

import { FormEvent, useState } from 'react';

export default function UploadPage() {
  const [orderNo, setOrderNo] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [files, setFiles] = useState<FileList | null>(null);
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setMsg('');
    setErr('');
    if (!files || files.length === 0) {
      setErr('请先选择文件');
      return;
    }

    const form = new FormData();
    form.append('orderNo', orderNo);
    form.append('accessToken', accessToken);
    Array.from(files).forEach((f) => form.append('files', f));

    const res = await fetch('/api/order/upload', { method: 'POST', body: form });
    const json = await res.json();

    if (!res.ok) {
      setErr(json.error || '上传失败');
      return;
    }

    setMsg(`上传成功，共 ${json.count} 个文件。`);
  }

  return (
    <div className="card">
      <h2>上传补充材料</h2>
      <p className="small">支持 PDF/JPG/PNG，单文件不超过 10MB。</p>
      <p className="small">
        免责声明：我方为文件处理与流程协调服务，非公证人/使领馆；结果与时效受第三方机构影响；我们会尽力但不作绝对保证。
      </p>
      <form onSubmit={onSubmit}>
        <input placeholder="订单号" value={orderNo} onChange={(e) => setOrderNo(e.target.value)} />
        <input placeholder="访问码" value={accessToken} onChange={(e) => setAccessToken(e.target.value)} />
        <input type="file" accept=".pdf,.jpg,.jpeg,.png" multiple onChange={(e) => setFiles(e.target.files)} />
        <button type="submit">上传</button>
      </form>
      {err ? <p className="error">{err}</p> : null}
      {msg ? <p className="ok">{msg}</p> : null}
    </div>
  );
}
