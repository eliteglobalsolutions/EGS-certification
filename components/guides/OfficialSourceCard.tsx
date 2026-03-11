import Link from 'next/link';

export function OfficialSourceCard({
  title,
  summary,
  sourceLabel,
  sourceUrl,
}: {
  title: string;
  summary: string;
  sourceLabel: string;
  sourceUrl: string;
}) {
  return (
    <div className="guide-visual-card guide-source-card">
      <div className="guide-source-mark">Source</div>
      <div className="guide-visual-caption">
        <strong>{title}</strong>
        <span>{summary}</span>
      </div>
      <Link className="inline-link" href={sourceUrl} rel="noreferrer" target="_blank">
        {sourceLabel}
      </Link>
    </div>
  );
}
