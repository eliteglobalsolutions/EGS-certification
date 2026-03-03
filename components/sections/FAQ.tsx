import { Card } from '@/components/ui/Card';
import type { AppCopy } from '@/lib/i18n/dictionaries';

export function FAQ({ t }: { t: AppCopy }) {
  return (
    <Card>
      <div className="stack-md">
        <p className="kicker">{t.home.faqTitle}</p>
        {t.home.faq.map((item) => (
          <article className="stack-sm" key={item.q}>
            <strong>{item.q}</strong>
            <p className="small-text">{item.a}</p>
          </article>
        ))}
      </div>
    </Card>
  );
}
