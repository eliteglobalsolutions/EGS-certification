type Locale = 'en' | 'zh';

export type LocalizedText = {
  en: string;
  zh?: string;
};

export type KnowledgeFaq = {
  id: string;
  slug: string;
  category:
    | 'core-concepts'
    | 'australian-documents'
    | 'education-my-equals'
    | 'signed-documents'
    | 'overseas-to-australia'
    | 'timing-risk-intake';
  routeType:
    | 'apostille'
    | 'authentication'
    | 'notary-first'
    | 'foreign-issued'
    | 'intake-risk'
    | 'mixed';
  question: LocalizedText;
  shortAnswer: LocalizedText;
  detailedAnswer: LocalizedText;
  implementationNote: LocalizedText;
  appliesTo: string[];
  issuingCountry: string[];
  destinationCountry: string[];
  documentType: string[];
  requiresNotary: 'yes' | 'no' | 'conditional';
  requiresDfat: 'yes' | 'no' | 'conditional';
  requiresEmbassyCheck: 'yes' | 'no' | 'conditional';
  commonRisks: LocalizedText[];
  whatWeNeed: LocalizedText[];
  relatedPages: string[];
  keywords: string[];
  disclaimer: LocalizedText;
};

function t(en: string, zh?: string): LocalizedText {
  return { en, zh };
}

function texts(values: string[]) {
  return values.map((value) => t(value));
}

const standardDisclaimer = t(
  'EGS is an independent administrative intermediary only. EGS is not a law firm, not a public notary, and not a government authority. Route suitability and document acceptance remain subject to review and to the receiving authority’s own requirements.'
);

export const knowledgeFaqs: KnowledgeFaq[] = [
  {
    id: 'faq-apostille-vs-authentication',
    slug: 'apostille-vs-authentication',
    category: 'core-concepts',
    routeType: 'mixed',
    question: t('What is the difference between apostille and authentication?'),
    shortAnswer: t(
      'Both are legalisation outcomes. Apostille is commonly used where the receiving side recognises the Hague Apostille Convention, while authentication is more commonly used where the receiving side does not use that route.'
    ),
    detailedAnswer: t(
      'The practical distinction is route-based, not branding-based. An apostille and an authentication both confirm the authenticity of the signature, seal, or stamp being legalised. They do not certify the underlying facts in the document. The receiving authority, employer, institution, embassy, or government office usually decides which route they require, so the safest working position is to treat the route as subject to review rather than assumed from the country name alone.'
    ),
    implementationNote: t(
      'Use this when customers treat apostille and authentication as interchangeable labels. Always tie the answer back to the receiving authority and route review.'
    ),
    appliesTo: ['All legalisation enquiries', 'Australia-issued public documents', 'notary-first routes'],
    issuingCountry: ['Australia'],
    destinationCountry: ['All'],
    documentType: ['All document classes'],
    requiresNotary: 'conditional',
    requiresDfat: 'conditional',
    requiresEmbassyCheck: 'conditional',
    commonRisks: texts([
      'Assuming the country name alone is enough to determine the route.',
      'Treating apostille as proof that the document contents are true.',
      'Ignoring a receiving authority instruction that uses different route wording.',
    ]),
    whatWeNeed: texts([
      'Issuing country and destination country.',
      'Document type and whether it is a public document, private signed document, or copy-based file.',
      'Any wording from the receiving authority that mentions apostille, authentication, attestation, or legalisation.',
    ]),
    relatedPages: [
      '/guides/dfat-authentication-vs-apostille-australia',
      '/faq/who-issues-apostilles-in-australia',
      '/routes/australian-documents-for-use-in-china',
    ],
    keywords: [
      'apostille vs authentication',
      'difference between apostille and authentication',
      'what is apostille',
      'what is authentication',
    ],
    disclaimer: standardDisclaimer,
  },
  {
    id: 'faq-who-issues-apostilles-in-australia',
    slug: 'who-issues-apostilles-in-australia',
    category: 'core-concepts',
    routeType: 'apostille',
    question: t('Who issues apostilles or authentications in Australia?'),
    shortAnswer: t(
      'DFAT issues apostilles and authentications for eligible Australian public documents and eligible notarised documents.'
    ),
    detailedAnswer: t(
      'Within Australia, eligible apostille and authentication services are handled through DFAT. In practice, route suitability still depends on whether the document is an eligible Australian public document or a document that first required notarial handling. The safe explanation is therefore not simply “DFAT does everything”, but “DFAT legalises eligible documents after the correct upstream document setup has been confirmed”.'
    ),
    implementationNote: t(
      'This answer should separate DFAT’s role from the roles of the notary, the issuing institution, and EGS. EGS should never be described as the issuing or certifying authority.'
    ),
    appliesTo: ['Australian public documents', 'eligible notarised documents'],
    issuingCountry: ['Australia'],
    destinationCountry: ['All'],
    documentType: ['Public documents', 'notarised copies', 'notary-first private documents'],
    requiresNotary: 'conditional',
    requiresDfat: 'yes',
    requiresEmbassyCheck: 'conditional',
    commonRisks: texts([
      'Treating a private signed document as if it can go directly to DFAT.',
      'Assuming DFAT decides what the overseas receiver needs.',
      'Not checking whether the file first requires a notarial act.',
    ]),
    whatWeNeed: texts([
      'Document type and current document form.',
      'Whether the document is public, private, original, or copy-based.',
      'Receiving-side wording if available.',
    ]),
    relatedPages: [
      '/faq/apostille-vs-authentication',
      '/guides/how-to-get-an-apostille-in-australia',
      '/guides/dfat-authentication-of-university-degree-and-transcript',
    ],
    keywords: [
      'who issues apostilles in australia',
      'dfat apostille australia',
      'who issues authentication in australia',
      'dfat authentication australia',
    ],
    disclaimer: standardDisclaimer,
  },
  {
    id: 'faq-birth-certificates-legalised',
    slug: 'can-australian-birth-certificates-be-legalised',
    category: 'australian-documents',
    routeType: 'apostille',
    question: t('Can Australian birth certificates be legalised?'),
    shortAnswer: t(
      'Usually yes, if the document is an eligible Australian public document in an acceptable form.'
    ),
    detailedAnswer: t(
      'Birth certificates are one of the more common public-document routes, but the document version still matters. A formal registry-issued certificate is usually the relevant starting point. Decorative, altered, damaged, or unclear versions commonly create delay or rejection risk. The destination country and receiving authority still determine whether the route in hand is sufficient.'
    ),
    implementationNote: t(
      'This should link strongly into birth-certificate route pages and intake warnings about certificate version, translation, and receiving-authority instructions.'
    ),
    appliesTo: ['Australia-issued birth certificates', 'civil registry routes'],
    issuingCountry: ['Australia'],
    destinationCountry: ['China', 'Singapore', 'Overseas use'],
    documentType: ['Birth Certificate'],
    requiresNotary: 'conditional',
    requiresDfat: 'conditional',
    requiresEmbassyCheck: 'conditional',
    commonRisks: texts([
      'Wrong certificate version.',
      'Using a laminated or altered original.',
      'Starting translation before the final accepted version is confirmed.',
    ]),
    whatWeNeed: texts([
      'Clear scan of the full certificate.',
      'Destination country and receiving authority if known.',
      'Any name-change or identity document if details no longer match.',
    ]),
    relatedPages: [
      '/guides/australian-birth-certificate-for-use-in-china',
      '/routes/australian-birth-certificate-for-use-in-china',
      '/faq/common-rejection-risks',
    ],
    keywords: [
      'can australian birth certificates be legalised',
      'birth certificate apostille australia',
      'birth certificate legalisation australia',
      'dfat birth certificate apostille',
    ],
    disclaimer: standardDisclaimer,
  },
  {
    id: 'faq-marriage-certificates-legalised',
    slug: 'can-marriage-certificates-be-legalised',
    category: 'australian-documents',
    routeType: 'apostille',
    question: t('Can marriage certificates be legalised?'),
    shortAnswer: t(
      'Often yes, but ceremonial or commemorative versions are commonly not the same as the registrable certificate usually needed for legalisation.'
    ),
    detailedAnswer: t(
      'Marriage-certificate routes usually work best when the certificate is the actual registry-issued version rather than a ceremonial certificate. The practical review also often includes name consistency, translation expectations, and whether the receiving authority wants original presentation or accepts another route. The route should therefore be confirmed against the actual use, not just the document name.'
    ),
    implementationNote: t(
      'Use this to prevent customers from assuming every marriage certificate is interchangeable. Link to family-use route pages and risk warnings.'
    ),
    appliesTo: ['Australia-issued marriage certificates'],
    issuingCountry: ['Australia'],
    destinationCountry: ['China', 'Overseas use'],
    documentType: ['Marriage Certificate'],
    requiresNotary: 'conditional',
    requiresDfat: 'conditional',
    requiresEmbassyCheck: 'conditional',
    commonRisks: texts([
      'Using a ceremonial certificate instead of the registry-issued version.',
      'Name inconsistency across passport and civil-status records.',
      'Missing translation or supporting family documents.',
    ]),
    whatWeNeed: texts([
      'Full scan of the marriage certificate.',
      'Destination country and receiving authority.',
      'Any related ID or change-of-name evidence.',
    ]),
    relatedPages: [
      '/guides/australian-marriage-certificate-for-use-overseas',
      '/faq/common-rejection-risks',
      '/routes/australian-marriage-certificate-for-use-in-china',
    ],
    keywords: [
      'can marriage certificates be legalised',
      'marriage certificate apostille australia',
      'marriage certificate legalisation australia',
    ],
    disclaimer: standardDisclaimer,
  },
  {
    id: 'faq-afp-police-checks-legalised',
    slug: 'can-afp-police-checks-be-legalised',
    category: 'australian-documents',
    routeType: 'apostille',
    question: t('Can AFP police checks be legalised?'),
    shortAnswer: t(
      'Yes, AFP police checks commonly form part of DFAT-linked legalisation pathways when the receiving side asks for them.'
    ),
    detailedAnswer: t(
      'AFP police checks are a common overseas-use document class, but timing and document version matter. Many receiving authorities care about issue recency as much as route formality. The safer approach is to check the destination use, validity window, and whether the police check needs to travel with identity or supporting records before the route is confirmed.'
    ),
    implementationNote: t(
      'Good candidate for route-check prompts and police-check landing pages. Surface validity risk and receiver-specific timing concerns.'
    ),
    appliesTo: ['Australia-issued AFP police checks'],
    issuingCountry: ['Australia'],
    destinationCountry: ['Overseas use', 'United States', 'United Kingdom'],
    documentType: ['Police Check'],
    requiresNotary: 'conditional',
    requiresDfat: 'conditional',
    requiresEmbassyCheck: 'conditional',
    commonRisks: texts([
      'Police check is too old for the receiving authority.',
      'Wrong police-document type.',
      'Identity details do not line up with passport records.',
    ]),
    whatWeNeed: texts([
      'The current police check in clear scan or PDF form.',
      'Destination country and use case.',
      'Any timing deadline or validity instruction from the receiver.',
    ]),
    relatedPages: [
      '/guides/australian-police-check-for-overseas-use',
      '/faq/common-rejection-risks',
      '/faq/what-information-intake-should-collect-first',
    ],
    keywords: [
      'can afp police checks be legalised',
      'afp police check apostille',
      'police check legalisation australia',
      'dfat police check apostille',
    ],
    disclaimer: standardDisclaimer,
  },
  {
    id: 'faq-company-documents-legalised',
    slug: 'can-australian-company-documents-be-legalised',
    category: 'australian-documents',
    routeType: 'mixed',
    question: t('Can Australian company documents be legalised?'),
    shortAnswer: t(
      'Often yes, especially where the documents are government-issued extracts or appropriately notarised company documents, depending on the exact document type.'
    ),
    detailedAnswer: t(
      'Company-document routes usually depend on document class first. ASIC or ATO-type records do not sit in the same lane as signed board resolutions, powers of attorney, constitutions, or other internal corporate papers. Some documents may move on a cleaner public-document route, while others commonly need notarial handling first. That is why the document pack should be reviewed before a single route is assumed.'
    ),
    implementationNote: t(
      'Important for company route pages and for warning users not to upload only one extract when the actual filing depends on a mixed pack.'
    ),
    appliesTo: ['Australian company documents', 'corporate filings', 'banking packs'],
    issuingCountry: ['Australia'],
    destinationCountry: ['Hong Kong', 'Singapore', 'United States', 'Overseas use'],
    documentType: ['Company Documents', 'ASIC Extracts', 'Company Resolutions'],
    requiresNotary: 'conditional',
    requiresDfat: 'conditional',
    requiresEmbassyCheck: 'conditional',
    commonRisks: texts([
      'Assuming all company documents follow the same route.',
      'Missing notarial step for private signed company papers.',
      'Using outdated registry extracts or incomplete corporate packs.',
    ]),
    whatWeNeed: texts([
      'The exact company document pack.',
      'Destination use and receiving authority or counterparty.',
      'Whether the documents are public registry records, signed private papers, or mixed.',
    ]),
    relatedPages: [
      '/guides/australian-company-documents-for-use-in-hong-kong',
      '/routes/australian-company-documents-for-use-in-hong-kong',
      '/faq/common-rejection-risks',
    ],
    keywords: [
      'can australian company documents be legalised',
      'company documents apostille australia',
      'asic documents legalisation',
      'corporate documents apostille australia',
    ],
    disclaimer: standardDisclaimer,
  },
  {
    id: 'faq-my-equals-documents-used',
    slug: 'can-my-equals-documents-be-used',
    category: 'education-my-equals',
    routeType: 'mixed',
    question: t('Can My eQuals documents be used?'),
    shortAnswer: t(
      'Potentially, depending on the institution, the verification path, and what the receiving authority will accept.'
    ),
    detailedAnswer: t(
      'My eQuals can be very useful where the institution has issued the record in a verifiable digital format, but it should not be treated as an automatic answer. The route still depends on the institution, the document type, the receiving authority, and whether the destination expects apostille, authentication, attestation, direct academic verification, or a wider document pack such as degree plus transcript.'
    ),
    implementationNote: t(
      'This should anchor a whole guide family. Keep wording careful and review-led. Never imply every My eQuals record is accepted everywhere.'
    ),
    appliesTo: ['Australian tertiary education documents', 'My eQuals routes'],
    issuingCountry: ['Australia'],
    destinationCountry: ['Singapore', 'UAE', 'Overseas use'],
    documentType: ['Degree Certificate', 'Academic Transcript', 'Graduation Statement'],
    requiresNotary: 'conditional',
    requiresDfat: 'conditional',
    requiresEmbassyCheck: 'conditional',
    commonRisks: texts([
      'Using a screenshot or informal download instead of an issuer-generated record.',
      'Assuming digital availability removes all destination-side review.',
      'Failing to check whether the receiver wants both degree and transcript.',
    ]),
    whatWeNeed: texts([
      'My eQuals share or issuer-generated academic file.',
      'Destination country and receiving institution or regulator.',
      'Any wording from the receiver about apostille, authentication, verification, or attestation.',
    ]),
    relatedPages: [
      '/guides/my-equals-degree-and-transcript-review-path',
      '/guides/dfat-authentication-of-university-degree-and-transcript',
      '/faq/can-foreign-education-documents-be-legalised-through-dfat-in-australia',
    ],
    keywords: [
      'can my equals documents be used',
      'my equals apostille',
      'my equals transcript overseas use',
      'my equals degree authentication',
    ],
    disclaimer: standardDisclaimer,
  },
  {
    id: 'faq-foreign-education-documents-dfat-australia',
    slug: 'can-foreign-education-documents-be-legalised-through-dfat-in-australia',
    category: 'education-my-equals',
    routeType: 'foreign-issued',
    question: t('Can foreign education documents be legalised through DFAT in Australia?'),
    shortAnswer: t(
      'DFAT does not accept foreign education documents for legalisation simply because they have been notarised in Australia.'
    ),
    detailedAnswer: t(
      'Foreign-issued education documents usually follow the issuing country’s own notarial, apostille, authentication, or legalisation system. Bringing the document to Australia does not usually convert it into an Australian public document. The practical route typically begins with the issuing country and then moves to the Australian receiving authority’s own acceptance rules.'
    ),
    implementationNote: t(
      'This is a high-risk misunderstanding and should appear prominently in FAQs, route-check warnings, and inbound-document guides.'
    ),
    appliesTo: ['Foreign-issued academic documents for use in Australia'],
    issuingCountry: ['Foreign-issued'],
    destinationCountry: ['Australia'],
    documentType: ['Degree Certificate', 'Academic Transcript', 'Academic Documents'],
    requiresNotary: 'conditional',
    requiresDfat: 'no',
    requiresEmbassyCheck: 'conditional',
    commonRisks: texts([
      'Assuming Australian notarisation alone makes a foreign document DFAT-eligible.',
      'Skipping the issuing country’s own formalities.',
      'Ignoring Australian receiver-specific translation or acceptance rules.',
    ]),
    whatWeNeed: texts([
      'The foreign-issued academic file.',
      'Issuing country and issuing institution.',
      'Australian receiving authority or use case.',
    ]),
    relatedPages: [
      '/guides/overseas-issued-documents-for-use-in-australia',
      '/guides/singapore-issued-academic-documents-for-use-in-australia',
      '/faq/can-overseas-issued-documents-be-used-in-australia',
    ],
    keywords: [
      'can foreign education documents be legalised through dfat in australia',
      'foreign degree australia dfat',
      'foreign transcript use in australia',
    ],
    disclaimer: standardDisclaimer,
  },
  {
    id: 'faq-jp-vs-notary-public',
    slug: 'does-a-jp-replace-a-notary-public',
    category: 'signed-documents',
    routeType: 'notary-first',
    question: t('Does a JP replace a Notary Public?'),
    shortAnswer: t(
      'Often no for overseas legalisation pathways. Many overseas or DFAT-linked routes specifically require an Australian Notary Public, not a JP-certified copy.'
    ),
    detailedAnswer: t(
      'A Justice of the Peace and a Notary Public do not play the same role in overseas document routes. Many private signed documents, notarised copies, and DFAT-linked private-document pathways rely on a notarial act. A JP-certified copy may be acceptable in some domestic contexts, but it commonly does not replace a notary where the overseas or receiving-side route requires notarial handling.'
    ),
    implementationNote: t(
      'This should be treated as a standard correction FAQ and as a route-check warning for copy-based and signed-document matters.'
    ),
    appliesTo: ['Signed documents', 'private documents', 'copy-based overseas-use files'],
    issuingCountry: ['Australia'],
    destinationCountry: ['All'],
    documentType: ['Powers of Attorney', 'Declarations', 'Signed private documents'],
    requiresNotary: 'yes',
    requiresDfat: 'conditional',
    requiresEmbassyCheck: 'conditional',
    commonRisks: texts([
      'Client uses a JP copy where a notarial act is required.',
      'Assuming any certified copy is equivalent.',
      'Losing time and money on the wrong upstream certification.',
    ]),
    whatWeNeed: texts([
      'Document type and whether it is private, signed, or copy-based.',
      'Receiving-side wording if available.',
      'Whether the client already used a JP or another certifier.',
    ]),
    relatedPages: [
      '/faq/apostille-vs-authentication',
      '/guides/overseas-issued-documents-for-use-in-australia',
      '/guides/how-to-get-an-apostille-in-australia',
    ],
    keywords: [
      'does a jp replace a notary public',
      'jp vs notary public australia',
      'notary public for overseas documents',
    ],
    disclaimer: standardDisclaimer,
  },
  {
    id: 'faq-overseas-documents-used-in-australia',
    slug: 'can-overseas-issued-documents-be-used-in-australia',
    category: 'overseas-to-australia',
    routeType: 'foreign-issued',
    question: t('Can overseas-issued documents be used in Australia?'),
    shortAnswer: t(
      'Sometimes, but it depends on the Australian receiving authority and the foreign document type.'
    ),
    detailedAnswer: t(
      'Australia does not usually apply one universal route to every foreign-issued document. Some Australian receivers care primarily about the issuing-country certification and any translation, while others focus on document clarity, source verification, or supporting records. The safest route framing is therefore source-country first, Australian receiver second.'
    ),
    implementationNote: t(
      'Use this across inbound guides and route-check copy. It is the cleanest boundary statement for overseas-to-Australia work.'
    ),
    appliesTo: ['Foreign-issued documents for Australian use'],
    issuingCountry: ['Singapore', 'United Kingdom', 'Foreign-issued'],
    destinationCountry: ['Australia'],
    documentType: ['Academic Documents', 'Company Documents', 'Civil Documents'],
    requiresNotary: 'conditional',
    requiresDfat: 'no',
    requiresEmbassyCheck: 'conditional',
    commonRisks: texts([
      'Assuming Australia can recreate the issuing-country certification chain.',
      'Missing source-country apostille or other upstream formalities.',
      'Ignoring Australian receiver-specific translation or format requirements.',
    ]),
    whatWeNeed: texts([
      'Foreign-issued file and any existing certification pages.',
      'Issuing country and Australian receiving use.',
      'Any translation already prepared or requested.',
    ]),
    relatedPages: [
      '/guides/overseas-issued-documents-for-use-in-australia',
      '/routes/overseas-issued-documents-for-use-in-australia',
      '/guides/uk-issued-company-documents-for-use-in-australia',
    ],
    keywords: [
      'can overseas issued documents be used in australia',
      'foreign documents for australia',
      'overseas documents australia acceptance',
    ],
    disclaimer: standardDisclaimer,
  },
  {
    id: 'faq-common-rejection-risks',
    slug: 'common-rejection-risks',
    category: 'timing-risk-intake',
    routeType: 'intake-risk',
    question: t('What are the most common rejection risks?'),
    shortAnswer: t(
      'Common risks include wrong document version, wrong route assumption, insufficient academic verification, using a JP where a notary is required, altered originals, missing translations, and relying on country-level assumptions instead of receiving-authority instructions.'
    ),
    detailedAnswer: t(
      'Most avoidable failures happen before formal lodgement. The route may be conceptually available, but the file in hand is wrong, incomplete, too old, insufficiently verified, or mismatched to the receiving authority’s actual instruction. Strong intake therefore starts by checking the source document, the destination use, the authority wording, and any issues around names, originals, translation, or notarisation.'
    ),
    implementationNote: t(
      'This FAQ should feed warning banners, intake checklists, route pages, and route-check helper prompts.'
    ),
    appliesTo: ['All routes'],
    issuingCountry: ['All'],
    destinationCountry: ['All'],
    documentType: ['All document classes'],
    requiresNotary: 'conditional',
    requiresDfat: 'conditional',
    requiresEmbassyCheck: 'conditional',
    commonRisks: texts([
      'Wrong document version.',
      'Wrong route assumption.',
      'Insufficient academic verification.',
      'Using a JP where a notary is required.',
      'Altered originals.',
      'Missing translations.',
      'Relying on country-level assumptions instead of receiving-authority instructions.',
    ]),
    whatWeNeed: texts([
      'Exact document version in hand.',
      'Destination country and receiving authority.',
      'Whether the file is original, copy-based, private, or foreign-issued.',
    ]),
    relatedPages: [
      '/faq/what-information-intake-should-collect-first',
      '/guides/how-to-get-an-apostille-in-australia',
      '/guides/overseas-issued-documents-for-use-in-australia',
    ],
    keywords: [
      'common rejection risks apostille',
      'document legalisation rejection risks',
      'dfat rejection risks',
    ],
    disclaimer: standardDisclaimer,
  },
  {
    id: 'faq-intake-should-collect-first',
    slug: 'what-information-intake-should-collect-first',
    category: 'timing-risk-intake',
    routeType: 'intake-risk',
    question: t('What information should intake collect first?'),
    shortAnswer: t(
      'At minimum: issuing country, destination country, document type, whether the file is original or copy-based, and any exact wording from the receiving authority.'
    ),
    detailedAnswer: t(
      'Those fields are the minimum route-check dataset because they separate Australian public-document routes, notary-first private-document routes, and foreign-issued routes. Intake becomes materially stronger when it also captures whether the client has originals, whether translation is likely, and whether the receiving authority has supplied route wording or a checklist.'
    ),
    implementationNote: t(
      'This should directly shape route-check forms, intake prefill, and conversion sections across FAQ, guides, and route pages.'
    ),
    appliesTo: ['All route checks', 'intake', 'sales qualification'],
    issuingCountry: ['All'],
    destinationCountry: ['All'],
    documentType: ['All'],
    requiresNotary: 'conditional',
    requiresDfat: 'conditional',
    requiresEmbassyCheck: 'conditional',
    commonRisks: texts([
      'Starting route advice without the receiving authority wording.',
      'Not knowing whether the client has the original or only a scan.',
      'Failing to distinguish foreign-issued from Australia-issued documents.',
    ]),
    whatWeNeed: texts([
      'Issuing country.',
      'Destination country.',
      'Document type.',
      'Original or copy-based status.',
      'Exact receiving-authority wording if available.',
    ]),
    relatedPages: [
      '/faq/common-rejection-risks',
      '/guides/how-to-get-an-apostille-in-australia',
      '/intake',
    ],
    keywords: [
      'what information intake should collect first',
      'apostille intake checklist',
      'route check information needed',
    ],
    disclaimer: standardDisclaimer,
  },
];

const faqMap = new Map(knowledgeFaqs.map((entry) => [entry.slug, entry]));

export function getFaqs() {
  return knowledgeFaqs;
}

export function getFaqBySlug(slug: string) {
  return faqMap.get(slug);
}

export function getFaqSlugs() {
  return knowledgeFaqs.map((entry) => entry.slug);
}

export function getFaqCopy(locale: Locale, value: LocalizedText) {
  return locale === 'zh' ? value.zh || value.en : value.en;
}

export function getFaqCategories() {
  return [
    { id: 'core-concepts', label: t('Core concepts and authority boundaries') },
    { id: 'australian-documents', label: t('Australian documents for overseas use') },
    { id: 'education-my-equals', label: t('Education, universities, and My eQuals') },
    { id: 'signed-documents', label: t('Signed documents, declarations, and identity') },
    { id: 'overseas-to-australia', label: t('Overseas-issued documents for use in Australia') },
    { id: 'timing-risk-intake', label: t('Timing, fees, risk, and intake logic') },
  ] as const;
}

export function getFaqsByCategory(category: KnowledgeFaq['category']) {
  return knowledgeFaqs.filter((entry) => entry.category === category);
}

export function getFaqIndexSections() {
  return {
    categories: getFaqCategories().map((category) => ({
      ...category,
      faqs: getFaqsByCategory(category.id),
    })),
    byDocumentType: ['Birth Certificate', 'Marriage Certificate', 'Police Check', 'Company Documents', 'Degree Certificate', 'Academic Transcript'].map((type) => ({
      label: type,
      faqs: knowledgeFaqs.filter((entry) => entry.documentType.includes(type) || entry.documentType.includes('All') || entry.documentType.includes('All document classes')),
    })),
    byIssuingCountry: ['Australia', 'Singapore', 'United Kingdom', 'Foreign-issued'].map((country) => ({
      label: country,
      faqs: knowledgeFaqs.filter((entry) => entry.issuingCountry.includes(country) || entry.issuingCountry.includes('All')),
    })),
    byDestinationCountry: ['China', 'Singapore', 'Hong Kong', 'Australia', 'Overseas use', 'All'].map((country) => ({
      label: country,
      faqs: knowledgeFaqs.filter((entry) => entry.destinationCountry.includes(country) || entry.destinationCountry.includes('All')),
    })),
    byRouteType: ['apostille', 'authentication', 'notary-first', 'foreign-issued', 'intake-risk', 'mixed'].map((type) => ({
      label: type,
      faqs: knowledgeFaqs.filter((entry) => entry.routeType === type),
    })),
  };
}

export function getRelatedFaqsForGuide(options: {
  issuingCountry?: string;
  destinationCountry?: string;
  documentTypes?: string[];
}, limit = 4) {
  const documentTypes = options.documentTypes || [];

  return knowledgeFaqs
    .map((faq) => {
      let score = 0;
      if (options.issuingCountry && (faq.issuingCountry.includes(options.issuingCountry) || faq.issuingCountry.includes('All'))) score += 2;
      if (options.destinationCountry && (faq.destinationCountry.includes(options.destinationCountry) || faq.destinationCountry.includes('All'))) score += 2;
      if (documentTypes.some((doc) => faq.documentType.includes(doc) || faq.documentType.includes('All') || faq.documentType.includes('All document classes'))) score += 3;
      return { faq, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.faq.question.en.localeCompare(b.faq.question.en))
    .slice(0, limit)
    .map((entry) => entry.faq);
}

export function getRouteSignals(input: {
  issuingCountry?: string;
  destinationCountry?: string;
  documentType?: string;
}) {
  const normalizedIssuing = input.issuingCountry?.toLowerCase() || '';
  const normalizedDestination = input.destinationCountry?.toLowerCase() || '';
  const normalizedDocument = input.documentType?.toLowerCase() || '';

  const matches = knowledgeFaqs.filter((faq) => {
    const issuingMatch =
      !normalizedIssuing ||
      faq.issuingCountry.some((value) => value.toLowerCase().includes(normalizedIssuing) || normalizedIssuing.includes(value.toLowerCase()));
    const destinationMatch =
      !normalizedDestination ||
      faq.destinationCountry.some((value) => value.toLowerCase().includes(normalizedDestination) || normalizedDestination.includes(value.toLowerCase()));
    const documentMatch =
      !normalizedDocument ||
      faq.documentType.some((value) => value.toLowerCase().includes(normalizedDocument) || normalizedDocument.includes(value.toLowerCase()));

    return issuingMatch || destinationMatch || documentMatch;
  });

  const top = matches.slice(0, 3);
  return {
    risks: top.flatMap((faq) => faq.commonRisks.map((entry) => entry.en)).slice(0, 4),
    intake: top.flatMap((faq) => faq.whatWeNeed.map((entry) => entry.en)).slice(0, 4),
    faqs: top,
  };
}
