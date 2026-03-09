export function Card({
  children,
  muted = false,
  className = '',
}: {
  children: React.ReactNode;
  muted?: boolean;
  className?: string;
}) {
  return <div className={`ui-card ${muted ? 'ui-card-muted' : ''} ${className}`.trim()}>{children}</div>;
}
