import { readFileSync } from 'node:fs';
import { HAGUE_APOSTILLE_CODES } from '@/lib/hague-codes';

export type CountryOption = {
  code: string;
  en: string;
  zh: string;
  hague: boolean;
};

const ISO3166_TAB_PATH = '/usr/share/zoneinfo/iso3166.tab';

const EN_NAME_OVERRIDES: Record<string, string> = {
  BA: 'Bosnia and Herzegovina',
  BN: 'Brunei Darussalam',
  BO: 'Bolivia (Plurinational State of)',
  CV: 'Cabo Verde',
  FM: 'Micronesia (Federated States of)',
  GB: 'United Kingdom',
  HK: 'Hong Kong (China)',
  KN: 'Saint Kitts and Nevis',
  KP: "Korea, Democratic People's Republic of",
  KR: 'South Korea',
  LA: "Lao People's Democratic Republic",
  LC: 'Saint Lucia',
  MD: 'Moldova',
  MK: 'North Macedonia',
  MO: 'Macau (China)',
  PS: 'Palestine',
  RU: 'Russia',
  ST: 'Sao Tome and Principe',
  SZ: 'Eswatini',
  TT: 'Trinidad and Tobago',
  US: 'United States',
  VC: 'Saint Vincent and the Grenadines',
  WS: 'Samoa',
  XK: 'Kosovo',
};

const ZH_NAME_OVERRIDES: Record<string, string> = {
  BA: '波斯尼亚和黑塞哥维那',
  BO: '玻利维亚',
  BN: '文莱',
  CV: '佛得角',
  GB: '英国',
  HK: '中国香港',
  KR: '韩国',
  MO: '中国澳门',
  PS: '巴勒斯坦',
  RU: '俄罗斯',
  ST: '圣多美和普林西比',
  TT: '特立尼达和多巴哥',
  US: '美国',
  XK: '科索沃',
};

const INPUT_ALIASES: Record<string, string> = {
  'bahamas the': 'BS',
  'bosnia & herzegovina': 'BA',
  britain: 'GB',
  'britain uk': 'GB',
  'brunei': 'BN',
  'cape verde': 'CV',
  'czech republic': 'CZ',
  'great britain': 'GB',
  'hong kong': 'HK',
  'hong kong china': 'HK',
  'korea republic of': 'KR',
  'macau': 'MO',
  macao: 'MO',
  'north macedonia': 'MK',
  'republic of korea': 'KR',
  'republic of moldova': 'MD',
  'russian federation': 'RU',
  'saint kitts and nevis': 'KN',
  'saint lucia': 'LC',
  'saint vincent and the grenadines': 'VC',
  samoa: 'WS',
  'samoa western': 'WS',
  'south korea': 'KR',
  'st kitts and nevis': 'KN',
  'st lucia': 'LC',
  'st vincent and the grenadines': 'VC',
  'trinidad and tobago': 'TT',
  turkey: 'TR',
  uae: 'AE',
  uk: 'GB',
  'united kingdom of great britain and northern ireland': 'GB',
  usa: 'US',
  us: 'US',
  'u s a': 'US',
  'u s': 'US',
};

const PRIORITY_COUNTRY_CODES = [
  'GB',
  'US',
  'AU',
  'CA',
  'CN',
  'JP',
  'KR',
  'NZ',
  'MY',
  'TH',
  'IN',
  'PH',
] as const;

const PRIORITY_COUNTRY_ORDER: Map<string, number> = new Map(
  PRIORITY_COUNTRY_CODES.map((code, index) => [code, index]),
);

let countryCache: CountryOption[] | null = null;
let countryLookupCache: Map<string, CountryOption> | null = null;

function normalizeCountryInput(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[().,/'’-]+/g, ' ')
    .replace(/&/g, ' and ')
    .replace(/\s+/g, ' ');
}

function buildCountries(): CountryOption[] {
  const zhNames = new Intl.DisplayNames(['zh-Hans'], { type: 'region' });
  const lines = readFileSync(ISO3166_TAB_PATH, 'utf8')
    .split('\n')
    .filter((line) => line && !line.startsWith('#'));

  const countries = lines.map((line) => {
    const [code, isoEnglish] = line.split('\t');
    const en = EN_NAME_OVERRIDES[code] || isoEnglish;
    const zh = ZH_NAME_OVERRIDES[code] || zhNames.of(code) || en;
    return {
      code,
      en,
      zh,
      hague: HAGUE_APOSTILLE_CODES.has(code),
    };
  });

  countries.push({
    code: 'XK',
    en: EN_NAME_OVERRIDES.XK,
    zh: ZH_NAME_OVERRIDES.XK,
    hague: HAGUE_APOSTILLE_CODES.has('XK'),
  });

  countries.sort((a, b) => {
    const priorityA = PRIORITY_COUNTRY_ORDER.get(a.code);
    const priorityB = PRIORITY_COUNTRY_ORDER.get(b.code);

    if (priorityA !== undefined || priorityB !== undefined) {
      if (priorityA === undefined) return 1;
      if (priorityB === undefined) return -1;
      return priorityA - priorityB;
    }

    return a.en.localeCompare(b.en);
  });
  return countries;
}

export function getCountries() {
  if (!countryCache) {
    countryCache = buildCountries();
  }
  return countryCache;
}

export function findCountry(input: string) {
  const normalized = normalizeCountryInput(input);
  if (!normalized) return null;

  if (!countryLookupCache) {
    countryLookupCache = new Map<string, CountryOption>();
    for (const country of getCountries()) {
      const keys = new Set([
        normalizeCountryInput(country.code),
        normalizeCountryInput(country.en),
        normalizeCountryInput(country.zh),
      ]);

      for (const [alias, code] of Object.entries(INPUT_ALIASES)) {
        if (code === country.code) {
          keys.add(alias);
        }
      }

      for (const key of keys) {
        countryLookupCache.set(key, country);
      }
    }
  }

  return countryLookupCache.get(normalized) || null;
}
