import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { Locale } from '@/lib/i18n/dictionaries';
import type { SearchEntry } from '@/lib/search-entry-data';
import { getEntryText } from '@/lib/search-entry-data';

type Props = {
  locale: Locale;
  title: string;
  kicker: string;
  intro: string;
  basePath: string;
  entries: SearchEntry[];
  ctaLabel: string;
  intakeLabel: string;
  buildIntakeHref?: (entry: SearchEntry) => string;
};

export function SearchEntrySection({
  locale,
  title,
  kicker,
  intro,
  basePath,
  entries,
  ctaLabel,
  intakeLabel,
  buildIntakeHref,
}: Props) {
  return (
    <Card muted>
      <div className="stack-md">
        <div className="page-header">
          <div className="stack-sm">
            <p className="kicker">{kicker}</p>
            <h2>{title}</h2>
            <p className="small-text">{intro}</p>
          </div>
        </div>
        <div className="search-entry-grid">
          {entries.map((entry) => (
            <article className="search-entry-card" key={entry.slug}>
              <div className="stack-sm">
                <h3>{getEntryText(entry.name, locale)}</h3>
                <p className="small-text">{getEntryText(entry.intro, locale)}</p>
                <p className="small-text">{getEntryText(entry.scope, locale)}</p>
                <ul className="list-plain">
                  {entry.checkpoints.slice(0, 2).map((item) => (
                    <li className="small-text" key={getEntryText(item, locale)}>
                      {getEntryText(item, locale)}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="actions">
                <Button href={`/${locale}${basePath}/${entry.slug}`} variant="ghost">
                  {ctaLabel}
                </Button>
                <Link className="search-entry-intake-link" href={buildIntakeHref ? buildIntakeHref(entry) : `/${locale}/intake`}>
                  {intakeLabel}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Card>
  );
}
