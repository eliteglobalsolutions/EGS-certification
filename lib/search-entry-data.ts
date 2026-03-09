import type { Locale } from '@/lib/i18n/dictionaries';

type CopyText = {
  en: string;
  zh: string;
};

type RegionalRequirement = {
  region: CopyText;
  summary: CopyText;
  officialRequirements: CopyText[];
  egsRequirements: CopyText[];
  commonExamples?: CopyText[];
  expedite: CopyText;
  note?: CopyText;
};

type InstitutionReference = {
  region: CopyText;
  schools: CopyText[];
  note?: CopyText;
};

export type SearchEntry = {
  slug: string;
  name: CopyText;
  intro: CopyText;
  scope: CopyText;
  helperText?: CopyText;
  helperTitle?: CopyText;
  checkpoints: CopyText[];
  relatedDocumentSlugs: string[];
  relatedIssuingSlugs?: string[];
  relatedDestinationSlugs?: string[];
  regionalRequirements?: RegionalRequirement[];
  institutionReferences?: InstitutionReference[];
};

export const issuingCountryEntries: SearchEntry[] = [
  {
    slug: 'australia',
    name: { en: 'Australia-issued documents', zh: '澳洲签发文件' },
    intro: {
      en: 'Entry page for documents issued in Australia and prepared for overseas use.',
      zh: '面向澳洲签发文件出境使用场景的搜索入口页。',
    },
    scope: {
      en: 'Australia is the full-service lane: notary coordination, apostille, legalisation, and consular routes across destinations.',
      zh: '澳洲是完整服务主线：可处理公证协调、海牙认证、领事认证及各领馆路线。',
    },
    helperTitle: {
      en: 'What usually matters for Australia-issued files',
      zh: '澳洲签发文件通常最关键的判断点',
    },
    helperText: {
      en: 'Australia-issued work depends first on document class. Government certificates, university records, signed private documents, and company records do not all start from the same upstream lane.',
      zh: '澳洲签发文件首先取决于文件类别。政府证书、大学文件、私人签字文件和公司材料，并不是从同一条上游路径起步。',
    },
    checkpoints: [
      { en: 'Identify whether the file is a public certificate, academic record, notarised private document, or company record before route review.', zh: '路径核验前先确认文件属于公文书、学历材料、经公证私人文件，还是公司材料。' },
      { en: 'Check whether the destination is apostille-led or still requires authentication / embassy legalisation.', zh: '确认目的地是附加证明书路径，还是仍需 authentication / 使馆认证。' },
      { en: 'Confirm whether the original can travel or whether a notarial / certified-copy setup is needed before intake.', zh: '进入受理前先确认原件能否流转，还是需要先做公证 / 认证副本结构。' },
    ],
    regionalRequirements: [
      {
        region: { en: 'Australia issuing baseline', zh: '澳洲签发官方基线' },
        summary: {
          en: 'Australia is the main full-service issuing lane because the path can start from DFAT-ready public documents, notarially prepared private documents, or company and academic records depending on the file.',
          zh: '澳洲是你的主力完整服务签发地，因为不同文件可以分别从 DFAT 可受理公文书、公证后的私人文件、公司材料或学历材料起步。',
        },
        officialRequirements: [
          { en: 'DFAT handles authentications and apostilles for eligible Australian public documents and notarised documents', zh: 'DFAT 可为符合条件的澳洲公文书及经公证文件办理 authentication 和 apostille' },
          { en: 'Australian private documents usually require proper notarisation before DFAT will act on them', zh: '澳洲私人文件通常需先完成合格公证，DFAT 才会继续办理' },
          { en: 'University, ASIC, ATO, AFP, court, and civil-registry material each has its own workable source format', zh: '大学、ASIC、ATO、AFP、法院及民事登记文件，各自都有不同的可行来源格式' },
        ],
        egsRequirements: [
          { en: 'Current scan showing the exact document form and issuing source', zh: '提供能显示文件形式和签发来源的当前扫描件' },
          { en: 'Destination country and receiving-side purpose', zh: '提供目的地国家和接收用途' },
          { en: 'Check whether the client can release originals, obtain fresh issue, or proceed by notarial copy', zh: '确认客户能否提供原件、补开新版，或改走公证副本路径' },
        ],
        commonExamples: [
          { en: 'Birth / marriage / change-of-name certificates', zh: '出生证 / 结婚证 / 改名证明' },
          { en: 'AFP police checks / ATO certificates / court documents', zh: 'AFP 无犯罪 / ATO 证明 / 法院文件' },
          { en: 'Degree certificates / transcripts / testamurs', zh: '毕业证 / 成绩单 / testamur' },
          { en: 'ASIC extracts / company records / powers of attorney', zh: 'ASIC 摘录 / 公司文件 / 授权书' },
        ],
        expedite: {
          en: 'Australia-issued matters are often the most workable for urgent handling, but speed still depends on the file already being in the correct upstream form.',
          zh: '澳洲签发案件通常最适合讨论加急，但前提仍是文件已经处于正确的上游形式。',
        },
      },
    ],
    relatedDocumentSlugs: ['birth-certificate', 'marriage-certificate', 'police-check', 'degree-certificate'],
    relatedDestinationSlugs: ['china', 'uae', 'canada', 'singapore'],
  },
  {
    slug: 'china',
    name: { en: 'China-issued documents', zh: '中国签发文件' },
    intro: {
      en: 'Entry page for documents issued in China and prepared for use abroad or in Australia.',
      zh: '面向中国签发文件赴海外或澳洲使用场景的搜索入口页。',
    },
    scope: {
      en: 'China is handled mainly through apostille-style or authentication pathways, with selected consular routes where workable.',
      zh: '中国文件以海牙或认证类路径为主，部分领馆路线可按具体情况处理。',
    },
    helperTitle: {
      en: 'What usually matters for China-issued files',
      zh: '中国签发文件通常最关键的判断点',
    },
    helperText: {
      en: 'China-issued work usually turns on whether the file can move as a Chinese public document with apostille, or whether translation, current reissue, and original release become the real bottlenecks.',
      zh: '中国签发文件通常关键在于：它能否作为中国公文书走附加证明书，还是翻译、重新出具和原件流转才是真正瓶颈。',
    },
    checkpoints: [
      { en: 'Identify whether the file is a Chinese public document, school record, signed statement, or company paper before route review.', zh: '路径核验前先确认文件属于中国公文书、学校材料、签字声明，还是公司文件。' },
      { en: 'Check whether translation, certified translation, or bilingual naming will be required for the destination filing.', zh: '确认目的地提交是否要求翻译、认证翻译或双语名称。' },
      { en: 'Confirm whether the original can travel through the chain or whether only a fresh official issue will be workable before intake.', zh: '进入受理前先确认原件能否流转，还是只能补开新的官方件。' },
    ],
    regionalRequirements: [
      {
        region: { en: 'China issuing baseline', zh: '中国签发官方基线' },
        summary: {
          en: 'China-issued public documents can now move through apostille pathways for Convention destinations, but practical handling still depends heavily on document freshness, translation, and original control.',
          zh: '中国签发公文书现在对《公约》目的地可以走附加证明书路径，但实务上仍高度依赖文件时效、翻译以及原件控制。',
        },
        officialRequirements: [
          { en: 'Chinese public documents for Convention destinations can follow the apostille route instead of the old embassy legalisation chain', zh: '中国公文书用于《公约》目的地时，可走附加证明书路径，不再沿用旧使馆认证链' },
          { en: 'Many destination filings still depend on translation, certified translation, or destination-specific naming conventions', zh: '很多目的地案件仍取决于翻译、认证翻译或目的地命名习惯' },
          { en: 'School, company, and signed private documents may still need a different upstream setup from standard civil certificates', zh: '学校文件、公司文件和私人签字文件，往往与民事证书的上游准备不同' },
        ],
        egsRequirements: [
          { en: 'Current scan and clear indication of where in China the document was issued', zh: '提供当前扫描件，并说明文件在中国的签发地区' },
          { en: 'Destination country and receiving-side use', zh: '提供目的地国家和接收用途' },
          { en: 'Check whether a fresh issue, translation, or original dispatch will be required later', zh: '确认后续是否需要补开新版、翻译或原件寄送' },
        ],
        commonExamples: [
          { en: 'Birth / marriage / no-criminal-record certificates', zh: '出生证 / 结婚证 / 无犯罪记录' },
          { en: 'Chinese academic documents and transcripts', zh: '中国学历文件及成绩单' },
          { en: 'Company records and declarations', zh: '公司文件及声明材料' },
        ],
        expedite: {
          en: 'China-issued files can be manageable where the document is current and translation expectations are already settled. Timing weakens quickly where the client still needs reissue or document correction.',
          zh: '如果文件仍在有效状态且翻译要求已明确，中国签发案件通常可以推进；但若还需补开或修正文书，时效会迅速变弱。',
        },
      },
    ],
    relatedDocumentSlugs: ['birth-certificate', 'marriage-certificate', 'power-of-attorney', 'company-documents'],
    relatedDestinationSlugs: ['australia', 'canada', 'usa', 'singapore'],
  },
  {
    slug: 'singapore',
    name: { en: 'Singapore-issued documents', zh: '新加坡签发文件' },
    intro: {
      en: 'Entry page for Singapore-issued documents used in Australia or other destinations.',
      zh: '面向新加坡签发文件赴澳洲或其他目的地使用场景的搜索入口页。',
    },
    scope: {
      en: 'Singapore work is mainly apostille-led, with selected consular handling where the route is workable.',
      zh: '新加坡文件以海牙路径为主，部分可行的领馆路线可单独评估处理。',
    },
    helperTitle: {
      en: 'What usually matters for Singapore-issued files',
      zh: '新加坡签发文件通常最关键的判断点',
    },
    helperText: {
      en: 'Singapore-issued work usually depends on whether the file is already a public document, or whether it first needs notarisation or SAL-ready preparation before the destination route can be locked.',
      zh: '新加坡签发文件通常取决于：它是否已经属于公文书，还是要先做公证或整理成 SAL 可受理形式，目的地路线才能锁定。',
    },
    checkpoints: [
      { en: 'Identify whether the file is government-issued, school-issued, company-issued, or privately signed before route review.', zh: '路径核验前先确认文件属于政府签发、学校签发、公司签发，还是私人签字文件。' },
      { en: 'Check whether notarisation is required before the SAL / destination route becomes workable.', zh: '确认是否必须先完成公证，SAL / 目的地路径才可行。' },
      { en: 'Prepare clean scans first so the route can be screened before originals are committed.', zh: '先准备清晰扫描件，以便在投入原件前完成路径筛查。' },
    ],
    regionalRequirements: [
      {
        region: { en: 'Singapore issuing baseline', zh: '新加坡签发官方基线' },
        summary: {
          en: 'Singapore-issued public documents are generally apostille-capable through SAL, but many education, private, and company-side files first depend on the correct notarisation or certification setup.',
          zh: '新加坡签发公文书通常可通过 SAL 办理附加证明书，但很多学历、私人及公司类文件仍先取决于正确的公证或认证准备。',
        },
        officialRequirements: [
          { en: 'SAL is the competent authority for Singapore apostilles', zh: 'SAL 是新加坡附加证明书主管机关' },
          { en: 'Non-public documents may need notarisation before they can move into the apostille system', zh: '非公文书文件进入附加证明书系统前，可能需先完成公证' },
          { en: 'Receiving-side document form still matters even where the Singapore side can issue apostille', zh: '即便新加坡端可办理附加证明书，接收方文件形式要求仍然重要' },
        ],
        egsRequirements: [
          { en: 'Clear scan showing whether the document is already public, certified, or still private', zh: '提供清晰扫描件，以判断文件是否已属公文书、认证件，还是仍属私人文件' },
          { en: 'Destination country and purpose of use', zh: '提供目的地国家和用途' },
          { en: 'Check whether the client can provide originals or needs a copy-based route', zh: '确认客户能否提供原件，还是需要副本路线' },
        ],
        commonExamples: [
          { en: 'Academic records / transcripts / enrollment letters', zh: '学历文件 / 成绩单 / 在读证明' },
          { en: 'Company records / board documents', zh: '公司文件 / 董事会材料' },
          { en: 'Powers of attorney / declarations', zh: '授权书 / 声明文件' },
        ],
        expedite: {
          en: 'Singapore-issued files are workable when the correct public-versus-private path is identified early. Timing becomes weaker when the file still needs upstream notarisation.',
          zh: '如果及早分清公文书和私人文件路径，新加坡签发案件通常可推进；若文件仍需补做上游公证，时效就会变弱。',
        },
      },
    ],
    relatedDocumentSlugs: ['degree-certificate', 'company-documents', 'power-of-attorney'],
    relatedDestinationSlugs: ['australia', 'china', 'uae'],
  },
  {
    slug: 'united-kingdom',
    name: { en: 'United Kingdom-issued documents', zh: '英国签发文件' },
    intro: {
      en: 'Entry page for UK-issued documents used in Australia, Asia, or other cross-border settings.',
      zh: '面向英国签发文件赴澳洲、亚洲或其他跨境场景使用的搜索入口页。',
    },
    scope: {
      en: 'UK work is mainly apostille-led, with selected consular handling depending on the destination chain.',
      zh: '英国文件以海牙路径为主，部分领馆路线视目的地链路情况处理。',
    },
    helperTitle: {
      en: 'What usually matters for UK-issued files',
      zh: '英国签发文件通常最关键的判断点',
    },
    helperText: {
      en: 'UK-issued work usually turns on whether the file can move as a public document or whether it first needs a solicitor / notary-certified route before legalisation.',
      zh: '英国签发文件通常关键在于：它能否作为公文书直接办理，还是要先经律师 / 公证人认证后再进入 legalisation。',
    },
    checkpoints: [
      { en: 'Check whether the file is a public certificate, academic document, company record, or signed private paper first.', zh: '先确认文件属于公文书、学历材料、公司记录，还是私人签字文件。' },
      { en: 'Identify whether the destination accepts the original file or expects a solicitor / notary-certified version.', zh: '确认目的地接受原始文件，还是要求律师 / 公证人认证版本。' },
      { en: 'Move to intake only after the destination route and material format are specific enough to screen properly.', zh: '只有在目的地路线和文件形式足够明确后，再进入受理。' },
    ],
    regionalRequirements: [
      {
        region: { en: 'United Kingdom issuing baseline', zh: '英国签发官方基线' },
        summary: {
          en: 'UK-issued public documents can usually move through apostille-based legalisation, but many practical files rely on proper solicitor or notary certification before they are fit for the destination route.',
          zh: '英国签发公文书通常可进入附加证明书 legalisation，但很多实际案件仍需先经过合格的律师或公证人认证，目的地路线才算成立。',
        },
        officialRequirements: [
          { en: 'The UK legalisation system accepts eligible public documents and properly certified documents', zh: '英国 legalisation 系统接受符合条件的公文书和合格认证文件' },
          { en: 'Private documents and many academic or company-side materials often need certification first', zh: '私人文件以及很多学历、公司类材料，往往需先完成认证' },
          { en: 'Destination-side standards still decide whether original or certified format is acceptable', zh: '目的地标准仍会决定原件还是认证版本才被接受' },
        ],
        egsRequirements: [
          { en: 'Current scan showing the exact UK document form', zh: '提供能显示英国文件形式的当前扫描件' },
          { en: 'Destination country and receiving-side use', zh: '提供目的地国家和接收用途' },
          { en: 'Check whether solicitor / notary certification is still missing upstream', zh: '确认上游是否仍缺律师 / 公证人认证' },
        ],
        commonExamples: [
          { en: 'Birth / marriage certificates', zh: '出生证 / 结婚证' },
          { en: 'Degree certificates / transcripts', zh: '毕业证 / 成绩单' },
          { en: 'Company documents', zh: '公司文件' },
        ],
        expedite: {
          en: 'UK-issued files can move well where certification format is already settled. If the client still needs upstream certification, urgency becomes less reliable.',
          zh: '若认证格式已经确定，英国签发案件通常推进不错；若仍需补上上游认证，时效就不那么可靠。',
        },
      },
    ],
    relatedDocumentSlugs: ['birth-certificate', 'marriage-certificate', 'degree-certificate'],
    relatedDestinationSlugs: ['china', 'uae', 'australia'],
  },
  {
    slug: 'canada',
    name: { en: 'Canada-issued documents', zh: '加拿大签发文件' },
    intro: {
      en: 'Entry page for Canada-issued documents used in Australia, Asia, and other cross-border destinations.',
      zh: '面向加拿大签发文件赴澳洲、亚洲及其他跨境目的地使用场景的搜索入口页。',
    },
    scope: {
      en: 'Canada work is mainly apostille-led, with selected consular routes reviewed case by case.',
      zh: '加拿大文件以海牙路径为主，部分领馆路线按个案审核处理。',
    },
    helperTitle: {
      en: 'What usually matters for Canada-issued files',
      zh: '加拿大签发文件通常最关键的判断点',
    },
    helperText: {
      en: 'Canada-issued work usually depends on province, document source, and whether the file is already in a public-document form or still needs notarial preparation.',
      zh: '加拿大签发文件通常取决于省份、签发来源，以及文件是否已经属于公文书形式，还是仍需公证准备。',
    },
    checkpoints: [
      { en: 'Identify the province, issuing authority, and document class before route review.', zh: '路径核验前先确认省份、签发机关和文件类别。' },
      { en: 'Check whether the file is already a public document or whether a notarised route is still needed upstream.', zh: '确认文件是否已属公文书，还是上游仍需走公证路径。' },
      { en: 'Move to intake after the destination route and original-versus-copy handling are clear enough to screen.', zh: '只有在目的地路线和原件 / 副本处理足够明确后，再进入受理。' },
    ],
    regionalRequirements: [
      {
        region: { en: 'Canada issuing baseline', zh: '加拿大签发官方基线' },
        summary: {
          en: 'Canada-issued documents now sit within the apostille framework, but the workable path still depends on province, competent authority, and whether the file is public or notarised.',
          zh: '加拿大签发文件现在属于附加证明书框架，但实际可行路径仍取决于省份、主管机关，以及文件是公文书还是公证件。',
        },
        officialRequirements: [
          { en: 'Canada operates under the apostille framework for eligible documents', zh: '加拿大对符合条件文件适用附加证明书框架' },
          { en: 'Different competent authorities apply depending on province and document origin', zh: '不同省份和文件来源会对应不同主管机关' },
          { en: 'Notarised documents can also fall within the route where public-document form is otherwise missing', zh: '如文件本身并非公文书，经公证文件也可进入该路径' },
        ],
        egsRequirements: [
          { en: 'Province and document source information', zh: '提供省份和签发来源信息' },
          { en: 'Current scan showing whether the file is original public issue or notarised copy', zh: '提供当前扫描件，以判断是原始公文书还是公证副本' },
          { en: 'Destination country and intended use', zh: '提供目的地国家和用途' },
        ],
        commonExamples: [
          { en: 'Birth / marriage certificates', zh: '出生证 / 结婚证' },
          { en: 'Academic records', zh: '学历材料' },
          { en: 'Police checks', zh: '无犯罪记录' },
          { en: 'Company documents', zh: '公司文件' },
        ],
        expedite: {
          en: 'Canada-issued files are workable when province and document form are already clear. Timing weakens where the upstream authority still needs to be identified.',
          zh: '如果省份和文件形式已经明确，加拿大签发案件通常可推进；若上游主管机关仍不清楚，时效就会变弱。',
        },
      },
    ],
    relatedDocumentSlugs: ['birth-certificate', 'marriage-certificate', 'degree-certificate', 'police-check'],
    relatedDestinationSlugs: ['australia', 'china', 'singapore', 'uae'],
  },
  {
    slug: 'usa',
    name: { en: 'United States-issued documents', zh: '美国签发文件' },
    intro: {
      en: 'Entry page for US-issued documents used in Australia, Asia, and other cross-border settings.',
      zh: '面向美国签发文件赴澳洲、亚洲及其他跨境场景使用的搜索入口页。',
    },
    scope: {
      en: 'US work is mainly apostille-led, with selected consular routes handled where practical.',
      zh: '美国文件以海牙路径为主，部分可行的领馆路线可评估处理。',
    },
    helperTitle: {
      en: 'What usually matters for U.S.-issued files',
      zh: '美国签发文件通常最关键的判断点',
    },
    helperText: {
      en: 'U.S.-issued work usually depends on state origin, whether the file is public or notarised, and whether the destination expects a state-level or federal-compatible route.',
      zh: '美国签发文件通常取决于州级来源、文件是公文书还是公证件，以及目的地要求州级还是联邦兼容路径。',
    },
    checkpoints: [
      { en: 'Identify the U.S. state origin and exact document class before route review.', zh: '路径核验前先确认美国州级来源和文件类别。' },
      { en: 'Check whether the file is a public record, a notarised private document, or a school / company document needing separate setup.', zh: '确认文件属于公文书、经公证私人文件，还是需单独准备的学校 / 公司材料。' },
      { en: 'Move to intake only after the destination route and state-versus-federal expectations are clear enough to screen.', zh: '只有在目的地路线及州级 / 联邦要求足够明确后，再进入受理。' },
    ],
    regionalRequirements: [
      {
        region: { en: 'United States issuing baseline', zh: '美国签发官方基线' },
        summary: {
          en: 'U.S.-issued files commonly follow apostille routes, but the operative complexity usually comes from state origin and the distinction between public records and notarised private documents.',
          zh: '美国签发文件通常可走附加证明书路径，但实务复杂点往往来自州级来源，以及公文书与经公证私人文件之间的区别。',
        },
        officialRequirements: [
          { en: 'Apostille handling in the U.S. is typically tied to state-level competent authorities for state-issued or state-notarised documents', zh: '美国附加证明书通常由州级主管机关处理州签发或州公证文件' },
          { en: 'Private documents usually need proper notarisation before apostille becomes possible', zh: '私人文件通常需先完成合格公证，附加证明书路径才成立' },
          { en: 'School and company materials may still require upstream certification depending on destination expectations', zh: '学校和公司类材料，仍可能因目的地要求而需要上游认证' },
        ],
        egsRequirements: [
          { en: 'State origin and document source', zh: '提供州级来源和签发来源' },
          { en: 'Current scan showing whether the file is public, notarised, school-issued, or company-issued', zh: '提供当前扫描件，以判断其属于公文书、公证件、学校签发件或公司签发件' },
          { en: 'Destination country and intended use', zh: '提供目的地国家和用途' },
        ],
        commonExamples: [
          { en: 'Birth certificates / marriage records', zh: '出生证 / 婚姻记录' },
          { en: 'Academic records', zh: '学历材料' },
          { en: 'Company documents / powers of attorney', zh: '公司文件 / 授权书' },
        ],
        expedite: {
          en: 'U.S.-issued matters are workable where the state source and file form are already clear. Timing weakens quickly where the wrong state-level path is assumed.',
          zh: '如果州级来源和文件形式已明确，美国签发案件通常可推进；若一开始就假设了错误的州级路径，时效会很快变弱。',
        },
      },
    ],
    relatedDocumentSlugs: ['birth-certificate', 'degree-certificate', 'company-documents', 'power-of-attorney'],
    relatedDestinationSlugs: ['australia', 'china', 'singapore', 'canada'],
  },
  {
    slug: 'hong-kong',
    name: { en: 'Hong Kong-issued documents', zh: '香港签发文件' },
    intro: {
      en: 'Entry page for Hong Kong-issued documents used in Australia, Asia, and other overseas destinations.',
      zh: '面向香港签发文件赴澳洲、亚洲及其他海外目的地使用场景的搜索入口页。',
    },
    scope: {
      en: 'Hong Kong work is mainly apostille-led, with selected consular handling depending on destination requirements.',
      zh: '香港文件以海牙路径为主，部分领馆路线视目的地要求单独处理。',
    },
    helperTitle: {
      en: 'What usually matters for Hong Kong-issued files',
      zh: '香港签发文件通常最关键的判断点',
    },
    helperText: {
      en: 'Hong Kong-issued work usually turns on whether the receiving side wants the original Hong Kong document, a certified copy, or bilingual supporting material for the destination filing.',
      zh: '香港签发文件通常关键在于：接收方要求原始香港文件、认证副本，还是需要双语配套材料来完成目的地提交。',
    },
    checkpoints: [
      { en: 'Identify whether the file is a Hong Kong public record, company document, or signed instrument first.', zh: '先确认文件属于香港公文书、公司文件，还是签字文件。' },
      { en: 'Check whether the destination wants the original Hong Kong issue, a certified copy, or bilingual support material.', zh: '确认目的地要原始香港签发件、认证副本，还是双语配套材料。' },
      { en: 'Move to intake only after route, naming, and translation expectations are clear enough to screen.', zh: '只有在路线、命名和翻译要求足够明确后，再进入受理。' },
    ],
    regionalRequirements: [
      {
        region: { en: 'Hong Kong issuing baseline', zh: '香港签发官方基线' },
        summary: {
          en: 'Hong Kong-issued public documents are generally apostille-capable, but practical handling still depends on whether the destination expects originals, certified copies, or bilingual supporting documentation.',
          zh: '香港签发公文书通常可走附加证明书路径，但实际处理仍取决于目的地要求原件、认证副本还是双语配套材料。',
        },
        officialRequirements: [
          { en: 'Hong Kong public documents can generally move through apostille-style legalisation', zh: '香港公文书通常可进入附加证明书类路径' },
          { en: 'Company and signed private documents may still depend on proper certification or notarisation first', zh: '公司文件和私人签字文件，仍可能先取决于合格认证或公证' },
          { en: 'Destination-side language and naming expectations often remain important', zh: '目的地端的语言和命名要求通常仍然重要' },
        ],
        egsRequirements: [
          { en: 'Current scan showing whether the file is public, certified, or privately signed', zh: '提供当前扫描件，以判断其属于公文书、认证件还是私人签字文件' },
          { en: 'Destination country and intended use', zh: '提供目的地国家和用途' },
          { en: 'Check whether bilingual naming or translation may be needed later', zh: '确认后续是否仍需双语命名或翻译' },
        ],
        commonExamples: [
          { en: 'Birth / marriage certificates', zh: '出生证 / 结婚证' },
          { en: 'Company records', zh: '公司文件' },
          { en: 'Power of attorney', zh: '授权书' },
        ],
        expedite: {
          en: 'Hong Kong-issued files are workable where the destination format is already clear. Timing weakens where bilingual or original-document requirements are still unsettled.',
          zh: '如果目的地格式要求已经明确，香港签发案件通常可推进；若双语或原件要求仍不清楚，时效就会变弱。',
        },
      },
    ],
    relatedDocumentSlugs: ['birth-certificate', 'marriage-certificate', 'company-documents', 'power-of-attorney'],
    relatedDestinationSlugs: ['australia', 'china', 'singapore', 'canada'],
  },
];

export const destinationCountryEntries: SearchEntry[] = [
  {
    slug: 'australia',
    name: { en: 'Documents for use in Australia', zh: '用于澳洲的文件' },
    intro: {
      en: 'Entry page for overseas-issued documents intended for use in Australia.',
      zh: '面向海外签发文件赴澳洲使用场景的搜索入口页。',
    },
    scope: {
      en: 'Australia destination work can include full notary, apostille, legalisation, and consular coordination where the route requires it.',
      zh: '目的地为澳洲时，可按需要承接完整的公证、海牙、领事认证及相关协调链路。',
    },
    helperTitle: {
      en: 'What usually matters for Australian use',
      zh: '用于澳洲时通常最关键的判断点',
    },
    helperText: {
      en: 'For Australia-bound files, the first review point is usually whether the overseas document has already been completed through the correct issuing-country authority before it reaches the Australian receiving side.',
      zh: '用于澳洲的文件，首要判断通常是海外文件是否已经按签发国的正确主管机关流程完成，而不是先看澳洲端怎么收件。',
    },
    checkpoints: [
      { en: 'Identify the Australian receiving side first, such as school, registry, employer, court, or bank.', zh: '先明确澳洲接收方，例如学校、登记机关、雇主、法院或银行。' },
      { en: 'Check whether the foreign document has already been properly completed through the issuing-country authority before it reaches Australia.', zh: '确认该海外文件是否已经按签发国主管机关完成正确流程，再进入澳洲使用。' },
      { en: 'Confirm whether English translation, certified copy, or original presentation will still be expected in Australia before intake.', zh: '进入受理前先确认澳洲端是否还会要求英文翻译、认证副本或原件出示。' },
    ],
    relatedDocumentSlugs: ['birth-certificate', 'marriage-certificate', 'degree-certificate', 'police-check'],
    relatedIssuingSlugs: ['china', 'singapore', 'united-kingdom'],
  },
  {
    slug: 'china',
    name: { en: 'Documents for use in China', zh: '用于中国的文件' },
    intro: {
      en: 'Entry page for Australia-issued or overseas-issued documents prepared for use in China.',
      zh: '面向澳洲或海外签发文件赴中国使用场景的搜索入口页。',
    },
    scope: {
      en: 'China destination work is now apostille-first for Convention documents, with review focused on document form, translation, validity, and receiving-authority instructions rather than the old consular chain.',
      zh: '用于中国的文件现在对《公约》范围内公文书以附加证明书路径为主，重点应放在文件形式、翻译、时效和接收机构要求，而不是旧的领馆认证链路。',
    },
    helperTitle: {
      en: 'What usually matters for China use now',
      zh: '现在用于中国时通常最关键的判断点',
    },
    helperText: {
      en: 'China no longer uses the old consular legalisation path for Convention documents. The real review issue is whether the Chinese receiving side wants a translated, current, original, or apostilled version of the file.',
      zh: '中国对《公约》范围内文件已不再走旧领馆认证链。现在真正要先确认的是：中国接收方要翻译件、近期签发件、原件，还是仅需附加证明书版本。',
    },
    checkpoints: [
      { en: 'Identify the Chinese receiving authority first, especially school, employer, registry, bank, or local bureau.', zh: '先明确中国接收机构，尤其是学校、雇主、登记机关、银行或地方主管部门。' },
      { en: 'Check whether the Chinese side expects translation, recent issue date, original presentation, or a specific Chinese naming format.', zh: '确认中国接收方是否要求翻译、近期签发件、原件出示，或特定中文名称格式。' },
      { en: 'Move to intake only after the document set and destination wording are aligned with the China-side filing purpose.', zh: '只有在文件组合和中国用途表述都对齐后，再进入受理。' },
    ],
    regionalRequirements: [
      {
        region: { en: 'China destination baseline', zh: '中国目的地官方基线' },
        summary: {
          en: 'For public documents within the Apostille Convention, China no longer expects the older embassy legalisation chain. The practical issue is whether the document format will be accepted by the Chinese receiving side after apostille.',
          zh: '对《海牙公约》范围内的公文书，中国已不再沿用旧的使领馆认证链。实务重点变成：文件在附加证明书后，是否符合中国接收方的具体格式要求。',
        },
        officialRequirements: [
          { en: 'China acceded to the Apostille Convention and stopped consular legalisation for Convention documents from 7 November 2023', zh: '中国加入《海牙公约》后，自 2023 年 11 月 7 日起，对《公约》范围内文件停办领事认证' },
          { en: 'An apostille only confirms signature, seal, and capacity; the receiving authority may still check format, content, translation, and validity period', zh: '附加证明书仅证明签字、印章和职务身份；接收机构仍可继续审查文件格式、内容、翻译和有效期' },
          { en: 'Applicants should check with the Chinese receiving authority before filing if a translation, current issue date, or original is expected', zh: '正式提交前，应先向中国接收机构确认是否要求翻译、近期签发件或原件' },
        ],
        egsRequirements: [
          { en: 'Scan of the current document set and clear destination-use explanation', zh: '当前文件组合扫描件及清晰的中国用途说明' },
          { en: 'Receiving-side name if known, especially for school, registry, employer, or local authority filings', zh: '如已知接收方名称，尤其是学校、登记机关、雇主或地方机构，应一并提供' },
          { en: 'Translation expectation and whether the client can release the original if later required', zh: '确认翻译要求，以及后续如被要求时客户能否提供原件' },
        ],
        commonExamples: [
          { en: 'Birth / marriage certificates', zh: '出生证 / 结婚证' },
          { en: 'Degree certificates / transcripts / enrollment letters', zh: '毕业证 / 成绩单 / 在读证明' },
          { en: 'Power of attorney / statutory declaration', zh: '授权书 / 法定声明' },
          { en: 'Company documents and extracts', zh: '公司文件及商业登记材料' },
        ],
        expedite: {
          en: 'China-bound files can be relatively straightforward when the receiving side is clear and the file fits the apostille route cleanly. Urgency becomes less predictable where translation, original release, or format clarification is still outstanding.',
          zh: '如果中国接收方明确、文件也能干净地走附加证明书路径，整体通常较顺；但若翻译、原件流转或格式要求仍不清楚，加急就会变得不稳定。',
        },
      },
    ],
    relatedDocumentSlugs: ['birth-certificate', 'marriage-certificate', 'power-of-attorney', 'company-documents'],
    relatedIssuingSlugs: ['australia', 'united-kingdom', 'singapore'],
  },
  {
    slug: 'uae',
    name: { en: 'Documents for use in the UAE', zh: '用于阿联酋的文件' },
    intro: {
      en: 'Entry page for documents destined for the United Arab Emirates.',
      zh: '面向文件赴阿联酋使用场景的搜索入口页。',
    },
    scope: {
      en: 'UAE destination work remains authentication-and-embassy-legalisation based for Australian-origin files, with route control centred on DFAT authentication, embassy handling, and receiving-emirate expectations.',
      zh: '用于阿联酋的澳洲文件仍以 DFAT Authentication 加使馆认证为主，路线控制重点在于 DFAT 认证、阿联酋使馆受理以及接收酋长国的具体要求。',
    },
    helperTitle: {
      en: 'What usually matters for UAE legalisation',
      zh: '用于阿联酋认证时通常最关键的判断点',
    },
    helperText: {
      en: 'For UAE matters, the key issue is not just the destination country. The file needs to be sorted into the correct embassy lane first: personal certificate, educational file, power of attorney, or commercial document.',
      zh: '阿联酋案件不能只看目的地国家。更关键的是先把文件分进正确的使馆受理类别：个人证书、学历文件、授权书，还是商业文件。',
    },
    checkpoints: [
      { en: 'Identify the receiving emirate, ministry, free-zone, employer, or bank before the embassy lane is chosen.', zh: '在决定使馆受理类别前，先确认接收酋长国、部委、自贸区、雇主或银行。' },
      { en: 'Separate regular certificates from commercial files early because invoices, export papers, and company records do not follow the same embassy preparation.', zh: '尽早区分普通证书和商业文件，因为发票、出口单据和公司材料的送馆准备并不一样。' },
      { en: 'Check whether the client can release the original or a DFAT-ready notarised version before intake is fixed.', zh: '在锁定受理前，先确认客户能否提供原件或 DFAT 可受理的公证版本。' },
    ],
    regionalRequirements: [
      {
        region: { en: 'UAE destination baseline', zh: '阿联酋目的地官方基线' },
        summary: {
          en: 'For Australian-origin documents bound for the UAE, the route is still an authentication and embassy legalisation chain rather than an apostille-only path.',
          zh: '澳洲签发文件用于阿联酋时，仍属于 Authentication 加使馆认证链路，而不是单纯的附加证明书路径。',
        },
        officialRequirements: [
          { en: 'The UAE Embassy in Canberra says documents should first be authenticated by DFAT, not apostilled for this route', zh: '阿联酋驻堪培拉使馆明确要求先由 DFAT 办理 Authentication，而不是 Apostille' },
          { en: 'All documents should be of Australian origin for the Australia mission route', zh: '澳洲送阿联酋的该路线要求文件属于澳洲来源' },
          { en: 'Commercial invoices and related export documents require Chamber of Commerce handling before embassy submission', zh: '商业发票及相关出口文件送馆前需要商会处理' },
          { en: 'The embassy distinguishes commercial documents from regular certificates and expects online mission-side service selection', zh: '使馆会区分商业文件和普通证书，并要求按线上任务类别正确提交' },
        ],
        egsRequirements: [
          { en: 'Clear destination emirate / authority and whether the file is personal, educational, power-of-attorney, or commercial', zh: '明确接收酋长国 / 机构，以及文件属于个人、学历、授权还是商业类' },
          { en: 'Original or notarised file setup suitable for DFAT authentication', zh: '适合 DFAT Authentication 的原件或公证件结构' },
          { en: 'For commercial matters, early review of invoice / CO / board paper / company record type before embassy submission', zh: '商业案件在送馆前先核验发票、原产地证、董事会文件或公司记录类型' },
        ],
        commonExamples: [
          { en: 'Birth / marriage / police checks', zh: '出生证 / 结婚证 / 无犯罪' },
          { en: 'Power of attorney', zh: '授权书' },
          { en: 'Academic certificates / transcripts', zh: '学历证书 / 成绩单' },
          { en: 'Commercial invoices / company incorporation / good standing', zh: '商业发票 / 公司注册 / good standing' },
        ],
        expedite: {
          en: 'UAE files can sometimes move quickly when the DFAT-ready form is already correct and the document class is clear. Urgency becomes less dependable where commercial categorisation, chamber work, or embassy-side classification is still unsettled.',
          zh: '若文件已经具备 DFAT 可受理的正确形式，且文件类别明确，阿联酋案件有时可以推进较快；但如果商业分类、商会环节或使馆受理类别还没定清，加急就不稳定。',
        },
      },
    ],
    relatedDocumentSlugs: ['birth-certificate', 'marriage-certificate', 'police-check', 'company-documents'],
    relatedIssuingSlugs: ['australia', 'china', 'singapore'],
  },
  {
    slug: 'canada',
    name: { en: 'Documents for use in Canada', zh: '用于加拿大的文件' },
    intro: {
      en: 'Entry page for documents prepared for Canadian use across family, study, and business contexts.',
      zh: '面向家庭、留学及商业场景赴加拿大使用文件的搜索入口页。',
    },
    scope: {
      en: 'Canada destination work is mainly apostille-led, with route checks based on the issuing country and receiving institution.',
      zh: '用于加拿大的文件以海牙路径为主，并按签发地和接收机构做路线核验。',
    },
    helperTitle: {
      en: 'What usually matters for Canadian acceptance',
      zh: '加拿大接收方通常最看重什么',
    },
    helperText: {
      en: 'For Canada-bound files, the practical review point is usually the receiving institution or provincial requirement rather than any embassy-side complication.',
      zh: '用于加拿大的文件，实务上更关键的通常是接收机构或省级要求，而不是使馆链路本身。',
    },
    checkpoints: [
      { en: 'Identify the Canadian receiving body first, especially province, school, employer, regulator, or service agency.', zh: '先明确加拿大接收机构，尤其是省级机构、学校、雇主、监管机构或服务部门。' },
      { en: 'Check whether the Canadian side wants the foreign public document itself, a certified copy, or extra supporting identity and translation material.', zh: '确认加拿大接收方要的是外国公文书本身、认证副本，还是还要配套身份和翻译材料。' },
      { en: 'Move to intake once the destination institution and document format are specific enough to screen properly.', zh: '只有在接收机构和文件格式足够明确后，再进入受理。' },
    ],
    regionalRequirements: [
      {
        region: { en: 'Canada destination baseline', zh: '加拿大目的地官方基线' },
        summary: {
          en: 'Canada now accepts apostilles under the Convention, but in practice the receiving province, institution, or employer often decides the exact documentary form that will be accepted.',
          zh: '加拿大现在适用《海牙公约》并接受附加证明书，但在实务上，具体接收省份、机构或雇主往往会决定最终接受哪一种文件形式。',
        },
        officialRequirements: [
          { en: 'Canada recognises apostilles for incoming public documents from Convention jurisdictions', zh: '加拿大承认来自《公约》缔约国的附加证明书公文书' },
          { en: 'Receiving institutions may still set their own standards on originals, translations, certified copies, or supporting identity documents', zh: '接收机构仍可能自行规定原件、翻译、认证副本或身份配套要求' },
          { en: 'Private documents usually still depend on proper notarisation before any apostille logic becomes relevant', zh: '私人文件通常仍需先完成合格公证，之后附加证明书路径才有意义' },
        ],
        egsRequirements: [
          { en: 'Clear Canadian destination context, especially province, institution, and purpose of filing', zh: '明确加拿大用途背景，尤其是省份、接收机构和提交目的' },
          { en: 'Current file scan showing whether the document is public, school-issued, private, or already notarised', zh: '提供当前文件扫描件，以判断其属于公文书、学校签发文件、私人文件还是已公证文件' },
          { en: 'Check whether the client may later need translation, original release, or supporting ID with the main document', zh: '确认后续是否可能还要翻译、原件流转或身份配套材料' },
        ],
        commonExamples: [
          { en: 'Birth / marriage certificates', zh: '出生证 / 结婚证' },
          { en: 'Academic certificates / transcripts', zh: '学历证书 / 成绩单' },
          { en: 'Police checks', zh: '无犯罪记录' },
          { en: 'Company documents', zh: '公司文件' },
        ],
        expedite: {
          en: 'Canada-bound files are usually manageable when the receiving institution and document form are already clear. Timing becomes less reliable where the destination body is still undecided.',
          zh: '如果加拿大接收机构和文件形式已经明确，整体通常较好推进；若接收主体仍不清楚，时效就会不稳定。',
        },
      },
    ],
    relatedDocumentSlugs: ['birth-certificate', 'degree-certificate', 'police-check', 'company-documents'],
    relatedIssuingSlugs: ['australia', 'china', 'united-kingdom'],
  },
  {
    slug: 'singapore',
    name: { en: 'Documents for use in Singapore', zh: '用于新加坡的文件' },
    intro: {
      en: 'Entry page for documents intended for Singapore use across work, education, and family matters.',
      zh: '面向工作、教育及家庭场景赴新加坡使用文件的搜索入口页。',
    },
    scope: {
      en: 'Singapore destination work is mainly apostille-led, with review focused on whether the file is a public document, a notarised private document, or a receiving-side form that needs signature witnessing.',
      zh: '用于新加坡的文件以海牙路径为主，重点在于判断文件属于公文书、经公证的私人文件，还是需要签字见证的新加坡收件表格。',
    },
    helperTitle: {
      en: 'What usually matters for Singapore filings',
      zh: '新加坡提交时通常最关键的判断点',
    },
    helperText: {
      en: 'Singapore matters often turn on document character rather than country label. The first question is whether this is a public certificate, a notarised private document, or a signature-witnessing job.',
      zh: '新加坡案件更常取决于文件性质，而不是国家标签。第一步要先判断它是公文书、经公证的私人文件，还是签字见证类案件。',
    },
    checkpoints: [
      { en: 'Identify whether the receiving side is a school, employer, bank, court, or company registry before deciding the document path.', zh: '在决定文件路径前，先明确接收方是学校、雇主、银行、法院还是公司登记机构。' },
      { en: 'Check whether the matter is a public certificate route, a notarised private document route, or a signature-witnessing job for Singapore forms.', zh: '确认该案属于公文书路径、经公证私人文件路径，还是新加坡表格签字见证类案件。' },
      { en: 'Confirm whether originals, supporting school records, or company proof should travel together before intake.', zh: '进入受理前先确认是否需要原件、学术配套材料或公司证明一并提交。' },
    ],
    regionalRequirements: [
      {
        region: { en: 'Singapore destination baseline', zh: '新加坡目的地官方基线' },
        summary: {
          en: 'Singapore accepts apostille-based legalisation under the Convention, but the practical distinction is whether the file should go through a competent authority route or a separate notarial/signature-witnessing route.',
          zh: '新加坡在《公约》下接受附加证明书，但实务上更关键的是：该案应走主管机关的 apostille 路径，还是另行做公证 / 签字见证路径。',
        },
        officialRequirements: [
          { en: 'Singapore MFA states Singapore is party to the Apostille Convention and SAL is the competent authority for Singapore-issued apostilles', zh: '新加坡外交部明确新加坡适用《海牙公约》，SAL 是新加坡附加证明书主管机关' },
          { en: 'Singapore missions note that documents for use in Singapore may still need notarisation or witnessing depending on the legal form of the document', zh: '新加坡驻外使领馆也说明，用于新加坡的文件，仍可能因文件法律形式不同而需要公证或签字见证' },
          { en: 'Receiving authorities in Singapore may still specify the exact document form they accept', zh: '新加坡接收机构仍可能对具体文件形式提出明确要求' },
        ],
        egsRequirements: [
          { en: 'Clear explanation of whether the matter is school, employer, family, court, or company related', zh: '明确该案属于学校、雇主、家庭、法院还是公司用途' },
          { en: 'Current file set showing whether the document is public, private, or already notarised', zh: '提供当前文件组合，以判断其属于公文书、私人文件还是已公证文件' },
          { en: 'Check whether Singapore needs supporting transcript, company proof, or ID copy with the core file', zh: '确认新加坡接收方是否还需要成绩单、公司证明或身份证明配套' },
        ],
        commonExamples: [
          { en: 'Degree certificates / transcripts / enrollment letters', zh: '毕业证 / 成绩单 / 在读证明' },
          { en: 'Marriage / birth certificates', zh: '结婚证 / 出生证' },
          { en: 'Power of attorney / declarations', zh: '授权书 / 声明文件' },
          { en: 'Company records and board papers', zh: '公司注册材料及董事会文件' },
        ],
        expedite: {
          en: 'Singapore-bound files usually move well when the file type is correctly classified at the start. Delays are more often caused by the wrong upstream format than by the destination itself.',
          zh: '如果一开始就把文件类型判断正确，新加坡路线通常推进较顺。真正容易拖延的，更多是上游文件形式判断错误，而不是目的地本身。',
        },
      },
    ],
    relatedDocumentSlugs: ['degree-certificate', 'marriage-certificate', 'power-of-attorney', 'company-documents'],
    relatedIssuingSlugs: ['australia', 'china', 'united-kingdom'],
  },
  {
    slug: 'usa',
    name: { en: 'Documents for use in the USA', zh: '用于美国的文件' },
    intro: {
      en: 'Entry page for documents intended for use in the United States across work, study, family, and company matters.',
      zh: '面向工作、留学、家庭及公司事项赴美国使用文件的搜索入口页。',
    },
    scope: {
      en: 'USA destination work is mainly apostille-led, with route checks shaped by issuer, state, and receiving institution.',
      zh: '用于美国的文件以海牙路径为主，按签发地、州和接收机构做路线核验。',
    },
    helperTitle: {
      en: 'What usually matters for U.S. acceptance',
      zh: '美国接收方通常最看重什么',
    },
    helperText: {
      en: 'For use in the United States, the main review point is usually institutional acceptance and file format, especially for education, licensing, and employer-side filings.',
      zh: '用于美国的文件，最关键的通常是机构接收标准和文件格式，尤其是教育、执照和雇主类提交。',
    },
    checkpoints: [
      { en: 'Identify whether the file is for school admission, professional licensing, employer onboarding, court, or company use.', zh: '先明确该案用于学校录取、职业执照、雇主入职、法院，还是公司用途。' },
      { en: 'Check whether the U.S. receiving side wants an apostilled public document, a notarised private document, or a plain supporting copy only.', zh: '确认美国接收方要的是附加证明书公文书、经公证的私人文件，还是仅需普通辅助副本。' },
      { en: 'Confirm whether the receiving institution needs originals, sealed school issue, certified copy, or signed witness format before intake.', zh: '进入受理前先确认接收机构要求原件、学校密封件、认证副本，还是签字见证格式。' },
    ],
    regionalRequirements: [
      {
        region: { en: 'United States destination baseline', zh: '美国目的地官方基线' },
        summary: {
          en: 'The United States accepts apostilles under the Convention, but many U.S. filings still turn on the receiving institution’s own documentary standard rather than the country route alone.',
          zh: '美国适用《海牙公约》并接受附加证明书，但很多美国案件最终能否被接收，取决于具体机构自身的文件标准，而不只是国家路线。',
        },
        officialRequirements: [
          { en: 'The U.S. Department of State explains that foreign public documents for U.S. use may be accepted with an apostille where the issuing country is within the Convention', zh: '美国国务院说明，如签发国适用《海牙公约》，用于美国的外国公文书通常可配附加证明书' },
          { en: 'Private documents normally need a proper notarisation step before any apostille logic applies', zh: '私人文件通常需先完成合格公证，再谈后续附加证明书逻辑' },
          { en: 'Schools, licensing boards, employers, and courts may each specify their own form requirements on top of the country route', zh: '学校、执照机构、雇主和法院，往往会在国家路线之外另行规定自己的文件形式要求' },
        ],
        egsRequirements: [
          { en: 'Clear receiving-side name where available, especially school, board, employer, court, or corporate counterparty', zh: '如已知，应提供具体接收方名称，尤其是学校、执照机构、雇主、法院或商业相对方' },
          { en: 'Current file scan showing whether the document is public, private, school-issued, or already notarised', zh: '提供当前文件扫描件，以判断其属于公文书、私人文件、学校签发文件，还是已完成公证' },
          { en: 'Check whether the U.S. side expects sealed academic issue, wet-sign original, certified copy, or translation support', zh: '确认美国接收方是否要求密封学术件、湿签原件、认证副本或翻译配套' },
        ],
        commonExamples: [
          { en: 'Degree certificates / transcripts / enrollment letters', zh: '毕业证 / 成绩单 / 在读证明' },
          { en: 'Birth / marriage certificates', zh: '出生证 / 结婚证' },
          { en: 'Power of attorney / declarations', zh: '授权书 / 声明文件' },
          { en: 'Company documents and signed resolutions', zh: '公司文件及签署决议' },
        ],
        expedite: {
          en: 'U.S.-bound files can move efficiently when the receiving-side format is already clear. Delays usually come from not knowing whether the institution wants a sealed issue, notarised copy, or simply an apostilled public document.',
          zh: '如果美国接收方的文件格式要求已经明确，整体可以推进得较有效率。真正容易拖延的，通常是不清楚对方要密封件、公证副本，还是单纯的附加证明书公文书。',
        },
      },
    ],
    relatedDocumentSlugs: ['birth-certificate', 'degree-certificate', 'company-documents'],
    relatedIssuingSlugs: ['china', 'australia', 'united-kingdom'],
  },
  {
    slug: 'united-kingdom',
    name: { en: 'Documents for use in the United Kingdom', zh: '用于英国的文件' },
    intro: {
      en: 'Entry page for documents intended for use in the United Kingdom across family, education, and commercial matters.',
      zh: '面向家庭、教育及商业场景赴英国使用文件的搜索入口页。',
    },
    scope: {
      en: 'UK destination work is mainly apostille-led, with selected consular handling depending on the upstream chain.',
      zh: '用于英国的文件以海牙路径为主，部分领馆链路视上游流程单独评估。',
    },
    helperTitle: {
      en: 'What usually matters for UK acceptance',
      zh: '英国接收方通常最看重什么',
    },
    helperText: {
      en: 'UK-bound files usually depend on whether the receiving side wants an original public document or a properly certified version, not on a complex embassy route.',
      zh: '用于英国的文件，通常关键在于接收方要原始公文书还是合格认证件，而不是复杂的使馆路径。',
    },
    checkpoints: [
      { en: 'Identify whether the UK receiving side is a school, employer, Companies House-related party, court, or registry office.', zh: '先明确英国接收方是学校、雇主、Companies House 相关主体、法院还是登记机构。' },
      { en: 'Check whether the UK side wants the original foreign public document or a properly certified version before route review.', zh: '路径核验前先确认英国接收方要原始外国公文书，还是合格认证版本。' },
      { en: 'Confirm whether translation support, original production, or supporting documents are needed before intake.', zh: '进入受理前先确认是否还需要翻译、原件出示或补充材料。' },
    ],
    regionalRequirements: [
      {
        region: { en: 'United Kingdom destination baseline', zh: '英国目的地官方基线' },
        summary: {
          en: 'The United Kingdom accepts apostille-based foreign public documents, but many UK-side filings still depend on whether the receiving body wants the original document or a properly certified supporting version.',
          zh: '英国接受带附加证明书的外国公文书，但很多英国用途最终仍取决于接收机构要原件，还是合格认证的辅助版本。',
        },
        officialRequirements: [
          { en: 'Foreign public documents from Convention jurisdictions can generally be used with apostille, subject to receiving-side requirements', zh: '来自《公约》缔约国的外国公文书通常可凭附加证明书使用，但仍受接收方要求影响' },
          { en: 'Private documents and signed instruments still depend on a proper certification or notarisation route first', zh: '私人文件和签字文件仍需先经过合格认证或公证路径' },
          { en: 'UK schools, employers, courts, and company-side bodies may each set their own documentary standards', zh: '英国学校、雇主、法院和公司类机构，往往会各自设定文件标准' },
        ],
        egsRequirements: [
          { en: 'Clear UK destination body and filing purpose', zh: '明确英国接收机构和提交目的' },
          { en: 'Current file scan showing whether the document is public, private, school-issued, or already certified', zh: '提供当前文件扫描件，以判断其属于公文书、私人文件、学校签发件还是已完成认证' },
          { en: 'Check whether the UK side may later ask for original production, translation, or a wider supporting pack', zh: '确认英国接收方后续是否可能要求原件出示、翻译或更完整的配套材料' },
        ],
        commonExamples: [
          { en: 'Birth / marriage certificates', zh: '出生证 / 结婚证' },
          { en: 'Degree certificates / transcripts', zh: '毕业证 / 成绩单' },
          { en: 'Company documents', zh: '公司文件' },
          { en: 'Signed declarations / powers of attorney', zh: '声明文件 / 授权书' },
        ],
        expedite: {
          en: 'UK-bound files usually move smoothly once the receiving-side format is settled. Delay risk mainly comes from uncertainty over whether the UK body wants originals or certified support only.',
          zh: '一旦英国接收方的文件格式确定，整体通常推进顺畅。主要延误风险在于不清楚对方要原件还是仅需认证辅助件。',
        },
      },
    ],
    relatedDocumentSlugs: ['birth-certificate', 'degree-certificate', 'company-documents'],
    relatedIssuingSlugs: ['australia', 'canada', 'usa', 'singapore', 'hong-kong'],
  },
  {
    slug: 'hong-kong',
    name: { en: 'Documents for use in Hong Kong', zh: '用于香港的文件' },
    intro: {
      en: 'Entry page for documents intended for Hong Kong use across family, work, and business matters.',
      zh: '面向家庭、工作及商业场景赴香港使用文件的搜索入口页。',
    },
    scope: {
      en: 'Hong Kong destination work is mainly apostille-led, with selected consular handling depending on issuer and receiving side.',
      zh: '用于香港的文件以海牙路径为主，部分领馆处理视签发地和接收方而定。',
    },
    helperTitle: {
      en: 'What usually matters for Hong Kong use',
      zh: '用于香港时通常最关键的判断点',
    },
    helperText: {
      en: 'Hong Kong matters usually turn on receiving-side wording, original versus certified-copy acceptance, and whether the file will be used for registry, school, or company purposes.',
      zh: '香港案件更常卡在接收方表述、原件还是认证副本，以及文件究竟用于登记、学校还是公司场景。',
    },
    checkpoints: [
      { en: 'Identify whether the Hong Kong receiving side is a school, bank, registry, employer, or company counterparty.', zh: '先明确香港接收方是学校、银行、登记机构、雇主还是商业相对方。' },
      { en: 'Check whether Hong Kong wants original documents, certified copies, or bilingual supporting material before route review.', zh: '路径核验前先确认香港接收方要原件、认证副本，还是双语辅助材料。' },
      { en: 'Move to intake after the document wording and use context are specific enough to screen properly.', zh: '只有在文件表述和使用场景足够明确后，再进入受理。' },
    ],
    regionalRequirements: [
      {
        region: { en: 'Hong Kong destination baseline', zh: '香港目的地官方基线' },
        summary: {
          en: 'Hong Kong accepts apostille-style incoming public documents, but practical acceptance often turns on the receiving bank, school, registry, or business counterparty rather than the country route alone.',
          zh: '香港接受附加证明书类的外来公文书，但实务上最终是否被接收，往往更取决于银行、学校、登记机构或商业相对方，而不只是国家路线。',
        },
        officialRequirements: [
          { en: 'Incoming foreign public documents from Convention jurisdictions can generally rely on apostille, subject to the receiving-side filing standard', zh: '来自《公约》缔约国的外国公文书通常可凭附加证明书使用，但仍受香港接收方标准影响' },
          { en: 'Private or signed documents may still need proper notarisation before they are fit for Hong Kong use', zh: '私人文件或签字文件仍可能要先完成合格公证，才适合用于香港' },
          { en: 'Hong Kong receiving bodies may ask for originals, certified copies, Chinese translation, or bilingual supporting documents depending on the filing context', zh: '香港接收机构可能因具体场景要求原件、认证副本、中文翻译或双语配套文件' },
        ],
        egsRequirements: [
          { en: 'Clear Hong Kong receiving-side context such as bank, school, company, registry, or family-use filing', zh: '明确香港接收方背景，例如银行、学校、公司、登记机关或家庭用途提交' },
          { en: 'Current file scan showing whether the document is public, private, or already certified', zh: '提供当前文件扫描件，以判断其属于公文书、私人文件还是已完成认证' },
          { en: 'Check whether bilingual naming, translation, or original production may still be requested', zh: '确认后续是否仍可能要求中英双语名称、翻译或原件出示' },
        ],
        commonExamples: [
          { en: 'Birth / marriage certificates', zh: '出生证 / 结婚证' },
          { en: 'Academic documents', zh: '学历文件' },
          { en: 'Company documents', zh: '公司文件' },
          { en: 'Power of attorney', zh: '授权书' },
        ],
        expedite: {
          en: 'Hong Kong-bound files are often workable once the receiving side and language expectation are clear. Timing becomes less predictable where bilingual or original-document requirements are still uncertain.',
          zh: '如果香港接收方和语言要求已经明确，整体通常可顺利推进；若双语或原件要求仍不清楚，时效就会更难预估。',
        },
      },
    ],
    relatedDocumentSlugs: ['birth-certificate', 'marriage-certificate', 'company-documents', 'power-of-attorney'],
    relatedIssuingSlugs: ['australia', 'canada', 'usa', 'singapore', 'united-kingdom'],
  },
  {
    slug: 'saudi-arabia',
    name: { en: 'Documents for use in Saudi Arabia', zh: '用于沙特阿拉伯的文件' },
    intro: {
      en: 'Entry page for documents intended for Saudi Arabia use across company, employment, family, and administrative matters.',
      zh: '面向公司、就业、家庭及行政场景赴沙特阿拉伯使用文件的搜索入口页。',
    },
    scope: {
      en: 'Saudi Arabia destination work should not be treated as a blanket non-Hague route. Public-document matters are now apostille-capable, but sector-specific filings can still turn on the receiving authority’s exact attestation expectation.',
      zh: '用于沙特阿拉伯的文件不能再一概写成非海牙。公文书现在可以走附加证明书路径，但具体行业、雇主或机构案件仍会受接收方具体认证要求影响。',
    },
    helperTitle: {
      en: 'What usually matters for Saudi filings',
      zh: '沙特提交时通常最关键的判断点',
    },
    helperText: {
      en: 'Saudi Arabia should be screened by filing channel, not just country name. Public documents can be apostilled, but employer, ministry, and commercial uses may still ask for more specific attestation handling.',
      zh: '沙特案件应按提交渠道判断，而不是只看国家名。公文书可以走 apostille，但雇主、部委和商业用途仍可能提出更具体的认证要求。',
    },
    checkpoints: [
      { en: 'Identify the Saudi receiving ministry, employer, licensing body, cultural mission, or company first.', zh: '先明确沙特接收方是部委、雇主、许可机构、文化机构还是公司。' },
      { en: 'Check whether the matter is a public-document apostille file or a sector-specific filing that still expects extra attestation treatment.', zh: '确认该案是标准公文书 apostille，还是仍需额外认证处理的行业性案件。' },
      { en: 'Confirm whether Arabic translation, original production, or supporting employer / company papers are needed before intake.', zh: '进入受理前先确认是否需要阿语翻译、原件出示或配套雇主 / 公司材料。' },
    ],
    regionalRequirements: [
      {
        region: { en: 'Saudi Arabia destination baseline', zh: '沙特目的地官方基线' },
        summary: {
          en: 'Saudi Arabia’s Australia mission now expressly recognises apostille-based attestation for public documents, so the main review point is no longer whether Saudi is non-Hague, but whether the receiving side wants something beyond the public-document apostille path.',
          zh: '沙特驻澳机构已明确承认公文书的 apostille 路径，因此现在的关键不再是“沙特是不是非海牙”，而是接收方是否对该案提出超出公文书 apostille 的额外要求。',
        },
        officialRequirements: [
          { en: 'The Saudi Embassy in Australia states there are two attestation types and identifies apostille for public documents through DFAT', zh: '沙特驻澳使馆说明存在两类认证，其中公文书可通过 DFAT 办理 apostille' },
          { en: 'Applicants still need to match the attestation type to the document class and receiving-side requirement', zh: '申请人仍需根据文件类别和接收方要求匹配正确认证类型' },
          { en: 'Commercial, employer, or sector-specific filings may still require extra receiving-side checks even where the country is within the Convention', zh: '商业、雇主或行业性提交，即使所在国家适用《公约》，也可能仍有额外接收要求' },
        ],
        egsRequirements: [
          { en: 'Clear identification of whether the file is a public certificate, educational record, signed instrument, or commercial set', zh: '先明确该案是公文书、学历材料、签字文件还是商业文件组合' },
          { en: 'Saudi receiving-side details where available, especially employer, ministry, or cultural / licensing body', zh: '如已知，应提供沙特接收方信息，尤其是雇主、部委、文化机构或许可机构' },
          { en: 'Check whether Arabic translation, current issue date, or original release may later be requested', zh: '提前确认是否可能要求阿拉伯语翻译、近期签发件或原件流转' },
        ],
        commonExamples: [
          { en: 'Educational certificates / transcripts', zh: '学历证书 / 成绩单' },
          { en: 'Birth / marriage certificates', zh: '出生证 / 结婚证' },
          { en: 'Power of attorney / statutory declaration', zh: '授权书 / 法定声明' },
          { en: 'Company records and commercial files', zh: '公司注册材料及商业文件' },
        ],
        expedite: {
          en: 'Saudi-bound files can be efficient where the receiving-side requirement is already pinned down. Urgency is harder to rely on where the client only knows the destination country but not the actual Saudi filing channel.',
          zh: '如果接收要求已经明确，沙特案件可以推进得较有效率；但如果客户只知道目的地是沙特，却不清楚具体提交渠道，加急就不宜过早承诺。',
        },
      },
    ],
    relatedDocumentSlugs: ['company-documents', 'power-of-attorney', 'statutory-declaration'],
    relatedIssuingSlugs: ['australia'],
  },
  {
    slug: 'kuwait',
    name: { en: 'Documents for use in Kuwait', zh: '用于科威特的文件' },
    intro: {
      en: 'Entry page for documents intended for Kuwait use across company, family, and personal administrative matters.',
      zh: '面向公司、家庭及个人行政场景赴科威特使用文件的搜索入口页。',
    },
    scope: {
      en: 'Kuwait destination work remains route-confirmation first, and Australian-origin files commonly still require DFAT plus further attestation steps before Kuwaiti authorities will accept them.',
      zh: '用于科威特的文件仍应先做路线确认，澳洲来源文件通常仍需先经 DFAT，再进入后续认证环节，科威特方面才会接受。',
    },
    helperTitle: {
      en: 'What usually matters for Kuwait attestation',
      zh: '科威特认证时通常最关键的判断点',
    },
    helperText: {
      en: 'For Kuwait, the file should be checked against the attestation chain first. Police checks, education documents, and official certificates do not all behave the same way once Kuwait-side requirements are applied.',
      zh: '科威特案件应先对照认证链来判断。无犯罪、学历文件和官方证书，在套入科威特要求后并不会完全按同一路线处理。',
    },
    checkpoints: [
      { en: 'Identify the Kuwait receiving party and sector first, especially police, education, family, company, or licensing use.', zh: '先明确科威特接收方及行业场景，尤其是无犯罪、学历、家庭、公司或许可用途。' },
      { en: 'Check whether the file is an official certificate, police check, education record, signed document, or company pack before route review.', zh: '路径核验前先确认是官方证书、无犯罪、学历材料、签字文件还是公司文件包。' },
      { en: 'Move to intake only after the attestation chain and any Kuwait-side extras are clear enough to screen.', zh: '只有在认证链和科威特端附加要求足够明确后，再进入受理。' },
    ],
    regionalRequirements: [
      {
        region: { en: 'Kuwait destination baseline', zh: '科威特目的地官方基线' },
        summary: {
          en: 'For Australian official documents intended for Kuwait, the route still involves DFAT and additional attestation before Kuwaiti authorities will accept the file.',
          zh: '澳洲官方文件用于科威特时，仍需经过 DFAT 和后续认证步骤，科威特方面才会接受。',
        },
        officialRequirements: [
          { en: 'The Australian Embassy in Kuwait says Australian official documents for use in Kuwait should be attested by DFAT in Australia and then the Australian Embassy in Kuwait', zh: '澳大利亚驻科威特使馆说明，用于科威特的澳洲官方文件应先由 DFAT 办理，再由澳洲驻科威特使馆认证' },
          { en: 'Australian National Police Checks also need Kuwaiti Embassy handling in Canberra', zh: '澳洲无犯罪记录还需经过科威特驻堪培拉使馆环节' },
          { en: 'Educational documents may require extra verification depending on the institution type and whether the file is Australian or foreign', zh: '学历文件可能因院校性质及文件是否为澳洲来源而需要额外核验' },
        ],
        egsRequirements: [
          { en: 'Clear file classification: official certificate, police check, education record, signed instrument, or company set', zh: '先明确文件类别：官方证书、无犯罪、学历材料、签字文件或公司材料组合' },
          { en: 'Check whether the original can travel through the attestation chain', zh: '确认原件能否进入该认证链路流转' },
          { en: 'For education or police files, confirm if there is any Kuwait-side sector requirement beyond the basic attestation path', zh: '学历或无犯罪案件需确认科威特接收方是否还有超出基本认证链的行业要求' },
        ],
        commonExamples: [
          { en: 'Birth / marriage certificates', zh: '出生证 / 结婚证' },
          { en: 'Police checks', zh: '无犯罪记录' },
          { en: 'Educational certificates', zh: '学历文件' },
          { en: 'Power of attorney / company documents', zh: '授权书 / 公司文件' },
        ],
        expedite: {
          en: 'Kuwait routes tend to be stable only after the exact attestation chain is identified. Speed should be discussed carefully where the client has not yet confirmed whether embassy-side or sector-side steps apply.',
          zh: '科威特路线通常要等认证链完全厘清后才算稳定。如果客户还没确认是否涉及使馆或行业附加环节，就不宜轻易承诺时效。',
        },
      },
    ],
    relatedDocumentSlugs: ['company-documents', 'power-of-attorney', 'birth-certificate'],
    relatedIssuingSlugs: ['australia'],
  },
  {
    slug: 'malaysia',
    name: { en: 'Documents for use in Malaysia', zh: '用于马来西亚的文件' },
    intro: {
      en: 'Entry page for documents intended for Malaysia use across family, business, education, and administrative matters.',
      zh: '面向家庭、商业、教育及行政场景赴马来西亚使用文件的搜索入口页。',
    },
    scope: {
      en: 'Malaysia destination work should be reviewed by document class. Australian public documents can be apostille-ready through DFAT, while private or legal-use documents may still need notarial or mission-side preparation depending on the filing context.',
      zh: '用于马来西亚的文件应按文件类别判断。澳洲公文书通常可经 DFAT 进入附加证明书路径，而私人文件或法律用途文件则可能仍需先做公证或驻外机构环节。',
    },
    helperTitle: {
      en: 'What usually matters for Malaysia use',
      zh: '用于马来西亚时通常最关键的判断点',
    },
    helperText: {
      en: 'Malaysia is not a one-route destination. Government-issued certificates, private legal documents, and Malaysia court or property-use papers need to be separated early because the mission guidance treats them differently.',
      zh: '马来西亚不是单一路线国家。政府证书、私人法律文件，以及要在马来西亚法院或房产场景使用的文件，必须尽早分开判断，因为驻外机构对它们的要求并不一样。',
    },
    checkpoints: [
      { en: 'Identify whether the Malaysian filing is for court, property, business, school, immigration, or general registry use first.', zh: '先明确马来西亚用途属于法院、房产、商业、学校、移民还是一般登记。' },
      { en: 'Check whether the file is a public document, a private legal document, or a signed instrument that needs prior notarial setup.', zh: '确认该案属于公文书、私人法律文件，还是需要先做公证准备的签字文件。' },
      { en: 'Move to intake only after the correct Malaysia-side document class and wording are settled.', zh: '只有在马来西亚端正确的文件类别和表述都确定后，再进入受理。' },
    ],
    regionalRequirements: [
      {
        region: { en: 'Malaysia destination baseline', zh: '马来西亚目的地官方基线' },
        summary: {
          en: 'Malaysia mission guidance in Australia distinguishes Australian government-issued documents from non-government/legal documents, so the main review point is the document class rather than a generic country route label.',
          zh: '马来西亚驻澳机构会区分澳洲政府签发文件与非政府 / 法律类文件，因此关键在于先判断文件类别，而不是只看目的地国家名称。',
        },
        officialRequirements: [
          { en: 'Malaysia mission guidance in Australia says Australian government-issued documents need DFAT authentication, while non-government documents need notary plus DFAT before consular-side apostille handling', zh: '马来西亚驻澳机构说明，澳洲政府签发文件需先经 DFAT；非政府文件则需先公证再经 DFAT，之后再进入驻外机构相关 apostille / 认证流程' },
          { en: 'Malaysia also separately states legal documents for property, inheritance, and business use lodged in Malaysia must be certified by the High Commission and that JP / notary certification alone is not accepted by Malaysian courts', zh: '马来西亚方面另行说明，涉及房产、继承、商业等在马来西亚落地的法律文件，应由高专署认证；仅有 JP 或 notary 的副本认证不被马来西亚法院接受' },
          { en: 'The receiving-side purpose still matters, so the same document title may not follow one identical route in every Malaysia filing', zh: '接收用途仍然重要，因此同一种文件标题在不同马来西亚场景下未必走完全相同路线' },
        ],
        egsRequirements: [
          { en: 'Clarify whether the file is a public certificate, academic document, company paper, or legal instrument for court / property / business use', zh: '先明确文件属于公文书、学历文件、公司文件，还是用于法院 / 房产 / 商业的法律文件' },
          { en: 'Check whether the file needs notarial setup before DFAT, not just after', zh: '确认该案是否需要在 DFAT 前先做公证，而不是默认直接送 DFAT' },
          { en: 'Review whether the Malaysian receiving side expects original, certified copy, or witnessed signature format', zh: '核验马来西亚接收方要求原件、认证副本，还是签字见证格式' },
        ],
        commonExamples: [
          { en: 'Birth / marriage certificates', zh: '出生证 / 结婚证' },
          { en: 'Academic certificates / transcripts', zh: '学历证书 / 成绩单' },
          { en: 'Power of attorney / statutory declaration', zh: '授权书 / 法定声明' },
          { en: 'Company documents for property or business filings', zh: '用于商业或房产事项的公司文件' },
        ],
        expedite: {
          en: 'Malaysia files can be efficient once the document class is identified correctly. The main source of delay is using the wrong starting format for legal-use documents.',
          zh: '只要文件类别判断正确，马来西亚案件可以推进得比较顺。最容易拖延的，通常是法律用途文件一开始就用了错误的文件形式。',
        },
      },
    ],
    relatedDocumentSlugs: ['degree-certificate', 'company-documents', 'power-of-attorney'],
    relatedIssuingSlugs: ['australia'],
  },
  {
    slug: 'vietnam',
    name: { en: 'Documents for use in Vietnam', zh: '用于越南的文件' },
    intro: {
      en: 'Entry page for documents intended for Vietnam use across employment, company, education, and family matters.',
      zh: '面向就业、公司、教育及家庭场景赴越南使用文件的搜索入口页。',
    },
    scope: {
      en: 'Vietnam destination work for Australian-origin documents still commonly runs through DFAT plus embassy legalisation, with translation and receiving-authority detail often becoming decisive.',
      zh: '澳洲来源文件用于越南时，通常仍走 DFAT 加使馆认证路线，而翻译和接收机构细节往往会成为关键判断点。',
    },
    helperTitle: {
      en: 'What usually matters for Vietnam legalisation',
      zh: '越南认证时通常最关键的判断点',
    },
    helperText: {
      en: 'Vietnam-bound files should be reviewed around the embassy legalisation chain itself: DFAT status, embassy supporting paperwork, and whether Vietnamese translation or destination-use wording is needed at the same time.',
      zh: '越南案件应围绕使馆认证链本身来判断：DFAT 进度、使馆配套材料，以及是否还要同步准备越南语翻译或越南用途表述。',
    },
    checkpoints: [
      { en: 'Identify the Vietnam receiving authority first, especially employer, school, registry, ministry, or company counterparty.', zh: '先明确越南接收机构，尤其是雇主、学校、登记机关、部委或商业相对方。' },
      { en: 'Check whether the file is already DFAT-authenticated and whether Vietnamese translation or embassy paperwork needs to be prepared in parallel.', zh: '确认该案是否已完成 DFAT，以及是否要同步准备越南语翻译和使馆配套材料。' },
      { en: 'Move to intake only after the embassy legalisation chain and destination-use wording are clear enough to screen.', zh: '只有在使馆认证链和越南用途表述足够明确后，再进入受理。' },
    ],
    regionalRequirements: [
      {
        region: { en: 'Vietnam destination baseline', zh: '越南目的地官方基线' },
        summary: {
          en: 'Documents issued by Australian authorities for use in Vietnam still need DFAT authentication before legalisation by the Embassy of Vietnam in Australia, unless an exemption applies.',
          zh: '澳洲机关签发文件用于越南时，除非存在免认证情形，否则仍需先经 DFAT，再由越南驻澳使馆办理领事认证。',
        },
        officialRequirements: [
          { en: 'The Embassy of Vietnam in Australia says Australian documents for use in Vietnam must be authenticated by DFAT before embassy legalisation', zh: '越南驻澳使馆说明，用于越南的澳洲文件须先经 DFAT，再由使馆办理认证' },
          { en: 'The embassy also asks for supporting materials such as cover letter, ID copy, and return envelope for postal handling', zh: '使馆还要求配套材料，如 cover letter、身份证明复印件和回邮信封' },
          { en: 'Vietnam-facing matters may still turn on translation and whether the document is exempt or qualified for legalisation', zh: '越南案件还会受翻译要求以及文件是否属于免认证 / 可认证范围影响' },
        ],
        egsRequirements: [
          { en: 'Clear destination use and receiving authority in Vietnam', zh: '明确越南用途和接收机构' },
          { en: 'Current file scan showing whether the document is already DFAT-authenticated or still at pre-DFAT stage', zh: '提供当前文件扫描件，以判断该案已完成 DFAT 还是仍停留在 DFAT 前阶段' },
          { en: 'Check whether Vietnamese translation, signed declaration, or company-use wording needs to be prepared in parallel', zh: '确认是否还需同步准备越南语翻译、声明文件或公司用途表述' },
        ],
        commonExamples: [
          { en: 'Birth / marriage certificates', zh: '出生证 / 结婚证' },
          { en: 'Educational documents / letters of enrolment', zh: '学历文件 / 在读证明' },
          { en: 'Police checks / affidavits', zh: '无犯罪记录 / 宣誓文件' },
          { en: 'Company records / powers of attorney', zh: '公司文件 / 授权书' },
        ],
        expedite: {
          en: 'Vietnam files can move reasonably well once the DFAT-authenticated form is ready and the supporting pack is complete. Delays are common where translation, embassy paperwork, or destination-use detail is still missing.',
          zh: '如果 DFAT 后文件形式已经准备好，且配套材料齐全，越南路线通常可以推进；但若翻译、使馆材料或用途细节仍缺失，就很容易拖慢。',
        },
      },
    ],
    relatedDocumentSlugs: ['company-documents', 'power-of-attorney', 'degree-certificate'],
    relatedIssuingSlugs: ['australia'],
  },
];

export const documentTypeEntries: SearchEntry[] = [
  {
    slug: 'birth-certificate',
    name: { en: 'Birth certificate', zh: '出生证明' },
    intro: {
      en: 'Entry page for birth certificate use across immigration, family registration, and identity matters.',
      zh: '面向出生证明在移民、家庭登记及身份事项中使用的搜索入口页。',
    },
    scope: {
      en: 'Birth certificate work follows the issuing-country route, with Australia fully covered and other jurisdictions mainly apostille-led.',
      zh: '出生证明按签发地路线办理，澳洲可完整覆盖，其他司法区以海牙路径为主。',
    },
    helperTitle: {
      en: 'What usually matters for birth-certificate work',
      zh: '出生证明办理时通常最关键的判断点',
    },
    helperText: {
      en: 'Birth-certificate matters are usually about certificate version and receiving-side acceptance, not just the document name. The real review point is often original versus certified copy, issue-date sensitivity, and translation need.',
      zh: '出生证明案件通常关键在于证书版本和接收方接受标准，而不只是文件名称本身。真正要先核验的，往往是原件还是认证副本、签发日期敏感度以及翻译要求。',
    },
    checkpoints: [
      { en: 'Check whether original, certified copy, or scan is accepted.', zh: '确认是否接受原件、真实副本或扫描件。' },
      { en: 'Confirm destination naming and translation requirements.', zh: '确认目的地名称格式和翻译要求。' },
      { en: 'Use intake once route and quantity are settled.', zh: '路线和份数明确后进入受理。' },
    ],
    regionalRequirements: [
      {
        region: { en: 'Australia-issued birth certificates', zh: '澳洲签发出生证明' },
        summary: {
          en: 'Australia is the cleanest civil-record lane because DFAT explicitly accepts original registry birth certificates and notarised copies. The real review point is not whether the document exists, but which version and format the receiving side will accept.',
          zh: '澳洲是最清晰的民事证书路线之一，因为 DFAT 明确接受出生登记机构原件和经公证的副本。真正需要核验的，不是有没有文件，而是接收方接受哪一种版本和格式。',
        },
        officialRequirements: [
          { en: 'DFAT can legalise original Australian government birth certificates and notarised copies', zh: 'DFAT 可认证澳洲政府签发的出生证明原件及经公证的副本' },
          { en: 'DFAT issues an apostille or authentication on the original document supplied', zh: 'DFAT 会在提交的原始文件上附加海牙或认证页' },
          { en: 'DFAT says you must first confirm with the overseas receiving authority whether you need legalisation and what format is required', zh: 'DFAT 明确要求先向海外接收方确认是否需要认证以及所需格式' },
        ],
        egsRequirements: [
          { en: 'Clear scan or original birth certificate for version screening', zh: '提供清晰扫描件或原件，用于确认出生证明版本' },
          { en: 'Passport bio page', zh: '护照资料页' },
          { en: 'If translation is likely, finalise the exact certificate version before translation starts', zh: '如可能需要翻译，应先锁定最终证书版本再处理翻译' },
        ],
        expedite: {
          en: 'Australian birth-certificate routes can sometimes move quickly if the certificate is already in the correct form. If a replacement issue or notarial copy path is still unresolved, rush handling should be reviewed first.',
          zh: '如果客户已经持有正确版本的出生证明，澳洲路线有时可以推进较快；如果还涉及补发件或公证副本路径，就应先做路线核验再谈加急。',
        },
      },
      {
        region: { en: 'United Kingdom-issued birth certificates', zh: '英国签发出生证明' },
        summary: {
          en: 'UK birth certificates are usually straightforward public-registry documents, but the practical split is whether the receiving side needs a paper apostille or whether a certified-copy route is acceptable.',
          zh: '英国出生证明通常属于清晰的公共登记文件，但实务上的关键分流点在于接收方要纸质海牙，还是接受认证副本路径。',
        },
        officialRequirements: [
          { en: 'GOV.UK says birth certificates from the General Register Office can be legalised as official public documents', zh: 'GOV.UK 明确出生证明这类总登记局文件可以作为官方公共文件办理认证' },
          { en: 'Birth certificates are not eligible for an e-Apostille', zh: '出生证明不能办理 e-Apostille' },
          { en: 'Applicants should check whether the receiving side needs the original document or a certified copy', zh: '申请前应先确认接收方要求原件还是认证副本' },
        ],
        egsRequirements: [
          { en: 'Clear scan or original birth certificate', zh: '清晰扫描件或出生证明原件' },
          { en: 'Passport bio page for intake screening', zh: '用于预审的护照资料页' },
          { en: 'If a newer issue date matters to the receiving side, identify that before intake', zh: '如接收方在意签发日期，应在受理前先识别' },
        ],
        expedite: {
          en: 'UK civil documents can look simple, but paper-apostille timing and courier return still matter. EGS treats urgency as workable only after confirming whether the receiving side will accept the exact certificate in hand.',
          zh: '英国民事文件表面上较简单，但纸质海牙和回寄时间仍会影响整体周期。EGS 只有在确认接收方接受现有证书版本后，才会判断是否适合加急。',
        },
      },
      {
        region: { en: 'Singapore-issued birth certificates', zh: '新加坡签发出生证明' },
        summary: {
          en: 'Singapore government-issued civil records are comparatively clean, but Singapore draws a clearer line than many clients expect between government-issued public documents and other documents.',
          zh: '新加坡政府签发的民事证书通常较清晰，但新加坡对“政府文件”和其他文件的路径区分，比很多客户预期得更严格。',
        },
        officialRequirements: [
          { en: 'MFA says SAL is the designated competent authority for apostille in Singapore', zh: '新加坡 MFA 明确 SAL 是新加坡的海牙签发机关' },
          { en: 'Singapore government-issued documents do not need prior notarisation before SAL apostille', zh: '新加坡政府签发文件在 SAL 办理海牙前通常不需要先做公证' },
          { en: 'Singapore missions state government birth certificates may be certified as true copies, while other non-government documents follow a different route', zh: '新加坡使领馆说明，政府签发出生证明可办理真实副本认证，非政府文件则走不同路径' },
        ],
        egsRequirements: [
          { en: 'Birth certificate copy or original for review', zh: '出生证明扫描件或原件供核验' },
          { en: 'Passport or NRIC details for identity matching where needed', zh: '必要时提供护照或 NRIC 信息用于身份匹配' },
          { en: 'Check early whether the receiving side wants the original certificate or a certified true copy', zh: '尽早确认接收方要原件还是认证副本' },
        ],
        expedite: {
          en: 'Singapore civil-document apostille is often operationally cleaner than private-document routes, but rush timing still depends on whether the document is already in the right format and whether original handling is required.',
          zh: '新加坡民事文件的海牙路径通常比私文书更顺，但能否加急仍取决于文件是否已经是正确格式，以及是否需要原件流转。',
        },
      },
      {
        region: { en: 'Canada-issued birth certificates', zh: '加拿大签发出生证明' },
        summary: {
          en: 'Canada now runs apostille through province-specific authorities for some provinces and Global Affairs Canada for others. The first review point is therefore the issuing province, not just the document title.',
          zh: '加拿大现在由部分省份自己签发海牙，其余由 Global Affairs Canada 处理，所以第一判断点不是文件名称，而是签发省份。',
        },
        officialRequirements: [
          { en: 'Canada says public documents such as birth certificates can be authenticated with an apostille certificate', zh: '加拿大官方说明，出生证明这类公共文件可以办理 apostille' },
          { en: 'Alberta, British Columbia, Ontario, Quebec and Saskatchewan issue apostilles for documents issued or notarised in their provinces; other provinces and territories go through Global Affairs Canada', zh: '阿尔伯塔、BC、安省、魁省和萨省负责本省签发或公证文件的 apostille，其他省区由 Global Affairs Canada 处理' },
          { en: 'Receiving-country requirements still need to be checked before deciding whether any extra step is needed', zh: '在判断是否还要额外步骤前，仍需先核验接收国要求' },
        ],
        egsRequirements: [
          { en: 'Birth certificate scan and issuing-province detail', zh: '出生证明扫描件及签发省份信息' },
          { en: 'Passport bio page', zh: '护照资料页' },
          { en: 'If the client only has an older extract or copy, review whether a fresher or different certificate format is needed', zh: '如果客户手里只是旧版摘要件或副本，要先判断是否需要换成更新或不同格式' },
        ],
        expedite: {
          en: 'Canadian civil-document timing cannot be treated as one national service window. EGS reviews the province first before discussing whether urgency is realistic.',
          zh: '加拿大民事文件的时效不能按全国统一窗口来理解。EGS 会先看签发省份，再判断加急是否现实。',
        },
      },
    ],
    relatedDocumentSlugs: ['marriage-certificate', 'police-check'],
    relatedIssuingSlugs: ['australia', 'canada', 'united-kingdom', 'singapore'],
    relatedDestinationSlugs: ['china', 'usa', 'canada', 'australia', 'singapore'],
  },
  {
    slug: 'marriage-certificate',
    name: { en: 'Marriage certificate', zh: '结婚证' },
    intro: {
      en: 'Entry page for marriage certificate use in family, residency, and consular matters.',
      zh: '面向结婚证在家庭、居留及领事事项中使用的搜索入口页。',
    },
    scope: {
      en: 'Marriage certificate work follows the issuing-country route, with Australia fully covered and other jurisdictions mainly apostille-led.',
      zh: '结婚证按签发地路线办理，澳洲可完整覆盖，其他司法区以海牙路径为主。',
    },
    helperTitle: {
      en: 'What usually matters for marriage-certificate work',
      zh: '结婚证办理时通常最关键的判断点',
    },
    helperText: {
      en: 'Marriage-certificate matters usually turn on certificate version, name consistency, and whether the destination expects a registry-issued original, a recent reissue, or a certified-copy route.',
      zh: '结婚证案件通常关键在于证书版本、姓名一致性，以及目的地要登记机构原件、近期补发件，还是认证副本路径。',
    },
    checkpoints: [
      { en: 'Check whether the receiving side needs a recent issue date or extract.', zh: '确认接收方是否要求近期补发件或摘要件。' },
      { en: 'Confirm translation and recipient-country wording needs.', zh: '确认翻译和目的地语言表述要求。' },
      { en: 'Proceed to intake after destination route is checked.', zh: '目的地路线核验后再进入受理。' },
    ],
    regionalRequirements: [
      {
        region: { en: 'Australia-issued marriage certificates', zh: '澳洲签发结婚证' },
        summary: {
          en: 'Australian marriage certificates are generally strong public-registry documents, but clients often mix official registry certificates with ceremonial certificates. That distinction matters immediately.',
          zh: '澳洲结婚证通常属于强公共登记文件，但客户经常把官方登记证和仪式纪念证混为一谈，这个区别一开始就很关键。',
        },
        officialRequirements: [
          { en: 'DFAT can legalise original Australian marriage certificates issued by births, deaths and marriages registries', zh: 'DFAT 可认证各州出生死亡婚姻登记机构签发的澳洲结婚证原件' },
          { en: 'DFAT excludes ceremonial and commemorative marriage certificates from that registry-document lane', zh: 'DFAT 明确将仪式性或纪念性结婚证排除在官方登记证路线之外' },
          { en: 'DFAT requires applicants to confirm with the overseas authority what exact format is needed', zh: 'DFAT 要求申请人先向海外接收方确认具体需要的文件格式' },
        ],
        egsRequirements: [
          { en: 'Clear scan or original marriage certificate for version screening', zh: '提供清晰扫描件或原件，用于确认结婚证版本' },
          { en: 'Passport bio page', zh: '护照资料页' },
          { en: 'If names differ across passports and marriage records, surface that at review stage', zh: '若护照与婚姻记录中的姓名不一致，应在预审阶段先提出' },
        ],
        expedite: {
          en: 'Australian marriage-certificate work can be efficient when the client already holds the registry-issued version. If the file starts from the wrong certificate version, urgency usually becomes secondary.',
          zh: '如果客户持有的是登记机构签发版本，澳洲结婚证路线通常可以较顺畅；如果一开始拿错版本，加急往往就不是主要问题了。',
        },
      },
      {
        region: { en: 'United Kingdom-issued marriage certificates', zh: '英国签发结婚证' },
        summary: {
          en: 'UK marriage certificates are public-registry documents, but they share the same practical issue as other UK civil records: the receiving side may insist on a paper apostille and a current issue version.',
          zh: '英国结婚证属于公共登记文件，但和其他英国民事证书一样，实务上常见的问题是接收方要求纸质海牙以及较新的签发版本。',
        },
        officialRequirements: [
          { en: 'GOV.UK says marriage certificates can be legalised as official UK public documents', zh: 'GOV.UK 明确结婚证可作为英国官方公共文件办理认证' },
          { en: 'Marriage certificates are not eligible for an e-Apostille', zh: '结婚证不能办理 e-Apostille' },
          { en: 'The receiving side should confirm whether the original document is needed', zh: '应先由接收方确认是否必须提交原件' },
        ],
        egsRequirements: [
          { en: 'Marriage certificate scan or original', zh: '结婚证扫描件或原件' },
          { en: 'Passport bio page for file screening', zh: '用于预审的护照资料页' },
          { en: 'If relationship-name consistency is an issue, review supporting identity records at the same time', zh: '如涉及姓名一致性问题，应同步核验辅助身份文件' },
        ],
        expedite: {
          en: 'The paper-apostille path means timing depends on both legalisation and document return, not only office handling. EGS therefore checks document version first before discussing speed.',
          zh: '纸质海牙意味着时效不仅受办公室处理影响，也受文件寄返影响。EGS 会先看文件版本，再讨论速度问题。',
        },
      },
      {
        region: { en: 'Singapore-issued marriage certificates', zh: '新加坡签发结婚证' },
        summary: {
          en: 'Singapore marriage certificates are comparatively clean government documents, but clients still need to separate true-copy certification questions from apostille questions.',
          zh: '新加坡结婚证通常是较清晰的政府文件，但客户仍需区分“真实副本认证”和“海牙认证”这两个不同问题。',
        },
        officialRequirements: [
          { en: 'MFA says SAL is the competent authority for Singapore apostilles', zh: 'MFA 明确 SAL 是新加坡海牙签发机关' },
          { en: 'Singapore missions say government-issued marriage certificates may be certified as true copies', zh: '新加坡使领馆说明，政府签发结婚证可办理真实副本认证' },
          { en: 'Government-issued documents follow a different path from non-government documents that need notarisation first', zh: '政府签发文件与需先公证的非政府文件路径不同' },
        ],
        egsRequirements: [
          { en: 'Marriage certificate copy or original', zh: '结婚证扫描件或原件' },
          { en: 'Passport or NRIC details where identity matching matters', zh: '如需匹配身份信息，提供护照或 NRIC 资料' },
          { en: 'Check early whether the receiving side wants original presentation, certified copy, or apostille only', zh: '尽早确认接收方要求原件展示、认证副本，还是只要海牙' },
        ],
        expedite: {
          en: 'Singapore civil-document handling is often cleaner than signed-document matters, but urgency still depends on whether the document is already in the right form for the destination.',
          zh: '新加坡民事证书通常比签字文件更清晰，但能否加急仍取决于文件当前形式是否已经满足目的地要求。',
        },
      },
      {
        region: { en: 'Canada-issued marriage certificates', zh: '加拿大签发结婚证' },
        summary: {
          en: 'For Canadian marriage certificates, the province matters immediately. The wrong assumption that all provinces move through the same apostille channel is a common intake mistake.',
          zh: '加拿大结婚证第一步就要看省份。把所有省都当成同一 apostille 渠道，是很常见的 intake 错误。',
        },
        officialRequirements: [
          { en: 'Canada says public documents such as marriage certificates can be authenticated with an apostille certificate', zh: '加拿大官方说明，结婚证这类公共文件可以办理 apostille' },
          { en: 'Some provinces issue apostilles directly, while other provinces and territories go through Global Affairs Canada', zh: '部分省份可直接签发 apostille，其余省区仍由 Global Affairs Canada 处理' },
          { en: 'Destination-country requirements still need checking before deciding whether the current certificate version is sufficient', zh: '在判断现有证书版本是否足够前，仍需先核验目的地国家要求' },
        ],
        egsRequirements: [
          { en: 'Marriage certificate scan and issuing-province detail', zh: '结婚证扫描件及签发省份信息' },
          { en: 'Passport bio page', zh: '护照资料页' },
          { en: 'If the certificate is old or issued in a short-form extract, review whether a fuller version is needed', zh: '若证书较旧或为简版摘要件，应先核验是否需要更完整版本' },
        ],
        expedite: {
          en: 'Canadian marriage-certificate timing should be discussed by province and route, not as one blanket service promise.',
          zh: '加拿大结婚证的时效应按省份和具体路线判断，不能按统一服务窗口承诺。',
        },
      },
    ],
    relatedDocumentSlugs: ['birth-certificate', 'power-of-attorney'],
    relatedIssuingSlugs: ['australia', 'canada', 'united-kingdom', 'singapore'],
    relatedDestinationSlugs: ['china', 'singapore', 'canada', 'usa', 'australia'],
  },
  {
    slug: 'degree-certificate',
    name: { en: 'Degree certificate', zh: '学历证书' },
    intro: {
      en: 'Entry page for degree certificates used in study, work, registration, and qualification matters.',
      zh: '面向学历证书在留学、工作、注册及资质事项中使用的搜索入口页。',
    },
    scope: {
      en: 'Degree certificate work is usually route-driven by issuer and destination, with Australia fully covered and other jurisdictions mainly apostille-led.',
      zh: '学历证书按签发地和目的地路线办理，澳洲可完整覆盖，其他司法区以海牙路径为主。',
    },
    checkpoints: [
      { en: 'Check whether transcript or supporting documents are also needed.', zh: '确认是否还需要成绩单或补充材料。' },
      { en: 'Confirm destination institution wording and translation needs.', zh: '确认接收机构表述和翻译要求。' },
      { en: 'Move to intake after route and document set are confirmed.', zh: '路线及材料清单确认后进入受理。' },
    ],
    regionalRequirements: [
      {
        region: { en: 'Australia-issued degree certificates', zh: '澳洲签发学历证书' },
        summary: {
          en: 'Australian tertiary documents can be legalised directly if they are original university documents, but the verification standard is stricter for copy routes than many clients realise.',
          zh: '澳洲高等教育文件如果是学校原件，通常可直接办理认证；但如果走副本路线，核验标准比很多客户想象得更严格。',
        },
        officialRequirements: [
          { en: 'DFAT can legalise original Australian tertiary documents issued by universities', zh: 'DFAT 可认证澳洲大学签发的高等教育原始文件' },
          { en: 'For notarised copies, the notary must verify the original record with the issuing institution; a simple “true copy” statement is not enough', zh: '对于公证副本，公证人必须向签发院校核验原始记录，单纯写“true copy”并不足够' },
          { en: 'If the client does not want the original degree marked, a notarised copy can be used instead', zh: '如客户不想让原始学历证书被附页，可改走公证副本路径' },
        ],
        egsRequirements: [
          { en: 'Degree certificate scan or original sufficient to confirm award details', zh: '可确认授予信息的学历证书扫描件或原件' },
          { en: 'Passport bio page', zh: '护照资料页' },
          { en: 'If transcript or graduation evidence may also be needed, review the full academic set early', zh: '如可能还需成绩单或毕业证明，应尽早核验完整学术材料组合' },
        ],
        commonExamples: [
          { en: 'Degree certificate / testamur / graduation certificate', zh: '毕业证 / 学位证 / testamur' },
          { en: 'Academic transcript', zh: '学校成绩单' },
          { en: 'Letter of completion / graduation letter', zh: '完成证明 / 毕业证明' },
          { en: 'Enrollment letter / student status letter', zh: '在读证明 / 学生状态证明' },
          { en: 'Offer letter / admission letter', zh: '录取通知 / admission letter' },
        ],
        expedite: {
          en: 'Australian academic routes can be workable where the university-issued document is already clean. If institution verification or supporting evidence still needs to be assembled, urgency becomes less reliable.',
          zh: '如果学校签发文件本身已经清晰，澳洲学历路线通常可执行；但如果还要补院校核验或辅助证明，加急就不那么可靠。',
        },
      },
      {
        region: { en: 'United Kingdom-issued degree certificates', zh: '英国签发学历证书' },
        summary: {
          en: 'UK qualification documents often need an upstream certification step before legalisation. The main professional judgment is whether the receiving side will accept a solicitor/notary-certified academic copy.',
          zh: '英国学历文件在认证前往往需要先做上游认证。专业判断点在于接收方是否接受经律师或公证人认证的学历副本。',
        },
        officialRequirements: [
          { en: 'GOV.UK says qualification certificates can be legalised if certified by a UK public official such as a notary or solicitor', zh: 'GOV.UK 明确学历证书这类文件，如经英国公证人或律师认证，可办理 legalisation' },
          { en: 'Applicants should check with the receiving side whether the original or certified copy is required', zh: '申请前应先确认接收方要求原件还是认证副本' },
          { en: 'Where an e-Apostille is available, the document must be an electronically signed PDF from the certifying professional', zh: '如可使用 e-Apostille，文件必须是由认证专业人士电子签署的 PDF' },
        ],
        egsRequirements: [
          { en: 'Degree certificate scan and any transcript or award support', zh: '学历证书扫描件及必要的成绩单或授予辅助证明' },
          { en: 'Passport bio page', zh: '护照资料页' },
          { en: 'Confirm whether the receiving institution wants transcript, degree only, or both', zh: '先确认接收机构要成绩单、学位证，还是两者都要' },
        ],
        commonExamples: [
          { en: 'Degree certificate / diploma', zh: '学位证 / 毕业证 / diploma' },
          { en: 'Academic transcript', zh: '学校成绩单' },
          { en: 'Letter of completion / award confirmation', zh: '完成证明 / 授予确认函' },
          { en: 'Enrollment letter where still studying', zh: '在读阶段的 enrollment letter / 在读证明' },
          { en: 'Offer letter where the receiving side asks for admission proof', zh: '如接收方要求，可包括录取通知 / offer letter' },
        ],
        expedite: {
          en: 'UK academic routes can move well when the certification format is settled early. If the client still needs to source the right academic pack, speed should not be promised too early.',
          zh: '如果认证格式早早确定，英国学历路线通常可以推进得不错；但若客户还在补正确的学术材料组合，就不宜过早承诺时效。',
        },
      },
      {
        region: { en: 'Singapore-issued degree certificates', zh: '新加坡签发学历证书' },
        summary: {
          en: 'Singapore educational documents are usually not treated the same way as government-issued civil records. The upstream question is whether they first need notarisation or certification by the appropriate body before SAL apostille.',
          zh: '新加坡教育文件通常不能简单按政府民事证书同样处理。上游关键点在于：在 SAL 办理海牙前，是否要先做公证或由适当机构出证。',
        },
        officialRequirements: [
          { en: 'MFA says SAL is the competent authority for Singapore apostilles', zh: 'MFA 明确 SAL 是新加坡海牙签发机关' },
          { en: 'Singapore guidance distinguishes government-issued documents from other documents that may need notarisation first', zh: '新加坡官方说明明确区分政府签发文件和需先公证的其他文件' },
          { en: 'The receiving authority should be asked what exact academic format is required', zh: '应先向接收方确认需要的具体学历文件格式' },
        ],
        egsRequirements: [
          { en: 'Degree certificate scan plus any transcript or award proof available', zh: '学历证书扫描件及已持有的成绩单或授予证明' },
          { en: 'Passport or NRIC details where matching is required', zh: '如需匹配身份信息，提供护照或 NRIC 资料' },
          { en: 'Review whether the file should start from a certified copy, notarised document, or another institution-issued version', zh: '先判断该案应从认证副本、公证文件，还是其他院校签发版本起步' },
        ],
        commonExamples: [
          { en: 'Degree certificate / diploma', zh: '学位证 / diploma' },
          { en: 'Academic transcript', zh: '学校成绩单' },
          { en: 'Letter of completion or student status letter', zh: '完成证明 / 在读证明' },
          { en: 'Enrollment or matriculation letter', zh: 'enrollment / matriculation letter' },
          { en: 'Admission or offer letter for school-entry use', zh: '入学或录取通知' },
        ],
        expedite: {
          en: 'Educational files from Singapore can be clean, but speed depends on whether the upstream document form is already the correct one for apostille.',
          zh: '新加坡教育文件可以很清晰，但速度取决于上游文件形式是否已经适合直接办理海牙。',
        },
      },
      {
        region: { en: 'Canada-issued education documents', zh: '加拿大签发学历文件' },
        summary: {
          en: 'Canada treats education documents as apostille-eligible public documents, but operationally the issuing province and whether the file is original or notarised still shape the route.',
          zh: '加拿大将学历文件列为可办理 apostille 的公共文件，但在实际操作中，签发省份以及文件是原件还是公证件，仍然决定路线。',
        },
        officialRequirements: [
          { en: 'Canada says education documents can be authenticated with an apostille certificate', zh: '加拿大官方说明，学历文件可以办理 apostille' },
          { en: 'Certain provinces issue apostilles directly, while others still route through Global Affairs Canada', zh: '部分省份直接签发 apostille，其余仍由 Global Affairs Canada 处理' },
          { en: 'Notarised documents are also within the apostille framework', zh: '经公证的文件也可以进入 apostille 路线' },
        ],
        egsRequirements: [
          { en: 'Degree certificate scan and province detail', zh: '学历证书扫描件及签发省份信息' },
          { en: 'Passport bio page', zh: '护照资料页' },
          { en: 'If transcript, letter of completion, or other school proof is part of the filing, review it together as one set', zh: '如同时涉及成绩单、完成证明等院校材料，应整组核验' },
        ],
        commonExamples: [
          { en: 'Degree certificate / diploma', zh: '学位证 / 毕业证' },
          { en: 'Academic transcript', zh: '学校成绩单' },
          { en: 'Letter of completion / confirmation of studies', zh: '完成证明 / 学业确认函' },
          { en: 'Enrollment verification / student status letter', zh: '在读证明 / 学籍证明' },
          { en: 'Offer letter or admission record where relevant', zh: '录取通知或入学记录（如适用）' },
        ],
        expedite: {
          en: 'For Canadian education documents, the province and document form matter more to timing than the broad label “degree certificate”. EGS screens those first before discussing urgency.',
          zh: '对于加拿大学历文件，时效更多取决于省份和文件形式，而不是“学历证书”这个大类名称。EGS 会先看这些，再讨论加急。',
        },
      },
    ],
    institutionReferences: [
      {
        region: { en: 'Australia', zh: '澳洲' },
        schools: [
          { en: 'University of Melbourne (UniMelb)', zh: '墨尔本大学（UniMelb）' },
          { en: 'University of Sydney (USYD)', zh: '悉尼大学（USYD）' },
          { en: 'University of New South Wales (UNSW)', zh: '新南威尔士大学（UNSW）' },
          { en: 'Monash University (Monash)', zh: '莫纳什大学（Monash）' },
          { en: 'University of Queensland (UQ)', zh: '昆士兰大学（UQ）' },
          { en: 'Australian National University (ANU)', zh: '澳大利亚国立大学（ANU）' },
          { en: 'University of Western Australia (UWA)', zh: '西澳大学（UWA）' },
          { en: 'University of Adelaide (UoA)', zh: '阿德莱德大学（UoA）' },
          { en: 'University of Technology Sydney (UTS)', zh: '悉尼科技大学（UTS）' },
          { en: 'Macquarie University (MQ)', zh: '麦考瑞大学（MQ）' },
          { en: 'RMIT University (RMIT)', zh: '皇家墨尔本理工大学（RMIT）' },
          { en: 'Deakin University (Deakin)', zh: '迪肯大学（Deakin）' },
        ],
        note: {
          en: 'Use the official issuing name shown on the certificate or transcript. Acronyms help with search and enquiry matching, but the file should still follow the institution’s formal wording.',
          zh: '应以证书或成绩单上的正式校名为准。学校简称可用于搜索和咨询识别，但提交文件时仍应按院校正式名称表述。',
        },
      },
      {
        region: { en: 'United Kingdom', zh: '英国' },
        schools: [
          { en: 'University of Oxford (Oxford)', zh: '牛津大学（Oxford）' },
          { en: 'University of Cambridge (Cambridge)', zh: '剑桥大学（Cambridge）' },
          { en: 'Imperial College London (Imperial)', zh: '帝国理工学院（Imperial）' },
          { en: 'University College London (UCL)', zh: '伦敦大学学院（UCL）' },
          { en: 'London School of Economics and Political Science (LSE)', zh: '伦敦政治经济学院（LSE）' },
          { en: "King's College London (KCL)", zh: '伦敦国王学院（KCL）' },
          { en: 'University of Edinburgh (Edinburgh)', zh: '爱丁堡大学（Edinburgh）' },
          { en: 'University of Manchester (Manchester)', zh: '曼彻斯特大学（Manchester）' },
          { en: 'University of Bristol (Bristol)', zh: '布里斯托大学（Bristol）' },
          { en: 'University of Warwick (Warwick)', zh: '华威大学（Warwick）' },
        ],
      },
      {
        region: { en: 'Singapore / Canada / United States', zh: '新加坡 / 加拿大 / 美国' },
        schools: [
          { en: 'National University of Singapore (NUS)', zh: '新加坡国立大学（NUS）' },
          { en: 'Nanyang Technological University (NTU)', zh: '南洋理工大学（NTU）' },
          { en: 'Singapore Management University (SMU)', zh: '新加坡管理大学（SMU）' },
          { en: 'Singapore University of Technology and Design (SUTD)', zh: '新加坡科技设计大学（SUTD）' },
          { en: 'Singapore Institute of Technology (SIT)', zh: '新加坡理工大学（SIT）' },
          { en: 'Singapore University of Social Sciences (SUSS)', zh: '新加坡社科大学（SUSS）' },
          { en: 'University of Toronto (U of T)', zh: '多伦多大学（U of T）' },
          { en: 'University of British Columbia (UBC)', zh: '英属哥伦比亚大学（UBC）' },
          { en: 'McGill University (McGill)', zh: '麦吉尔大学（McGill）' },
          { en: 'University of Waterloo (Waterloo)', zh: '滑铁卢大学（Waterloo）' },
          { en: 'University of California, Los Angeles (UCLA)', zh: '加州大学洛杉矶分校（UCLA）' },
          { en: 'New York University (NYU)', zh: '纽约大学（NYU）' },
          { en: 'University of Southern California (USC)', zh: '南加州大学（USC）' },
          { en: 'Columbia University (Columbia)', zh: '哥伦比亚大学（Columbia）' },
          { en: 'Harvard University (Harvard)', zh: '哈佛大学（Harvard）' },
          { en: 'Stanford University (Stanford)', zh: '斯坦福大学（Stanford）' },
        ],
      },
    ],
    relatedDocumentSlugs: ['police-check', 'company-documents'],
    relatedIssuingSlugs: ['australia', 'canada', 'singapore', 'united-kingdom'],
    relatedDestinationSlugs: ['singapore', 'china', 'usa', 'canada', 'australia'],
  },
  {
    slug: 'academic-transcript',
    name: { en: 'Academic transcript', zh: '成绩单' },
    intro: {
      en: 'Entry page for academic transcripts used in school admission, licensing, employment, immigration, and qualification reviews.',
      zh: '面向成绩单在升学、执照、就业、移民及资质审核中使用的搜索入口页。',
    },
    scope: {
      en: 'Transcript work usually sits inside the wider academic-document route, but receiving institutions often review transcripts more strictly than degree certificates.',
      zh: '成绩单通常属于更大的学术文件路线，但很多接收机构对成绩单的核验会比毕业证更严格。',
    },
    checkpoints: [
      { en: 'Check whether the receiving side needs the transcript only or a wider academic pack.', zh: '先确认接收方只要成绩单，还是要更完整的学术材料组合。' },
      { en: 'Confirm whether original school issue, certified copy, or notarised copy is required.', zh: '确认需要学校原件、认证副本还是公证副本。' },
      { en: 'Use intake after the school format and destination route are clear.', zh: '学校文件格式和目的地路线明确后再进入受理。' },
    ],
    regionalRequirements: [
      {
        region: { en: 'Australia-issued transcripts', zh: '澳洲签发成绩单' },
        summary: {
          en: 'Australian transcripts are often more useful than degree certificates in real filings, but only if the issuing format is stable and the transcript matches the award record.',
          zh: '在很多实际申请里，澳洲成绩单比毕业证更关键，但前提是签发格式稳定，且与学位记录一致。',
        },
        officialRequirements: [
          { en: 'DFAT can legalise original Australian tertiary documents issued by universities', zh: 'DFAT 可认证澳洲大学签发的原始高等教育文件' },
          { en: 'For copy routes, the certifying notary must verify the record with the issuing institution', zh: '如走副本路径，认证公证人必须向签发院校核验记录' },
          { en: 'Applicants should still check what exact transcript format the receiving side accepts', zh: '申请前仍需确认接收方接受哪一种成绩单格式' },
        ],
        egsRequirements: [
          { en: 'Full transcript scan showing issuing details and page count', zh: '提供能看清签发信息和页数的完整成绩单扫描件' },
          { en: 'Passport bio page', zh: '护照资料页' },
          { en: 'If the degree certificate and transcript are both required, review them together as one academic file', zh: '如毕业证和成绩单都要提交，应整组作为一个学术文件包核验' },
        ],
        commonExamples: [
          { en: 'Official academic transcript', zh: '官方学校成绩单' },
          { en: 'Record of results', zh: '成绩记录 / record of results' },
          { en: 'AHEGS or academic statement where relevant', zh: 'AHEGS 或相关学术说明文件' },
        ],
        expedite: {
          en: 'Transcript routes can move well when the university-issued version is already available. If the client still needs a fresh transcript issue, urgency becomes less predictable.',
          zh: '如果客户已经有学校签发的正确成绩单，路线通常可以推进较顺；如仍需补开新版成绩单，时效就会更难预估。',
        },
      },
      {
        region: { en: 'United Kingdom-issued transcripts', zh: '英国签发成绩单' },
        summary: {
          en: 'UK transcripts often need upstream certification before legalisation. The practical question is whether the receiving side accepts a certified academic copy or insists on an institution-issued form.',
          zh: '英国成绩单在认证前通常需要先做上游认证。实务重点是接收方接受经认证的学术副本，还是必须由学校直接签发。',
        },
        officialRequirements: [
          { en: 'Qualification-related documents can be legalised once certified by an appropriate UK public official', zh: '学历相关文件如经合适的英国专业人士认证，可办理 legalisation' },
          { en: 'Applicants should confirm whether the receiving side wants an institution-issued transcript or a certified copy', zh: '申请前应确认接收方要学校原始成绩单还是认证副本' },
          { en: 'Where e-Apostille is used, it must meet the electronic-signature requirement of the legalisation system', zh: '如使用 e-Apostille，必须符合 legalisation 系统的电子签署要求' },
        ],
        egsRequirements: [
          { en: 'Transcript scan and any supporting award evidence', zh: '成绩单扫描件及必要的授予辅助证明' },
          { en: 'Passport bio page', zh: '护照资料页' },
          { en: 'Check whether module names, marks, and award details need to be aligned with other academic documents', zh: '先核验课程名、分数和授予信息是否需与其他学术文件对齐' },
        ],
        commonExamples: [
          { en: 'Academic transcript', zh: '学校成绩单' },
          { en: 'HEAR or academic record', zh: 'HEAR / academic record' },
          { en: 'Module results statement', zh: '课程成绩单 / module results statement' },
        ],
        expedite: {
          en: 'Speed depends more on whether the transcript form is already accepted than on the country route itself.',
          zh: '能否较快推进，更多取决于成绩单形式是否已被接收方接受，而不是国家路线本身。',
        },
      },
    ],
    institutionReferences: [
      {
        region: { en: 'Common transcript issuers', zh: '常见成绩单签发院校' },
        schools: [
          { en: 'University of Melbourne (UniMelb)', zh: '墨尔本大学（UniMelb）' },
          { en: 'University of Sydney (USYD)', zh: '悉尼大学（USYD）' },
          { en: 'University of New South Wales (UNSW)', zh: '新南威尔士大学（UNSW）' },
          { en: 'Monash University (Monash)', zh: '莫纳什大学（Monash）' },
          { en: 'University of Queensland (UQ)', zh: '昆士兰大学（UQ）' },
          { en: 'Australian National University (ANU)', zh: '澳大利亚国立大学（ANU）' },
          { en: 'University of Technology Sydney (UTS)', zh: '悉尼科技大学（UTS）' },
          { en: 'RMIT University (RMIT)', zh: '皇家墨尔本理工大学（RMIT）' },
          { en: 'University College London (UCL)', zh: '伦敦大学学院（UCL）' },
          { en: "King's College London (KCL)", zh: '伦敦国王学院（KCL）' },
          { en: 'National University of Singapore (NUS)', zh: '新加坡国立大学（NUS）' },
          { en: 'Nanyang Technological University (NTU)', zh: '南洋理工大学（NTU）' },
          { en: 'University of Toronto (U of T)', zh: '多伦多大学（U of T）' },
        ],
        note: {
          en: 'For transcripts, the school abbreviation is common in enquiries, but the safer route review point is whether the transcript is institution-issued, complete, and consistent with the award record.',
          zh: '成绩单咨询里常出现学校简称，但更关键的预审点仍是：文件是否由院校正式签发、是否完整，以及是否与授予记录一致。',
        },
      },
    ],
    relatedDocumentSlugs: ['degree-certificate', 'offer-letter'],
    relatedIssuingSlugs: ['australia', 'united-kingdom', 'singapore'],
    relatedDestinationSlugs: ['singapore', 'china', 'usa', 'australia'],
  },
  {
    slug: 'enrollment-letter',
    name: { en: 'Enrollment letter', zh: '在读证明' },
    intro: {
      en: 'Entry page for enrollment letters, student status letters, and school-issued proof of current study used overseas.',
      zh: '面向在读证明、学生状态证明及学校签发在学证明赴海外使用的搜索入口页。',
    },
    scope: {
      en: 'Enrollment-letter work is usually simpler than degree work, but it is highly format-sensitive because receiving institutions often want a current issue and specific school wording.',
      zh: '在读证明通常比毕业证路线简单，但对格式非常敏感，因为接收方常要求近期签发件和特定学校表述。',
    },
    checkpoints: [
      { en: 'Check whether the receiving side wants a current student-status letter rather than a historical record.', zh: '先确认接收方要的是当前在读证明，而不是历史记录。' },
      { en: 'Confirm whether the school must issue the letter directly or whether a certified copy route is acceptable.', zh: '确认必须由学校直接出信，还是可以接受认证副本。' },
      { en: 'Use intake after the wording and destination route are clear.', zh: '表述格式和目的地路线明确后再进入受理。' },
    ],
    regionalRequirements: [
      {
        region: { en: 'Australia-issued enrollment letters', zh: '澳洲签发在读证明' },
        summary: {
          en: 'Australia-issued student-status letters are commercially useful for Singapore, visa, and education filings, but they are only strong when the letter is current and clearly issued by the institution.',
          zh: '澳洲学校签发的在读证明在新加坡、签证和升学类用途上很常见，但只有在文件是近期签发且来源清楚时才真正有力。',
        },
        officialRequirements: [
          { en: 'Institution-issued educational documents can move through legalisation if the document form is acceptable or properly certified', zh: '院校签发教育文件如文件形式合格或已被正确认证，可进入认证路径' },
          { en: 'The receiving side should confirm what student-status wording is needed', zh: '应先由接收方确认需要哪种在读证明表述' },
          { en: 'If the original letter should not be marked, a suitable certified-copy path may need review', zh: '如不希望原始在读证明被附页，可能需改走合适的认证副本路径' },
        ],
        egsRequirements: [
          { en: 'Current enrollment letter or student-status letter scan', zh: '近期签发的在读证明或学生状态证明扫描件' },
          { en: 'Passport bio page', zh: '护照资料页' },
          { en: 'Check early whether the destination needs transcript or offer letter together with the enrollment letter', zh: '尽早确认目的地是否同时需要成绩单或录取通知' },
        ],
        commonExamples: [
          { en: 'Enrollment letter', zh: '在读证明 / enrollment letter' },
          { en: 'Student status letter', zh: '学生状态证明' },
          { en: 'Proof of enrollment', zh: '在学证明 / proof of enrollment' },
        ],
        expedite: {
          en: 'This route can be workable if the letter is already issued and current. If the school still needs to reissue the letter, timing becomes less controllable.',
          zh: '如果学校已经出具了近期有效的在读证明，这类路线通常可行；如果还需要学校重开，时效就会更难控制。',
        },
      },
    ],
    institutionReferences: [
      {
        region: { en: 'Common university references', zh: '常见大学简称' },
        schools: [
          { en: 'University of Melbourne (UniMelb)', zh: '墨尔本大学（UniMelb）' },
          { en: 'University of Sydney (USYD)', zh: '悉尼大学（USYD）' },
          { en: 'University of New South Wales (UNSW)', zh: '新南威尔士大学（UNSW）' },
          { en: 'Monash University (Monash)', zh: '莫纳什大学（Monash）' },
          { en: 'University of Queensland (UQ)', zh: '昆士兰大学（UQ）' },
          { en: 'Australian National University (ANU)', zh: '澳大利亚国立大学（ANU）' },
          { en: 'University of Technology Sydney (UTS)', zh: '悉尼科技大学（UTS）' },
          { en: 'Macquarie University (MQ)', zh: '麦考瑞大学（MQ）' },
          { en: 'National University of Singapore (NUS)', zh: '新加坡国立大学（NUS）' },
          { en: 'Nanyang Technological University (NTU)', zh: '南洋理工大学（NTU）' },
          { en: 'Singapore Management University (SMU)', zh: '新加坡管理大学（SMU）' },
          { en: 'Singapore University of Technology and Design (SUTD)', zh: '新加坡科技设计大学（SUTD）' },
        ],
        note: {
          en: 'For current-study letters, the exact institution wording and issue date usually matter more than the school brand itself.',
          zh: '在读证明类文件里，真正决定可办性的通常是学校正式表述和签发日期，而不是学校品牌本身。',
        },
      },
    ],
    relatedDocumentSlugs: ['degree-certificate', 'academic-transcript'],
    relatedIssuingSlugs: ['australia', 'singapore', 'united-kingdom'],
    relatedDestinationSlugs: ['singapore', 'china', 'australia'],
  },
  {
    slug: 'offer-letter',
    name: { en: 'Offer letter', zh: '录取通知' },
    intro: {
      en: 'Entry page for offer letters, admission letters, and school-issued acceptance notices used overseas.',
      zh: '面向录取通知、admission letter 及学校签发录取文件赴海外使用的搜索入口页。',
    },
    scope: {
      en: 'Offer-letter work is highly use-specific. Some receiving sides treat it as simple school evidence, while others require clearer proof of issuance and current status.',
      zh: '录取通知的使用非常依赖具体场景。有些接收方把它当成普通学校证明，有些则会要求更明确的签发来源和当前状态。',
    },
    checkpoints: [
      { en: 'Check whether the receiving side wants an offer letter, a confirmed enrollment letter, or both.', zh: '先确认接收方要的是录取通知、确认入学证明，还是两者都要。' },
      { en: 'Confirm whether the letter must be school-issued in current form.', zh: '确认是否必须由学校以当前格式重新签发。' },
      { en: 'Use intake after the school wording and destination route are confirmed.', zh: '学校表述和目的地路线确认后再进入受理。' },
    ],
    regionalRequirements: [
      {
        region: { en: 'Australia-issued offer letters', zh: '澳洲签发录取通知' },
        summary: {
          en: 'Australian offer letters are common in student, visa, and registration contexts, but they are weaker than completed academic records unless the receiving side expressly accepts them.',
          zh: '澳洲录取通知在学生、签证和注册场景里很常见，但除非接收方明确接受，否则它的文件强度通常不如已完成的学术记录。',
        },
        officialRequirements: [
          { en: 'Institution-issued educational letters should still be checked against the receiving side’s exact document requirement', zh: '学校签发的教育类函件仍需先对照接收方的精确文件要求' },
          { en: 'If the school letter is not a standard public document, a certified or notarised path may need review first', zh: '如学校函件并非标准公共文件，可能需先评估认证或公证路径' },
          { en: 'A current and complete issued version is usually more workable than a draft or conditional notice', zh: '完整、当前签发的版本通常比草稿或条件性通知更适合办理' },
        ],
        egsRequirements: [
          { en: 'Final issued offer letter or admission letter scan', zh: '正式签发的录取通知或 admission letter 扫描件' },
          { en: 'Passport bio page', zh: '护照资料页' },
          { en: 'Check whether the destination also needs enrollment or transcript support', zh: '先确认目的地是否还需要在读证明或成绩单配套' },
        ],
        commonExamples: [
          { en: 'Offer letter', zh: '录取通知 / offer letter' },
          { en: 'Admission letter', zh: 'admission letter / 入学通知' },
          { en: 'Confirmation of place or confirmation of enrolment support letter', zh: '入学确认函 / confirmation of place' },
        ],
        expedite: {
          en: 'If the final offer letter is already issued and accepted by the receiving side, handling can be relatively straightforward. If the client is still relying on draft or provisional wording, urgency should be treated carefully.',
          zh: '如果正式录取通知已经签发且接收方明确接受，路线通常较直；如果客户仍在使用草稿或临时版本，就应谨慎评估时效。',
        },
      },
    ],
    institutionReferences: [
      {
        region: { en: 'Common university references', zh: '常见大学简称' },
        schools: [
          { en: 'University of Melbourne (UniMelb)', zh: '墨尔本大学（UniMelb）' },
          { en: 'University of Sydney (USYD)', zh: '悉尼大学（USYD）' },
          { en: 'University of New South Wales (UNSW)', zh: '新南威尔士大学（UNSW）' },
          { en: 'Monash University (Monash)', zh: '莫纳什大学（Monash）' },
          { en: 'University of Queensland (UQ)', zh: '昆士兰大学（UQ）' },
          { en: 'Australian National University (ANU)', zh: '澳大利亚国立大学（ANU）' },
          { en: 'University of Technology Sydney (UTS)', zh: '悉尼科技大学（UTS）' },
          { en: 'RMIT University (RMIT)', zh: '皇家墨尔本理工大学（RMIT）' },
          { en: 'University College London (UCL)', zh: '伦敦大学学院（UCL）' },
          { en: "King's College London (KCL)", zh: '伦敦国王学院（KCL）' },
          { en: 'National University of Singapore (NUS)', zh: '新加坡国立大学（NUS）' },
          { en: 'Nanyang Technological University (NTU)', zh: '南洋理工大学（NTU）' },
          { en: 'University of Toronto (U of T)', zh: '多伦多大学（U of T）' },
        ],
        note: {
          en: 'Offer-letter enquiries often use school abbreviations, but intake still needs the final issued document version and the exact receiving-side requirement.',
          zh: '录取通知咨询里经常只写学校简称，但正式受理仍要看最终签发版本，以及接收方到底要哪一种学校文件。',
        },
      },
    ],
    relatedDocumentSlugs: ['enrollment-letter', 'degree-certificate'],
    relatedIssuingSlugs: ['australia', 'singapore', 'united-kingdom'],
    relatedDestinationSlugs: ['singapore', 'china', 'australia'],
  },
  {
    slug: 'police-check',
    name: { en: 'Police check', zh: '无犯罪记录' },
    intro: {
      en: 'Entry page for police checks used in immigration, work permit, and residency cases.',
      zh: '面向无犯罪记录在移民、工签及居留场景中使用的搜索入口页。',
    },
    scope: {
      en: 'Police check work is route-sensitive and strongest for Australia-issued records, with other jurisdictions mainly apostille-led.',
      zh: '无犯罪记录对路径要求较高，澳洲签发文件覆盖最完整，其他司法区以海牙路径为主。',
    },
    checkpoints: [
      { en: 'Check whether fingerprint or non-fingerprint version is expected.', zh: '确认是否要求有指纹或无指纹版本。' },
      { en: 'Confirm validity window with the receiving side.', zh: '与接收方确认有效期窗口。' },
      { en: 'Use intake after pathway and issue date are checked.', zh: '路径和出具日期确认后再进入受理。' },
    ],
    regionalRequirements: [
      {
        region: { en: 'Australia-issued police checks', zh: '澳洲签发无犯罪记录' },
        summary: {
          en: 'Usually handled inside the Australian main lane. This is the strongest and most commercially stable police-check route, but the file still needs review for issue date, identity setup, and receiving-side validity window.',
          zh: '通常属于澳洲主线内处理，是最稳定、最成熟的无犯罪路线之一，但仍需先核验出具日期、身份材料组合及接收方有效期窗口。',
        },
        officialRequirements: [
          { en: 'Australian Federal Police requires proof of identity documents totalling at least 100 points', zh: '澳洲联邦警察要求提交累计至少 100 分的身份材料' },
          { en: 'If fingerprints are required, the original fingerprint form must be posted with the application', zh: '如需指纹核验，原始指纹表必须随申请邮寄提交' },
          { en: 'Applicants must state the purpose of the police check, and the purpose can affect the result issued', zh: '申请时需要写明用途，且用途可能影响最终出具结果' },
        ],
        egsRequirements: [
          { en: 'Passport and identity material ready for pre-screening', zh: '先准备护照及身份材料供预审' },
          { en: 'Driver licence, or one supporting item such as visa, Medicare card, utility bill, or bank statement', zh: '驾照，或签证、Medicare 卡、水电账单、银行对账单等辅助材料之一' },
          { en: 'Current police-check variant and issue date should be identified before the route is fixed', zh: '在锁定路线前先确认当前无犯罪记录的具体版本和出具日期' },
        ],
        expedite: {
          en: 'Officially, AFP says most online non-fingerprint certificates are completed within days, while fingerprint checks take 15 to 30 business days. EGS can discuss faster handling on some Australian-side steps, but only after checking whether the file is non-fingerprint or fingerprint-based.',
          zh: '官方口径里，AFP 表示多数线上非指纹申请可在数日内完成，而指纹核验通常需 15 至 30 个工作日。EGS 可评估部分澳洲侧加急安排，但必须先判断案件属于非指纹还是指纹路线。',
        },
        note: {
          en: 'Best suited where the receiving side is clear and the client is not mixing different police-check variants.',
          zh: '最适合接收方要求清楚、且客户没有混用不同无犯罪版本的情形。',
        },
      },
      {
        region: { en: 'Canada-issued police checks', zh: '加拿大签发无犯罪记录' },
        summary: {
          en: 'Canada police-check work often splits between RCMP fingerprint files and non-fingerprint local clearances. The intake difference matters commercially because the material set and timing are not the same.',
          zh: '加拿大无犯罪通常分为 RCMP 指纹版和本地非指纹版，两者在材料和周期上差异明显，受理前必须先分流。',
        },
        officialRequirements: [
          { en: 'For Canadian immigration-related police certificates, fingerprints must be submitted electronically to the RCMP CCRTIS system', zh: '用于加拿大移民等官方用途时，指纹必须电子提交到 RCMP 的 CCRTIS 系统' },
          { en: 'Electronic fingerprint submission from outside Canada is not directly available; overseas ink fingerprints must be digitised by an accredited company within Canada', zh: '加拿大境外通常不能直接电子提交，海外墨印指纹需由加拿大境内认证机构转成电子格式再提交' },
          { en: 'Paper submissions are not processed for that RCMP route', zh: '该类 RCMP 路线不接受纸质直接提交' },
        ],
        egsRequirements: [
          { en: 'Two valid IDs should be ready before screening', zh: '预审前先准备两份有效身份证明' },
          { en: 'For RCMP routes, original notarised or officially stamped fingerprint card is usually the workable starting point', zh: 'RCMP 路线通常以原始公证指纹卡或机构盖章指纹卡作为可执行起点' },
          { en: 'For selected non-fingerprint routes, informed-consent scan and route purpose should be checked separately', zh: '部分非指纹路线要把知情同意文件和实际用途分开核验' },
        ],
        expedite: {
          en: 'Official timing depends heavily on whether the route is fingerprint-based and how the fingerprints reach the accredited Canadian channel. EGS treats non-fingerprint and RCMP fingerprint files as different products and does not present them as interchangeable rush options.',
          zh: '官方时效高度取决于是否为指纹路线，以及指纹如何进入加拿大认证通道。EGS 会把非指纹和 RCMP 指纹版当作不同产品处理，不会把它们包装成同一种可加急服务。',
        },
        note: {
          en: 'This route should be framed around the actual filing purpose, not just “Canada police clearance”.',
          zh: '这类案件应围绕实际提交用途判断，而不是只按“加拿大无犯罪”笼统处理。',
        },
      },
      {
        region: { en: 'United States-issued police checks', zh: '美国签发无犯罪记录' },
        summary: {
          en: 'US police-check work may involve a federal FBI route or a state-level route. Those are not interchangeable from a review perspective, especially where the receiving side expects a specific authority level.',
          zh: '美国无犯罪可能走联邦 FBI 路线，也可能走州级路线；从核验角度看两者并不能互相替代，尤其当接收方指定签发层级时。',
        },
        officialRequirements: [
          { en: 'FBI Identity History Summary requests are fingerprint-based; the FBI does not offer name checks for this route', zh: 'FBI Identity History Summary 属于指纹核验路线，FBI 不提供该路线下的纯姓名查询替代' },
          { en: 'Applicants may submit electronically or by mail, but a current fingerprint card is required', zh: '申请可线上或邮寄发起，但都需要当前有效的指纹卡' },
          { en: 'If fingerprints are repeatedly rejected, the FBI advises taking multiple sets, preferably with a fingerprint technician', zh: '如指纹反复被退回，FBI 建议重新采集多套指纹，且尽量由专业采集人员完成' },
        ],
        egsRequirements: [
          { en: 'Passport bio page', zh: '护照资料页' },
          { en: 'For FBI processing, original I-783 form and two original fingerprint cards are the practical baseline for many files', zh: '对于 FBI 路线，很多案件会以原始 I-783 表格和两张原始指纹卡作为实际起点' },
          { en: 'If the client is asking about “urgent”, first distinguish FBI route from state-level route', zh: '客户问到“加急”时，先区分是 FBI 路线还是州级路线' },
          { en: 'Some state-level routes can be lighter, but receiving-side acceptance still needs checking first', zh: '部分州级路线材料较轻，但仍要先确认接收方是否接受' },
        ],
        expedite: {
          en: 'The FBI says electronic requests are processed faster once the completed fingerprint card is received, but it does not treat federal and state products as the same workflow. EGS therefore screens the authority level first before discussing any rush expectation.',
          zh: 'FBI 官方说明是，在收到完整指纹卡后，电子申请通常会更快处理，但联邦和州级产品并不是同一流程。EGS 因此会先核验签发层级，再讨论任何加急预期。',
        },
        note: {
          en: 'Electronic issuance can simplify downstream handling, but only if the receiving side accepts that format.',
          zh: '电子版签发有时能简化后续处理，但前提仍是接收方接受该形式。',
        },
      },
      {
        region: { en: 'United Kingdom-issued police checks', zh: '英国签发无犯罪记录' },
        summary: {
          en: 'UK police certificate work is usually document-clean, but the file is only strong when the address proof, photo standard, and authorisation setup are all aligned at the outset.',
          zh: '英国无犯罪证书通常文件形态较清楚，但地址证明、照片规格和授权文件如果一开始没对齐，后续很容易拖慢。',
        },
        officialRequirements: [
          { en: 'GOV.UK directs applicants needing a UK police certificate for visa or emigration use to ACRO, with standard and premium service windows published there', zh: 'GOV.UK 明确将签证或移民用途的英国无犯罪证书申请导向 ACRO，并公开了标准和加急服务窗口' },
          { en: 'For legalisation, GOV.UK states that ACRO police certificates for England and Wales are not eligible for an e-Apostille', zh: '对于后续认证，GOV.UK 明确说明英格兰和威尔士的 ACRO 无犯罪证书不能使用电子海牙 e-Apostille' },
          { en: 'Applicants should confirm with the receiving side whether an original police certificate and paper apostille are required', zh: '申请前应先确认接收方是否要求无犯罪原件及纸质海牙认证' },
        ],
        egsRequirements: [
          { en: 'Police certificate application form or equivalent application setup', zh: '无犯罪申请表或同等申请资料' },
          { en: 'Current residential address proof', zh: '当前住址证明' },
          { en: 'Colour passport scan and compliant white-background photo', zh: '彩色护照扫描件及合规白底照片' },
          { en: 'Signed authorisation scan where representative handling is involved', zh: '如由代理协助，需准备签字授权扫描件' },
        ],
        expedite: {
          en: 'GOV.UK currently describes ACRO police certificate service windows as 20 days or 2 days. EGS still treats urgency as file-dependent, because weak address proof or missing authority paperwork can still stop the case from moving cleanly.',
          zh: 'GOV.UK 当前公开的 ACRO 无犯罪服务窗口为 20 天或 2 天，但 EGS 仍会按材料完整度判断，因为住址证明薄弱或授权文件缺失仍会拖住案件。',
        },
        note: {
          en: 'Professional presentation matters here: weak address proof or casual photo preparation is a common avoidable drag on the file.',
          zh: '这类案件很看重材料整齐度，住址证明薄弱或照片准备随意，都是常见的可避免拖延点。',
        },
      },
      {
        region: { en: 'Singapore-issued police checks', zh: '新加坡签发无犯罪记录' },
        summary: {
          en: 'Singapore police-certificate matters are usually more detail-sensitive than clients expect. The requesting-authority letter, fingerprint capture, and personal background information often decide whether the file is ready to move.',
          zh: '新加坡无犯罪比客户想象中更吃细节。接收机构要求函、指纹采集和背景信息完整度，往往决定案件是否能推进。',
        },
        officialRequirements: [
          { en: 'SPF requires documentary proof that the COC is required and the purpose of the COC', zh: '新加坡警方要求提交证明无犯罪证明确有需要及其用途的文件' },
          { en: 'Applicants who are not using Singpass but previously held a FIN must submit fingerprint impressions recorded by an authorised institution', zh: '无法使用 Singpass 但曾持有 FIN 的申请人，需要提交由授权机构采集的指纹' },
          { en: 'SPF currently issues the COC digitally and states full documentation is needed before approval', zh: 'SPF 当前以数字方式签发 COC，并明确要求材料完整后才会审批' },
        ],
        egsRequirements: [
          { en: 'Passport copy and Singapore pass copy, including prior FIN information where relevant', zh: '护照扫描件及新加坡准证扫描件，必要时连同历史 FIN 信息一并准备' },
          { en: 'White-background photo and usable fingerprint record where the route requires it', zh: '按路线准备白底照片及可用的指纹记录' },
          { en: 'Letter or screenshot from the requesting authority showing the certificate requirement', zh: '接收机构要求提供无犯罪证明的函件或截图' },
          { en: 'Personal background details such as address, purpose, family status, and prior residence or study history where requested', zh: '按要求提供住址、用途、家庭情况及过往居住或学习背景信息' },
        ],
        expedite: {
          en: 'SPF says processing runs about 7 to 14 days from receipt of a complete application. EGS treats any rush request cautiously because missing proof letters, FIN issues, or unusable fingerprints will usually matter more than office-side speed.',
          zh: 'SPF 官方写明，完整申请材料送达后通常处理约 7 至 14 天。EGS 对这类加急会比较谨慎，因为证明函、FIN 信息或指纹质量问题，往往比办公室端加速更关键。',
        },
        note: {
          en: 'This is a route where incomplete background answers make the file look weak very quickly.',
          zh: '这类路线里，背景信息回答不完整会很快让案件显得不扎实。',
        },
      },
    ],
    relatedDocumentSlugs: ['birth-certificate', 'degree-certificate'],
    relatedIssuingSlugs: ['australia', 'canada', 'usa', 'united-kingdom', 'singapore'],
    relatedDestinationSlugs: ['usa', 'united-kingdom', 'singapore', 'canada', 'china', 'uae'],
  },
  {
    slug: 'power-of-attorney',
    name: { en: 'Power of attorney', zh: '委托书' },
    intro: {
      en: 'Entry page for powers of attorney used in property, company, family, and representation matters.',
      zh: '面向委托书在房产、公司、家庭及授权事项中使用的搜索入口页。',
    },
    scope: {
      en: 'Power of attorney work often needs document execution review first, with Australia fully covered and other jurisdictions mainly apostille-led plus selected consular handling.',
      zh: '委托书通常先核验签署格式，澳洲可完整覆盖，其他司法区以海牙路径为主并可评估部分领馆路线。',
    },
    helperTitle: {
      en: 'What usually matters for power-of-attorney work',
      zh: '委托书办理时通常最关键的判断点',
    },
    helperText: {
      en: 'Power-of-attorney work almost always depends on execution format before country route. The file should first be screened for signing sequence, witnessing, notarisation, identity support, and destination wording.',
      zh: '委托书几乎总是先取决于签署形式，而不是国家路线。第一步应先核验签署顺序、见证、公证、身份配套以及目的地文本要求。',
    },
    checkpoints: [
      { en: 'Identify whether the receiving side wants simple witnessing, full notarisation, apostille after notarisation, or embassy legalisation after execution.', zh: '先确认接收方要求简单见证、完整公证、公证后海牙，还是签后使馆认证。' },
      { en: 'Check whether the signer must appear in person, sign in original form, or follow a specific witness / video-signing arrangement.', zh: '确认签署人是否必须本人到场、原件签署，或按特定见证 / 视频签署方式执行。' },
      { en: 'Proceed to intake only after the execution wording, identity support, and destination format are settled enough to screen properly.', zh: '只有在签署文本、身份配套和目的地格式要求足够明确后，再进入受理。' },
    ],
    regionalRequirements: [
      {
        region: { en: 'Australia-executed powers of attorney', zh: '在澳洲签署的委托书' },
        summary: {
          en: 'Australia is commercially strong for POA work, but private signed documents do not sit in the same lane as registry certificates. The notarial step is the real starting point.',
          zh: '澳洲在委托书业务上商业可操作性很强，但私文书和登记证书不是同一路线。真正的起点通常是公证步骤，而不是直接看海牙。',
        },
        officialRequirements: [
          { en: 'Smartraveller says private documents such as powers of attorney can be legalised once notarised by an Australian Notary Public', zh: 'Smartraveller 明确，委托书这类私文书需先由澳洲公证人公证后，才可进入认证路线' },
          { en: 'DFAT legalises the notary’s signature, stamp or seal on the document supplied', zh: 'DFAT 认证的是提交文件上公证人的签字、印章或钢印' },
          { en: 'DFAT says applicants must confirm with the overseas authority what type of legalisation or notarisation is actually required', zh: 'DFAT 明确要求申请人先向海外接收方确认究竟需要什么类型的公证或认证' },
        ],
        egsRequirements: [
          { en: 'Final execution version of the power of attorney', zh: '最终签署版本的委托书文本' },
          { en: 'Passport bio page of the signing party', zh: '签署人的护照资料页' },
          { en: 'If signing video, witness arrangement, or bilingual text is likely to matter, settle that before intake', zh: '如签字视频、见证安排或双语文本会影响路线，应在受理前先确认' },
        ],
        expedite: {
          en: 'POA matters are rarely good rush files until the execution format is final. EGS therefore treats drafting and signing review as a gate before discussing speed.',
          zh: '委托书在签署格式没有最终定下前，通常都不是理想的加急案件。EGS 会把文本和签署审查作为讨论时效前的门槛。',
        },
      },
      {
        region: { en: 'United Kingdom-executed powers of attorney', zh: '在英国签署的委托书' },
        summary: {
          en: 'UK POA work usually turns on certification quality rather than country complexity. The practical question is who signs, who certifies, and whether the receiving side wants a notary-led route.',
          zh: '英国委托书的关键通常不是国家复杂度，而是认证质量。实务上的核心是：谁签字、谁认证，以及接收方是否要求公证人路线。',
        },
        officialRequirements: [
          { en: 'GOV.UK says powers of attorney can be legalised if certified by a UK notary or solicitor', zh: 'GOV.UK 明确委托书如经英国公证人或律师认证，可办理 legalisation' },
          { en: 'Applicants should check if the receiving side needs the document signed by a particular professional, such as a notary or solicitor', zh: '应先确认接收方是否要求由特定专业人士签字，例如公证人或律师' },
          { en: 'If an e-Apostille is used, it requires an electronically signed PDF from the certifying professional', zh: '如使用 e-Apostille，必须是由认证专业人士电子签署的 PDF' },
        ],
        egsRequirements: [
          { en: 'Final execution text of the POA', zh: '委托书最终签署文本' },
          { en: 'Passport bio page for identity review', zh: '用于身份核验的护照资料页' },
          { en: 'Check before intake whether the receiving side insists on notary execution rather than a lighter certification route', zh: '在受理前先确认接收方是否坚持走公证人签署路线，而不是较轻的认证路径' },
        ],
        expedite: {
          en: 'UK signed-document work can move quickly if the certifying professional and execution format are already locked. It becomes much less rush-friendly when the format is still being negotiated.',
          zh: '如果认证专业人士和签署格式都已锁定，英国签字文件可以推进得较快；如果格式还在来回修改，就不适合谈加急。',
        },
      },
      {
        region: { en: 'Singapore-executed powers of attorney', zh: '在新加坡签署的委托书' },
        summary: {
          en: 'Singapore draws a practical distinction between documents that need witnessing and documents that need apostille. Clients often blur those into one step, but they are not the same.',
          zh: '新加坡对“见证签字”和“海牙认证”有很清晰的实务区分。很多客户会把两者当成一步，但实际上不是同一个问题。',
        },
        officialRequirements: [
          { en: 'Singapore missions say powers of attorney and similar documents should be brought completed but not signed for witnessing of signature', zh: '新加坡使领馆说明，委托书等文件应先填妥但不要预先签字，再到场办理见证签字' },
          { en: 'Valid identification documents must be shown when signature witnessing is required', zh: '如需见证签字，必须出示有效身份证件' },
          { en: 'For apostille in Singapore, SAL is the competent authority and upstream notarisation may still be needed depending on document type', zh: '在新加坡办理海牙时，SAL 是主管机关，但根据文件类型不同，上游仍可能需要先公证' },
        ],
        egsRequirements: [
          { en: 'Unsigned final POA text ready for execution review', zh: '准备好尚未签字的最终委托书文本以供执行审查' },
          { en: 'Passport or NRIC details', zh: '护照或 NRIC 信息' },
          { en: 'Check whether the matter needs in-person signing, video signing, or pure notarisation support before intake', zh: '在受理前先判断该案需要到场签字、视频签字，还是纯公证支持' },
        ],
        expedite: {
          en: 'Singapore POA work is usually constrained more by signing logistics than by downstream apostille speed. EGS screens the execution arrangement first.',
          zh: '新加坡委托书路线更多受制于签署安排，而不是后端海牙速度。EGS 会先核验执行方式。',
        },
      },
      {
        region: { en: 'United States-executed powers of attorney', zh: '在美国签署的委托书' },
        summary: {
          en: 'US POA work can look deceptively simple, but the route splits early between local notarisation, state-level apostille, and consular notarisation scenarios.',
          zh: '美国委托书表面看似简单，但路线很早就会分成地方公证、州级海牙以及领事见证等不同情形。',
        },
        officialRequirements: [
          { en: 'U.S. embassies and consulates say you must appear in person for notarial services and must not sign the document before the appointment', zh: '美国使领馆明确，办理领事公证必须本人到场，且不能在预约前提前签字' },
          { en: 'Some cases may require witnesses to appear in front of the consular officer', zh: '部分情形可能要求证人在领事官员面前一同出席' },
          { en: 'Travel.State.Gov says document preparation depends on whether the destination country uses apostille or authentication, and the certificate type should be checked first', zh: 'Travel.State.Gov 明确，文件准备方式取决于目的地使用 apostille 还是 authentication，因此要先确认证书类型' },
        ],
        egsRequirements: [
          { en: 'Unsigned final POA text', zh: '未签字的最终委托书文本' },
          { en: 'Passport bio page or government ID for the signer', zh: '签署人的护照资料页或政府身份证件' },
          { en: 'Confirm whether the route should start from U.S. local notary, state apostille, or U.S. consular notarisation logic', zh: '先确认该案应从美国本地公证、州级海牙，还是领事公证逻辑起步' },
        ],
        expedite: {
          en: 'US POA urgency depends first on signing logistics and authority level, not on a generic “POA apostille” promise.',
          zh: '美国委托书能否加急，首先取决于签署安排和签发层级，而不是一个泛泛的“委托书海牙”承诺。',
        },
      },
    ],
    relatedDocumentSlugs: ['marriage-certificate', 'company-documents'],
    relatedIssuingSlugs: ['australia', 'singapore', 'usa', 'united-kingdom'],
    relatedDestinationSlugs: ['china', 'singapore', 'usa', 'australia'],
  },
  {
    slug: 'company-documents',
    name: { en: 'Company documents', zh: '公司文件' },
    intro: {
      en: 'Entry page for company certificates, extracts, resolutions, and commercial records used overseas.',
      zh: '面向公司证书、摘录、决议及商业文件赴海外使用的搜索入口页。',
    },
    scope: {
      en: 'Company document work depends on issuer and destination, with Australia fully covered and other jurisdictions mainly apostille-led plus selected consular handling.',
      zh: '公司文件按签发地和目的地区分，澳洲可完整覆盖，其他司法区以海牙路径为主并可评估部分领馆路线。',
    },
    helperTitle: {
      en: 'What usually matters for company-document work',
      zh: '公司文件办理时通常最关键的判断点',
    },
    helperText: {
      en: 'Company-document work should never be screened as one generic category. Registry extracts, incorporation certificates, good-standing records, constitutions, board resolutions, signed authority papers, and trade documents often start from different lanes.',
      zh: '公司文件不能被当成一个笼统类别来预审。登记摘录、成立证书、良好存续证明、章程、董事会决议、签字授权文件和贸易单据，往往从完全不同的路径起步。',
    },
    checkpoints: [
      { en: 'Identify the exact company document class first, such as registry extract, incorporation certificate, good standing, constitution, resolution, authority letter, invoice, or contract.', zh: '先确认公司文件具体属于哪一类，例如登记摘录、成立证书、良好存续证明、章程、决议、授权函、发票或合同。' },
      { en: 'Check whether the route depends on notary, apostille, embassy legalisation, chamber handling, or a combined commercial chain.', zh: '确认该路线依赖公证、海牙、使馆认证、商会处理，还是组合商业链路。' },
      { en: 'Use intake only after signer authority, original handling, and destination filing purpose are clear enough to screen properly.', zh: '只有在签字权限、原件处理和目的地提交用途足够明确后，再进入受理。' },
    ],
    regionalRequirements: [
      {
        region: { en: 'Australia-issued company documents', zh: '澳洲签发公司文件' },
        summary: {
          en: 'Australia is commercially strong for company records because DFAT expressly recognises Australian government commercial documents, but copy-based and signed-authority files still need to be separated.',
          zh: '澳洲公司文件商业上很强，因为 DFAT 明确认可澳洲政府商业文件，但副本类文件和签字授权类文件仍需分开判断。',
        },
        officialRequirements: [
          { en: 'Smartraveller says Australian government commercial documents such as ASIC records can be legalised', zh: 'Smartraveller 明确澳洲政府商业文件，例如 ASIC 文件，可办理认证' },
          { en: 'Private company documents can be legalised once notarised by an Australian Notary Public', zh: '私营公司文件需先由澳洲公证人公证后，才能进入认证路线' },
          { en: 'Documents from an authorised Australian chamber of commerce can also be legalised', zh: '由澳洲授权商会签发的文件也可办理认证' },
        ],
        egsRequirements: [
          { en: 'Clear copy of the exact company document set needed', zh: '提供清晰的目标公司文件组合' },
          { en: 'Passport bio page of the instructing party where identity review is needed', zh: '如需身份核验，提供委托人的护照资料页' },
          { en: 'If signed authority papers are involved, identify early whether originals and execution review are needed', zh: '如涉及签字授权文件，应尽早确认是否需要原件和签署审查' },
        ],
        commonExamples: [
          { en: 'ASIC current company extract / company search extract', zh: 'ASIC 公司当前摘录 / 公司查询文件' },
          { en: 'Certificate of registration or certificate of incorporation', zh: '公司注册证书 / 成立证书' },
          { en: 'Company constitution', zh: '公司章程 Constitution' },
          { en: 'Minutes, board resolutions, shareholder resolutions', zh: '会议纪要、董事会决议、股东决议' },
          { en: 'Power of attorney, authorised signatory letter, director authority letter', zh: '公司委托书、授权签字函、董事授权函' },
          { en: 'Invoice, commercial contract, declaration, distributor or agency authorisation letter', zh: '发票、商业合同、声明书、经销商或代理授权函' },
        ],
        expedite: {
          en: 'Australian company-record routes can be efficient where the file stays in a pure record lane. Once signing authority or private execution documents enter the matter, urgency becomes more conditional.',
          zh: '如果案件停留在纯记录型公司文件路径内，澳洲路线通常可以较高效；一旦加入签字授权或私文书，加急就会更有条件。',
        },
      },
      {
        region: { en: 'United Kingdom-issued company documents', zh: '英国签发公司文件' },
        summary: {
          en: 'UK company files often look clean on paper, but the real commercial judgment is whether the receiving side wants a Companies House record, a certified copy, or a signed corporate authority document.',
          zh: '英国公司文件表面上通常很清晰，但真正的商业判断点在于接收方要的是 Companies House 记录、认证副本，还是签字公司授权文件。',
        },
        officialRequirements: [
          { en: 'GOV.UK says company certificates issued by Companies House can be legalised as official public documents', zh: 'GOV.UK 明确 Companies House 签发的公司证书可以作为官方公共文件办理认证' },
          { en: 'Other documents can be legalised if certified by a UK notary or solicitor', zh: '其他文件如经英国公证人或律师认证，也可办理 legalisation' },
          { en: 'The receiving side should confirm whether a specific signer or certification format is required', zh: '应先确认接收方是否要求特定签字人或认证格式' },
        ],
        egsRequirements: [
          { en: 'Company document scan showing the exact record type', zh: '能看清具体记录类型的公司文件扫描件' },
          { en: 'If the matter includes resolutions, POAs, or signed declarations, review them as a separate signed-document track', zh: '如同时涉及决议、委托书或签字声明，应按独立的签字文件路径核验' },
          { en: 'Passport or identity details of the instructing contact where needed', zh: '如有需要，提供联系人护照或身份资料' },
        ],
        commonExamples: [
          { en: 'Companies House certificate of incorporation', zh: 'Companies House 公司成立证书' },
          { en: 'Certificate of good standing / certificate of existence', zh: '良好存续证明 / existence 证明' },
          { en: 'Articles of association, memorandum, incorporation package', zh: '公司章程、备忘录、成立文件包' },
          { en: 'Confirmation statement or company profile extract', zh: '确认声明 / 公司档案摘录' },
          { en: 'Board resolutions, shareholder resolutions, authorised signatory letter, power of attorney', zh: '董事会决议、股东决议、授权签字函、公司委托书' },
        ],
        expedite: {
          en: 'UK company records can be reasonably quick if the correct record is already identified. If the matter actually depends on signed authority papers, a fast timeline should not be assumed.',
          zh: '如果正确的公司记录已经明确，英国公司文件通常可以较快推进；但如果案件真正依赖签字授权文件，就不应先假设能很快完成。',
        },
      },
      {
        region: { en: 'Singapore company documents', zh: '新加坡公司文件' },
        summary: {
          en: 'Singapore separates public and commercial-document handling more clearly than some clients expect. Commercial files may need certification by the relevant authority before apostille.',
          zh: '新加坡对公共文件和商业文件的区分比很多客户想象得更明确。商业文件在办理海牙前，可能需要先由相应机构出证。',
        },
        officialRequirements: [
          { en: 'MFA says SAL is the competent authority for apostille in Singapore', zh: 'MFA 明确 SAL 是新加坡海牙签发机关' },
          { en: 'Singapore guidance notes that commercial documents may first need certification by a relevant authority such as a Chamber of Commerce', zh: '新加坡官方指引提到，商业文件在某些情况下需先由商会等相关机构出证' },
          { en: 'Non-government documents may need notarisation before SAL apostille', zh: '非政府文件在 SAL 办理海牙前可能需要先公证' },
        ],
        egsRequirements: [
          { en: 'Clear company document set and filing purpose', zh: '清晰的公司文件组合及具体提交用途' },
          { en: 'Check whether the document is a pure company record or a signed authority document', zh: '先确认文件属于纯公司记录，还是签字授权文件' },
          { en: 'If original execution documents are involved, surface that before intake', zh: '如涉及原始签署文件，应在受理前先说明' },
        ],
        commonExamples: [
          { en: 'ACRA business profile / company profile', zh: 'ACRA Business Profile / 公司档案' },
          { en: 'Certificate of incorporation or registration', zh: '公司成立证书 / 注册证书' },
          { en: 'Constitution', zh: '公司章程 Constitution' },
          { en: 'Board resolutions, shareholder resolutions, incumbency-style declarations', zh: '董事会决议、股东决议、在任类声明' },
          { en: 'Power of attorney, authorised signatory letter, board authority letter', zh: '公司委托书、授权签字函、董事会授权函' },
          { en: 'Commercial agreement, invoice, distribution or agency appointment letter', zh: '商业协议、发票、经销商或代理任命函' },
        ],
        expedite: {
          en: 'Singapore company-record files can be workable, but speed depends heavily on whether the upstream certification step is already settled.',
          zh: '新加坡公司记录类案件可以做得很清楚，但速度高度取决于上游认证步骤是否已经明确。',
        },
      },
      {
        region: { en: 'Canada-issued company documents', zh: '加拿大签发公司文件' },
        summary: {
          en: 'Canadian company documents are now apostille-eligible, but the route still depends on issuing province and whether the file is government-issued or notarised private paper.',
          zh: '加拿大公司文件现在可进入 apostille 路线，但实际处理仍取决于签发省份，以及文件是政府记录还是经公证的私文书。',
        },
        officialRequirements: [
          { en: 'Canada says government-issued corporate records and notarized documents can be authenticated with an apostille', zh: '加拿大官方说明，政府签发的公司记录及经公证的文件都可以办理 apostille' },
          { en: 'Certain provinces issue apostilles directly, while other provinces and territories route through Global Affairs Canada', zh: '部分省份直接签发 apostille，其余省区由 Global Affairs Canada 处理' },
          { en: 'The destination country’s requirements still need to be checked before deciding whether the current record set is sufficient', zh: '在判断现有公司文件组合是否足够前，仍需先核验目的地要求' },
        ],
        egsRequirements: [
          { en: 'Company document scan and issuing-province detail', zh: '公司文件扫描件及签发省份信息' },
          { en: 'If the file includes signed corporate authority papers, review them separately from registry extracts', zh: '如案件包含签字公司授权文件，应与登记记录分开核验' },
          { en: 'Passport bio page of the instructing party where needed', zh: '如有需要，提供委托人护照资料页' },
        ],
        commonExamples: [
          { en: 'Certificate or articles of incorporation', zh: '公司成立证书 / 公司章程' },
          { en: 'Corporate profile, registry extract, or status report', zh: '公司档案、登记摘录、状态报告' },
          { en: 'Certificate of status or certificate of compliance where available', zh: '公司状态证明 / 合规证明（如适用）' },
          { en: 'Director and shareholder registers or resolutions', zh: '董事名册、股东名册或公司决议' },
          { en: 'Power of attorney, authorisation letter, affidavit, or sworn corporate statement', zh: '公司委托书、授权函、宣誓书或公司声明' },
        ],
        expedite: {
          en: 'Canadian company-file timing is route-specific. EGS does not treat federal, provincial, and notarised private papers as one uniform rush product.',
          zh: '加拿大公司文件时效高度依赖具体路线。EGS 不会把联邦、省级及公证私文书当成同一种可加急产品来承诺。',
        },
      },
      {
        region: { en: 'United States-issued company documents', zh: '美国签发公司文件' },
        summary: {
          en: 'US company documents split early between state registry records and privately signed corporate papers. Clients often call both “company documents”, but the route logic is not the same.',
          zh: '美国公司文件很早就分成州政府登记记录和私下签署的公司文件两类。客户常把它们都叫“公司文件”，但路线逻辑并不一样。',
        },
        officialRequirements: [
          { en: 'U.S. public corporate records and notarized private corporate documents follow different authentication paths depending on state authority', zh: '美国公共公司记录和经公证的私营公司文件，会因州级主管机关不同而走不同认证路径' },
          { en: 'State-issued certificates generally move through the relevant Secretary of State apostille route', zh: '州政府签发的公司证书通常走相应 Secretary of State 的 apostille 路线' },
          { en: 'Private corporate papers usually need proper notarisation before apostille can be considered', zh: '私营公司文件通常需要先完成合格公证，之后才谈得上 apostille' },
        ],
        egsRequirements: [
          { en: 'State name and exact company-document type', zh: '提供州名及具体公司文件类型' },
          { en: 'Separate registry certificates from signed corporate papers before intake', zh: '在受理前先把登记证书和签字公司文件分开' },
          { en: 'If the file is for bank, litigation, or cross-border signing authority, describe the actual use clearly', zh: '如用于银行、诉讼或跨境签字授权，应写清实际用途' },
        ],
        commonExamples: [
          { en: 'Certificate of incorporation / articles of incorporation', zh: '公司成立证书 / 公司成立章程' },
          { en: 'Certificate of good standing / certificate of existence / certificate of status', zh: '良好存续证明 / existence / status 证明' },
          { en: 'Articles of organisation or LLC formation documents', zh: 'LLC 成立文件 / articles of organisation' },
          { en: 'Operating agreement, bylaws, board resolutions', zh: 'Operating Agreement、Bylaws、董事会决议' },
          { en: 'Incumbency certificate, authorised signatory certificate, power of attorney', zh: '在任证明、授权签字证明、公司委托书' },
        ],
        expedite: {
          en: 'US company-file timing depends heavily on state route and whether the file is a public record or a notarised private paper. EGS does not treat those as one rush product.',
          zh: '美国公司文件时效高度取决于州级路径，以及文件是公共记录还是经公证私文书。EGS 不会把它们当成一种统一加急产品。',
        },
      },
    ],
    relatedDocumentSlugs: ['degree-certificate', 'power-of-attorney'],
    relatedIssuingSlugs: ['australia', 'canada', 'usa', 'singapore', 'united-kingdom'],
    relatedDestinationSlugs: ['china', 'usa', 'singapore', 'canada', 'hong-kong'],
  },
  {
    slug: 'statutory-declaration',
    name: { en: 'Statutory declaration', zh: '法定声明' },
    intro: {
      en: 'Entry page for statutory declarations, single-status statements, same-person statements, and other sworn declaration documents used overseas.',
      zh: '面向法定声明、单身声明、同一人声明及其他宣誓声明文件赴海外使用的搜索入口页。',
    },
    scope: {
      en: 'Statutory-declaration work is execution-sensitive. Australia is a strong lane for this category, while other jurisdictions are mainly apostille-led after the correct witnessing or notarisation step is confirmed.',
      zh: '法定声明对签署形式非常敏感。澳洲在这类文件上是强主线，其他司法区则通常是在确认正确见证或公证步骤后进入海牙路径。',
    },
    helperTitle: {
      en: 'What usually matters for statutory-declaration work',
      zh: '法定声明办理时通常最关键的判断点',
    },
    helperText: {
      en: 'Statutory-declaration matters usually depend on execution format first. The real issue is often who must witness, whether notarisation is required, and whether the signed original needs to stay intact through the route.',
      zh: '法定声明案件通常先取决于签署形式。真正关键的，往往是谁来见证、是否需要公证，以及签好的原件是否必须在整条路径中保持完整。',
    },
    checkpoints: [
      { en: 'Identify whether the receiving side expects a statutory declaration, affidavit, same-person statement, single-status statement, or another sworn format.', zh: '先确认接收方要求的是 statutory declaration、affidavit、同一人声明、单身声明，还是其他宣誓形式。' },
      { en: 'Check who must sign, who may witness, and whether notarisation or apostille will follow the execution step.', zh: '确认谁必须签署、谁可以见证，以及签署后是否还要继续公证或海牙。' },
      { en: 'Use intake only after execution format, supporting identity documents, and destination wording are clear enough to screen properly.', zh: '只有在签署形式、身份配套文件和目的地文本要求足够明确后，再进入受理。' },
    ],
    regionalRequirements: [
      {
        region: { en: 'Australia-executed statutory declarations', zh: '在澳洲签署的法定声明' },
        summary: {
          en: 'Australia is commercially strong for statutory declarations because the declaration form and witness category can usually be structured cleanly before apostille or further handling.',
          zh: '澳洲在法定声明这类文件上可操作性很强，因为通常可以在进入海牙或后续处理前，先把声明文本和见证人类别整理清楚。',
        },
        officialRequirements: [
          { en: 'Australian statutory declarations must be signed in front of an authorised witness', zh: '澳洲 statutory declaration 必须在授权见证人面前签署' },
          { en: 'If the document is to move through legalisation, the witness or notarial step must be suitable for the downstream route', zh: '如文件后续要进入认证链路，见证或公证步骤必须适合下游路线' },
          { en: 'Receiving-side requirements should still be checked because some institutions prefer an affidavit or another sworn form instead', zh: '仍需核验接收方要求，因为有些机构更偏好 affidavit 或其他宣誓形式' },
        ],
        egsRequirements: [
          { en: 'Final declaration text before signing', zh: '签署前的最终声明文本' },
          { en: 'Passport bio page of the signing party', zh: '签署人的护照资料页' },
          { en: 'If the file is same-person, single-status, or relationship-based, review supporting identity documents together', zh: '如属于同一人、单身或关系类声明，应同步核验辅助身份证明' },
        ],
        commonExamples: [
          { en: 'Single-status declaration', zh: '单身声明' },
          { en: 'Same-person declaration', zh: '同一人声明' },
          { en: 'Relationship declaration', zh: '关系声明' },
          { en: 'Name discrepancy declaration', zh: '姓名不一致声明' },
          { en: 'General statutory declaration for administrative use', zh: '行政用途的一般法定声明' },
        ],
        expedite: {
          en: 'Statutory declarations can move quickly only after the wording and witness format are final. If the text is still being revised, urgency should not be promised.',
          zh: '法定声明只有在文本和见证形式最终确定后，才可能推进较快；如果内容还在修改，就不应先承诺时效。',
        },
      },
      {
        region: { en: 'United Kingdom sworn statements', zh: '英国宣誓声明文件' },
        summary: {
          en: 'In the UK, the practical question is often whether the document should be handled as a statutory declaration, affidavit, or solicitor/notary-certified statement. The label alone is not enough.',
          zh: '在英国，这类文件的关键通常是应按 statutory declaration、affidavit，还是由律师或公证人认证的声明来处理。单靠文件名称并不足够。',
        },
        officialRequirements: [
          { en: 'GOV.UK allows legalisation of documents certified by a UK notary or solicitor', zh: 'GOV.UK 允许由英国公证人或律师认证的文件办理 legalisation' },
          { en: 'The receiving side should confirm what sworn format is acceptable before certification starts', zh: '在开始认证前，应先确认接收方接受哪一种宣誓形式' },
          { en: 'If a document is to be signed before a professional, it should not be pre-signed incorrectly', zh: '如需在专业人士面前签署，不能提前错误签字' },
        ],
        egsRequirements: [
          { en: 'Final declaration text', zh: '最终声明文本' },
          { en: 'Passport bio page or identity material', zh: '护照资料页或身份材料' },
          { en: 'Check whether the destination really wants a statutory declaration or a more formal affidavit route', zh: '先确认目的地要的是 statutory declaration，还是更正式的 affidavit 路线' },
        ],
        commonExamples: [
          { en: 'Statutory declaration', zh: '法定声明' },
          { en: 'Affidavit', zh: '宣誓书 / affidavit' },
          { en: 'Name declaration or same-person statement', zh: '姓名声明 / 同一人声明' },
          { en: 'Single-status or marital-status declaration', zh: '单身声明 / 婚姻状态声明' },
        ],
        expedite: {
          en: 'This category can move fast only when the sworn format is correct from the start. If the client is still deciding between declaration and affidavit, speed becomes secondary.',
          zh: '只有在一开始就用对宣誓形式时，这类文件才可能推进较快；如果客户还在 declaration 和 affidavit 之间摇摆，速度就不是首要问题。',
        },
      },
      {
        region: { en: 'Singapore sworn declarations', zh: '新加坡宣誓声明文件' },
        summary: {
          en: 'Singapore declaration-style documents usually turn on witnessing and notarisation structure first. Clients often underestimate that execution step.',
          zh: '新加坡这类声明文件通常先取决于见证和公证结构。很多客户会低估这个执行步骤的重要性。',
        },
        officialRequirements: [
          { en: 'Non-government declaration documents may need notarisation before apostille in Singapore', zh: '新加坡的非政府声明文件在办理海牙前可能需要先公证' },
          { en: 'If a signature must be witnessed, the signer should follow the required signing arrangement', zh: '如签字需要见证，签署人必须按要求完成见证签字安排' },
          { en: 'Receiving-side format requirements should be confirmed before the document is executed', zh: '在签署文件前，应先确认接收方的格式要求' },
        ],
        egsRequirements: [
          { en: 'Unsigned or properly staged final text for review', zh: '用于核验的未签字或按步骤准备好的最终文本' },
          { en: 'Passport or NRIC details', zh: '护照或 NRIC 资料' },
          { en: 'If the statement relates to identity, family, or civil status, review the supporting documents together', zh: '如声明涉及身份、家庭或民事状态，应整组核验辅助文件' },
        ],
        commonExamples: [
          { en: 'Single-status declaration', zh: '单身声明' },
          { en: 'Same-person declaration', zh: '同一人声明' },
          { en: 'Relationship declaration', zh: '关系声明' },
          { en: 'Address or identity declaration', zh: '住址声明 / 身份声明' },
        ],
        expedite: {
          en: 'Timing depends more on correct execution than on downstream apostille speed. EGS screens the signing arrangement first.',
          zh: '时效更多取决于签署是否正确，而不是后端海牙本身的速度。EGS 会先核验签署安排。',
        },
      },
      {
        region: { en: 'United States sworn declarations', zh: '美国宣誓声明文件' },
        summary: {
          en: 'In the U.S., declaration-style files divide early between simple notarised statements and more formal affidavit or state-specific sworn instruments. That distinction matters commercially.',
          zh: '在美国，这类声明文件很早就会分成普通公证声明、更正式的 affidavit 或州别特定宣誓文件。这种区分对受理非常重要。',
        },
        officialRequirements: [
          { en: 'U.S. notarial handling depends on state notary rules and, if abroad, consular notarial procedures', zh: '美国公证处理取决于各州公证规则；如在境外，则还涉及领事公证程序' },
          { en: 'Documents that must be signed in front of a notary or consular officer should not be pre-signed incorrectly', zh: '需要在公证人或领事官员面前签字的文件，不能提前错误签署' },
          { en: 'The receiving side should confirm whether a notarised declaration is enough or whether a stricter affidavit format is expected', zh: '应先确认接收方接受普通公证声明，还是要求更严格的 affidavit 形式' },
        ],
        egsRequirements: [
          { en: 'Final declaration text and state path', zh: '最终声明文本及适用州别路径' },
          { en: 'Government ID or passport for the signer', zh: '签署人的政府身份证件或护照' },
          { en: 'Check whether this is a simple declaration, affidavit, or another execution-sensitive instrument before intake', zh: '在受理前先确认这是普通声明、affidavit，还是其他对签署敏感的文件' },
        ],
        commonExamples: [
          { en: 'Same-person declaration', zh: '同一人声明' },
          { en: 'Single-status declaration', zh: '单身声明' },
          { en: 'Affidavit of identity or address', zh: '身份或住址宣誓书' },
          { en: 'Relationship or support declaration', zh: '关系声明 / 支持声明' },
        ],
        expedite: {
          en: 'This category is only rush-friendly when the execution path is already clear. If the file still needs format selection, urgency should be treated cautiously.',
          zh: '只有在签署路径已经明确时，这类文件才适合谈加急；如果文件形式还没定，就应谨慎处理时效预期。',
        },
      },
    ],
    relatedDocumentSlugs: ['power-of-attorney', 'marriage-certificate'],
    relatedIssuingSlugs: ['australia', 'singapore', 'usa', 'united-kingdom'],
    relatedDestinationSlugs: ['china', 'singapore', 'usa', 'australia'],
  },
];

export function getSearchEntry(
  group: 'issuing' | 'destination' | 'document',
  slug: string,
): SearchEntry | undefined {
  const collection =
    group === 'issuing'
      ? issuingCountryEntries
      : group === 'destination'
        ? destinationCountryEntries
        : documentTypeEntries;

  return collection.find((entry) => entry.slug === slug);
}

export function getEntryText(value: CopyText, locale: Locale) {
  return value[locale];
}

export function getEntryList(values: CopyText[], locale: Locale) {
  return values.map((value) => value[locale]);
}
