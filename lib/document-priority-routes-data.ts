import type { Locale } from '@/lib/i18n/dictionaries';

type CopyText = {
  en: string;
  zh: string;
};

export type DocumentPriorityRoute = {
  slug: string;
  parentRouteSlug: string;
  documentSlug: string;
  title: CopyText;
  subheading: CopyText;
  whoUsesThis: CopyText;
  serviceScope: CopyText;
  officialBaseline?: CopyText;
  screeningDiscipline?: CopyText;
  routePosition: CopyText;
  typicalRequirements: CopyText[];
  expedited: CopyText;
  reviewFocus: CopyText[];
  commonIssues: CopyText[];
  beforePaymentReview: CopyText;
};

export const documentPriorityRoutes: DocumentPriorityRoute[] = [
  {
    slug: 'australian-birth-certificate-for-use-in-china',
    parentRouteSlug: 'australian-documents-for-use-in-china',
    documentSlug: 'birth-certificate',
    title: {
      en: 'Australian Birth Certificate for Use in China',
      zh: '澳洲出生证明用于中国',
    },
    subheading: {
      en: 'Australia-issued birth-certificate route for China use, where the real questions are usually certificate version, translation expectation, and whether the receiving side wants an original or a usable certified path.',
      zh: '这是澳洲出生证明用于中国的路线页。真正要先看清的，通常是证书版本、翻译要求，以及接收方要原件还是可接受的认证路径。',
    },
    whoUsesThis: {
      en: 'Usually used for family registration, identity linkage, visa, citizenship, parent-child relationship, or other civil status matters where the receiving side in China requires a formal overseas birth record.',
      zh: '通常用于户籍、身份衔接、签证、国籍、亲子关系或其他民事身份事项，即中国接收方需要正式境外出生记录的场景。',
    },
    serviceScope: {
      en: 'This sits inside the Australian main service lane. EGS first checks whether the China-use case can remain apostille-first or whether the receiving side expects a more specific consular-facing chain.',
      zh: '这类文件属于澳洲主服务线。EGS 会先判断赴中国用途是否可停留在海牙主线，还是接收方实际上要求更具体的领馆链路。',
    },
    officialBaseline: {
      en: 'Officially, Australian birth certificates can move through the Australian legalisation lane if they are the proper registry-issued document or a properly notarised copy. The China-facing question is therefore not whether birth certificates are legalisable, but which version the receiving side will recognise.',
      zh: '从官方基线看，澳洲出生证明如果是正确的登记机构签发版本，或是合格的公证副本，就可以进入澳洲认证路径。因此赴中国的关键不是“能不能办”，而是接收方认可哪一个版本。',
    },
    screeningDiscipline: {
      en: 'EGS screens certificate version, likely translation need, and whether the China receiving office wants an original, copy-based, or more specialised handling path before intake is fixed.',
      zh: 'EGS 会先核验证书版本、是否可能需要翻译，以及中国接收单位要求原件、副本还是更特殊的处理路径，再锁定受理。',
    },
    routePosition: {
      en: 'Usually starts as apostille-first, but the actual China receiving authority determines whether further handling needs to be reviewed.',
      zh: '通常先按海牙主线判断，但是否还需额外处理，取决于中国实际接收机关。',
    },
    typicalRequirements: [
      { en: 'Passport bio page for identity screening', zh: '用于身份核验的护照资料页' },
      { en: 'Original birth certificate or a clear review copy sufficient to confirm document version', zh: '出生证明原件，或至少能确认版本信息的清晰扫描件' },
      { en: 'If the receiving side in China requires translation, the final version should be settled before translation starts', zh: '如中国接收方要求翻译，应先锁定最终文件版本后再安排翻译' },
      { en: 'If a newer replacement issue is required, that should be identified before intake is locked', zh: '如接收方要求较新的补发件，应在正式受理前先识别' },
    ],
    expedited: {
      en: 'Expedite may be possible if the certificate version is already correct and the route remains in a straightforward Australia-side lane. If a newer issue, original handling, or extra receiving-side requirement appears, rush feasibility should be reviewed first.',
      zh: '若证书版本正确且路线保持在清晰的澳洲主线内，可评估加急；若涉及补发件、原件流转或额外接收要求，则应先核验再谈加急。',
    },
    reviewFocus: [
      { en: 'Whether the current certificate version is acceptable for the China use case', zh: '现有证书版本是否适用于赴中国用途' },
      { en: 'Whether the receiving side expects original, certified copy, or translated copy', zh: '接收方要求原件、认证副本还是翻译副本' },
      { en: 'Whether the China receiving authority is clear enough to lock the route early', zh: '中国接收机关是否足够明确，从而尽早锁定路线' },
    ],
    commonIssues: [
      { en: 'Client only provides a photo, but not enough of the document details to confirm the issue version', zh: '客户只提供了照片，但细节不足以确认签发版本' },
      { en: 'The use purpose is described generally as “for China” without the actual receiving office', zh: '只说“用于中国”，但没有具体接收单位' },
      { en: 'Translation is requested before the final certificate version is settled', zh: '文件版本尚未确定前就先要求翻译' },
    ],
    beforePaymentReview: {
      en: 'Before payment, EGS checks whether the birth certificate version is fit for the actual China-use purpose, whether translation or original handling is likely to be needed, and whether the route stays inside the standard Australian lane or requires further specialist review.',
      zh: '付款前，EGS 会核验该出生证明版本是否适合实际赴中国用途、是否可能需要翻译或原件流转，以及路线是停留在标准澳洲主线，还是还需进一步专业复核。',
    },
  },
  {
    slug: 'australian-marriage-certificate-for-use-in-china',
    parentRouteSlug: 'australian-documents-for-use-in-china',
    documentSlug: 'marriage-certificate',
    title: {
      en: 'Australian Marriage Certificate for Use in China',
      zh: '澳洲结婚证用于中国',
    },
    subheading: {
      en: 'Australia-issued marriage-certificate route for China use, where the main review points are registry-versus-ceremonial version, name consistency, and whether the China-side filing wants original presentation or a copy-based route.',
      zh: '这是澳洲结婚证用于中国的路线页。真正的关键通常是登记证还是仪式证、姓名一致性，以及中国接收方要原件展示还是副本路径。',
    },
    whoUsesThis: {
      en: 'Usually used for family registration, spouse visa, marital status confirmation, civil records, or other family-law adjacent administrative matters in China.',
      zh: '通常用于家庭登记、配偶签证、婚姻状态证明、民事档案或其他与家庭事务相关的行政场景。',
    },
    serviceScope: {
      en: 'This is handled through the Australian main lane first. EGS reviews whether the marriage certificate can move on a standard apostille-first basis or whether the China receiving side introduces a more specific chain.',
      zh: '这类文件优先按澳洲主线处理。EGS 会判断结婚证是否可按标准海牙路径推进，还是中国接收方会引入更具体的链路要求。',
    },
    officialBaseline: {
      en: 'Officially, Australian marriage certificates are workable only when the file is the actual registry-issued certificate rather than a ceremonial version. Once that baseline is correct, the route question shifts to China-side acceptance and format.',
      zh: '从官方基线看，澳洲结婚证只有在客户提供的是登记机构签发版本而非仪式纪念证时，路线才真正成立。这个基线对了之后，才轮到中国端的接受格式问题。',
    },
    screeningDiscipline: {
      en: 'EGS screens certificate version, naming consistency, and whether China-side translation or original presentation changes the route before taking the matter on.',
      zh: 'EGS 会先核验证书版本、姓名一致性，以及中国端的翻译或原件展示要求是否会改变路线，再决定是否受理。',
    },
    routePosition: {
      en: 'Usually apostille-first, but receiving-side format, translation, and institution-specific expectations still need to be checked.',
      zh: '通常以海牙路径为主，但仍需核验接收方对格式、翻译及机构要求的具体期待。',
    },
    typicalRequirements: [
      { en: 'Passport bio page for file screening', zh: '用于档案核验的护照资料页' },
      { en: 'Marriage certificate in a reviewable original or clear scan form', zh: '可供核验的结婚证原件或清晰扫描件' },
      { en: 'If the receiving side asks for Chinese translation, translation should be based on the final accepted certificate version', zh: '若接收方要求中文翻译，应以最终确认版本为基础' },
      { en: 'If names or civil status wording differs across documents, that should be reviewed before intake is fixed', zh: '如不同文件中的姓名或婚姻状态表述不一致，应在受理前先核验' },
    ],
    expedited: {
      en: 'Rush handling may be possible on part of the Australian side, but not before the certificate version and China receiving requirement are clear.',
      zh: '澳洲侧部分步骤可评估加急，但前提是结婚证版本和中国接收要求已经明确。',
    },
    reviewFocus: [
      { en: 'Whether the marriage certificate format matches the actual receiving requirement in China', zh: '结婚证格式是否匹配中国实际接收要求' },
      { en: 'Whether translation and original handling are both required or only one of them', zh: '是否同时需要翻译和原件，还是只需其中之一' },
      { en: 'Whether name consistency issues may slow acceptance later', zh: '姓名一致性问题是否会在后续阶段拖慢受理' },
    ],
    commonIssues: [
      { en: 'Marriage record format is accepted in one place but not another, and the client has not identified the actual receiving side', zh: '某些地方接受该格式，另一些不接受，但客户未明确接收方' },
      { en: 'Client assumes any marriage certificate version is interchangeable', zh: '客户以为不同版本结婚证都可以互换使用' },
      { en: 'Supporting identity or relationship documents are not ready when review starts', zh: '开始核验时，辅助身份或关系文件尚未准备' },
    ],
    beforePaymentReview: {
      en: 'Before payment, EGS screens the marriage certificate format, checks whether translation or original handling is likely, and confirms whether the route is stable enough to proceed without further documentary clarification.',
      zh: '付款前，EGS 会先筛查结婚证格式、判断是否可能涉及翻译或原件流转，并确认路线是否已足够稳定，可进入正式受理。',
    },
  },
  {
    slug: 'australian-power-of-attorney-for-use-in-china',
    parentRouteSlug: 'australian-documents-for-use-in-china',
    documentSlug: 'power-of-attorney',
    title: {
      en: 'Australian Power of Attorney for Use in China',
      zh: '澳洲委托书用于中国',
    },
    subheading: {
      en: 'Australia-executed power-of-attorney route for China use, with the real difficulty usually sitting in signing format, witness / notary setup, and original handling rather than the country label alone.',
      zh: '这是在澳洲签署、用于中国的委托书路线页。真正的难点通常在签署形式、见证 / 公证安排和原件流转，而不是单看国家标签。',
    },
    whoUsesThis: {
      en: 'Usually used for China property transfers, company authorisation, bank and registry filings, family representation, litigation-adjacent administration, or other matters where the receiving side wants a properly executed signed authorisation document.',
      zh: '通常用于中国房产处置、公司授权、银行或登记提交、家庭代办、与诉讼相关的行政手续，或其他要求正式签署授权文件的场景。',
    },
    serviceScope: {
      en: 'This route sits inside the Australian main lane, but signed-document handling is materially different from standard certificate work. EGS reviews execution format first, not just destination country.',
      zh: '这类路线虽然属于澳洲主线，但签字文件与普通证书类文件完全不同。EGS 会先核验签署格式，而不是只看目的地国家。',
    },
    officialBaseline: {
      en: 'Officially, an Australian power of attorney is a private document route, not a registry-document route. The notarial act is therefore the true legalisation baseline, and the destination-country question comes after that.',
      zh: '从官方基线看，澳洲委托书属于私文书路线，不是登记证书路线。因此真正的认证基础是公证行为，而不是先谈目的地国家。',
    },
    screeningDiscipline: {
      en: 'EGS screens final text, execution format, witness or video-signing issues, and whether the China use case will stay apostille-led or require more specialised handling before accepting the file.',
      zh: 'EGS 会先核验最终文本、签署格式、见证或视频签字问题，以及赴中国用途是保持海牙主线还是需要更专业处理，再决定是否受理。',
    },
    routePosition: {
      en: 'May begin as apostille-first, but signed-document execution often determines whether additional witnessed-signature or selected consular handling must be considered.',
      zh: '可能先按海牙路径判断，但签字文件的签署形式常常决定是否还要加入见证签字或特定领馆处理。',
    },
    typicalRequirements: [
      { en: 'Final execution version of the power of attorney', zh: '最终签署版本的委托书文本' },
      { en: 'Passport bio page for identity screening', zh: '用于身份核验的护照资料页' },
      { en: 'For witnessed-signature style handling, original signed document is typically needed', zh: '若走见证签字路径，通常需要签好的原件' },
      { en: 'If signing evidence or signing video is needed, that should be planned before formal intake', zh: '若需要签署证明或签署视频，应在正式受理前先安排' },
    ],
    expedited: {
      en: 'Signed-document routes are less straightforward to rush than standard copy-based files. Expedite should only be discussed after the execution format is reviewed and the original-handling path is clear.',
      zh: '签字文件通常比普通副本类文件更不适合直接承诺加急。应先核验签署格式和原件流转路径，再讨论是否可加急。',
    },
    reviewFocus: [
      { en: 'Whether the draft and execution format are acceptable for China use', zh: '文本草稿及签署形式是否适用于赴中国使用' },
      { en: 'Whether the file needs witnessed-signature handling rather than simple copy-based processing', zh: '该文件是否需要见证签字，而不是简单的副本路径' },
      { en: 'Whether originals and signing evidence can be produced in time', zh: '原件和签署证明能否及时提供' },
    ],
    commonIssues: [
      { en: 'Client sends a draft before the execution format is actually final', zh: '客户先发来草稿，但签署版本尚未最终确定' },
      { en: 'The signing method does not match the later receiving requirement', zh: '签署方式与后续接收要求不匹配' },
      { en: 'Originals are needed, but the client expects scan-only processing', zh: '后续需要原件，但客户预期是纯扫描件处理' },
      { en: 'The China-side recipient is still described only broadly, so the POA wording is not yet tied to a real filing use', zh: '中国接收方仍然描述得很笼统，导致委托书文本还没有真正对应到实际提交用途' },
    ],
    beforePaymentReview: {
      en: 'Before payment, EGS reviews the power-of-attorney text, execution format, likely original-handling needs, and whether the matter stays in an Australian apostille-led lane or requires more specialised handling because it is a signed authorisation document.',
      zh: '付款前，EGS 会先核验委托书文本、签署形式、可能的原件流转要求，以及该案件是否仍停留在澳洲海牙主线，还是因其属于签字授权文件而需要更专业的处理路径。',
    },
  },
  {
    slug: 'australian-degree-certificate-for-use-in-singapore',
    parentRouteSlug: 'australian-documents-for-use-in-singapore',
    documentSlug: 'degree-certificate',
    title: {
      en: 'Australian Degree Certificate for Use in Singapore',
      zh: '澳洲学历证书用于新加坡',
    },
    subheading: {
      en: 'Document-specific route page for Australia-issued degree certificates being prepared for use in Singapore.',
      zh: '面向澳洲学历证书赴新加坡使用的文件级路线页。',
    },
    whoUsesThis: {
      en: 'Usually used for study, employment, professional registration, immigration, or employer-side verification where the receiving side in Singapore needs formal academic proof.',
      zh: '通常用于留学、就业、职业注册、移民或雇主核验，即新加坡接收方需要正式学历证明的场景。',
    },
    serviceScope: {
      en: 'This remains inside the Australian main lane. Academic files are often manageable on an apostille-first basis, but supporting graduation evidence may still be needed depending on the receiving institution.',
      zh: '这类文件仍属于澳洲主线。学历文件通常可按海牙主线推进，但接收院校或机构不同，可能仍需补充毕业辅助证明。',
    },
    officialBaseline: {
      en: 'Officially, Australian tertiary documents can move either as original university-issued records or through a properly verified notarised-copy route. That means the baseline issue is academic proof quality, not consular complexity.',
      zh: '从官方基线看，澳洲高等教育文件可以走学校原件路径，也可以走合格核验后的公证副本路径。因此基础问题是学历证明质量，而不是领馆复杂度。',
    },
    screeningDiscipline: {
      en: 'EGS screens whether Singapore needs the certificate alone or a wider academic pack, and whether transcript or graduation evidence should be included before the route is locked.',
      zh: 'EGS 会先判断新加坡接收方只要证书还是要更完整的学术材料，并确认是否应在锁定路线前把成绩单或毕业辅助证明一并纳入。',
    },
    routePosition: {
      en: 'Usually apostille-first, with the practical complexity coming from academic proof rather than consular chain issues.',
      zh: '通常以海牙路径为主，实际复杂度更多来自学历证明本身，而不是领馆链路。',
    },
    typicalRequirements: [
      { en: 'Passport bio page', zh: '护照资料页' },
      { en: 'Degree certificate scan or original sufficient to confirm award details', zh: '可确认授予信息的学历证书扫描件或原件' },
      { en: 'Supporting graduation evidence may be required for some receiving-side reviews', zh: '部分接收场景可能需要补充毕业辅助证明' },
      { en: 'If transcript or supporting academic record is also required, it should be identified before intake is fixed', zh: '若还需要成绩单或其他学术材料，应在正式受理前先确认' },
    ],
    expedited: {
      en: 'Academic files can sometimes move relatively cleanly if the document set is already complete. Expedite is less reliable if graduation support evidence still needs to be assembled.',
      zh: '如果学历材料组合已经完整，路线通常较清晰；但若还要补充毕业辅助证明，则不宜先承诺加急。',
    },
    reviewFocus: [
      { en: 'Whether the Singapore side needs the degree certificate only or a wider academic set', zh: '新加坡接收方只要学历证书，还是要更完整的学术材料组合' },
      { en: 'Whether supporting graduation evidence is needed to avoid later rejection or delay', zh: '是否需要补充毕业辅助证明，以避免后续延误或退回' },
      { en: 'Whether the file can stay in a simple apostille-first lane', zh: '该文件是否能保持在简单的海牙主线内' },
    ],
    commonIssues: [
      { en: 'Client provides the certificate but not the supporting academic evidence later requested', zh: '客户只有证书，但后续接收方又要求补充学术证明' },
      { en: 'The receiving institution is unclear, so material scope is guessed rather than confirmed', zh: '接收机构不明确，导致材料范围只能猜测' },
      { en: 'Transcript, certificate, and award details are inconsistent across files', zh: '成绩单、证书和授予信息之间存在不一致' },
    ],
    beforePaymentReview: {
      en: 'Before payment, EGS checks whether the degree certificate is sufficient on its own, whether supporting graduation or transcript evidence is likely to be needed, and whether the matter remains a straightforward Australian academic apostille route.',
      zh: '付款前，EGS 会先核验学历证书本身是否足够、是否可能还需毕业或成绩单辅助证明，以及该案件是否属于清晰的澳洲学历海牙路径。',
    },
  },
  {
    slug: 'australian-company-documents-for-use-in-the-united-states',
    parentRouteSlug: 'australian-documents-for-use-in-united-states',
    documentSlug: 'company-documents',
    title: {
      en: 'Australian Company Documents for Use in the United States',
      zh: '澳洲公司文件用于美国',
    },
    subheading: {
      en: 'Australia-origin company-document route for U.S. use, where the main job is to separate registry records from signed authority papers and match the document set to the actual U.S. filing purpose.',
      zh: '这是澳洲公司文件用于美国的路线页。真正的核心是把登记记录和签字授权文件分开，并让整套材料准确对应美国实际提交用途。',
    },
    whoUsesThis: {
      en: 'Usually used for incorporation evidence, authority proof, cross-border contracting, banking, filings, director/shareholder authority, or company representation matters in the United States.',
      zh: '通常用于公司注册证明、权限证明、跨境合同、银行、申报、董事/股东授权或其他赴美国使用的公司事务。',
    },
    serviceScope: {
      en: 'This route remains in the Australian main lane, but company files need stronger document-set review than personal certificates. EGS checks the filing purpose before locking the route.',
      zh: '这类路线仍属于澳洲主线，但公司文件比个人证书更依赖材料组合判断。EGS 会先核验用途，再锁定路线。',
    },
    officialBaseline: {
      en: 'Officially, Australian government company records and notarised private company papers do not sit in the same class. The U.S.-facing route therefore begins with identifying whether the file is a registry record, a chamber-style record, or a signed corporate instrument.',
      zh: '从官方基线看，澳洲政府公司记录和经公证的私营公司文件并不是同一类别。因此赴美国路线的起点，是先识别该案属于登记记录、商会文件还是签字公司文书。',
    },
    screeningDiscipline: {
      en: 'EGS screens the exact U.S. filing purpose, company-document set, and whether signed authority papers will force the matter out of a simple copy-based lane before intake starts.',
      zh: 'EGS 会先核验美国实际提交用途、公司文件组合，以及签字授权文件是否会让案件脱离简单副本路径，再进入正式受理。',
    },
    routePosition: {
      en: 'Usually apostille-first, but the commercial filing purpose often determines which company document version is actually acceptable.',
      zh: '通常以海牙路径为主，但商业用途本身往往决定哪一种公司文件版本才是真正可接受的。',
    },
    typicalRequirements: [
      { en: 'Passport bio page of the instructing party where needed for identity review', zh: '如需要，提供委托人护照资料页用于身份核验' },
      { en: 'Clear identification of which company document set is actually needed', zh: '明确到底需要哪一组公司文件' },
      { en: 'For signed corporate authorisations, original execution version may be required', zh: '如涉及签字公司授权文件，通常需要签好的原件版本' },
      { en: 'If the receiving side is a bank, state filing office, investor, or private counterparty, that should be known before intake', zh: '如接收方是银行、州级备案机构、投资方或私法交易对手，应在受理前先明确' },
    ],
    expedited: {
      en: 'Expedite may be possible where the company document set is already clearly defined and stays in a copy-based lane. Where execution, signing authority, or originals remain unresolved, rush handling should not be assumed.',
      zh: '若公司文件组合已明确且可停留在副本路径，可评估加急；若签署、授权或原件问题尚未厘清，则不应先假定可加急。',
    },
    reviewFocus: [
      { en: 'Which company document set is actually needed for the US use case', zh: '赴美国用途实际需要哪一组公司文件' },
      { en: 'Whether the matter is purely documentary or also includes signed corporate authority papers', zh: '该事项是纯文件型，还是还包含签字的公司授权文件' },
      { en: 'Whether the US receiving side has a specific version or recency expectation', zh: '美国接收方是否对文件版本或时效有特定要求' },
    ],
    commonIssues: [
      { en: 'Client asks for “company documents” without identifying the actual filing requirement', zh: '客户只说要“公司文件”，但没有明确实际提交用途' },
      { en: 'Different counterparties ask for different versions of company proof, and the client has not narrowed it down', zh: '不同接收方要求的公司证明版本不同，但客户尚未明确' },
      { en: 'Signed authority documents are included late, after the route was first assessed as copy-based', zh: '原本按副本路线核验，但后期才加入签字授权文件' },
    ],
    beforePaymentReview: {
      en: 'Before payment, EGS reviews the exact commercial use case, identifies the correct company document set, checks whether any signed authority papers change the route structure, and confirms whether the file remains in a straightforward Australian apostille-led lane.',
      zh: '付款前，EGS 会先核验商业用途、识别正确的公司文件组合、判断签字授权文件是否改变路线结构，并确认案件是否仍属于清晰的澳洲海牙主线。',
    },
  },
  {
    slug: 'canadian-company-documents-for-use-in-hong-kong',
    parentRouteSlug: 'canadian-documents-for-use-in-hong-kong',
    documentSlug: 'company-documents',
    title: {
      en: 'Canadian Company Documents for Use in Hong Kong',
      zh: '加拿大公司文件用于香港',
    },
    subheading: {
      en: 'Canada-origin company-document route for Hong Kong use, where the practical split is usually between copy-based company proof and more formal signed authority or affidavit-style corporate papers.',
      zh: '这是加拿大公司文件用于香港的路线页。实务上的关键分流通常在于：它是副本型公司证明，还是更正式的签字授权或宣誓式公司文件。',
    },
    whoUsesThis: {
      en: 'Usually used for company proof, banking, director authority, shareholder evidence, commercial registration, or cross-border transaction support where Hong Kong requires corporate records from Canada.',
      zh: '通常用于公司证明、银行、董事权限、股东证明、商业登记或跨境交易支持，即香港接收方需要加拿大公司记录的场景。',
    },
    serviceScope: {
      en: 'This is mainly a Canada-side apostille-led route, but company files require more careful categorisation into copy, signed-affidavit, or original-affidavit handling depending on the actual document set.',
      zh: '这类路线在加拿大侧以海牙主线为主，但公司文件更依赖分类判断，需要区分是副本、签字宣誓还是原件宣誓路径。',
    },
    officialBaseline: {
      en: 'Officially, Canadian company records can move through apostille, but the issuing province and whether the file is a public record or a notarised private paper determine the real starting point.',
      zh: '从官方基线看，加拿大公司记录可以进入 apostille 路线，但真正的起点取决于签发省份，以及文件是公共记录还是公证私文书。',
    },
    screeningDiscipline: {
      en: 'EGS screens whether the Hong Kong use case can stay copy-based, whether affidavit-style handling is needed, and whether any Chinese-facing translation requirement should be built in early.',
      zh: 'EGS 会先判断赴香港用途能否保持副本路径、是否需要宣誓路径，以及是否应尽早纳入中文使用场景下的翻译要求。',
    },
    routePosition: {
      en: 'Usually apostille-first, with the practical issue being the exact corporate document format and whether any signed authority document changes the handling path.',
      zh: '通常以海牙路径为主，实际难点在于公司文件格式本身，以及签字授权文件是否改变处理路径。',
    },
    typicalRequirements: [
      { en: 'Passport bio page where identity review is needed', zh: '如需要，提供护照资料页做身份核验' },
      { en: 'Clear copy of the company record set for initial review', zh: '用于初审的清晰公司文件扫描件' },
      { en: 'If a signed corporate authority document is involved, original execution copy may be needed', zh: '如包含签字公司授权文件，通常需要签好的原件' },
      { en: 'If Hong Kong use is Chinese-facing in practice, translation-copy needs may have to be assessed early', zh: '如香港实际使用场景偏中文接收体系，可能需尽早评估翻译副本需求' },
    ],
    expedited: {
      en: 'Copy-based company files may sometimes move faster. Where signed-affidavit, original-affidavit, or more formal corporate execution is involved, expedite should be treated cautiously.',
      zh: '副本型公司文件有时可以更快；但若涉及签字宣誓、原件宣誓或更正式的公司签署结构，则应谨慎评估加急。',
    },
    reviewFocus: [
      { en: 'Whether the file is a simple company proof package or includes signed authority documentation', zh: '这是一套简单的公司证明文件，还是还包含签字授权文件' },
      { en: 'Whether the matter is best handled as certified true copy or a more formal affidavit-style route', zh: '该事项更适合走认证副本还是更正式的宣誓路径' },
      { en: 'Whether the Hong Kong receiving side has a specific format or language expectation', zh: '香港接收方是否对格式或语言有具体要求' },
    ],
    commonIssues: [
      { en: 'The client groups all corporate documents together without clarifying the real filing need', zh: '客户把所有公司文件混在一起，但没有明确真实提交需求' },
      { en: 'A signed authority document is added late and changes the route complexity', zh: '后期才加入签字授权文件，导致路线复杂度改变' },
      { en: 'The Hong Kong receiving side is described generally, without naming the institution or counterparty', zh: '香港接收方描述过于笼统，没有明确机构或交易对手' },
    ],
    beforePaymentReview: {
      en: 'Before payment, EGS reviews the exact company-use context, identifies whether the document set can stay copy-based, checks whether signed authority papers change the route, and confirms whether the Hong Kong-facing file remains in a workable Canada-side apostille-led structure.',
      zh: '付款前，EGS 会先核验公司用途、判断材料组合能否保持在副本路径、确认签字授权文件是否改变路线，并评估该香港用途是否仍属于可执行的加拿大海牙主线结构。',
    },
  },
  {
    slug: 'australian-birth-certificate-for-use-in-singapore',
    parentRouteSlug: 'australian-documents-for-use-in-singapore',
    documentSlug: 'birth-certificate',
    title: {
      en: 'Australian Birth Certificate for Use in Singapore',
      zh: '澳洲出生证明用于新加坡',
    },
    subheading: {
      en: 'Australia-issued birth-certificate route for Singapore use, where the practical issue is usually not route complexity but whether the receiving side wants the correct issue version, translation, or original presentation.',
      zh: '这是澳洲出生证明用于新加坡的路线页。实务上更关键的通常不是路线复杂度，而是接收方要正确版本、翻译件还是原件展示。',
    },
    whoUsesThis: {
      en: 'Usually used for family registration, dependent applications, school matters, immigration, identity confirmation, or other civil-status related use in Singapore.',
      zh: '通常用于家庭登记、家属申请、学校事务、移民、身份确认或其他在新加坡使用的民事身份场景。',
    },
    serviceScope: {
      en: 'This remains in the Australian main service lane. Birth-certificate matters are often simpler than signed-document work, but the receiving side in Singapore still determines whether original, copy, or translation handling is appropriate.',
      zh: '这类文件仍属于澳洲主服务线。出生证明通常比签字文件更直接，但新加坡接收方仍决定应按原件、副本还是翻译副本处理。',
    },
    officialBaseline: {
      en: 'Officially, Australian birth certificates are workable public documents once the correct registry version is in hand. For Singapore use, the baseline legalisation path is usually clear; the real issue is which document format the receiving side prefers.',
      zh: '从官方基线看，澳洲出生证明只要拿到正确的登记机构版本，就是可执行的公共文件。赴新加坡时，基础路线通常并不复杂，真正的问题是接收方偏好哪种文件形式。',
    },
    screeningDiscipline: {
      en: 'EGS screens certificate version, whether Singapore wants originals or copy-based handling, and whether translation should be considered before the file is accepted.',
      zh: 'EGS 会先核验证书版本、新加坡接收方要求原件还是副本路径，以及是否需要翻译，再决定是否受理。',
    },
    routePosition: {
      en: 'Usually apostille-first, with practical review focused on certificate version, receiving use, and whether a translated or original presentation is expected.',
      zh: '通常以海牙路径为主，重点在于证书版本、接收用途以及是否要求翻译件或原件展示。',
    },
    typicalRequirements: [
      { en: 'Passport bio page for identity screening', zh: '用于身份核验的护照资料页' },
      { en: 'Birth certificate original or clear scan sufficient to confirm the issue version', zh: '出生证明原件或足以确认版本信息的清晰扫描件' },
      { en: 'If translation is requested, the final accepted certificate version should be fixed first', zh: '如需要翻译，应先锁定最终可接受的证书版本' },
      { en: 'If the receiving side expects a recent issue, that should be identified before intake is locked', zh: '如接收方偏好近期补发件，应在正式受理前识别' },
    ],
    expedited: {
      en: 'Expedite may be realistic where the certificate version is already correct and the route remains in a straightforward apostille-first lane. If a newer issue or original presentation is still uncertain, rush handling should be reviewed first.',
      zh: '若证书版本已正确且路线保持在清晰海牙主线内，可评估加急；若补发件或原件要求尚不明确，应先核验再讨论加急。',
    },
    reviewFocus: [
      { en: 'Whether the certificate version already matches the Singapore receiving need', zh: '当前证书版本是否已满足新加坡接收要求' },
      { en: 'Whether the file can proceed as apostille-first without extra document formatting steps', zh: '该文件能否直接按海牙主线推进，而无需额外格式处理' },
      { en: 'Whether translation or original handling needs to be included from the outset', zh: '是否一开始就需要纳入翻译或原件流转安排' },
    ],
    commonIssues: [
      { en: 'Client only gives a general use purpose without the actual institution in Singapore', zh: '客户只给了大致用途，但没有明确新加坡接收机构' },
      { en: 'The certificate image is incomplete, so issue details cannot be confirmed cleanly', zh: '证书图片不完整，导致签发信息无法准确核验' },
      { en: 'Translation is requested before the material version is final', zh: '材料版本尚未最终确认就先要求翻译' },
    ],
    beforePaymentReview: {
      en: 'Before payment, EGS checks whether the birth certificate version is already fit for the Singapore use case, whether translation or original presentation is likely to be needed, and whether the route remains a straightforward Australia-side apostille matter.',
      zh: '付款前，EGS 会先核验出生证明版本是否适合赴新加坡用途、是否可能需要翻译或原件展示，以及该案件是否保持在清晰的澳洲海牙主线内。',
    },
  },
  {
    slug: 'australian-marriage-certificate-for-use-in-singapore',
    parentRouteSlug: 'australian-documents-for-use-in-singapore',
    documentSlug: 'marriage-certificate',
    title: {
      en: 'Australian Marriage Certificate for Use in Singapore',
      zh: '澳洲结婚证用于新加坡',
    },
    subheading: {
      en: 'Australia-issued marriage-certificate route for Singapore use, focused on certificate version, name matching, and whether the Singapore side wants original presentation, translation, or a cleaner registry issue.',
      zh: '这是澳洲结婚证用于新加坡的路线页，重点在于证书版本、姓名对应，以及新加坡接收方要原件、翻译件还是更干净的登记版本。',
    },
    whoUsesThis: {
      en: 'Usually used for spouse applications, family registration, visa, civil status confirmation, or related administrative use in Singapore.',
      zh: '通常用于配偶申请、家庭登记、签证、婚姻状态确认或其他在新加坡使用的家庭类行政事务。',
    },
    serviceScope: {
      en: 'This route stays within the Australian main lane, but marriage-certificate matters still require checking whether the receiving side expects a current issue, translation, or original presentation.',
      zh: '该路线仍在澳洲主线内，但结婚证类事项仍需核验接收方是否要求近期补发件、翻译或原件展示。',
    },
    officialBaseline: {
      en: 'Officially, the Australian marriage-certificate route works only when the file is the proper registry-issued certificate. Once that baseline is right, Singapore use is usually a format-and-version question rather than a difficult route question.',
      zh: '从官方基线看，澳洲结婚证路线只有在客户提供的是正确的登记机构签发版本时才成立。这个基线对了之后，赴新加坡通常更多是格式和版本问题，而不是难路线问题。',
    },
    screeningDiscipline: {
      en: 'EGS screens certificate version, name consistency, and whether Singapore will want translation or original presentation before the file is locked.',
      zh: 'EGS 会先核验证书版本、姓名一致性，以及新加坡是否要求翻译或原件展示，再锁定案件。',
    },
    routePosition: {
      en: 'Usually apostille-first, with practical review centred on certificate version and receiving-side expectations rather than consular complexity.',
      zh: '通常以海牙路径为主，重点在于证书版本和接收要求，而不是领馆复杂度。',
    },
    typicalRequirements: [
      { en: 'Passport bio page for file screening', zh: '用于档案核验的护照资料页' },
      { en: 'Marriage certificate in a reviewable scan or original form', zh: '可供核验的结婚证扫描件或原件' },
      { en: 'If a translated copy is required, the final certificate version should be settled first', zh: '如需要翻译副本，应先确认最终证书版本' },
      { en: 'If names differ across identity documents, this should be reviewed before intake is fixed', zh: '如身份文件中的姓名表述不一致，应在受理前先核验' },
    ],
    expedited: {
      en: 'Expedite may be possible where the certificate version and receiving-side requirement are already clear. If there is uncertainty around version, translation, or supporting identity documents, rush handling should not be assumed.',
      zh: '若证书版本和接收要求已经清楚，可评估加急；若版本、翻译或辅助身份文件仍不明确，则不宜先假定可加急。',
    },
    reviewFocus: [
      { en: 'Whether the marriage certificate version already matches the actual Singapore use case', zh: '结婚证版本是否已匹配新加坡实际用途' },
      { en: 'Whether translation or original handling is likely to be needed', zh: '是否可能需要翻译或原件流转' },
      { en: 'Whether supporting identity or family-status documents should be reviewed at the same time', zh: '是否需要同步核验辅助身份或家庭状态文件' },
    ],
    commonIssues: [
      { en: 'Client assumes all marriage certificate versions are functionally the same', zh: '客户以为不同版本结婚证可以等同使用' },
      { en: 'The receiving side in Singapore is described too generally', zh: '新加坡接收方描述过于笼统' },
      { en: 'Names or identity details differ across supporting records', zh: '辅助记录中的姓名或身份细节不一致' },
    ],
    beforePaymentReview: {
      en: 'Before payment, EGS screens the marriage certificate format, checks whether translation or original presentation is likely to be needed, and confirms whether the file is stable enough to proceed without further documentary clarification.',
      zh: '付款前，EGS 会先筛查结婚证格式、判断是否可能需要翻译或原件展示，并确认文件是否已足够稳定，可进入正式受理。',
    },
  },
  {
    slug: 'australian-police-check-for-use-in-the-united-states',
    parentRouteSlug: 'australian-documents-for-use-in-united-states',
    documentSlug: 'police-check',
    title: {
      en: 'Australian Police Check for Use in the United States',
      zh: '澳洲无犯罪记录用于美国',
    },
    subheading: {
      en: 'Document-specific route page for Australia-issued police checks being prepared for use in the United States.',
      zh: '面向澳洲无犯罪记录赴美国使用的文件级路线页。',
    },
    whoUsesThis: {
      en: 'Usually used for employment, licensing, immigration, screening, compliance, or other cases where a US receiving side requests an Australian police record.',
      zh: '通常用于就业、执照、移民、背景核验、合规或其他美国接收方要求澳洲无犯罪记录的场景。',
    },
    serviceScope: {
      en: 'This route stays within the Australian main lane, but police records are time-sensitive and version-sensitive. EGS checks the issue date and receiving purpose before locking the route.',
      zh: '这类路线仍属于澳洲主线，但无犯罪记录对时效和版本都更敏感。EGS 会先核验出具日期和接收用途，再锁定路线。',
    },
    officialBaseline: {
      en: 'Officially, Australian police-check handling depends on the correct police-check product and, where relevant, the identity and fingerprint route used upstream. That makes this a validity-and-version route before it becomes a destination-country route.',
      zh: '从官方基线看，澳洲无犯罪路线首先取决于正确的无犯罪产品以及上游是否涉及特定身份或指纹路径。因此这类案件先是时效和版本问题，其次才是目的地国家问题。',
    },
    screeningDiscipline: {
      en: 'EGS screens issue date, exact U.S. filing purpose, and whether the file is on the right police-check variant before intake opens.',
      zh: 'EGS 会先核验出具日期、美国具体提交用途，以及当前文件是否属于正确的无犯罪版本，然后才开放受理。',
    },
    routePosition: {
      en: 'Usually apostille-first, with the real complexity coming from validity window, issue version, and receiving-side expectations rather than document form alone.',
      zh: '通常以海牙路径为主，真正的复杂点通常来自有效期窗口、签发版本和接收方要求，而不只是文件形态。',
    },
    typicalRequirements: [
      { en: 'Passport bio page', zh: '护照资料页' },
      { en: 'Police check in reviewable original or clear issued-copy form', zh: '可核验的无犯罪记录原件或清晰签发副本' },
      { en: 'If the receiving side has a validity window, the issue date should be checked early', zh: '若接收方对有效期有要求，应尽早核验出具日期' },
      { en: 'If a fingerprint or non-fingerprint distinction matters, it should be identified before intake', zh: '如有指纹版/无指纹版差异，应在受理前识别' },
    ],
    expedited: {
      en: 'Expedite may be possible on some Australia-side steps, but where the issue date or police-check variant is still uncertain, rush handling should be reviewed cautiously.',
      zh: '部分澳洲侧步骤可评估加急，但若签发日期或无犯罪版本仍不明确，应谨慎处理加急预期。',
    },
    reviewFocus: [
      { en: 'Whether the current police-check version is suitable for the specific US use case', zh: '当前无犯罪版本是否适合具体美国用途' },
      { en: 'Whether the receiving side has a strict issue-date validity requirement', zh: '接收方是否有严格的签发日期有效期要求' },
      { en: 'Whether the route remains straightforward apostille-first once the receiving purpose is clarified', zh: '在明确用途后，该路线是否仍保持清晰的海牙主线' },
    ],
    commonIssues: [
      { en: 'Client provides a police record that is already too old for the receiving purpose', zh: '客户提供的无犯罪记录对接收用途来说已经过期或过旧' },
      { en: 'The receiving side is identified only as “for the USA” without the actual filing purpose', zh: '只知道“用于美国”，但没有具体提交用途' },
      { en: 'Client is unsure which police-check variant they actually hold', zh: '客户并不清楚自己持有的是哪一种无犯罪版本' },
    ],
    beforePaymentReview: {
      en: 'Before payment, EGS checks whether the police-check version and issue date fit the actual US receiving use, whether any variant mismatch exists, and whether the route remains a straightforward Australian apostille matter.',
      zh: '付款前，EGS 会先核验无犯罪记录的版本和出具日期是否适合实际美国用途、是否存在版本错配，以及该路线是否仍属于清晰的澳洲海牙主线。',
    },
  },
  {
    slug: 'australian-company-documents-for-use-in-china',
    parentRouteSlug: 'australian-documents-for-use-in-china',
    documentSlug: 'company-documents',
    title: {
      en: 'Australian Company Documents for Use in China',
      zh: '澳洲公司文件用于中国',
    },
    subheading: {
      en: 'Australia-origin company-document route for China use, focused on the actual filing package, record-versus-signed-document split, and whether translation or original handling changes the path.',
      zh: '这是澳洲公司文件用于中国的路线页，重点在于实际提交包、记录型文件与签字文件的区分，以及翻译或原件流转是否会改变路径。',
    },
    whoUsesThis: {
      en: 'Usually used for China company registration support, authority proof, banking and account-opening packs, commercial filings, contracts, shareholder / director matters, or other corporate use where the receiving side wants a defined company-document package rather than one loose file.',
      zh: '通常用于中国公司登记配套、权限证明、银行开户材料、商业备案、合同、股东 / 董事事务，或其他要求成套公司文件而不是单一文件的企业场景。',
    },
    serviceScope: {
      en: 'This sits inside the Australian main lane, but company files for China often require more route review than personal certificates. EGS checks the actual filing purpose before confirming the handling path.',
      zh: '这类事项属于澳洲主线，但赴中国使用的公司文件通常比个人证书更需要路线判断。EGS 会先核验实际提交用途，再确认处理路径。',
    },
    officialBaseline: {
      en: 'Officially, Australian company files split between government records, chamber-supported records, and notarised private instruments. For China use, the route cannot be judged properly until the exact corporate document class is identified.',
      zh: '从官方基线看，澳洲公司文件会分成政府记录、商会支持文件和经公证私文书几类。赴中国用途只有在明确具体公司文件类别后，路线才能判断准确。',
    },
    screeningDiscipline: {
      en: 'EGS screens the exact China filing purpose, translation risk, and whether signed authority papers push the matter into a more specialised handling chain before taking it on.',
      zh: 'EGS 会先核验中国实际提交用途、翻译风险，以及签字授权文件是否会把案件推入更专业的处理链路，再决定是否受理。',
    },
    routePosition: {
      en: 'May begin as apostille-first, but the actual corporate use in China often determines whether a more specific handling chain should be reviewed.',
      zh: '可能先按海牙路径判断，但赴中国的实际公司用途常常决定是否还需核验更具体的处理链路。',
    },
    typicalRequirements: [
      { en: 'Passport bio page or identity material where needed for the instructing party', zh: '如需要，提供委托人护照资料页或身份材料' },
      { en: 'Clear copy of the relevant company record set for pre-review', zh: '用于预审的清晰公司文件扫描件' },
      { en: 'If the matter includes signed corporate authority papers, original execution versions may be needed', zh: '如事项中包含签字公司授权文件，通常需要签好的原件版本' },
      { en: 'If the receiving side in China expects translation or a specific company-document version, that should be identified early', zh: '如中国接收方要求翻译或特定版本的公司文件，应尽早确认' },
    ],
    expedited: {
      en: 'Expedite may be possible where the company document set is already defined and the route remains stable. Where the exact filing package or signed authority structure is still unclear, rush handling should be treated carefully.',
      zh: '若公司文件组合已明确且路线稳定，可评估加急；若具体提交包或签字授权结构仍不清楚，则应谨慎处理加急预期。',
    },
    reviewFocus: [
      { en: 'Which company-document set is actually needed for the China-facing filing or transaction', zh: '赴中国提交或交易实际需要哪一组公司文件' },
      { en: 'Whether the matter is pure record proof or includes signed authority documents', zh: '事项属于纯记录证明，还是包含签字授权文件' },
      { en: 'Whether translation or original handling should be built into the route from the outset', zh: '是否应从一开始就把翻译或原件流转纳入路线' },
    ],
    commonIssues: [
      { en: 'Client asks for “company documents for China” without specifying the actual filing purpose', zh: '客户只说“公司文件用于中国”，但没有明确实际提交用途' },
      { en: 'Different Chinese counterparties expect different company-document formats', zh: '不同中国接收方要求的公司文件格式并不相同' },
      { en: 'Signed authority papers are added after the case was first treated as copy-based', zh: '案件原本按副本路径判断，但后期又加入签字授权文件' },
      { en: 'The client treats ASIC extracts, constitutions, resolutions, and signed authority papers as interchangeable “company documents”', zh: '客户把 ASIC 摘录、章程、决议和签字授权文件都当成可互换的“公司文件”' },
    ],
    beforePaymentReview: {
      en: 'Before payment, EGS reviews the exact company-use context, identifies the correct record set, checks whether signed authority papers or translation change the route, and confirms whether the matter remains in a workable Australian-led handling structure.',
      zh: '付款前，EGS 会先核验公司用途、识别正确的文件组合、判断签字授权文件或翻译是否改变路线，并确认案件是否仍属于可执行的澳洲主线处理结构。',
    },
  },
  {
    slug: 'us-power-of-attorney-for-use-in-singapore',
    parentRouteSlug: 'us-documents-for-use-in-singapore',
    documentSlug: 'power-of-attorney',
    title: {
      en: 'US Power of Attorney for Use in Singapore',
      zh: '美国委托书用于新加坡',
    },
    subheading: {
      en: 'United States power-of-attorney route for Singapore use, where the real route question usually sits in state-level execution, notarisation, and whether Singapore will accept the resulting signed format.',
      zh: '这是美国委托书用于新加坡的路线页。真正的关键通常在州级签署、公证结构，以及新加坡接收方是否接受最终签字格式。',
    },
    whoUsesThis: {
      en: 'Usually used for Singapore property, company, banking, family representation, delegated signing, or other cases where a U.S.-signed authorisation document must survive both the U.S. execution rules and the Singapore receiving-side standard.',
      zh: '通常用于新加坡房产、公司、银行、家庭代办、授权签署，或其他既要满足美国签署规则、又要被新加坡接收方接受的授权文件场景。',
    },
    serviceScope: {
      en: 'This is mainly a US-side apostille-led route, but powers of attorney are execution-sensitive. EGS reviews the signing format, state path, and receiving-side expectation before confirming the route.',
      zh: '这类路线在美国侧以海牙主线为主，但委托书对签署格式非常敏感。EGS 会先核验签署形式、州级路径和接收要求，再确认路线。',
    },
    officialBaseline: {
      en: 'Officially, a U.S. power of attorney is only route-ready once the signing and notarisation structure is correct for the relevant state. That means the baseline issue is execution, not the destination country alone.',
      zh: '从官方基线看，美国委托书只有在对应州的签署和公证结构正确时，路线才真正成立。因此基础问题是执行形式，而不是单看目的地国家。',
    },
    screeningDiscipline: {
      en: 'EGS screens final text, state-level path, witness or signing-evidence issues, and whether Singapore’s receiving side will accept the resulting structure before intake starts.',
      zh: 'EGS 会先核验最终文本、州级路径、见证或签署证明问题，以及新加坡接收方是否接受该结构，再进入正式受理。',
    },
    routePosition: {
      en: 'May begin as apostille-first, but signed-document execution often determines whether the route remains simple or requires more specialised review.',
      zh: '可能先按海牙路径判断，但签字文件的签署形式常常决定该路线能否保持简单，还是需要更专业的核验。',
    },
    typicalRequirements: [
      { en: 'Final power-of-attorney text in the actual execution version', zh: '最终签署版本的委托书文本' },
      { en: 'Passport bio page', zh: '护照资料页' },
      { en: 'Identification of the relevant US state or authority path', zh: '明确适用的美国州级或机构路径' },
      { en: 'If original execution copies or signing evidence are required, they should be planned before intake', zh: '如需要原件或签署证明，应在受理前先安排' },
    ],
    expedited: {
      en: 'Signed-document matters are less straightforward to rush than copy-based files. Expedite should only be considered after the execution format and state route are reviewed.',
      zh: '签字文件通常比副本类文件更不适合直接承诺加急。应先核验签署格式和州级路径，再讨论是否可加急。',
    },
    reviewFocus: [
      { en: 'Whether the draft and execution format are suitable for Singapore use', zh: '文本草稿和签署形式是否适合赴新加坡使用' },
      { en: 'Whether the file can remain in an apostille-first lane once the state route is identified', zh: '在明确州级路径后，该文件能否保持在海牙主线内' },
      { en: 'Whether original handling or signing evidence changes the processing structure', zh: '原件流转或签署证明是否会改变处理结构' },
    ],
    commonIssues: [
      { en: 'The client has a draft but not the final execution version', zh: '客户只有草稿，没有最终签署版本' },
      { en: 'The applicable US state route is still unclear', zh: '适用的美国州级路径尚不明确' },
      { en: 'The receiving side in Singapore is known only in broad terms, not institution-specific terms', zh: '只知道目的地是新加坡，但没有明确具体接收机构' },
    ],
    beforePaymentReview: {
      en: 'Before payment, EGS reviews the power-of-attorney text, the US state-level path, likely signing-format issues, and whether the file can proceed inside a stable apostille-first structure for Singapore use.',
      zh: '付款前，EGS 会先核验委托书文本、美国州级路径、可能的签署格式问题，并判断该文件是否能以稳定的海牙主线结构赴新加坡使用。',
    },
  },
  {
    slug: 'canadian-birth-certificate-for-use-in-hong-kong',
    parentRouteSlug: 'canadian-documents-for-use-in-hong-kong',
    documentSlug: 'birth-certificate',
    title: {
      en: 'Canadian Birth Certificate for Use in Hong Kong',
      zh: '加拿大出生证明用于香港',
    },
    subheading: {
      en: 'Document-specific route page for Canada-issued birth certificates being prepared for use in Hong Kong.',
      zh: '面向加拿大出生证明赴香港使用的文件级路线页。',
    },
    whoUsesThis: {
      en: 'Usually used for family registration, dependent or identity matters, immigration support, school matters, or other civil-status related use in Hong Kong.',
      zh: '通常用于家庭登记、家属或身份事项、移民辅助、学校事务或其他在香港使用的民事身份场景。',
    },
    serviceScope: {
      en: 'This is mainly a Canada-side apostille-led route. Birth-certificate matters are often simpler than signed documents, but EGS still checks whether the Hong Kong receiving side expects copy-based, original, or translated handling.',
      zh: '这类事项在加拿大侧以海牙主线为主。出生证明通常比签字文件简单，但 EGS 仍会核验香港接收方要求的是副本、原件还是翻译副本。',
    },
    officialBaseline: {
      en: 'Officially, a Canadian birth certificate is an apostille-eligible public document, but the issuing province still determines the operational path. For Hong Kong use, that provincial starting point matters before format questions are discussed.',
      zh: '从官方基线看，加拿大出生证明属于可办理 apostille 的公共文件，但实际操作路径仍取决于签发省份。赴香港用途时，这个省份起点必须先看清楚。',
    },
    screeningDiscipline: {
      en: 'EGS screens province, certificate version, translation risk, and whether the Hong Kong use case can stay copy-based before confirming the route.',
      zh: 'EGS 会先核验省份、证书版本、翻译风险，以及赴香港用途能否保持副本路径，再确认路线。',
    },
    routePosition: {
      en: 'Usually apostille-first, with practical review focused on certificate version, receiving context, and whether any translation copy should be considered.',
      zh: '通常以海牙路径为主，重点在于证书版本、接收场景以及是否需要考虑翻译副本。',
    },
    typicalRequirements: [
      { en: 'Passport bio page for identity screening', zh: '用于身份核验的护照资料页' },
      { en: 'Birth certificate original or clear scan sufficient to confirm issue details', zh: '出生证明原件或可确认签发信息的清晰扫描件' },
      { en: 'If translation is likely, the final accepted certificate version should be fixed first', zh: '如可能需要翻译，应先确定最终可接受的证书版本' },
      { en: 'If the file cannot remain purely copy-based, original availability should be checked early', zh: '如无法保持在纯副本路径，应尽早确认原件是否可提供' },
    ],
    expedited: {
      en: 'Copy-based birth-certificate handling may sometimes move more quickly. If original presentation or translation-copy review is still unresolved, expedite should be reviewed carefully.',
      zh: '副本型出生证明有时可更快推进；若原件展示或翻译副本问题尚未明确，则应谨慎评估加急。',
    },
    reviewFocus: [
      { en: 'Whether the certificate version is suitable for the actual Hong Kong use case', zh: '证书版本是否适合实际香港用途' },
      { en: 'Whether the route can stay copy-based or needs more formal handling', zh: '路线能否保持在副本路径，还是需要更正式的处理方式' },
      { en: 'Whether translation or Chinese-facing use needs to be factored in early', zh: '是否应尽早把翻译或中文使用场景纳入判断' },
    ],
    commonIssues: [
      { en: 'The use purpose is described only generally as “for Hong Kong”', zh: '用途只笼统写成“用于香港”' },
      { en: 'The certificate image is incomplete and issue details cannot be verified cleanly', zh: '证书图片不完整，导致签发细节无法准确核验' },
      { en: 'Translation is discussed before the correct certificate version is locked', zh: '正确版本尚未锁定前就先讨论翻译' },
    ],
    beforePaymentReview: {
      en: 'Before payment, EGS checks whether the birth-certificate version is appropriate for the Hong Kong use case, whether translation or original handling is likely, and whether the route remains a workable Canada-side apostille matter.',
      zh: '付款前，EGS 会先核验出生证明版本是否适合香港用途、是否可能涉及翻译或原件流转，并判断该路线是否仍属于可执行的加拿大海牙主线。',
    },
  },
  {
    slug: 'australian-company-documents-for-use-in-china-apostille',
    parentRouteSlug: 'australian-apostille-for-use-in-china',
    documentSlug: 'company-documents',
    title: {
      en: 'Australian Company Documents for Use in China Apostille',
      zh: '澳洲公司文件用于中国海牙认证',
    },
    subheading: {
      en: 'Australia-origin company-document route for China use under the current apostille-first framework, focused on getting the company record set, signed-authority papers, and translation needs right before the route is locked.',
      zh: '这是按当前 apostille-first 框架处理的澳洲公司文件赴中国路线页。真正关键的是在锁定路线前先理清公司文件组合、签字授权文件和翻译需求。',
    },
    whoUsesThis: {
      en: 'Usually used for company registration support, commercial filings, banking, contract authority, director or shareholder proof, and other China-facing corporate matters where the receiving side wants a defined apostilled company-document set.',
      zh: '通常用于公司登记配套、商业备案、银行、合同授权、董事或股东证明，以及其他要求明确 apostille 公司文件组合的赴中国企业事项。',
    },
    serviceScope: {
      en: 'This sits inside the Australian apostille-first lane for China use. Company files are still more route-sensitive than personal certificates because the exact record set and signing structure often determine how straightforward the matter remains.',
      zh: '这类事项属于赴中国的澳洲 apostille-first 主线。公司文件通常仍比个人证书更吃路线判断，因为具体记录组合和签署结构往往决定案件能否保持清晰。',
    },
    officialBaseline: {
      en: 'Officially, mainland China now works on a Hague apostille basis. Australian company matters still split between government records, chamber-backed papers, and notarised private corporate documents, so the real baseline issue is correct document classification inside an apostille-first route.',
      zh: '从官方基线看，中国大陆现在已按海牙 apostille 路径处理。澳洲公司事项仍会分成政府记录、商会支持文件和经公证私营公司文件，因此真正的基础问题，是在 apostille-first 路线里把文件类别先识别正确。',
    },
    screeningDiscipline: {
      en: 'EGS screens the exact company-use case, whether the file is copy-based or execution-sensitive, and whether translation, originals, or company-authority wording materially change the apostille-first route before the matter is accepted.',
      zh: 'EGS 会先核验具体公司用途、该案属于副本路径还是对签署更敏感的文件，以及翻译、原件或公司授权表述是否会实质改变 apostille-first 路线，然后再决定是否受理。',
    },
    routePosition: {
      en: 'Apostille-first company route for China use. Still more document-set sensitive than a simple personal-certificate file, especially where signed authority papers are involved.',
      zh: '面向中国用途的 apostille-first 公司文件路线。通常仍比普通个人证书更依赖材料组合，尤其在涉及签字授权文件时更是如此。',
    },
    typicalRequirements: [
      { en: 'Clear company record set for pre-review', zh: '用于预审的清晰公司文件组合' },
      { en: 'Passport bio page or identity material of the instructing party where needed', zh: '如需要，提供委托人的护照资料页或身份材料' },
      { en: 'If the file includes signed authority documents, original execution versions may still be required', zh: '如案件包含签字授权文件，后续仍可能需要签好的原件版本' },
      { en: 'If the China receiving side expects translation or a destination-facing bilingual set, that should be identified early', zh: '如中国接收方要求翻译或面向接收方的双语文件组，应尽早确认' },
    ],
    expedited: {
      en: 'Rush handling should still be treated cautiously. Where the exact filing package or signed-authority structure is still unclear, urgency is secondary to route certainty.',
      zh: '加急仍应谨慎处理。若具体提交包或签字授权结构仍不清楚，优先级应是路线确定，而不是时效。',
    },
    reviewFocus: [
      { en: 'Which company-record set is actually required by the China receiving side', zh: '中国接收方实际要求的是哪一组公司记录' },
      { en: 'Whether the matter includes signed authority documents rather than pure record proof', zh: '该案是否包含签字授权文件，而不只是纯记录证明' },
      { en: 'Whether originals, translation, or execution evidence should be built into the route from the outset', zh: '是否应从一开始就把原件、翻译或签署证明纳入路线' },
    ],
    commonIssues: [
      { en: 'Client still asks for “company documents for China consular authentication” even though the actual route is now apostille-based', zh: '客户仍说“公司文件用于中国领馆认证”，但实际路径现在已改为 apostille' },
      { en: 'Different Chinese counterparties ask for different company-record formats', zh: '不同中国接收方要求的公司记录格式并不相同' },
      { en: 'Signed authority papers are added after the case was first treated as a record-only file', zh: '案件一开始按记录型文件判断，但后续又加入签字授权文件' },
    ],
    beforePaymentReview: {
      en: 'Before payment, EGS reviews the exact company-use context, identifies the correct corporate record set, checks whether signed authority papers or translation change the apostille-first route, and confirms whether the matter remains workable within an Australian-led China apostille chain.',
      zh: '付款前，EGS 会先核验公司用途、识别正确的公司文件组合、判断签字授权文件或翻译是否改变 apostille-first 路线，并确认该案件是否仍属于可执行的澳洲主导赴中国 apostille 链路。',
    },
  },
  {
    slug: 'australian-statutory-declaration-for-use-in-china-apostille',
    parentRouteSlug: 'australian-apostille-for-use-in-china',
    documentSlug: 'statutory-declaration',
    title: {
      en: 'Australian Statutory Declaration for Use in China Apostille',
      zh: '澳洲法定声明用于中国海牙认证',
    },
    subheading: {
      en: 'Australia-executed statutory-declaration route for China use under the current apostille-first framework, where wording, witness setup, and identity support usually matter more than the destination label itself.',
      zh: '这是按当前 apostille-first 框架处理的澳洲法定声明赴中国路线页。真正更关键的，通常是文本、见证安排和身份配套，而不是目的地标签本身。',
    },
    whoUsesThis: {
      en: 'Usually used for same-person matters, single-status matters, family or identity statements, name discrepancy explanations, and other China filings where the receiving side wants a sworn statement rather than a civil certificate.',
      zh: '通常用于同一人事项、单身声明、家庭或身份声明、姓名不一致说明，以及其他由接收方要求宣誓声明而不是民事证书的赴中国提交场景。',
    },
    serviceScope: {
      en: 'This is an Australia-led declaration route inside the China apostille-first lane. Signed declaration work is more execution-sensitive than ordinary certificate work and must still be screened accordingly.',
      zh: '这是澳洲主导、位于赴中国 apostille-first 链路内的声明文件路线。签字声明比普通证书类文件更依赖执行形式，因此仍需按该逻辑筛查。',
    },
    officialBaseline: {
      en: 'Officially, an Australian statutory declaration is a signed declaration route that depends on the correct witness or notarial setup. For current China use, that execution baseline has to be right inside an apostille-first framework rather than an assumed consular chain.',
      zh: '从官方基线看，澳洲法定声明属于签字声明路线，取决于正确的见证或公证安排。对于当前赴中国用途，这个执行基础必须在 apostille-first 框架内做对，而不是先假定为领馆链路。',
    },
    screeningDiscipline: {
      en: 'EGS screens the final declaration wording, witness or notarial setup, supporting identity records, and whether the China receiving side truly wants a statutory declaration rather than another sworn format before accepting the file.',
      zh: 'EGS 会先核验最终声明文本、见证或公证安排、辅助身份材料，以及中国接收方是否真的要求 statutory declaration，而非其他宣誓格式，然后再决定是否受理。',
    },
    routePosition: {
      en: 'Execution-led apostille-first route. The declaration wording and signing structure usually matter more than the destination-country label alone.',
      zh: '以执行形式为核心的 apostille-first 路线。通常声明文本和签署结构比单纯的目的地国家标签更重要。',
    },
    typicalRequirements: [
      { en: 'Final declaration text before signing', zh: '签署前的最终声明文本' },
      { en: 'Passport bio page of the signing party', zh: '签署人的护照资料页' },
      { en: 'If the file is same-person, single-status, or identity-based, supporting identity records should be reviewed together', zh: '如属于同一人、单身或身份类声明，应同步核验辅助身份文件' },
      { en: 'Original signed declaration may still be required depending on the route and receiving-side expectation', zh: '根据路线和接收方要求，后续仍可能需要签好的原件声明' },
    ],
    expedited: {
      en: 'Declaration-led files are not good rush candidates until the wording and witness format are final. Speed should be treated cautiously until the execution structure is settled, even where the downstream route remains apostille-first.',
      zh: '以声明为核心的案件，在文本和见证形式没有最终确定前，并不适合作为加急案件。即使下游仍是 apostille-first，只要执行结构未稳定，就应谨慎处理时效预期。',
    },
    reviewFocus: [
      { en: 'Whether the declaration wording is correct for the actual China use case', zh: '声明文本是否适用于实际中国用途' },
      { en: 'Whether the file needs witness-led, notarial, or more specialised execution handling', zh: '该案需要见证签字、公证还是更特殊的执行形式' },
      { en: 'Whether the supporting identity or civil-status record set is complete enough to support the declaration', zh: '辅助身份或民事状态材料是否足以支撑该声明' },
    ],
    commonIssues: [
      { en: 'Client still treats the declaration as a draft while asking for route timing', zh: '客户仍把声明当成草稿，但已开始询问时效' },
      { en: 'The receiving side is said to want “a declaration”, but the exact sworn format is still unclear', zh: '接收方只说要“声明”，但具体宣誓格式并不明确' },
      { en: 'Supporting identity documents are inconsistent with the declaration wording', zh: '辅助身份文件与声明文本表述不一致' },
    ],
    beforePaymentReview: {
      en: 'Before payment, EGS reviews the declaration wording, supporting records, witness or notarial arrangement, and whether the file truly belongs in the current China apostille-first route before formal intake begins.',
      zh: '付款前，EGS 会先核验声明文本、辅助材料、见证或公证安排，并确认该案件是否真的属于当前赴中国的 apostille-first 路线，再进入正式受理。',
    },
  },
];

export function getDocumentPriorityRoute(slug: string) {
  return documentPriorityRoutes.find((route) => route.slug === slug);
}

export function getCopyText(value: CopyText, locale: Locale) {
  return value[locale];
}

export function findDocumentRouteByParentAndDocument(parentRouteSlug: string, documentSlug: string) {
  return documentPriorityRoutes.find(
    (route) => route.parentRouteSlug === parentRouteSlug && route.documentSlug === documentSlug,
  );
}
