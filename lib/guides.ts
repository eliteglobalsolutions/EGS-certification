type Locale = 'en' | 'zh';

export type LocalizedText = {
  en: string;
  zh?: string;
};

export type GuideFaq = {
  question: LocalizedText;
  answer: LocalizedText;
};

export type GuideSection = {
  heading: LocalizedText;
  paragraphs: LocalizedText[];
  bullets?: LocalizedText[];
};

export type GuideType =
  | 'university-my-equals'
  | 'document-route'
  | 'overseas-to-australia'
  | 'route-explainer';

export type Guide = {
  slug: string;
  locale: 'en';
  publishedAt: string;
  featured: boolean;
  guideType: GuideType;
  routeCategory: 'academic' | 'civil' | 'company' | 'police' | 'cross-border';
  routeLabel: LocalizedText;
  title: LocalizedText;
  seoTitle: LocalizedText;
  metaDescription: LocalizedText;
  h1: LocalizedText;
  excerpt: LocalizedText;
  intro: LocalizedText[];
  heroKicker: LocalizedText;
  issuingCountry: string;
  destinationCountry: string;
  institution?: string;
  institutionShort?: string;
  documentTypes: string[];
  primaryKeyword: string;
  relatedKeywords: string[];
  keywords: string[];
  summaryPoints: LocalizedText[];
  whoThisGuideIsFor: LocalizedText[];
  commonDocumentTypesCovered: LocalizedText[];
  documentRecordNotes: LocalizedText[];
  routeOverview: GuideSection;
  requirements: LocalizedText[];
  digitalDocumentNotes?: LocalizedText[];
  originalDocumentNotes?: LocalizedText[];
  commonRisks: LocalizedText[];
  timelineNotes: LocalizedText[];
  feeNotes: LocalizedText[];
  extraStepNotes: LocalizedText[];
  reportSections: GuideSection[];
  faq: GuideFaq[];
  disclaimer: LocalizedText;
  relatedGuideSlugs: string[];
  relatedSampleKeys: string[];
  officialLinks?: Array<{
    label: LocalizedText;
    url: string;
  }>;
  ctaVariant: 'academic' | 'civil' | 'company' | 'cross-border';
  conversion: {
    typicalNextStep: LocalizedText;
    prepareBeforeIntake: LocalizedText[];
    routeUncertaintyNote: LocalizedText;
  };
  heroImage?: string;
  heroImageWatermarked?: boolean;
  heroPdf?: {
    src: string;
    pages: number;
    previewSrc?: string;
    previewImages?: string[];
    watermarked?: boolean;
  };
  prefill?: {
    issuingSlug?: string;
    destinationSlug?: string;
    documentSlug?: string;
  };
};

type UniversitySeed = {
  slug: string;
  publishedAt: string;
  featured: boolean;
  institution: string;
  institutionShort: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  excerpt: string;
  primaryKeyword: string;
  relatedKeywords: string[];
  summaryPoints: string[];
  requirements: string[];
  extraStepNotes: string[];
  relatedGuideSlugs: string[];
  heroImage?: string;
  heroImageWatermarked?: boolean;
  heroPdf?: Guide['heroPdf'];
};

type DocumentRouteSeed = {
  slug: string;
  publishedAt: string;
  featured: boolean;
  title: string;
  seoTitle: string;
  metaDescription: string;
  excerpt: string;
  intro?: string[];
  issuingCountry: string;
  destinationCountry: string;
  documentTypes: string[];
  primaryKeyword: string;
  relatedKeywords: string[];
  summaryPoints: string[];
  whoThisGuideIsFor: string[];
  commonDocumentTypesCovered: string[];
  routeOverview: GuideSection;
  requirements: string[];
  digitalDocumentNotes?: string[];
  originalDocumentNotes?: string[];
  timelineNotes: string[];
  feeNotes: string[];
  extraStepNotes: string[];
  reportSections: GuideSection[];
  faq: Array<{ question: string; answer: string }>;
  relatedGuideSlugs: string[];
  relatedSampleKeys: string[];
  officialLinks?: Array<{
    label: LocalizedText;
    url: string;
  }>;
  routeCategory: 'civil' | 'company' | 'police';
  heroKicker: string;
  heroImage?: string;
  heroImageWatermarked?: boolean;
  heroPdf?: {
    src: string;
    pages: number;
    previewSrc?: string;
    previewImages?: string[];
    watermarked?: boolean;
  };
  prefill?: {
    issuingSlug?: string;
    destinationSlug?: string;
    documentSlug?: string;
  };
};

type InboundSeed = {
  slug: string;
  publishedAt: string;
  featured: boolean;
  title: string;
  seoTitle: string;
  metaDescription: string;
  excerpt: string;
  issuingCountry: string;
  destinationCountry: 'Australia';
  documentTypes: string[];
  primaryKeyword: string;
  relatedKeywords: string[];
  summaryPoints: string[];
  whoThisGuideIsFor: string[];
  commonDocumentTypesCovered: string[];
  routeOverview: GuideSection;
  requirements: string[];
  timelineNotes: string[];
  feeNotes: string[];
  extraStepNotes: string[];
  reportSections: GuideSection[];
  faq: Array<{ question: string; answer: string }>;
  relatedGuideSlugs: string[];
  relatedSampleKeys: string[];
  heroKicker: string;
  prefill?: {
    issuingSlug?: string;
    destinationSlug?: string;
    documentSlug?: string;
  };
};

function t(en: string, zh?: string): LocalizedText {
  return { en, zh };
}

function mapTexts(values: string[]): LocalizedText[] {
  return values.map((value) => t(value));
}

function keywordList(primary: string, related: string[]) {
  return [primary, ...related];
}

function academicDocumentRecordNotes(subject: string) {
  return mapTexts([
    `${subject} files are usually assessed as issuer-origin academic records. The practical question is whether the file in hand is the institution-issued degree, transcript, graduation statement, or another formally issued academic record rather than an informal student copy.`,
    'In academic matters, the document is usually being reviewed for provenance, completeness, and destination fit. The route rarely turns on the academic content itself.',
    'Where the receiver is likely to review the degree and transcript together, the document set should usually be prepared as a pack rather than as isolated uploads.',
  ]);
}

function academicCommonRisks(subject: string) {
  return mapTexts([
    `Using an incomplete or informal ${subject} file such as a screenshot, preview, or cropped download.`,
    'Sending only the degree or only the transcript when the receiving authority is likely to want the full academic pack.',
    'Assuming destination acceptance without checking whether translation, direct source verification, or a different route label applies.',
  ]);
}

function civilDocumentRecordNotes(documentLabel: string, destinationCountry: string) {
  return mapTexts([
    `${documentLabel} routes usually start with the document class itself. The useful first question is whether the file is the formal, issue-ready version usually accepted for overseas use rather than a ceremonial, outdated, damaged, or informal copy.`,
    `For ${destinationCountry} use or broader overseas use, the document is commonly being reviewed as a public record first and a destination-use file second. That is why issue format and record provenance matter more than generic route wording.`,
    'Where names, dates, translations, or supporting identity records are involved, the document often needs to be reviewed as part of a wider filing pack rather than as a standalone page.',
  ]);
}

function companyDocumentRecordNotes(destinationCountry: string) {
  return mapTexts([
    `Company-document routes for ${destinationCountry} usually depend on document class first. Public registry records, signed internal corporate papers, resolutions, and authority documents are not normally treated as the same thing.`,
    'The commercial file is often reviewed as a pack because the receiving side may need company existence, authority, signatory structure, and supporting records together.',
    'What matters in practice is not only whether the company document exists, but whether the exact version is recent enough, complete enough, and properly routed for the destination use.',
  ]);
}

function inboundDocumentRecordNotes(issuingCountry: string) {
  return mapTexts([
    `${issuingCountry}-issued documents for use in Australia are usually reviewed as foreign-origin records first. The practical issue is commonly what upstream handling belongs to the issuing country before the file reaches the Australian receiver.`,
    'A foreign-issued file does not usually become an Australian public document just because it is brought into Australia. Translation, certification, and receiver acceptance need to be assessed separately.',
    'The most reliable route review often starts with the issuing authority, the current document chain, and the Australian receiving purpose together.',
  ]);
}

function civilCommonRisks(documentLabel: string) {
  return mapTexts([
    `Using the wrong ${documentLabel.toLowerCase()} version or assuming an older copy is automatically good enough for overseas use.`,
    'Starting translation or lodging based on a destination assumption before the receiving authority or use case is clear.',
    'Missing supporting identity, name-alignment, or destination-side requirement details that change the route after review.',
  ]);
}

function companyCommonRisks() {
  return mapTexts([
    'Treating all company documents as if they follow the same public-document route.',
    'Uploading only one extract or certificate when the actual commercial filing depends on a broader corporate pack.',
    'Missing a notarial or signatory review step for private corporate documents before moving into legalisation.',
  ]);
}

function inboundCommonRisks(issuingCountry: string) {
  return mapTexts([
    `Assuming a ${issuingCountry}-issued document can be put through an Australian route without checking the issuing-country formalities first.`,
    'Ignoring translation, supporting records, or Australian receiver-specific acceptance rules.',
    'Relying on a country-level assumption instead of the exact source document, issuing authority, and Australian destination use.',
  ]);
}

function universityGuide(seed: UniversitySeed): Guide {
  const documentTypes = ['Testamur', 'Degree Certificate', 'Academic Transcript', 'Graduation Statement'];

  return {
    slug: seed.slug,
    locale: 'en',
    publishedAt: seed.publishedAt,
    featured: seed.featured,
    guideType: 'university-my-equals',
    routeCategory: 'academic',
    routeLabel: t('University / My eQuals guide'),
    title: t(seed.title),
    seoTitle: t(seed.seoTitle),
    metaDescription: t(seed.metaDescription),
    h1: t(seed.title),
    excerpt: t(seed.excerpt),
    intro: mapTexts([
      `${seed.institution} searches are usually made by users who already have a real academic file and want a route answer, not generic legalisation theory. The working question is whether the available My eQuals record, share link, or institution-issued PDF can move into a DFAT-facing route that the overseas receiver is likely to accept.`,
      `For EGS, the review point is not the school name alone. The route still depends on the exact document version, the destination country, the receiving authority, and whether the receiver is asking for apostille, authentication, legalisation, attestation, or a direct institutional verification path. That is why the route is confirmed after review rather than assumed from the query alone.`,
    ]),
    heroKicker: t('University route guide'),
    issuingCountry: 'Australia',
    destinationCountry: 'Overseas use',
    institution: seed.institution,
    institutionShort: seed.institutionShort,
    documentTypes,
    primaryKeyword: seed.primaryKeyword,
    relatedKeywords: seed.relatedKeywords,
    keywords: keywordList(seed.primaryKeyword, seed.relatedKeywords),
    summaryPoints: mapTexts(seed.summaryPoints),
    whoThisGuideIsFor: mapTexts([
      `Graduates or students holding ${seed.institution} academic records who need a practical route assessment for overseas study, licensing, employment, migration, or file completion.`,
      'Users who can access My eQuals but are unsure whether the digital issue format is enough for the receiving authority.',
      'Clients comparing apostille, authentication, legalisation, and attestation wording and needing the route checked against the actual destination use.',
    ]),
    commonDocumentTypesCovered: mapTexts([
      `${seed.institution} My eQuals testamur or degree record`,
      `${seed.institution} My eQuals academic transcript`,
      `${seed.institution} graduation statement or completion statement where issued`,
      'Issuer-provided PDF or hard copy supplied outside My eQuals where the digital route is incomplete',
    ]),
    documentRecordNotes: academicDocumentRecordNotes(seed.institution),
    routeOverview: {
      heading: t('Typical route overview'),
      paragraphs: mapTexts([
        `For Australia-issued academic records, the usual assessment starts with whether the document is an eligible institution-issued academic file and whether the receiving side needs DFAT legalisation of that file or some different upstream step. In practice, the route often turns on document provenance rather than the academic content itself.`,
        `If the document is available through My eQuals or another verifiable issuer pathway, review is usually faster because the institution source is clearer. If the student only has a screenshot, downloaded preview, or informal copy, extra document preparation may be required before any DFAT-facing step is considered.`,
      ]),
      bullets: mapTexts([
        'Route naming should be matched to the destination, not to the university query alone.',
        'A clear digital issue path usually reduces review friction, but it does not replace destination-side acceptance checks.',
        'Private translations, loose scans, and unofficial student portal captures do not usually answer the core admissibility question.',
      ]),
    },
    requirements: mapTexts(seed.requirements),
    digitalDocumentNotes: mapTexts([
      'My eQuals is relevant only when the institution has issued the specific academic file through an official, shareable, verifiable format. A screenshot of the student dashboard is not the same thing as the issuer-generated record.',
      'Where a share link, issuer PDF, or verifiable record exists, EGS typically reviews that version first because it gives a clearer view of source, completeness, and likely downstream handling options.',
      'If the receiver insists on hard-copy presentation or an institution-sealed version, the digital path may still need to be supplemented.',
    ]),
    originalDocumentNotes: mapTexts([
      'If the academic file is not available in a usable digital format, the next practical question is whether the institution can issue a fresh hard copy or another verifiable version.',
      'Original hard-copy academic documents may still require separate review because some receiving authorities care about issue format, certification path, or translation sequence, not just whether the paper is genuine.',
    ]),
    commonRisks: academicCommonRisks(seed.institution),
    timelineNotes: mapTexts([
      'Timing is usually driven first by document readiness and only then by the downstream legalisation stage. If the file needs to be re-issued, re-shared, or reformatted, that setup period often matters more than the headline processing window.',
      'Any timeframe discussed before review should be treated as indicative only. Final timing depends on the issuing format, the destination route, courier steps where relevant, and whether a consular stage is also required.',
    ]),
    feeNotes: mapTexts([
      'Fees depend on the actual route confirmed after review, not the university keyword alone. Some files move on a relatively direct documentation path, while others involve additional preparation or downstream certification stages.',
      'EGS quotes as an independent administrative intermediary. Fees do not imply that EGS is the certifying authority, a notary, or a government office.',
    ]),
    extraStepNotes: mapTexts(seed.extraStepNotes),
    reportSections: [
      {
        heading: t('What this route is actually checking'),
        paragraphs: mapTexts([
          'For academic records, the receiving authority is usually not interested in the academic subject matter. The practical issue is whether the file presented is an official institution-issued record and whether the downstream authority recognises the legalisation or verification path attached to it.',
          'That distinction matters because a genuine degree can still be unusable if the file version is wrong. A commemorative certificate, student portal image, or cropped PDF can create the appearance of having the document while still failing the route test.',
        ]),
      },
      {
        heading: t('What My eQuals changes in practice'),
        paragraphs: mapTexts([
          'My eQuals often improves the review process because it gives a cleaner chain back to the issuing institution. It can reduce the need to re-request paper documents in cases where the receiver accepts a digital-origin academic record that is then handled through the appropriate route.',
          'It does not remove all uncertainty. Some universities, employers, regulators, or migration bodies still ask for a particular issue format, a translation step, direct source verification, or a route other than the one the client originally assumed.',
        ]),
        bullets: mapTexts([
          'Check whether the exact file was issuer-generated or only downloaded from a student interface.',
          'Check whether the receiving authority asks for apostille wording, broader legalisation wording, or direct academic verification.',
          'Check whether the receiver needs both the degree and the transcript, not one alone.',
        ]),
      },
      {
        heading: t('Common scenario differences'),
        paragraphs: mapTexts([
          'Study, licensing, employment, and migration cases often look similar at first but differ at the acceptance stage. A university admissions office may accept a route that a professional regulator or a consular post will not.',
          'The same academic document may therefore follow different downstream handling depending on the destination country and the institution reviewing it. EGS treats the route as a document-plus-destination review problem, not a title-only problem.',
        ]),
      },
    ],
    faq: [
      {
        question: t(`Does ${seed.institution} being on My eQuals automatically mean apostille is available?`),
        answer: t('No. A usable My eQuals file can improve document readiness, but the final route still depends on the destination, the receiving authority, and the issue format actually presented for review.'),
      },
      {
        question: t('Can I use only a screenshot or downloaded preview from my student account?'),
        answer: t('Usually that is not the best place to start. Review is normally stronger when based on an issuer-generated file, share link, hard copy, or another version that shows a clear institutional source.'),
      },
      {
        question: t('Does EGS decide whether the document is legally accepted overseas?'),
        answer: t('No. EGS is an independent administrative intermediary. Acceptance is always determined by the receiving authority and the route confirmed after review.'),
      },
    ],
    disclaimer: t(
      'EGS is an independent administrative intermediary only. EGS is not a law firm, not a public notary, not a government authority, and does not provide legal advice. Route outcomes depend on the issuing country, destination country, authority rules, receiving-side requirements, and the document setup reviewed.'
    ),
    relatedGuideSlugs: seed.relatedGuideSlugs,
    relatedSampleKeys: ['australia-academic-document'],
    ctaVariant: 'academic',
    conversion: {
      typicalNextStep: t(
        'Prepare the issuer-generated academic file, note the destination country and receiving institution, then move into route check so the handling path can be confirmed against the actual record rather than the search term.'
      ),
      prepareBeforeIntake: mapTexts([
        'The My eQuals share, issuer PDF, or clear scan of the academic file',
        'Destination country and, if known, the receiving university, employer, regulator, or migration body',
        'Whether the receiver asked for apostille, authentication, attestation, legalisation, translation, or direct university verification',
        'Whether both the degree and the transcript are needed',
      ]),
      routeUncertaintyNote: t(
        'Academic routes are not determined by institution name alone. The route is typically confirmed after review of document format, destination, receiver wording, and any extra step such as translation or consular handling.'
      ),
    },
    prefill: {
      issuingSlug: 'australia',
      documentSlug: 'academic-transcript',
    },
    heroImage: seed.heroImage,
    heroImageWatermarked: seed.heroImageWatermarked,
    heroPdf: seed.heroPdf,
  };
}

function documentRouteGuide(seed: DocumentRouteSeed): Guide {
  return {
    slug: seed.slug,
    locale: 'en',
    publishedAt: seed.publishedAt,
    featured: seed.featured,
    guideType: 'document-route',
    routeCategory: seed.routeCategory,
    routeLabel: t('Document route guide'),
    title: t(seed.title),
    seoTitle: t(seed.seoTitle),
    metaDescription: t(seed.metaDescription),
    h1: t(seed.title),
    excerpt: t(seed.excerpt),
    intro: mapTexts(
      seed.intro ?? [
        `This guide is written for people who already have the document, or are about to obtain it, and need a practical answer rather than a generic description of international legalisation. The useful starting point is usually not the search term itself, but the actual file in hand, the country where it will be used, and the authority that will receive it.`,
        `In practice, ${seed.title.toLowerCase()} matters are rarely solved by one label alone. Some files move relatively cleanly once the correct document version is identified. Others change route because of translation, document condition, notarial handling, destination wording, or the need to review a wider pack. That is why this guide treats the route as something confirmed after review, not assumed in advance.`,
      ]
    ),
    heroKicker: t(seed.heroKicker),
    issuingCountry: seed.issuingCountry,
    destinationCountry: seed.destinationCountry,
    documentTypes: seed.documentTypes,
    primaryKeyword: seed.primaryKeyword,
    relatedKeywords: seed.relatedKeywords,
    keywords: keywordList(seed.primaryKeyword, seed.relatedKeywords),
    summaryPoints: mapTexts(seed.summaryPoints),
    whoThisGuideIsFor: mapTexts(seed.whoThisGuideIsFor),
    commonDocumentTypesCovered: mapTexts(seed.commonDocumentTypesCovered),
    documentRecordNotes:
      seed.routeCategory === 'company'
        ? companyDocumentRecordNotes(seed.destinationCountry)
        : civilDocumentRecordNotes(seed.documentTypes[0] || 'document', seed.destinationCountry),
    routeOverview: seed.routeOverview,
    requirements: mapTexts(seed.requirements),
    digitalDocumentNotes: seed.digitalDocumentNotes ? mapTexts(seed.digitalDocumentNotes) : undefined,
    originalDocumentNotes: seed.originalDocumentNotes ? mapTexts(seed.originalDocumentNotes) : undefined,
    commonRisks:
      seed.routeCategory === 'company'
        ? companyCommonRisks()
        : civilCommonRisks(seed.documentTypes[0] || 'document'),
    timelineNotes: mapTexts(seed.timelineNotes),
    feeNotes: mapTexts(seed.feeNotes),
    extraStepNotes: mapTexts(seed.extraStepNotes),
    reportSections: seed.reportSections,
    faq: seed.faq.map((item) => ({
      question: t(item.question),
      answer: t(item.answer),
    })),
    disclaimer: t(
      'EGS is an independent administrative intermediary only. EGS is not a law firm, not a public notary, not a government authority, and does not provide legal advice. Route outcomes depend on the issuing country, destination country, authority rules, and the exact document setup reviewed.'
    ),
    relatedGuideSlugs: seed.relatedGuideSlugs,
    relatedSampleKeys: seed.relatedSampleKeys,
    officialLinks: seed.officialLinks,
    ctaVariant: seed.routeCategory === 'company' ? 'company' : seed.routeCategory === 'police' ? 'civil' : 'civil',
    conversion: {
      typicalNextStep: t(
        'Before paying for a route, prepare the exact document version you have, identify the receiving country and authority, and move into route check so the file can be assessed against the actual destination requirement.'
      ),
      prepareBeforeIntake: mapTexts([
        'Clear scan of the document front and back, or the digital file if the issuer supplied one',
        `Destination country and the authority, employer, university, registry, or other body that will receive it in ${seed.destinationCountry}`,
        'Any instruction that mentions apostille, authentication, legalisation, attestation, translation, embassy, or notarisation',
        'Any supporting identity or company record that affects names, dates, or corporate details on the file',
      ]),
      routeUncertaintyNote: t(
        'A route cannot be confirmed safely from the document name alone. Final handling is typically confirmed after review of the document version, destination, receiver instructions, and any extra requirement such as translation, notarisation, or consular follow-up.'
      ),
    },
    heroImage: seed.heroImage,
    heroImageWatermarked: seed.heroImageWatermarked,
    heroPdf: seed.heroPdf,
    prefill: seed.prefill,
  };
}

function inboundGuide(seed: InboundSeed): Guide {
  return {
    slug: seed.slug,
    locale: 'en',
    publishedAt: seed.publishedAt,
    featured: seed.featured,
    guideType: 'overseas-to-australia',
    routeCategory: 'cross-border',
    routeLabel: t('Overseas to Australia guide'),
    title: t(seed.title),
    seoTitle: t(seed.seoTitle),
    metaDescription: t(seed.metaDescription),
    h1: t(seed.title),
    excerpt: t(seed.excerpt),
    intro: mapTexts([
      `${seed.title} is usually searched by users who are working backwards from an Australian filing requirement. The central issue is often misunderstood: Australia does not usually convert a foreign document into a domestic Australian public document. The upstream legalisation step, if required, is commonly completed in the issuing country before the file is used in Australia.`,
      'That means practical review starts with the source country, issuing body, and Australian receiver. The useful answer is usually a route map: what must be done before the document leaves the issuing country, whether an apostille or another certification path is relevant there, and what additional translation or supporting evidence may still be needed once the file reaches Australia.',
    ]),
    heroKicker: t(seed.heroKicker),
    issuingCountry: seed.issuingCountry,
    destinationCountry: 'Australia',
    documentTypes: seed.documentTypes,
    primaryKeyword: seed.primaryKeyword,
    relatedKeywords: seed.relatedKeywords,
    keywords: keywordList(seed.primaryKeyword, seed.relatedKeywords),
    summaryPoints: mapTexts(seed.summaryPoints),
    whoThisGuideIsFor: mapTexts(seed.whoThisGuideIsFor),
    commonDocumentTypesCovered: mapTexts(seed.commonDocumentTypesCovered),
    documentRecordNotes: inboundDocumentRecordNotes(seed.issuingCountry),
    routeOverview: seed.routeOverview,
    requirements: mapTexts(seed.requirements),
    commonRisks: inboundCommonRisks(seed.issuingCountry),
    timelineNotes: mapTexts(seed.timelineNotes),
    feeNotes: mapTexts(seed.feeNotes),
    extraStepNotes: mapTexts(seed.extraStepNotes),
    reportSections: seed.reportSections,
    faq: seed.faq.map((item) => ({
      question: t(item.question),
      answer: t(item.answer),
    })),
    disclaimer: t(
      'EGS is an independent administrative intermediary only. EGS is not a law firm, not a public notary, not a government authority, and does not provide legal advice. Acceptance in Australia depends on the issuing country, the Australian receiving authority, translation requirements, and the final document setup reviewed.'
    ),
    relatedGuideSlugs: seed.relatedGuideSlugs,
    relatedSampleKeys: seed.relatedSampleKeys,
    officialLinks: undefined,
    ctaVariant: 'cross-border',
    conversion: {
      typicalNextStep: t(
        'Collect the foreign-issued file, identify the Australian receiving body, and confirm whether the upstream step must be completed in the issuing country before the document is sent or used in Australia.'
      ),
      prepareBeforeIntake: mapTexts([
        'Clear scan or PDF of the foreign-issued document',
        'Issuing country and, if known, the exact authority or institution that issued it',
        'Australian destination use such as migration, licensing, court, school, employment, or corporate filing',
        'Whether the Australian receiver has asked for translation, certified translation, apostille, notarisation, embassy certification, or direct source verification',
      ]),
      routeUncertaintyNote: t(
        'Foreign-document use in Australia is route-sensitive. The correct path is typically confirmed after review because some files need upstream handling in the issuing country, while others turn mainly on translation, identity matching, or receiver-specific acceptance rules in Australia.'
      ),
    },
    prefill: seed.prefill,
  };
}

const guides: Guide[] = [
  universityGuide({
    slug: 'dfat-authentication-australian-catholic-university-my-equals-degree-transcript',
    publishedAt: '2026-03-10',
    featured: true,
    institution: 'Australian Catholic University',
    institutionShort: 'ACU',
    title: 'DFAT Authentication of Australian Catholic University My eQuals Degree and Transcript',
    seoTitle: 'DFAT Authentication of Australian Catholic University My eQuals Degree and Transcript | EGS Guides',
    metaDescription:
      'Detailed guide to Australian Catholic University My eQuals degree and transcript review for DFAT authentication, overseas use, and intake preparation.',
    excerpt:
      'A route-focused guide to Australian Catholic University academic records, including My eQuals review, destination fit, common risks, and intake readiness.',
    primaryKeyword: 'dfat authentication australian catholic university my equals degree transcript',
    relatedKeywords: [
      'acu apostille degree',
      'acu my equals transcript overseas use',
      'australian catholic university degree authentication',
      'acu transcript legalisation',
    ],
    summaryPoints: [
      'ACU My eQuals files can be useful starting records, but route suitability still depends on destination use and receiving-authority instructions.',
      'The practical review usually turns on whether the degree and transcript should travel together.',
      'My eQuals availability does not remove the need to check issue format, translation, or destination-specific route wording.',
    ],
    requirements: [
      'The current ACU My eQuals share or issuer-generated academic file',
      'Destination country and the institution, employer, regulator, or authority receiving the academic records',
      'Any wording from the receiver about apostille, authentication, attestation, legalisation, or direct verification',
      'Whether the client needs both the degree and transcript or a wider academic pack',
    ],
    extraStepNotes: [
      'If the student only has an incomplete download or screen capture, a stronger institution-issued file may still be needed.',
      'Some professional or migration uses expect more than a degree alone and may require transcript or completion support.',
      'If names differ across passport and academic files, supporting records may need to be reviewed early.',
    ],
    relatedGuideSlugs: [
      'dfat-authentication-of-university-degree-and-transcript',
      'my-equals-degree-and-transcript-review-path',
      'australian-degree-certificate-for-use-in-singapore',
    ],
  }),
  universityGuide({
    slug: 'dfat-authentication-university-of-melbourne-my-equals-degree-transcript',
    publishedAt: '2026-03-10',
    featured: true,
    institution: 'University of Melbourne',
    institutionShort: 'UniMelb',
    title: 'DFAT Authentication of University of Melbourne My eQuals Degree and Transcript',
    seoTitle: 'DFAT Authentication of University of Melbourne My eQuals Degree and Transcript | EGS Guides',
    metaDescription:
      'Detailed guide to University of Melbourne My eQuals degree and transcript review for DFAT authentication, overseas use, and intake preparation.',
    excerpt:
      'A practical guide to University of Melbourne academic document routes, focused on My eQuals format, destination review, and what to prepare before intake.',
    primaryKeyword: 'dfat authentication university of melbourne my equals degree transcript',
    relatedKeywords: [
      'university of melbourne apostille degree',
      'university of melbourne transcript overseas use',
      'my equals melbourne degree authentication',
      'university of melbourne degree legalisation',
    ],
    summaryPoints: [
      'University of Melbourne records should be reviewed as destination-fit academic files, not only as well-known university documents.',
      'Receivers often want the transcript and degree together rather than one file alone.',
      'Digital issue format can help, but it does not settle downstream acceptance by itself.',
    ],
    requirements: [
      'University of Melbourne issuer-generated degree or transcript file',
      'Destination country and intended use such as licensing, employment, admission, or migration',
      'Any receiver checklist or route wording if already available',
      'Whether the file is available through My eQuals or a different institution-issued format',
    ],
    extraStepNotes: [
      'Some destinations still ask for hard-copy presentation or more formal source verification.',
      'If the academic pack is incomplete, route review may stay provisional until the missing file is supplied.',
      'Translation and identity alignment may change the effective route for the receiver.',
    ],
    relatedGuideSlugs: [
      'dfat-authentication-of-university-degree-and-transcript',
      'my-equals-degree-and-transcript-review-path',
      'australian-academic-transcript-for-use-in-uae',
    ],
  }),
  universityGuide({
    slug: 'dfat-authentication-university-of-queensland-my-equals-degree-transcript',
    publishedAt: '2026-03-10',
    featured: true,
    institution: 'University of Queensland',
    institutionShort: 'UQ',
    title: 'DFAT Authentication of University of Queensland My eQuals Degree and Transcript',
    seoTitle: 'DFAT Authentication of University of Queensland My eQuals Degree and Transcript | EGS Guides',
    metaDescription:
      'Detailed guide to University of Queensland My eQuals degree and transcript review for DFAT authentication, route fit, and intake preparation.',
    excerpt:
      'A route guide for University of Queensland academic records, covering My eQuals review, common risks, and how to prepare a destination-fit academic pack.',
    primaryKeyword: 'dfat authentication university of queensland my equals degree transcript',
    relatedKeywords: [
      'uq apostille degree',
      'uq transcript overseas use',
      'uq my equals authentication',
      'university of queensland legalisation',
    ],
    summaryPoints: [
      'UQ academic files are strongest when reviewed as institution-issued records tied to a real destination use.',
      'The best route often depends on whether the receiver wants only the degree, only the transcript, or the full academic set.',
      'My eQuals can improve clarity of source, but route confirmation still depends on review.',
    ],
    requirements: [
      'UQ issuer-generated degree or transcript file, or My eQuals share if available',
      'Destination country and receiving-side use case',
      'Any instruction that refers to legalisation, authentication, attestation, apostille, or direct verification',
      'Whether supporting academic records such as completion evidence are also required',
    ],
    extraStepNotes: [
      'Employer, admissions, and regulator cases may apply different documentary expectations to the same record.',
      'A partial academic pack can create repeat work later if the receiver expects the full set.',
      'If the file is being translated, the final issue version should generally be fixed first.',
    ],
    relatedGuideSlugs: [
      'dfat-authentication-of-university-degree-and-transcript',
      'my-equals-degree-and-transcript-review-path',
      'australian-degree-certificate-for-use-in-singapore',
    ],
  }),
  universityGuide({
    slug: 'dfat-authentication-university-of-adelaide-my-equals-degree-transcript',
    publishedAt: '2026-03-10',
    featured: false,
    institution: 'University of Adelaide',
    institutionShort: 'UoA',
    title: 'DFAT Apostille of University of Adelaide My eQuals Degree and Transcript',
    seoTitle: 'DFAT Apostille of University of Adelaide My eQuals Degree and Transcript | EGS Guides',
    metaDescription:
      'Detailed guide to University of Adelaide degree and transcript review for DFAT-facing academic handling, destination fit, and intake preparation.',
    excerpt:
      'A practical guide to University of Adelaide academic records, showing how My eQuals, destination requirements, and supporting files affect route review.',
    primaryKeyword: 'dfat apostille university of adelaide my equals degree transcript',
    relatedKeywords: [
      'university of adelaide apostille degree',
      'university of adelaide transcript overseas use',
      'my equals adelaide transcript authentication',
      'university of adelaide degree legalisation',
    ],
    summaryPoints: [
      'The route question is usually whether the academic record in hand is the right institution-issued version for the destination use.',
      'University of Adelaide files often need to be reviewed as part of a degree-plus-transcript pack.',
      'The receiving authority still decides whether the proposed route is acceptable.',
    ],
    requirements: [
      'University of Adelaide degree or transcript in issuer-generated form',
      'Destination country and receiving institution, employer, or authority if known',
      'Any wording about apostille, authentication, attestation, verification, or legalisation',
      'Whether the destination use also requires a transcript, completion statement, or translation',
    ],
    extraStepNotes: [
      'Where academic records are incomplete or partly downloaded, a cleaner source file may be needed before the route is confirmed.',
      'Translation and supporting identity records may affect document fit.',
      'Some receiving bodies place more weight on the transcript than the degree certificate alone.',
    ],
    relatedGuideSlugs: [
      'dfat-authentication-of-university-degree-and-transcript',
      'my-equals-degree-and-transcript-review-path',
      'australian-academic-transcript-for-use-in-uae',
    ],
    heroImage: '/samples/australia/australia-university-of-adelaide-transcript-reference/source.png',
    heroImageWatermarked: true,
    heroPdf: {
      src: '/samples/australia/australia-university-of-adelaide-transcript-reference/protected.svg',
      pages: 3,
      previewImages: [
        '/samples/australia/australia-university-of-adelaide-transcript-reference/page-1.png',
        '/samples/australia/australia-university-of-adelaide-transcript-reference/page-2.png',
        '/samples/australia/australia-university-of-adelaide-transcript-reference/page-3.png',
      ],
      watermarked: true,
    },
  }),
  universityGuide({
    slug: 'dfat-authentication-australian-national-university-my-equals-degree-transcript',
    publishedAt: '2026-03-10',
    featured: false,
    institution: 'Australian National University',
    institutionShort: 'ANU',
    title: 'DFAT Authentication of Australian National University My eQuals Degree and Transcript',
    seoTitle: 'DFAT Authentication of Australian National University My eQuals Degree and Transcript | EGS Guides',
    metaDescription:
      'Detailed guide to Australian National University My eQuals degree and transcript review for DFAT authentication, overseas use, and intake preparation.',
    excerpt:
      'A route guide for Australian National University academic files, explaining destination-fit review, My eQuals issues, and the next steps before intake.',
    primaryKeyword: 'dfat authentication australian national university my equals degree transcript',
    relatedKeywords: [
      'anu apostille degree',
      'anu transcript overseas use',
      'anu my equals authentication',
      'australian national university degree legalisation',
    ],
    summaryPoints: [
      'ANU records are usually reviewed as source-proven academic files tied to a specific destination use.',
      'The route often depends on whether the transcript, degree, and any supporting academic record need to move together.',
      'My eQuals can simplify source review, but final route fit remains subject to review.',
    ],
    requirements: [
      'ANU issuer-generated degree or transcript file or the My eQuals share path',
      'Destination country and the receiving body if known',
      'Any route wording from the destination side',
      'Whether the client needs only one academic file or a broader pack',
    ],
    extraStepNotes: [
      'Professional, migration, and admissions uses often apply different expectations to the same academic record.',
      'Hard-copy or translation requirements can change the practical route.',
      'If the record is incomplete or poorly captured, route review may remain provisional.',
    ],
    relatedGuideSlugs: [
      'dfat-authentication-of-university-degree-and-transcript',
      'my-equals-degree-and-transcript-review-path',
      'australian-degree-certificate-for-use-in-singapore',
    ],
  }),
  universityGuide({
    slug: 'dfat-authentication-torrens-university-australia-my-equals-testamur-degree-transcript-graduation-statement',
    publishedAt: '2026-03-09',
    featured: true,
    institution: 'Torrens University Australia',
    institutionShort: 'TUA',
    title:
      'DFAT Authentication of Torrens University Australia My eQuals Testamur, Degree, Transcript and Graduation Statement',
    seoTitle:
      'DFAT Authentication of Torrens University Australia My eQuals Testamur, Degree, Transcript and Graduation Statement | EGS Guides',
    metaDescription:
      'Professional guide to reviewing Torrens University Australia My eQuals academic records for DFAT authentication, overseas use, document setup, and intake preparation.',
    excerpt:
      'A route-focused guide for Torrens University Australia academic records, including My eQuals use, document preparation, common route differences, and intake readiness for overseas use.',
    primaryKeyword:
      'dfat authentication torrens university australia my equals testamur degree transcript graduation statement',
    relatedKeywords: [
      'torrens university apostille',
      'torrens university my equals transcript overseas use',
      'torrens university degree dfat authentication',
      'australian academic documents overseas',
    ],
    summaryPoints: [
      'My eQuals can make the source record clearer, but it does not by itself decide the final route.',
      'Many overseas receivers want the academic pack reviewed as a set, not only the degree or only the transcript.',
      'The practical review question is whether the issue format in hand is the one that best fits downstream acceptance.',
    ],
    requirements: [
      'The current Torrens My eQuals share or issuer-generated PDF if available',
      'The destination country and the institution, employer, regulator, or authority receiving the file',
      'Any message from the receiver that refers to apostille, authentication, attestation, legalisation, or direct verification',
      'Whether the client needs the testamur, degree, transcript, graduation statement, or a combination of these documents',
    ],
    extraStepNotes: [
      'A fresh issuer version may be required if the client only has an incomplete screenshot or a non-verifiable download.',
      'Some receiving bodies want translation or a downstream consular step in addition to the Australian-side route.',
      'Name variations between passport, transcript, and degree can create review questions even when the academic record itself is valid.',
    ],
    relatedGuideSlugs: [
      'dfat-authentication-university-of-sydney-my-equals-degree-transcript',
      'dfat-authentication-unsw-my-equals-degree-transcript',
      'australian-degree-certificate-for-use-in-singapore',
    ],
  }),
  universityGuide({
    slug: 'dfat-authentication-university-of-sydney-my-equals-degree-transcript',
    publishedAt: '2026-03-08',
    featured: true,
    institution: 'University of Sydney',
    institutionShort: 'USYD',
    title: 'DFAT Authentication of University of Sydney My eQuals Degree and Transcript',
    seoTitle: 'DFAT Authentication of University of Sydney My eQuals Degree and Transcript | EGS Guides',
    metaDescription:
      'Detailed guide to University of Sydney My eQuals degree and transcript review for DFAT authentication, destination fit, document readiness, and intake.',
    excerpt:
      'A practical guide to University of Sydney academic document routes, with emphasis on My eQuals format, receiver requirements, and safe route confirmation.',
    primaryKeyword: 'dfat authentication university of sydney my equals degree transcript',
    relatedKeywords: [
      'university of sydney apostille degree',
      'university of sydney transcript overseas use',
      'my equals degree transcript dfat',
      'australian university degree authentication',
    ],
    summaryPoints: [
      'The university name helps narrow the issue format, but it does not replace destination-side route review.',
      'For many academic matters, the real risk is file mismatch, not lack of academic authenticity.',
      'The receiver may want both the degree and the transcript even when the client initially plans to send only one file.',
    ],
    requirements: [
      'University of Sydney issuer-generated degree or transcript file',
      'Destination country and intended use such as university admission, licensing, migration, or employment',
      'Receiver wording or checklist, if already available',
      'Whether the file is still on My eQuals or must be obtained again from the institution',
    ],
    extraStepNotes: [
      'Older paper records and newly issued digital records may not follow the same route assumptions.',
      'Some regulators prefer direct institutional verification in addition to any legalisation step.',
      'If the document will be translated, the order of translation and legalisation may need review.',
    ],
    relatedGuideSlugs: [
      'dfat-authentication-torrens-university-australia-my-equals-testamur-degree-transcript-graduation-statement',
      'dfat-authentication-unsw-my-equals-degree-transcript',
      'australian-academic-transcript-for-use-in-uae',
    ],
  }),
  universityGuide({
    slug: 'dfat-authentication-unsw-my-equals-degree-transcript',
    publishedAt: '2026-03-07',
    featured: true,
    institution: 'UNSW',
    institutionShort: 'UNSW',
    title: 'DFAT Authentication of UNSW My eQuals Degree and Transcript',
    seoTitle: 'DFAT Authentication of UNSW My eQuals Degree and Transcript | EGS Guides',
    metaDescription:
      'Detailed guide to UNSW My eQuals degree and transcript handling for DFAT authentication, overseas use, route review, and intake preparation.',
    excerpt:
      'A report-style guide for UNSW academic records that explains My eQuals handling, route uncertainty, document setup, and the next steps before intake.',
    primaryKeyword: 'dfat authentication unsw my equals degree transcript',
    relatedKeywords: [
      'unsw apostille transcript',
      'unsw degree overseas use',
      'unsw my equals authentication',
      'australian transcript legalisation',
    ],
    summaryPoints: [
      'UNSW academic files should be reviewed as issue-format questions, not only as school-name questions.',
      'The safest route language comes from the destination and receiver instruction, not from a generic university apostille assumption.',
      'Digital convenience does not eliminate review of destination acceptance, translation needs, or extra downstream stages.',
    ],
    requirements: [
      'UNSW issuer-generated degree or transcript file or the My eQuals access path',
      'Country of use and the specific authority receiving the document, if known',
      'Any evidence of whether the receiver wants legalisation, authentication, attestation, or direct source verification',
      'Whether the student also needs a completion or graduation record',
    ],
    extraStepNotes: [
      'Where a transcript contains multiple pages, completeness matters. Partial uploads often delay route review.',
      'Employer verification cases may differ from migration or professional registration cases.',
      'If the academic pack is being used in a non-Hague destination or a consular chain, extra stages may be required.',
    ],
    relatedGuideSlugs: [
      'dfat-authentication-university-of-sydney-my-equals-degree-transcript',
      'dfat-authentication-torrens-university-australia-my-equals-testamur-degree-transcript-graduation-statement',
      'australian-degree-certificate-for-use-in-singapore',
    ],
  }),
  documentRouteGuide({
    slug: 'australian-birth-certificate-for-use-in-china',
    publishedAt: '2026-03-06',
    featured: true,
    title: 'Australian Birth Certificate for Use in China',
    seoTitle: 'Australian Birth Certificate for Use in China | EGS Guides',
    metaDescription:
      'Detailed guide to preparing an Australian birth certificate for use in China, including apostille route questions, translation issues, and intake preparation.',
    excerpt:
      'A practical guide to the route, document preparation, translation considerations, and common mistakes when an Australian birth certificate is being prepared for use in China.',
    issuingCountry: 'Australia',
    destinationCountry: 'China',
    documentTypes: ['Birth Certificate'],
    primaryKeyword: 'australian birth certificate for use in china',
    relatedKeywords: [
      'birth certificate apostille china',
      'australian birth certificate china visa',
      'dfat apostille birth certificate',
      'china apostille australia birth certificate',
    ],
    summaryPoints: [
      'For China-bound use, the core issue is usually whether the file is the correct Australian registry certificate and whether the downstream authority will accept the route in that format.',
      'An old ceremony copy, hospital souvenir, or poor scan is often the real problem, not the legalisation stage itself.',
      'Translation and name-consistency checks are often just as important as the apostille or authentication label used in the search term.',
    ],
    whoThisGuideIsFor: [
      'Clients using an Australian birth certificate for Chinese immigration, household registration, school enrolment, family matters, or other formal overseas filing.',
      'Parents and adult applicants who are unsure whether the birth document in hand is the registry-issued certificate usually reviewed first.',
      'Users who have been told they need “authentication” or “apostille” for China but have not yet confirmed which route wording the receiver actually uses.',
    ],
    commonDocumentTypesCovered: [
      'Australian state or territory registry birth certificate',
      'Recent replacement birth certificate ordered from the registry',
      'Birth certificate with supporting name-change or identity documents where names no longer align',
    ],
    routeOverview: {
      heading: t('Typical route overview'),
      paragraphs: mapTexts([
        'For Australia-issued birth certificates, review usually starts with whether the file is the formal registry certificate and whether the Chinese receiving authority is expecting a Hague apostille path or using broader legalisation wording in a generic way. Since receiving-side wording is not always consistent, the route is best confirmed against the actual instruction if available.',
        'The practical lane is usually cleaner for registry originals than for copy-based substitutes. If the birth certificate is old, damaged, laminated, or inconsistent with current identity details, the first step may be obtaining a better version or preparing supporting records before legalisation is discussed.',
      ]),
      bullets: mapTexts([
        'China-facing use often requires careful translation planning in addition to the Australian-side route.',
        'The document must be assessed as a registry record, not just as a personal certificate kept by the client.',
        'Name changes, parent-name differences, and incomplete older certificates often need special attention.',
      ]),
    },
    requirements: [
      'A clear scan of the full birth certificate, including the issuing registry details',
      'The province, authority, school, employer, court, or registry in China that will receive the document, if known',
      'Any translation requirement or Chinese-language filing instruction',
      'Any supporting ID or name-change record if the current passport name differs from the birth certificate',
    ],
    originalDocumentNotes: [
      'A clean registry-issued original or fresh replacement is usually the strongest starting point. Decorative copies and non-registry keepsakes often do not solve the route question.',
      'If the certificate is damaged, partially unreadable, or missing expected registry detail, ordering a fresh registry copy is often the more efficient first move.',
    ],
    timelineNotes: [
      'Timeframes depend first on whether the certificate in hand is immediately usable. If a replacement certificate, translation, or supporting identity document is needed, that preparation stage can become the main source of delay.',
      'Any processing window discussed before review should be treated as indicative only. Final timing depends on document readiness, destination instructions, and whether downstream translation or consular handling is also required.',
    ],
    feeNotes: [
      'Fees depend on the actual route confirmed after review and on any upstream preparation such as replacement certificates, translation coordination, or supporting-document handling.',
      'EGS fees are service and coordination fees as an independent administrative intermediary. They do not represent government or notarial charges alone.',
    ],
    extraStepNotes: [
      'Certified translation may be required for the Chinese receiver even where the Australian-side route is otherwise straightforward.',
      'If the client needs the document for a family chain, hukou-style registration, school enrolment, or immigration matter, supporting identity or relationship documents may also need review.',
      'A receiver may ask for the long-form registry certificate rather than a shorter extract version.',
    ],
    reportSections: [
      {
        heading: t('What “apostille” usually means in this scenario'),
        paragraphs: mapTexts([
          'In civil-registry matters, the practical question is usually not what apostille means in theory but whether the receiving authority wants the registry certificate to carry a recognisable legalisation credential for overseas use. That is why a precise document version matters more than generic marketing language.',
          'Where users see mixed terms such as apostille, authentication, legalisation, or overseas certification, the safest approach is to treat the wording as a route clue rather than a final answer. The route is confirmed after review of the destination and receiver requirements.',
        ]),
      },
      {
        heading: t('What to prepare before review'),
        paragraphs: mapTexts([
          'A clear scan of the certificate is only the starting point. Review is stronger when the client also provides the destination use, any instruction from the Chinese side, and any name-change or passport detail that affects document matching.',
          'That context matters because family-law, school, migration, and commercial filing scenarios do not always apply the same document expectations even when they all begin with a birth certificate.',
        ]),
        bullets: mapTexts([
          'Registry-issued certificate version',
          'Destination authority or use case in China',
          'Any required translation',
          'Identity or name-alignment documents if relevant',
        ]),
      },
      {
        heading: t('Common reasons a birth certificate route changes'),
        paragraphs: mapTexts([
          'The route often changes when the certificate is not the final version the receiver expects, when the applicant has undergone a name change, or when the Chinese authority asks for additional family records.',
          'Delay can also come from using an older certificate that is still genuine but no longer ideal for international presentation because it is incomplete, fragile, or inconsistent with current naming.',
        ]),
      },
    ],
    faq: [
      {
        question: 'Does every Australian birth certificate for China need exactly the same route?',
        answer:
          'No. A birth certificate route usually depends on the destination-side instruction, the exact registry certificate held, and whether translation or supporting records are also required.',
      },
      {
        question: 'Can I use the birth certificate I kept at home for years?',
        answer:
          'Sometimes yes, but not always. Review usually starts by checking whether it is the formal registry-issued certificate in a suitable condition and format for overseas use.',
      },
      {
        question: 'Does EGS issue the apostille or decide Chinese acceptance?',
        answer:
          'No. EGS is an independent administrative intermediary. Acceptance is determined by the receiving authority and the final route confirmed after review.',
      },
    ],
    relatedGuideSlugs: [
      'australian-marriage-certificate-for-use-overseas',
      'australian-police-check-for-overseas-use',
      'overseas-issued-documents-for-use-in-australia',
    ],
    relatedSampleKeys: ['australia-birth-certificate'],
    routeCategory: 'civil',
    heroKicker: 'Civil document route',
    heroImage: '/samples/australia/australia-birth-certificate-apostille-reference/source.png',
    heroImageWatermarked: true,
    heroPdf: {
      src: '/samples/australia/australia-birth-certificate-apostille-reference/protected.svg',
      pages: 3,
      previewImages: [
        '/samples/australia/australia-birth-certificate-apostille-reference/page-1.png',
        '/samples/australia/australia-birth-certificate-apostille-reference/page-2.png',
        '/samples/australia/australia-birth-certificate-apostille-reference/page-3.png',
      ],
      watermarked: true,
    },
    prefill: {
      issuingSlug: 'australia',
      destinationSlug: 'china',
      documentSlug: 'birth-certificate',
    },
  }),
  documentRouteGuide({
    slug: 'dfat-apostille-university-of-the-sunshine-coast-graduate-certificate-ahegs',
    publishedAt: '2026-03-11',
    featured: false,
    title: 'DFAT Apostille of University of the Sunshine Coast Graduate Certificate and AHEGS',
    seoTitle: 'DFAT Apostille of University of the Sunshine Coast Graduate Certificate and AHEGS | EGS Guides',
    metaDescription:
      'Practical guide to University of the Sunshine Coast graduate certificate and AHEGS review for DFAT apostille, destination fit, and overseas-use preparation.',
    excerpt:
      'A practical guide to UniSC graduate certificate and AHEGS files, including what these records usually show, how they are reviewed for overseas use, and what to prepare before intake.',
    intro: [
      'University of the Sunshine Coast files are often searched by graduates who already hold a graduate certificate, an AHEGS record, or both, and need a practical overseas-use answer rather than generic legalisation theory.',
      'The route usually turns on the exact academic record in hand, whether the receiving side wants only the award record or also the AHEGS support document, and whether the destination authority is actually asking for apostille, authentication, legalisation, attestation, or another academic verification path.',
    ],
    issuingCountry: 'Australia',
    destinationCountry: 'Overseas use',
    documentTypes: ['Graduate Certificate', 'AHEGS'],
    primaryKeyword: 'dfat apostille university of the sunshine coast graduate certificate ahegs',
    relatedKeywords: [
      'unisc apostille graduate certificate',
      'university of sunshine coast ahegs overseas use',
      'unisc academic document apostille',
      'graduate certificate legalisation australia',
    ],
    summaryPoints: [
      'The practical review question is usually whether the graduate certificate alone is enough or whether the receiver expects the AHEGS or wider academic pack as well.',
      'AHEGS can help explain the academic record, but it does not by itself determine the final route.',
      'Destination wording still controls whether apostille is the correct label or whether some other handling path should be used.',
    ],
    whoThisGuideIsFor: [
      'UniSC graduates preparing a graduate certificate or AHEGS file for overseas work, migration, further study, licensing, or institutional filing.',
      'Clients who hold a graduate certificate plus AHEGS and want to know whether both should travel together.',
      'Users who have been told they need DFAT apostille or broader legalisation wording but have not yet checked the receiving authority’s exact academic-file requirement.',
    ],
    commonDocumentTypesCovered: [
      'University of the Sunshine Coast graduate certificate',
      'AHEGS issued with the graduate record',
      'Award-plus-support packs used for overseas academic, professional, or migration purposes',
    ],
    routeOverview: {
      heading: t('Typical route overview'),
      paragraphs: mapTexts([
        'These matters usually begin with confirming what each file is. The graduate certificate generally shows the award itself, while the AHEGS commonly gives fuller academic context, level information, and explanatory detail for overseas readers.',
        'From there, the route question is whether the receiving side wants only the award page, the AHEGS as supporting context, or a wider academic pack. Review is therefore usually pack-based rather than file-name based.',
      ]),
      bullets: mapTexts([
        'Do not assume the graduate certificate alone always answers the overseas requirement.',
        'AHEGS can strengthen context, but it does not remove destination-side review.',
        'Route confirmation still depends on the final receiving authority and the exact use case.',
      ]),
    },
    requirements: [
      'The clearest available graduate certificate and AHEGS files in issuer-generated form',
      'Destination country and, if known, the receiving institution, employer, regulator, or authority',
      'Any wording that refers to apostille, authentication, legalisation, attestation, or direct academic verification',
      'Whether a transcript, completion letter, or other academic support is also required',
    ],
    digitalDocumentNotes: [
      'If the graduate certificate or AHEGS is only available digitally, the practical question is whether the receiver accepts that issue format in the proposed route.',
      'Screenshots or incomplete downloads are usually weaker than issuer-generated PDFs or formally supplied files.',
    ],
    originalDocumentNotes: [
      'If the receiving side expects paper presentation or a fresh issue copy, the graduate certificate and AHEGS may need to be reviewed together before the final route is confirmed.',
    ],
    timelineNotes: [
      'Timing usually depends first on whether the academic pack is complete and only then on the downstream legalisation stage.',
      'Any timing estimate before review should be treated as indicative only, because some receivers want only the award record while others expect a broader academic set.',
    ],
    feeNotes: [
      'Fees depend on the route confirmed after review and whether the graduate certificate is being handled alone or together with AHEGS and other academic support.',
      'EGS coordinates as an independent administrative intermediary only and is not the issuing institution, notary, or government authority.',
    ],
    extraStepNotes: [
      'Some overseas receivers may treat AHEGS as supporting context rather than as the main academic record.',
      'If the client’s passport name differs from the academic record, supporting identity documents may need early review.',
      'Translation, consular follow-up, or a wider academic pack can all change the practical route.',
    ],
    reportSections: [
      {
        heading: t('What the graduate certificate and AHEGS usually do together'),
        paragraphs: mapTexts([
          'The graduate certificate usually confirms the award itself. The AHEGS often adds structured explanatory information that can help an overseas institution or employer understand the academic outcome more clearly.',
          'That can be useful in cross-border filing, but it does not mean every receiver wants both documents in exactly the same way. Some care only about the award. Others want the fuller academic context.',
        ]),
      },
      {
        heading: t('Why this is still a route-review problem'),
        paragraphs: mapTexts([
          'Clients often search with apostille wording because that is the language they have been given. In practice, the useful work is checking whether the destination authority is really asking for an apostille route, a different legalisation path, or a wider academic verification sequence.',
          'That is why EGS treats this as a destination-fit review first, rather than assuming the route from the search phrase alone.',
        ]),
      },
      {
        heading: t('What customers should prepare before intake'),
        paragraphs: mapTexts([
          'The best starting pack usually includes the graduate certificate, the AHEGS, and any instruction from the receiving side. If a transcript or completion evidence is also relevant, that should usually be uploaded together.',
          'That fuller intake set usually makes it easier to confirm whether the matter is a simple apostille question or a broader academic route.',
        ]),
      },
    ],
    faq: [
      {
        question: 'Is AHEGS the same as a transcript?',
        answer:
          'No. AHEGS usually provides structured explanatory information about the award and the academic environment, while a transcript usually shows subjects, grades, or academic record detail in a different way.',
      },
      {
        question: 'Should I upload both the graduate certificate and the AHEGS?',
        answer:
          'Often yes. Many overseas matters are easier to review when the award record and the AHEGS are seen together from the start.',
      },
      {
        question: 'Does EGS decide whether the overseas receiver will accept the file?',
        answer:
          'No. EGS coordinates route review and handling as an independent administrative intermediary only. Final acceptance remains with the receiving authority.',
      },
    ],
    relatedGuideSlugs: [
      'dfat-authentication-university-of-adelaide-my-equals-degree-transcript',
      'my-equals-degree-and-transcript-review-path',
      'australian-testamur-for-overseas-use',
    ],
    relatedSampleKeys: ['australia-education-certificate', 'australia-academic-document'],
    routeCategory: 'civil',
    heroKicker: 'Academic route guide',
    heroImage: '/samples/australia/australia-unisc-graduate-certificate-ahegs-reference/source.png',
    heroImageWatermarked: true,
    heroPdf: {
      src: '/samples/australia/australia-unisc-graduate-certificate-ahegs-reference/protected.svg',
      pages: 10,
      previewImages: [
        '/samples/australia/australia-unisc-graduate-certificate-ahegs-reference/page-1.png',
        '/samples/australia/australia-unisc-graduate-certificate-ahegs-reference/page-2.png',
        '/samples/australia/australia-unisc-graduate-certificate-ahegs-reference/page-3.png',
        '/samples/australia/australia-unisc-graduate-certificate-ahegs-reference/page-4.png',
        '/samples/australia/australia-unisc-graduate-certificate-ahegs-reference/page-5.png',
        '/samples/australia/australia-unisc-graduate-certificate-ahegs-reference/page-6.png',
        '/samples/australia/australia-unisc-graduate-certificate-ahegs-reference/page-7.png',
        '/samples/australia/australia-unisc-graduate-certificate-ahegs-reference/page-8.png',
        '/samples/australia/australia-unisc-graduate-certificate-ahegs-reference/page-9.png',
        '/samples/australia/australia-unisc-graduate-certificate-ahegs-reference/page-10.png',
      ],
      watermarked: true,
    },
    prefill: {
      issuingSlug: 'australia',
      documentSlug: 'degree-certificate',
    },
  }),
  documentRouteGuide({
    slug: 'australian-degree-certificate-for-use-in-singapore',
    publishedAt: '2026-03-05',
    featured: true,
    title: 'Australian Degree Certificate for Use in Singapore',
    seoTitle: 'Australian Degree Certificate for Use in Singapore | EGS Guides',
    metaDescription:
      'Detailed guide to using an Australian degree certificate in Singapore, including route review, document format, common supporting files, and intake preparation.',
    excerpt:
      'A report-style guide to handling an Australian degree certificate for use in Singapore, with practical notes on route confirmation, document setup, and likely supporting records.',
    issuingCountry: 'Australia',
    destinationCountry: 'Singapore',
    documentTypes: ['Degree Certificate', 'Testamur'],
    primaryKeyword: 'australian degree certificate for use in singapore',
    relatedKeywords: [
      'degree certificate apostille singapore',
      'australian university degree singapore use',
      'dfat authentication degree certificate singapore',
      'australian testamur overseas use',
    ],
    summaryPoints: [
      'A degree certificate route should be assessed together with the destination purpose, not only with the country name.',
      'Many Singapore-facing cases work better when the transcript or completion evidence is reviewed alongside the degree.',
      'The receiving body may care more about the issue format and provenance than about the label the client uses in the search query.',
    ],
    whoThisGuideIsFor: [
      'Graduates using an Australian degree certificate for employment, further study, work pass, licensing, or corporate onboarding in Singapore.',
      'Applicants who have the degree but are unsure whether the transcript or another supporting academic file is also needed.',
      'Users who have been told to get an apostille or authentication for Singapore but need the route checked against the actual receiving authority.',
    ],
    commonDocumentTypesCovered: [
      'Australian university degree certificate or testamur',
      'Completion letter or graduation statement where requested by the receiver',
      'Academic transcript reviewed together with the degree where the receiving body expects the full academic pack',
    ],
    routeOverview: {
      heading: t('Typical route overview'),
      paragraphs: mapTexts([
        'For Australian academic awards used in Singapore, the route usually starts with whether the file is an institution-issued degree certificate and what the Singapore receiver actually wants to see. Some cases are straightforward document-legalisation matters, while others turn more on institutional verification, transcript pairing, or translation of names and course details.',
        'The safest route is therefore confirmed after review of the receiving-side instruction. A degree certificate alone may not be enough if the destination asks for the transcript, course completion evidence, or additional identity matching documents.',
      ]),
      bullets: mapTexts([
        'Academic destination use often requires a degree-plus-transcript view, not a single-document assumption.',
        'Digital issue format and hard-copy issue format may not be treated identically by every receiver.',
        'The country name is useful, but the receiving institution or employer often determines the practical route details.',
      ]),
    },
    requirements: [
      'Issuer-generated degree certificate or testamur',
      'If available, transcript or completion record requested by the Singapore receiver',
      'Destination purpose such as university, employer, licensing body, or pass application',
      'Any checklist or wording supplied by the Singapore-side receiver',
    ],
    digitalDocumentNotes: [
      'Where the degree is available in a verifiable digital format, review can usually begin from that version. The key question is still whether the receiver accepts that issue format for the next route step.',
      'A downloaded PDF should be checked for completeness and issuer provenance rather than assumed usable just because it is digital.',
    ],
    originalDocumentNotes: [
      'If the receiver expects paper presentation, a hard-copy or freshly issued version may still be the better intake file even where a digital version exists.',
    ],
    timelineNotes: [
      'Academic timeframes depend on whether the degree package is already complete. If the transcript or completion record must still be obtained, that setup stage often becomes the controlling timeline.',
      'Any quoted timing before review should be treated as indicative only because Singapore-facing use cases vary by receiving institution and by whether a further employer or regulator check is expected.',
    ],
    feeNotes: [
      'Fees depend on the route actually confirmed after review and on whether supporting academic files must also be handled.',
      'EGS charges for coordination and administrative handling only. EGS does not claim to be the certifying or issuing authority.',
    ],
    extraStepNotes: [
      'If the degree name on the certificate differs from the current passport name, supporting ID or change-of-name evidence may need review.',
      'Some Singapore-facing cases are easier when the transcript, degree, and identification documents are reviewed together from the start.',
      'Professional registration matters may impose stricter source-verification expectations than ordinary employment onboarding.',
    ],
    reportSections: [
      {
        heading: t('Why academic files are often reviewed as a pack'),
        paragraphs: mapTexts([
          'A degree certificate proves the award, but it does not always answer everything the receiver wants to know. Singapore-facing employers, schools, and regulators often ask questions that sit across the degree, transcript, and completion history rather than one page alone.',
          'That is why route review often focuses on the academic pack as a whole. The goal is to identify the file set most likely to satisfy the receiving authority before the legalisation path is locked in.',
        ]),
      },
      {
        heading: t('What to check before treating this as an apostille matter'),
        paragraphs: mapTexts([
          'Users often search with apostille language because it is the most familiar term, but the safer approach is to check what the Singapore receiver actually asked for. Some destinations use broader wording or pair legalisation with direct source verification.',
          'The route should therefore be tied to the instruction in hand or, if none is available, to the practical use case described at intake.',
        ]),
      },
      {
        heading: t('Common document-fit issues'),
        paragraphs: mapTexts([
          'The most common issues are incomplete academic packs, unclear digital provenance, and uncertainty about whether the receiving body needs the transcript as well as the degree.',
          'Less obvious issues include name mismatches, old issue formats, and clients assuming a single-country route when the document will in fact be reviewed by multiple institutions or employers.',
        ]),
      },
    ],
    faq: [
      {
        question: 'Do I only need the degree certificate for Singapore?',
        answer:
          'Not always. Many cases are stronger when the transcript or another academic record is reviewed at the same time, especially for study, licensing, or more formal employment checks.',
      },
      {
        question: 'If my degree is digital, is the route automatically easier?',
        answer:
          'Digital provenance can help, but the route still depends on receiver acceptance and whether the file is complete, verifiable, and suited to the destination purpose.',
      },
      {
        question: 'Can EGS guarantee the Singapore receiver will accept the file?',
        answer:
          'No. EGS coordinates the route review and administrative handling, but the final acceptance decision always sits with the receiving authority.',
      },
    ],
    relatedGuideSlugs: [
      'dfat-authentication-university-of-sydney-my-equals-degree-transcript',
      'dfat-authentication-unsw-my-equals-degree-transcript',
      'australian-academic-transcript-for-use-in-uae',
    ],
    relatedSampleKeys: ['australia-education-certificate', 'australia-academic-document'],
    routeCategory: 'civil',
    heroKicker: 'Academic route guide',
    heroImage: '/samples/australia/australia-degree-certificate-reference/source.png',
    heroImageWatermarked: true,
    heroPdf: {
      src: '/samples/australia/australia-degree-certificate-reference/protected.svg',
      pages: 1,
      watermarked: true,
    },
    prefill: {
      issuingSlug: 'australia',
      destinationSlug: 'singapore',
      documentSlug: 'degree-certificate',
    },
  }),
  documentRouteGuide({
    slug: 'australian-academic-transcript-for-use-in-uae',
    publishedAt: '2026-03-04',
    featured: true,
    title: 'Australian Academic Transcript for Use in the UAE',
    seoTitle: 'Australian Academic Transcript for Use in the UAE | EGS Guides',
    metaDescription:
      'Detailed guide to using an Australian academic transcript in the UAE, including authentication versus apostille issues, supporting records, and intake preparation.',
    excerpt:
      'A practical guide to route review for Australian academic transcripts used in the UAE, with careful notes on authentication wording, supporting documents, and route uncertainty.',
    issuingCountry: 'Australia',
    destinationCountry: 'UAE',
    documentTypes: ['Academic Transcript'],
    primaryKeyword: 'australian academic transcript for use in the uae',
    relatedKeywords: [
      'academic transcript authentication uae',
      'australian transcript attestation uae',
      'dfat authentication academic transcript',
      'australian education documents uae',
    ],
    summaryPoints: [
      'UAE-bound academic records often require more careful route wording because users may search with apostille, authentication, legalisation, or attestation interchangeably.',
      'A transcript rarely sits in isolation; the receiving side may also want the degree, completion evidence, passport details, or translation.',
      'Route review should confirm the current rules of the receiving body before the client commits to one route label.',
    ],
    whoThisGuideIsFor: [
      'Applicants using an Australian transcript for UAE employment, study, licensing, visa, or other formal institutional filing.',
      'Clients who have been told they need attestation or authentication for the UAE and need the actual route clarified.',
      'Users who hold a transcript digitally and need to know whether additional paper or supporting academic files are also required.',
    ],
    commonDocumentTypesCovered: [
      'Australian university academic transcript',
      'Transcript plus degree certificate or completion letter where the receiving body expects both',
      'Digitally issued transcript or institution-provided PDF that still needs destination-fit review',
    ],
    routeOverview: {
      heading: t('Typical route overview'),
      paragraphs: mapTexts([
        'For UAE use, route wording should be treated carefully. Some receivers, agents, or employers use broad terms such as attestation or legalisation without distinguishing the underlying sequence in detail. The practical task is to identify the required path for the exact receiving body and then review whether the academic transcript in hand fits that path.',
        'In many cases, the transcript works best when reviewed together with the degree and identity details. That combined review reduces the risk of sending a technically genuine file that still falls short of what the receiver wants to see downstream.',
      ]),
      bullets: mapTexts([
        'Do not assume the word apostille is the final answer for every UAE academic route.',
        'Supporting academic records may materially change the route and document pack.',
        'The transcript format matters, especially where digital issuance and print presentation are treated differently.',
      ]),
    },
    requirements: [
      'The current transcript file in its clearest available institution-issued form',
      'Destination authority in the UAE or the best available description of the filing purpose',
      'Any instruction mentioning attestation, legalisation, embassy, ministry, authentication, or translation',
      'If available, degree certificate or completion evidence that travels with the transcript',
    ],
    digitalDocumentNotes: [
      'A digital transcript can be a strong starting point when it clearly comes from the issuer. The route still depends on whether the receiving side accepts a digital-origin academic file in that handling chain.',
      'Forwarded PDFs and screen captures should be checked carefully because completeness and provenance often matter more than convenience.',
    ],
    originalDocumentNotes: [
      'Where a paper pathway is preferred or required, a fresh issuer copy may still be needed even if a digital file exists.',
    ],
    timelineNotes: [
      'UAE-facing timelines are especially sensitive to route accuracy. If the first route assumption is wrong, correction often causes more delay than the base processing stage itself.',
      'Any timeframe given before review should therefore be treated as indicative only and subject to the final route confirmed for the receiving body.',
    ],
    feeNotes: [
      'Fees depend on the route confirmed after review, including whether additional handling stages or supporting documents are required.',
      'EGS service fees cover administrative coordination and route handling only and do not imply authority status or legal advice.',
    ],
    extraStepNotes: [
      'Translation, degree-plus-transcript review, and downstream consular or ministry stages may all affect the final route.',
      'Employer or licensing cases can be materially different from school admission cases even if the document set looks similar.',
      'If there is a name mismatch across passport and academic files, supporting evidence may be needed to avoid later rejection.',
    ],
    reportSections: [
      {
        heading: t('Why UAE academic routes need careful wording'),
        paragraphs: mapTexts([
          'Clients often receive informal instructions that use attestation, legalisation, authentication, and apostille as if they were interchangeable. In practice, the useful work is not guessing which term sounds familiar but matching the file and destination to the sequence the receiver actually expects.',
          'That is why this guide treats the query as a route-review problem. The route is confirmed after review, not announced in advance based on the search phrase alone.',
        ]),
      },
      {
        heading: t('What the transcript usually needs to travel with'),
        paragraphs: mapTexts([
          'A transcript may be technically valid but still incomplete for destination use if the receiving body also expects the degree certificate, completion statement, translation, or identity support. Reviewing the wider academic pack early usually prevents repeat work later.',
          'The need for supporting records is especially common when the transcript is being used in regulated employment or higher-scrutiny institutional settings.',
        ]),
      },
      {
        heading: t('Typical risk points before intake'),
        paragraphs: mapTexts([
          'The main early risk points are unclear receiver wording, incomplete academic packs, and digital files that do not show a strong issuer chain. A fast intake usually depends on resolving those points first.',
          'The other recurring risk is treating all UAE-bound academic cases as the same. They are not. Receiver type and purpose can materially change the route.',
        ]),
      },
    ],
    faq: [
      {
        question: 'Is this always an apostille route for the UAE?',
        answer:
          'It should not be assumed. UAE-facing academic routes should be reviewed carefully because receiver wording often varies and additional stages may be involved.',
      },
      {
        question: 'Should I send only the transcript?',
        answer:
          'Not always. Many cases are stronger when the degree or completion evidence is reviewed at the same time, especially for regulated or formal institutional use.',
      },
      {
        question: 'Can EGS confirm acceptance before any review?',
        answer:
          'No. EGS can assess the likely route as an independent administrative intermediary, but the route is only confirmed after review and final acceptance remains with the receiving authority.',
      },
    ],
    relatedGuideSlugs: [
      'australian-degree-certificate-for-use-in-singapore',
      'dfat-authentication-university-of-sydney-my-equals-degree-transcript',
      'overseas-issued-documents-for-use-in-australia',
    ],
    relatedSampleKeys: ['australia-academic-document-consulate'],
    routeCategory: 'civil',
    heroKicker: 'Academic route guide',
    heroImage: '/samples/australia/australia-academic-transcript-reference/source.png',
    heroImageWatermarked: true,
    heroPdf: {
      src: '/samples/australia/australia-academic-transcript-reference/protected.svg',
      pages: 6,
      previewImages: [
        '/samples/australia/australia-academic-transcript-reference/page-1.png',
        '/samples/australia/australia-academic-transcript-reference/page-2.png',
        '/samples/australia/australia-academic-transcript-reference/page-3.png',
        '/samples/australia/australia-academic-transcript-reference/page-4.png',
        '/samples/australia/australia-academic-transcript-reference/page-5.png',
        '/samples/australia/australia-academic-transcript-reference/page-6.png',
      ],
      watermarked: true,
    },
    prefill: {
      issuingSlug: 'australia',
      destinationSlug: 'uae',
      documentSlug: 'academic-transcript',
    },
  }),
  documentRouteGuide({
    slug: 'australian-company-documents-for-use-in-hong-kong',
    publishedAt: '2026-03-03',
    featured: true,
    title: 'Australian Company Documents for Use in Hong Kong',
    seoTitle: 'Australian Company Documents for Use in Hong Kong | EGS Guides',
    metaDescription:
      'Detailed guide to preparing Australian company documents for use in Hong Kong, including ASIC records, notarisation issues, and route review before intake.',
    excerpt:
      'A practical guide to route review for Australian company documents going to Hong Kong, with emphasis on document class, notarisation needs, supporting corporate papers, and intake readiness.',
    issuingCountry: 'Australia',
    destinationCountry: 'Hong Kong',
    documentTypes: ['Company Documents', 'ASIC Extracts', 'Certificates'],
    primaryKeyword: 'australian company documents for use in hong kong',
    relatedKeywords: [
      'company documents apostille hong kong',
      'asic documents hong kong use',
      'australian company legalisation hong kong',
      'business registration documents overseas',
    ],
    summaryPoints: [
      'Corporate routes usually depend on document class first: ASIC extract, certificate, constitution, resolution, and signed commercial paper do not all follow the same path.',
      'The most common error is assuming any company PDF can go directly to legalisation without checking whether a notarial step is missing.',
      'Hong Kong use cases often involve time-sensitive banking, incorporation, registry, or contract deadlines, so pre-review of the actual document set is important.',
    ],
    whoThisGuideIsFor: [
      'Australian companies, directors, advisors, or agents preparing corporate files for registry, banking, deal, or compliance use in Hong Kong.',
      'Users holding ASIC extracts, company certificates, board resolutions, powers of attorney, or constitutions and needing to know which items usually need a different upstream step.',
      'Clients who already have a filing deadline and want the document pack reviewed before committing to one route.',
    ],
    commonDocumentTypesCovered: [
      'ASIC current company extracts or certificates',
      'Company constitutions, board resolutions, and signed private corporate documents',
      'Powers of attorney and commercial declarations used together with company records',
    ],
    routeOverview: {
      heading: t('Typical route overview'),
      paragraphs: mapTexts([
        'For Australian company documents going to Hong Kong, the route usually begins with the distinction between public registry material and private corporate documents. Registry-issued extracts or certificates may sit in a cleaner path than signed company papers that first need a separate certification step.',
        'That means the document pack should be mapped before the route is priced or timed. A mixed pack often contains some items that are already closer to an overseas-use path and other items that still need notarisation or another upstream preparation stage.',
      ]),
      bullets: mapTexts([
        'Do not treat every company document as if it follows the same lane.',
        'Signed private corporate papers commonly need a different upstream step from registry extracts.',
        'Banking and registry matters often care about document age, signatory authority, and pack completeness as much as the legalisation label itself.',
      ]),
    },
    requirements: [
      'The exact company documents to be used, ideally as a full pack rather than isolated pages',
      'Hong Kong destination authority, bank, registry, counterparty, or transaction context',
      'Whether the documents are registry-issued, signed private corporate papers, or a mixed set',
      'Urgency details and any deadline that affects sequencing',
    ],
    originalDocumentNotes: [
      'Signed private company documents often need review in their signed form because signature setup can affect whether an upstream step is missing.',
      'For registry-issued documents, recency and the exact extract or certificate type matter. An outdated extract may be technically genuine but commercially unhelpful.',
    ],
    timelineNotes: [
      'Corporate timing depends heavily on whether the pack is mixed and whether private company documents need extra preparation. The route is often faster when the pack is sorted into clean public-document and private-document lanes early.',
      'Any timeline discussed before review should be treated as indicative only because corporate packs vary widely in age, type, signatory setup, and destination expectation.',
    ],
    feeNotes: [
      'Fees depend on the document mix, the need for any upstream certification, and whether the destination deadline requires special handling.',
      'EGS acts as an independent administrative intermediary only. Fees reflect service coordination, not authority status.',
    ],
    extraStepNotes: [
      'Board resolutions, powers of attorney, and signed declarations often raise upstream certification questions before any DFAT-facing stage is considered.',
      'Banking and transaction matters may require a tighter set of supporting corporate documents than the client initially expects.',
      'Older ASIC extracts may need refreshing to match the destination filing date or commercial expectation.',
    ],
    reportSections: [
      {
        heading: t('Why company documents need pack review, not single-page review'),
        paragraphs: mapTexts([
          'A company route often fails when one document is reviewed in isolation and the rest of the pack is added later. The receiving side usually evaluates the file set together: company existence, signatory authority, board approval, and any appointment or power document may all need to align.',
          'That is why a commercial route review usually asks for the pack and the use case. The correct lane becomes clearer once the documents are seen as a coordinated set rather than as separate PDFs.',
        ]),
      },
      {
        heading: t('Public company documents versus private company documents'),
        paragraphs: mapTexts([
          'Registry-issued documents and private signed company documents are not the same thing. Public records often sit closer to a direct route, while private corporate papers usually need a different upstream step because the issue is no longer just what was filed with the registry.',
          'This distinction is central to avoiding avoidable delay and mispricing at intake.',
        ]),
      },
      {
        heading: t('Questions that usually matter most in Hong Kong use'),
        paragraphs: mapTexts([
          'Commercial use in Hong Kong is often deadline-driven. Banks, counterparties, and registries typically care about recency, corporate authority, and pack completeness. That means old extracts, unsigned documents, or partial packs create more friction than generic route language suggests.',
          'If the documents will support a banking, incorporation, or transactional step, that context should be supplied at intake because it often changes the review priorities.',
        ]),
      },
    ],
    faq: [
      {
        question: 'Can I send one ASIC extract and work out the rest later?',
        answer:
          'It is better to review the intended document pack early. Corporate routes often depend on how the documents work together, not on one extract alone.',
      },
      {
        question: 'Do private company documents follow the same route as ASIC documents?',
        answer:
          'Usually not. Signed private corporate documents often raise different upstream certification questions from registry-issued extracts and certificates.',
      },
      {
        question: 'Can EGS act as the notary or authority on company documents?',
        answer:
          'No. EGS is an independent administrative intermediary and does not claim to be a law firm, public notary, or government authority.',
      },
    ],
    relatedGuideSlugs: [
      'uk-issued-company-documents-for-use-in-australia',
      'overseas-issued-documents-for-use-in-australia',
      'australian-police-check-for-overseas-use',
    ],
    relatedSampleKeys: ['australia-company-document-2'],
    routeCategory: 'company',
    heroKicker: 'Company route guide',
    heroImage: '/samples/australia/australia-company-registry-certificate-reference/source.png',
    heroImageWatermarked: true,
    prefill: {
      issuingSlug: 'australia',
      destinationSlug: 'hong-kong',
      documentSlug: 'company-documents',
    },
  }),
  documentRouteGuide({
    slug: 'australian-police-check-for-overseas-use',
    publishedAt: '2026-03-10',
    featured: false,
    title: 'Australian Police Check for Overseas Use',
    seoTitle: 'Australian Police Check for Overseas Use | EGS Guides',
    metaDescription:
      'Practical guide to using an Australian police check overseas, including AFP issuing authority, name-based versus fingerprint-based applications, validity, apostille, authentication, and translation planning.',
    excerpt:
      'A practical guide to Australian police clearance certificates for overseas use, including the AFP National Police Certificate, name-based versus fingerprint-supported applications, validity, apostille, and legalisation pathways.',
    intro: [
      'An Australian police clearance certificate is one of the most commonly requested documents for immigration, overseas employment, study, residency, licensing, and other cross-border compliance purposes. For international use, the real issue is not only how to obtain the certificate, but also which issuing authority is appropriate, whether a fingerprint-based check is required, how long the document will be accepted, and whether the final document needs apostille or consular legalisation.',
      'This guide explains the main pathways for obtaining an Australian police clearance certificate for overseas use and highlights the practical distinction between standard name-based checks and fingerprint-supported applications. It also explains the difference between apostille and legalisation so applicants can plan the document route more accurately.',
    ],
    issuingCountry: 'Australia',
    destinationCountry: 'Overseas use',
    documentTypes: ['National Police Certificate', 'Police Check'],
    primaryKeyword: 'australian police check for overseas use',
    relatedKeywords: [
      'afp national police certificate overseas use',
      'police check apostille australia',
      'australian police certificate overseas',
      'afp police check legalisation',
      'police check authentication australia',
    ],
    summaryPoints: [
      'For most international-use cases, the starting document is the AFP National Police Certificate rather than a generic state-based police check.',
      'A standard name-based AFP application is common, but some receivers specifically require a fingerprint-supported pathway.',
      'The practical route turns on destination-country rules, receiver acceptance standards, and whether the certificate must go on to DFAT Apostille or Authentication.',
    ],
    whoThisGuideIsFor: [
      'Applicants using an Australian police clearance certificate for migration, permanent residence, overseas work, study, licensing, or long-term residency matters.',
      'Users trying to work out whether the receiver wants a standard AFP National Police Certificate or a fingerprint-supported application.',
      'Clients who have been told to obtain apostille, authentication, or legalisation for an Australian police certificate and need the route clarified before filing.',
    ],
    commonDocumentTypesCovered: [
      'AFP National Police Certificate for Commonwealth, ACT, visa, migration, and overseas-use matters',
      'Police certificate reviewed together with passport identity support and destination instructions',
      'Police certificate used in broader migration, employment, study, licensing, or family-based submission packs',
    ],
    routeOverview: {
      heading: t('Typical route overview'),
      paragraphs: mapTexts([
        'For most overseas-use cases, the practical sequence is: prepare identity documents, apply for the AFP National Police Certificate, receive the certificate, confirm whether the destination country accepts Apostille or requires a non-Hague legalisation route, and then add any translation or further consular step required by the final receiver.',
        'The route changes if fingerprints are required, if the certificate will be judged against a recent-issue window, or if the destination authority distinguishes between Apostille and broader legalisation. That is why the useful question is not simply whether a police check can be obtained, but whether the exact certificate and authentication chain match the final filing standard.',
      ]),
      bullets: mapTexts([
        'The receiving authority may specifically require an AFP-issued National Police Certificate rather than another local police check product.',
        'Name-based and fingerprint-supported applications do not follow exactly the same handling path.',
        'Validity, translation, and destination-country authentication rules can materially affect the usable route.',
      ]),
    },
    requirements: [
      'Clear copy of the current AFP National Police Certificate, if already issued',
      'Passport or other identity documents used to support the AFP application',
      'Destination country and the precise migration, employment, study, licensing, or compliance purpose',
      'Any receiver instruction that mentions fingerprints, validity period, apostille, authentication, legalisation, or translation',
    ],
    digitalDocumentNotes: [
      'Digital or electronically issued police certificates should still be checked against the destination authority’s acceptance standard. Some receivers accept a digitally issued result cleanly, while others still want a certified paper chain or downstream authentication step.',
    ],
    originalDocumentNotes: [
      'If the receiver asks for a physical original, certified paper chain, or wet-signed supporting pack, that should be identified early because it may affect the timing and best route sequence.',
    ],
    timelineNotes: [
      'Timing should be planned around both issuance and acceptance. The AFP notes that name and fingerprint National Police Certificates may take 15 to 30 business days in some cases, and further DFAT or consular handling can add more time.',
      'The AFP does not impose one universal acceptance period for every use. In practice, the real validity window is whatever the final receiver will accept, and some migration or institutional uses may require a recently issued certificate.',
    ],
    feeNotes: [
      'Government fees and downstream costs depend on the actual route. This may include the AFP certificate itself, DFAT Apostille or Authentication, translation, or any later consular step required by a non-Hague destination.',
      'EGS charges for service coordination as an independent administrative intermediary only.',
    ],
    extraStepNotes: [
      'A fingerprint-supported application may be required where the destination authority, licensing body, or government department asks for stronger identity linkage.',
      'If the destination country is not a Hague Apostille Convention member, DFAT Authentication may need to be followed by embassy or consular legalisation.',
      'Translation may still be required even after authentication because AFP and DFAT do not determine the language requirements of the final receiver.',
    ],
    reportSections: [
      {
        heading: t('What is an Australian police clearance certificate?'),
        paragraphs: mapTexts([
          'For most international-use cases, the relevant document is the National Police Certificate issued by the Australian Federal Police. The AFP describes the National Police Certificate as a summary of a person’s offender history in Australia, commonly referred to as a national police check.',
          'It is important not to assume that every police check issued in Australia is interchangeable. State and territory police bodies may issue checks for local purposes, but for many visa, migration, and overseas submission matters, the receiver specifically asks for an AFP-issued National Police Certificate.',
        ]),
      },
      {
        heading: t('Who usually needs it?'),
        paragraphs: mapTexts([
          'Australian police clearance certificates are commonly requested for immigration and permanent residence applications, overseas work, student visa files, professional registration, long-term residency, and other cross-border compliance matters. In many practical cases, the certificate is only one part of a wider migration, employment, or licensing pack.',
          'For Australian visa matters, the Department of Home Affairs states that where a person has spent 12 months or more in Australia, they may need to provide a National Police Certificate from the AFP. That is one reason the AFP certificate is treated as the default starting point for many international-use cases.',
        ]),
      },
      {
        heading: t('Issuing authority: AFP'),
        paragraphs: mapTexts([
          'For most cross-border purposes, the primary issuing authority is the Australian Federal Police. The AFP provides the application pathway for National Police Certificates, publishes the identity requirements used for those applications, and confirms that fingerprint checks can be included where required.',
          'The AFP also notes that the certificate records information as at the date of application. It does not capture court outcomes occurring after that date, which matters when a receiver is sensitive to issue timing or expects a recently issued certificate.',
        ]),
      },
      {
        heading: t('Name-based vs fingerprint-supported checks'),
        paragraphs: mapTexts([
          'A standard AFP National Police Certificate is usually the starting point. It is commonly used for migration, employment, study, and residency matters unless the receiving authority specifically requires fingerprints. The standard path is generally based on the applicant’s personal details and identity documents under the AFP’s identification requirements.',
          'If the application must include fingerprints, the AFP states that the request should be lodged by post using the National Police Check application form. In practice, this route is heavier and can be slower, but it may offer stronger identity linkage where the final authority insists on a fingerprint-supported result.',
        ]),
        bullets: mapTexts([
          'Standard name-based checks are often enough for general overseas use unless the receiver says otherwise.',
          'Fingerprint-supported applications should be chosen where the destination authority, regulator, or employer explicitly asks for them.',
          'The safest rule is to follow the final receiver’s wording rather than market habit.',
        ]),
      },
      {
        heading: t('Validity, apostille, and legalisation'),
        paragraphs: mapTexts([
          'The AFP does not set a universal global expiry period. It states that the certificate is valid from the date of application, but the organisation requesting the certificate decides how long it will accept it. In migration practice, a 12-month window is common, but it should not be treated as a universal rule for every destination.',
          'If the Australian police certificate will be used overseas, the next question is whether the destination country is a Hague Apostille Convention member. For Hague destinations, DFAT Apostille may be the correct route. For non-Hague destinations, DFAT Authentication and then further embassy or consular legalisation may be required. Apostille and legalisation are related concepts, but they are not the same process.',
        ]),
      },
    ],
    faq: [
      {
        question: 'Is every Australian police check suitable for overseas use?',
        answer:
          'No. Many overseas-use cases call specifically for an AFP-issued National Police Certificate. The useful question is whether the exact certificate held matches the destination requirement and remains within the receiver’s accepted timeframe.',
      },
      {
        question: 'Do I always need a fingerprint-based police check?',
        answer:
          'No. A standard AFP National Police Certificate is often the correct starting point. Fingerprints are usually only appropriate where the final receiver specifically requires them.',
      },
      {
        question: 'Does every Australian police certificate need apostille?',
        answer:
          'No. Apostille only becomes relevant where the destination country and the final receiving authority require that international authentication step. Non-Hague destinations may need a different legalisation path instead.',
      },
      {
        question: 'Does EGS decide whether the police certificate is accepted overseas?',
        answer:
          'No. EGS coordinates route review and preparation as an independent administrative intermediary, but the issuing authority, DFAT, any later consulate, and the final receiving institution determine issuance and acceptance.',
      },
    ],
    officialLinks: [
      {
        label: { en: 'Australian Federal Police: National Police Checks' },
        url: 'https://www.afp.gov.au/our-services/national-police-checks',
      },
      {
        label: { en: 'Department of Home Affairs: How to get a police certificate' },
        url: 'https://immi.homeaffairs.gov.au/help-support/glossary/how-to-get-police-certificate',
      },
      {
        label: { en: 'DFAT: Authentications and Apostilles' },
        url: 'https://www.dfat.gov.au/about-us/our-services/notarial-services/authentications-and-apostilles',
      },
    ],
    relatedGuideSlugs: [
      'australian-birth-certificate-for-overseas-use',
      'australian-marriage-certificate-for-use-overseas',
      'overseas-issued-documents-for-use-in-australia',
    ],
    relatedSampleKeys: ['australia-police-check'],
    routeCategory: 'police',
    heroKicker: 'Police document route',
    heroImage: '/samples/australia/australia-police-check-reference/source.png',
    heroImageWatermarked: true,
    heroPdf: {
      src: '/samples/australia/australia-police-check-reference/protected.svg',
      pages: 1,
      watermarked: true,
    },
    prefill: {
      issuingSlug: 'australia',
      documentSlug: 'police-check',
    },
  }),
  documentRouteGuide({
    slug: 'singapore-certificate-of-clearance-for-overseas-use',
    publishedAt: '2026-03-10',
    featured: true,
    title: 'Singapore Certificate of Clearance for Overseas Use',
    seoTitle: 'Singapore Certificate of Clearance for Overseas Use | EGS Guides',
    metaDescription:
      'Professional guide to using a Singapore Certificate of Clearance overseas, including application path, fingerprint handling, apostille considerations, and cross-border preparation.',
    excerpt:
      'A Singapore Certificate of Clearance is commonly used for immigration, employment, study, residency, and licensing matters overseas. This guide explains the usual application path, where apostille may become relevant, and what to check before relying on the certificate internationally.',
    issuingCountry: 'Singapore',
    destinationCountry: 'Overseas use',
    documentTypes: ['Certificate of Clearance', 'Police Clearance Certificate'],
    primaryKeyword: 'singapore certificate of clearance for overseas use',
    relatedKeywords: [
      'singapore coc apostille',
      'singapore police clearance overseas use',
      'certificate of clearance singapore apostille',
      'singapore police certificate international use',
    ],
    summaryPoints: [
      'The first issue is usually whether the applicant is eligible and can complete the current Singapore Police Force application steps properly.',
      'Fingerprint handling, supporting evidence, and destination-country requirements often shape the practical route more than the certificate name alone.',
      'If the COC will be used overseas, the next step may involve apostille or another cross-border authentication path depending on the destination country.',
    ],
    whoThisGuideIsFor: [
      'Former Singapore residents who now need a Certificate of Clearance for immigration, work, study, residency, or licensing matters abroad.',
      'Applicants trying to understand whether the current Singapore Police Force process, fingerprint requirement, and supporting documents apply to their case.',
      'Users who need the certificate to work internationally and want the downstream apostille, translation, or legalisation path checked early.',
    ],
    commonDocumentTypesCovered: [
      'Singapore Certificate of Clearance issued by the Singapore Police Force',
      'COC used in visa, immigration, employment, and university application packs',
      'COC reviewed together with passport identity, receiver instructions, and post-issuance apostille requirements',
    ],
    routeOverview: {
      heading: t('Typical route overview'),
      paragraphs: mapTexts([
        'A Singapore COC matter usually starts with the issuing-side process, not the overseas filing stage. The practical first question is whether the applicant can satisfy the current Singapore Police Force requirements, including identity details, supporting reason, and fingerprint submission where required.',
        'Once issuance is on track, the next question is how the certificate will be used abroad. In Hague cases, apostille may be the correct next step. In non-Hague cases, the path may shift into consular legalisation or another destination-specific chain. That is why the country of use should be confirmed early.',
      ]),
      bullets: mapTexts([
        'Confirm eligibility and application pathway first.',
        'Treat fingerprint handling as an early operational step, not an afterthought.',
        'Check the destination country before assuming apostille is the final answer.',
      ]),
    },
    requirements: [
      'Clear passport or identity details matching the intended COC application',
      'Country of use and the receiving authority, employer, university, or immigration body if known',
      'Any receiver instruction showing why the police clearance is required',
      'Any deadline, recent-issue preference, or translation requirement set by the destination side',
    ],
    digitalDocumentNotes: [
      'Issuance format and downstream acceptance should be checked carefully. Some receivers are comfortable with electronic issue formats, while others still expect a printed or formally authenticated chain.',
    ],
    originalDocumentNotes: [
      'If the receiving authority expects a physical or formally authenticated document set, that should be identified before the post-issuance stage begins.',
    ],
    timelineNotes: [
      'Timing usually depends on the official application review, fingerprint logistics, and whether apostille, translation, or further cross-border steps are required after issuance.',
      'Police-clearance matters are often time-sensitive in practice, so recent-issue expectations should be checked before the certificate is obtained too early.',
    ],
    feeNotes: [
      'Government fees, fingerprint costs, courier costs, and any post-issuance authentication costs can all affect the final document budget.',
      'EGS charges only for administrative coordination and document-route support as an independent intermediary.',
    ],
    extraStepNotes: [
      'Apostille is usually relevant only if the destination country accepts Hague apostilles for this type of document.',
      'Translation may still be needed even after apostille if the receiving authority does not accept English-only filing.',
      'Some cases remain applicant-controlled at the SPF portal or fingerprint stage even where later coordination support is provided.',
    ],
    reportSections: [
      {
        heading: t('What the Singapore COC usually proves'),
        paragraphs: mapTexts([
          'A Singapore Certificate of Clearance is generally used to show whether an applicant has a criminal record in Singapore. In practice, overseas authorities request it for immigration, employment, study, residency, licensing, and related compliance matters.',
          'The certificate itself is only one part of the international-use question. The other part is whether the receiving country accepts the certificate in its issued form or expects an additional authentication chain.',
        ]),
      },
      {
        heading: t('Typical 2026 application path'),
        paragraphs: mapTexts([
          'The usual path starts with the official online application, followed by payment of the applicable fee and submission of the required supporting details. Fingerprint handling is often a key operational step, especially where the applicant is outside Singapore.',
          'After review by the issuing authority, the certificate is issued according to the current official release method. Once issued, the overseas-use analysis becomes destination-led: some cases move into apostille, some into legalisation, and some require additional translation or certified-copy handling.',
        ]),
      },
      {
        heading: t('When apostille may be needed'),
        paragraphs: mapTexts([
          'If the COC will be used outside Singapore, the next step may depend on whether the destination country is a Hague Apostille Convention member and on what the receiving authority actually accepts.',
          'Apostille can simplify cross-border use in Hague cases, but it does not automatically answer every downstream requirement. Translation, recent-issue preferences, and document-format expectations can still matter.',
        ]),
      },
      {
        heading: t('What to check before you start'),
        paragraphs: mapTexts([
          'Before starting, it usually helps to confirm the country of use, the reason the certificate is being requested, any recent-issue requirement, and whether the receiving side has said anything about apostille, legalisation, or translation.',
          'Those details make the later route advice much more precise and usually reduce repeat work.',
        ]),
      },
    ],
    faq: [
      {
        question: 'Is a Singapore COC always enough once it is issued?',
        answer:
          'Not necessarily. For overseas use, the certificate may still need apostille, legalisation, translation, or another supporting step depending on the destination country and receiving authority.',
      },
      {
        question: 'Does apostille mean no further steps are required?',
        answer:
          'No. Apostille usually confirms the authenticity chain for use in Hague countries, but the receiving authority may still ask for translation, supporting documents, or a different document format.',
      },
      {
        question: 'Can EGS apply for the COC entirely on behalf of the client?',
        answer:
          'That depends on the current official rules and on whether personal attendance, applicant-controlled portal steps, or fingerprint submission are required. EGS can assist with coordination and preparation where permitted.',
      },
    ],
    relatedGuideSlugs: [
      'australian-police-check-for-overseas-use',
      'overseas-issued-documents-for-use-in-australia',
      'singapore-issued-academic-documents-for-use-in-australia',
    ],
    relatedSampleKeys: ['singapore-police-check'],
    officialLinks: [
      {
        label: t('Singapore Police Force: Certificate of Clearance'),
        url: 'https://www.police.gov.sg/e-Services/Police-Licences/Certificate-of-Clearance',
      },
      {
        label: t('Singapore Academy of Law: Apostille / Legalisation'),
        url: 'https://legalisation.sal.sg/',
      },
    ],
    routeCategory: 'police',
    heroKicker: 'Police document route',
    heroImage: '/samples/singapore/singapore-certificate-of-clearance-reference/source.png',
    heroImageWatermarked: true,
    heroPdf: {
      src: '/samples/singapore/singapore-certificate-of-clearance-reference/protected.svg',
      pages: 2,
      previewImages: [
        '/samples/singapore/singapore-certificate-of-clearance-reference/page-1.png',
        '/samples/singapore/singapore-certificate-of-clearance-reference/page-2.png',
      ],
      watermarked: true,
    },
    prefill: {
      issuingSlug: 'singapore',
      documentSlug: 'police-check',
    },
  }),
  documentRouteGuide({
    slug: 'fbi-identity-history-summary-for-overseas-use',
    publishedAt: '2026-03-10',
    featured: true,
    title: 'FBI Identity History Summary for Overseas Use',
    seoTitle: 'FBI Identity History Summary for Overseas Use | EGS Guides',
    metaDescription:
      'Clear guide to FBI Identity History Summary applications, apostille pathways, and cross-border use for immigration, work, study, licensing, and international filing.',
    excerpt:
      'If you need an FBI Identity History Summary for immigration, overseas work, study, residency, licensing, or other international purposes, the key question is not only how to obtain the FBI record, but whether the issued document will also need apostille, translation, or further authentication before it can be accepted abroad.',
    issuingCountry: 'United States',
    destinationCountry: 'Overseas use',
    documentTypes: ['FBI Identity History Summary', 'FBI Background Check'],
    primaryKeyword: 'fbi identity history summary for overseas use',
    relatedKeywords: [
      'fbi background check apostille',
      'fbi identity history summary apostille',
      'fbi police clearance overseas use',
      'fbi background check for immigration abroad',
    ],
    summaryPoints: [
      'The first issue is usually obtaining the correct FBI-issued record through the current application and fingerprint process.',
      'For overseas use, the next step may involve apostille, authentication, translation, or a more specific destination-country chain.',
      'Recent-issue expectations, fingerprint quality, and document format can all affect whether the final file is usable abroad.',
    ],
    whoThisGuideIsFor: [
      'Applicants who need an FBI Identity History Summary for migration, overseas work, study, residency, licensing, or another international filing.',
      'Former U.S. residents or applicants with U.S. record exposure who have been asked to provide a U.S. federal police clearance document abroad.',
      'Users who want to understand not only the FBI request process, but also the overseas-use path after the summary is issued.',
    ],
    commonDocumentTypesCovered: [
      'FBI Identity History Summary issued through the Federal Bureau of Investigation',
      'FBI background check used in immigration, employment, academic, and licensing application packs',
      'FBI-issued result reviewed together with apostille, translation, or destination-side acceptance requirements',
    ],
    routeOverview: {
      heading: t('Typical FBI Identity History Summary application path'),
      paragraphs: mapTexts([
        'The exact process depends on the applicant’s circumstances and the current FBI or approved submission-channel requirements. In general, the route usually starts with identity details, payment, and fingerprint handling.',
        'After the request is processed, the FBI issues the result according to the submission route used. Once the summary is issued, the overseas-use question becomes destination-led: some countries accept the federal document directly, while others expect apostille, authentication, translation, or a more specific supporting-document chain.',
      ]),
      bullets: mapTexts([
        'Prepare identification details and the current request fee.',
        'Complete fingerprint submission carefully, because poor-quality prints can delay or derail the process.',
        'Check the issued result before assuming it is ready for international use.',
      ]),
    },
    requirements: [
      'Passport or identity details matching the FBI request',
      'Country of use and the receiving authority, employer, university, or immigration body if known',
      'Any instruction showing why the FBI background check is required',
      'Any destination requirement about apostille, translation, or recent issue dates',
    ],
    digitalDocumentNotes: [
      'Electronic submission can be faster, but the format accepted by the overseas receiver should still be checked before relying on a digital-only workflow.',
    ],
    originalDocumentNotes: [
      'If the destination authority expects a physically authenticated federal document, the post-issuance step should be planned before assuming the electronic FBI result is enough.',
    ],
    timelineNotes: [
      'Processing time depends on the request route, fingerprint submission quality, and whether apostille or translation is needed after issuance.',
      'The FBI states that it does not offer expedited service, although electronic requests are generally faster than mail-based handling.',
    ],
    feeNotes: [
      'The FBI currently lists the Identity History Summary request fee as USD 18 per request.',
      'The U.S. Department of State currently lists apostille or authentication service at USD 20 per document for eligible federal documents.',
      'EGS charges only for administrative coordination and cross-border document support as an independent intermediary.',
    ],
    extraStepNotes: [
      'Apostille is usually relevant only where the destination country or receiving institution actually requires it for international acceptance.',
      'For non-Hague destinations, the route may move into authentication or consular legalisation instead of apostille.',
      'Some receiving authorities may also require certified translation or a broader supporting-document pack.',
    ],
    reportSections: [
      {
        heading: t('What is an FBI Identity History Summary?'),
        paragraphs: mapTexts([
          'An FBI Identity History Summary, often called an FBI background check or FBI police clearance, is an official record issued through the Federal Bureau of Investigation. It is generally used to show whether an individual has a criminal history record within the FBI system.',
          'In practice, it is commonly requested where an applicant must present a U.S. federal police history record to an overseas government, employer, university, regulator, or licensing body.',
        ]),
        bullets: mapTexts([
          'Immigration and residency applications',
          'Overseas employment or work-permit submissions',
          'Student visa and academic admission requirements',
          'Professional licensing or registration matters',
          'Family, compliance, or relocation-related applications',
        ]),
      },
      {
        heading: t('Who may need an FBI background check?'),
        paragraphs: mapTexts([
          'You may need an FBI Identity History Summary if you have lived in the United States, have U.S. record exposure relevant to an overseas application, or have been asked by a foreign authority to provide a U.S. federal police clearance document.',
          'This is common in migration, international employment, overseas study, long-term visa processing, and regulated professional pathways.',
        ]),
      },
      {
        heading: t('When apostille or further authentication may be required'),
        paragraphs: mapTexts([
          'If the FBI Identity History Summary will be used outside the United States, additional authentication may be required before the receiving authority will accept it.',
          'Where the destination country is a Hague Apostille Convention member, apostille may be the appropriate next step. Where the destination country is not in the Hague system, authentication or consular legalisation may be required instead. The U.S. Department of State handles apostille and authentication for eligible federal documents.',
        ]),
        bullets: mapTexts([
          'For Hague countries: apostille may be the recognised authentication method.',
          'For non-Hague countries: authentication or embassy/legalisation may apply instead.',
          'For translated submissions: some receivers may also require certified translation of the FBI record and related authentication documents.',
        ]),
      },
      {
        heading: t('Why document flow matters'),
        paragraphs: mapTexts([
          'An FBI background check is only one part of the international submission chain. Problems usually arise when applicants assume that the FBI-issued result alone is enough, without checking whether the destination authority also requires apostille, translation, recent issue dates, or supporting documents.',
          'In practice, acceptance standards differ between countries, employers, universities, migration authorities, and professional bodies. That is why document-route planning matters before submission.',
        ]),
      },
      {
        heading: t('How EGS helps'),
        paragraphs: mapTexts([
          'EGS assists clients with the coordination side of international document use. For FBI Identity History Summary matters, this may include reviewing the destination country, identifying likely authentication requirements, assisting with translation planning, and helping structure the overall submission path more clearly.',
          'Our role is administrative and procedural. We focus on cross-border usability, preparation clarity, and reducing avoidable delays caused by format mismatches or incomplete planning.',
        ]),
      },
    ],
    faq: [
      {
        question: 'Is an FBI Identity History Summary enough by itself for overseas use?',
        answer:
          'Not always. Some receiving authorities accept the FBI-issued record directly, while others require apostille, certified translation, or supporting materials.',
      },
      {
        question: 'Does every FBI background check need apostille?',
        answer:
          'No. Apostille is only relevant where the destination country or receiving institution requires it for international acceptance.',
      },
      {
        question: 'Does the FBI offer expedited processing?',
        answer:
          'The FBI states that it does not offer expedited service, although electronic requests are generally processed faster than mail-based submissions.',
      },
      {
        question: 'Can EGS obtain the FBI record directly for the client?',
        answer:
          'That depends on the official rules and the stage of the process. Some parts of the request may require direct applicant action, fingerprint submission, or identity-controlled steps. EGS can assist with coordination and preparation where permitted.',
      },
    ],
    relatedGuideSlugs: [
      'singapore-certificate-of-clearance-for-overseas-use',
      'australian-police-check-for-overseas-use',
      'overseas-issued-documents-for-use-in-australia',
    ],
    relatedSampleKeys: [],
    officialLinks: [
      {
        label: t('FBI: Identity History Summary Checks FAQs'),
        url: 'https://www.fbi.gov/how-we-can-help-you/more-fbi-services-and-information/identity-history-summary-checks/identity-history-summary-checks-faqs',
      },
      {
        label: t('U.S. Department of State: Requesting Authentication Services'),
        url: 'https://travel.state.gov/content/travel/en/replace-certify-docs/authenticate-your-document/requesting-authentication-services.html',
      },
      {
        label: t('U.S. Department of State: Preparing a Document for an Apostille Certificate'),
        url: 'https://travel.state.gov/content/travel/en/records-and-authentications/authenticate-your-document/apostille-requirements.html',
      },
    ],
    routeCategory: 'police',
    heroKicker: 'United States document guide',
    heroImage: '/samples/usa/fbi-identity-history-summary-reference/source.png',
    heroImageWatermarked: true,
    heroPdf: {
      src: '/samples/usa/fbi-identity-history-summary-reference/protected.svg',
      pages: 1,
      watermarked: true,
    },
    prefill: {
      issuingSlug: 'usa',
      documentSlug: 'police-check',
    },
  }),
  documentRouteGuide({
    slug: 'australian-power-of-attorney-for-overseas-use',
    publishedAt: '2026-03-10',
    featured: true,
    title: 'Power of Attorney Notarisation and Apostille in Australia',
    seoTitle: 'Power of Attorney Notarisation and Apostille in Australia | EGS Guides',
    metaDescription:
      'Practical guide to Australian power of attorney signing, notarisation, apostille, in-person signing, video signing, and cross-border use.',
    excerpt:
      'A Power of Attorney is one of the most common documents in cross-border matters. Where it is signed in Australia for use overseas, the real issue is not only drafting the document clearly, but making sure the signing, notarisation, and authentication pathway matches the expectations of the receiving authority.',
    issuingCountry: 'Australia',
    destinationCountry: 'Overseas use',
    documentTypes: ['Power of Attorney'],
    primaryKeyword: 'power of attorney notarisation and apostille in australia',
    relatedKeywords: [
      'australian power of attorney overseas use',
      'power of attorney apostille australia',
      'power of attorney notary public australia',
      'video signing power of attorney australia',
    ],
    summaryPoints: [
      'A power of attorney must usually be drafted with precision before anyone focuses on apostille or international use.',
      'For overseas use, signing alone is rarely enough. The practical chain often runs from drafting to signing, notarisation, apostille, and then destination-side submission.',
      'In-person signing is still the more robust option in higher-risk matters, while video signing may be available in some cases but should be assessed against final acceptance standards.',
    ],
    whoThisGuideIsFor: [
      'Individuals signing a power of attorney in Australia for use overseas in property, litigation, banking, family, company, or administrative matters.',
      'Applicants choosing between in-person signing and video signing for a document that may later require notarisation and apostille.',
      'Clients who need the document to work in China or another Hague Convention jurisdiction and want the execution chain checked before signing.',
    ],
    commonDocumentTypesCovered: [
      'Power of attorney for property sale or transfer',
      'Power of attorney for banking, inheritance, family, company, or administrative use',
      'Signed authority document intended for notarisation and international use',
    ],
    routeOverview: {
      heading: t('Typical power of attorney pathway'),
      paragraphs: mapTexts([
        'For a power of attorney signed in Australia and intended for overseas use, the route usually starts with the final draft and the execution method. The useful first question is whether the document is in a form suitable for signing before a notary or another authorised witness, not whether the applicant has already been told the word apostille.',
        'Once the document is ready for execution, the next question is whether the receiving country or institution will accept an Australian notarial-apostille chain, a consular or official witnessing route, or a more specific signing model. That is why execution method and destination use should be checked together from the start.',
      ]),
      bullets: mapTexts([
        'Draft first, sign second.',
        'Treat signing method as part of the route, not as a separate detail.',
        'Check the receiving authority before assuming that video signing or a simplified chain will be accepted.',
      ]),
    },
    requirements: [
      'Unsigned power of attorney draft in its final or near-final form',
      'Valid passport or other government-issued photo identification',
      'Current residential address details',
      'Full details of the attorney or authorised representative',
      'Any supporting material about the underlying matter, such as property, bank, court, family, or company details',
    ],
    originalDocumentNotes: [
      'As a general rule, the document should not be signed in advance unless the responsible professional or authority has specifically instructed that approach.',
    ],
    timelineNotes: [
      'Timing depends on whether the draft is already settled, whether signing can be arranged quickly, and whether apostille or translation is needed after notarisation.',
      'Where video signing is being considered, extra procedural checks may affect timing because acceptance and execution requirements are not the same in every case.',
    ],
    feeNotes: [
      'The overall cost may include drafting support, signing logistics, notarial handling, apostille, translation, courier, and destination-side preparation costs depending on the matter.',
      'EGS charges only for administrative and procedural coordination as an independent intermediary.',
    ],
    extraStepNotes: [
      'Translation may still be required even after notarisation and apostille if the receiving authority does not accept an English-only document.',
      'In higher-value or more sensitive matters, the receiving institution may scrutinise the signing method closely, especially where remote execution is involved.',
      'A consular or official witnessing route may be available in some cases, but it is usually narrower in scope and should be checked carefully before relying on it.',
    ],
    reportSections: [
      {
        heading: t('What is a power of attorney?'),
        paragraphs: mapTexts([
          'A power of attorney is a document by which one person authorises another person to act on their behalf in relation to specific matters. In cross-border use, it is commonly required where the principal cannot attend in person and needs another person to deal with property, litigation, banking, family, company, or administrative affairs.',
          'To work properly, the document usually needs to identify the principal, the attorney, the specific authorised acts, the scope of authority, the validity period, and any limitations or conditions. A vague or overly broad document may still be rejected even if the signature has been properly notarised.',
        ]),
      },
      {
        heading: t('Why notarisation and apostille matter'),
        paragraphs: mapTexts([
          'For international use, signing the document alone is usually not enough. In Australia, notarisation is generally carried out by a Notary Public, who verifies identity, witnesses signing, and applies the notarial seal or certificate to confirm the execution process.',
          'If the document will be used in another Hague Convention jurisdiction, apostille may then be required. In Australia, apostilles are issued by DFAT and confirm the authenticity of the Australian notary’s signature and seal so the document can be recognised internationally.',
        ]),
      },
      {
        heading: t('Main pathway 1: Australian Notary Public and apostille'),
        paragraphs: mapTexts([
          'This is the most broadly recognised route for documents signed in Australia and intended for use overseas. Under this pathway, the power of attorney is signed before an Australian Notary Public, notarised in Australia, and then submitted for apostille where required.',
          'It is often suitable where the document will be used in China or another Hague member jurisdiction, where the matter involves property, litigation, or significant legal rights, or where the receiving institution expects a formal Australian notarial chain.',
        ]),
      },
      {
        heading: t('Main pathway 2: consular or other official witnessing routes'),
        paragraphs: mapTexts([
          'In some cases, applicants may look at a consular or other official witnessing route instead of the standard notarial-apostille chain. Whether that route is available depends on nationality, residence status, document purpose, and the final receiving authority.',
          'This pathway may be more limited in scope and may not be suitable for all powers of attorney, especially where major property disposal, significant financial interests, or institution-specific formalities are involved.',
        ]),
      },
      {
        heading: t('In-person signing vs video signing'),
        paragraphs: mapTexts([
          'In-person signing remains the traditional and most widely accepted model. It is usually preferred for property-related authorities, high-value or sensitive legal matters, and cases where the receiving side is likely to scrutinise the execution method closely.',
          'Video signing may be available in some circumstances and can offer flexibility for applicants who are far from major city centres or face travel or scheduling constraints. Even where it is legally possible, the more important question is whether the final recipient will accept it without hesitation.',
        ]),
      },
      {
        heading: t('What to prepare before you start'),
        paragraphs: mapTexts([
          'The strongest starting point is usually an unsigned draft, clear ID, the attorney’s full details, and the supporting facts behind the matter itself. That makes it easier to decide whether the case is suitable for an ordinary notarial-apostille path, a more cautious in-person route, or a more limited video-signing model.',
          'Where the document will be used in a non-English-speaking jurisdiction, translation should also be considered against the exact institution that will receive it rather than assumed in the abstract.',
        ]),
      },
      {
        heading: t('How EGS helps'),
        paragraphs: mapTexts([
          'EGS assists clients with the coordination side of cross-border document preparation. For power of attorney matters, this may include reviewing the country of use, helping identify the likely notarisation and apostille path, assisting with bilingual document preparation, and coordinating the next practical steps for international use.',
          'Our role is administrative and procedural. We focus on structure, clarity, and reducing avoidable delays caused by incomplete preparation or mismatched document pathways.',
        ]),
      },
    ],
    faq: [
      {
        question: 'Is signing the power of attorney enough for overseas use?',
        answer:
          'Usually not. In many international-use cases, the document also needs notarisation and may then require apostille or another authentication step depending on the destination.',
      },
      {
        question: 'Is video signing always acceptable?',
        answer:
          'No. Video signing may be possible in some circumstances, but final acceptance depends on the governing framework and, importantly, on whether the receiving institution will accept a remotely witnessed document without difficulty.',
      },
      {
        question: 'Should the document be signed in advance?',
        answer:
          'As a general rule, no. The document should usually remain unsigned until the responsible professional or authority confirms the execution method.',
      },
      {
        question: 'Can EGS issue notarial certificates or apostilles?',
        answer:
          'No. EGS is an independent document coordination service provider. EGS is not a law firm, not a Notary Public, and not a government authority.',
      },
    ],
    relatedGuideSlugs: [
      'australian-company-documents-for-overseas-use',
      'australian-company-registry-certificate-for-overseas-use',
      'australian-birth-certificate-for-overseas-use',
    ],
    relatedSampleKeys: [],
    routeCategory: 'civil',
    heroKicker: 'Australian document guide',
    heroImage: '/samples/australia/australia-power-of-attorney-reference/source.png',
    heroImageWatermarked: true,
    heroPdf: {
      src: '/samples/australia/australia-power-of-attorney-reference/protected.svg',
      pages: 1,
      watermarked: true,
    },
    prefill: {
      issuingSlug: 'australia',
      documentSlug: 'power-of-attorney',
    },
  }),
  documentRouteGuide({
    slug: 'australian-marriage-certificate-for-use-overseas',
    publishedAt: '2026-03-10',
    featured: false,
    title: 'Australian Marriage Certificate for Use Overseas',
    seoTitle: 'Australian Marriage Certificate for Use Overseas | EGS Guides',
    metaDescription:
      'Practical guide to using an Australian marriage certificate overseas, including the difference between ceremonial and registry certificates, common family-use scenarios, translation, and document preparation.',
    excerpt:
      'A practical guide to Australian marriage certificates for overseas use, including which certificate version is usually required, how family-use cases differ, and what to prepare before apostille, authentication, or legalisation is considered.',
    intro: [
      'An Australian marriage certificate is commonly used for spouse visas, family registration, civil-status updates, school and housing matters, inheritance matters, and other overseas administrative processes. In most cross-border cases, the real problem is not whether the couple is married, but whether the document in hand is the correct registry-issued certificate and whether any name or identity records need to move with it.',
      'This guide explains the difference between ceremonial and registry certificates, the family-use scenarios in which Australian marriage certificates are most commonly requested, and the practical issues that should be checked before moving into apostille, authentication, translation, or broader overseas submission planning.',
    ],
    issuingCountry: 'Australia',
    destinationCountry: 'Overseas use',
    documentTypes: ['Marriage Certificate'],
    primaryKeyword: 'australian marriage certificate for use overseas',
    relatedKeywords: [
      'marriage certificate apostille australia',
      'australian marriage certificate overseas use',
      'dfat marriage certificate authentication',
      'marriage certificate legalisation australia',
    ],
    summaryPoints: [
      'The first issue is usually whether the document is the formal registry-issued marriage certificate, not the ceremonial certificate presented on the day of marriage.',
      'Marriage-certificate routes often overlap with passport names, previous names, spouse-visa filing, family registration, and translation questions.',
      'The same certificate can be accepted differently depending on whether it is being used for migration, civil registration, banking, education, or another family-related purpose.',
    ],
    whoThisGuideIsFor: [
      'Clients using an Australian marriage certificate for migration, spouse registration, family law, bank, school, or administrative use overseas.',
      'Applicants who are unsure whether the certificate in hand is the formal registry version usually reviewed for overseas use.',
      'Users who need the route checked alongside passport names, translations, or related identity records.',
    ],
    commonDocumentTypesCovered: [
      'Registry-issued marriage certificate',
      'Fresh replacement marriage certificate',
      'Marriage certificate reviewed together with passport or change-of-name documents',
    ],
    routeOverview: {
      heading: t('Typical route overview'),
      paragraphs: mapTexts([
        'For overseas use, an Australian marriage certificate usually needs to be checked in two stages. First, confirm that the document is the official state or territory registry certificate. Second, confirm what the destination authority actually wants to see with it, such as passport identity support, previous-name evidence, translation, or other family-status documents.',
        'Once the certificate version is settled, the route usually turns on the country of use, the filing purpose, and whether the marriage certificate is travelling alone or as part of a wider spouse, migration, or family-status pack.',
      ]),
      bullets: mapTexts([
        'Registry certificate first, ceremonial certificate second.',
        'Family-related use cases often require translation and name-consistency review.',
        'The destination authority matters because spouse visa, civil registration, and administrative use do not always apply the same expectations.',
      ]),
    },
    requirements: [
      'Full scan of the marriage certificate currently held',
      'Destination country and intended use such as registration, immigration, bank, or school matter',
      'Any supporting identity document if names have changed since marriage',
      'Any translation or downstream filing instruction from the receiver',
    ],
    originalDocumentNotes: [
      'If the certificate in hand is ceremonial rather than registry-issued, a fresh official certificate may be needed before route handling begins.',
    ],
    timelineNotes: [
      'Timelines depend on whether the current certificate is already fit for route review. Replacement ordering, translation, and supporting-document collection often create more delay than the legalisation stage itself.',
      'Any timeframe discussed before review should be treated as indicative only because family-use routes vary widely by destination and use case.',
    ],
    feeNotes: [
      'Fees depend on the route confirmed after review and on whether supporting records, translations, or replacement documents are required.',
      'EGS coordinates as an independent administrative intermediary only and does not hold authority status.',
    ],
    extraStepNotes: [
      'Name changes after marriage often require passport or change-of-name support at intake.',
      'Family registration or spouse-visa matters may require a broader document pack than one certificate alone.',
      'Translation quality and name alignment often affect downstream acceptance.',
    ],
    reportSections: [
      {
        heading: t('What an Australian marriage certificate usually is'),
        paragraphs: mapTexts([
          'In overseas-use matters, the useful document is usually the official marriage certificate issued by the births, deaths and marriages registry in the relevant Australian state or territory. Many couples also hold a ceremonial certificate from the wedding day, but that is often not the version foreign authorities want to see.',
          'That difference matters because a genuine ceremonial certificate can still be the wrong document for the route. In practice, confirming the certificate type early removes a large amount of avoidable repeat work.',
        ]),
      },
      {
        heading: t('Common overseas uses'),
        paragraphs: mapTexts([
          'Australian marriage certificates are commonly used for spouse migration, family registration, proof of relationship, inheritance matters, banking, school administration, housing, and other civil-status filings. The certificate may be the same, but the support documents and translation requirements can change depending on who is receiving it.',
          'A family registry, migration authority, foreign court, bank, or school may each assess the same marriage certificate through a different practical lens. That is why the purpose of use should be identified before the route is assumed.',
        ]),
      },
      {
        heading: t('What customers should prepare before intake'),
        paragraphs: mapTexts([
          'The strongest starting set usually includes the certificate itself, the destination country, the reason the certificate is being filed, and any supporting identity or change-of-name document that helps explain the family-status history. Where a receiver has given written instructions, that wording should also be included.',
          'These details are what make route review commercially useful. Without them, it is difficult to tell whether the certificate is sufficient on its own or needs to move with a broader family document pack.',
        ]),
      },
    ],
    faq: [
      {
        question: 'Can I use my wedding-day certificate?',
        answer:
          'Sometimes clients use that term loosely, but overseas routes usually begin by checking whether the certificate is the formal registry-issued document rather than a ceremonial certificate.',
      },
      {
        question: 'Does the marriage certificate route always stand alone?',
        answer:
          'No. It is common for the route to involve identity support, name-change records, or translation depending on the destination use.',
      },
      {
        question: 'Can EGS guarantee overseas family-law acceptance?',
        answer:
          'No. EGS is an independent administrative intermediary and does not provide legal advice or guarantee acceptance by the receiving authority.',
      },
    ],
    relatedGuideSlugs: [
      'australian-birth-certificate-for-use-in-china',
      'australian-police-check-for-overseas-use',
      'overseas-issued-documents-for-use-in-australia',
    ],
    relatedSampleKeys: ['australia-marriage-certificate'],
    routeCategory: 'civil',
    heroKicker: 'Civil document route',
    heroImage: '/samples/australia/australia-marriage-certificate-reference/source.png',
    heroImageWatermarked: true,
    heroPdf: {
      src: '/samples/australia/australia-marriage-certificate-reference/protected.svg',
      pages: 3,
      previewImages: [
        '/samples/australia/australia-marriage-certificate-reference/page-1.png',
        '/samples/australia/australia-marriage-certificate-reference/page-2.png',
        '/samples/australia/australia-marriage-certificate-reference/page-3.png',
      ],
      watermarked: true,
    },
    prefill: {
      issuingSlug: 'australia',
      documentSlug: 'marriage-certificate',
    },
  }),
  documentRouteGuide({
    slug: 'australian-birth-certificate-for-overseas-use',
    publishedAt: '2026-03-10',
    featured: false,
    title: 'Australian Birth Certificate for Overseas Use',
    seoTitle: 'Australian Birth Certificate for Overseas Use | EGS Guides',
    metaDescription:
      'Practical guide to using an Australian birth certificate overseas, including which registry version is usually required, how to obtain it, and what to check before authentication or legalisation is considered.',
    excerpt:
      'A practical guide to Australian birth certificates for overseas use, including which certificate version is usually needed, how applicants obtain it, and what should be checked before translation, apostille, authentication, or legalisation is considered.',
    intro: [
      'Australian birth certificates are commonly used overseas for immigration, family registration, school enrolment, court matters, and other formal filings. In many cases, the real issue is not whether the birth took place in Australia, but whether the certificate in hand is the right registry-issued version for the overseas authority that will receive it.',
      'This guide explains which birth certificate version is usually required, how applicants commonly obtain or replace it, and what should be checked before translation, apostille, authentication, or broader overseas-use planning is assumed.',
    ],
    issuingCountry: 'Australia',
    destinationCountry: 'Overseas use',
    documentTypes: ['Birth Certificate'],
    primaryKeyword: 'australian birth certificate for overseas use',
    relatedKeywords: [
      'australian birth certificate apostille',
      'birth certificate authentication australia',
      'dfat birth certificate overseas',
      'registry birth certificate legalisation australia',
    ],
    summaryPoints: [
      'The starting point is usually the official state or territory registry certificate, not a keepsake copy or short extract.',
      'Many delays come from the wrong certificate version, poor condition, or missing name-support records rather than from the later authentication stage.',
      'Translation, name consistency, and the need for a fuller registry certificate should be checked early.',
      'If the correct certificate is not yet in hand, ordering it from the registry is often the real first step.',
    ],
    whoThisGuideIsFor: [
      'Clients using an Australian birth certificate for migration, school registration, family registration, court, visa, or administrative use overseas.',
      'Parents and adult applicants who are unsure whether the certificate in hand is the registry-issued version usually reviewed first.',
      'Users who have been told they need apostille, authentication, or legalisation but have not yet checked the destination authority wording.',
    ],
    commonDocumentTypesCovered: [
      'Australian state or territory registry birth certificate',
      'Fresh replacement birth certificate ordered from the registry',
      'Birth certificate reviewed together with identity or name-change records where names do not align cleanly',
      'Long-form or fuller registry certificate where the overseas receiver does not accept a shorter extract',
    ],
    routeOverview: {
      heading: t('Typical route overview'),
      paragraphs: mapTexts([
        'For overseas use, an Australian birth certificate usually needs to be checked in two stages. First, confirm that the file is the formal state or territory registry certificate. Second, confirm what the destination authority actually wants to see with it, including whether a fuller certificate, translation, or supporting identity records are also expected.',
        'Once the certificate version is confirmed, the route usually turns on the country of use, the filing purpose, and whether the certificate is travelling alone or as part of a wider family, migration, court, or education pack. That is why the route is best confirmed after review rather than assumed from the country name alone.',
      ]),
      bullets: mapTexts([
        'Registry-issued certificate first.',
        'Translation and name-alignment issues often matter early.',
        'The destination use case can change whether one certificate is enough.',
      ]),
    },
    requirements: [
      'Clear scan of the full birth certificate, including registry details and all pages',
      'Country of use and the receiving authority, school, registry, employer, or court if known',
      'Any instruction mentioning apostille, authentication, legalisation, translation, or embassy steps',
      'Supporting identity or name-change record if the current passport details do not match the birth certificate exactly',
      'If the correct certificate has not yet been obtained, the issuing state or territory registry details',
    ],
    originalDocumentNotes: [
      'A clean registry-issued original or fresh replacement is usually the strongest starting point. Decorative copies, scans of partial pages, or old keepsake versions often weaken the route review.',
      'If the certificate is laminated, fragile, unclear, or incomplete, ordering a replacement copy is often the more efficient first move.',
    ],
    timelineNotes: [
      'Timing depends first on whether the certificate already sits in a usable registry format. If a replacement certificate, translation, or supporting identity document is still missing, that setup stage often controls the overall timeline.',
      'Any turnaround estimate before review should be treated as indicative only because civil-registry routes vary by destination, receiver expectations, and whether extra supporting records are needed.',
    ],
    feeNotes: [
      'Fees depend on the route confirmed after review and on whether translation, replacement certificates, or supporting-document handling is also required.',
      'EGS acts only as an independent administrative intermediary. EGS fees do not represent government, notarial, or consular fees alone.',
    ],
    extraStepNotes: [
      'A receiver may ask for a longer-form registry certificate rather than a shorter extract or simplified version.',
      'If the birth certificate is part of a family or migration pack, supporting records may need to be reviewed together rather than later.',
      'Translation or destination-specific downstream formalities may still apply after the Australian-side route is identified.',
    ],
    reportSections: [
      {
        heading: t('What an Australian birth certificate usually is'),
        paragraphs: mapTexts([
          'For overseas use, an Australian birth certificate is usually treated first as a civil-registry record. The useful document is normally the certificate issued by the births, deaths and marriages registry in the state or territory where the birth was registered.',
          'Many applicants do hold a genuine birth-related document, but not the version most useful for international filing. Keepsake copies, damaged certificates, or partial extracts often need to be replaced before the matter can move cleanly.',
        ]),
      },
      {
        heading: t('Common overseas uses of an Australian birth certificate'),
        paragraphs: mapTexts([
          'Australian birth certificates are commonly used for visa and immigration filings, family registration, school enrolment, citizenship or identity matters, and court or probate work. The document may be the same, but the receiving authority often applies different practical requirements.',
          'A migration case may focus on identity alignment and translation, while a registry, school, or court matter may focus more on certificate type, completeness, and whether related family records should be filed at the same time.',
        ]),
        bullets: mapTexts([
          'Immigration and visa applications',
          'Family registration or relationship-status matters',
          'School or university enrolment',
          'Court, probate, or administrative filing',
        ]),
      },
      {
        heading: t('How applicants usually obtain the correct birth certificate'),
        paragraphs: mapTexts([
          'If the applicant does not already hold the right certificate, the practical starting point is usually the births, deaths and marriages registry in the state or territory where the birth was registered. In many cases, ordering a fresh registry-issued certificate is more reliable than relying on an older family copy.',
          'The key issue is not only whether a replacement can be ordered, but which version should be ordered. Some overseas matters work better with a fuller registry certificate than with a shorter extract, especially if translation or related identity records will also be reviewed.',
        ]),
        bullets: mapTexts([
          'Check the state or territory registry where the birth was registered',
          'Confirm whether a full or long-form certificate is likely to be more useful than a short extract',
          'If names or personal details have changed, prepare supporting records at the same time',
          'Avoid starting translation or route handling until the final certificate version is clear',
        ]),
      },
      {
        heading: t('What overseas authorities usually care about in practice'),
        paragraphs: mapTexts([
          'Overseas authorities usually care about more than the existence of the certificate. They commonly check whether the certificate is complete, whether names match current identity records, whether translation is needed, and whether the certificate version suits the filing purpose.',
          'A visa application, a family-registration matter, a school enrolment file, and a court process may all begin with the same birth certificate, but they do not always require the same support documents.',
        ]),
      },
      {
        heading: t('What customers should prepare before intake'),
        paragraphs: mapTexts([
          'Before starting, it is usually worth preparing the certificate itself, the country of use, any instruction from the receiving authority, and any identity or name-change record that explains differences between current and historical names.',
          'That context makes the review more accurate and usually saves time later. Without it, the route discussion tends to stay too general to be genuinely useful.',
        ]),
      },
    ],
    faq: [
      {
        question: 'Can I use the birth certificate I already have at home?',
        answer:
          'Sometimes yes, but review usually starts by checking whether it is the formal registry-issued certificate in a suitable condition and format for overseas use.',
      },
      {
        question: 'What if I do not yet have the correct Australian birth certificate?',
        answer:
          'In many cases the best first step is to obtain a fresh registry-issued certificate from the relevant Australian state or territory registry before translation or route handling begins.',
      },
      {
        question: 'Does every country use the same route for an Australian birth certificate?',
        answer:
          'No. The route usually depends on the destination authority, the exact certificate version, and whether translation or supporting records are also needed.',
      },
      {
        question: 'Does EGS issue the apostille or guarantee overseas acceptance?',
        answer:
          'No. EGS is an independent administrative intermediary only. The route is confirmed after review and final acceptance remains with the receiving authority.',
      },
    ],
    relatedGuideSlugs: [
      'australian-birth-certificate-for-use-in-china',
      'australian-marriage-certificate-for-use-overseas',
      'australian-police-check-for-overseas-use',
    ],
    relatedSampleKeys: ['australia-birth-certificate'],
    officialLinks: [
      {
        label: t('NSW Registry of Births, Deaths and Marriages'),
        url: 'https://www.nsw.gov.au/family-and-relationships/births/get-a-birth-certificate',
      },
      {
        label: t('Victoria Births, Deaths and Marriages'),
        url: 'https://www.bdm.vic.gov.au/births/get-a-birth-certificate',
      },
      {
        label: t('Queensland Registry of Births, Deaths and Marriages'),
        url: 'https://www.qld.gov.au/law/births-deaths-marriages-and-divorces/birth-certificates/applying-for-a-birth-certificate',
      },
      {
        label: t('Western Australia Registry of Births, Deaths and Marriages'),
        url: 'https://www.wa.gov.au/service/justice/civil-law/apply-birth-death-marriage-or-change-name-certificate',
      },
    ],
    routeCategory: 'civil',
    heroKicker: 'Civil document route',
    heroImage: '/samples/australia/australia-birth-certificate-apostille-reference/source.png',
    heroImageWatermarked: true,
    heroPdf: {
      src: '/samples/australia/australia-birth-certificate-apostille-reference/protected.svg',
      pages: 3,
      previewImages: [
        '/samples/australia/australia-birth-certificate-apostille-reference/page-1.png',
        '/samples/australia/australia-birth-certificate-apostille-reference/page-2.png',
        '/samples/australia/australia-birth-certificate-apostille-reference/page-3.png',
      ],
      watermarked: true,
    },
    prefill: {
      issuingSlug: 'australia',
      documentSlug: 'birth-certificate',
    },
  }),
  documentRouteGuide({
    slug: 'australian-degree-certificate-for-overseas-use',
    publishedAt: '2026-03-10',
    featured: false,
    title: 'Australian Degree Certificate for Overseas Use',
    seoTitle: 'Australian Degree Certificate for Overseas Use | EGS Guides',
    metaDescription:
      'Practical guide to using an Australian degree certificate overseas, including what the document proves, when transcripts are also needed, and how academic routes are usually prepared.',
    excerpt:
      'A practical guide to Australian degree certificates for overseas use, including common academic-file combinations, digital versus paper issue questions, and what to prepare before legalisation or verification steps are discussed.',
    intro: [
      'Australian degree certificates are commonly used overseas for employment, further study, migration, qualification assessment, and professional licensing. In most cases, the useful question is not only whether the degree certificate is genuine, but whether the degree certificate alone is enough for the receiving authority.',
      'This guide explains what an Australian degree certificate usually proves, why many overseas receivers also ask for the transcript or another academic record, and how to prepare the academic file before apostille, authentication, legalisation, or direct verification is considered.',
    ],
    issuingCountry: 'Australia',
    destinationCountry: 'Overseas use',
    documentTypes: ['Degree Certificate'],
    primaryKeyword: 'australian degree certificate for overseas use',
    relatedKeywords: [
      'australian degree apostille',
      'degree certificate authentication australia',
      'australian university degree legalisation',
      'dfat degree certificate overseas',
    ],
    summaryPoints: [
      'A degree certificate is often only one part of the academic pack. Many receivers also want the transcript, completion letter, or another supporting record.',
      'The main issue is usually whether the file is institution-issued, complete, and acceptable in the format being presented.',
      'Route labels such as apostille, authentication, attestation, and legalisation only become useful after the academic-file question is settled.',
    ],
    whoThisGuideIsFor: [
      'Graduates using an Australian degree certificate for overseas employment, further study, migration, licensing, or institutional filing.',
      'Applicants who hold the degree but are unsure whether the transcript, completion letter, or passport support should travel with it.',
      'Users who need the route checked before deciding whether to use an original, digital record, or copy-based academic file.',
    ],
    commonDocumentTypesCovered: [
      'Australian university degree certificate',
      'Degree certificate reviewed together with transcript or completion evidence',
      'Digitally issued academic file or issuer-generated PDF where receiver acceptance still needs review',
    ],
    routeOverview: {
      heading: t('Typical route overview'),
      paragraphs: mapTexts([
        'For overseas use, an Australian degree certificate is usually reviewed together with the wider academic pack. The starting point is whether the degree certificate is in a strong issuer-generated format and whether the transcript, graduation statement, or another academic record should travel with it.',
        'Once the academic pack is clear, the next question is how the destination authority wants to receive it. Some institutions are focused on direct academic verification, some on translation and document format, and others on a more formal authentication path. That is why the route is best confirmed after the full academic context is known.',
      ]),
      bullets: mapTexts([
        'Degree certificate first, but often not degree certificate alone.',
        'Academic pack completeness usually matters more than search-keyword language.',
        'Digital and paper issue formats may not be treated identically by every receiver.',
      ]),
    },
    requirements: [
      'Clear degree certificate file in the strongest issuer-generated format available',
      'Destination country and the receiving employer, regulator, school, or authority if known',
      'Any wording from the receiver mentioning apostille, authentication, legalisation, attestation, or direct academic verification',
      'Any transcript, completion letter, or supporting identity file likely to travel with the degree',
    ],
    digitalDocumentNotes: [
      'A digital record can be a strong starting point if it is clearly issuer-generated. The route still depends on receiver acceptance of that format and whether the wider academic pack is complete.',
    ],
    originalDocumentNotes: [
      'If the receiver expects paper presentation or a specific hard-copy route, a fresh paper issue may still be the better intake file.',
    ],
    timelineNotes: [
      'Academic timing depends heavily on document readiness. If the transcript or another supporting record still needs to be obtained, that setup stage often controls the timeline more than the later route stage itself.',
      'Any timing discussed before review should be treated as indicative only because destination institutions, employers, and regulators often apply different expectations.',
    ],
    feeNotes: [
      'Fees depend on the route confirmed after review and on whether the degree is travelling alone or as part of a wider academic pack.',
      'EGS charges only for administrative coordination and route handling as an independent intermediary.',
    ],
    extraStepNotes: [
      'Many cases are stronger when the degree and transcript are reviewed together at intake.',
      'Name differences across passport and academic files may require supporting identity or change-of-name material.',
      'Some non-Hague or more regulated destinations may still require additional steps after the academic pack is reviewed.',
    ],
    reportSections: [
      {
        heading: t('What an Australian degree certificate usually proves'),
        paragraphs: mapTexts([
          'An Australian degree certificate usually confirms that the award was conferred. It does not usually show the full academic history behind the qualification, which is why overseas employers, universities, regulators, and migration bodies often ask for the transcript or another academic record as well.',
          'In practice, the useful question is rarely just “Can this degree be legalised?” It is more often “Is this the complete academic set the receiver expects to see?”',
        ]),
      },
      {
        heading: t('Why people often focus on the wrong issue first'),
        paragraphs: mapTexts([
          'A common mistake is to jump straight to terms such as apostille, authentication, attestation, or legalisation before checking whether the transcript is also required, whether the degree is in the right format, or whether the receiver accepts a digital academic record.',
          'Degree-certificate matters are usually easier when treated as academic-pack questions first and route-label questions second.',
        ]),
      },
      {
        heading: t('What customers should prepare before intake'),
        paragraphs: mapTexts([
          'Before starting, it usually helps to collect the degree certificate, any transcript or completion evidence, the destination purpose, and the wording from the receiving body if you have it. These details are what make the route review specific enough to be useful.',
          'Where names differ across the academic file and current passport identity, supporting records should also be prepared early rather than left to the final stage.',
        ]),
      },
    ],
    faq: [
      {
        question: 'Can I submit only the degree certificate?',
        answer:
          'Sometimes, but many overseas cases are stronger when the transcript or another academic record is reviewed at the same time.',
      },
      {
        question: 'If my degree is digital, is the route automatically easier?',
        answer:
          'Digital provenance can help, but the route still depends on destination acceptance, file completeness, and whether the receiver needs more than one academic document.',
      },
      {
        question: 'Does EGS guarantee the overseas institution or employer will accept the file?',
        answer:
          'No. EGS coordinates the route review and administrative handling, but final acceptance always sits with the receiving authority.',
      },
    ],
    relatedGuideSlugs: [
      'australian-degree-certificate-for-use-in-singapore',
      'australian-testamur-for-overseas-use',
      'dfat-authentication-of-university-degree-and-transcript',
    ],
    relatedSampleKeys: ['australia-education-certificate', 'australia-academic-document'],
    routeCategory: 'civil',
    heroKicker: 'Academic route guide',
    heroImage: '/samples/australia/australia-degree-certificate-reference/source.png',
    heroImageWatermarked: true,
    heroPdf: {
      src: '/samples/australia/australia-degree-certificate-reference/protected.svg',
      pages: 1,
      watermarked: true,
    },
    prefill: {
      issuingSlug: 'australia',
      documentSlug: 'degree-certificate',
    },
  }),
  documentRouteGuide({
    slug: 'australian-testamur-for-overseas-use',
    publishedAt: '2026-03-10',
    featured: false,
    title: 'Australian Testamur for Overseas Use',
    seoTitle: 'Australian Testamur for Overseas Use | EGS Guides',
    metaDescription:
      'Practical guide to using an Australian testamur overseas, including how it differs from a transcript, when supporting records are needed, and what to prepare before route review.',
    excerpt:
      'A practical guide to Australian testamurs for overseas use, including what a testamur usually is, how it differs from a transcript, and why many receivers still assess the broader academic file.',
    intro: [
      'Many Australian universities use the word testamur to refer to the formal award document. Users searching this term are often already holding the exact file and want to know whether it can be used on its own for employment, study, migration, or licensing overseas.',
      'This guide explains what a testamur usually is, how it differs from a transcript or graduation statement, and why overseas use often still depends on reviewing the wider academic pack rather than relying on the award page alone.',
    ],
    issuingCountry: 'Australia',
    destinationCountry: 'Overseas use',
    documentTypes: ['Testamur'],
    primaryKeyword: 'australian testamur for overseas use',
    relatedKeywords: [
      'testamur apostille australia',
      'testamur authentication australia',
      'australian university testamur overseas',
      'testamur legalisation australia',
    ],
    summaryPoints: [
      'A testamur usually proves the award was conferred, but it may not be enough where the receiver also expects a transcript or completion detail.',
      'The university’s wording does not control the route. The receiving authority still decides whether the testamur alone is sufficient.',
      'The document should be assessed as an institution-issued award record, not as a casual student download or screenshot.',
    ],
    whoThisGuideIsFor: [
      'Graduates who specifically hold or search for a university testamur for overseas employment, study, migration, or registration use.',
      'Users who want to understand how a testamur is usually reviewed differently from a transcript or graduation statement.',
      'Applicants who have been told to prepare an apostille or authentication for a testamur but have not yet checked the receiver’s full academic-file requirement.',
    ],
    commonDocumentTypesCovered: [
      'University-issued testamur',
      'Testamur reviewed together with transcript or graduation statement',
      'Digital academic award record where testamur wording is used by the issuing institution',
    ],
    routeOverview: {
      heading: t('Typical route overview'),
      paragraphs: mapTexts([
        'A testamur route usually starts with confirming that the document is the institution-issued award record and not a student-interface preview or incomplete download. Once that is clear, the practical question becomes whether the receiving side wants the testamur alone or expects the transcript, completion evidence, or another academic record as part of the same filing.',
        'That is why testamur matters are usually pack-based rather than page-based. The route is confirmed after review of the receiver instruction and the wider academic set available.',
      ]),
      bullets: mapTexts([
        'Testamur wording does not remove the need for receiver review.',
        'The receiver may still expect the transcript or other academic support.',
        'Digital-origin academic files still need destination-fit assessment.',
      ]),
    },
    requirements: [
      'The testamur in the clearest available issuer-generated format',
      'Destination country and the receiving body if known',
      'Any transcript, graduation statement, or completion evidence likely to accompany the testamur',
      'Any wording from the receiver mentioning apostille, authentication, attestation, legalisation, or direct verification',
    ],
    digitalDocumentNotes: [
      'If the testamur is available through a digital university platform, review can usually begin there, but destination acceptance still needs to be checked carefully.',
    ],
    timelineNotes: [
      'Timing depends on whether the testamur is already available in a usable issue format and whether the related transcript or graduation evidence is also ready.',
      'Any time estimate before review should be treated as indicative only because academic receivers vary materially in what they want to see with the award document.',
    ],
    feeNotes: [
      'Fees depend on the route confirmed after review and on whether the testamur is being handled alone or as part of a wider academic pack.',
      'EGS service fees cover administrative coordination only and do not imply issuer, notary, or government authority status.',
    ],
    extraStepNotes: [
      'A testamur often works best when reviewed together with the transcript from the start.',
      'If the award wording differs from passport or identity records, supporting documents may need review.',
      'Some overseas users search for “testamur apostille” when the actual receiver is asking for a broader academic-verification path.',
    ],
    reportSections: [
      {
        heading: t('Why a testamur deserves its own guide'),
        paragraphs: mapTexts([
          'Many universities use the word testamur while clients, employers, and overseas authorities may use broader language such as degree certificate, graduation certificate, or academic award. In practice, people searching specifically for “testamur” are often already holding the exact file and want to know whether it is enough on its own.',
          'That makes it useful to treat the testamur as its own scenario rather than hiding it inside a generic degree page. The route may be related, but the customer question is narrower and more practical.',
        ]),
      },
      {
        heading: t('What the testamur often needs to travel with'),
        paragraphs: mapTexts([
          'A testamur usually confirms that the award was conferred. Many receivers, however, still want the transcript or another academic record to understand the wider academic history behind it. Early review of the full pack usually prevents repeat work later.',
        ]),
      },
      {
        heading: t('What customers should prepare before intake'),
        paragraphs: mapTexts([
          'The most useful starting set usually includes the testamur, any transcript or graduation statement, and the destination use. That makes it easier to see whether the matter is a simple document-handling question or part of a broader academic-file review.',
          'If the receiver has already mentioned apostille, authentication, attestation, or direct verification, that wording should be kept with the file from the start.',
        ]),
      },
    ],
    faq: [
      {
        question: 'Is a testamur the same as a transcript?',
        answer:
          'No. A testamur usually confirms the award itself, while a transcript usually shows the academic record in more detail. Many receivers review both together.',
      },
      {
        question: 'Can I rely on the testamur alone?',
        answer:
          'Sometimes, but many overseas employment, study, and registration cases are stronger when the transcript or another academic record is reviewed at the same time.',
      },
      {
        question: 'Does EGS decide whether the testamur is accepted overseas?',
        answer:
          'No. EGS is an independent administrative intermediary only. The route is confirmed after review and final acceptance remains with the receiving authority.',
      },
    ],
    relatedGuideSlugs: [
      'australian-degree-certificate-for-overseas-use',
      'dfat-authentication-torrens-university-australia-my-equals-testamur-degree-transcript-graduation-statement',
      'dfat-authentication-of-university-degree-and-transcript',
    ],
    relatedSampleKeys: ['australia-education-certificate'],
    routeCategory: 'civil',
    heroKicker: 'Academic route guide',
    heroImage: '/samples/australia/australia-degree-certificate-reference/source.png',
    heroImageWatermarked: true,
    heroPdf: {
      src: '/samples/australia/australia-degree-certificate-reference/protected.svg',
      pages: 1,
      watermarked: true,
    },
    prefill: {
      issuingSlug: 'australia',
      documentSlug: 'degree-certificate',
    },
  }),
  documentRouteGuide({
    slug: 'australian-divorce-order-for-overseas-use',
    publishedAt: '2026-03-10',
    featured: false,
    title: 'Australian Divorce Order for Overseas Use',
    seoTitle: 'Australian Divorce Order for Overseas Use | EGS Guides',
    metaDescription:
      'Practical guide to using an Australian divorce order overseas, including court-issued document checks, remarriage and civil-status use, and what to prepare before authentication or legalisation is considered.',
    excerpt:
      'A practical guide to Australian divorce orders for overseas use, including which court-issued record is usually needed, why remarriage and civil-status matters often require supporting documents, and how to prepare the file properly.',
    intro: [
      'Australian divorce orders are commonly needed for remarriage, civil-status updates, migration, registry filings, inheritance matters, and other overseas administrative uses. In most cases, the useful question is not simply whether the divorce is final, but whether the document in hand is the court-issued record the overseas authority expects to see.',
      'This guide explains what kind of Australian divorce document is usually required, what supporting records often matter, and how to prepare the file before apostille, authentication, legalisation, or translation is considered.',
    ],
    issuingCountry: 'Australia',
    destinationCountry: 'Overseas use',
    documentTypes: ['Divorce Order'],
    primaryKeyword: 'australian divorce order for overseas use',
    relatedKeywords: [
      'divorce order apostille australia',
      'divorce order authentication australia',
      'australian divorce certificate overseas',
      'family court divorce order legalisation',
    ],
    summaryPoints: [
      'The first practical question is usually whether the file is the formal court-issued divorce order or another family-law record that does not answer the same overseas use.',
      'Divorce-order routes often intersect with remarriage, civil status update, migration, and translation issues.',
      'Identity alignment and name history can matter as much as the later certification stage.',
    ],
    whoThisGuideIsFor: [
      'Clients using an Australian divorce order for remarriage, civil-status update, migration, court, registry, or other overseas administrative use.',
      'Applicants who are unsure whether the document they hold is the formal divorce order usually reviewed by overseas receivers.',
      'Users who need the route checked alongside passport names, marriage history, or translation requirements.',
    ],
    commonDocumentTypesCovered: [
      'Australian court-issued divorce order',
      'Divorce order reviewed together with marriage certificate, identity support, or name-change evidence',
      'Sealed court order or electronically issued court order where the receiver still needs route review',
    ],
    routeOverview: {
      heading: t('Typical route overview'),
      paragraphs: mapTexts([
        'For overseas use, a divorce-order route usually starts with document class and issuing source. The useful first file is commonly the formal court-issued divorce order rather than a solicitor letter, family-law summary, or unrelated court paper.',
        'Once the correct order is identified, the route usually turns on destination use, translation expectations, and whether the receiver also needs the marriage certificate, identity support, or another record to connect the personal-status history cleanly.',
      ]),
      bullets: mapTexts([
        'Court-issued order first.',
        'Identity and name history often matter early.',
        'Remarriage and civil-status updates may require a wider family-status pack.',
      ]),
    },
    requirements: [
      'Full scan of the divorce order currently held, including all pages and court details',
      'Destination country and intended use such as remarriage, immigration, registry, or court matter',
      'Any supporting identity, marriage, or name-change document if the overseas filing will compare multiple records',
      'Any translation or downstream filing instruction from the receiver',
    ],
    originalDocumentNotes: [
      'If the file in hand is not the final court-issued order or is missing key pages, a stronger court-issued version may be needed before route handling begins.',
    ],
    timelineNotes: [
      'Timelines depend first on whether the current divorce order already sits in a usable court-issued form. Supporting family-status records and translations often create more delay than the later route stage itself.',
      'Any timeframe discussed before review should be treated as indicative only because overseas family-status uses vary widely by destination and filing purpose.',
    ],
    feeNotes: [
      'Fees depend on the route confirmed after review and on whether supporting records, translations, or replacement court copies are also needed.',
      'EGS coordinates as an independent administrative intermediary only and does not provide legal advice or act as the issuing court.',
    ],
    extraStepNotes: [
      'Some remarriage or civil-status filings are stronger when the divorce order is reviewed together with the marriage certificate and identity records.',
      'Name changes after marriage or divorce can require early review of supporting identity material.',
      'Translation quality and family-status consistency often affect downstream acceptance.',
    ],
    reportSections: [
      {
        heading: t('Why a divorce order matter is rarely just one document'),
        paragraphs: mapTexts([
          'A divorce order may answer the core status question, but overseas authorities often want to understand the wider document chain around it. That can mean checking the marriage certificate, current passport identity, or any relevant name-change history at the same time.',
          'For that reason, divorce-order matters are often easier to review as a family-status pack rather than a single-page document question.',
        ]),
      },
      {
        heading: t('Common overseas uses'),
        paragraphs: mapTexts([
          'Australian divorce orders are commonly used for remarriage, family registration, migration, inheritance, registry, and other administrative status updates. Those uses can apply different translation and supporting-record expectations even though they all begin with the same court-issued order.',
        ]),
      },
      {
        heading: t('What customers should prepare before intake'),
        paragraphs: mapTexts([
          'The most useful starting materials are usually the divorce order, current passport ID, and any related marriage or name-change record if the overseas filing compares multiple family-status documents.',
          'If the receiver has already given written instructions, that wording should be included at intake. It often makes the route decision much clearer.',
        ]),
      },
    ],
    faq: [
      {
        question: 'Is the divorce order the same as a divorce certificate or family-law summary?',
        answer:
          'Not always. Review usually starts by checking whether the file is the formal court-issued order that the receiving authority expects to see.',
      },
      {
        question: 'Does the divorce order route usually stand alone?',
        answer:
          'Not always. It is common for the route to involve identity support, marriage records, name-history documents, or translation depending on the destination use.',
      },
      {
        question: 'Can EGS guarantee overseas family-status acceptance?',
        answer:
          'No. EGS is an independent administrative intermediary and does not provide legal advice or guarantee acceptance by the receiving authority.',
      },
    ],
    relatedGuideSlugs: [
      'australian-marriage-certificate-for-use-overseas',
      'australian-birth-certificate-for-overseas-use',
      'australian-police-check-for-overseas-use',
    ],
    relatedSampleKeys: ['australia-divorce-order'],
    routeCategory: 'civil',
    heroKicker: 'Civil document route',
    heroImage: '/samples/australia/australia-divorce-order-reference/source.png',
    heroImageWatermarked: true,
    heroPdf: {
      src: '/samples/australia/australia-divorce-order-reference/protected.svg',
      pages: 3,
      previewImages: [
        '/samples/australia/australia-divorce-order-reference/page-1.png',
        '/samples/australia/australia-divorce-order-reference/page-2.png',
        '/samples/australia/australia-divorce-order-reference/page-3.png',
      ],
      watermarked: true,
    },
    prefill: {
      issuingSlug: 'australia',
    },
  }),
  documentRouteGuide({
    slug: 'australian-company-registry-certificate-for-overseas-use',
    publishedAt: '2026-03-10',
    featured: false,
    title: 'Australian Company Registry Certificate for Overseas Use',
    seoTitle: 'Australian Company Registry Certificate for Overseas Use | EGS Guides',
    metaDescription:
      'Practical guide to using an Australian company registry certificate overseas, including ASIC-issued public records, recency issues, and wider corporate-pack preparation.',
    excerpt:
      'A practical guide to Australian company registry certificates for overseas use, including what these ASIC-issued records usually are, why recency matters, and when the certificate needs to travel with a wider corporate pack.',
    intro: [
      'Australian company registry certificates are commonly used overseas for banking, corporate filings, due diligence, transactions, compliance work, and counterparty onboarding. In practice, the key issue is often not whether the certificate exists, but whether the exact ASIC-issued record is the right document and recent enough for the commercial purpose.',
      'This guide explains what an Australian company registry certificate usually is, why it should be separated from generic company documents, and what should be prepared before apostille, authentication, or broader corporate-pack coordination is discussed.',
    ],
    issuingCountry: 'Australia',
    destinationCountry: 'Overseas use',
    documentTypes: ['Company Registry Certificate'],
    primaryKeyword: 'australian company registry certificate for overseas use',
    relatedKeywords: [
      'company registry certificate apostille australia',
      'asic certificate overseas use',
      'australian company certificate authentication',
      'registry certificate legalisation australia',
    ],
    summaryPoints: [
      'A company registry certificate should be treated as a public registry record, not as a generic company PDF.',
      'Commercial usefulness often depends on the exact certificate type and how recent it is, not only on whether it is genuine.',
      'Receivers may still require a wider company pack even when the registry certificate is the lead document.',
    ],
    whoThisGuideIsFor: [
      'Australian companies, directors, advisors, and counterparties using an Australian company registry certificate for overseas banking, transaction, registry, compliance, or corporate filing.',
      'Users who hold an ASIC-issued certificate or extract and want to know whether it can move on a cleaner route than private signed company papers.',
      'Clients who need the route checked before gathering board resolutions, powers of attorney, or other supporting corporate files.',
    ],
    commonDocumentTypesCovered: [
      'ASIC-issued company registry certificate or comparable public registry certificate',
      'Registry certificate reviewed together with company extracts or supporting corporate records',
      'Public registry record used as the lead document in a wider corporate filing pack',
    ],
    routeOverview: {
      heading: t('Typical route overview'),
      paragraphs: mapTexts([
        'For Australian company registry certificates used overseas, route review usually starts with document class. A public registry certificate often sits in a cleaner lane than signed private corporate documents because the issue is usually the public record itself rather than the validity of a private signature.',
        'Once the registry certificate is identified, the route usually turns on destination use, document recency, and whether the receiver also needs related company records such as extracts, board resolutions, or signatory-authority papers. The route is therefore best confirmed against the actual commercial use case.',
      ]),
      bullets: mapTexts([
        'Public registry record first.',
        'Recency and certificate type often matter commercially.',
        'A wider company pack may still be needed.',
      ]),
    },
    requirements: [
      'Clear copy of the exact registry certificate in hand',
      'Destination country and the bank, registry, counterparty, or authority receiving it',
      'Any deadline or transaction context that affects document recency',
      'Any supporting company records likely to travel with the certificate',
    ],
    originalDocumentNotes: [
      'For registry certificates, the exact certificate type and issue date can matter commercially. An older certificate may be genuine but still unhelpful for the destination filing.',
    ],
    timelineNotes: [
      'Corporate timing depends on whether the certificate is already current enough for the destination filing and whether the wider company pack is still incomplete.',
      'Any timing discussed before review should be treated as indicative only because overseas corporate uses vary by receiver, deadline, and supporting-document expectations.',
    ],
    feeNotes: [
      'Fees depend on the route confirmed after review and on whether the registry certificate is travelling alone or as part of a wider company pack.',
      'EGS acts as an independent administrative intermediary only and does not claim to be the registry, notary, or government authority.',
    ],
    extraStepNotes: [
      'Some receivers still want a broader company pack, even where the registry certificate is the lead public document.',
      'If the filing also depends on board authority, signatory authority, or powers of attorney, additional upstream steps may be needed for those private corporate papers.',
      'A fresh extract or updated certificate may be commercially preferable where the destination receiver is sensitive to issue date.',
    ],
    reportSections: [
      {
        heading: t('What an Australian company registry certificate usually is'),
        paragraphs: mapTexts([
          'A company registry certificate is usually a public-record document issued through the corporate registry framework, not a signed private company paper. It should normally be screened differently from board resolutions, powers of attorney, declarations, or other documents that depend first on signature and execution review.',
          'Treating all company files as one category often causes delay and repeat work. In practice, a registry certificate usually deserves its own route assessment because its practical issues are different.',
        ]),
      },
      {
        heading: t('What overseas commercial receivers usually look at'),
        paragraphs: mapTexts([
          'Banks, registries, counterparties, and transaction advisors often care about the certificate type, the issue date, and how the certificate fits into the wider corporate pack. In practice, those points can matter as much as the formal legalisation label.',
        ]),
      },
      {
        heading: t('What customers should prepare before intake'),
        paragraphs: mapTexts([
          'The strongest starting pack usually includes the registry certificate, the destination commercial purpose, and any related extracts or authority documents likely to travel with it. That gives the route review enough context to be commercially useful rather than generic.',
          'If a bank, registry, advisor, or counterparty has given timing or recency requirements, those should also be included from the start.',
        ]),
      },
    ],
    faq: [
      {
        question: 'Is a company registry certificate the same as any other company document?',
        answer:
          'No. A registry certificate is usually a public-record document and is often reviewed differently from private signed corporate papers.',
      },
      {
        question: 'Can I rely on one registry certificate alone?',
        answer:
          'Sometimes, but many overseas commercial filings are stronger when the certificate is reviewed together with supporting company records or authority documents.',
      },
      {
        question: 'Can EGS act as the issuing authority or notary for company certificates?',
        answer:
          'No. EGS is an independent administrative intermediary only and does not act as a law firm, public notary, or government authority.',
      },
    ],
    relatedGuideSlugs: [
      'australian-company-documents-for-use-in-hong-kong',
      'uk-issued-company-documents-for-use-in-australia',
      'overseas-issued-documents-for-use-in-australia',
    ],
    relatedSampleKeys: ['australia-company-document'],
    routeCategory: 'company',
    heroKicker: 'Company route guide',
    heroImage: '/samples/australia/australia-company-registry-certificate-reference/source.png',
    heroImageWatermarked: true,
    heroPdf: {
      src: '/samples/australia/australia-company-registry-certificate-reference/protected.svg',
      pages: 2,
      previewImages: [
        '/samples/australia/australia-company-registry-certificate-reference/page-1.png',
        '/samples/australia/australia-company-registry-certificate-reference/page-2.png',
      ],
      watermarked: true,
    },
    prefill: {
      issuingSlug: 'australia',
      documentSlug: 'company-documents',
    },
  }),
  documentRouteGuide({
    slug: 'australian-company-documents-for-overseas-use',
    publishedAt: '2026-03-10',
    featured: false,
    title: 'Australian Company Documents for Overseas Use',
    seoTitle: 'Australian Company Documents for Overseas Use | EGS Guides',
    metaDescription:
      'Practical guide to preparing Australian company documents for overseas use, including how to separate public registry records from private corporate papers and structure the pack correctly.',
    excerpt:
      'A practical guide to Australian company documents for overseas use, including how to separate ASIC records from signed private corporate papers, why mixed packs often cause delay, and what to prepare before filing.',
    intro: [
      'Australian company documents used overseas rarely fall into one simple category. A mixed pack may contain ASIC extracts, registry certificates, board resolutions, powers of attorney, constitutions, signed declarations, and other private corporate papers. Those documents do not all start from the same route.',
      'This guide explains how these files are usually divided, why public registry records and private signed corporate papers should not be treated the same way, and what should be prepared before apostille, authentication, legalisation, or notarial handling is discussed.',
    ],
    issuingCountry: 'Australia',
    destinationCountry: 'Overseas use',
    documentTypes: ['Company Documents'],
    primaryKeyword: 'australian company documents for overseas use',
    relatedKeywords: [
      'australian company apostille',
      'company documents authentication australia',
      'asic documents overseas use',
      'australian corporate legalisation',
    ],
    summaryPoints: [
      'Company-document routes should never be screened as one generic category. Registry extracts, certificates, resolutions, powers of attorney, and signed corporate papers often start from different lanes.',
      'The most common commercial error is assuming any company PDF can go directly to legalisation without checking whether a notarial or other upstream step is missing.',
      'Overseas receivers often care about pack completeness, recency, and signatory authority as much as the legalisation label itself.',
    ],
    whoThisGuideIsFor: [
      'Australian companies, directors, advisors, and counterparties preparing company documents for overseas banking, registry, transaction, compliance, or institutional use.',
      'Users who hold a mixed company pack and need to know which items are cleaner public-document records and which items raise separate upstream questions.',
      'Clients who want the route checked before committing to timeframes or filing deadlines.',
    ],
    commonDocumentTypesCovered: [
      'ASIC extracts, registry certificates, and other public company records',
      'Board resolutions, constitutions, powers of attorney, and signed private corporate papers',
      'Mixed corporate packs that combine public registry documents with privately executed company documents',
    ],
    routeOverview: {
      heading: t('Typical route overview'),
      paragraphs: mapTexts([
        'For Australian company documents used overseas, the route usually starts with document class. Public registry material often sits closer to a cleaner lane than private signed company papers, because the practical question for private corporate documents is no longer just what the registry issued but whether the signature and execution chain are in the right form for the destination.',
        'That means the company pack should usually be mapped before route timing or route cost is discussed. A mixed pack often contains some files already close to a destination-ready lane and other files that still need a separate upstream preparation step.',
      ]),
      bullets: mapTexts([
        'Sort the company pack by document class first.',
        'Check whether any private corporate paper raises a notarial or execution issue.',
        'Tie the route to the actual overseas commercial use, not only to the country name.',
      ]),
    },
    requirements: [
      'The exact company documents to be used, ideally supplied as a full pack rather than isolated pages',
      'Destination country and the receiving bank, registry, counterparty, advisor, or authority if known',
      'Whether the pack contains registry-issued records, signed private corporate papers, or both',
      'Any deadline, transaction context, or filing instruction that affects recency or pack completeness',
    ],
    originalDocumentNotes: [
      'Signed private company documents often need review in their signed form because the execution setup may affect the route. For registry-issued records, the exact extract or certificate type and its issue date often matter commercially.',
    ],
    timelineNotes: [
      'Corporate timing depends heavily on whether the company pack is already sorted into clean public-document and private-document lanes. If that classification is unclear, the review stage often becomes the main source of delay.',
      'Any timeline discussed before review should be treated as indicative only because overseas corporate routes vary by document class, destination, filing urgency, and supporting-document expectations.',
    ],
    feeNotes: [
      'Fees depend on the document mix, the actual route confirmed after review, and whether any private corporate paper needs a different upstream step from the registry documents in the same pack.',
      'EGS acts only as an independent administrative intermediary and does not claim to be a law firm, public notary, or government authority.',
    ],
    extraStepNotes: [
      'Board resolutions, powers of attorney, and signed declarations often raise execution questions before any later legalisation stage is considered.',
      'A receiver may still want a fresh extract or certificate even if an older one is technically genuine.',
      'Banks, registries, and transaction counterparties often expect a broader corporate pack rather than one isolated company document.',
    ],
    reportSections: [
      {
        heading: t('Why Australian company documents should be divided before review'),
        paragraphs: mapTexts([
          'One of the biggest causes of delay in corporate work is treating every company file as if it belongs to the same route. In practice, it usually does not. Registry records, certificates, signed board documents, powers of attorney, and authority papers all serve different functions and may start from different lanes.',
          'Dividing the company pack early usually makes the route review more accurate, the timing more realistic, and the overall process easier to manage.',
        ]),
      },
      {
        heading: t('What overseas commercial receivers usually care about in practice'),
        paragraphs: mapTexts([
          'Commercial receivers usually care about more than whether the file can be legalised. They often care about document age, signatory authority, registry status, and whether the company pack works together as a coherent set. Those practical issues can matter as much as the later apostille or authentication label.',
          'That is why a bank, registry, counterparty, or regulator should be identified as early as possible.',
        ]),
      },
      {
        heading: t('What customers should prepare before intake'),
        paragraphs: mapTexts([
          'The strongest starting set usually includes the full company pack, the destination use, and any deadline or transaction context. Without that, route advice tends to stay too generic to support a useful business decision.',
          'If the receiver has already asked for a specific corporate set, those instructions should be kept with the pack from the start rather than reconstructed later.',
        ]),
      },
    ],
    faq: [
      {
        question: 'Can all Australian company documents be treated the same way?',
        answer:
          'Usually not. Registry-issued documents and private signed corporate papers often follow different practical lanes and should be reviewed separately first.',
      },
      {
        question: 'Can I send one ASIC extract and decide the rest later?',
        answer:
          'Sometimes that may be enough for a first look, but most overseas commercial matters are stronger when the intended company pack is reviewed early rather than one document in isolation.',
      },
      {
        question: 'Can EGS act as the notary, registry, or authority on company files?',
        answer:
          'No. EGS is an independent administrative intermediary only and does not act as a law firm, public notary, or government authority.',
      },
    ],
    relatedGuideSlugs: [
      'australian-company-registry-certificate-for-overseas-use',
      'australian-company-documents-for-use-in-hong-kong',
      'uk-issued-company-documents-for-use-in-australia',
    ],
    relatedSampleKeys: ['australia-company-document', 'australia-company-document-2'],
    routeCategory: 'company',
    heroKicker: 'Company route guide',
    heroImage: '/samples/australia/australia-company-registry-certificate-reference/source.png',
    heroImageWatermarked: true,
    heroPdf: {
      src: '/samples/australia/australia-company-registry-certificate-reference/protected.svg',
      pages: 2,
      previewImages: [
        '/samples/australia/australia-company-registry-certificate-reference/page-1.png',
        '/samples/australia/australia-company-registry-certificate-reference/page-2.png',
      ],
      watermarked: true,
    },
    prefill: {
      issuingSlug: 'australia',
      documentSlug: 'company-documents',
    },
  }),
  inboundGuide({
    slug: 'overseas-issued-documents-for-use-in-australia',
    publishedAt: '2026-02-28',
    featured: true,
    title: 'Overseas-Issued Documents for Use in Australia',
    seoTitle: 'Overseas-Issued Documents for Use in Australia | EGS Guides',
    metaDescription:
      'Detailed guide to using overseas-issued documents in Australia, including upstream legalisation, translation issues, and Australian receiver requirements.',
    excerpt:
      'A route map for foreign-issued documents being used in Australia, including what is usually done in the issuing country, what Australia does not usually do, and what to prepare before review.',
    issuingCountry: 'Overseas',
    destinationCountry: 'Australia',
    documentTypes: ['Birth Certificates', 'Marriage Certificates', 'Academic Documents', 'Company Documents'],
    primaryKeyword: 'overseas issued documents for use in australia',
    relatedKeywords: [
      'foreign documents for australia',
      'document legalisation for use in australia',
      'apostille foreign document australia',
      'overseas documents australia acceptance',
    ],
    summaryPoints: [
      'Australia usually receives foreign documents; it does not usually convert them into Australian public documents after the fact.',
      'The crucial legalisation step, if needed, is commonly completed in the issuing country before the document is used in Australia.',
      'Translation, certified translation, and receiver-specific acceptance rules in Australia can matter as much as the upstream apostille or authentication step.',
    ],
    whoThisGuideIsFor: [
      'Individuals and businesses preparing foreign-issued documents for Australian migration, licensing, education, court, employment, banking, or registry use.',
      'Users who are unsure whether the document needs an apostille or another legalisation step in the issuing country before it comes to Australia.',
      'Applicants who already have the foreign document in Australia and need to know whether any upstream stage was missed.',
    ],
    commonDocumentTypesCovered: [
      'Foreign birth, marriage, death, and other civil registry certificates',
      'Foreign academic records and company documents',
      'Foreign police checks, declarations, and notarised private documents',
    ],
    routeOverview: {
      heading: t('Typical route overview'),
      paragraphs: mapTexts([
        'For foreign-issued documents used in Australia, the usual first question is not what Australia can stamp now. It is whether the document needed an apostille, authentication, notarial act, or other certification in the issuing country before arriving here.',
        'Once the upstream position is clear, the next review point is Australian destination use. Some Australian receivers mainly care about translation and document legibility, while others need a more formal upstream chain from the issuing country. That is why route confirmation starts with the source-country lane and the Australian receiving body together.',
      ]),
      bullets: mapTexts([
        'Upstream step in the issuing country first.',
        'Australian receiver requirements second.',
        'Translation and certified translation often sit alongside, not after, the main route decision.',
      ]),
    },
    requirements: [
      'Clear scan of the foreign-issued document',
      'Issuing country and, if known, the authority or institution that issued it',
      'Australian receiving body and purpose of use',
      'Any existing apostille, legalisation, notarisation, translation, or consular paperwork already attached to the file',
    ],
    timelineNotes: [
      'Timing depends on whether an upstream step was already completed in the issuing country. If not, the file may need to be routed back into the source-country lane before it can be used confidently in Australia.',
      'Any timeframe discussed before review should be treated as indicative only because foreign document routes vary heavily by issuing country and Australian receiving body.',
    ],
    feeNotes: [
      'Fees depend on whether the route is mainly an Australian-side review and translation matter or whether the document still needs upstream handling in the issuing country.',
      'EGS coordinates administratively as an independent intermediary and does not act as the certifying authority.',
    ],
    extraStepNotes: [
      'Certified translation may be required where the document is not in English or where the Australian receiver insists on a particular translation standard.',
      'Some Australian receivers rely heavily on the source-country apostille or legalisation, while others focus on translation and document clarity.',
      'If the original chain was not completed before the document left the issuing country, the file may need to return to that upstream route.',
    ],
    reportSections: [
      {
        heading: t('What Australia usually checks and what it usually does not'),
        paragraphs: mapTexts([
          'Australia is often the destination, not the issuing state. That means the legally significant certification step often belongs to the country that issued the document, not to the Australian destination authority.',
          'This is the most important point for users who already hold the foreign document in Australia and assume a domestic Australian certification step can replace the upstream source-country route.',
        ]),
      },
      {
        heading: t('Why destination use in Australia still matters'),
        paragraphs: mapTexts([
          'Even when the upstream chain is clear, the Australian receiver may still impose its own document expectations. A migration filing, university admission, regulator, or court can each ask for different supporting evidence or translation standards.',
          'That is why route review does not stop at “has apostille” or “no apostille”. The downstream Australian use still needs to be assessed.',
        ]),
      },
      {
        heading: t('Typical file-preparation checklist'),
        paragraphs: mapTexts([
          'The most useful intake pack usually includes the foreign document, any existing certification pages, any translation, and a clear statement of the Australian purpose. Without those pieces, route review often becomes too abstract to be reliable.',
        ]),
      },
    ],
    faq: [
      {
        question: 'Can Australia apostille a foreign-issued document after it arrives?',
        answer:
          'Usually the key certification step belongs to the issuing country, not to Australia. The correct route depends on the source country and the Australian receiving requirement.',
      },
      {
        question: 'If the document is already in English, is that enough for Australia?',
        answer:
          'Not always. Some Australian receivers still care about how the document was issued and what upstream certification, if any, was completed in the issuing country.',
      },
      {
        question: 'Does EGS provide legal advice on Australian acceptance?',
        answer:
          'No. EGS is an independent administrative intermediary only. Final acceptance depends on the issuing country, the Australian receiver, and the document setup reviewed.',
      },
    ],
    relatedGuideSlugs: [
      'singapore-issued-academic-documents-for-use-in-australia',
      'uk-issued-company-documents-for-use-in-australia',
      'australian-company-documents-for-use-in-hong-kong',
    ],
    relatedSampleKeys: ['canada-police-check', 'singapore-declaration'],
    heroKicker: 'Inbound route guide',
  }),
  inboundGuide({
    slug: 'singapore-issued-academic-documents-for-use-in-australia',
    publishedAt: '2026-02-27',
    featured: false,
    title: 'Singapore-Issued Academic Documents for Use in Australia',
    seoTitle: 'Singapore-Issued Academic Documents for Use in Australia | EGS Guides',
    metaDescription:
      'Detailed guide to preparing Singapore-issued academic documents for use in Australia, including upstream certification, translation, and Australian receiver expectations.',
    excerpt:
      'A practical guide to using Singapore-issued academic documents in Australia, with emphasis on source-country handling, destination fit, and intake preparation.',
    issuingCountry: 'Singapore',
    destinationCountry: 'Australia',
    documentTypes: ['Academic Documents', 'Degree Certificate', 'Academic Transcript'],
    primaryKeyword: 'singapore issued academic documents for use in australia',
    relatedKeywords: [
      'singapore degree for use in australia',
      'singapore transcript australia',
      'apostille singapore academic documents australia',
      'foreign academic documents australia',
    ],
    summaryPoints: [
      'For Singapore-issued academic files, the key route question is usually what must be done in Singapore before the documents are used in Australia.',
      'Australian receivers often care about both academic authenticity and document readability, which may bring translation or supporting records into scope.',
      'A university, regulator, migration body, or employer in Australia may each apply different expectations to the same academic file.',
    ],
    whoThisGuideIsFor: [
      'Students, graduates, and professionals using Singapore-issued academic records for study, migration, licensing, or employment in Australia.',
      'Applicants who already have the academic documents but are unsure whether a source-country certification step is missing.',
      'Users who need the route reviewed against a specific Australian receiver rather than only the country destination.',
    ],
    commonDocumentTypesCovered: [
      'Singapore-issued degree certificates and academic transcripts',
      'Academic completion letters and institution verifications',
      'Academic records paired with passport identity pages or certified translations where needed',
    ],
    routeOverview: {
      heading: t('Typical route overview'),
      paragraphs: mapTexts([
        'The usual review starts in Singapore, not in Australia. The first question is whether the academic record should carry a source-country apostille, authentication, or another verification step before it is used in Australia.',
        'The second question is what the Australian receiver wants. Some Australian schools or employers may accept direct institution verification or a cleaner source record, while others focus more on translation, completeness, and supporting identity details. The route is therefore confirmed only after both sides are considered together.',
      ]),
      bullets: mapTexts([
        'Start with the Singapore source lane.',
        'Then check the specific Australian receiver.',
        'Do not assume all Australian destinations apply the same academic-document rule.',
      ]),
    },
    requirements: [
      'Singapore-issued academic file in its clearest available issuer format',
      'Australian destination use and receiving body if known',
      'Any existing Singapore certification or institution-verification material',
      'Any translation or identity-support file relevant to the Australian use',
    ],
    timelineNotes: [
      'Timelines depend on whether the Singapore-side step has already been completed and whether the Australian receiver has a fixed deadline.',
      'Any estimate before review should be treated as indicative only because academic destination uses in Australia vary materially.',
    ],
    feeNotes: [
      'Fees depend on whether the document mainly needs source-country route handling, Australian-side coordination, or both.',
      'EGS coordinates administratively as an independent intermediary and does not guarantee receiver acceptance.',
    ],
    extraStepNotes: [
      'Some Australian receivers prefer direct verification from the issuing institution rather than relying only on a document chain.',
      'Translation and subject-name interpretation may matter if the academic file is not fully clear to the Australian receiver.',
      'Incomplete degree-plus-transcript packs commonly delay review.',
    ],
    reportSections: [
      {
        heading: t('What usually happens in the issuing country first'),
        paragraphs: mapTexts([
          'The main legalisation question usually belongs to Singapore as the issuing country. That is because the academic record originates there, and any formal source-country certification usually needs to be built at that stage.',
          'If that step has not been completed, the Australian side may have limited ability to solve the underlying source-country problem after the document arrives.',
        ]),
      },
      {
        heading: t('Why Australian receiver type matters'),
        paragraphs: mapTexts([
          'An Australian university, skilled-migration authority, private employer, and professional regulator can each look at the same foreign academic record differently. Some focus on translation and legibility, some on source verification, and some on the completeness of the academic pack.',
          'That is why destination review needs the actual Australian use case, not just the phrase “for use in Australia”.',
        ]),
      },
      {
        heading: t('What to prepare before review'),
        paragraphs: mapTexts([
          'The strongest intake file normally includes the degree, transcript, any source-country certification already attached, and a description of the exact Australian use. That combination makes route review much more reliable than a title-only enquiry.',
        ]),
      },
    ],
    faq: [
      {
        question: 'Can Australia certify a Singapore academic record instead of Singapore?',
        answer:
          'Usually the key source-country certification step belongs in Singapore, not in Australia. The correct route depends on the issuing-country setup and the Australian receiver requirement.',
      },
      {
        question: 'Will an Australian university and an Australian regulator ask for the same thing?',
        answer:
          'Not necessarily. Different Australian receivers can apply different expectations to the same foreign academic record.',
      },
      {
        question: 'Does EGS determine whether the academic record is accepted in Australia?',
        answer:
          'No. EGS coordinates route review and administrative handling only. Final acceptance remains with the Australian receiving authority or institution.',
      },
    ],
    relatedGuideSlugs: [
      'overseas-issued-documents-for-use-in-australia',
      'australian-degree-certificate-for-use-in-singapore',
      'australian-academic-transcript-for-use-in-uae',
    ],
    relatedSampleKeys: ['singapore-declaration'],
    heroKicker: 'Inbound academic guide',
    prefill: {
      issuingSlug: 'singapore',
      destinationSlug: 'australia',
      documentSlug: 'academic-transcript',
    },
  }),
  inboundGuide({
    slug: 'uk-issued-company-documents-for-use-in-australia',
    publishedAt: '2026-02-26',
    featured: false,
    title: 'UK-Issued Company Documents for Use in Australia',
    seoTitle: 'UK-Issued Company Documents for Use in Australia | EGS Guides',
    metaDescription:
      'Detailed guide to using UK-issued company documents in Australia, including source-country certification, company-document classes, and route review before intake.',
    excerpt:
      'A detailed guide to the route questions that arise when UK-issued company documents are being prepared for use in Australia.',
    issuingCountry: 'United Kingdom',
    destinationCountry: 'Australia',
    documentTypes: ['Company Documents', 'Companies House Records', 'Corporate Resolutions'],
    primaryKeyword: 'uk issued company documents for use in australia',
    relatedKeywords: [
      'uk company documents australia',
      'companies house documents australia use',
      'uk corporate apostille australia',
      'foreign company documents for australia',
    ],
    summaryPoints: [
      'UK company-document routes often depend on whether the file is a public company record or a private signed corporate paper.',
      'Australian use cases vary widely, so the receiving body should be identified early.',
      'A company pack is often more important than any single document in isolation.',
    ],
    whoThisGuideIsFor: [
      'UK companies, advisors, and Australian counterparties preparing UK corporate records for Australian banking, registry, transaction, compliance, or litigation-related use.',
      'Users holding a mix of Companies House documents and private signed corporate papers who need the route mapped before filing in Australia.',
      'Applicants who need to know whether the UK-side step must be completed before the documents are sent into Australia.',
    ],
    commonDocumentTypesCovered: [
      'Companies House records and certificates',
      'Board resolutions, powers of attorney, and signed corporate instruments',
      'Mixed corporate packs that combine public registry records with private documents',
    ],
    routeOverview: {
      heading: t('Typical route overview'),
      paragraphs: mapTexts([
        'For UK-issued company documents used in Australia, route review normally starts with document class. Public registry records, certificates, and private signed corporate papers may need different source-country treatment before they are suitable for Australian use.',
        'The second review point is the Australian destination context. Bank onboarding, court filing, ASIC-related use, and private commercial transactions may each apply different expectations about recency, completeness, translation, and supporting authority documents.',
      ]),
      bullets: mapTexts([
        'Sort the company pack by document class first.',
        'Confirm the Australian destination use second.',
        'Do not assume Companies House records and signed private corporate papers sit in the same route lane.',
      ]),
    },
    requirements: [
      'The full UK company document pack, not only one page',
      'Australian destination use and receiving body if known',
      'Whether the documents are public company records, private signed papers, or both',
      'Any deadline, transaction context, or Australian filing requirement that affects urgency',
    ],
    timelineNotes: [
      'Timelines depend heavily on whether the documents first need a UK-side preparation or certification step and on whether the pack is mixed.',
      'Any timeframe discussed before review should be treated as indicative only because corporate-document routes vary by class, urgency, and Australian use.',
    ],
    feeNotes: [
      'Fees depend on the document mix, any UK-side upstream stage, and the Australian destination use.',
      'EGS acts only as an independent administrative intermediary and does not claim authority status in the UK or Australia.',
    ],
    extraStepNotes: [
      'Private corporate documents often raise source-country certification questions that do not apply to public company records.',
      'Australian banking or corporate counterparties may care about recency and signatory authority as much as formal legalisation.',
      'A mixed corporate pack often benefits from one coordinated review rather than separate instructions sent at different times.',
    ],
    reportSections: [
      {
        heading: t('Why corporate packs should be reviewed as a set'),
        paragraphs: mapTexts([
          'An Australian counterparty often wants to understand company existence, director authority, and execution authority together. That means a single certificate rarely tells the whole story.',
          'Reviewing the pack as a set helps identify whether more UK-side preparation is required before the documents are ready for Australian use.',
        ]),
      },
      {
        heading: t('UK public documents versus private signed papers'),
        paragraphs: mapTexts([
          'Public registry records and private corporate papers do not usually follow the same source-country lane. The distinction is commercially important because it affects both timing and route design.',
          'Confusing the two is one of the main reasons company-document matters become slower and more expensive than expected.',
        ]),
      },
      {
        heading: t('Australian destination questions that matter most'),
        paragraphs: mapTexts([
          'At intake, the most useful Australian-side questions are who will receive the documents, what business step depends on them, and whether there is a fixed deadline. Those details usually change the priority order of the pack review.',
        ]),
      },
    ],
    faq: [
      {
        question: 'Can one Companies House document answer the whole Australian filing need?',
        answer:
          'Often no. Corporate recipients in Australia usually review a pack rather than one isolated certificate, especially where authority and execution questions arise.',
      },
      {
        question: 'Do UK signed corporate papers follow the same route as UK public registry records?',
        answer:
          'Usually not. Private signed corporate papers often raise a different source-country certification question from public registry records.',
      },
      {
        question: 'Can EGS certify the UK company documents itself?',
        answer:
          'No. EGS is an independent administrative intermediary only and does not act as the certifying authority, notary, or government office.',
      },
    ],
    relatedGuideSlugs: [
      'overseas-issued-documents-for-use-in-australia',
      'australian-company-documents-for-use-in-hong-kong',
      'singapore-issued-academic-documents-for-use-in-australia',
    ],
    relatedSampleKeys: ['uk-company-document'],
    heroKicker: 'Inbound company guide',
    prefill: {
      destinationSlug: 'australia',
      documentSlug: 'company-documents',
    },
  }),
  documentRouteGuide({
    slug: 'dfat-authentication-of-university-degree-and-transcript',
    publishedAt: '2026-03-10',
    featured: true,
    title: 'DFAT Authentication of University Degree and Transcript',
    seoTitle: 'DFAT Authentication of University Degree and Transcript | EGS Guides',
    metaDescription:
      'Detailed guide to reviewing university degree and transcript files for DFAT authentication, including document format, My eQuals issues, supporting records, and intake preparation.',
    excerpt:
      'A route guide for university degree and transcript files that explains what DFAT authentication usually depends on, what customers should prepare, and where review is commonly needed before intake.',
    issuingCountry: 'Australia',
    destinationCountry: 'Overseas use',
    documentTypes: ['Degree Certificate', 'Academic Transcript'],
    primaryKeyword: 'dfat authentication of university degree and transcript',
    relatedKeywords: [
      'degree and transcript dfat authentication',
      'university degree apostille australia',
      'academic transcript authentication australia',
      'dfat legalisation university documents',
    ],
    summaryPoints: [
      'University routes are usually decided by document provenance and destination fit, not by academic content.',
      'The degree and transcript often work best as a pack rather than as isolated files.',
      'My eQuals can help, but it does not remove destination-side review.',
    ],
    whoThisGuideIsFor: [
      'Graduates and students preparing Australian degree and transcript files for overseas study, work, migration, or professional registration.',
      'Users who want one route explanation before choosing between original, digital, or copy-based academic handling.',
      'Applicants who have been asked for apostille, authentication, attestation, or legalisation and need the route clarified against the actual receiver.',
    ],
    commonDocumentTypesCovered: [
      'Australian degree certificate or testamur',
      'Australian academic transcript',
      'Degree-plus-transcript packs reviewed for one destination use',
    ],
    routeOverview: {
      heading: t('Typical route overview'),
      paragraphs: mapTexts([
        'For university documents, the practical review usually starts with the issue source and the document set. The question is not simply whether a degree can be legalised, but whether the degree and transcript in hand are the best versions for the destination authority and whether the destination wants the documents together.',
        'If the files are institution-issued and the destination wording is clear, the route can often be confirmed relatively quickly. If the client only has incomplete copies, unclear downloads, or partial academic records, extra preparation may be required before a DFAT-facing step is even considered.',
      ]),
      bullets: mapTexts([
        'Degree and transcript should often be reviewed together.',
        'Digital origin can help, but does not settle destination acceptance by itself.',
        'Route wording should be tied to the receiving authority, not just the word “apostille”.',
      ]),
    },
    requirements: [
      'Issuer-generated degree and transcript files, or the clearest available academic pack',
      'Destination country and, if known, the receiving institution, employer, or regulator',
      'Any receiver instruction mentioning apostille, authentication, legalisation, attestation, or direct verification',
      'Whether the current files are originals, digital records, or copy-based versions',
    ],
    digitalDocumentNotes: [
      'A digital academic record can be a strong starting point when it shows clear institutional provenance.',
      'My eQuals, issuer PDFs, and hard-copy records should be assessed for destination fit rather than ranked by convenience alone.',
    ],
    originalDocumentNotes: [
      'Some receivers still prefer or require a paper issue path, even where digital records exist.',
    ],
    timelineNotes: [
      'Timing usually depends first on whether the academic pack is already complete and destination-fit. Missing transcripts, unclear provenance, or extra receiver requirements often create more delay than the formal legalisation step itself.',
      'Any timeframe discussed before review should be treated as indicative only.',
    ],
    feeNotes: [
      'Fees depend on the route confirmed after review and on whether additional academic records or supporting files must also be handled.',
      'EGS coordinates administratively and does not claim authority status over the underlying academic record or its final acceptance.',
    ],
    extraStepNotes: [
      'Some destinations want the transcript and degree together rather than one file alone.',
      'Translation, regulator checks, or direct source verification may still apply.',
      'Name mismatches across academic and identity documents can change the review path.',
    ],
    reportSections: [
      {
        heading: t('What is actually being authenticated'),
        paragraphs: mapTexts([
          'The route is not authenticating the academic truth of the degree or transcript. It is usually concerned with the authenticity of the issuing signature, seal, stamp, or institutional source structure attached to the eligible file.',
          'That is why provenance and issue format matter so much in academic matters.',
        ]),
      },
      {
        heading: t('Why the academic pack matters'),
        paragraphs: mapTexts([
          'Many receiving authorities do not assess a degree in isolation. They often want a fuller academic pack, especially for professional, migration, or admissions use.',
          'Reviewing the degree and transcript together usually reduces repeat work later.',
        ]),
      },
    ],
    faq: [
      {
        question: 'Can a university degree and transcript usually be legalised?',
        answer:
          'Often yes, but the practical route still depends on the issuing format, the destination, and what the receiving authority actually requires.',
      },
      {
        question: 'Should I upload both the degree and the transcript?',
        answer:
          'Usually that is preferable where both documents are part of the final use case. Many receivers assess the academic file set together.',
      },
      {
        question: 'Does EGS decide whether the degree is accepted overseas?',
        answer:
          'No. EGS coordinates route review as an independent administrative intermediary. Final acceptance remains with the receiving authority.',
      },
    ],
    relatedGuideSlugs: [
      'my-equals-degree-and-transcript-review-path',
      'australian-degree-certificate-for-use-in-singapore',
      'australian-academic-transcript-for-use-in-uae',
    ],
    relatedSampleKeys: ['australia-academic-document'],
    routeCategory: 'civil',
    heroKicker: 'Academic route guide',
    heroImage: '/samples/australia/australia-academic-transcript-reference/source.png',
    heroImageWatermarked: true,
    heroPdf: {
      src: '/samples/australia/australia-academic-transcript-reference/protected.svg',
      pages: 6,
      previewImages: [
        '/samples/australia/australia-academic-transcript-reference/page-1.png',
        '/samples/australia/australia-academic-transcript-reference/page-2.png',
        '/samples/australia/australia-academic-transcript-reference/page-3.png',
        '/samples/australia/australia-academic-transcript-reference/page-4.png',
        '/samples/australia/australia-academic-transcript-reference/page-5.png',
        '/samples/australia/australia-academic-transcript-reference/page-6.png',
      ],
      watermarked: true,
    },
    prefill: {
      issuingSlug: 'australia',
      documentSlug: 'academic-transcript',
    },
  }),
  documentRouteGuide({
    slug: 'my-equals-degree-and-transcript-review-path',
    publishedAt: '2026-03-10',
    featured: true,
    title: 'My eQuals Degree and Transcript Review Path',
    seoTitle: 'My eQuals Degree and Transcript Review Path | EGS Guides',
    metaDescription:
      'Detailed guide to reviewing My eQuals degree and transcript files for overseas use, including destination-fit checks, common risks, and what to prepare before intake.',
    excerpt:
      'A review-led guide to My eQuals degree and transcript files, explaining what they can help with, where uncertainty remains, and how to prepare the right academic pack before intake.',
    issuingCountry: 'Australia',
    destinationCountry: 'Overseas use',
    documentTypes: ['Degree Certificate', 'Academic Transcript', 'My eQuals Record'],
    primaryKeyword: 'my equals degree and transcript review path',
    relatedKeywords: [
      'my equals degree transcript review',
      'my equals degree overseas use',
      'my equals transcript apostille',
      'my equals academic authentication',
    ],
    summaryPoints: [
      'My eQuals can improve source clarity, but it is not a guarantee of destination acceptance.',
      'The review question is usually whether the receiving authority accepts the digital-origin academic file in the proposed route.',
      'A complete degree-plus-transcript pack is often stronger than one file alone.',
    ],
    whoThisGuideIsFor: [
      'Students and graduates holding My eQuals academic records for overseas study, work, licensing, or migration.',
      'Users unsure whether a share link, downloaded file, or institution-issued PDF is the best starting file.',
      'Applicants trying to move from a My eQuals record into route check or intake without overcommitting to one route label too early.',
    ],
    commonDocumentTypesCovered: [
      'My eQuals degree records',
      'My eQuals transcripts',
      'Academic packs that combine degree, transcript, and completion evidence',
    ],
    routeOverview: {
      heading: t('Typical route overview'),
      paragraphs: mapTexts([
        'The My eQuals review path usually begins with source verification and destination fit. The key issue is whether the file in hand is an institution-issued record in a format that the receiving side can work with and whether a legalisation route is even the correct next step.',
        'Some matters remain straightforward once the academic pack is clear. Others need extra review because the receiver wants direct source verification, a paper issue path, a translation, or a broader document set.',
      ]),
      bullets: mapTexts([
        'My eQuals is useful when it shows a clear institution-issued source.',
        'A downloaded file should still be checked for completeness and provenance.',
        'Route confirmation remains subject to review of the destination authority and use case.',
      ]),
    },
    requirements: [
      'My eQuals share, issuer PDF, or the clearest academic file available',
      'Destination country and receiving authority or institution if known',
      'Any wording that refers to apostille, authentication, attestation, verification, or translation',
      'Whether the receiver wants both the degree and the transcript',
    ],
    digitalDocumentNotes: [
      'My eQuals is most helpful where it creates a clear chain back to the issuing institution.',
      'A screenshot or informal portal capture is not the same as an issuer-generated record.',
    ],
    timelineNotes: [
      'My eQuals routes are usually faster to review when the academic pack is complete and the receiver instruction is clear.',
      'Any timing discussion before review should be treated as indicative only because destination-side expectations vary.',
    ],
    feeNotes: [
      'Fees depend on the confirmed route and whether extra academic, translation, or paper-issue handling is required.',
      'EGS does not claim to be the issuing institution or certifying authority.',
    ],
    extraStepNotes: [
      'Some destinations still want hard-copy or direct-source checks.',
      'Transcript completeness and page integrity matter.',
      'A degree alone may not be enough where the receiving side wants the full academic pack.',
    ],
    reportSections: [
      {
        heading: t('What My eQuals helps with'),
        paragraphs: mapTexts([
          'My eQuals often makes the source path clearer because it can show that the record comes directly from the issuing institution.',
          'That clearer provenance can reduce uncertainty at review, but it does not remove the need to check destination acceptance and route wording.',
        ]),
      },
      {
        heading: t('Where My eQuals does not answer the whole problem'),
        paragraphs: mapTexts([
          'A clean digital source does not automatically tell you whether the receiver wants apostille, authentication, direct verification, hard copy, translation, or a wider academic pack.',
          'That is why My eQuals should be treated as part of the route evidence, not the final route answer by itself.',
        ]),
      },
    ],
    faq: [
      {
        question: 'Is a My eQuals file automatically ready for overseas use?',
        answer:
          'Not automatically. It can be a strong source file, but the destination route still depends on the receiving authority and the document pack required.',
      },
      {
        question: 'Should I still upload my transcript if I already have the degree on My eQuals?',
        answer:
          'Often yes. Many receiving authorities prefer to review the degree and transcript together.',
      },
      {
        question: 'Does EGS guarantee a My eQuals file will be accepted?',
        answer:
          'No. EGS coordinates review and handling, but acceptance remains subject to the receiving authority’s own rules.',
      },
    ],
    relatedGuideSlugs: [
      'dfat-authentication-of-university-degree-and-transcript',
      'dfat-authentication-university-of-sydney-my-equals-degree-transcript',
      'dfat-authentication-unsw-my-equals-degree-transcript',
    ],
    relatedSampleKeys: ['australia-academic-document'],
    routeCategory: 'civil',
    heroKicker: 'My eQuals route guide',
    heroImage: '/samples/australia/australia-academic-transcript-reference/source.png',
    heroImageWatermarked: true,
    heroPdf: {
      src: '/samples/australia/australia-academic-transcript-reference/protected.svg',
      pages: 6,
      previewImages: [
        '/samples/australia/australia-academic-transcript-reference/page-1.png',
        '/samples/australia/australia-academic-transcript-reference/page-2.png',
        '/samples/australia/australia-academic-transcript-reference/page-3.png',
        '/samples/australia/australia-academic-transcript-reference/page-4.png',
        '/samples/australia/australia-academic-transcript-reference/page-5.png',
        '/samples/australia/australia-academic-transcript-reference/page-6.png',
      ],
      watermarked: true,
    },
    prefill: {
      issuingSlug: 'australia',
      documentSlug: 'academic-transcript',
    },
  }),
];

const guideMap = new Map(guides.map((guide) => [guide.slug, guide]));

export function getGuideSlugs() {
  return guides.map((guide) => guide.slug);
}

export function getAllGuides() {
  return [...guides].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getGuideBySlug(slug: string) {
  return guideMap.get(slug);
}

export function getGuideCopy(locale: Locale, value: LocalizedText) {
  return locale === 'zh' ? value.zh || value.en : value.en;
}

export function getGuideRelated(guide: Guide) {
  return guide.relatedGuideSlugs
    .map((slug) => guideMap.get(slug))
    .filter((entry): entry is Guide => Boolean(entry));
}

export function getGuideImage(slug: string) {
  return guideMap.get(slug)?.heroImage || '/samples/canada/canada-apostille/thumb.jpg';
}

export function getGuideInstitution(slug: string) {
  const guide = guideMap.get(slug);
  if (!guide?.institution || !guide.institutionShort) return null;

  return {
    name: guide.institution,
    short: guide.institutionShort,
  };
}

export function getGuideTypes() {
  return [
    {
      id: 'university-my-equals',
      label: t('University / My eQuals', 'University / My eQuals'),
    },
    {
      id: 'document-route',
      label: t('Australian document routes', 'Australian document routes'),
    },
    {
      id: 'overseas-to-australia',
      label: t('Overseas-issued to Australia', 'Overseas-issued to Australia'),
    },
  ] as const;
}

export function getGuidesByType(guideType: GuideType) {
  return getAllGuides().filter((guide) => guide.guideType === guideType);
}

export function getFeaturedGuides(limit = 6) {
  return getAllGuides()
    .filter((guide) => guide.featured)
    .slice(0, limit);
}

export function getLatestGuides(limit = 6) {
  return getAllGuides().slice(0, limit);
}

export function getGuideDocumentBuckets(limit = 8) {
  const counts = new Map<string, Guide[]>();

  for (const guide of guides) {
    for (const documentType of guide.documentTypes) {
      const bucket = counts.get(documentType) || [];
      bucket.push(guide);
      counts.set(documentType, bucket);
    }
  }

  return [...counts.entries()]
    .map(([label, items]) => ({
      label,
      guides: items.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)),
    }))
    .sort((a, b) => b.guides.length - a.guides.length || a.label.localeCompare(b.label))
    .slice(0, limit);
}

export function getGuideCountryBuckets(field: 'issuingCountry' | 'destinationCountry') {
  const counts = new Map<string, Guide[]>();

  for (const guide of guides) {
    const key = guide[field];
    const bucket = counts.get(key) || [];
    bucket.push(guide);
    counts.set(key, bucket);
  }

  return [...counts.entries()]
    .map(([label, items]) => ({
      label,
      guides: items.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)),
    }))
    .sort((a, b) => b.guides.length - a.guides.length || a.label.localeCompare(b.label));
}

export function getGuideIndexSections() {
  return {
    featured: getFeaturedGuides(6),
    latest: getLatestGuides(8),
    byType: getGuideTypes().map((entry) => ({
      ...entry,
      guides: getGuidesByType(entry.id),
    })),
    byDocumentType: getGuideDocumentBuckets(),
    byIssuingCountry: getGuideCountryBuckets('issuingCountry'),
    byDestinationCountry: getGuideCountryBuckets('destinationCountry'),
  };
}
