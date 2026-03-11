import Link from 'next/link';

export function SamplePreviewCard({
  locale,
  slug,
  title,
  caption,
  thumbPath,
  altText,
}: {
  locale: 'en' | 'zh';
  slug: string;
  title: string;
  caption: string;
  thumbPath?: string | null;
  altText: string;
}) {
  return (
    <Link className="guide-visual-card" href={`/${locale}/samples/${slug}`}>
      {thumbPath ? <img alt={altText} className="guide-visual-image" loading="lazy" src={thumbPath} /> : null}
      <div className="guide-visual-caption">
        <strong>{title}</strong>
        <span>{caption}</span>
      </div>
    </Link>
  );
}
