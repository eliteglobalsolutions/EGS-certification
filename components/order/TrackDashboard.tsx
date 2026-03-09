import { useI18n } from '@/components/providers/AppProviders';

const labels: Record<string, string> = {
  paid: 'Order Received', processing: 'Documents Review', need_more_docs: 'Action Required', completed: 'Completed', cancelled: 'Cancelled',
};

export function TrackDashboard({ data }: { data: any }) {
  const { t } = useI18n();
  return (
    <div className="stack">
      <div className="card"><h3>{t('timeline')}</h3><ol className="timeline"><li className="done">Order Received</li><li className={data.order.status === 'processing' ? 'done' : ''}>Documents Review</li><li className={data.order.status === 'need_more_docs' ? 'current' : ''}>Notarisation/Certification</li><li>DFAT/Apostille</li><li>Consulate (if applicable)</li><li>Dispatch</li><li className={data.order.status === 'completed' ? 'done' : ''}>Completed</li></ol><p className="small">{t('eta')}: 3-10 business days</p>{data.order.status === 'need_more_docs' ? <p className="error">{t('actionRequired')}: Please upload missing files.</p> : null}</div>
      <div className="card"><h3>{t('updateLog')}</h3><ul>{(data.events || []).map((e: any) => <li key={e.id}>[{labels[e.type] || e.type}] {e.message} · {new Date(e.created_at).toLocaleString()}</li>)}</ul></div>
      <div className="card"><h3>{t('downloads')}</h3><ul>{(data.files || []).map((f: any) => <li key={f.id}>{f.file_name} ({f.role})</li>)}</ul></div>
    </div>
  );
}
