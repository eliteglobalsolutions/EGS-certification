export type RouteEstimateInput = {
  issuingCountry: string;
  destinationCountry: string;
  documentType: string;
  quantity: number;
  translationRequired: boolean;
  originalHandling: boolean;
  speed: 'standard' | 'express';
  haguePreference?: 'hague' | 'non_hague' | 'unsure';
};

export type RouteEstimateResult = {
  routeType: 'apostille' | 'consular_legalisation' | 'needs_review';
  routeLabel: string;
  summary: string;
  requiredItems: string[];
  steps: string[];
  etaRange: string;
  riskNotes: string[];
  complianceNote: string;
};

const SMALL_HAGUE = new Set([
  'australia',
  'singapore',
  'united states',
  'usa',
  'us',
  'canada',
  'mexico',
  'united kingdom',
  'uk',
  'germany',
  'france',
  'italy',
  'spain',
  'netherlands',
  'belgium',
  'ireland',
  'portugal',
  'austria',
  'sweden',
  'denmark',
  'finland',
  'norway',
  'switzerland',
  'japan',
  'south korea',
  'new zealand',
]);

function norm(v: string) {
  return v.trim().toLowerCase();
}

export function estimateRoute(input: RouteEstimateInput): RouteEstimateResult {
  const issuing = norm(input.issuingCountry);
  const destination = norm(input.destinationCountry);
  const hagueGuess = SMALL_HAGUE.has(destination) && SMALL_HAGUE.has(issuing);

  const routeType =
    input.haguePreference === 'hague'
      ? 'apostille'
      : input.haguePreference === 'non_hague'
        ? 'consular_legalisation'
        : hagueGuess
          ? 'apostille'
          : input.haguePreference === 'unsure'
            ? 'needs_review'
            : 'consular_legalisation';

  const routeLabel =
    routeType === 'apostille'
      ? 'Apostille route'
      : routeType === 'consular_legalisation'
        ? 'Consular legalisation route'
        : 'Route requires specialist review';

  const requiredItems = [
    'Valid photo ID',
    `${input.documentType || 'Document'} scans`,
    `Issuing country: ${input.issuingCountry || '-'}`,
    `Destination country: ${input.destinationCountry || '-'}`,
    ...(input.translationRequired ? ['Translation requirement details'] : []),
    ...(input.originalHandling ? ['Original document handling instructions'] : []),
  ];

  const steps = [
    'Route check and document screening',
    'Requirement confirmation and intake lock',
    'Submission coordination with authorised channels',
    'Status updates and delivery/pickup finalisation',
  ];

  const etaRange =
    routeType === 'apostille'
      ? input.speed === 'express'
        ? 'Estimated 2-5 business days'
        : 'Estimated 5-10 business days'
      : routeType === 'consular_legalisation'
        ? input.speed === 'express'
          ? 'Estimated 8-15 business days'
          : 'Estimated 12-25 business days'
        : 'Estimated timeline provided after route confirmation';

  const riskNotes = [
    'Final route is confirmed before processing.',
    'Timelines are estimates and may vary by authority queues.',
    'Decisions are made by relevant third-party authorities.',
  ];

  return {
    routeType,
    routeLabel,
    summary:
      routeType === 'apostille'
        ? 'Likely Apostille pathway based on selected jurisdictions.'
        : routeType === 'consular_legalisation'
          ? 'Likely consular legalisation pathway based on selected jurisdictions.'
          : 'Current inputs require specialist route confirmation before processing.',
    requiredItems,
    steps,
    etaRange,
    riskNotes,
    complianceNote:
      'EGS acts as an independent administrative intermediary. Final route is confirmed before processing.',
  };
}
