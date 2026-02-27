'use client';

import { useEffect, useMemo, useState } from 'react';
import { useI18n } from '@/components/providers/AppProviders';
import { CollapsibleDisclaimer } from '@/components/ui/CollapsibleDisclaimer';
import { RequirementsChecklist, getChecklist } from '@/components/order/RequirementsChecklist';

type Draft = { country: string; docType: string; speed: 'standard' | 'express'; files: Record<string, File | null> };
const initDraft: Draft = { country: '', docType: '', speed: 'standard', files: {} };

export default function Wizard() {
  const { t } = useI18n();
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<Draft>(initDraft);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    const raw = window.localStorage.getItem('order_draft_v1');
    if (raw) {
      const parsed = JSON.parse(raw);
      setDraft({ ...initDraft, ...parsed, files: {} });
      setMessage(t('restoreDraft'));
    }
  }, [t]);

  useEffect(() => {
    window.localStorage.setItem('order_draft_v1', JSON.stringify({ ...draft, files: {} }));
  }, [draft]);

  const checklist = useMemo(() => getChecklist(draft.country, draft.docType), [draft.country, draft.docType]);

  const validateStep = () => {
    const nextErrors: Record<string, string> = {};
    if (step === 1) {
      if (!draft.country) nextErrors.country = 'Please select country / 请选择国家';
      if (!draft.docType) nextErrors.docType = 'Please select document type / 请选择文件类型';
    }
    if (step === 2) {
      checklist.forEach((item) => {
        if (!draft.files[item.id]) nextErrors[item.id] = 'File required / 需要上传文件';
      });
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const onUpload = (id: string, file: File | null) => {
    if (!file) return setDraft((d) => ({ ...d, files: { ...d.files, [id]: null } }));
    if (!['application/pdf', 'image/jpeg', 'image/png'].includes(file.type)) {
      return setErrors((e) => ({ ...e, [id]: 'Invalid format / 文件格式不支持' }));
    }
    if (file.size > 10 * 1024 * 1024) {
      return setErrors((e) => ({ ...e, [id]: 'File too large / 文件超过 10MB' }));
    }
    setErrors((e) => ({ ...e, [id]: '' }));
    setDraft((d) => ({ ...d, files: { ...d.files, [id]: file } }));
  };

  return (
    <section className="stack">
      <div className="card"><p className="small">{[t('step1'), t('step2'), t('step3')][step - 1]}</p><div className="progress"><span style={{ width: `${(step / 3) * 100}%` }} /></div>{message ? <p className="ok">{message}</p> : null}</div>
      {step === 1 ? <div className="card stack"><label>{t('country')}<input placeholder="Australia" value={draft.country} onChange={(e) => setDraft({ ...draft, country: e.target.value })} /></label>{errors.country ? <p className="error">{errors.country}</p> : null}
        <label>{t('documentType')}<select value={draft.docType} onChange={(e) => setDraft({ ...draft, docType: e.target.value })}><option value="">Select</option><option value="birth">Birth Certificate</option><option value="degree">Degree Certificate</option></select></label>{errors.docType ? <p className="error">{errors.docType}</p> : null}
        <label>{t('speed')}<select value={draft.speed} onChange={(e) => setDraft({ ...draft, speed: e.target.value as Draft['speed'] })}><option value="standard">{t('standard')}</option><option value="express">{t('express')}</option></select></label>
        <p className="small"><strong>{t('whatNext')}:</strong> We validate files, confirm requirements, and proceed to payment and processing.</p></div> : null}
      {step === 2 ? <div><p className="small">{t('uploadHint')}</p><RequirementsChecklist country={draft.country} docType={draft.docType} files={draft.files} onUpload={onUpload} errors={errors} /><p className="small">Can’t upload? Email support with your order number after payment.</p></div> : null}
      {step === 3 ? <div className="card stack"><h3>Review</h3><p>{draft.country || '-'} · {draft.docType || '-'} · {draft.speed}</p><p className="small">Fee: base $120 + service options. ETA: 3-7 business days.</p><CollapsibleDisclaimer />
      <button className="btn" onClick={() => (fetch('/api/checkout/session', { method: 'POST' }).then(r => r.json()).then(j => j.url && (window.location.href = j.url)))}>{t('payNow')}</button></div> : null}
      <div className="row-actions">{step > 1 ? <button className="ghost" onClick={() => setStep((s) => s - 1)}>{t('back')}</button> : <span />}{step < 3 ? <button className="btn" onClick={() => validateStep() && setStep((s) => s + 1)}>{t('next')}</button> : null}</div>
    </section>
  );
}
