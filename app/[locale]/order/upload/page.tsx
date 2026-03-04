'use client';

import { FormEvent, useState } from 'react';
import { useParams } from 'next/navigation';
import { PageHeader } from '@/components/ui/PageHeader';
import { ErrorState } from '@/components/ui/States';
import { getCopy, type Locale } from '@/lib/i18n/dictionaries';

export default function UploadPage() {
  const params = useParams<{ locale: Locale }>();
  const locale = params.locale;
  const t = getCopy(locale);

  const [orderNo, setOrderNo] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [surname, setSurname] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [passportDocs, setPassportDocs] = useState<File[]>([]);
  const [supportingIdDocs, setSupportingIdDocs] = useState<File[]>([]);
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const [lookupOrderId, setLookupOrderId] = useState('');
  const [showFallback, setShowFallback] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [ackSubjectRule, setAckSubjectRule] = useState(false);
  const [ackEmailRisk, setAckEmailRisk] = useState(false);
  const [fallbackNote, setFallbackNote] = useState('');
  const [emailConfirmedAt, setEmailConfirmedAt] = useState('');

  async function resolveOrderId() {
    if (lookupOrderId) return lookupOrderId;
    const lookup = await fetch('/api/order/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderNo, accessToken, surname }),
    });
    const lookupJson = await lookup.json();
    if (!lookup.ok || !lookupJson?.order?.id) {
      throw new Error(lookupJson?.error || t.track.title);
    }
    setLookupOrderId(lookupJson.order.id);
    return lookupJson.order.id as string;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setMsg('');
    setErr('');
    if (files.length === 0 || passportDocs.length === 0 || supportingIdDocs.length === 0) {
      setErr(t.order.errors.required);
      return;
    }

    const form = new FormData();
    form.append('orderNo', orderNo);
    form.append('accessToken', accessToken);
    form.append('surname', surname);
    files.forEach((f) => form.append('files', f));
    passportDocs.forEach((f) => form.append('passportDocs', f));
    supportingIdDocs.forEach((f) => form.append('supportingIdDocs', f));

    const res = await fetch('/api/order/upload', { method: 'POST', body: form });
    const json = await res.json();

    if (!res.ok) {
      setErr(json.error || t.order.errors.upload);
      return;
    }

    setMsg(t.upload.success);
  }

  async function confirmEmailSubmission() {
    setErr('');
    setMsg('');
    if (!ackSubjectRule || !ackEmailRisk) {
      setErr(t.portal.fallback.confirmModal.title);
      return;
    }
    try {
      const orderId = await resolveOrderId();
      const res = await fetch(`/api/orders/${orderId}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderNo,
          accessToken,
          eventType: 'EMAIL_SUBMISSION_CONFIRMED',
          ackSubjectRule,
          ackEmailRisk,
          note: fallbackNote,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setErr(json.error || t.order.errors.upload);
        return;
      }
      setShowConfirmModal(false);
      setEmailConfirmedAt(json.event?.created_at || new Date().toISOString());
      setMsg(`${t.portal.fallback.confirmed} ${new Date(json.event?.created_at || Date.now()).toLocaleString()}`);
    } catch (error: any) {
      setErr(error?.message || t.order.errors.upload);
    }
  }

  return (
    <section className="section-card stack-md">
      <PageHeader kicker={t.upload.kicker} title={t.upload.title} subtitle={t.upload.subtitle} />
      <div className="actions">
        <span className="small-text">{locale === 'zh' ? '首次提交：支付前上传' : 'Initial upload: before payment checkout'}</span>
        <span className="small-text">{locale === 'zh' ? '补充提交：本页上传' : 'Supplemental upload: this page'}</span>
      </div>
      <details className="ui-card ui-card-muted stack-sm" open={showChecklist} onToggle={(e) => setShowChecklist((e.target as HTMLDetailsElement).open)}>
        <summary className="small-text">{t.order.labels.checklistToggle}</summary>
        <div className="grid-2">
          <div className="ui-card stack-sm">
            <p className="small-text"><strong>{t.portal.checklist.identity.title}</strong></p>
            <ul className="list-plain">
              <li className="small-text">{t.portal.checklist.identity.passportRule}</li>
            </ul>
          </div>
          <div className="ui-card stack-sm">
            <p className="small-text"><strong>{t.portal.checklist.secondary.title}</strong></p>
            <ul className="list-plain">
              {t.portal.checklist.secondary.rules.map((rule) => (
                <li className="small-text" key={rule}>{rule}</li>
              ))}
            </ul>
          </div>
          <div className="ui-card stack-sm">
            <p className="small-text"><strong>{t.portal.checklist.scan.title}</strong></p>
            <ul className="list-plain">
              {t.portal.checklist.scan.rules.map((rule) => (
                <li className="small-text" key={rule}>{rule}</li>
              ))}
            </ul>
          </div>
          <div className="ui-card stack-sm">
            <p className="small-text"><strong>{t.portal.checklist.signature.title}</strong></p>
            <ul className="list-plain">
              {t.portal.checklist.signature.rules.map((rule) => (
                <li className="small-text" key={rule}>{rule}</li>
              ))}
            </ul>
          </div>
          <div className="ui-card stack-sm">
            <p className="small-text"><strong>{t.portal.checklist.originals.title}</strong></p>
            <ul className="list-plain">
              {t.portal.checklist.originals.rules.map((rule) => (
                <li className="small-text" key={rule}>{rule}</li>
              ))}
            </ul>
          </div>
          <div className="ui-card stack-sm">
            <p className="small-text"><strong>{t.portal.checklist.overseas.title}</strong></p>
            <ul className="list-plain">
              {t.portal.checklist.overseas.rules.map((rule) => (
                <li className="small-text" key={rule}>{rule}</li>
              ))}
            </ul>
          </div>
        </div>
      </details>

      <form className="stack-sm" onSubmit={onSubmit}>
        <input className="input" placeholder={t.track.ref} value={orderNo} onChange={(e) => setOrderNo(e.target.value)} />
        <input className="input" placeholder={t.track.token} value={accessToken} onChange={(e) => setAccessToken(e.target.value)} />
        <input className="input" placeholder={t.track.surname} value={surname} onChange={(e) => setSurname(e.target.value)} />
        <div className="grid-2">
          <div className="ui-card stack-sm">
            <h3>{locale === 'zh' ? '主体文件上传' : 'Primary document upload'}</h3>
            <label className="small-text">{t.order.labels.uploadDocs}</label>
            <input
              className="input"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              multiple
              onChange={(e) => setFiles(Array.from(e.target.files || []))}
            />
          </div>
          <div className="ui-card stack-sm">
            <h3>{locale === 'zh' ? '护照上传（必传）' : 'Passport upload (required)'}</h3>
            <label className="small-text">{t.order.labels.uploadPassport}</label>
            <input
              className="input"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              multiple
              onChange={(e) => setPassportDocs(Array.from(e.target.files || []))}
            />
          </div>
        </div>
        <div className="ui-card stack-sm">
          <h3>{locale === 'zh' ? '辅助证件上传' : 'Supporting ID upload'}</h3>
          <label className="small-text">{t.order.labels.uploadSupportingId}</label>
          <input
            className="input"
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            multiple
            onChange={(e) => setSupportingIdDocs(Array.from(e.target.files || []))}
          />
        </div>
        {files.length > 0 ? (
          <p className="small-text">{locale === 'zh' ? `已选择主体文件：${files.length}` : `Selected primary documents: ${files.length}`}</p>
        ) : null}
        {passportDocs.length > 0 ? (
          <p className="small-text">{locale === 'zh' ? `已选择护照文件：${passportDocs.length}` : `Selected passport files: ${passportDocs.length}`}</p>
        ) : null}
        {supportingIdDocs.length > 0 ? (
          <p className="small-text">{locale === 'zh' ? `已选择辅助证件：${supportingIdDocs.length}` : `Selected supporting ID files: ${supportingIdDocs.length}`}</p>
        ) : null}
        <button className="btn btn-primary" type="submit">
          {t.upload.submit}
        </button>
      </form>

      <details className="section-card upload-fallback-panel" open={showFallback} onToggle={(e) => setShowFallback((e.target as HTMLDetailsElement).open)}>
        <summary className="small-text">{t.portal.fallback.title}</summary>
        <div className="stack-sm">
          <p className="small-text">
            <strong>{t.portal.fallback.email}</strong>
          </p>
          <p className="small-text">{t.portal.fallback.subjectRule}</p>
          <p className="small-text"><strong>{locale === 'zh' ? '附件要求' : 'Attachment requirements'}</strong></p>
          <ul className="list-plain">
            {t.portal.fallback.attachmentRules.map((rule) => (
              <li className="small-text" key={rule}>{rule}</li>
            ))}
          </ul>
          <p className="small-text"><strong>{locale === 'zh' ? '免责声明' : 'Important notes'}</strong></p>
          <ul className="list-plain">
            {t.portal.fallback.disclaimerRules.map((rule) => (
              <li className="small-text" key={rule}>{rule}</li>
            ))}
          </ul>
          <div className="actions">
            <button className="btn btn-secondary" onClick={() => setShowConfirmModal(true)} type="button">
              {t.portal.fallback.confirmButton}
            </button>
          </div>
          <div className="actions">
            <a className="btn btn-ghost" href={`/${locale}/order/upload`}>
              {t.portal.fallback.returnToUpload}
            </a>
            <a className="btn btn-ghost" href={`/${locale}/order/track`}>
              {t.portal.fallback.trackOrder}
            </a>
          </div>
          {emailConfirmedAt ? (
            <p className="ok-text">
              {t.portal.fallback.confirmed} {new Date(emailConfirmedAt).toLocaleString()}
            </p>
          ) : null}
        </div>
      </details>

      {showConfirmModal ? (
        <div
    className="modal-backdrop"
    role="dialog"
    aria-modal="true"
    aria-label={t.portal.fallback.confirmModal.title}
    onClick={() => setShowConfirmModal(false)}
  >
    <div className="modal-panel stack-sm" onClick={(e) => e.stopPropagation()}>


          <div className="modal-panel stack-sm">
            <h3>{t.portal.fallback.confirmModal.title}</h3>
            <label className="small-text">
              <input checked={ackSubjectRule} onChange={(e) => setAckSubjectRule(e.target.checked)} type="checkbox" /> {t.portal.fallback.confirmModal.checkboxSubject}
            </label>
            <label className="small-text">
              <input checked={ackEmailRisk} onChange={(e) => setAckEmailRisk(e.target.checked)} type="checkbox" /> {t.portal.fallback.confirmModal.checkboxRisk}
            </label>
            <label className="small-text" htmlFor="fallback-note">{t.portal.fallback.confirmModal.noteLabel}</label>
            <textarea
              className="textarea"
              id="fallback-note"
              placeholder={locale === 'zh' ? '例如：上传失败后已通过邮箱提交 3 份 PDF。' : 'e.g. Upload failed, emailed 3 PDF files.'}
              value={fallbackNote}
              onChange={(e) => setFallbackNote(e.target.value)}
            />
            <div className="actions">
              <button className="btn btn-primary" type="button" onClick={confirmEmailSubmission}>
                {t.portal.fallback.confirmModal.submit}
              </button>
              <button className="btn btn-ghost" type="button" onClick={() => setShowConfirmModal(false)}>
                {t.portal.fallback.confirmModal.cancel}
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {err ? <ErrorState title={t.common.error} body={err} /> : null}
      {msg ? <p className="ok-text">{msg}</p> : null}
    </section>
  );
}
