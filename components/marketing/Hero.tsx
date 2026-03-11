'use client';

import { Button } from '@/components/ui/Button';
import type { AppCopy } from '@/lib/i18n/dictionaries';
import { TrustBadges } from './TrustBadges';

export function Hero({ locale, t }: { locale: string; t: AppCopy }) {
  const laneCards =
    locale === 'zh'
      ? [
          { country: 'US', eta: '1-3 个工作日', type: 'Apostille' },
          { country: 'AU', eta: '3-7 个工作日', type: 'Apostille' },
          { country: 'UK', eta: '3-7 个工作日', type: 'Apostille' },
          { country: 'SG', eta: '1-3 个工作日', type: 'Apostille' },
        ]
      : [
          { country: 'US', eta: '1–3 business days', type: 'Apostille' },
          { country: 'AU', eta: '3–7 business days', type: 'Apostille' },
          { country: 'UK', eta: '3–7 business days', type: 'Apostille' },
          { country: 'SG', eta: '1–3 business days', type: 'Apostille' },
        ];

  const timingNotes =
    locale === 'zh'
      ? [
          '1-10 个工作日',
          '10-20 个工作日',
        ]
      : [
          '1-10 business days',
          '10-20 business days',
        ];

  const timingDisclaimer =
    locale === 'zh'
      ? 'Timing shown is indicative only and does not constitute a guaranteed turnaround.'
      : 'Timing shown is indicative only and does not constitute a guaranteed turnaround.';

  const coverageLead =
    locale === 'zh'
      ? 'Australia-issued and overseas-issued document coordination across 120+ jurisdictions.'
      : 'Australia-issued and overseas-issued document coordination across 120+ jurisdictions.';

  const coverageNote =
    locale === 'zh'
      ? 'Route structure depends on destination, document type, and authority requirements.'
      : 'Route structure depends on destination, document type, and authority requirements.';

  return (
    <section className="landing-hero surface-0" aria-labelledby="hero-heading">
      <div className="hero-content hero-grid">
        <div className="hero-copy stack-lg">
          <p className="hero-kicker">{t.landing.hero.eyebrow}</p>
          <h1 id="hero-heading">
            <span>{t.landing.hero.titleLine1}</span>
            <span>{t.landing.hero.titleLine2}</span>
          </h1>
          <p className="body-text">{t.landing.hero.subtitle}</p>
          <p className="hero-anchor">{t.landing.hero.trustLine}</p>
          <p className="hero-privacy">{t.landing.hero.privacyLine}</p>
          <p className="hero-compliance">{t.landing.hero.complianceNote}</p>
          <div className="actions">
            <Button href="#route-checker" variant="secondary">
              <span className="cta-label-full">{t.landing.hero.ctaPrimary}</span>
              <span className="cta-label-short">{t.landing.hero.ctaPrimaryShort}</span>
            </Button>
            <Button href={`/${locale}/intake`} variant="primary">
              <span className="cta-label-full">{t.landing.hero.ctaSecondary}</span>
              <span className="cta-label-short">{t.landing.hero.ctaSecondaryShort}</span>
            </Button>
            <Button href={`/${locale}/post-documents`} variant="ghost">
              <span className="cta-label-full">{t.landing.hero.ctaTertiary}</span>
              <span className="cta-label-short">{t.landing.hero.ctaTertiaryShort}</span>
            </Button>
          </div>
          <div className="hero-quick-links" aria-label={locale === 'zh' ? '快捷入口' : 'Quick links'}>
            <a href={`/${locale}/guides`}>{locale === 'zh' ? 'Browse guides' : 'Browse guides'}</a>
            <a href={`/${locale}/faq`}>{locale === 'zh' ? 'FAQ hub' : 'FAQ hub'}</a>
          </div>
          <TrustBadges t={t} />
        </div>
        <aside className="hero-support" aria-label={locale === 'zh' ? '辅助信息' : 'Supporting information'}>
          <div className="hero-support-stack">
            <section className="hero-support-card hero-timing-panel" aria-label={locale === 'zh' ? '常见时效' : 'Typical timing'}>
              <div className="hero-support-head">
                <p className="kicker">{locale === 'zh' ? 'Typical timing' : 'Typical timing'}</p>
                <h2>{locale === 'zh' ? 'Common apostille and legalisation ranges' : 'Common apostille and legalisation ranges'}</h2>
              </div>
              <div className="hero-timing-table-wrap">
                <table className="hero-timing-table">
                  <colgroup>
                    <col />
                    <col />
                    <col />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>{locale === 'zh' ? 'Country' : 'Country'}</th>
                      <th>{locale === 'zh' ? 'Typical timing' : 'Typical timing'}</th>
                      <th>{locale === 'zh' ? 'Type' : 'Type'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {laneCards.map((item) => (
                      <tr key={item.country}>
                        <td className="hero-timing-country">{item.country}</td>
                        <td className="hero-timing-value">{item.eta}</td>
                        <td>
                          <span className="hero-timing-route">{item.type}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="hero-support-notes hero-support-notes-table">
                <div className="hero-support-note-row">
                  <span className="hero-support-note-label">{locale === 'zh' ? 'Other apostille' : 'Other apostille'}</span>
                  <p>{timingNotes[0]}</p>
                </div>
                <div className="hero-support-note-row">
                  <span className="hero-support-note-label">{locale === 'zh' ? 'Consular' : 'Consular'}</span>
                  <p>{timingNotes[1]}</p>
                </div>
                <div className="hero-support-note-row hero-support-note-row-disclaimer">
                  <span className="hero-support-note-label">{locale === 'zh' ? 'Note' : 'Note'}</span>
                  <p>{timingDisclaimer}</p>
                </div>
              </div>
            </section>

            <section className="hero-support-card hero-coverage-panel" aria-label={locale === 'zh' ? '全球覆盖' : 'Global coverage'}>
              <div className="hero-support-head">
                <p className="kicker">{locale === 'zh' ? 'Global coverage' : 'Global coverage'}</p>
                <p className="hero-coverage-copy">{coverageLead}</p>
                <p className="hero-coverage-note">{coverageNote}</p>
              </div>
              <div className="hero-globe-panel">
                <div className="hero-visual-frame hero-globe-frame">
                  <svg className="hero-globe" viewBox="0 0 420 420" role="img" aria-label="Global coordination map">
                    <circle className="hero-globe-core" cx="210" cy="210" r="152" />
                    <ellipse className="hero-globe-lat" cx="210" cy="210" rx="152" ry="108" />
                    <ellipse className="hero-globe-lat" cx="210" cy="210" rx="152" ry="68" />
                    <ellipse className="hero-globe-lat" cx="210" cy="210" rx="152" ry="28" />
                    <ellipse className="hero-globe-lon" cx="210" cy="210" rx="62" ry="152" />
                    <ellipse className="hero-globe-lon" cx="210" cy="210" rx="112" ry="152" />

                    <path className="hero-globe-route" d="M122 156 L188 146 L283 176 L323 186" />
                    <path className="hero-globe-route soft" d="M98 204 L188 146" />
                    <path className="hero-globe-route" d="M188 146 L222 206 L232 246" />
                    <path className="hero-globe-route" d="M283 176 L288 196 L278 224 L300 292" />
                    <path className="hero-globe-route soft" d="M323 186 L288 196" />
                    <path className="hero-globe-route soft" d="M222 206 L278 224" />

                    <g className="hero-globe-city">
                      <circle cx="283" cy="176" r="4" />
                      <text x="266" y="171">Beijing</text>
                    </g>
                    <g className="hero-globe-city">
                      <circle cx="288" cy="196" r="4" />
                      <text x="299" y="201">Shanghai</text>
                    </g>
                    <g className="hero-globe-city">
                      <circle cx="323" cy="186" r="4" />
                      <text x="333" y="182">Tokyo</text>
                    </g>
                    <g className="hero-globe-city">
                      <circle cx="232" cy="246" r="4" />
                      <text x="244" y="251">Singapore</text>
                    </g>
                    <g className="hero-globe-city">
                      <circle cx="222" cy="206" r="4" />
                      <text x="234" y="211">Dubai</text>
                    </g>
                    <g className="hero-globe-city">
                      <circle cx="188" cy="146" r="4" />
                      <text x="170" y="142">London</text>
                    </g>
                    <g className="hero-globe-city">
                      <circle cx="122" cy="156" r="4" />
                      <text x="131" y="151">New York</text>
                    </g>
                    <g className="hero-globe-city">
                      <circle cx="278" cy="224" r="4" />
                      <text x="289" y="229">Hong Kong</text>
                    </g>
                    <g className="hero-globe-city">
                      <circle cx="98" cy="204" r="4" />
                      <text x="107" y="210">Los Angeles</text>
                    </g>
                    <g className="hero-globe-city">
                      <circle cx="300" cy="292" r="4" />
                      <text x="311" y="297">Sydney</text>
                    </g>
                  </svg>
                </div>
              </div>
            </section>
          </div>
        </aside>
      </div>
    </section>
  );
}
