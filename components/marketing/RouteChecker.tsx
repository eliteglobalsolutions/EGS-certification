'use client';

import Link from 'next/link';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import type { AppCopy, Locale } from '@/lib/i18n/dictionaries';
import { localizedPath } from '@/lib/i18n/locale';
import { getRouteSignals } from '@/lib/knowledge-faqs';
import { DOCUMENT_TYPE_SUGGESTIONS } from '@/lib/prefill';

type RouteResult = {
  routeType: 'apostille' | 'consular_legalisation' | 'needs_review';
  routeLabel: string;
  summary: string;
  issuingCountryMatched: string;
  destinationCountryMatched: string;
  issuingHagueStatus: string;
  destinationHagueStatus: string;
  requiredItems: string[];
  steps: string[];
  etaRange: string;
  riskNotes: string[];
  complianceNote: string;
};

type CountryOption = {
  code: string;
  en: string;
  zh: string;
  hague: boolean;
};

export function RouteChecker({ locale, t }: { locale: Locale; t: AppCopy }) {
  const searchParams = useSearchParams();
  const [issuingCountry, setIssuingCountry] = useState(locale === 'zh' ? '澳大利亚' : 'Australia');
  const [destinationCountry, setDestinationCountry] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [translationRequired, setTranslationRequired] = useState(false);
  const [originalHandling, setOriginalHandling] = useState(false);
  const [speed, setSpeed] = useState<'standard' | 'express'>('standard');
  const [haguePreference, setHaguePreference] = useState<'hague' | 'non_hague' | 'unsure'>('unsure');
  const [result, setResult] = useState<RouteResult | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState<CountryOption[]>([]);
  const documentTypeSuggestions = useMemo(
    () => DOCUMENT_TYPE_SUGGESTIONS[locale],
    [locale],
  );
  const countrySuggestions = useMemo(
    () => countries.map((country) => (locale === 'zh' ? country.zh : country.en)),
    [countries, locale],
  );
  const routeSignals = useMemo(
    () =>
      getRouteSignals({
        issuingCountry,
        destinationCountry,
        documentType,
      }),
    [destinationCountry, documentType, issuingCountry],
  );

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

  useEffect(() => {
    const issuingPrefill = searchParams.get('issuingCountry');
    const destinationPrefill = searchParams.get('destinationCountry');
    const documentPrefill = searchParams.get('documentType');

    if (issuingPrefill) setIssuingCountry(issuingPrefill);
    if (destinationPrefill) setDestinationCountry(destinationPrefill);
    if (documentPrefill) setDocumentType(documentPrefill);
  }, [searchParams]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setResult(null);

    if (!issuingCountry.trim() || !destinationCountry.trim() || !documentType.trim()) {
      setError(t.landing.routeChecker.errors.required);
      return;
    }

    setLoading(true);
    const res = await fetch('/api/route/estimate', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        locale,
        issuingCountry,
        destinationCountry,
        documentType,
        quantity: Number(quantity || 1),
        translationRequired,
        originalHandling,
        speed,
        haguePreference,
      }),
    });
    const json = await res.json();
    setLoading(false);

    if (!res.ok || !json.result) {
      setError(json.error || t.landing.routeChecker.errors.failed);
      return;
    }
    setResult(json.result);
  }

  return (
    <section className="ui-section surface-1" id="route-checker" aria-labelledby="route-checker-heading">
      <div className="page-header">
        <div>
          <p className="kicker">{t.landing.routeChecker.kicker}</p>
          <h2 id="route-checker-heading">
            {locale === 'zh' ? '先确认路线，再进入正式受理' : 'Confirm the route first, then move into intake'}
          </h2>
          <p className="small-text">
            {locale === 'zh'
              ? '先填写签发地、使用地和文件类型，系统会给出一个初步路径判断。若你从某个路线页进入，这些字段会尽量自动带入。'
              : 'Start with issuing country, destination country, and document type to get a working route estimate. If you arrived from a route page, these fields will prefill where possible.'}
          </p>
          <p className="small-text">{t.landing.routeChecker.subtitle}</p>
        </div>
      </div>

      <form className="section-card stack-md route-checker-form" onSubmit={onSubmit}>
        <div className="grid-2 route-form-grid">
          <section className="route-form-card stack-sm" aria-label={t.landing.routeChecker.groups.basics}>
            <p className="kicker">{t.landing.routeChecker.groups.basics}</p>
            <div className="stack-sm">
              <label className="small-text" htmlFor="rc-issuing-country">{t.landing.routeChecker.fields.issuingCountry}</label>
              <input
                id="rc-issuing-country"
                className="input"
                list="route-issuing-country-options"
                placeholder={locale === 'zh' ? '可搜索或直接输入国家 / 地区' : 'Search or type a country / territory'}
                value={issuingCountry}
                onChange={(e) => setIssuingCountry(e.target.value)}
              />
              <datalist id="route-issuing-country-options">
                {countrySuggestions.map((item) => (
                  <option key={`issuing-${item}`} value={item} />
                ))}
              </datalist>
            </div>
            <div className="stack-sm">
              <label className="small-text" htmlFor="rc-destination-country">{t.landing.routeChecker.fields.destinationCountry}</label>
              <input
                id="rc-destination-country"
                className="input"
                list="route-destination-country-options"
                placeholder={locale === 'zh' ? '可搜索或直接输入国家 / 地区' : 'Search or type a country / territory'}
                value={destinationCountry}
                onChange={(e) => setDestinationCountry(e.target.value)}
              />
              <datalist id="route-destination-country-options">
                {countrySuggestions.map((item) => (
                  <option key={`destination-${item}`} value={item} />
                ))}
              </datalist>
            </div>
            <div className="stack-sm">
              <label className="small-text" htmlFor="rc-document-type">{t.landing.routeChecker.fields.documentType}</label>
              <input
                id="rc-document-type"
                className="input"
                list="route-document-type-options"
                placeholder={locale === 'zh' ? '例如：毕业证、成绩单、在读证明、法定声明' : 'For example: Degree Certificate, Transcript, Enrollment Letter, Statutory Declaration'}
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
              />
              <datalist id="route-document-type-options">
                {documentTypeSuggestions.map((item) => (
                  <option key={item} value={item} />
                ))}
              </datalist>
            </div>
            <div className="stack-sm">
              <label className="small-text" htmlFor="rc-quantity">{t.landing.routeChecker.fields.quantity}</label>
              <input id="rc-quantity" className="input" inputMode="numeric" value={quantity} onChange={(e) => setQuantity(e.target.value.replace(/[^\d]/g, ''))} />
            </div>
          </section>

          <section className="route-form-card stack-sm" aria-label={t.landing.routeChecker.groups.preferences}>
            <p className="kicker">{t.landing.routeChecker.groups.preferences}</p>
            <label className="small-text route-option-check">
              <input checked={translationRequired} onChange={(e) => setTranslationRequired(e.target.checked)} type="checkbox" /> {t.landing.routeChecker.fields.translationRequired}
            </label>
            <label className="small-text route-option-check">
              <input checked={originalHandling} onChange={(e) => setOriginalHandling(e.target.checked)} type="checkbox" /> {t.landing.routeChecker.fields.originalHandling}
            </label>
            <div className="stack-sm">
              <label className="small-text" htmlFor="rc-speed">{t.landing.routeChecker.fields.speed}</label>
              <select id="rc-speed" className="select" value={speed} onChange={(e) => setSpeed(e.target.value as 'standard' | 'express')}>
                <option value="standard">{t.landing.routeChecker.options.standard}</option>
                <option value="express">{t.landing.routeChecker.options.express}</option>
              </select>
            </div>
          </section>
        </div>

        <div className="actions">
          <button className="btn btn-primary" disabled={loading} type="submit">
            {loading ? t.common.loading : t.landing.routeChecker.ctaEstimate}
          </button>
          <Link
            className="btn btn-secondary"
            href={`${localizedPath(locale, '/intake')}?${new URLSearchParams({
              ...(issuingCountry.trim() ? { issuingCountry } : {}),
              ...(destinationCountry.trim() ? { destinationCountry } : {}),
              ...(documentType.trim() ? { documentType } : {}),
            }).toString()}`}
          >
            {t.landing.routeChecker.ctaIntake}
          </Link>
        </div>
        {error ? <p className="error-text">{error}</p> : null}
      </form>

      {routeSignals.risks.length || routeSignals.intake.length ? (
        <div className="section-card stack-md route-knowledge-card">
          <div className="stack-sm">
            <p className="kicker">{locale === 'zh' ? 'Route-check prompts' : 'Route-check prompts'}</p>
            <h3>{locale === 'zh' ? 'Common risks and what we usually ask first' : 'Common risks and what we usually ask first'}</h3>
          </div>
          {routeSignals.risks.length ? (
            <div className="stack-sm">
              <p className="small-text"><strong>{locale === 'zh' ? 'Common risks' : 'Common risks'}</strong></p>
              <ul className="list-plain">
                {routeSignals.risks.map((item) => (
                  <li className="small-text" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {routeSignals.intake.length ? (
            <div className="stack-sm">
              <p className="small-text"><strong>{locale === 'zh' ? 'What we usually need first' : 'What we usually need first'}</strong></p>
              <ul className="list-plain">
                {routeSignals.intake.map((item) => (
                  <li className="small-text" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {routeSignals.faqs.length ? (
            <div className="footer-links">
              {routeSignals.faqs.map((faq) => (
                <Link href={localizedPath(locale, `/faq/${faq.slug}`)} key={faq.slug}>
                  {faq.question.en}
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}

      {result ? (
        <div className="section-card stack-md">
          <InfoRow label={t.landing.routeChecker.result.issuingCountry} value={result.issuingCountryMatched} />
          <InfoRow label={t.landing.routeChecker.result.issuingHague} value={result.issuingHagueStatus} />
          <InfoRow label={t.landing.routeChecker.result.destinationCountry} value={result.destinationCountryMatched} />
          <InfoRow label={t.landing.routeChecker.result.destinationHague} value={result.destinationHagueStatus} />
          <InfoRow label={t.landing.routeChecker.result.route} value={result.routeLabel} />
          <InfoRow label={t.landing.routeChecker.result.summary} value={result.summary} />
          <InfoRow label={t.landing.routeChecker.result.eta} value={result.etaRange} />
          <div className="stack-sm">
            <p className="kicker">{t.landing.routeChecker.result.requiredItems}</p>
            <ul className="list-plain">
              {result.requiredItems.map((item) => (
                <li className="small-text" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="stack-sm">
            <p className="kicker">{t.landing.routeChecker.result.steps}</p>
            <ol className="list-plain">
              {result.steps.map((item) => (
                <li className="small-text" key={item}>
                  {item}
                </li>
              ))}
            </ol>
          </div>
          <div className="stack-sm">
            <p className="kicker">{t.landing.routeChecker.result.notes}</p>
            <ul className="list-plain">
              {result.riskNotes.map((note) => (
                <li className="small-text" key={note}>
                  {note}
                </li>
              ))}
            </ul>
          </div>
          <p className="small-text">{result.complianceNote}</p>
          <div className="actions">
            <Link
              className="btn btn-primary"
              href={`${localizedPath(locale, '/intake')}?${new URLSearchParams({
                ...(issuingCountry.trim() ? { issuingCountry } : {}),
                ...(destinationCountry.trim() ? { destinationCountry } : {}),
                ...(documentType.trim() ? { documentType } : {}),
              }).toString()}`}
            >
              {t.landing.routeChecker.ctaBeginIntake}
            </Link>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="info-row">
      <span className="small-text">{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
