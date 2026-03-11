type CopyText = {
  en: string;
  zh?: string;
};

export type KnowledgeRoute = {
  slug: string;
  title: CopyText;
  subheading: CopyText;
  routeType: CopyText;
  officialBaseline: CopyText;
  screeningDiscipline: CopyText;
  whoUsesThis: CopyText;
  typicalRequirements: CopyText[];
  reviewFocus: CopyText[];
  commonIssues: CopyText[];
  expedited: CopyText;
  beforePaymentReview: CopyText;
  issuingCountry: string;
  destinationCountry: string;
  relatedGuideSlugs: string[];
  relatedFaqSlugs: string[];
  prefill?: {
    issuingSlug?: string;
    destinationSlug?: string;
    documentSlug?: string;
  };
};

function t(en: string, zh?: string): CopyText {
  return { en, zh };
}

const allKnowledgeRoutes: KnowledgeRoute[] = [
  {
    slug: 'australian-company-documents-for-use-in-hong-kong',
    title: t('Australian Company Documents for Use in Hong Kong'),
    subheading: t(
      'High-intent route page for Australian company documents being prepared for Hong Kong use, where the practical split is usually between public registry records and private signed corporate documents.'
    ),
    routeType: t(
      'Usually a mixed route: some corporate documents may sit closer to a direct legalisation path, while signed private corporate papers commonly need notarial handling first.'
    ),
    officialBaseline: t(
      'Australian company-document routes are document-class sensitive. ASIC and other public records do not sit in the same lane as signed board resolutions, powers of attorney, or internal corporate papers.'
    ),
    screeningDiscipline: t(
      'The first review usually checks the document pack, the Hong Kong receiving body, and whether any private signed corporate papers change the route before intake is fixed.'
    ),
    whoUsesThis: t(
      'Usually used for banking, counterparty onboarding, corporate structuring, registry matters, shareholder evidence, director authority, and other cross-border commercial filings involving Hong Kong.'
    ),
    typicalRequirements: [
      t('The exact company document pack, not just one isolated extract.'),
      t('The Hong Kong receiving authority, bank, counterparty, or filing purpose if known.'),
      t('Whether the pack contains only public registry records or also signed private corporate papers.'),
      t('Any deadline or transaction timeline that may change document recency needs.'),
    ],
    reviewFocus: [
      t('Which documents are public registry records and which are private signed corporate documents.'),
      t('Whether the Hong Kong side expects originals, notarised copies, or a broader corporate support pack.'),
      t('Whether the current extract or certificate is recent enough for the actual commercial use.'),
    ],
    commonIssues: [
      t('Treating all company documents as if they follow the same route.'),
      t('Missing the notarial step for signed private corporate documents.'),
      t('Using stale registry extracts or partial corporate packs.'),
    ],
    expedited: t(
      'Expedite may be possible on some parts of the route, but corporate files should not be rushed until the document pack and any upstream notarial needs are clear.'
    ),
    beforePaymentReview: t(
      'Before anything is confirmed, the file is checked for document class, signatory structure, recency, and whether the Hong Kong use case stays inside a workable Australian-side route.'
    ),
    issuingCountry: 'Australia',
    destinationCountry: 'Hong Kong',
    relatedGuideSlugs: [
      'australian-company-documents-for-use-in-hong-kong',
      'uk-issued-company-documents-for-use-in-australia',
      'overseas-issued-documents-for-use-in-australia',
    ],
    relatedFaqSlugs: [
      'can-australian-company-documents-be-legalised',
      'common-rejection-risks',
      'what-information-intake-should-collect-first',
    ],
    prefill: {
      issuingSlug: 'australia',
      destinationSlug: 'hong-kong',
      documentSlug: 'company-documents',
    },
  },
  {
    slug: 'overseas-issued-documents-for-use-in-australia',
    title: t('Overseas-Issued Documents for Use in Australia'),
    subheading: t(
      'High-intent route page for foreign-issued documents being prepared for Australian use, where the key route question usually starts in the issuing country rather than in Australia.'
    ),
    routeType: t(
      'Usually a source-country-first route. The legalisation step, if required, commonly belongs to the issuing country, while Australia acts as the receiving side.'
    ),
    officialBaseline: t(
      'Foreign-issued documents do not usually become DFAT-eligible simply because they are brought to Australia. The practical route commonly depends on the issuing country’s own formalities and the Australian receiver’s acceptance rules.'
    ),
    screeningDiscipline: t(
      'The first review usually checks the issuing country, document class, any existing source-country certification, and what the Australian receiving body is actually asking to see.'
    ),
    whoUsesThis: t(
      'Usually used for migration, university admission, regulator filings, banking, employment, and other cases where a foreign-issued document must be accepted by an Australian authority or institution.'
    ),
    typicalRequirements: [
      t('Clear scan of the foreign-issued document and any attached certification pages.'),
      t('Issuing country and issuing authority or institution if known.'),
      t('Australian receiving body and filing purpose.'),
      t('Any translation already prepared or any translation instruction supplied by the Australian receiver.'),
    ],
    reviewFocus: [
      t('Whether the upstream step belongs to the issuing country rather than Australia.'),
      t('Whether the Australian receiver cares mainly about source-country certification, translation, or both.'),
      t('Whether the current foreign document is complete enough for Australian use or still missing source-country formalities.'),
    ],
    commonIssues: [
      t('Assuming DFAT can legalise a foreign-issued document under the same rules as an Australian document.'),
      t('Skipping the issuing country’s own apostille or legalisation requirements.'),
      t('Ignoring translation or Australian receiver-specific acceptance rules.'),
    ],
    expedited: t(
      'Expedite should be discussed carefully because the main delay may sit in the issuing-country stage rather than the Australian receiving stage.'
    ),
    beforePaymentReview: t(
      'Before anything is confirmed, the file is checked for source-country route fit, Australian receiver requirements, and whether the existing document chain is already complete enough to proceed.'
    ),
    issuingCountry: 'Foreign-issued',
    destinationCountry: 'Australia',
    relatedGuideSlugs: [
      'overseas-issued-documents-for-use-in-australia',
      'singapore-issued-academic-documents-for-use-in-australia',
      'uk-issued-company-documents-for-use-in-australia',
    ],
    relatedFaqSlugs: [
      'can-overseas-issued-documents-be-used-in-australia',
      'can-foreign-education-documents-be-legalised-through-dfat-in-australia',
      'common-rejection-risks',
    ],
    prefill: {
      destinationSlug: 'australia',
    },
  },
];

const activeKnowledgeRouteSlugs = new Set<string>([]);

export const knowledgeRoutes: KnowledgeRoute[] = allKnowledgeRoutes.filter((route) =>
  activeKnowledgeRouteSlugs.has(route.slug),
);

const routeMap = new Map(knowledgeRoutes.map((route) => [route.slug, route]));

export function getKnowledgeRoute(slug: string) {
  return routeMap.get(slug);
}

export function getKnowledgeRouteSlugs() {
  return knowledgeRoutes.map((route) => route.slug);
}

export function getRouteCopy(locale: 'en' | 'zh', value: CopyText) {
  return locale === 'zh' ? value.zh || value.en : value.en;
}
