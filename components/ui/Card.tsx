export function Card({ children, muted = false }: { children: React.ReactNode; muted?: boolean }) {
  return <div className={`ui-card ${muted ? 'ui-card-muted' : ''}`.trim()}>{children}</div>;
}
