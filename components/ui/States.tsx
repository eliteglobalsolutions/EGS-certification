export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="state-block stack-sm">
      <strong>{title}</strong>
      <p className="small-text">{body}</p>
    </div>
  );
}

export function LoadingState({ title, body }: { title: string; body: string }) {
  return (
    <div className="state-block stack-sm">
      <strong>{title}</strong>
      <p className="small-text">{body}</p>
    </div>
  );
}

export function ErrorState({ title, body }: { title: string; body: string }) {
  return (
    <div className="state-block stack-sm">
      <strong>{title}</strong>
      <p className="error-text">{body}</p>
    </div>
  );
}
