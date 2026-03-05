'use client';

import Link from 'next/link';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { PageHeader } from '@/components/ui/PageHeader';
import { Stepper } from '@/components/ui/Stepper';
import { InfoRow } from '@/components/ui/InfoRow';
import { ErrorState } from '@/components/ui/States';
import { getCopy, type Locale } from '@/lib/i18n/dictionaries';
import { estimateOrder } from '@/lib/order';
import { convertAudCents, detectUserCurrency, formatMoney } from '@/lib/currency';
import {
  CERT_OPTIONS,
  COURIER_OPTIONS,
  DESTINATIONS,
  DOC_CATEGORY,
  ROUTE_OVERRIDE,
  SERVICE_LEVEL,
  SUPPORTED_SHIPPING_COUNTRIES,
  findDestination,
  isSupportedShippingCountry,
  routeLabel,
} from '@/lib/catalog';

type OrderDraft = {
  step: number;
  destinationQuery: string;
  destinationCode: string;
  routeOverride: 'auto' | 'hague' | 'non';
  issuingCountry: string;
  serviceLevel: 'standard' | 'express';
  docCategory: 'personal' | 'company';
  documentType: string;
  documentQuantityInput: string;
  pagesInput: string;
  deliveryMethod: 'domestic' | 'intl_dhl';
  recipientName: string;
  phone: string;
  postcode: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  stateProvince: string;
  country: string;
  certificateType: string;
  certificateQuantityInput: string;
  email: string;
  tosAccepted: boolean;
  privacyAccepted: boolean;
  authAccepted: boolean;
};

export default function NewOrderPage() {
  const params = useParams<{ locale: Locale }>();
  const locale = params.locale;
  const t = getCopy(locale);

  const [step, setStep] = useState(1);
  const [destinationQuery, setDestinationQuery] = useState('');
  const [destinationCode, setDestinationCode] = useState('');
  const [routeOverride, setRouteOverride] = useState<'auto' | 'hague' | 'non'>('auto');
  const [issuingCountry, setIssuingCountry] = useState(locale === 'zh' ? '澳大利亚' : 'Australia');
  const [serviceLevel, setServiceLevel] = useState<'standard' | 'express'>('standard');
  const [docCategory, setDocCategory] = useState<'personal' | 'company'>('personal');
  const [documentType, setDocumentType] = useState('');
  const [documentQuantityInput, setDocumentQuantityInput] = useState('1');
  const [pagesInput, setPagesInput] = useState('1');
  const [deliveryMethod, setDeliveryMethod] = useState<'domestic' | 'intl_dhl'>('domestic');
  const [recipientName, setRecipientName] = useState('');
  const [phone, setPhone] = useState('');
  const [postcode, setPostcode] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [stateProvince, setStateProvince] = useState('');
  const [country, setCountry] = useState('');
  const [certificateType, setCertificateType] = useState('none');
  const [certificateQuantityInput, setCertificateQuantityInput] = useState('0');
  const [files, setFiles] = useState<File[]>([]);
  const [passportDocs, setPassportDocs] = useState<File[]>([]);
  const [supportingIdDocs, setSupportingIdDocs] = useState<File[]>([]);
  const [showChecklist, setShowChecklist] = useState(false);
  const [email, setEmail] = useState('');
  const [tosAccepted, setTosAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [authAccepted, setAuthAccepted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [displayCurrency, setDisplayCurrency] = useState('AUD');
  const draftStorageKey = `egs_order_draft_${locale}`;

  const destination = useMemo(() => findDestination(destinationCode), [destinationCode]);
  const destinationOptions = useMemo(
    () => DESTINATIONS.map((d) => ({ code: d.code, name: locale === 'zh' ? d.zh : d.en })),
    [locale]
  );
  const issuingCountryOptions = useMemo(
    () => DESTINATIONS.map((d) => (locale === 'zh' ? d.zh : d.en)),
    [locale]
  );
  const shippingCountryOptions = useMemo(
    () => SUPPORTED_SHIPPING_COUNTRIES.map((item) => (locale === 'zh' ? item.zh : item.en)),
    [locale]
  );
  const documentTypeOptions = useMemo(() => t.order.options.documentTypes, [t]);
  const destinationCountry = destination ? (locale === 'zh' ? destination.zh : destination.en) : '';
  const documentQuantity = Math.max(1, Number.parseInt(documentQuantityInput || '1', 10) || 1);
  const pages = Math.max(1, Number.parseInt(pagesInput || '1', 10) || 1);
  const certificateQuantity = Math.max(0, Number.parseInt(certificateQuantityInput || '0', 10) || 0);
  const mailingAddress = [recipientName, phone, email, addressLine1, addressLine2, city, stateProvince, postcode, country].filter(Boolean).join(', ');

  const summary = useMemo(
    () =>
      estimateOrder({
        locale,
        destinationCountry,
        destinationCode,
        routeOverride,
        serviceLevel,
        docCategory,
        documentType,
        documentQuantity,
        pages,
        deliveryMethod,
        certificateType,
        certificateQuantity,
        email,
      }),
    [locale, destinationCountry, destinationCode, routeOverride, serviceLevel, docCategory, documentType, documentQuantity, pages, deliveryMethod, certificateType, certificateQuantity, email]
  );

  const steps = t.order.steps.map((label, index) => ({ id: index + 1, label }));
  const allConsentsAccepted = tosAccepted && privacyAccepted && authAccepted;
  const issuedIn = useMemo<'AU' | 'OVERSEAS'>(() => {
    const value = issuingCountry.trim().toLowerCase();
    if (!value) return 'AU';
    if (['australia', 'au', 'australian', '澳大利亚', '澳洲'].includes(value)) return 'AU';
    return 'OVERSEAS';
  }, [issuingCountry]);
  const deliveryMethodValid = issuedIn === 'AU' || deliveryMethod === 'intl_dhl';
  const shippingCountryValid = isSupportedShippingCountry(country);
  const domesticCountryValid =
    deliveryMethod !== 'domestic' || ['australia', '澳大利亚', '澳洲'].includes(country.trim().toLowerCase());

  useEffect(() => {
    if (issuedIn === 'OVERSEAS' && deliveryMethod !== 'intl_dhl') {
      setDeliveryMethod('intl_dhl');
    }
  }, [issuedIn, deliveryMethod]);

  function isStepComplete(stepId: number) {
    if (stepId === 1) return Boolean(destinationCode) && Boolean(issuingCountry.trim());
    if (stepId === 2) return Boolean(routeOverride) && Boolean(serviceLevel) && Boolean(docCategory);
    if (stepId === 3) return Boolean(documentType) && documentQuantity > 0 && pages > 0;
    if (stepId === 4) return files.length > 0 && passportDocs.length > 0 && supportingIdDocs.length > 0;
    if (stepId === 5) {
      return Boolean(deliveryMethod)
        && Boolean(recipientName.trim())
        && Boolean(phone.trim())
        && Boolean(postcode.trim())
        && Boolean(email.trim())
        && Boolean(addressLine1.trim())
        && Boolean(city.trim())
        && Boolean(stateProvince.trim())
        && Boolean(country.trim())
        && shippingCountryValid
        && domesticCountryValid
        && deliveryMethodValid;
    }
    if (stepId === 6) return true;
    if (stepId === 7) return allConsentsAccepted;
    return false;
  }

  function maxReachableStep() {
    let max = 1;
    for (let i = 1; i <= 6; i += 1) {
      if (isStepComplete(i)) max = i + 1;
      else break;
    }
    return Math.min(7, max);
  }

  function canContinue() {
    return isStepComplete(step);
  }

  function selectDestination(code: string) {
    const selected = DESTINATIONS.find((d) => d.code === code);
    if (!selected) return;
    setDestinationCode(code);
    setDestinationQuery(locale === 'zh' ? selected.zh : selected.en);
  }

  function applyEdgecliffPoBox() {
    setAddressLine1('PO Box, Edgecliff NSW 2027');
    setAddressLine2('');
    setCity('Edgecliff');
    setStateProvince('NSW');
    setPostcode('2027');
    setCountry(locale === 'zh' ? '澳大利亚' : 'Australia');
  }

  async function onCheckout(e: FormEvent) {
    e.preventDefault();
    setError('');
    if (!canContinue()) {
      setError(
        step === 7
          ? t.order.consents.errorSummary
          : step === 5 && !deliveryMethodValid
            ? t.order.errors.overseasDeliveryOnly
            : step === 5 && !domesticCountryValid
              ? t.order.errors.domesticAustraliaOnly
            : step === 5 && !shippingCountryValid
              ? t.order.errors.unsupportedShippingCountry
            : t.order.errors.required
      );
      return;
    }
    if (step < 7) {
      setStep(step + 1);
      return;
    }

    setLoading(true);

    const createRes = await fetch('/api/orders/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        locale,
        email,
        destinationCountry,
        documentType,
      }),
    });

    const createRaw = await createRes.text();
    let createData: any = {};
    try {
      createData = createRaw ? JSON.parse(createRaw) : {};
    } catch {
      createData = { error: createRaw || 'Internal Error' };
    }
    if (!createRes.ok) {
      setLoading(false);
      setError(createData.error || t.order.errors.checkout);
      return;
    }

    const orderNo = String(createData?.order?.order_no || createData?.order?.order_code || '').trim();
    const orderId = String(createData?.order?.id || '').trim();
    if (!orderNo) {
      setLoading(false);
      setError(t.order.errors.checkout);
      return;
    }

    const res = await fetch('/api/order/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderNo,
        orderId,
        locale,
        amountCents: summary.total,
        currency: 'aud',
      }),
    });

    const raw = await res.text();
    let data: any = {};
    try {
      data = raw ? JSON.parse(raw) : {};
    } catch {
      data = { error: raw || 'Internal Error' };
    }

    setLoading(false);

    if (!res.ok || !data.url) {
      setError(data.error || t.order.errors.checkout);
      return;
    }
    window.location.href = data.url;
  }

  const routeText = routeLabel(locale, summary.resolvedRoute);
  const serviceLevelText = SERVICE_LEVEL.find((x) => x.key === serviceLevel)?.[locale] || serviceLevel;
  const displaySubtotal = convertAudCents(summary.subtotal, displayCurrency);
  const displayServiceFee = convertAudCents(summary.serviceFee, displayCurrency);
  const displayTotal = convertAudCents(summary.total, displayCurrency);
  const showConverted = displayCurrency !== 'AUD';
  const surchargeLabel = locale === 'zh' ? '页数加价' : 'Page Surcharge';
  const draftPayload: OrderDraft = {
    step,
    destinationQuery,
    destinationCode,
    routeOverride,
    issuingCountry,
    serviceLevel,
    docCategory,
    documentType,
    documentQuantityInput,
    pagesInput,
    deliveryMethod,
    recipientName,
    phone,
    postcode,
    addressLine1,
    addressLine2,
    city,
    stateProvince,
    country,
    certificateType,
    certificateQuantityInput,
    email,
    tosAccepted,
    privacyAccepted,
    authAccepted,
  };

  function persistDraftNow() {
    try {
      window.localStorage.setItem(draftStorageKey, JSON.stringify(draftPayload));
    } catch {
      // Ignore storage errors and continue without persistence.
    }
  }

  useEffect(() => {
    let cancelled = false;
    async function resolveCurrency() {
      try {
        const res = await fetch('/api/currency/detect', { cache: 'no-store' });
        const json = await res.json();
        const code = String(json?.currency || '').toUpperCase();
        if (!cancelled && code) {
          setDisplayCurrency(code);
          return;
        }
      } catch {
        // Fallback to browser locale detection.
      }
      if (!cancelled) {
        setDisplayCurrency(detectUserCurrency('AUD'));
      }
    }
    resolveCurrency();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(draftStorageKey);
      if (!raw) return;
      const draft = JSON.parse(raw) as Partial<OrderDraft>;

      if (typeof draft.step === 'number' && draft.step >= 1 && draft.step <= 7) setStep(draft.step);
      if (typeof draft.destinationQuery === 'string') setDestinationQuery(draft.destinationQuery);
      if (typeof draft.destinationCode === 'string') setDestinationCode(draft.destinationCode);
      if (draft.routeOverride === 'auto' || draft.routeOverride === 'hague' || draft.routeOverride === 'non') setRouteOverride(draft.routeOverride);
      if (typeof draft.issuingCountry === 'string') setIssuingCountry(draft.issuingCountry);
      if (draft.serviceLevel === 'standard' || draft.serviceLevel === 'express') setServiceLevel(draft.serviceLevel);
      if (draft.docCategory === 'personal' || draft.docCategory === 'company') setDocCategory(draft.docCategory);
      if (typeof draft.documentType === 'string') setDocumentType(draft.documentType);
      if (typeof draft.documentQuantityInput === 'string') setDocumentQuantityInput(draft.documentQuantityInput);
      if (typeof draft.pagesInput === 'string') setPagesInput(draft.pagesInput);
      if (draft.deliveryMethod === 'domestic' || draft.deliveryMethod === 'intl_dhl') setDeliveryMethod(draft.deliveryMethod);
      if (typeof draft.recipientName === 'string') setRecipientName(draft.recipientName);
      if (typeof draft.phone === 'string') setPhone(draft.phone);
      if (typeof draft.postcode === 'string') setPostcode(draft.postcode);
      if (typeof draft.addressLine1 === 'string') setAddressLine1(draft.addressLine1);
      if (typeof draft.addressLine2 === 'string') setAddressLine2(draft.addressLine2);
      if (typeof draft.city === 'string') setCity(draft.city);
      if (typeof draft.stateProvince === 'string') setStateProvince(draft.stateProvince);
      if (typeof draft.country === 'string') setCountry(draft.country);
      if (typeof draft.certificateType === 'string') setCertificateType(draft.certificateType);
      if (typeof draft.certificateQuantityInput === 'string') setCertificateQuantityInput(draft.certificateQuantityInput);
      if (typeof draft.email === 'string') setEmail(draft.email);
      if (typeof draft.tosAccepted === 'boolean') setTosAccepted(draft.tosAccepted);
      if (typeof draft.privacyAccepted === 'boolean') setPrivacyAccepted(draft.privacyAccepted);
      if (typeof draft.authAccepted === 'boolean') setAuthAccepted(draft.authAccepted);
    } catch {
      // Ignore invalid draft payloads and continue with defaults.
    }
  }, [draftStorageKey]);

  useEffect(() => {
    persistDraftNow();
  }, [
    step,
    destinationQuery,
    destinationCode,
    routeOverride,
    issuingCountry,
    serviceLevel,
    docCategory,
    documentType,
    documentQuantityInput,
    pagesInput,
    deliveryMethod,
    recipientName,
    phone,
    postcode,
    addressLine1,
    addressLine2,
    city,
    stateProvince,
    country,
    certificateType,
    certificateQuantityInput,
    email,
    tosAccepted,
    privacyAccepted,
    authAccepted,
    draftStorageKey,
  ]);

  return (
    <Container>
      <Section>
      <div className="grid-2" style={{ alignItems: 'start' }}>
      <section className="section-card stack-md">
        <PageHeader kicker={t.order.kicker} title={t.order.title} subtitle={t.order.subtitle} />
        <Stepper
          currentStep={step}
          onStepChange={(nextStep) => {
            persistDraftNow();
            setError('');
            if (nextStep > maxReachableStep()) {
              setError(t.order.errors.required);
              return;
            }
            setStep(nextStep);
          }}
          steps={steps}
        />

        <form className="stack-md" onSubmit={onCheckout}>
          {step === 1 ? (
            <div className="stack-sm">
              <label className="small-text">{t.order.labels.destination}</label>
              <input
                className="input"
                list="destination-country-options"
                placeholder={t.order.options.destinationSearchHint}
                value={destinationQuery}
                onChange={(e) => {
                  const value = e.target.value;
                  setDestinationQuery(value);
                  const exact = DESTINATIONS.find(
                    (d) =>
                      (locale === 'zh' ? d.zh : d.en).toLowerCase() === value.trim().toLowerCase()
                      || d.code.toLowerCase() === value.trim().toLowerCase()
                  );
                  setDestinationCode(exact?.code || '');
                }}
              />
              <datalist id="destination-country-options">
                {destinationOptions.map((item) => (
                  <option key={item.code} value={item.name} />
                ))}
              </datalist>
              <p className="small-text">{t.order.options.destinationCommonTitle}</p>
              <div className="actions">
                {t.order.options.destinationSuggestions.map((item) => {
                  const matched = DESTINATIONS.find((d) => (locale === 'zh' ? d.zh : d.en) === item);
                  return (
                    <button
                      className="btn btn-ghost"
                      key={item}
                      onClick={() => {
                        if (matched) selectDestination(matched.code);
                      }}
                      type="button"
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
              {destinationCode ? (
                <p className="small-text">{locale === 'zh' ? `已选择：${destinationCountry}` : `Selected: ${destinationCountry}`}</p>
              ) : (
                <p className="warn-text">{locale === 'zh' ? '请从候选列表选择一个国家后继续。' : 'Please select one destination from the suggestions to continue.'}</p>
              )}

              <label className="small-text">{t.order.labels.issuingCountry}</label>
              <input
                className="input"
                list="issuing-country-options"
                placeholder={t.order.options.issuingCountrySearchHint}
                value={issuingCountry}
                onChange={(e) => setIssuingCountry(e.target.value)}
              />
              <datalist id="issuing-country-options">
                {issuingCountryOptions.map((item) => (
                  <option key={item} value={item} />
                ))}
              </datalist>
              <p className="small-text">{t.order.options.issuingCountryCommonTitle}</p>
              <div className="actions">
                {t.order.options.issuingCountrySuggestions.map((item) => (
                  <button className="btn btn-ghost" key={item} onClick={() => setIssuingCountry(item)} type="button">
                    {item}
                  </button>
                ))}
              </div>
              {!issuingCountry.trim() ? <p className="warn-text">{t.order.errors.required}</p> : null}
            </div>
          ) : null}

          {step === 2 ? (
            <div className="stack-sm">
              <label className="small-text">{t.order.labels.service}</label>
              <select className="select" value={routeOverride} onChange={(e) => setRouteOverride(e.target.value as 'auto' | 'hague' | 'non')}>
                {ROUTE_OVERRIDE.map((item) => (
                  <option key={item.key} value={item.key}>
                    {item[locale]}
                  </option>
                ))}
              </select>

              <label className="small-text">{t.order.labels.serviceLevel}</label>
              <select className="select" value={serviceLevel} onChange={(e) => setServiceLevel(e.target.value as 'standard' | 'express')}>
                {SERVICE_LEVEL.map((item) => (
                  <option key={item.key} value={item.key}>
                    {item[locale]}
                  </option>
                ))}
              </select>

              <label className="small-text">{t.order.labels.docCategory}</label>
              <select className="select" value={docCategory} onChange={(e) => setDocCategory(e.target.value as 'personal' | 'company')}>
                {DOC_CATEGORY.map((item) => (
                  <option key={item.key} value={item.key}>
                    {item[locale]}
                  </option>
                ))}
              </select>
            </div>
          ) : null}

          {step === 3 ? (
            <div className="stack-sm">
              <label className="small-text">{t.order.labels.docType}</label>
              <select className="select" value={documentType} onChange={(e) => setDocumentType(e.target.value)}>
                <option value="">{locale === 'zh' ? '请选择文件类型' : 'Select document type'}</option>
                {documentType && !documentTypeOptions.includes(documentType) ? <option value={documentType}>{documentType}</option> : null}
                {documentTypeOptions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <label className="small-text">{t.order.labels.docQty}</label>
              <input
                className="input"
                inputMode="numeric"
                pattern="[0-9]*"
                value={documentQuantityInput}
                onChange={(e) => setDocumentQuantityInput(e.target.value.replace(/[^\d]/g, ''))}
              />

              <label className="small-text">{t.order.labels.pages}</label>
              <input
                className="input"
                inputMode="numeric"
                pattern="[0-9]*"
                value={pagesInput}
                onChange={(e) => setPagesInput(e.target.value.replace(/[^\d]/g, ''))}
              />

              <label className="small-text">{t.order.labels.certificate}</label>
              <select className="select" value={certificateType} onChange={(e) => setCertificateType(e.target.value)}>
                {CERT_OPTIONS.map((item) => (
                  <option key={item.key} value={item.key}>
                    {(locale === 'zh' ? item.zh : item.en) + (item.price ? ` · A$${item.price}` : '')}
                  </option>
                ))}
              </select>

              <label className="small-text">{t.order.labels.certificateQty}</label>
              <input
                className="input"
                inputMode="numeric"
                pattern="[0-9]*"
                value={certificateQuantityInput}
                onChange={(e) => setCertificateQuantityInput(e.target.value.replace(/[^\d]/g, ''))}
              />
            </div>
          ) : null}

          {step === 4 ? (
            <div className="stack-sm">
              <details className="ui-card ui-card-muted stack-sm" open={showChecklist} onToggle={(e) => setShowChecklist((e.target as HTMLDetailsElement).open)}>
                <summary className="small-text">{t.order.labels.checklistToggle}</summary>
                <div className="grid-2">
                  <div className="ui-card stack-sm">
                    <p className="small-text">
                      <strong>{t.portal.checklist.identity.title}</strong>
                    </p>
                    <ul className="list-plain">
                      <li className="small-text">{t.portal.checklist.identity.passportRule}</li>
                    </ul>
                  </div>
                  <div className="ui-card stack-sm">
                    <p className="small-text">
                      <strong>{t.portal.checklist.secondary.title}</strong>
                    </p>
                    <ul className="list-plain">
                      {t.portal.checklist.secondary.rules.map((rule) => (
                        <li className="small-text" key={rule}>
                          {rule}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="ui-card stack-sm">
                    <p className="small-text">
                      <strong>{t.portal.checklist.scan.title}</strong>
                    </p>
                    <ul className="list-plain">
                      {t.portal.checklist.scan.rules.map((rule) => (
                        <li className="small-text" key={rule}>
                          {rule}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="ui-card stack-sm">
                    <p className="small-text">
                      <strong>{t.portal.checklist.signature.title}</strong>
                    </p>
                    <ul className="list-plain">
                      {t.portal.checklist.signature.rules.map((rule) => (
                        <li className="small-text" key={rule}>
                          {rule}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="ui-card stack-sm">
                    <p className="small-text">
                      <strong>{t.portal.checklist.originals.title}</strong>
                    </p>
                    <ul className="list-plain">
                      {t.portal.checklist.originals.rules.map((rule) => (
                        <li className="small-text" key={rule}>
                          {rule}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="ui-card stack-sm">
                    <p className="small-text">
                      <strong>{t.portal.checklist.overseas.title}</strong>
                    </p>
                    <ul className="list-plain">
                      {t.portal.checklist.overseas.rules.map((rule) => (
                        <li className="small-text" key={rule}>
                          {rule}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </details>

              <div className="grid-2">
                <div className="ui-card stack-sm">
                  <h3>{locale === 'zh' ? '主体文件上传' : 'Primary document upload'}</h3>
                  <label className="small-text">{t.order.labels.uploadDocs}</label>
                  <input
                    className="input"
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => setFiles(Array.from(e.target.files || []))}
                  />
                  <ul className="list-plain">
                    {t.portal.checklist.scan.rules.map((rule) => (
                      <li className="small-text" key={`upload-scan-${rule}`}>
                        {rule}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="ui-card stack-sm">
                  <h3>{locale === 'zh' ? '护照上传（必传）' : 'Passport upload (required)'}</h3>
                  <label className="small-text">{t.order.labels.uploadPassport}</label>
                  <input
                    className="input"
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => setPassportDocs(Array.from(e.target.files || []))}
                  />
                  <ul className="list-plain">
                    <li className="small-text">{t.portal.checklist.identity.passportRule}</li>
                  </ul>
                </div>
              <div className="ui-card stack-sm">
                <h3>{locale === 'zh' ? '辅助证件上传' : 'Supporting ID upload'}</h3>
                <label className="small-text">{t.order.labels.uploadSupportingId}</label>
                <input
                  className="input"
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => setSupportingIdDocs(Array.from(e.target.files || []))}
                />
                <ul className="list-plain">
                    {t.portal.checklist.secondary.rules.map((rule) => (
                      <li className="small-text" key={`upload-support-${rule}`}>
                        {rule}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {files.length > 0 ? (
                <div className="ui-card ui-card-muted stack-sm">
                  <p className="small-text">
                    <strong>{locale === 'zh' ? '已选择文件' : 'Selected documents'}:</strong> {files.length}
                  </p>
                  <ul className="list-plain">
                    {files.map((file) => (
                      <li className="small-text" key={`${file.name}-${file.lastModified}`}>
                        {file.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {passportDocs.length > 0 ? (
                <div className="ui-card ui-card-muted stack-sm">
                  <p className="small-text">
                    <strong>{locale === 'zh' ? '已选择护照文件' : 'Selected passport files'}:</strong> {passportDocs.length}
                  </p>
                  <ul className="list-plain">
                    {passportDocs.map((file) => (
                      <li className="small-text" key={`${file.name}-${file.lastModified}`}>
                        {file.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {supportingIdDocs.length > 0 ? (
                <div className="ui-card ui-card-muted stack-sm">
                  <p className="small-text">
                    <strong>{locale === 'zh' ? '已选择辅助证件' : 'Selected supporting ID documents'}:</strong> {supportingIdDocs.length}
                  </p>
                  <ul className="list-plain">
                    {supportingIdDocs.map((file) => (
                      <li className="small-text" key={`${file.name}-${file.lastModified}`}>
                        {file.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          ) : null}

          {step === 5 ? (
            <div className="stack-sm">
              <label className="small-text">{t.order.labels.delivery}</label>
              <select className="select" value={deliveryMethod} onChange={(e) => setDeliveryMethod(e.target.value as 'domestic' | 'intl_dhl')}>
                {COURIER_OPTIONS.map((item) => (
                  <option disabled={issuedIn === 'OVERSEAS' && item.key !== 'intl_dhl'} key={item.key} value={item.key}>
                    {item[locale]}
                  </option>
                ))}
              </select>
              {issuedIn === 'OVERSEAS' ? <p className="small-text">{t.order.errors.overseasDeliveryOnly}</p> : null}
              {deliveryMethod === 'domestic' && !domesticCountryValid ? <p className="warn-text">{t.order.errors.domesticAustraliaOnly}</p> : null}
              <label className="small-text">{t.order.labels.recipientName}</label>
              <input className="input" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} />
              <label className="small-text">{t.order.labels.phone}</label>
              <input className="input" value={phone} onChange={(e) => setPhone(e.target.value)} />
              <label className="small-text">{t.order.labels.email}</label>
              <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <label className="small-text">{t.order.labels.addressLine1}</label>
              <input className="input" value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} />
              <div className="actions">
                <button className="btn btn-ghost" type="button" onClick={applyEdgecliffPoBox}>
                  {t.order.options.poBoxEdgecliff}
                </button>
              </div>
              <label className="small-text">{t.order.labels.addressLine2}</label>
              <input className="input" value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} />
              <label className="small-text">{t.order.labels.city}</label>
              <input className="input" value={city} onChange={(e) => setCity(e.target.value)} />
              <label className="small-text">{t.order.labels.state}</label>
              <input className="input" value={stateProvince} onChange={(e) => setStateProvince(e.target.value)} />
              <label className="small-text">{t.order.labels.postcode}</label>
              <input className="input" value={postcode} onChange={(e) => setPostcode(e.target.value)} />
              <label className="small-text">{t.order.labels.country}</label>
              <input
                className="input"
                list="shipping-country-options"
                placeholder={t.order.options.shippingCountrySearchHint}
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
              <datalist id="shipping-country-options">
                {shippingCountryOptions.map((item) => (
                  <option key={item} value={item} />
                ))}
              </datalist>
              <p className="small-text">{t.order.options.shippingCountryCommonTitle}</p>
              <div className="actions">
                {t.order.options.shippingCountrySuggestions.map((item) => (
                  <button className="btn btn-ghost" key={item} onClick={() => setCountry(item)} type="button">
                    {item}
                  </button>
                ))}
              </div>
              {!shippingCountryValid && country.trim() ? <p className="warn-text">{t.order.errors.unsupportedShippingCountry}</p> : null}
            </div>
          ) : null}

          {step === 6 ? (
            <div className="stack-sm">
              <h3>{locale === 'zh' ? '复核订单' : 'Review & Confirm'}</h3>
              <p className="small-text">
                {locale === 'zh'
                  ? '最终路径将在处理前确认。请复核以下摘要后进入协议确认。'
                  : 'Final route is confirmed before processing. Review this summary before agreements.'}
              </p>
              <p className="small-text">{t.common.disclaimer}</p>
              <div className="ui-card ui-card-muted stack-sm">
                <InfoRow label={t.order.labels.destination} value={destinationCountry || '-'} />
                <InfoRow label={t.order.labels.issuingCountry} value={issuingCountry || '-'} />
                <InfoRow label={t.order.labels.service} value={routeText} />
                <InfoRow label={t.order.labels.serviceLevel} value={serviceLevelText} />
                <InfoRow label={t.order.labels.docCategory} value={DOC_CATEGORY.find((x) => x.key === docCategory)?.[locale] || docCategory} />
                <InfoRow label={t.order.labels.docType} value={documentType || '-'} />
                <InfoRow label={t.order.labels.docQty} value={String(documentQuantity || '-')} />
                <InfoRow label={t.order.labels.pages} value={String(pages || '-')} />
                <InfoRow label={t.order.labels.delivery} value={COURIER_OPTIONS.find((x) => x.key === deliveryMethod)?.[locale] || deliveryMethod} />
                <InfoRow label={t.order.summary.eta} value={summary.estimatedDays} />
              </div>
            </div>
          ) : null}

          {step === 7 ? (
            <div className="stack-sm">
              <h3>{locale === 'zh' ? '协议确认并支付' : 'Agreements & Pay'}</h3>
              <div className="ui-card ui-card-muted stack-sm" role="group" aria-labelledby="consent-title">
                <p className="kicker" id="consent-title">
                  {t.order.consents.title}
                </p>
                <label className="small-text">
                  <input checked={tosAccepted} onChange={(e) => setTosAccepted(e.target.checked)} type="checkbox" /> {t.order.consents.tosLabel}{' '}
                  <Link href={`/${locale}/legal/terms`} onClick={persistDraftNow} rel="noreferrer noopener" target="_blank">
                    {t.order.consents.view}
                  </Link>
                </label>
                <label className="small-text">
                  <input checked={privacyAccepted} onChange={(e) => setPrivacyAccepted(e.target.checked)} type="checkbox" /> {t.order.consents.privacyLabel}{' '}
                  <Link href={`/${locale}/legal/privacy`} onClick={persistDraftNow} rel="noreferrer noopener" target="_blank">
                    {t.order.consents.view}
                  </Link>
                </label>
                <p className="small-text">{t.order.consents.privacyAclNotice}</p>
                <label className="small-text">
                  <input checked={authAccepted} onChange={(e) => setAuthAccepted(e.target.checked)} type="checkbox" /> {t.order.consents.authLabel}{' '}
                  <Link href={`/${locale}/legal/authorisation`} onClick={persistDraftNow} rel="noreferrer noopener" target="_blank">
                    {t.order.consents.view}
                  </Link>
                </label>
              </div>
              {!allConsentsAccepted ? <ErrorState title={t.order.consents.errorTitle} body={t.order.consents.errorSummary} /> : null}
            </div>
          ) : null}

          <div className="actions">
            {step > 1 ? (
              <button className="btn btn-ghost" onClick={() => setStep(step - 1)} type="button">
                {t.order.buttons.back}
              </button>
            ) : null}
            {step < 7 ? (
              <button
                className="btn btn-secondary"
                onClick={() => {
                  if (!canContinue()) {
                    setError(
                      step === 7
                        ? t.order.consents.errorSummary
                        : step === 5 && !deliveryMethodValid
                          ? t.order.errors.overseasDeliveryOnly
                          : step === 5 && !domesticCountryValid
                            ? t.order.errors.domesticAustraliaOnly
                          : step === 5 && !shippingCountryValid
                            ? t.order.errors.unsupportedShippingCountry
                          : t.order.errors.required
                    );
                    return;
                  }
                  setError('');
                  setStep(step + 1);
                }}
                type="button"
              >
                {t.order.buttons.next}
              </button>
            ) : (
              <button className="btn btn-primary" disabled={loading || !allConsentsAccepted} type="submit">
                {loading ? t.common.loading : t.order.buttons.pay}
              </button>
            )}
          </div>
          {error ? <ErrorState title={t.common.error} body={error} /> : null}
        </form>
      </section>

      <aside className="section-card stack-sm summary-panel">
        <h3>{t.order.summary.title}</h3>
        <InfoRow label={t.order.labels.destination} value={destinationCountry || '-'} />
        <InfoRow label={t.order.labels.service} value={routeText} />
        <InfoRow label={t.order.labels.issuedIn} value={issuedIn === 'AU' ? t.order.options.issuedIn.au : t.order.options.issuedIn.overseas} />
        <InfoRow label={t.order.labels.issuingCountry} value={issuingCountry || '-'} />
        <InfoRow label={t.order.labels.serviceLevel} value={serviceLevelText} />
        <InfoRow label={t.order.labels.docCategory} value={DOC_CATEGORY.find((x) => x.key === docCategory)?.[locale] || docCategory} />
        <InfoRow label={t.order.labels.docType} value={documentType || '-'} />
        <InfoRow label={t.order.labels.docQty} value={String(documentQuantity || '-')} />
        <InfoRow label={t.order.labels.pages} value={String(pages || '-')} />
        <InfoRow label={t.order.labels.delivery} value={COURIER_OPTIONS.find((x) => x.key === deliveryMethod)?.[locale] || deliveryMethod} />
        <InfoRow label={t.order.labels.recipientName} value={recipientName || '-'} />
        <InfoRow label={t.order.labels.phone} value={phone || '-'} />
        <InfoRow label={t.order.labels.email} value={email || '-'} />
        <InfoRow label={t.order.labels.postcode} value={postcode || '-'} />
        <InfoRow label={t.order.labels.mailingAddress} value={mailingAddress || '-'} />
        <InfoRow label={t.order.summary.eta} value={summary.estimatedDays} />
        <InfoRow label={t.common.subtotal} value={formatMoney(displaySubtotal, displayCurrency, locale)} />
        <InfoRow label={summary.serviceFee > 0 ? surchargeLabel : t.common.serviceFee} value={formatMoney(displayServiceFee, displayCurrency, locale)} />
        <InfoRow label={t.order.summary.estimatedTotal} value={formatMoney(displayTotal, displayCurrency, locale)} />
        {showConverted ? (
          <>
            <InfoRow label={t.order.summary.settlementCurrency} value={formatMoney(summary.total, 'AUD', locale)} />
            <p className="small-text">{t.order.summary.fxNote.replace('{currency}', displayCurrency)}</p>
          </>
        ) : null}
      </aside>
    </div>
    </Section>
    </Container>
  );
}
