'use client';

import Link from 'next/link';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/Button';
import type { AppCopy, Locale } from '@/lib/i18n/dictionaries';
import { localizedPath } from '@/lib/i18n/locale';

type CountryOption = {
  code: string;
  en: string;
  zh: string;
  hague: boolean;
};

type HeroRouteResult = {
  routeLabel: string;
  summary: string;
  issuingCountryMatched: string;
  destinationCountryMatched: string;
  issuingHagueStatus: string;
  destinationHagueStatus: string;
  etaRange: string;
  complianceNote: string;
};

function getStatusTone(value: string) {
  if (/Not currently|非海牙|不是/.test(value)) return 'is-negative';
  if (/specialist|人工复核|not auto-matched|未自动匹配/.test(value)) return 'is-neutral';
  return 'is-positive';
}

export function Hero({ locale, t }: { locale: Locale; t: AppCopy }) {
  const intakeHref = localizedPath(locale, '/intake');
  const postDocumentsHref = localizedPath(locale, '/post-documents');
  const [issuingCountry, setIssuingCountry] = useState(locale === 'zh' ? '澳大利亚' : 'Australia');
  const [destinationCountry, setDestinationCountry] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [speed, setSpeed] = useState<'standard' | 'express'>('standard');
  const [countries, setCountries] = useState<CountryOption[]>([]);
  const [result, setResult] = useState<HeroRouteResult | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const docTypeOptions =
    locale === 'zh'
      ? ['出生证明', '结婚证', '学历证书 / 成绩单', 'AFP 无犯罪记录', '公司文件', '声明书 / 宣誓书', '其他']
      : ['Birth Certificate', 'Marriage Certificate', 'Academic Transcript / Degree', 'AFP Police Check', 'Company Documents', 'Declaration / Affidavit', 'Other'];

  const speedOptions =
    locale === 'zh'
      ? ['标准', '加急（视路径而定）']
      : ['Standard', 'Express (where available)'];

  const countrySuggestions = useMemo(
    () => countries.map((country) => (locale === 'zh' ? country.zh : country.en)),
    [countries, locale],
  );

  const assuranceItems = locale === 'zh'
    ? [
        '付款前完成路径核实与书面费用确认',
        '文件全程受控处理，从受理到退还均有可追溯记录',
        '独立文件协调机构——非法律事务所，亦非政府机关',
      ]
    : [
        'Route verified and fees confirmed before any obligation is incurred',
        'Controlled document handling from intake to return dispatch',
        'Independent coordination service — not a legal practice or government authority',
      ];

  useEffect(() => {
    let active = true;

    fetch('/api/countries')
      .then((res) => res.json())
      .then((json) => {
        if (active && Array.isArray(json.countries)) {
          setCountries(json.countries);
        }
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, []);

  async function onRouteCheckSubmit(event: FormEvent) {
    event.preventDefault();
    setError('');
    setResult(null);

    if (!issuingCountry.trim() || !destinationCountry.trim() || !documentType.trim()) {
      setError(locale === 'zh' ? '请填写签发地、使用地和文件类型。' : 'Please enter the issuing country, destination, and document type.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/route/estimate', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          locale,
          issuingCountry,
          destinationCountry,
          documentType,
          quantity: 1,
          translationRequired: false,
          originalHandling: false,
          speed,
          haguePreference: 'unsure',
        }),
      });
      const json = await res.json();

      if (!res.ok || !json.result) {
        setError(json.error || (locale === 'zh' ? '路径查询失败，请稍后重试。' : 'Unable to estimate route. Please try again.'));
        return;
      }

      setResult(json.result);
    } catch {
      setError(locale === 'zh' ? '路径查询失败，请稍后重试。' : 'Unable to estimate route. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="hero">
      <div className="hero-grid page-container">
        {/* ── LEFT ── */}
        <div className="hero-left">
          <div className="kicker">
            <div className="kicker-rule"></div>
            <span className="kicker-text">{t.landing.hero.eyebrow}</span>
          </div>

          <h1>
            {locale === 'zh' ? (
              <>
                海牙认证与领馆认证<br />
                协调办理，适用于<em>澳大利亚</em><br />
                及国际文件
              </>
            ) : (
              <>
                Apostille &amp; Legalisation<br />
                Coordination for <em>Australia</em><br />
                and International Documents
              </>
            )}
          </h1>

          <p className="hero-lead">{t.landing.hero.subtitle}</p>

          <ul className="assurance-list">
            {assuranceItems.map((item) => (
              <li key={item}>
                <span className="assurance-bullet"></span>
                {item}
              </li>
            ))}
          </ul>

          <div className="hero-cta">
            <Button href={intakeHref} variant="primary">
              {locale === 'zh' ? '正式受理' : 'Begin Application'} →
            </Button>
            <div className="hero-cta-actions">
              <Button href="#route-check" variant="secondary">
                {locale === 'zh' ? '路径核实' : 'Verify My Route'}
              </Button>
              <Button href={postDocumentsHref} variant="ghost">
                {locale === 'zh' ? '邮寄原件至我们' : 'Post Originals to Us'}
              </Button>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Route Check Panel ── */}
        <div className="hero-right" id="route-check">
          <div className="panel">
            <div className="panel-head">
              <div className="panel-title">
                {locale === 'zh' ? '路径核实' : 'Route Verification'}
              </div>
              <div className="panel-flag">
                {locale === 'zh' ? '无需承诺' : 'Obligation-free'}
              </div>
            </div>

            <form className="panel-body" onSubmit={onRouteCheckSubmit}>
              <div className="f-group">
                <label className="f-label">
                  {locale === 'zh' ? '文件签发地' : 'Document issued in'}
                </label>
                <input
                  className="f-input"
                  list="hero-issuing-country-options"
                  placeholder={locale === 'zh' ? '搜索或输入国家 / 地区' : 'Search or type a country / territory'}
                  value={issuingCountry}
                  onChange={(e) => setIssuingCountry(e.target.value)}
                />
                <datalist id="hero-issuing-country-options">
                  {countrySuggestions.map((item) => (
                    <option key={`hero-issuing-${item}`} value={item} />
                  ))}
                </datalist>
              </div>

              <div className="f-group">
                <label className="f-label">
                  {locale === 'zh' ? '目的地' : 'For use in'}
                </label>
                <input
                  className="f-input"
                  list="hero-destination-country-options"
                  placeholder={locale === 'zh' ? '搜索或输入国家 / 地区' : 'Search or type a country / territory'}
                  value={destinationCountry}
                  onChange={(e) => setDestinationCountry(e.target.value)}
                />
                <datalist id="hero-destination-country-options">
                  {countrySuggestions.map((item) => (
                    <option key={`hero-destination-${item}`} value={item} />
                  ))}
                </datalist>
              </div>

              <div className="f-group">
                <label className="f-label">
                  {locale === 'zh' ? '文件类型' : 'Document type'}
                </label>
                <select className="f-select" value={documentType} onChange={(e) => setDocumentType(e.target.value)}>
                  <option value="" disabled>
                    {locale === 'zh' ? '选择类型…' : 'Select type…'}
                  </option>
                  {docTypeOptions.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>

              <div className="f-group">
                <label className="f-label">
                  {locale === 'zh' ? '处理偏好' : 'Processing preference'}
                </label>
                <select className="f-select" value={speed} onChange={(e) => setSpeed(e.target.value === 'express' ? 'express' : 'standard')}>
                  {speedOptions.map((o) => (
                    <option key={o} value={o === speedOptions[1] ? 'express' : 'standard'}>{o}</option>
                  ))}
                </select>
              </div>

              <div className="hero-route-actions">
                <button className="btn-route" type="submit">
                  {loading ? (locale === 'zh' ? '查询中…' : 'Checking…') : locale === 'zh' ? '确认路径' : 'Confirm Pathway'}
                </button>
                <Link
                  className="btn-route-secondary"
                  href={`${intakeHref}?${new URLSearchParams({
                    ...(issuingCountry.trim() ? { issuingCountry } : {}),
                    ...(destinationCountry.trim() ? { destinationCountry } : {}),
                    ...(documentType.trim() ? { documentType } : {}),
                  }).toString()}`}
                >
                  {locale === 'zh' ? '正式受理' : 'Begin Application'}
                </Link>
              </div>

              {error ? <p className="hero-route-error">{error}</p> : null}
              {result ? (
                <div className="hero-route-result">
                  <div className="hero-route-summary-card">
                    <div className="stack-xs">
                      <span className="hero-route-kicker">{locale === 'zh' ? '自动判断结果' : 'Auto route result'}</span>
                      <strong className="hero-route-title">{result.routeLabel}</strong>
                    </div>
                    <span className={`hero-route-pill ${getStatusTone(result.routeLabel)}`}>{result.etaRange}</span>
                  </div>
                  <p className="hero-route-summary">{result.summary}</p>
                  <div className="hero-route-grid">
                    <div className="hero-route-result-block">
                      <span className="hero-route-label">{locale === 'zh' ? '签发地' : 'Issued in'}</span>
                      <strong>{result.issuingCountryMatched}</strong>
                      <span className={`hero-route-pill ${getStatusTone(result.issuingHagueStatus)}`}>{result.issuingHagueStatus}</span>
                    </div>
                    <div className="hero-route-result-block">
                      <span className="hero-route-label">{locale === 'zh' ? '使用地' : 'For use in'}</span>
                      <strong>{result.destinationCountryMatched}</strong>
                      <span className={`hero-route-pill ${getStatusTone(result.destinationHagueStatus)}`}>{result.destinationHagueStatus}</span>
                    </div>
                  </div>
                  <p className="hero-route-compliance">{result.complianceNote}</p>
                </div>
              ) : null}
            </form>

            <div className="panel-foot">
              <span>
                {locale === 'zh'
                  ? '路径评估在任何承诺前提供。'
                  : 'Route assessments provided before any commitment.'}
              </span>
              <div style={{ display: 'flex', gap: '14px', flexShrink: 0 }}>
                <Link href={localizedPath(locale, '/faq')}>
                  {locale === 'zh' ? 'Apostille 与认证的区别' : 'Apostille vs Legalisation'}
                </Link>
                <Link href={localizedPath(locale, '/guides')}>
                  {locale === 'zh' ? '指南 →' : 'Guides →'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
