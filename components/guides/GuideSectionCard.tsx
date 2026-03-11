import type { GuideSection } from '@/lib/guides';
import { getGuideCopy } from '@/lib/guides';

export function GuideSectionCard({
  section,
  locale,
}: {
  section: GuideSection;
  locale: 'en' | 'zh';
}) {
  return (
    <section className="section-card stack-sm guide-report-card">
      <h2>{getGuideCopy(locale, section.heading)}</h2>
      {section.paragraphs.map((paragraph) => (
        <p className="small-text" key={paragraph.en}>
          {getGuideCopy(locale, paragraph)}
        </p>
      ))}
      {section.bullets?.length ? (
        <ul className="samples-bullet-list">
          {section.bullets.map((bullet) => (
            <li key={bullet.en}>{getGuideCopy(locale, bullet)}</li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
