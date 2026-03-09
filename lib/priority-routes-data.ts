import type { Locale } from '@/lib/i18n/dictionaries';

type CopyText = {
  en: string;
  zh: string;
};

export type PriorityRoute = {
  slug: string;
  title: CopyText;
  subheading: CopyText;
  serviceScope: CopyText;
  officialBaseline?: CopyText;
  screeningDiscipline?: CopyText;
  routeType: CopyText;
  searchIntents: CopyText[];
  typicalRequirements: CopyText[];
  expedited: CopyText;
  reviewFocus: CopyText[];
  commonIssues: CopyText[];
  userNeedsFirst: CopyText[];
  beforePaymentReview: CopyText;
  commonDocumentSlugs: string[];
  issuingCountrySlug: string;
  destinationCountrySlug: string;
};

export const priorityRoutes: PriorityRoute[] = [
  {
    slug: 'australian-documents-for-use-in-china',
    title: {
      en: 'Australian Documents for Use in China',
      zh: '澳洲文件用于中国',
    },
    subheading: {
      en: 'For China use, the first step is to identify the document properly. Certificates, signed documents, and company files should not be treated the same way.',
      zh: '澳洲文件用于中国，通常不是一条固定产品线。真正的关键往往在于先分清文件类别、接收单位，以及后续是否会涉及翻译或原件。',
    },
    serviceScope: {
      en: 'This is one of the main Australia-side routes. The work is usually decided by the document itself, not by the country name alone.',
      zh: '这是澳洲侧最核心的路线之一。能否顺利处理，往往不在于国家名本身，而在于文件究竟是登记证书、签字私文书，还是公司文件组合。',
    },
    officialBaseline: {
      en: 'Australian registry certificates, notarised documents, and company records do not start from the same official point. For China matters, the file itself needs to be identified first.',
      zh: '澳洲登记证书、公证私文书和带官方来源的商业文件，本来就不走同一条官方起点。到了中国用途，第一步仍然是先看文件本身是什么，而不是客户怎么称呼它。',
    },
    screeningDiscipline: {
      en: 'The early review usually comes down to who in China is receiving the file, whether translation is needed, and whether the document can stay on a standard path once the format is confirmed.',
      zh: '前期判断通常集中在三件事：到底是哪家中国机构接收、翻译是不是实际需要，以及文件格式一旦确认后，案件是保持简单还是会转成更专业的路线。',
    },
    routeType: {
      en: 'Best treated as a route-confirmation matter first. Some files are simple. Others only settle once the receiving side in China is clear.',
      zh: '更适合先按“路线确认”来处理。有些文件很直接；有些则必须等中国接收方明确后，路线才会真正定下来。',
    },
    searchIntents: [
      { en: 'Australian documents for use in China', zh: '澳洲文件用于中国' },
      { en: 'Australia apostille for China use', zh: '澳洲海牙认证用于中国' },
      { en: 'Australian birth certificate for China', zh: '澳洲出生证明用于中国' },
      { en: 'Australian power of attorney for China', zh: '澳洲委托书用于中国' },
    ],
    typicalRequirements: [
      { en: 'Passport bio page for identity review', zh: '用于身份核验的护照资料页' },
      { en: 'Original, replacement issue, certified copy, or clear scan depending on document class', zh: '按文件类型提供原件、补发件、认证副本或清晰扫描件' },
      { en: 'Chinese translation may be needed for some receiving-side uses', zh: '部分赴中国用途可能需要中文翻译件' },
      { en: 'For signed documents, execution format or witnessed-signature workflow may need to be checked first', zh: '签字文件通常需先核验签署格式，必要时进入见证签字流程' },
    ],
    expedited: {
      en: 'Expedite may be possible on some Australia-side steps, but whether the route can genuinely be rushed depends on document type, whether originals are needed, and whether selected consular handling arises.',
      zh: '部分澳洲侧步骤可评估加急，但能否真正加急取决于文件类型、是否需要原件以及是否进入特定领馆链路。',
    },
    reviewFocus: [
      { en: 'Whether China use requires apostille only or a further selected consular chain', zh: '赴中国用途究竟是海牙即可，还是还要进入特定领馆链路' },
      { en: 'Whether the receiving side wants originals, notarised copies, or translated copies', zh: '接收方要求的是原件、公证副本还是翻译副本' },
      { en: 'Whether declarations, POAs, or same-person statements need witnessed-signature handling', zh: '声明书、委托书、同一人声明等是否需要见证签字处理' },
    ],
    commonIssues: [
      { en: 'Client only has scans, but the route later requires originals', zh: '客户只有扫描件，但后续链路要求原件' },
      { en: 'Receiving side in China is unclear, so route cannot be locked early', zh: '中国接收机构不明确，导致路线无法尽早锁定' },
      { en: 'Translation is needed but the file version is not final yet', zh: '需要翻译，但文件版本尚未最终确认' },
    ],
    userNeedsFirst: [
      { en: 'Document type and exact China use case', zh: '文件类型及在中国的具体用途' },
      { en: 'Whether originals, certified copies, or scans are available', zh: '是否持有原件、真实副本或扫描件' },
      { en: 'Receiving authority, city, or institution in China if known', zh: '如已知，请提供中国接收机构、城市或单位' },
    ],
    beforePaymentReview: {
      en: 'Before anything is confirmed, the file is checked for route fit, translation, original handling, and whether it can stay on a standard Australia-side path.',
      zh: '正式确认前，通常会先核验这份文件是否适合当前路线、是否有翻译或原件流转风险，以及它能否停留在标准澳洲主线内，还是需要更细的准备。',
    },
    commonDocumentSlugs: ['birth-certificate', 'marriage-certificate', 'power-of-attorney', 'company-documents'],
    issuingCountrySlug: 'australia',
    destinationCountrySlug: 'china',
  },
  {
    slug: 'australian-documents-for-use-in-singapore',
    title: {
      en: 'Australian Documents for Use in Singapore',
      zh: '澳洲文件用于新加坡',
    },
    subheading: {
      en: 'For Singapore use, the route is often cleaner than a consular file. The main question is still what the receiving side wants to see: the original, a certified copy, or a fuller set.',
      zh: '澳洲文件用于新加坡，通常比重领馆路线更清晰，但真正要看的仍是接收方要原件、认证副本，还是更完整的材料组合。',
    },
    serviceScope: {
      en: 'This is one of the more workable Australia-side routes, especially for standard public and academic documents. The file setup still matters more than the destination label.',
      zh: '这是澳洲侧相对好处理的一条路线，尤其适合标准公共文件和学历文件。但即便如此，决定成败的仍然是文件形态，而不是国家标签本身。',
    },
    officialBaseline: {
      en: 'Australian public documents and properly prepared notarised documents can usually move through a clear official path for Singapore use. Most variation comes from the document format, not from Singapore itself.',
      zh: '澳洲公共文件和准备合格的公证文件，通常都能较清晰地进入面向新加坡的官方路径。真正的差异，多半来自文件形式本身，而不是目的地国家的复杂度。',
    },
    screeningDiscipline: {
      en: 'The first review is usually about format: whether the receiving side is happy with the document on its own, or whether it will later ask for originals or supporting records.',
      zh: '前期最常见的判断还是材料形式：接收方是接受这份文件本身，还是后面还会追原件、辅助证明，或者要求换一种提交形式。',
    },
    routeType: {
      en: 'Usually a straightforward apostille-style route, with the detail work sitting in file format and supporting material rather than consular escalation.',
      zh: '大多数情况下都属于相对直接的海牙路线，真正的细节工作反而在于材料形式和辅助文件，而不是升级成领馆链路。',
    },
    searchIntents: [
      { en: 'Australian documents for use in Singapore', zh: '澳洲文件用于新加坡' },
      { en: 'Australia apostille for Singapore', zh: '澳洲海牙认证用于新加坡' },
      { en: 'Australian degree certificate for Singapore', zh: '澳洲学历证书用于新加坡' },
      { en: 'Australian company documents for Singapore', zh: '澳洲公司文件用于新加坡' },
    ],
    typicalRequirements: [
      { en: 'Passport bio page and a clear copy or original of the document set', zh: '护照资料页以及清晰扫描件或原件' },
      { en: 'Academic files may need supporting graduation evidence if the receiving side asks for it', zh: '学历文件如接收方要求，可能还需补充毕业证明材料' },
      { en: 'Signed documents may need witnessed-signature review before intake is confirmed', zh: '签字文件可能需先做见证签字核验后再确认受理' },
      { en: 'Corporate sets may require confirmation of which company document version is acceptable', zh: '公司文件通常要先确认接收方接受哪一种版本' },
    ],
    expedited: {
      en: 'This route is more likely to support expedited handling than consular-heavy lanes, but rush feasibility still depends on whether the file can proceed as copy-based or needs originals/signature handling.',
      zh: '这条路线通常比领馆链路更适合评估加急，但是否能加急仍取决于文件能否按副本路径处理，还是需要原件/签字处理。',
    },
    reviewFocus: [
      { en: 'Whether the Singapore side accepts apostille-first without extra mission handling', zh: '新加坡接收方是否接受纯海牙主线，无需额外使团处理' },
      { en: 'Whether the file can proceed as certified true copy or needs original presentation', zh: '文件可否按认证副本推进，还是必须提交原件' },
      { en: 'Whether academic or company documents need supporting evidence', zh: '学历或公司文件是否还需补充证明材料' },
    ],
    commonIssues: [
      { en: 'Client knows the country but not the exact receiving institution', zh: '客户知道目的地国家，但不知道具体接收机构' },
      { en: 'The document type is too general and the acceptable format is still unclear', zh: '文件类型描述过于笼统，导致材料格式尚不明确' },
      { en: 'Signed documents are drafted, but signing format has not been reviewed yet', zh: '签字文件已起草，但签署格式尚未经过核验' },
    ],
    userNeedsFirst: [
      { en: 'Document type and intended use in Singapore', zh: '文件类型及在新加坡的用途' },
      { en: 'Whether the receiving side needs originals or certified copies', zh: '接收方是否需要原件或认证副本' },
      { en: 'Recipient name, company, or institution if available', zh: '如有，请提供收件人、公司或机构名称' },
    ],
    beforePaymentReview: {
      en: 'Before anything is confirmed, the file is checked for format, supporting records, and whether the Singapore side is likely to ask for more than a routine apostille-style file.',
      zh: '正式确认前，通常会先核验材料形式、是否还要补辅助文件，以及新加坡接收方大概率会把它当作常规海牙文件，还是会要求更多东西。',
    },
    commonDocumentSlugs: ['degree-certificate', 'marriage-certificate', 'power-of-attorney', 'company-documents'],
    issuingCountrySlug: 'australia',
    destinationCountrySlug: 'singapore',
  },
  {
    slug: 'australian-documents-for-use-in-united-kingdom',
    title: {
      en: 'Australian Documents for Use in the United Kingdom',
      zh: '澳洲文件用于英国',
    },
    subheading: {
      en: 'For UK use, the practical question is often simple: is the document in hand the right one, or does the receiving side want a newer issue or extra support material.',
      zh: '澳洲文件用于英国，常常最后只落在一个很实际的问题上：接收方要不要你手上的这份证书，还是要更新版，或者更完整的辅助材料。',
    },
    serviceScope: {
      en: 'This route usually stays inside the Australian issuing lane. The work is less about chain complexity and more about whether the file suits the UK body that will receive it.',
      zh: '这条路线通常能比较完整地留在澳洲签发主线里。关键不是链路有多复杂，而是这份文件对英国接收单位来说到底对不对。',
    },
    officialBaseline: {
      en: 'Australian documents can usually be prepared through the Australian side without much difficulty. For UK use, the bigger issue is often document age, issue version, and what the receiving institution will actually accept.',
      zh: '澳洲文件通常都可以在澳洲侧较清晰地准备好。到了英国用途，真正的问题往往是文件是不是够新、版本对不对，以及接收机构到底接受什么。',
    },
    screeningDiscipline: {
      en: 'The early review is usually practical: how old the file is, whether a fresh issue is safer, and whether the UK side is asking for this document rather than a different version of it.',
      zh: '前期判断通常都很务实：这份文件有多旧、是不是补开新版更稳、以及英国接收方要的到底是不是这一份，而不是另一个版本。',
    },
    routeType: {
      en: 'Usually a clean apostille-style route. Most of the variation sits with the receiving institution rather than any heavy legalisation chain.',
      zh: '通常属于比较干净的海牙路线。大多数变化都来自接收机构，而不是复杂的认证链路。',
    },
    searchIntents: [
      { en: 'Australian documents for use in the UK', zh: '澳洲文件用于英国' },
      { en: 'Australia apostille for UK use', zh: '澳洲海牙认证用于英国' },
      { en: 'Australian police check for the UK', zh: '澳洲无犯罪记录用于英国' },
      { en: 'Australian degree certificate for the UK', zh: '澳洲学历证书用于英国' },
    ],
    typicalRequirements: [
      { en: 'Passport bio page and the actual document in original or reviewable scan form', zh: '护照资料页以及文件原件或可核验扫描件' },
      { en: 'Government-issued records may need original presentation depending on the acceptance side', zh: '政府类文件按接收要求可能需要原件' },
      { en: 'Academic documents may need supporting graduation or issuance evidence', zh: '学历文件可能需要补充毕业或签发证明' },
      { en: 'Police or civil status documents should be checked for issue date and version first', zh: '无犯罪或民事状态文件应先核验出具日期和版本' },
    ],
    expedited: {
      en: 'Expedite is often easier to evaluate on UK-facing apostille-style routes than on consular routes, but it still depends on whether the correct document version is already in hand.',
      zh: '相比领馆链路，面向英国的海牙路径通常更容易评估加急，但前提仍是客户已持有正确版本的文件。',
    },
    reviewFocus: [
      { en: 'Whether the UK side needs a current issue or a replacement issue rather than an old copy', zh: '英国接收方是否要求近期补发件，而不是旧版本文件' },
      { en: 'Whether the file can proceed as copy, original, or supporting-evidence-based academic set', zh: '文件应按副本、原件，还是带辅助证明的学历组合推进' },
      { en: 'Whether any translation or institutional wording issue needs to be cleared before intake', zh: '是否存在翻译或机构表述问题，需要在受理前先清楚' },
    ],
    commonIssues: [
      { en: 'Client holds an old version of the certificate, but the receiving side wants a newer issue', zh: '客户持有旧版本证书，但接收方要求较新的签发版本' },
      { en: 'Academic files lack supporting graduation evidence', zh: '学历文件缺少辅助毕业证明' },
      { en: 'The receiving authority is described too broadly to lock the route', zh: '接收机构描述过于宽泛，导致路线难以锁定' },
    ],
    userNeedsFirst: [
      { en: 'Which UK institution or authority will receive the document', zh: '文件将递交给英国哪一家机构或单位' },
      { en: 'Whether translations or supporting records are required', zh: '是否需要翻译件或补充文件' },
      { en: 'Whether the document is original, replacement issue, or certified copy', zh: '文件是原件、补发件还是认证副本' },
    ],
    beforePaymentReview: {
      en: 'Before anything is confirmed, the file is checked for version, completeness, and whether the UK side is likely to accept it as-is or ask for a fresher or broader set.',
      zh: '正式确认前，通常会先看版本、材料完整度，以及英国接收方是会照现状接受，还是更可能要求新版或更完整的文件组合。',
    },
    commonDocumentSlugs: ['birth-certificate', 'degree-certificate', 'police-check'],
    issuingCountrySlug: 'australia',
    destinationCountrySlug: 'united-kingdom',
  },
  {
    slug: 'australian-documents-for-use-in-united-states',
    title: {
      en: 'Australian Documents for Use in the United States',
      zh: '澳洲文件用于美国',
    },
    subheading: {
      en: 'For US use, the route often changes once the receiving body is named. State, school, employer, and filing purpose all matter.',
      zh: '澳洲文件用于美国，一旦接收机构具体化，事情往往就不再简单。州别、学校、雇主和提交用途，都会影响什么才算可行。',
    },
    serviceScope: {
      en: 'This remains an Australia-side route, but U.S. receiving practice is not uniform. The file usually needs to be checked against a real institution or filing body before the path feels settled.',
      zh: '这仍然是一条澳洲侧路线，但美国接收实践并不统一。很多时候，必须先对上具体机构或提交单位，路线才会真正稳定下来。',
    },
    officialBaseline: {
      en: 'Australia can prepare the relevant document classes through the usual official channels. The uncertainty usually sits on the U.S. side, where acceptance changes by state, school, employer, or filing context.',
      zh: '澳洲侧可以按常规官方路径处理相应类别的文件。真正的不确定性更多出现在美国接收端，因为是否接受，常常会随着州别、学校、雇主或提交场景而变化。',
    },
    screeningDiscipline: {
      en: 'The first review usually looks at the recipient, the document version, and whether the file is still a straightforward certificate matter or has turned into a signing-format problem.',
      zh: '前期通常先看接收方、文件版本，以及这份文件到底还是普通证书问题，还是已经变成签署形式的问题。',
    },
    routeType: {
      en: 'Usually apostille-first, but only once the U.S. receiving side is specific enough for that to mean something practical.',
      zh: '通常还是海牙为主，但前提是美国接收方已经具体到足以让这条路线有实际意义。',
    },
    searchIntents: [
      { en: 'Australian documents for use in the USA', zh: '澳洲文件用于美国' },
      { en: 'Australia apostille for US use', zh: '澳洲海牙认证用于美国' },
      { en: 'Australian birth certificate for the USA', zh: '澳洲出生证明用于美国' },
      { en: 'Australian company documents for the USA', zh: '澳洲公司文件用于美国' },
    ],
    typicalRequirements: [
      { en: 'Passport bio page and either the original document or a clean review copy', zh: '护照资料页，以及文件原件或清晰核验副本' },
      { en: 'For company documents, identify the exact filing set before intake', zh: '公司文件需先确认具体提交组合后再进入受理' },
      { en: 'For signed documents, execution and witness requirements should be reviewed first', zh: '签字文件应先核验签署方式和见证要求' },
      { en: 'For birth, marriage, or police documents, confirm whether a recent issue is preferred', zh: '出生、婚姻或无犯罪文件要先确认是否需近期签发版本' },
    ],
    expedited: {
      en: 'Expedite may be available on parts of the Australia-side process, but the real timeline depends on the exact US receiving use, file version, and whether originals are required.',
      zh: '部分澳洲侧步骤可评估加急，但真实时效仍取决于美国用途、文件版本以及是否需要原件。',
    },
    reviewFocus: [
      { en: 'Which US institution, employer, state body, or school is receiving the file', zh: '究竟是美国哪家机构、雇主、州级部门或学校接收文件' },
      { en: 'Whether the route is straightforward apostille-first or needs extra execution review', zh: '路线是否属于直接海牙主线，还是还要加做签署格式核验' },
      { en: 'Whether the client holds the correct issue version before the file is locked', zh: '在锁定路线前，客户是否持有正确签发版本的文件' },
    ],
    commonIssues: [
      { en: 'The destination is “USA”, but no institution or filing purpose is provided', zh: '只知道目的地是美国，但没有具体机构或用途' },
      { en: 'Company or signed documents are sent before execution format is cleared', zh: '公司文件或签字文件在签署格式未核验前就提交' },
      { en: 'Client assumes any copy is enough, but the receiving side later asks for originals', zh: '客户以为任意副本都可以，但接收方后来要求原件' },
    ],
    userNeedsFirst: [
      { en: 'Document type and intended filing purpose in the USA', zh: '文件类型及在美国的具体提交用途' },
      { en: 'State, school, employer, or authority if known', zh: '如已知，请提供州、学校、雇主或接收机构' },
      { en: 'Whether the receiving side needs originals or scans first', zh: '接收方是否先需要原件或扫描件' },
    ],
    beforePaymentReview: {
      en: 'Before anything is confirmed, the file is checked against the likely U.S. receiving path, any missing support material, and whether the route still makes sense once the actual filing purpose is known.',
      zh: '正式确认前，通常会先对照美国接收路径核验这份文件、补充材料是否缺漏，以及具体提交用途一旦明确后，这条路线还能不能成立。',
    },
    commonDocumentSlugs: ['birth-certificate', 'degree-certificate', 'company-documents'],
    issuingCountrySlug: 'australia',
    destinationCountrySlug: 'usa',
  },
  {
    slug: 'canadian-documents-for-use-in-hong-kong',
    title: {
      en: 'Canadian Documents for Use in Hong Kong',
      zh: '加拿大发文件用于香港',
    },
    subheading: {
      en: 'Route page for Canada-issued documents being prepared for use in Hong Kong.',
      zh: '面向加拿大签发文件赴香港使用场景的路线入口页。',
    },
    serviceScope: {
      en: 'This route is mainly apostille-led on the Canadian side. EGS reviews whether the Hong Kong receiving side keeps the route simple or introduces selected additional handling.',
      zh: '该路线在加拿大侧以海牙路径为主。EGS 会核验香港接收方要求，以判断是否保持标准路径或加入特定补充处理。',
    },
    officialBaseline: {
      en: 'Officially, Canada now routes apostille by province for some jurisdictions and through Global Affairs Canada for others. For Hong Kong-facing files, the issuing province and document class therefore matter before anything else.',
      zh: '从官方基线看，加拿大现在由部分省份自行签发 apostille，其余地区由 Global Affairs Canada 处理。因此赴香港文件的第一判断点是签发省份和文件类别。',
    },
    screeningDiscipline: {
      en: 'EGS screens whether the file should stay copy-based, move into affidavit-style handling, or add translation-copy logic for the actual Hong Kong use before confirming the route.',
      zh: 'EGS 会先判断该案应保持副本路径、转入宣誓路径，还是要加入翻译副本逻辑，再确认赴香港路线。',
    },
    routeType: {
      en: 'Usually apostille-first. Selected consular-style handling may apply only for specific document sets or receiving requirements.',
      zh: '通常以海牙路径为主。只有在特定文件组合或接收要求下，才可能涉及部分领馆式处理。',
    },
    searchIntents: [
      { en: 'Canadian documents for use in Hong Kong', zh: '加拿大发文件用于香港' },
      { en: 'Canada apostille for Hong Kong use', zh: '加拿大海牙认证用于香港' },
      { en: 'Canadian birth certificate for Hong Kong', zh: '加拿大出生证明用于香港' },
      { en: 'Canadian company documents for Hong Kong', zh: '加拿大公司文件用于香港' },
    ],
    typicalRequirements: [
      { en: 'Passport bio page plus either a scanned copy, certified true copy route, or original affidavit route depending on the document class', zh: '护照资料页，以及按文件类别选择扫描件、认证副本路径或原件宣誓路径' },
      { en: 'For signed documents, original execution copy and signing video may be required', zh: '签字文件通常需要原件及签署视频' },
      { en: 'For some files intended for Chinese use contexts, translation copy may need to be assessed early', zh: '部分涉及中文使用场景的文件，可能需要尽早评估翻译副本' },
      { en: 'Police or bank-related originals may need original-affidavit style handling', zh: '无犯罪或银行类文件可能需要按原件宣誓路径处理' },
    ],
    expedited: {
      en: 'Some Canada-side apostille-style files can move faster where copy-based handling is available. Signed-affidavit or original-affidavit routes are less flexible and should be reviewed first.',
      zh: '部分加拿大侧海牙文件若可按副本路径推进，时效会更灵活；签字宣誓或原件宣誓路径通常不宜先承诺加急。',
    },
    reviewFocus: [
      { en: 'Whether the file is best handled as certified true copy, translated copy, signed affidavit, or original affidavit', zh: '文件更适合走认证副本、翻译副本、签字宣誓还是原件宣誓路径' },
      { en: 'Whether Hong Kong receiving use is simple apostille acceptance or a more specific institutional requirement', zh: '香港接收用途是普通海牙接受，还是有更具体的机构要求' },
      { en: 'Whether the client can provide originals where the route cannot stay copy-based', zh: '若路线不能停留在副本模式，客户能否提供原件' },
    ],
    commonIssues: [
      { en: 'Client assumes every Canadian file can go as copy, but some categories need affidavit/original handling', zh: '客户以为所有加拿大文件都能走副本路径，但部分文件需要宣誓/原件处理' },
      { en: 'Hong Kong use is described generally, without the actual receiving context', zh: '香港用途描述过于笼统，没有具体接收场景' },
      { en: 'Signed documents arrive without execution evidence or signing record', zh: '签字文件提交时缺少签署证明或签署记录' },
    ],
    userNeedsFirst: [
      { en: 'Document type and use purpose in Hong Kong', zh: '文件类型及在香港的用途' },
      { en: 'Whether the document is federal, provincial, or institution-issued', zh: '文件是联邦、省级还是机构签发' },
      { en: 'Whether originals, certified copies, or scans are ready', zh: '是否已准备原件、认证副本或扫描件' },
    ],
    beforePaymentReview: {
      en: 'Before payment, EGS reviews the Canadian issuing path, checks what format Hong Kong is likely to accept, and confirms whether the route remains apostille-first or needs selected extra handling.',
      zh: '付款前，EGS 会先核验加拿大签发路径、确认香港可能接受的材料格式，并判断路线是否保持海牙主线或需要额外处理。',
    },
    commonDocumentSlugs: ['birth-certificate', 'marriage-certificate', 'company-documents'],
    issuingCountrySlug: 'canada',
    destinationCountrySlug: 'hong-kong',
  },
  {
    slug: 'us-documents-for-use-in-singapore',
    title: {
      en: 'US Documents for Use in Singapore',
      zh: '美国文件用于新加坡',
    },
    subheading: {
      en: 'Route page for United States-issued documents being prepared for use in Singapore.',
      zh: '面向美国签发文件赴新加坡使用场景的路线入口页。',
    },
    serviceScope: {
      en: 'This route is mainly apostille-led on the US side. EGS reviews state-level origin, document execution format, and the Singapore receiving path before intake.',
      zh: '该路线在美国侧以海牙路径为主。EGS 会在受理前核验州级签发来源、文件签署格式及新加坡接收路径。',
    },
    officialBaseline: {
      en: 'Officially, U.S. document handling varies by state and by whether the file is a public document, notarised private document, or signed instrument. Singapore-side acceptance may still be straightforward, but the U.S. upstream path is not one uniform product.',
      zh: '从官方基线看，美国文件会因州别以及属于公共文件、公证私文书或签字文件而走不同路径。新加坡接收端可能较清晰，但美国上游并不是单一产品。',
    },
    screeningDiscipline: {
      en: 'EGS screens the state route first, then checks whether the Singapore receiving side truly accepts an apostille-first path or whether signing format and originals will change the structure.',
      zh: 'EGS 会先看州级路径，再核验新加坡接收方是否真正接受海牙主线，还是会因为签署格式和原件要求而改变结构。',
    },
    routeType: {
      en: 'Usually apostille-first. Selected consular handling may apply for specific execution or receiving-side scenarios.',
      zh: '通常以海牙路径为主。某些签署格式或接收场景下，可能涉及部分领馆处理。',
    },
    searchIntents: [
      { en: 'US documents for use in Singapore', zh: '美国文件用于新加坡' },
      { en: 'US apostille for Singapore use', zh: '美国海牙认证用于新加坡' },
      { en: 'US power of attorney for Singapore', zh: '美国委托书用于新加坡' },
      { en: 'US company documents for Singapore', zh: '美国公司文件用于新加坡' },
    ],
    typicalRequirements: [
      { en: 'Passport bio page and identification of the issuing state or authority', zh: '护照资料页，以及明确文件的州级或机构签发来源' },
      { en: 'For signed documents, original execution copy and signing evidence may be required', zh: '签字文件通常需要原件及签署证明' },
      { en: 'For copy-based apostille lanes, a clear scan may be enough for pre-review', zh: '若是副本型海牙路径，预审阶段清晰扫描件通常可先核验' },
      { en: 'For academic or company files, supporting records may still be needed before the route is locked', zh: '学历或公司文件在锁定路线前，可能仍需补充证明材料' },
    ],
    expedited: {
      en: 'Expedite may be possible where the US file can proceed on a clean apostille-first path. It is less straightforward when notarisation, state variation, or signed-document handling still needs review.',
      zh: '若美国文件能走清晰的海牙主线，部分情况下可评估加急；但若仍涉及公证、州别差异或签字文件处理，则不宜先写死时效。',
    },
    reviewFocus: [
      { en: 'Which state route applies and whether notarisation is already complete', zh: '适用哪一个州级路径，以及公证是否已完成' },
      { en: 'Whether the Singapore side accepts the file as apostille-first without extra handling', zh: '新加坡接收方是否接受纯海牙主线，无需额外处理' },
      { en: 'Whether the file can stay copy-based or needs witnessed-signature/original treatment', zh: '文件能否保持副本路线，还是需要见证签字/原件处理' },
    ],
    commonIssues: [
      { en: 'Client does not know which US state path applies', zh: '客户并不清楚应走哪个美国州级路径' },
      { en: 'Signed documents are drafted but have not been reviewed for execution format', zh: '签字文件已起草，但签署格式尚未核验' },
      { en: 'The receiving side in Singapore is known only at country level, not institution level', zh: '只知道目的地是新加坡，但不知道具体接收机构' },
    ],
    userNeedsFirst: [
      { en: 'Which US state or authority issued the document', zh: '文件由美国哪个州或机构签发' },
      { en: 'Whether notarisation is already complete or still needed', zh: '是否已完成公证，或仍需先做公证' },
      { en: 'Intended use in Singapore and receiving institution if known', zh: '在新加坡的用途及接收机构（如已知）' },
    ],
    beforePaymentReview: {
      en: 'Before payment, EGS checks the state-level route logic, whether notarisation or supporting materials are still missing, and whether the Singapore use case stays inside a standard apostille-first lane.',
      zh: '付款前，EGS 会先核验州级路线逻辑、是否仍缺公证或补充材料，并判断新加坡用途是否属于标准海牙主线。',
    },
    commonDocumentSlugs: ['degree-certificate', 'power-of-attorney', 'company-documents'],
    issuingCountrySlug: 'usa',
    destinationCountrySlug: 'singapore',
  },
  {
    slug: 'australian-apostille-for-use-in-china',
    title: {
      en: 'Australian Apostille for Use in China',
      zh: '澳洲文件海牙认证用于中国',
    },
    subheading: {
      en: 'For mainland China, the old consular-authentication assumption is often no longer the right starting point. The real question is whether the file fits the current apostille path and what the receiving side still expects around it.',
      zh: '对中国大陆来说，很多人第一反应还是“领馆认证”，但这个习惯已经过时。现在更重要的是，这份文件到底能不能真正落在当前的 apostille 路径里，以及接收方还会额外要求什么。',
    },
    serviceScope: {
      en: 'This is one of the main Australia-side routes. It works best when the document class is clear early and the China receiving side is described properly.',
      zh: '这是澳洲侧最重要的商业路线之一。它最怕的不是难做，而是前面没把文件类别看清，也没把中国接收方说具体，结果把完全不同的案件都当成同一种产品。',
    },
    officialBaseline: {
      en: 'Mainland China has applied the Hague Convention since 7 November 2023. For many Australia-issued public documents and properly prepared private documents, that shifts the baseline away from routine consular authentication and back to apostille.',
      zh: '中国大陆自 2023 年 11 月 7 日起适用海牙公约。对很多澳洲签发的公共文件和准备合格的私文书来说，基础路线已经从常规领馆认证转回 apostille。',
    },
    screeningDiscipline: {
      en: 'The early review usually looks at the receiving authority, whether the file really stays inside an apostille path, and whether originals, translation, or signing format change the job materially.',
      zh: '前期通常先看接收机构、这份文件是不是真的能停留在 apostille 路径里，以及原件、翻译或签署形式会不会把案件从常规变成专业路线。',
    },
    routeType: {
      en: 'Apostille-first for mainland China, but still very much a route-confirmation matter once document class and receiving-side wording are brought back into the picture.',
      zh: '中国大陆现在的基础确实是 apostille-first，但一旦把文件类别和接收方要求放回现实里看，这仍然是一件要先确认路线的事。',
    },
    searchIntents: [
      { en: 'Australian apostille for China', zh: '澳洲文件海牙认证用于中国' },
      { en: 'Australia apostille for China use', zh: '澳洲海牙认证用于中国' },
      { en: 'Australian company documents apostille for China', zh: '澳洲公司文件海牙认证用于中国' },
      { en: 'Australian statutory declaration apostille for China', zh: '澳洲法定声明海牙认证用于中国' },
    ],
    typicalRequirements: [
      { en: 'Passport bio page for identity review', zh: '用于身份核验的护照资料页' },
      { en: 'Clear copy or original of the actual document set before route confirmation', zh: '在确认路线前提供清晰扫描件或原件' },
      { en: 'If the file is a signed document, execution format must be reviewed before the chain is fixed', zh: '如属于签字文件，需先核验签署形式再锁定路径' },
      { en: 'Chinese translation or a destination-facing bilingual format may still need early review', zh: '中文翻译或面向接收方的双语格式，仍可能需要提前核验' },
    ],
    expedited: {
      en: 'Rush handling should still be treated cautiously. Some Australian-side steps may move faster, but document class, originals, translations, and execution format still affect whether the route can move cleanly.',
      zh: '加急仍应谨慎处理。部分澳洲侧步骤可能可以更快，但文件类别、原件、翻译和签署形式仍会影响路线能否顺畅推进。',
    },
    reviewFocus: [
      { en: 'Whether the China receiving side is genuinely working on an apostille basis after China’s Hague implementation', zh: '中国接收方是否确实按中国适用海牙后的 apostille 路径受理' },
      { en: 'Whether the file is registry-based, copy-based, or execution-sensitive', zh: '该文件属于登记证书、副本路径，还是对签署执行更敏感的文件' },
      { en: 'Whether originals, translations, or additional documentary support should be built in from the start', zh: '是否应从一开始就纳入原件、翻译或补充材料安排' },
    ],
    commonIssues: [
      { en: 'The client still uses “consular authentication” as a generic phrase even though the actual China route is now apostille-based', zh: '客户仍把“领馆认证”当成泛词，但实际中国路线现在已改为 apostille' },
      { en: 'Signed documents are treated like simple certificate files at the first enquiry stage', zh: '在初次咨询时，把签字文件当成普通证书类文件处理' },
      { en: 'The receiving side in China is still unclear, so the route cannot be locked safely', zh: '中国接收方仍不明确，导致路线无法安全锁定' },
    ],
    userNeedsFirst: [
      { en: 'Actual China receiving authority or filing purpose', zh: '中国实际接收机构或提交用途' },
      { en: 'Document type and whether originals are available', zh: '文件类型以及是否持有原件' },
      { en: 'Whether the file includes signatures, declarations, or company-authority wording', zh: '文件是否包含签字、声明或公司授权内容' },
    ],
    beforePaymentReview: {
      en: 'Before anything is confirmed, the file is checked against the current China apostille route, the correct Australian starting point, and whether originals, translation, or execution issues make it more than a routine apostille file.',
      zh: '正式确认前，通常会先核验它是否符合当前中国 apostille 路径、澳洲起点是否识别正确，以及原件、翻译或签署问题会不会让它超出常规海牙案件。',
    },
    commonDocumentSlugs: ['company-documents', 'power-of-attorney', 'statutory-declaration'],
    issuingCountrySlug: 'australia',
    destinationCountrySlug: 'china',
  },
  {
    slug: 'australian-consular-legalisation-for-use-in-uae',
    title: {
      en: 'Australian Consular Legalisation for Use in the UAE',
      zh: '澳洲文件领馆认证用于阿联酋',
    },
    subheading: {
      en: 'UAE matters usually stop being simple quite early. What matters most is what the receiving side asks for, whether originals will move, and whether the file is personal, corporate, or signing-sensitive.',
      zh: '到了阿联酋，很多“简单海牙就行”的假设就会失效。真正重要的是接收方怎么要求、原件会不会流转，以及文件究竟是个人件、公司件，还是对签署很敏感的文件。',
    },
    serviceScope: {
      en: 'This is a major commercial route, but it only stays manageable when the UAE-side requirement is clear early. Broad descriptions usually create problems later.',
      zh: '这是一条很重要的商业路线，但前提是阿联酋那边的要求要早点说清。否则很多文件都会在前期被描述得太笼统、判断得太简单。',
    },
    officialBaseline: {
      en: 'The Australian starting point still depends on whether the file is a public document, a notarised private document, or a commercial record. For UAE work, that upstream classification matters before any embassy-facing step is discussed.',
      zh: '澳洲这边的起点，仍然取决于文件属于公共文件、公证私文书还是商业记录。到了阿联酋路线，这个上游分类一定得先看清，后面才谈得到使馆环节。',
    },
    screeningDiscipline: {
      en: 'The first review usually focuses on whether this is really a consular file, whether originals or signed documents are involved, and whether the document set is stable enough to move forward.',
      zh: '前期通常先看这到底是不是真正的领馆案件、会不会牵涉原件或签字文件，以及材料包是否已经稳定到足以往下推进，而不是走到一半再重做。',
    },
    routeType: {
      en: 'Consular-facing route, usually far more sensitive to originals, commercial paperwork, and destination wording than a standard apostille file.',
      zh: '这是典型的领馆导向路线，通常比标准海牙文件更吃原件、商业材料组合和接收方表述。',
    },
    searchIntents: [
      { en: 'Australian consular legalisation for UAE', zh: '澳洲文件领馆认证用于阿联酋' },
      { en: 'Australian embassy legalisation for UAE', zh: '澳洲文件使馆认证用于阿联酋' },
      { en: 'UAE legalisation Australia', zh: '阿联酋认证 澳洲' },
      { en: 'Australian power of attorney legalisation UAE', zh: '澳洲委托书领馆认证用于阿联酋' },
    ],
    typicalRequirements: [
      { en: 'Passport bio page and a clear review copy of the document set', zh: '护照资料页及清晰文件扫描件' },
      { en: 'Originals may still be required depending on the document class and receiving-side expectation', zh: '根据文件类别和接收方要求，后续仍可能需要原件' },
      { en: 'For signed documents, execution format must be reviewed before route confirmation', zh: '签字文件需先核验签署形式再确认路径' },
      { en: 'Commercial or authority documents may need more exact receiving-purpose clarification than personal certificates', zh: '商业或授权类文件通常比个人证书更需要明确接收用途' },
    ],
    expedited: {
      en: 'Consular legalisation routes are generally less reliable for rush commitments than simple apostille matters. EGS reviews urgency carefully and only after the file structure is clear.',
      zh: '领馆认证路线通常比简单海牙案件更不适合直接承诺加急。EGS 只会在材料结构清晰后，谨慎评估时效。',
    },
    reviewFocus: [
      { en: 'Whether the UAE receiving side truly expects consular legalisation', zh: '阿联酋接收方是否真的要求领馆认证' },
      { en: 'Whether the file involves originals, signed instruments, or company-authority documents', zh: '该案是否涉及原件、签字文件或公司授权文件' },
      { en: 'Whether the document wording and destination use are specific enough to lock the route safely', zh: '文件表述和目的地用途是否足够明确，可安全锁定路线' },
    ],
    commonIssues: [
      { en: 'The client uses “UAE legalisation” without naming the actual ministry, bank, or authority', zh: '客户只说“阿联酋认证”，但没有明确具体部委、银行或机构' },
      { en: 'Company or POA files are treated as if they were simple certificate jobs', zh: '把公司文件或委托书案件当成普通证书处理' },
      { en: 'Original-handling issues surface only after the route was first assumed to be scan-based', zh: '原件流转问题在最初按扫描件路线判断后才暴露出来' },
    ],
    userNeedsFirst: [
      { en: 'Exact UAE use case and receiving authority if known', zh: '阿联酋具体用途及接收机构（如已知）' },
      { en: 'Document type and whether the file is signed or company-related', zh: '文件类型，以及是否属于签字文件或公司文件' },
      { en: 'Whether originals are already available for routing', zh: '是否已持有可用于办理的原件' },
    ],
    beforePaymentReview: {
      en: 'Before anything is confirmed, the file is checked for the actual UAE-side path, the correct Australian starting point, and whether originals, signatures, or company-use issues make it a more specialised matter.',
      zh: '正式确认前，通常会先核验真正的阿联酋路径、澳洲起点是否选对，以及原件、签署或公司用途问题会不会让它比表面看起来更专业。',
    },
    commonDocumentSlugs: ['power-of-attorney', 'company-documents', 'statutory-declaration'],
    issuingCountrySlug: 'australia',
    destinationCountrySlug: 'uae',
  },
  {
    slug: 'australian-consular-legalisation-for-use-in-saudi-arabia',
    title: {
      en: 'Australian Consular Legalisation for Use in Saudi Arabia',
      zh: '澳洲文件领馆认证用于沙特阿拉伯',
    },
    subheading: {
      en: 'Saudi matters need more than a generic “legalisation” enquiry. What matters most is which authority will receive the file and what type of document is actually being filed.',
      zh: '沙特路线，不能只用一个笼统的“做认证”来理解。关键往往不在国家名，而在于到底是哪家机构接收、提交的又是哪一类文件。',
    },
    serviceScope: {
      en: 'This is an important route, but only once the Saudi receiving path is concrete enough to work from. On paper many files look alike, but in practice they do not behave the same way.',
      zh: '这条路线商业价值很高，但前提是沙特接收路径要具体到足以落地。否则很多文件表面上看起来差不多，实际办理起来却完全不是一回事。',
    },
    officialBaseline: {
      en: 'The Australian starting point still depends on whether the file is public, notarised, or commercial in character. For Saudi use, that distinction matters before anyone starts talking about embassy steps.',
      zh: '澳洲这边的起点，仍然取决于文件本身是公共文件、公证件，还是商业性质的材料。到了沙特用途，这个区别一定得先分清，后面才谈使馆步骤。',
    },
    screeningDiscipline: {
      en: 'The early review usually looks at whether this is genuinely a consular file, whether originals or signed documents will drive the process, and whether the document set is ready enough to move without major revision.',
      zh: '前期通常先看这到底是不是领馆案件、原件或签字文件会不会成为主导因素，以及材料包是不是已经准备到能往下走，而不是中途大改。',
    },
    routeType: {
      en: 'Consular-facing route, usually more dependent on originals, company material, and destination wording than a routine apostille matter.',
      zh: '这是典型的领馆路线，通常比普通海牙案件更依赖原件、公司材料和接收方表述。',
    },
    searchIntents: [
      { en: 'Australian consular legalisation for Saudi Arabia', zh: '澳洲文件领馆认证用于沙特阿拉伯' },
      { en: 'Australian embassy legalisation for Saudi Arabia', zh: '澳洲文件使馆认证用于沙特阿拉伯' },
      { en: 'Saudi legalisation Australia', zh: '沙特认证 澳洲' },
      { en: 'Australian company documents legalisation Saudi Arabia', zh: '澳洲公司文件认证用于沙特阿拉伯' },
    ],
    typicalRequirements: [
      { en: 'Passport bio page and a clear review copy of the file set', zh: '护照资料页及清晰文件扫描件' },
      { en: 'Originals may still be required depending on the file class and receiving-side expectation', zh: '根据文件类别和接收方要求，后续仍可能需要原件' },
      { en: 'Commercial or authority documents usually need more exact receiving-purpose clarification', zh: '商业或授权类文件通常更需要明确接收用途' },
      { en: 'Signed documents must be screened for execution format before route confirmation', zh: '签字文件必须先核验签署形式再确认路径' },
    ],
    expedited: {
      en: 'Consular legalisation routes are generally less reliable for rush commitments than simple apostille files. EGS reviews urgency carefully and only after the route structure is clear.',
      zh: '领馆认证路线通常比简单海牙文件更不适合直接承诺加急。EGS 只会在路线结构清晰后谨慎评估时效。',
    },
    reviewFocus: [
      { en: 'Whether the Saudi receiving side truly expects consular legalisation', zh: '沙特接收方是否真的要求领馆认证' },
      { en: 'Whether the file involves company authority, signed instruments, or originals', zh: '该案是否涉及公司授权、签字文件或原件' },
      { en: 'Whether the destination use is specific enough to lock the route safely', zh: '目的地用途是否足够明确，可安全锁定路线' },
    ],
    commonIssues: [
      { en: 'The client uses “Saudi legalisation” without naming the actual ministry, employer, or authority', zh: '客户只说“沙特认证”，但没有明确具体部委、雇主或机构' },
      { en: 'Company or POA files are treated as simple certificate jobs', zh: '把公司文件或委托书案件当成普通证书处理' },
      { en: 'Original-handling issues appear late after the route was first assumed to be scan-based', zh: '原件流转问题在最初按扫描件路线判断后才暴露出来' },
    ],
    userNeedsFirst: [
      { en: 'Exact Saudi use case and receiving authority if known', zh: '沙特具体用途及接收机构（如已知）' },
      { en: 'Document type and whether the file is signed or company-related', zh: '文件类型，以及是否属于签字文件或公司文件' },
      { en: 'Whether originals are already available', zh: '是否已持有可用于办理的原件' },
    ],
    beforePaymentReview: {
      en: 'Before anything is confirmed, the file is checked for the actual Saudi-side path, the correct Australian starting point, and whether originals, signatures, or company-use issues make it more specialised.',
      zh: '正式确认前，通常会先核验真正的沙特接收路径、澳洲起点是否选对，以及原件、签署或公司用途问题会不会让它比最初听上去更专业。',
    },
    commonDocumentSlugs: ['company-documents', 'power-of-attorney', 'statutory-declaration'],
    issuingCountrySlug: 'australia',
    destinationCountrySlug: 'saudi-arabia',
  },
  {
    slug: 'australian-consular-legalisation-for-use-in-kuwait',
    title: {
      en: 'Australian Consular Legalisation for Use in Kuwait',
      zh: '澳洲文件领馆认证用于科威特',
    },
    subheading: {
      en: 'Kuwait files are less about the headline route label and more about what the document actually is. Certificates, signed documents, and company files need to be treated differently.',
      zh: '科威特这类案件，通常不是靠一个大标题路线词就能判断清楚。关键往往在于这份文件是证书、签字文件，还是公司材料，而原件和接收方表述一旦加入，处理方式就会分开。',
    },
    serviceScope: {
      en: 'This route can work well when the Kuwait-side requirement is described properly from the start. If not, the file often looks simple at enquiry stage and turns more technical later.',
      zh: '只要科威特那边的要求一开始就说清，这条路线通常是能稳稳往下做的。最怕的是前期看起来很简单，后面才发现其实技术性更强。',
    },
    officialBaseline: {
      en: 'The Australian starting point still changes by document class. Public records, notarised private documents, and company papers should not be treated as one Kuwait product just because they share the same destination.',
      zh: '澳洲这边的起点，仍然会随着文件类别变化。公共文件、公证私文书和公司文件，不能只因为目的地同是科威特，就被当成同一种产品处理。',
    },
    screeningDiscipline: {
      en: 'The early review usually focuses on whether Kuwait really expects a consular chain, whether originals or execution-sensitive documents are involved, and whether the route is stable enough to proceed.',
      zh: '前期通常先看科威特是否真的要求领馆链路、有没有原件或对签署敏感的文件，以及这条路线是不是已经稳定到不至于后面重做。',
    },
    routeType: {
      en: 'Consular-facing route. More document-sensitive than a standard apostille lane, especially on signed documents and company files.',
      zh: '领馆导向路线。通常比标准海牙路径更依赖文件判断，尤其在签字文件和公司文件上更明显。',
    },
    searchIntents: [
      { en: 'Australian consular legalisation for Kuwait', zh: '澳洲文件领馆认证用于科威特' },
      { en: 'Australian embassy legalisation for Kuwait', zh: '澳洲文件使馆认证用于科威特' },
      { en: 'Kuwait legalisation Australia', zh: '科威特认证 澳洲' },
      { en: 'Australian power of attorney legalisation Kuwait', zh: '澳洲委托书认证用于科威特' },
    ],
    typicalRequirements: [
      { en: 'Passport bio page and a clear review copy of the file set', zh: '护照资料页及清晰文件扫描件' },
      { en: 'Originals may still be required depending on the route and receiving-side expectation', zh: '根据路线和接收方要求，后续仍可能需要原件' },
      { en: 'Signed documents must be reviewed for execution format first', zh: '签字文件需先核验签署形式' },
      { en: 'Company or authority documents usually need more exact receiving-purpose clarification', zh: '公司或授权类文件通常更需要明确接收用途' },
    ],
    expedited: {
      en: 'Kuwait-facing consular routes should be treated cautiously on timing. EGS reviews urgency only after the route structure and document class are clear.',
      zh: '面向科威特的领馆路线在时效上应谨慎处理。EGS 只会在路线结构和文件类别明确后再评估时效。',
    },
    reviewFocus: [
      { en: 'Whether the Kuwait receiving side truly expects consular legalisation', zh: '科威特接收方是否真的要求领馆认证' },
      { en: 'Whether the file is a certificate, a signed document, or a company record set', zh: '该案属于证书、签字文件还是公司文件组合' },
      { en: 'Whether originals or extra supporting materials should be built in early', zh: '是否应尽早纳入原件或补充材料安排' },
    ],
    commonIssues: [
      { en: 'The client gives only a country name, without the actual receiving authority in Kuwait', zh: '客户只提供国家名，没有提供科威特实际接收机构' },
      { en: 'Signed documents are treated like ordinary certificate files', zh: '把签字文件当成普通证书处理' },
      { en: 'The route was first treated as simple, but later original-handling issues appear', zh: '案件最初按简单路线判断，后期才暴露原件流转问题' },
    ],
    userNeedsFirst: [
      { en: 'Exact Kuwait use case and receiving authority if known', zh: '科威特具体用途及接收机构（如已知）' },
      { en: 'Document type and whether the file includes signatures or company authority wording', zh: '文件类型，以及是否包含签字或公司授权表述' },
      { en: 'Whether originals are already available', zh: '是否已持有原件' },
    ],
    beforePaymentReview: {
      en: 'Before anything is confirmed, the file is checked for the actual Kuwait-side path, the correct Australian starting point, and whether originals, signatures, or company-use issues make it more specialised.',
      zh: '正式确认前，通常会先核验真正的科威特接收路径、澳洲起点是否选对，以及原件、签署或公司用途问题会不会让它比一开始预期的更专业。',
    },
    commonDocumentSlugs: ['power-of-attorney', 'company-documents', 'birth-certificate'],
    issuingCountrySlug: 'australia',
    destinationCountrySlug: 'kuwait',
  },
  {
    slug: 'australian-consular-legalisation-for-use-in-malaysia',
    title: {
      en: 'Australian Consular Legalisation for Use in Malaysia',
      zh: '澳洲文件领馆认证用于马来西亚',
    },
    subheading: {
      en: 'Malaysia work usually gets messy when the file type was not separated early enough. Education, company, civil, and signed documents do not belong on the same track.',
      zh: '马来西亚这类案件，很多时候不是难在后面，而是前面没把文件类型分开。教育、公司、民事和签字文件，不能只因为目的地一样，就按同一种逻辑处理。',
    },
    serviceScope: {
      en: 'This route can still be workable, but it needs a firmer early read on what Malaysia-side use actually involves. Broad labels usually create more confusion than clarity here.',
      zh: '这条路线仍然是可以做的，但前提是要更早、更明确地看清马来西亚那边到底怎么用。到了这里，笼统的概括词往往只会制造混乱。',
    },
    officialBaseline: {
      en: 'The Australian starting point still depends on whether the file is educational, commercial, registry-based, or a signed private document. For Malaysia work, that distinction matters more than a broad “legalisation” label.',
      zh: '澳洲这边的起点，仍然要先看文件属于教育、商业、登记证书还是签字私文书。到了马来西亚路线，这个区别比一个泛泛的“认证”说法更重要。',
    },
    screeningDiscipline: {
      en: 'The early review usually asks whether Malaysia really requires a non-Hague path, what category the file falls into, and whether the wording is stable enough to avoid a change of direction later.',
      zh: '前期通常先看马来西亚是否真的要求非海牙路径、这份文件到底属于哪一类，以及文件表述是否已经稳定到不会后面再改方向。',
    },
    routeType: {
      en: 'Non-Hague / route-confirmation first. Often more wording-sensitive than a standard apostille page.',
      zh: '非海牙 / 优先做路线确认。通常比标准海牙页面更依赖接收方表述。',
    },
    searchIntents: [
      { en: 'Australian legalisation for Malaysia', zh: '澳洲文件认证用于马来西亚' },
      { en: 'Australian consular legalisation for Malaysia', zh: '澳洲文件领馆认证用于马来西亚' },
      { en: 'Australian academic documents legalisation Malaysia', zh: '澳洲学术文件认证用于马来西亚' },
      { en: 'Australian company documents legalisation Malaysia', zh: '澳洲公司文件认证用于马来西亚' },
    ],
    typicalRequirements: [
      { en: 'Passport bio page and a clear review copy of the file set', zh: '护照资料页及清晰文件扫描件' },
      { en: 'Educational files may need school-format review before route confirmation', zh: '教育文件在确认路线前通常要先核验学校文件格式' },
      { en: 'Company and signed documents usually need more exact receiving-purpose clarification', zh: '公司和签字文件通常更需要明确接收用途' },
      { en: 'Originals may still be required depending on the file type and receiving-side expectation', zh: '根据文件类型和接收方要求，后续仍可能需要原件' },
    ],
    expedited: {
      en: 'Malaysia-facing non-Hague work should not be sold purely on speed. EGS reviews urgency only after the document wording and route logic are clear.',
      zh: '面向马来西亚的非海牙工作不应仅按时效销售。EGS 只会在文件表述和路线逻辑清楚后再讨论加急。',
    },
    reviewFocus: [
      { en: 'Whether the Malaysia receiving side truly expects a non-Hague route', zh: '马来西亚接收方是否真的要求非海牙路径' },
      { en: 'Whether the file is educational, commercial, or execution-sensitive', zh: '该案属于教育、商业还是对签署敏感的文件' },
      { en: 'Whether the document wording is specific enough to lock the route', zh: '文件表述是否足够明确，可锁定路线' },
    ],
    commonIssues: [
      { en: 'The client uses “Malaysia legalisation” without clarifying the actual institution or filing use', zh: '客户只说“马来西亚认证”，但没有明确实际机构或提交用途' },
      { en: 'Education files are sent without confirming whether transcript, degree, or enrollment proof is the right lead document', zh: '教育类文件提交时，没有确认应该以成绩单、毕业证还是在读证明作为主文件' },
      { en: 'The route was first treated as simple, but later wording or original-handling issues appear', zh: '案件最初按简单路线判断，后期才暴露表述或原件问题' },
    ],
    userNeedsFirst: [
      { en: 'Exact Malaysia use case and receiving authority if known', zh: '马来西亚具体用途及接收机构（如已知）' },
      { en: 'Document type and whether it is educational, commercial, or signed', zh: '文件类型，以及属于教育、商业还是签字文件' },
      { en: 'Whether originals are already available', zh: '是否已持有原件' },
    ],
    beforePaymentReview: {
      en: 'Before anything is confirmed, the file is checked for the actual Malaysia-side path, the correct Australian starting point, and whether wording, originals, or support material make it more specialised than a routine file.',
      zh: '正式确认前，通常会先核验真正的马来西亚路径、澳洲起点是否选对，以及文件表述、原件或辅助材料会不会让它比常规海牙文件更专业。',
    },
    commonDocumentSlugs: ['degree-certificate', 'company-documents', 'power-of-attorney'],
    issuingCountrySlug: 'australia',
    destinationCountrySlug: 'malaysia',
  },
  {
    slug: 'australian-consular-legalisation-for-use-in-vietnam',
    title: {
      en: 'Australian Consular Legalisation for Use in Vietnam',
      zh: '澳洲文件领馆认证用于越南',
    },
    subheading: {
      en: 'Vietnam routes often look simple until translation, originals, or company wording come into play. Once they do, the file needs a much more careful setup.',
      zh: '越南路线，很多时候一开始看着不复杂，但一旦碰到翻译、原件或公司表述，案件就会比普通海牙咨询复杂得多。',
    },
    serviceScope: {
      en: 'This route becomes workable when the Vietnam-side use is named clearly enough from the start. If not, translation and original-handling questions tend to surface too late.',
      zh: '只要越南那边的用途一开始说得够清楚，这条路线通常是能做顺的。最怕的是翻译和原件问题拖到后面才出现。',
    },
    officialBaseline: {
      en: 'The Australian starting point still depends on whether the file is public, notarised, educational, or commercial in character. For Vietnam work, that classification needs to be settled before the route can be fixed with confidence.',
      zh: '澳洲这边的起点，仍然取决于文件本身是公共、公证、教育还是商业性质。到了越南用途，这个分类必须先看清，路线才能稳稳定下来。',
    },
    screeningDiscipline: {
      en: 'The early review usually focuses on whether Vietnam really requires a consular route, whether originals or translation will drive the process, and whether company-use wording changes the file setup.',
      zh: '前期通常先看越南是否真的要求领馆路线、原件或翻译会不会成为主导因素，以及公司用途表述会不会改变整份文件的结构。',
    },
    routeType: {
      en: 'Consular-facing route. Usually more sensitive to translation, originals, and receiving-side wording than a standard apostille lane.',
      zh: '领馆导向路线。通常比标准海牙路径更依赖翻译、原件和接收方表述。',
    },
    searchIntents: [
      { en: 'Australian consular legalisation for Vietnam', zh: '澳洲文件领馆认证用于越南' },
      { en: 'Australian embassy legalisation for Vietnam', zh: '澳洲文件使馆认证用于越南' },
      { en: 'Vietnam legalisation Australia', zh: '越南认证 澳洲' },
      { en: 'Australian company documents legalisation Vietnam', zh: '澳洲公司文件认证用于越南' },
    ],
    typicalRequirements: [
      { en: 'Passport bio page and a clear review copy of the file set', zh: '护照资料页及清晰文件扫描件' },
      { en: 'Translation may need to be considered early depending on the receiving-side context', zh: '根据接收方场景，可能需要尽早考虑翻译安排' },
      { en: 'Originals may still be required depending on file class and route', zh: '根据文件类别和路线，后续仍可能需要原件' },
      { en: 'Company or signed files usually need more exact receiving-purpose clarification', zh: '公司或签字文件通常更需要明确接收用途' },
    ],
    expedited: {
      en: 'Vietnam-facing consular routes should be treated cautiously on timing. EGS reviews urgency only after translation, originals, and route logic are sufficiently clear.',
      zh: '面向越南的领馆路线在时效上应谨慎处理。EGS 只会在翻译、原件和路线逻辑足够清楚后再评估加急。',
    },
    reviewFocus: [
      { en: 'Whether the Vietnam receiving side truly expects consular legalisation', zh: '越南接收方是否真的要求领馆认证' },
      { en: 'Whether translation, originals, or company-use wording should be built in early', zh: '是否应尽早纳入翻译、原件或公司用途表述安排' },
      { en: 'Whether the destination use is specific enough to lock the route safely', zh: '目的地用途是否足够明确，可安全锁定路线' },
    ],
    commonIssues: [
      { en: 'The client only gives “for Vietnam” without the actual ministry, school, employer, or company', zh: '客户只说“用于越南”，但没有明确具体部委、学校、雇主或公司' },
      { en: 'Translation expectations surface late after route review has already started', zh: '路线核验开始后，翻译要求才后期暴露出来' },
      { en: 'The file is treated as simple, but later original-handling or company wording issues appear', zh: '案件最初按简单路线判断，但后期才暴露原件或公司表述问题' },
    ],
    userNeedsFirst: [
      { en: 'Exact Vietnam use case and receiving authority if known', zh: '越南具体用途及接收机构（如已知）' },
      { en: 'Document type and whether the file is educational, commercial, or signed', zh: '文件类型，以及属于教育、商业还是签字文件' },
      { en: 'Whether originals are already available', zh: '是否已持有原件' },
    ],
    beforePaymentReview: {
      en: 'Before anything is confirmed, the file is checked for the actual Vietnam-side path, the correct Australian starting point, and whether translation, originals, or company-use issues make it more specialised.',
      zh: '正式确认前，通常会先核验真正的越南路径、澳洲起点是否选对，以及翻译、原件或公司用途问题会不会让它比最初预期的更专业。',
    },
    commonDocumentSlugs: ['company-documents', 'power-of-attorney', 'degree-certificate'],
    issuingCountrySlug: 'australia',
    destinationCountrySlug: 'vietnam',
  },
];

export function getPriorityRoute(slug: string) {
  return priorityRoutes.find((route) => route.slug === slug);
}

export function getCopyText(value: CopyText, locale: Locale) {
  return value[locale];
}
