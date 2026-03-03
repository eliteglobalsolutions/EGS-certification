import { Card } from '@/components/ui/Card';
import type { AppCopy } from '@/lib/i18n/dictionaries';

export function Standards({ t }: { t: AppCopy }) {
  return (
    <Card muted>
      <div className="stack-sm">
        <p className="kicker">{t.home.standardsTitle}</p>
        <p className="body-text">{t.home.standardsBody}</p>
        <ul className="list-plain">
          {t.home.standardsPoints.map((item) => (
            <li key={item} className="small-text">
              {item}
            </li>
          ))}
        </ul>
        <p className="small-text">{t.common.disclaimer}</p>
      </div>
    </Card>
  );
}
