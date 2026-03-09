export const CLIENT_TIMELINE = ['received', 'under_verification', 'submitted_processing', 'completed', 'dispatched'] as const;

const LEGACY_TO_CLIENT: Record<string, string> = {
  created: 'received',
  paid: 'under_verification',
  processing: 'submitted_processing',
  need_more_docs: 'action_required',
  completed: 'completed',
  cancelled: 'cancelled',
};

export function normalizeClientStatus(status: string | null | undefined): string {
  if (!status) return 'received';
  if (CLIENT_TIMELINE.includes(status as (typeof CLIENT_TIMELINE)[number])) return status;
  return LEGACY_TO_CLIENT[status] ?? status;
}

export function clientTimelineIndex(status: string): number {
  const normalized = normalizeClientStatus(status);
  if (normalized === 'action_required') return 1;
  if (normalized === 'cancelled') return 0;
  const idx = CLIENT_TIMELINE.indexOf(normalized as (typeof CLIENT_TIMELINE)[number]);
  return idx >= 0 ? idx : 0;
}

export function mapInternalToClient(internalStatus: string): string {
  const map: Record<string, string> = {
    received: 'received',
    initial_verification: 'under_verification',
    processing: 'submitted_processing',
    awaiting_documents: 'action_required',
    completed: 'completed',
    dispatched: 'dispatched',
    cancelled: 'cancelled',
  };
  return map[internalStatus] ?? 'under_verification';
}

export function mapClientToLegacyStatus(clientStatus: string): string {
  const map: Record<string, string> = {
    received: 'pending',
    under_verification: 'paid',
    submitted_processing: 'processing',
    action_required: 'need_more_docs',
    completed: 'completed',
    dispatched: 'completed',
    cancelled: 'cancelled',
  };
  return map[clientStatus] ?? 'processing';
}
