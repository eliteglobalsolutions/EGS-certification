export function GuideReferenceImage({
  alt,
  src,
  title,
  caption,
}: {
  alt: string;
  src: string;
  title: string;
  caption: string;
}) {
  return (
    <figure className="guide-visual-card">
      <img alt={alt} className="guide-visual-image" loading="lazy" src={src} />
      <figcaption className="guide-visual-caption">
        <strong>{title}</strong>
        <span>{caption}</span>
      </figcaption>
    </figure>
  );
}
