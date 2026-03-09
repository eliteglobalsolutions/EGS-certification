import { readFile } from 'node:fs/promises';
import path from 'node:path';

export type RawSampleRecord = {
  country: string;
  slug: string;
  title: string;
  file_path: string;
  thumb_path?: string | null;
  reviewed: boolean;
  reviewed_by?: string | null;
  reviewed_at?: string | null;
  notes?: string | null;
};

export type EnrichedSampleRecord = RawSampleRecord & {
  issuingCountry: string;
  issuingCountryLabel: string;
  documentType: string;
  destinationUse: string;
  routeType: 'Apostille' | 'Legalisation' | 'Authentication';
  routeTitle: string;
  sampleTitle: string;
  cardDescription: string;
  routeDescription: string;
  useCaseDescription: string;
  tags: string[];
  altText: string;
  caption: string;
  routeMetaLine: string;
  typicalUse: string;
  routeNote: string;
  useCases: string[];
  reviewFirst: string[];
  groupDocumentType: string;
  groupDestination: string;
};

const DOCUMENT_PAGE_SLUGS: Record<string, string> = {
  'Birth Certificate': 'birth-certificate',
  'Marriage Certificate': 'marriage-certificate',
  'Death Certificate': 'death-certificate',
  'Divorce Order': 'divorce-order',
  Passport: 'passport',
  'Bank Statement': 'bank-statement',
  'Medical Report': 'medical-report',
  'Police Check': 'police-check',
  'Power of Attorney': 'power-of-attorney',
  'Declaration Sample': 'statutory-declaration',
  'Degree Certificate': 'degree-certificate',
  'Academic Transcript': 'academic-transcript',
  'Academic Document': 'degree-certificate',
  'Certificate of Free Sale': 'company-documents',
  'Compliance Certificate': 'company-documents',
  'Company Documents': 'company-documents',
  'Apostille Certificate': 'apostille-australia',
  'Legalisation Certificate': 'consular-legalisation-australia',
  'Visa Document': 'services',
};

const COUNTRY_PAGE_SLUGS: Record<string, string> = {
  Australia: 'australia',
  Canada: 'canada',
  USA: 'usa',
  UK: 'united-kingdom',
  Singapore: 'singapore',
  Malaysia: 'malaysia',
  Vietnam: 'vietnam',
  Indonesia: 'indonesia',
  Philippines: 'philippines',
  'South Africa': 'south-africa',
  China: 'china',
  'Hong Kong': 'hong-kong',
  'United Kingdom': 'united-kingdom',
  UAE: 'uae',
};

const COUNTRY_LABELS: Record<string, string> = {
  Australia: 'Australian',
  Canada: 'Canadian',
  Indonesia: 'Indonesia-issued',
  Malaysia: 'Malaysia-issued',
  Philippines: 'Philippines-issued',
  Singapore: 'Singapore-issued',
  'South Africa': 'South Africa-issued',
  UK: 'UK-issued',
  USA: 'US',
  Vietnam: 'Vietnam-issued',
};

const DESTINATION_OVERRIDES: Record<string, string> = {
  'australia-birth-certificate': 'China',
  'australia-marriage-certificate': 'China',
  'australia-academic-document': 'Singapore',
  'australia-academic-document-consulate': 'UAE',
  'australia-academic-document-consulate-2': 'UAE',
  'australia-education-certificate': 'Singapore',
  'australia-company-document': 'China',
  'australia-company-document-2': 'Hong Kong',
  'australia-police-check': 'USA',
  'australia-police-check-2': 'International Use',
  'australia-police-check-3': 'International Use',
  'australia-declaration': 'Singapore',
  'australia-bank-statement': 'International Use',
  'australia-free-sale-certificate': 'UAE',
  'australia-compliance-certificate': 'UAE',
  'australia-divorce-order': 'International Use',
  'australia-passport': 'International Use',
  'canada-company-document': 'Hong Kong',
  'canada-academic-document': 'Singapore',
  'canada-academic-document-2': 'United Kingdom',
  'canada-birth-certificate': 'Hong Kong',
  'canada-birth-certificate-2': 'France',
  'canada-marriage-certificate-consulate': 'Consular Use',
  'canada-power-of-attorney': 'Singapore',
  'canada-power-of-attorney-2': 'Germany',
  'canada-power-of-attorney-3': 'Hong Kong',
  'canada-police-check': 'Australia',
  'canada-declaration': 'Singapore',
  'canada-declaration-2': 'Netherlands',
  'canada-declaration-3': 'Germany',
  'canada-passport': 'International Use',
  'canada-apostille': 'International Use',
  'canada-apostille-2': 'International Use',
  'canada-apostille-3': 'International Use',
  'canada-apostille-4': 'International Use',
  'usa-california-stanford-university-degree-certificate-transcript': 'Singapore',
  'usa-columbia-state-transcript': 'International Use',
  'usa-new-york-business-registration-certificate': 'Hong Kong',
  'usa-maryland-affidavit': 'International Use',
  'malaysia-academic-document-consulate': 'Consular Use',
  'malaysia-birth-certificate-consulate': 'Consular Use',
  'malaysia-police-check-consulate': 'Consular Use',
  'malaysia-legalisation-consulate': 'Consular Use',
  'malaysia-legalisation-consulate-2': 'Consular Use',
  'malaysia-police-check': 'International Use',
  'singapore-power-of-attorney-consulate': 'Consular Use',
  'singapore-registration-document-consulate': 'Consular Use',
  'singapore-police-check': 'Australia',
  'singapore-declaration': 'Australia',
  'singapore-declaration-2': 'United Kingdom',
  'uk-company-document': 'International Use',
  'uk-company-document-2': 'Singapore',
  'uk-birth-certificate': 'International Use',
  'uk-marriage-certificate': 'International Use',
  'uk-police-check': 'International Use',
  'uk-academic-document-consulate': 'Consular Use',
  'uk-apostille': 'International Use',
  'uk-declaration': 'Singapore',
  'uk-declaration-2': 'Germany',
  'vietnam-birth-certificate': 'Australia',
  'vietnam-registration-document-consulate': 'Australia',
  'indonesia-company-document': 'International Use',
  'indonesia-medical-report': 'International Use',
  'indonesia-police-check': 'International Use',
  'indonesia-visa-document': 'International Use',
  'philippines-academic-document': 'International Use',
  'philippines-birth-certificate': 'International Use',
  'south-africa-birth-certificate': 'International Use',
  'south-africa-police-check': 'International Use',
  'south-africa-power-of-attorney': 'International Use',
};

const PUBLIC_DESTINATIONS = new Set(['China', 'Singapore', 'Hong Kong', 'USA', 'UAE']);

const DESTINATION_TAGS: Record<string, string> = {
  China: 'For China',
  Singapore: 'For Singapore',
  USA: 'For USA',
  'Hong Kong': 'For Hong Kong',
  UAE: 'For UAE',
};

const ISSUING_TAGS: Record<string, string> = {
  Australia: 'Australia-issued',
  Canada: 'Canada-issued',
  USA: 'US-issued',
};

const SAMPLE_TITLE_OVERRIDES: Record<string, string> = {
  'australia-academic-document': 'Australian Academic Document for Use in Singapore',
  'australia-academic-document-consulate': 'Australian Academic Document for Use in the UAE',
  'australia-academic-document-consulate-2': 'Australian Academic Certificate for Use in the UAE',
  'australia-bank-statement': 'Australia-issued Bank Statement for Overseas Use',
  'australia-company-document': 'Australian Company Documents for Use in China',
  'australia-company-document-2': 'Australian Company Documents for Use in Hong Kong',
  'australia-declaration': 'Australia-issued Declaration for Use in Singapore',
  'australia-education-certificate': 'Australian Education Certificate for Use in Singapore',
  'canada-academic-document': 'Canadian Academic Document for Use in Singapore',
  'canada-academic-document-2': 'Canadian Academic Record for Use in the United Kingdom',
  'canada-birth-certificate-2': 'Canadian Birth Certificate for Use in France',
  'canada-company-document': 'Canadian Company Documents for Use in Hong Kong',
  'canada-declaration': 'Canada-issued Declaration for Use in Singapore',
  'canada-declaration-2': 'Canada-issued Declaration for Use in the Netherlands',
  'canada-declaration-3': 'Canada-issued Declaration for Use in Germany',
  'canada-police-check': 'Canadian Police Check for Use in Australia',
  'canada-power-of-attorney': 'Canadian Power of Attorney for Use in Singapore',
  'canada-power-of-attorney-2': 'Canadian Power of Attorney for Use in Germany',
  'canada-power-of-attorney-3': 'Canadian Power of Attorney for Use in Hong Kong',
  'indonesia-company-document': 'Indonesia-issued Company Documents for Overseas Use',
  'malaysia-academic-document-consulate': 'Malaysia-issued Academic Document for Consular Use',
  'malaysia-legalisation-consulate': 'Malaysia-issued Legalisation Certificate for Consular Use',
  'malaysia-legalisation-consulate-2': 'Malaysia-issued Legalisation Certificate for Consular Use',
  'philippines-academic-document': 'Philippines-issued Academic Document for Overseas Use',
  'singapore-declaration': 'Singapore-issued Declaration for Use in Australia',
  'singapore-declaration-2': 'Singapore-issued Declaration for Use in the United Kingdom',
  'uk-academic-document-consulate': 'UK-issued Academic Document for Consular Use',
  'uk-company-document': 'UK Company Documents for Overseas Use',
  'uk-company-document-2': 'UK Company Documents for Use in Singapore',
  'uk-declaration': 'UK-issued Declaration for Use in Singapore',
  'uk-declaration-2': 'UK-issued Declaration for Use in Germany',
  'usa-columbia-state-transcript': 'US Academic Transcript for Overseas Use',
  'usa-maryland-affidavit': 'US Affidavit for Overseas Use',
  'usa-new-york-business-registration-certificate': 'US Company Documents for Use in Hong Kong',
};

const PRIORITY_DESTINATIONS = new Set(['China', 'Singapore', 'Hong Kong', 'USA', 'UAE']);
const PRIORITY_COUNTRIES = new Set(['Australia', 'Canada', 'USA', 'UK', 'Singapore']);
const PRIORITY_DOCUMENT_TYPES = new Set([
  'Birth Certificate',
  'Marriage Certificate',
  'Degree Certificate',
  'Academic Transcript',
  'Academic Document',
  'Police Check',
  'Power of Attorney',
  'Company Documents',
  'Declaration Sample',
]);

function titleCaseWords(value: string): string {
  return value
    .replace(/\+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function inferDocumentType(item: RawSampleRecord): string {
  const normalized = `${item.title} ${item.slug}`.toLowerCase();
  if (normalized.includes('birth certificate')) return 'Birth Certificate';
  if (normalized.includes('marriage certificate')) return 'Marriage Certificate';
  if (normalized.includes('death certificate')) return 'Death Certificate';
  if (normalized.includes('divorce')) return 'Divorce Order';
  if (normalized.includes('passport')) return 'Passport';
  if (normalized.includes('bank statement')) return 'Bank Statement';
  if (normalized.includes('medical report')) return 'Medical Report';
  if (normalized.includes('police')) return 'Police Check';
  if (normalized.includes('power of attorney')) return 'Power of Attorney';
  if (normalized.includes('affidavit')) return 'Declaration Sample';
  if (normalized.includes('declaration')) return 'Declaration Sample';
  if (normalized.includes('degree')) return 'Degree Certificate';
  if (normalized.includes('transcript')) return 'Academic Transcript';
  if (normalized.includes('academic') || normalized.includes('education')) return 'Academic Document';
  if (normalized.includes('free sale')) return 'Certificate of Free Sale';
  if (normalized.includes('compliance certificate')) return 'Compliance Certificate';
  if (normalized.includes('business registration')) return 'Company Documents';
  if (normalized.includes('registration document')) return 'Company Documents';
  if (normalized.includes('company')) return 'Company Documents';
  if (normalized.includes('apostille')) return 'Apostille Certificate';
  if (normalized.includes('legalisation')) return 'Legalisation Certificate';
  if (normalized.includes('visa document')) return 'Visa Document';
  return titleCaseWords(item.title);
}

function inferRouteType(item: RawSampleRecord): 'Apostille' | 'Legalisation' | 'Authentication' {
  const normalized = `${item.title} ${item.slug}`.toLowerCase();
  if (normalized.includes('apostille')) return 'Apostille';
  if (normalized.includes('consulate') || normalized.includes('legalisation')) return 'Legalisation';
  return 'Authentication';
}

function buildSampleTitle(item: RawSampleRecord, documentType: string, destinationUse: string): string {
  if (SAMPLE_TITLE_OVERRIDES[item.slug]) {
    return SAMPLE_TITLE_OVERRIDES[item.slug];
  }

  const issuingLabel = COUNTRY_LABELS[item.country] || `${item.country}-issued`;
  const usesConsularPattern = item.title.toLowerCase().includes('consulate');
  const destinationLabel = destinationUse === 'International Use' ? 'Overseas Use' : destinationUse;

  if (documentType === 'Academic Document' && usesConsularPattern) {
    if (destinationUse === 'UAE') {
      return `${item.country}-issued Academic Document for Use in the UAE`;
    }

    return `${item.country}-issued Academic Document for Consular Use`;
  }

  if (documentType === 'Bank Statement' || documentType === 'Declaration Sample') {
    return `${item.country}-issued ${documentType} for ${destinationLabel}`;
  }

  if (destinationUse === 'Consular Use') {
    return `${issuingLabel} ${documentType} for Consular Use`;
  }

  if (documentType === 'Apostille Certificate' || documentType === 'Legalisation Certificate') {
    return `${item.country}-issued ${documentType} for ${destinationLabel}`;
  }

  if (destinationUse === 'International Use') {
    return `${issuingLabel} ${documentType} for Overseas Use`;
  }

  if (PUBLIC_DESTINATIONS.has(destinationUse)) {
    return `${issuingLabel} ${documentType} for Use in ${destinationUse}`;
  }

  return `${issuingLabel} ${documentType} for Overseas Use`;
}

function buildCardDescription(routeType: string): string {
  if (routeType === 'Legalisation') {
    return 'Redacted sample preview for a commonly reviewed consular or embassy-facing document route.';
  }

  if (routeType === 'Apostille') {
    return 'Redacted sample preview for a commonly reviewed apostille-led cross-border document route.';
  }

  return 'Redacted sample preview for a commonly reviewed cross-border document route.';
}

function buildRouteDescription(destinationUse: string): string {
  if (destinationUse === 'China' || destinationUse === 'Hong Kong' || destinationUse === 'UAE') {
    return 'Redacted sample preview for a commonly reviewed overseas document path. Final handling still depends on the receiving side and the document setup.';
  }

  if (destinationUse === 'Singapore' || destinationUse === 'USA') {
    return 'Redacted sample preview for a commonly reviewed cross-border document path. Final handling still depends on the receiving side and the document setup.';
  }

  if (destinationUse === 'Consular Use') {
    return 'Redacted sample preview for a commonly reviewed consular-facing document path. Final handling still depends on the receiving side and the document setup.';
  }

  return 'Redacted sample preview for a commonly reviewed overseas document path. Final handling still depends on the receiving side and the document setup.';
}

function buildUseCaseDescription(documentType: string): string {
  if (documentType === 'Company Documents') {
    return 'Commonly used for registration, banking, cross-border filing, or company setup purposes.';
  }

  if (documentType === 'Degree Certificate' || documentType === 'Academic Transcript' || documentType === 'Academic Document') {
    return 'Commonly used for study, registration, licensing, employment, or migration purposes.';
  }

  if (documentType === 'Power of Attorney' || documentType === 'Declaration Sample') {
    return 'Commonly used for filing, signing, authority submission, or overseas execution purposes.';
  }

  return 'Commonly used for registration, education, employment, migration, or filing purposes.';
}

function buildRouteMetaLine(item: RawSampleRecord, documentType: string, destinationUse: string): string {
  const parts = [item.country, documentType];
  if (PUBLIC_DESTINATIONS.has(destinationUse)) {
    parts.push(`for ${destinationUse}`);
  } else if (destinationUse === 'Consular Use') {
    parts.push('Consular sample');
  }
  return parts.join(' · ');
}

function buildTags(item: RawSampleRecord, documentType: string, destinationUse: string, routeType: string): string[] {
  const tags = new Set<string>();

  tags.add(documentType);
  if (ISSUING_TAGS[item.country]) tags.add(ISSUING_TAGS[item.country]);
  if (DESTINATION_TAGS[destinationUse]) tags.add(DESTINATION_TAGS[destinationUse]);
  tags.add(routeType);

  if (documentType === 'Power of Attorney' || documentType === 'Declaration Sample') {
    tags.add('Original handling');
  }

  if (destinationUse === 'China' || destinationUse === 'Hong Kong' || destinationUse === 'Vietnam') {
    tags.add('Translation support');
  }

  if (routeType === 'Authentication' && documentType !== 'Apostille Certificate') {
    tags.add('Authentication');
  }

  return Array.from(tags);
}

function buildUseCases(documentType: string): string[] {
  if (documentType === 'Birth Certificate' || documentType === 'Marriage Certificate' || documentType === 'Death Certificate') {
    return ['Registration use', 'Family or migration filing', 'Civil status review'];
  }

  if (documentType === 'Degree Certificate' || documentType === 'Academic Transcript' || documentType === 'Academic Document') {
    return ['Study or admission use', 'Employment or licensing review', 'Institution or authority filing'];
  }

  if (documentType === 'Police Check') {
    return ['Migration use', 'Employment screening', 'Authority submission'];
  }

  if (documentType === 'Power of Attorney' || documentType === 'Declaration Sample') {
    return ['Authority submission', 'Property or company signing', 'Execution-sensitive overseas use'];
  }

  if (documentType === 'Company Documents') {
    return ['Company filing use', 'Bank or registry submission', 'Cross-border commercial setup'];
  }

  return ['International filing use', 'Authority or institution review', 'Cross-border document handling'];
}

function buildReviewFirst(documentType: string, destinationUse: string, routeType: string): string[] {
  const items = [
    'Whether the issuing-country document format is the correct version for overseas use',
    'Whether the destination use stays on the expected route or needs a different execution path',
  ];

  if (documentType === 'Degree Certificate' || documentType === 'Academic Transcript' || documentType === 'Academic Document') {
    items.push('Whether transcript pairing, institution wording, or translation support should be built in first');
  }

  if (documentType === 'Police Check') {
    items.push('Whether validity window, original handling, or identity-linked support matters first');
  }

  if (documentType === 'Power of Attorney' || documentType === 'Declaration Sample') {
    items.push('Whether signing, witnessing, and original handling are already set up in the correct format');
  }

  if (documentType === 'Company Documents') {
    items.push('Whether the receiving side needs a registry extract, certificate set, or signed commercial document pack');
  }

  if (routeType === 'Legalisation' || destinationUse === 'China' || destinationUse === 'Hong Kong') {
    items.push('Whether translation support or mission-facing handling should be confirmed before intake proceeds');
  }

  return items;
}

function buildTypicalUse(documentType: string): string {
  if (documentType === 'Company Documents') {
    return 'Usually reviewed for company filing, banking, or registration use on a cross-border route.';
  }

  if (documentType === 'Degree Certificate' || documentType === 'Academic Transcript' || documentType === 'Academic Document') {
    return 'Usually reviewed for study, registration, employment, or licensing use on a cross-border route.';
  }

  if (documentType === 'Police Check') {
    return 'Usually reviewed for migration, employment, or authority submission use on a cross-border route.';
  }

  if (documentType === 'Power of Attorney' || documentType === 'Declaration Sample') {
    return 'Usually reviewed for overseas signing, authority submission, or execution-sensitive use on a cross-border route.';
  }

  return 'Usually reviewed for cross-border personal or commercial use after route confirmation.';
}

function buildRouteNote(documentType: string, destinationUse: string, routeType: string): string {
  const routeLabel =
    routeType === 'Apostille'
      ? 'apostille-led'
      : routeType === 'Legalisation'
        ? 'consular or legalisation-led'
        : 'authentication-led';

  if (documentType === 'Power of Attorney' || documentType === 'Declaration Sample') {
    return `This route is usually ${routeLabel}. Original documents may still be required once execution format and receiving-side wording are confirmed.`;
  }

  if (destinationUse === 'China' || destinationUse === 'Hong Kong') {
    return `This route is usually ${routeLabel}. Translation support or receiving-side wording may need to be confirmed before payment.`;
  }

  return `This route is usually ${routeLabel}. Original documents may still be required once the receiving authority and document setup are confirmed.`;
}

export function enrichSampleRecord(item: RawSampleRecord): EnrichedSampleRecord {
  const documentType = inferDocumentType(item);
  const routeType = inferRouteType(item);
  const destinationUse = DESTINATION_OVERRIDES[item.slug] || 'International Use';
  const sampleTitle = buildSampleTitle(item, documentType, destinationUse);
  const tags = buildTags(item, documentType, destinationUse, routeType);
  const useCases = buildUseCases(documentType);
  const reviewFirst = buildReviewFirst(documentType, destinationUse, routeType);
  const routeTitle =
    destinationUse === 'Consular Use'
      ? 'Consular sample preview'
      : 'Document sample preview';
  const caption = `${sampleTitle}. Redacted preview showing a typical ${routeType.toLowerCase()}-linked route setup before payment review.`;

  return {
    ...item,
    issuingCountry: item.country,
    issuingCountryLabel: COUNTRY_LABELS[item.country] || `${item.country}-issued`,
    documentType,
    destinationUse,
    routeType,
    routeTitle,
    sampleTitle,
    cardDescription: buildCardDescription(routeType),
    routeDescription: buildRouteDescription(destinationUse),
    useCaseDescription: buildUseCaseDescription(documentType),
    tags,
    altText: `${sampleTitle} redacted document sample preview`,
    caption,
    routeMetaLine: buildRouteMetaLine(item, documentType, destinationUse),
    typicalUse: buildTypicalUse(documentType),
    routeNote: buildRouteNote(documentType, destinationUse, routeType),
    useCases,
    reviewFirst,
    groupDocumentType: documentType,
    groupDestination: destinationUse,
  };
}

export async function loadSampleLibrary(): Promise<EnrichedSampleRecord[]> {
  try {
    const indexPath = path.join(process.cwd(), 'public', 'samples', 'index.json');
    const raw = await readFile(indexPath, 'utf8');
    const items = JSON.parse(raw) as RawSampleRecord[];
    const enriched = items
      .map(enrichSampleRecord)
      .sort((a, b) => {
        const score = (item: EnrichedSampleRecord) => {
          let total = 0;
          if (PRIORITY_COUNTRIES.has(item.issuingCountry)) total += 4;
          if (PRIORITY_DOCUMENT_TYPES.has(item.documentType)) total += 4;
          if (PRIORITY_DESTINATIONS.has(item.destinationUse)) total += 3;
          if (item.routeType === 'Apostille' || item.routeType === 'Legalisation') total += 1;
          return total;
        };

        return score(b) - score(a) || a.sampleTitle.localeCompare(b.sampleTitle);
      });

    const totals = enriched.reduce((map, item) => {
      map.set(item.sampleTitle, (map.get(item.sampleTitle) || 0) + 1);
      return map;
    }, new Map<string, number>());

    const seen = new Map<string, number>();
    return enriched.map((item) => {
      const total = totals.get(item.sampleTitle) || 1;
      if (total <= 1) return item;

      const current = (seen.get(item.sampleTitle) || 0) + 1;
      seen.set(item.sampleTitle, current);
      const sampleTitle = `${item.sampleTitle} - Sample ${current}`;

      return {
        ...item,
        sampleTitle,
        altText: `${sampleTitle} redacted document sample preview`,
        caption: `${sampleTitle}. ${item.caption.replace(`${item.sampleTitle}. `, '')}`,
      };
    });
  } catch {
    return [];
  }
}

export async function getSampleBySlug(slug: string): Promise<EnrichedSampleRecord | null> {
  const items = await loadSampleLibrary();
  return items.find((item) => item.slug === slug) ?? null;
}

export async function getSampleSlugs(): Promise<string[]> {
  const items = await loadSampleLibrary();
  return items.map((item) => item.slug);
}

export async function getRelatedSamples(slug: string, limit = 4): Promise<EnrichedSampleRecord[]> {
  const items = await loadSampleLibrary();
  const current = items.find((item) => item.slug === slug);
  if (!current) return [];

  return items
    .filter((item) => item.slug !== slug)
    .map((item) => {
      let score = 0;
      if (item.issuingCountry === current.issuingCountry) score += 3;
      if (item.documentType === current.documentType) score += 3;
      if (item.destinationUse === current.destinationUse) score += 2;
      if (item.routeType === current.routeType) score += 1;
      return { item, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.item.sampleTitle.localeCompare(b.item.sampleTitle))
    .slice(0, limit)
    .map((entry) => entry.item);
}

export async function getFeaturedSamples(limit = 6): Promise<EnrichedSampleRecord[]> {
  const items = await loadSampleLibrary();
  const preferred = [
    'australia-birth-certificate',
    'australia-company-document',
    'australia-police-check',
    'canada-company-document',
    'usa-new-york-business-registration-certificate',
    'usa-california-stanford-university-degree-certificate-transcript',
    'uk-company-document',
    'singapore-power-of-attorney-consulate',
  ];

  const bySlug = new Map(items.map((item) => [item.slug, item]));
  const featured = preferred.map((slug) => bySlug.get(slug)).filter(Boolean) as EnrichedSampleRecord[];
  return featured.slice(0, limit);
}

export function toSampleDocumentPageSlug(documentType: string): string | null {
  return DOCUMENT_PAGE_SLUGS[documentType] || null;
}

export function toSampleCountryPageSlug(value: string): string | null {
  return COUNTRY_PAGE_SLUGS[value] || value.toLowerCase().replace(/\s+/g, '-');
}
