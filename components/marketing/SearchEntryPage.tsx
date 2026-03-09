import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import type { Locale } from '@/lib/i18n/dictionaries';
import type { SearchEntry } from '@/lib/search-entry-data';
import { getEntryText } from '@/lib/search-entry-data';

type RelatedLink = {
  href: string;
  label: string;
};

type RegionalRequirement = {
  region: string;
  summary: string;
  officialRequirements: string[];
  egsRequirements: string[];
  commonExamples?: string[];
  expedite: string;
  note?: string;
};

type InstitutionReference = {
  region: string;
  schools: string[];
  note?: string;
};

type Props = {
  locale: Locale;
  sectionLabel: string;
  title: string;
  intro: string;
  checkpoints: string[];
  intakeHref: string;
  intakeLabel: string;
  helperTitle: string;
  helperText: string;
  relatedTitle: string;
  relatedLinks: RelatedLink[];
  siblingTitle: string;
  siblings: SearchEntry[];
  siblingBasePath: string;
  siblingPrefillType?: 'issuing' | 'destination' | 'document';
  regionalRequirements?: RegionalRequirement[];
  institutionReferences?: InstitutionReference[];
};

export function SearchEntryPage({
  locale,
  sectionLabel,
  title,
  intro,
  checkpoints,
  intakeHref,
  intakeLabel,
  helperTitle,
  helperText,
  relatedTitle,
  relatedLinks,
  siblingTitle,
  siblings,
  siblingBasePath,
  siblingPrefillType,
  regionalRequirements,
  institutionReferences,
}: Props) {
  const primaryRelatedLinks = relatedLinks.slice(0, 4);
  const siblingLinks = siblings.slice(0, 8);

  return (
    <Container>
      <Section>
        <Card>
          <div className="stack-md route-hero">
            <p className="kicker">{sectionLabel}</p>
            <h1>{title}</h1>
            <p className="body-text">{intro}</p>
            <div className="actions">
              <Link className="btn btn-primary" href={intakeHref}>
                {intakeLabel}
              </Link>
            </div>
          </div>
        </Card>

        <div className="route-single-stack">
          <Card className="card-main">
            <div className="stack-sm">
              <h2>{helperTitle}</h2>
              <p className="small-text">{helperText}</p>
              <ul className="list-plain">
                {checkpoints.map((item) => (
                  <li className="small-text" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          <Card muted className="route-secondary-section">
            <div className="stack-sm">
              <h2>{relatedTitle}</h2>
              <div className="footer-links">
                {primaryRelatedLinks.map((item) => (
                  <Link href={item.href} key={item.href}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {regionalRequirements && regionalRequirements.length ? (
          <Card>
            <div className="stack-md">
              <div className="stack-sm">
                <h2>{locale === 'zh' ? '实务说明' : 'Practical notes'}</h2>
                <p className="small-text">
                  {locale === 'zh'
                    ? '这里保留公开可说明的处理重点。具体路径仍会根据签发机构、接收方和文件形态逐案确认。'
                    : 'This section keeps to the public-facing points that usually matter first. Final handling still depends on the issuing authority, receiving side, and document format.'}
                </p>
              </div>
              <div className="search-entry-grid">
                {regionalRequirements.map((item) => (
                  <article className="search-entry-card" key={item.region}>
                    <div className="stack-sm">
                      <h3>{item.region}</h3>
                      <p className="small-text">{item.summary}</p>
                      <div className="search-entry-scope">
                        <strong>{locale === 'zh' ? '官方基线要求' : 'Official baseline'}</strong>
                        <ul className="list-plain">
                          {item.officialRequirements.map((value) => (
                            <li className="small-text" key={value}>
                              {value}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="search-entry-scope">
                        <strong>{locale === 'zh' ? 'EGS 受理预审' : 'EGS intake screening'}</strong>
                        <ul className="list-plain">
                          {item.egsRequirements.map((value) => (
                            <li className="small-text" key={value}>
                              {value}
                            </li>
                          ))}
                        </ul>
                        <p className="small-text">
                          {locale === 'zh'
                            ? '该预审仅用于初步判断受理路径，不构成法律意见。根据文件类型、签发机构、目的地及接收方要求，后续仍可能需要原件。'
                            : 'This screening is for preliminary route assessment only and is not legal advice. Original documents may still be required depending on document type, issuing authority, destination, and receiving-side requirements.'}
                        </p>
                      </div>
                      {item.commonExamples && item.commonExamples.length ? (
                        <div className="search-entry-scope">
                          <strong>{locale === 'zh' ? '常见文件类型 / 证书示例' : 'Common document types / examples'}</strong>
                          <ul className="list-plain">
                            {item.commonExamples.map((value) => (
                              <li className="small-text" key={value}>
                                {value}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                      <div className="search-entry-scope">
                        <strong>{locale === 'zh' ? '加急判断' : 'Expedite position'}</strong>
                        <p className="small-text">{item.expedite}</p>
                      </div>
                      {item.note ? (
                        <p className="small-text">
                          <strong>{locale === 'zh' ? 'Review note: ' : 'Review note: '}</strong>
                          {item.note}
                        </p>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </Card>
        ) : null}

        {institutionReferences && institutionReferences.length ? (
          <Card muted>
            <div className="stack-md">
              <div className="stack-sm">
                <h2>{locale === 'zh' ? '常见院校写法' : 'Common institution references'}</h2>
                <p className="small-text">
                  {locale === 'zh'
                    ? '这部分只做咨询层面的热门学校简称补充，正式受理仍以文件上的学校全称、签发信息和接收方要求为准。'
                    : 'This is a compact enquiry-facing reference only. Final route review still depends on the official institution name shown on the document, issuing details, and receiving-side requirements.'}
                </p>
              </div>
              <div className="search-entry-grid">
                {institutionReferences.map((item) => (
                  <article className="search-entry-card" key={item.region}>
                    <div className="stack-sm">
                      <h3>{item.region}</h3>
                      <ul className="list-plain">
                        {item.schools.map((school) => (
                          <li className="small-text" key={school}>
                            {school}
                          </li>
                        ))}
                      </ul>
                      {item.note ? <p className="small-text">{item.note}</p> : null}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </Card>
        ) : null}

        <Card muted>
          <div className="stack-sm">
            <h2>{siblingTitle}</h2>
            <div className="footer-links">
              {siblingLinks.map((entry) => (
                <Link href={`/${locale}${siblingBasePath}/${entry.slug}`} key={entry.slug}>
                  {getEntryText(entry.name, locale)}
                </Link>
              ))}
            </div>
          </div>
        </Card>
      </Section>
    </Container>
  );
}
