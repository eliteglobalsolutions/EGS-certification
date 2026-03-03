import { Card } from '@/components/ui/Card';
import type { AppCopy } from '@/lib/i18n/dictionaries';

export function ProcessGrid({ t }: { t: AppCopy }) {
  return (
    <Card>
      <div className="stack-md">
        <p className="kicker">{t.home.processTitle}</p>
        <p className="small-text">{t.home.processLead}</p>
        <div className="process-grid">
          {t.home.process.map((step, idx) => (
            <div className="state-block" key={step}>
              <p className="small-text">{String(idx + 1).padStart(2, '0')}</p>
              <h3>{step}</h3>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
