export function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="info-row">
      <span className="small-text">{label}</span>
      <strong>{value || '-'}</strong>
    </div>
  );
}
