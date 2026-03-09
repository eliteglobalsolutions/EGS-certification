import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import type { Locale } from '@/lib/i18n/dictionaries';

type RelatedLink = {
  href: string;
  label: string;
};

type RelatedGroup = {
  title: string;
  links: RelatedLink[];
};

type Props = {
  locale: Locale;
  title: string;
  subheading: string;
  whoUsesThis?: string;
  officialBaseline?: string;
  screeningDiscipline?: string;
  routeType: string;
  searchIntents: string[];
  typicalRequirements: string[];
  expedited: string;
  reviewFocus: string[];
  commonIssues: string[];
  userNeedsFirst: string[];
  beforePaymentReview: string;
  relatedRouteGroups?: RelatedGroup[];
  keyLinks?: RelatedLink[];
  intakeHref: string;
};

export function RoutePriorityPage({
  locale,
  title,
  subheading,
  whoUsesThis,
  officialBaseline,
  screeningDiscipline,
  routeType,
  searchIntents,
  typicalRequirements,
  expedited,
  reviewFocus,
  commonIssues,
  userNeedsFirst,
  beforePaymentReview,
  relatedRouteGroups,
  keyLinks,
  intakeHref,
}: Props) {
  const routeNotes = [routeType, officialBaseline, expedited, screeningDiscipline, beforePaymentReview].filter(Boolean) as string[];
  const preparationItems = Array.from(new Set([...userNeedsFirst, ...typicalRequirements])).slice(0, 6);
  const trimmedReviewFocus = reviewFocus.slice(0, 4);
  const trimmedCommonIssues = commonIssues.slice(0, 4);

  return (
    <Container>
      <Section>
        <Card>
          <div className="stack-md route-hero">
            <h1>{title}</h1>
            <p className="body-text">{subheading}</p>
            {whoUsesThis ? <p className="small-text route-hero-context">{whoUsesThis}</p> : null}
            <div className="actions">
              <Link className="btn btn-primary" href={intakeHref}>
                {locale === 'zh' ? 'Start intake' : 'Start intake'}
              </Link>
            </div>
          </div>
        </Card>

        <Card className="card-main route-primary-section">
          <div className="stack-md">
            <div className="stack-sm">
              <h2>{locale === 'zh' ? '先准备什么' : 'What to prepare'}</h2>
            </div>
            <ul className="list-plain">
              {preparationItems.map((item) => (
                <li className="small-text" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <div className="route-single-stack">
          <Card className="card-main">
            <div className="stack-sm">
              <h2>{locale === 'zh' ? '先看什么' : 'What we check first'}</h2>
              <ul className="list-plain">
                {trimmedReviewFocus.map((item) => (
                  <li className="small-text" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
          <Card muted className="route-secondary-section">
            <div className="stack-sm">
              <h2>{locale === 'zh' ? '常见卡点' : 'What often slows a file down'}</h2>
              <ul className="list-plain">
                {trimmedCommonIssues.map((item) => (
                  <li className="small-text" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>

        {routeNotes.length ? (
          <Card className="card-sub route-notes-card route-secondary-section">
            <div className="stack-sm">
              <h2>{locale === 'zh' ? '路线说明' : 'Route notes'}</h2>
              {routeNotes.map((item) => (
                <p className="small-text" key={item}>
                  {item}
                </p>
              ))}
            </div>
          </Card>
        ) : null}

        {(relatedRouteGroups && relatedRouteGroups.length) || (keyLinks && keyLinks.length) ? (
          <Card muted className="route-footer-card route-footer-lite">
            <div className="stack-md">
              {relatedRouteGroups && relatedRouteGroups.length ? (
                <div className="stack-sm">
                  <h2>{locale === 'zh' ? '精选相关路线' : 'Related routes'}</h2>
                  <div className="route-related-lite">
                    {relatedRouteGroups.map((group) => (
                      <div className="state-block stack-sm" key={group.title}>
                        <strong>{group.title}</strong>
                        <div className="footer-links">
                          {group.links.slice(0, 3).map((item) => (
                            <Link href={item.href} key={item.href}>
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {keyLinks && keyLinks.length ? (
                <div className="stack-sm">
                  <h2>{locale === 'zh' ? '继续查看' : 'Continue'}</h2>
                  <div className="footer-links">
                    {keyLinks.slice(0, 3).map((item) => (
                      <Link href={item.href} key={item.href}>
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </Card>
        ) : null}
      </Section>
    </Container>
  );
}
