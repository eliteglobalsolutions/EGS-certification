'use client';

import { FormEvent, useState } from 'react';
import { RequirementsChecklist } from '@/components/order/RequirementsChecklist';
import { useI18n } from '@/components/providers/AppProviders';
import { CollapsibleDisclaimer } from '@/components/ui/CollapsibleDisclaimer';

export default function UploadRequirementsPage() {
  const { t } = useI18n();
  const [orderNo, setOrderNo] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [files, setFiles] = useState<Record<string, File | null>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [msg, setMsg] = useState('');

  const onUpload = (id: string, file: File | null) => setFiles((prev) => ({ ...prev, [id]: file }));

  async function submit(e: FormEvent) {
    e.preventDefault();
    setMsg('');
    const payload = Object.values(files).filter(Boolean) as File[];
    if (!payload.length) return setErrors({ general: 'Please attach at least one file / 请上传至少一个文件' });

    const form = new FormData();
    form.append('orderNo', orderNo);
    form.append('accessToken', accessToken);
    payload.forEach((f) => form.append('files', f));
    const res = await fetch('/api/order/upload', { method: 'POST', body: form });
    const json = await res.json();
    if (!res.ok) return setErrors({ general: json.error || 'Upload failed / 上传失败' });
    setErrors({});
    setMsg(`Uploaded ${json.count} file(s).`);
  }

  return (
    <section className="stack">
      <div className="card"><h2>{t('uploadRequirements')}</h2><p className="small">Order number + token are required for secure upload.</p></div>
      <form className="card stack" onSubmit={submit}>
        <input placeholder="Order number" value={orderNo} onChange={(e) => setOrderNo(e.target.value)} />
        <input placeholder="Access token" value={accessToken} onChange={(e) => setAccessToken(e.target.value)} />
        <RequirementsChecklist country="default" docType="default" files={files} onUpload={onUpload} errors={errors} />
        {errors.general ? <p className="error">{errors.general}</p> : null}
        {msg ? <p className="ok">{msg}</p> : null}
        <button className="btn" type="submit">Upload files</button>
      </form>
      <CollapsibleDisclaimer />
    </section>
  );
}
