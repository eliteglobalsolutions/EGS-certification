'use client';

import { FormEvent, useEffect, useState } from 'react';

const statuses = ['received', 'initial_verification', 'processing', 'awaiting_documents', 'completed', 'dispatched', 'cancelled'];
const clientStatuses = ['received', 'under_verification', 'submitted_processing', 'action_required', 'completed', 'dispatched', 'cancelled'];

function eventTypeLabel(type: string) {
  switch (type) {
    case 'UPLOAD_PORTAL':
      return 'Initial Upload (Portal)';
    case 'UPLOAD_SUPPLEMENTAL':
      return 'Supplemental Upload (Portal)';
    case 'EMAIL_SUBMISSION_CONFIRMED':
      return 'Email Submission Confirmed';
    default:
      return type;
  }
}

export default function AdminOrderDetailPage({ params }: { params: { orderId: string } }) {
  const [data, setData] = useState<any>(null);
  const [internalStatus, setInternalStatus] = useState('processing');
  const [internalNote, setInternalNote] = useState('');
  const [clientStatus, setClientStatus] = useState('under_verification');
  const [clientNote, setClientNote] = useState('');
  const [syncClientStatus, setSyncClientStatus] = useState(true);
  const [msg, setMsg] = useState('');
  const [replaying, setReplaying] = useState(false);
  const [refunding, setRefunding] = useState(false);

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
      body: JSON.stringify({ internalStatus, internalNote, clientStatus, clientNote, syncClientStatus }),
    });
    const json = await res.json();
    if (!res.ok) {
      setMsg(json.error || 'Update failed');
      return;
    }
    setMsg('Status updated');
    load();
  }

  async function uploadFiles(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem('files') as HTMLInputElement;
    if (!input.files?.length) return;

    const form = new FormData();
    Array.from(input.files).forEach((f) => form.append('files', f));

    const res = await fetch(`/api/admin/orders/${params.orderId}/upload`, { method: 'POST', body: form });
    const json = await res.json();
    if (!res.ok) {
      setMsg(json.error || 'Upload failed');
      return;
    }
    setMsg('Delivery files uploaded');
    e.currentTarget.reset();
    load();
  }

  async function replayStripe() {
    setReplaying(true);
    const res = await fetch(`/api/admin/orders/${params.orderId}/replay-stripe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    const json = await res.json();
    setReplaying(false);
    if (!res.ok) {
      setMsg(json.error || 'Replay failed');
      return;
    }
    setMsg(`Stripe replayed (${json.sessionId})`);
    load();
  }

  async function refundPayment() {
    setRefunding(true);
    const res = await fetch(`/api/admin/orders/${params.orderId}/refund`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    const json = await res.json();
    setRefunding(false);
    if (!res.ok) {
      setMsg(json.error || 'Refund failed');
      return;
    }
    setMsg(`Refund created (${json.refund?.id || 'ok'})`);
    load();
  }

  if (!data?.order) return <div className="section-card">Loading...</div>;

  return (
    <div className="stack-lg">
      <section className="section-card stack-sm">
        <h2>Order {data.order.order_no}</h2>
        <p className="small-text">client: {data.order.client_status || '-'}</p>
        <p className="small-text">internal: {data.order.internal_status || '-'}</p>
        <p className="small-text">email: {data.order.customer_email || '-'}</p>
        <p className="small-text">stripe_session_id: {data.order.stripe_session_id || '-'}</p>
        <button className="btn btn-secondary" disabled={replaying} onClick={replayStripe} type="button">
          {replaying ? 'Replaying...' : 'Replay Stripe Payment'}
        </button>
        <button className="btn btn-ghost" disabled={refunding} onClick={refundPayment} type="button">
          {refunding ? 'Refunding...' : 'Issue Full Refund'}
        </button>
      </section>

      <section className="section-card stack-md">
        <h3>Update Status</h3>
        <form className="stack-sm" onSubmit={changeStatus}>
          <select className="select" value={internalStatus} onChange={(e) => setInternalStatus(e.target.value)}>
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <label className="small-text">
            <input checked={syncClientStatus} onChange={(e) => setSyncClientStatus(e.target.checked)} type="checkbox" /> Sync mapped client_status
          </label>
          <select className="select" disabled={syncClientStatus} value={clientStatus} onChange={(e) => setClientStatus(e.target.value)}>
            {clientStatuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <textarea className="textarea" placeholder="Internal note" value={internalNote} onChange={(e) => setInternalNote(e.target.value)} />
          <textarea className="textarea" placeholder="Client visible note" value={clientNote} onChange={(e) => setClientNote(e.target.value)} />
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      </section>

      <section className="section-card stack-md">
        <h3>Upload Delivery Files</h3>
        <form className="stack-sm" onSubmit={uploadFiles}>
          <input className="input" name="files" type="file" accept=".pdf,.jpg,.jpeg,.png" multiple />
          <button className="btn btn-secondary" type="submit">
            Upload
          </button>
        </form>
      </section>

      {msg ? <p className="small-text">{msg}</p> : null}

      <section className="section-card stack-md">
        <h3>History</h3>
        <ul>
          {(data.history || []).map((h: any) => (
            <li key={h.id}>
              [{h.client_status}] {h.note || '-'} ({new Date(h.created_at).toLocaleString()})
            </li>
          ))}
        </ul>
      </section>

      <section className="section-card stack-md">
        <h3>Submission Events / Evidence Log</h3>
        <ul>
          {(data.submissionEvents || []).map((e: any) => (
            <li key={e.id}>
              [{eventTypeLabel(e.event_type)}] channel={e.channel}
              {typeof e.payload?.file_count === 'number' ? ` file_count=${e.payload.file_count}` : ''}
              {typeof e.payload?.ack_subject_rule === 'boolean' ? ` ack_subject=${e.payload.ack_subject_rule}` : ''}
              {typeof e.payload?.ack_email_risk === 'boolean' ? ` ack_risk=${e.payload.ack_email_risk}` : ''}
              {' '}
              ({new Date(e.created_at).toLocaleString()})
            </li>
          ))}
        </ul>
      </section>

      <section className="section-card stack-md">
        <h3>Payments</h3>
        <ul>
          {(data.payments || []).map((p: any) => (
            <li key={p.id}>
              [{p.event_type}] {p.status || '-'} {typeof p.amount === 'number' ? `${p.amount} ${String(p.currency || '').toUpperCase()}` : '-'}
              {p.risk_level ? ` risk=${p.risk_level}${typeof p.risk_score === 'number' ? `(${p.risk_score})` : ''}` : ''}
              {' '}
              ({new Date(p.created_at).toLocaleString()})
            </li>
          ))}
        </ul>
      </section>

      <section className="section-card stack-md">
        <h3>Files</h3>
        {(data.files || []).length === 0 ? <p className="small-text">No files uploaded yet.</p> : null}
        <ul>
          {(data.files || []).map((f: any) => (
            <li key={f.id}>
              [{f.role}] {f.file_name} ({new Date(f.created_at).toLocaleString()})
              {f.download_url ? (
                <>
                  {' '}
                  <a className="inline-link" href={f.download_url} target="_blank" rel="noreferrer">
                    Download
                  </a>
                </>
              ) : null}
              {f.storage_path ? (
                <>
                  <br />
                  <span className="small-text">{f.storage_path}</span>
                </>
              ) : null}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
