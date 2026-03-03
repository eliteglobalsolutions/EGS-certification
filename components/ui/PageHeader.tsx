import { Button } from './Button';

type Action = { label: string; href?: string; onClick?: () => void; variant?: 'primary' | 'secondary' | 'ghost' };

export function PageHeader({
  kicker,
  title,
  subtitle,
  actions = [],
}: {
  kicker: string;
  title: string;
  subtitle: string;
  actions?: Action[];
}) {
  return (
    <header className="page-header">
      <div className="stack-sm">
        <p className="kicker">{kicker}</p>
        <h1>{title}</h1>
        <p className="body-text">{subtitle}</p>
      </div>
      {actions.length ? (
        <div className="actions">
          {actions.map((action) => (
            <Button href={action.href} key={action.label} onClick={action.onClick} variant={action.variant ?? 'primary'}>
              {action.label}
            </Button>
          ))}
        </div>
      ) : null}
    </header>
  );
}
