const DEFAULT_AUD_FX: Record<string, number> = {
  AUD: 1,
  USD: 0.66,
  EUR: 0.61,
  GBP: 0.52,
  CNY: 4.75,
  SGD: 0.89,
  HKD: 5.17,
  CAD: 0.9,
  NZD: 1.08,
  JPY: 99.6,
  INR: 54.7,
  IDR: 10300,
  PHP: 37.2,
  VND: 16800,
  MYR: 3.11,
  MXN: 11.3,
  ZAR: 12.4,
  AED: 2.42,
  SAR: 2.47,
  KRW: 874,
};

export const REGION_TO_CURRENCY: Record<string, string> = {
  AU: 'AUD',
  US: 'USD',
  GB: 'GBP',
  IE: 'EUR',
  DE: 'EUR',
  FR: 'EUR',
  ES: 'EUR',
  IT: 'EUR',
  NL: 'EUR',
  BE: 'EUR',
  AT: 'EUR',
  PT: 'EUR',
  GR: 'EUR',
  FI: 'EUR',
  SG: 'SGD',
  NZ: 'NZD',
  CA: 'CAD',
  CN: 'CNY',
  HK: 'HKD',
  JP: 'JPY',
  IN: 'INR',
  ID: 'IDR',
  PH: 'PHP',
  VN: 'VND',
  MY: 'MYR',
  MX: 'MXN',
  ZA: 'ZAR',
  AE: 'AED',
  SA: 'SAR',
  KR: 'KRW',
};

function loadFxOverrides(): Record<string, number> {
  const raw = process.env.NEXT_PUBLIC_FX_RATES_JSON;
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const out: Record<string, number> = {};
    for (const [key, value] of Object.entries(parsed)) {
      const code = key.toUpperCase();
      const rate = Number(value);
      if (Number.isFinite(rate) && rate > 0) out[code] = rate;
    }
    return out;
  } catch {
    return {};
  }
}

export const AUD_FX_RATES: Record<string, number> = {
  ...DEFAULT_AUD_FX,
  ...loadFxOverrides(),
};

export function detectUserCurrency(defaultCurrency = 'AUD'): string {
  if (typeof navigator === 'undefined') return defaultCurrency;

  const lang = navigator.language || 'en-AU';
  let region = '';
  try {
    // Intl.Locale is available in modern browsers and Next supported targets.
    region = new Intl.Locale(lang).region || '';
  } catch {
    const parts = lang.split('-');
    region = (parts[1] || '').toUpperCase();
  }

  const matched = REGION_TO_CURRENCY[region];
  if (matched && AUD_FX_RATES[matched]) return matched;
  return defaultCurrency;
}

export function detectCurrencyFromRegion(region: string, defaultCurrency = 'AUD'): string {
  const key = region.trim().toUpperCase();
  const matched = REGION_TO_CURRENCY[key];
  if (matched && AUD_FX_RATES[matched]) return matched;
  return defaultCurrency;
}

export function detectCurrencyFromRequestHeaders(headers: Headers, defaultCurrency = 'AUD'): string {
  const regionHeaders = [
    'x-vercel-ip-country',
    'cf-ipcountry',
    'x-country-code',
  ];

  for (const headerName of regionHeaders) {
    const region = headers.get(headerName);
    if (!region) continue;
    const currency = detectCurrencyFromRegion(region, '');
    if (currency) return currency;
  }

  const acceptLanguage = headers.get('accept-language') || '';
  const firstTag = acceptLanguage.split(',')[0]?.trim() || '';
  const match = firstTag.match(/-([A-Za-z]{2})$/);
  if (match?.[1]) {
    const currency = detectCurrencyFromRegion(match[1], '');
    if (currency) return currency;
  }

  return defaultCurrency;
}

export function convertAudCents(audCents: number, currency: string): number {
  const code = currency.toUpperCase();
  const rate = AUD_FX_RATES[code] || 1;
  return Math.round(audCents * rate);
}

export function formatMoney(cents: number, currency: string, locale: string): string {
  const amount = cents / 100;
  try {
    return new Intl.NumberFormat(locale === 'zh' ? 'zh-CN' : 'en', {
      style: 'currency',
      currency,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toFixed(2)}`;
  }
}
