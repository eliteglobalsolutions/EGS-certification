const STATUS_CLASS: Record<string, string> = {
  received: 'status-neutral',
  under_verification: 'status-active',
  submitted_processing: 'status-active',
  completed: 'status-done',
  dispatched: 'status-done',
  action_required: 'status-warning',
  cancelled: 'status-danger',
};

export function StatusBadge({ status, label }: { status: string; label: string }) {
  const style = STATUS_CLASS[status] ?? 'status-neutral';
  return <span className={`status-badge ${style}`}>{label}</span>;
}
