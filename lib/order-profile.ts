import type { Locale } from '@/lib/i18n/dictionaries';

export type OrderDocumentProfile =
  | 'company_record'
  | 'company_signature'
  | 'police_check'
  | 'personal_signature'
  | 'personal_certificate';

type ProfileChecklist = {
  title: string;
  pricingNote: string;
  requiredItems: string[];
  handlingNotes: string[];
  expedite: string;
};

type CertificateChecklist = {
  title: string;
  requiredItems: string[];
  notes: string[];
};

type PricingCountry =
  | 'australia'
  | 'usa'
  | 'canada'
  | 'malaysia'
  | 'united-kingdom'
  | 'singapore'
  | 'philippines'
  | 'indonesia'
  | 'south-africa'
  | 'brazil'
  | 'other';

type PricingContext = {
  locale: Locale;
  issuingCountry?: string;
  route: 'hague' | 'non' | null;
  profile: OrderDocumentProfile;
  serviceLevel?: 'standard' | 'express';
};

function normalize(value: string) {
  return value.toLowerCase().replace(/\s+/g, ' ').trim();
}

export function isAustraliaIssuingCountry(value: string) {
  const normalized = normalize(value);
  return ['australia', 'australian', 'au', '澳大利亚', '澳洲'].includes(normalized);
}

export function resolvePricingCountry(value?: string): PricingCountry {
  const normalized = normalize(value || '');
  if (['australia', 'australian', 'au', '澳大利亚', '澳洲'].includes(normalized)) return 'australia';
  if (['united states', 'usa', 'us', '美国'].includes(normalized)) return 'usa';
  if (['canada', '加拿大'].includes(normalized)) return 'canada';
  if (['malaysia', '马来西亚'].includes(normalized)) return 'malaysia';
  if (['united kingdom', 'uk', 'britain', 'england', '英国'].includes(normalized)) return 'united-kingdom';
  if (['singapore', '新加坡'].includes(normalized)) return 'singapore';
  if (['philippines', '菲律宾'].includes(normalized)) return 'philippines';
  if (['indonesia', '印尼', '印度尼西亚'].includes(normalized)) return 'indonesia';
  if (['south africa', '南非'].includes(normalized)) return 'south-africa';
  if (['brazil', '巴西'].includes(normalized)) return 'brazil';
  return 'other';
}

export function inferOrderDocumentProfile(
  docCategory: 'personal' | 'company',
  documentType: string,
): OrderDocumentProfile {
  const normalized = normalize(documentType);

  if (
    normalized.includes('police')
    || normalized.includes('afp')
    || normalized.includes('npc')
    || normalized.includes('无犯罪')
  ) {
    return 'police_check';
  }

  const signatureHints = [
    'power of attorney',
    'poa',
    'statutory declaration',
    'declaration',
    'affidavit',
    'statement',
    'same person',
    'single status',
    'relationship',
    'authorization',
    'authorisation',
    '委托书',
    '法定声明',
    '声明',
    '宣誓',
  ];

  const isSignatureSensitive = signatureHints.some((hint) => normalized.includes(hint));

  if (docCategory === 'company') {
    return isSignatureSensitive ? 'company_signature' : 'company_record';
  }

  return isSignatureSensitive ? 'personal_signature' : 'personal_certificate';
}

export function getAustraliaHagueBasePrice(
  profile: OrderDocumentProfile,
): number {
  switch (profile) {
    case 'company_record':
      return 660;
    case 'company_signature':
      return 880;
    case 'police_check':
      return 380;
    case 'personal_signature':
      return 550;
    case 'personal_certificate':
    default:
      return 550;
  }
}

export function getOrderBasePrice(context: Omit<PricingContext, 'locale'>): number | null {
  const country = resolvePricingCountry(context.issuingCountry);

  if (country === 'australia' && context.route === 'hague') {
    return getAustraliaHagueBasePrice(context.profile);
  }

  switch (country) {
    case 'usa':
      if (context.profile === 'police_check') {
        return context.serviceLevel === 'express' ? 389 : 339;
      }
      if (context.profile === 'company_signature' || context.profile === 'personal_signature') return 449;
      if (context.profile === 'company_record' || context.profile === 'personal_certificate') return 339;
      return 339;
    case 'canada':
      if (context.profile === 'police_check') return 469;
      if (context.profile === 'company_signature' || context.profile === 'personal_signature') return 289;
      if (context.profile === 'company_record' || context.profile === 'personal_certificate') return 269;
      return 269;
    case 'malaysia':
      if (context.profile === 'company_signature' || context.profile === 'personal_signature') return 880;
      return 660;
    case 'united-kingdom':
      if (context.profile === 'police_check') {
        return context.serviceLevel === 'express' ? 660 : 449;
      }
      if (context.profile === 'company_signature' || context.profile === 'personal_signature') return 880;
      if (context.profile === 'company_record') return 660;
      return 449;
    case 'singapore':
      if (context.profile === 'police_check') return 449;
      if (context.profile === 'company_signature') return 880;
      if (context.profile === 'personal_signature') {
        return context.serviceLevel === 'express' ? 880 : 550;
      }
      if (context.profile === 'company_record') return 550;
      return 449;
    case 'philippines':
      return 660;
    case 'indonesia':
      return 660;
    case 'south-africa':
      return 880;
    case 'brazil':
      return 660;
    case 'australia':
    case 'other':
    default:
      return null;
  }
}

export function getOrderEstimatedWindow(context: Omit<PricingContext, 'locale'>): string | null {
  const country = resolvePricingCountry(context.issuingCountry);
  switch (country) {
    case 'australia':
      if (context.route === 'hague') {
        return context.serviceLevel === 'express'
          ? '1-3 business days (subject to document type and availability)'
          : 'About 1 week (excluding shipping and public holidays)';
      }
      return null;
    case 'usa':
      return context.profile === 'police_check'
        ? context.serviceLevel === 'express'
          ? '1 business day'
          : '7-9 business days'
        : '2-14 business days depending on state lane';
    case 'canada':
      return context.profile === 'police_check' ? '1-3 weeks' : 'About 1 week';
    case 'malaysia':
      return context.profile === 'police_check' ? 'About 3 weeks' : 'About 1 month';
    case 'united-kingdom':
      return context.profile === 'police_check'
        ? context.serviceLevel === 'express'
          ? 'About 2 weeks'
          : 'About 1 month'
        : 'About 5 business days';
    case 'singapore':
      return '2-3 business days';
    case 'philippines':
      return '3-4 weeks';
    case 'indonesia':
      return '2-3 weeks';
    case 'south-africa':
      return '2-3 weeks';
    case 'brazil':
      return '2-3 weeks';
    default:
      return null;
  }
}

export function supportsCombinedNotarialSet(
  issuingCountry: string | undefined,
  profile: OrderDocumentProfile,
): boolean {
  const country = resolvePricingCountry(issuingCountry);

  switch (country) {
    case 'australia':
      return profile === 'personal_certificate' || profile === 'company_record' || profile === 'personal_signature' || profile === 'company_signature';
    case 'usa':
      return profile === 'personal_certificate' || profile === 'company_record';
    case 'united-kingdom':
      return profile === 'personal_certificate';
    case 'singapore':
      return profile === 'personal_certificate' || profile === 'company_record';
    case 'malaysia':
      return profile === 'company_record';
    default:
      return false;
  }
}

export function getCombinedNotarialSetHint(
  locale: Locale,
  issuingCountry: string | undefined,
  profile: OrderDocumentProfile,
): string {
  const country = resolvePricingCountry(issuingCountry);
  if (locale === 'zh') {
    switch (country) {
      case 'australia':
        return profile === 'personal_certificate'
          ? '澳洲这类证书 / 学历文件，若接收方允许，通常可作为同一套公证文件一起处理，例如毕业证和成绩单。'
          : '澳洲这类文件在部分情况下可以合并为同一套公证文件处理，最终仍以前置复核为准。';
      case 'usa':
        return '美国部分 copy 类路线支持合并文件组，但是否可合并仍取决于州别和文件形式。';
      case 'united-kingdom':
        return '英国部分 certified-copy 类文件组可以合并处理，但原件类和签字类通常不能直接并件。';
      case 'singapore':
        return '新加坡部分 copy / academic 类文件可以并入同一套处理，但签字类一般不能直接合并。';
      case 'malaysia':
        return '马来西亚只有部分 true-copy 类商业文件适合合并，领馆类材料仍需逐案判断。';
      default:
        return '该签发地区只有在允许并件的情况下才适合合并处理。';
    }
  }

  switch (country) {
    case 'australia':
      return profile === 'personal_certificate'
        ? 'For Australia-issued certificate or academic files, the receiving side may sometimes accept them in one notarial set, for example a degree certificate together with a transcript.'
        : 'For some Australia-issued files, multiple items can be grouped into one notarial set, subject to pre-review.';
    case 'usa':
      return 'Some U.S. copy-style lanes can support grouped documents, but the final answer still depends on the state lane and document form.';
    case 'united-kingdom':
      return 'Some UK certified-copy lanes can support grouped document sets, while original or signature-sensitive files usually cannot be merged the same way.';
    case 'singapore':
      return 'Some Singapore copy or academic lanes can be grouped into one set, but signature-sensitive files usually stay separate.';
    case 'malaysia':
      return 'In Malaysia, grouped handling is mainly workable for selected true-copy commercial files and still needs pre-review.';
    default:
      return 'Grouped notarisation is only available where that issuing-country lane supports document combination.';
  }
}

export function getOrderProfileLabel(locale: Locale, profile: OrderDocumentProfile) {
  if (locale === 'zh') {
    switch (profile) {
      case 'company_record':
        return '公司文件 / 商业记录';
      case 'company_signature':
        return '公司签字文件';
      case 'police_check':
        return '无犯罪记录';
      case 'personal_signature':
        return '个人签字文件';
      case 'personal_certificate':
      default:
        return '个人证书 / 学历文件';
    }
  }

  switch (profile) {
    case 'company_record':
      return 'Commercial documents';
    case 'company_signature':
      return 'Commercial signature documents';
    case 'police_check':
      return 'Police check';
    case 'personal_signature':
      return 'Personal signature documents';
    case 'personal_certificate':
    default:
      return 'Personal certificates / academic documents';
  }
}

export function buildCertificateChecklist(
  locale: Locale,
  certificateType?: string,
): CertificateChecklist | null {
  if (!certificateType || certificateType === 'none') return null;

  if (locale === 'zh') {
    switch (certificateType) {
      case 'police':
        return {
          title: '证书申请材料：无犯罪记录',
          requiredItems: [
            '护照资料页',
            '至少一项辅助身份证明',
            '如为 AFP 路线，请准备驾照以及签证页 / Medicare / 水电账单 / 银行账单其中一项',
          ],
          notes: [
            '该申请项仅用于证书申请 / 调取，不等于后续 apostille 或 legalisation 已自动完成。',
            '如是海外无犯罪，不同国家会有单独材料要求，系统当前展示的是澳洲主线基础要求。',
          ],
        };
      case 'birth':
      case 'marriage':
      case 'death':
      case 'divorce':
        return {
          title: '证书申请材料：民事证书',
          requiredItems: [
            '已有证书照片或扫描件（如有）',
            '文件主体护照资料页',
            '如信息曾变更，请补充相关说明或支持材料',
          ],
          notes: [
            '民事证书申请以登记信息是否可检索、是否需要补充旧件信息为准。',
            '后续如还要 apostille / legalisation，仍可能需要原件或新版证书。',
          ],
        };
      case 'transcript':
      case 'testamur':
        return {
          title: '证书申请材料：学历 / 成绩单',
          requiredItems: [
            '护照资料页',
            '学校名称、毕业年份、课程或学位信息',
            '如有旧件、成绩单截图或学生编号，请一并提供',
          ],
          notes: [
            '学历件申请是否可行，取决于学校出件规则。',
            '如后续要做认证，学校版本、原件和翻译要求仍需单独确认。',
          ],
        };
      case 'single':
        return {
          title: '证书申请材料：单身证明 / 声明类',
          requiredItems: [
            '护照资料页',
            '用途说明',
            '如接收方有格式要求，请先提供模板或要求截图',
          ],
          notes: [
            '这类申请往往更接近声明或执行文件，不一定等同于政府直接出具的标准证书。',
            '如后续涉及签字、见证或宣誓，原件可能仍需要。',
          ],
        };
      case 'company':
        return {
          title: '证书申请材料：公司证书 / 摘录',
          requiredItems: [
            '公司名称和可识别注册信息',
            '护照资料页（董事 / 股东 / 授权代表）',
            '如已有旧件、ASIC 截图或公司编号，请一并提供',
          ],
          notes: [
            '公司证书申请只覆盖证书 / 摘录调取本身。',
            '如后续还要 apostille、签字见证或公司授权文件链，系统会继续按主文件逻辑计价。',
          ],
        };
      default:
        return null;
    }
  }

  switch (certificateType) {
    case 'police':
      return {
        title: 'Certificate application checklist: police clearance',
        requiredItems: [
          'Passport bio page',
          'At least one supporting ID',
          'For AFP-style application, prepare a driver licence plus one of visa page / Medicare / utility bill / bank statement',
        ],
        notes: [
          'This add-on covers certificate application / retrieval only, not the downstream apostille or legalisation step by itself.',
          'If the certificate is overseas rather than Australian, separate country-specific requirements may still apply.',
        ],
      };
    case 'birth':
    case 'marriage':
    case 'death':
    case 'divorce':
      return {
        title: 'Certificate application checklist: civil certificate',
        requiredItems: [
          'Any existing photo or scan of the certificate, if available',
          'Passport bio page for the document holder',
          'If personal details have changed, provide the relevant supporting explanation or record',
        ],
        notes: [
          'Civil-certificate retrieval depends on whether the registry record can be identified cleanly.',
          'If apostille / legalisation follows, originals or fresh issue versions may still be required.',
        ],
      };
    case 'transcript':
    case 'testamur':
      return {
        title: 'Certificate application checklist: academic record',
        requiredItems: [
          'Passport bio page',
          'Institution name, graduation year, and program / qualification details',
          'If available, provide old scans, transcript preview, or student number',
        ],
        notes: [
          'Academic retrieval depends on the institution’s own release rules.',
          'If authentication follows, the institution-issued version, originals, and translation expectations still need separate review.',
        ],
      };
    case 'single':
      return {
        title: 'Certificate application checklist: single-status / declaration item',
        requiredItems: [
          'Passport bio page',
          'Purpose of use',
          'If the receiving side has a required format, provide that template or screenshot first',
        ],
        notes: [
          'This category often behaves more like a declaration or execution-sensitive file than a simple government certificate.',
          'Originals may still be required if witnessing or sworn execution becomes necessary later.',
        ],
      };
    case 'company':
      return {
        title: 'Certificate application checklist: company extract / certificate',
        requiredItems: [
          'Company name and identifiable registration details',
          'Passport bio page for the director / shareholder / authorised representative',
          'If available, provide old extracts, ASIC screenshots, or company number',
        ],
        notes: [
          'This add-on covers certificate or extract retrieval itself.',
          'If apostille, witnessing, or corporate execution steps follow, the main file logic still applies separately.',
        ],
      };
    default:
      return null;
  }
}

export function buildOrderChecklist(
  context: PricingContext,
): ProfileChecklist {
  const { locale, profile, issuingCountry, route, serviceLevel } = context;
  const country = resolvePricingCountry(issuingCountry);
  const price = getOrderBasePrice({ issuingCountry, route, profile, serviceLevel });
  const countryName =
    locale === 'zh'
      ? {
          australia: '澳洲',
          usa: '美国',
          canada: '加拿大',
          malaysia: '马来西亚',
          'united-kingdom': '英国',
          singapore: '新加坡',
          philippines: '菲律宾',
          indonesia: '印度尼西亚',
          'south-africa': '南非',
          brazil: '巴西',
          other: '当前签发国家/地区',
        }[country]
      : {
          australia: 'Australia',
          usa: 'the United States',
          canada: 'Canada',
          malaysia: 'Malaysia',
          'united-kingdom': 'the United Kingdom',
          singapore: 'Singapore',
          philippines: 'the Philippines',
          indonesia: 'Indonesia',
          'south-africa': 'South Africa',
          brazil: 'Brazil',
          other: 'the selected issuing country',
        }[country];
  const priceText = price ? `A$${price}` : (locale === 'zh' ? '当前系统基础价' : 'the current system base rate');

  if (locale === 'zh') {
    switch (profile) {
      case 'company_record':
        return {
          title: '公司文件材料重点',
          pricingNote: `按你提供的价目表，${countryName}这类公司记录文件目前按 ${priceText} / 份估算，再叠加页数或附加项。`,
          requiredItems: [
            '文件扫描件或可识别版本',
            '文件主体或授权代表护照资料页',
            '如为 ASIC / ATO / 公司证书，请尽量提供完整版本',
            ...(country === 'malaysia' ? ['已填写的 embassy form 扫描件', '马来西亚身份证或中国身份证'] : []),
          ],
          handlingNotes: [
            '常见适用：ASIC 文件、公司证书、报告、invoice、agreement、constitution。',
            '多份公司文件通常可一起处理，但额外份数和页数会影响报价。',
            '如接收方后续要求原件、湿签或公司授权链，处理方式会升级。',
            ...(country === 'united-kingdom' ? ['英国公司文件常见是 registration certificate、articles 等，基础价会高于普通个人文件。'] : []),
          ],
          expedite: '该类文件通常可讨论加急，但前提是文件版本已经清晰可用。',
        };
      case 'company_signature':
        return {
          title: '公司签字文件材料重点',
          pricingNote: `按你提供的价目表，${countryName}这类公司签字文件目前按 ${priceText} / 份估算，再叠加页数或附加项。`,
          requiredItems: [
            '原件寄送到 EGS 地址',
            '董事 / 股东 / 授权代表护照资料页',
            '如涉及签署安排，请先确认签字版本不要反复更改',
            ...(country === 'malaysia' ? ['已填写的 embassy form 扫描件'] : []),
          ],
          handlingNotes: [
            '常见适用：公司 POA、授权文件、董事签字声明等。',
            '签字类公司文件通常比普通公司记录更依赖原件和签署结构。',
            '如签署方式或见证方式未锁定，不建议直接按加急预期处理。',
            ...(country === 'united-kingdom' || country === 'singapore' ? ['这类文件通常还会更依赖视频签字或律师/公证见证安排。'] : []),
          ],
          expedite: '可讨论加急，但通常要先确认原件、签署和见证路径。',
        };
      case 'police_check':
        return {
          title: '无犯罪材料重点',
          pricingNote: `按你提供的价目表，${countryName}这类无犯罪 / 警方证明目前按 ${priceText} / 份估算，再叠加附加项。`,
          requiredItems:
            country === 'usa'
              ? ['Original I-783 form', '两张原始指纹卡', '护照资料页', ...(serviceLevel === 'express' ? ['SSN number'] : [])]
              : country === 'canada'
                ? ['两份有效身份证明', '原始公证指纹卡 / 法证中心盖章指纹卡', 'International Fingerprinting Application Form', 'RCMP 授权表', '2 寸白底照片']
                : country === 'united-kingdom'
                  ? ['Police certificate application form', '当前住址证明', '彩色护照扫描件', '2 寸白底照片', '签字授权扫描件']
                  : country === 'singapore'
                    ? ['护照复印件', '新加坡 pass 复印件', '2 寸白底照片', '接收机构要求无犯罪的信件 / 截图', '十指指纹卡']
                    : country === 'malaysia'
                      ? ['是否曾申请过的账户信息', '电子白底证件照', '护照扫描件', '地址和电话', '工作 / 教育经历', '申请理由及证明']
                      : country === 'indonesia'
                        ? ['护照资料页扫描件', '入境小票', 'KITAS / 旧护照签证页 / 工作许可', '黄底证件照', '用途说明', '指纹扫描']
                        : country === 'south-africa'
                          ? ['护照和签证页扫描件', '居留许可及工作证明', '原始指纹卡', '无犯罪申请表']
                          : ['护照和身份证明', '驾照', '签证页 / Medicare / 水电账单 / 银行账单（任选其一）'],
          handlingNotes: [
            '这一档更接近 AFP NPC 申请 + apostille，而不是普通证书 copy lane。',
            '如文件不是 AFP NPC，而是海外无犯罪或已签发证明，价格和材料会不同。',
            '身份材料不完整时，时效会比页面估算明显变弱。',
          ],
          expedite: '若身份材料齐全，通常可以讨论加急；缺件时不要默认加急可行。',
        };
      case 'personal_signature':
        return {
          title: '个人签字文件材料重点',
          pricingNote: `按你提供的价目表，${countryName}这类个人签字文件目前按 ${priceText} / 份估算，再叠加页数或附加项。`,
          requiredItems: [
            '原件寄送到 EGS 地址',
            '护照资料页',
            '如需见证 / 宣誓，请先确认最终文本版本',
            ...(country === 'usa' || country === 'canada' ? ['签字过程视频或按当地要求的见证安排'] : []),
          ],
          handlingNotes: [
            '常见适用：个人委托书、声明书、同一人声明、关系声明等。',
            '签字类文件通常比普通证书更依赖原件处理。',
            '如文件已经由 JP / Legal Practitioner / Notary 见证，请在备注里写明。',
          ],
          expedite: '只有在原件和签字路径都已明确时，才适合讨论加急。',
        };
      case 'personal_certificate':
      default:
        return {
          title: '个人证书 / 学历文件材料重点',
          pricingNote: `按你提供的价目表，${countryName}这类个人证书或学历文件目前按 ${priceText} / 份估算，再叠加页数或附加项。`,
          requiredItems: [
            '原件或清晰可核验版本',
            '护照资料页',
            '如为学历件，尽量提供完整证书名称和学校版本',
            ...(country === 'philippines' ? ['授权书原件（如需代调文件）'] : []),
            ...(country === 'malaysia' ? ['embassy form 扫描件', '马来西亚身份证或中国身份证'] : []),
          ],
          handlingNotes: [
            '常见适用：出生证、结婚证、死亡证明、毕业证、成绩单、在读证明等。',
            '学历件和民事证书通常都落在这条基础档，但接收方是否要原件仍需复核。',
            '如果后续还需要翻译或最新补发件，应尽早说明。',
          ],
          expedite: '文件版本明确时通常可讨论加急；若还要补开或换版本，时效会延后。',
        };
    }
  }

  switch (profile) {
    case 'company_record':
      return {
        title: 'Commercial document checklist',
        pricingNote: `Based on your current pricing sheet, ${countryName} commercial-document work is estimated from ${priceText} per copy before page-based adjustments and add-ons.`,
        requiredItems: [
          'Scanned document or a clearly reviewable version',
          'Passport bio page for the document holder or authorised representative',
          'If this is an ASIC / ATO / company certificate file, provide the clearest full version available',
          ...(country === 'malaysia' ? ['Completed embassy form scan', 'Malaysian ID or PRC ID'] : []),
        ],
        handlingNotes: [
          'Typical fit: ASIC records, company certificates, reports, invoices, agreements, constitutions.',
          'Multiple company records can often be grouped, but extra copies and page count still affect pricing.',
          'If the receiving side later requires originals, wet-sign execution, or authority-chain support, handling may need to be upgraded.',
          ...(country === 'united-kingdom' ? ['UK company-document lanes are commonly priced above personal record lanes.'] : []),
        ],
        expedite: 'Expedite may be workable when the company record set is already clear and stable.',
      };
    case 'company_signature':
      return {
        title: 'Commercial signature-document checklist',
        pricingNote: `Based on your current pricing sheet, ${countryName} commercial signature documents are estimated from ${priceText} per copy before page-based adjustments and add-ons.`,
        requiredItems: [
          'Original document posted to EGS',
          'Passport bio page for the director / shareholder / authorised representative',
          'If execution is still being arranged, keep the final signing version stable before intake',
          ...(country === 'malaysia' ? ['Completed embassy form scan'] : []),
        ],
        handlingNotes: [
          'Typical fit: company POAs, authority letters, director-signed declarations.',
          'Company signature files are more execution-sensitive than standard corporate records.',
          'If the signing or witnessing path is still unsettled, rush handling should not be assumed.',
          ...(country === 'united-kingdom' || country === 'singapore' ? ['These lanes are often more dependent on lawyer/notary witnessing or video-signing setup.'] : []),
        ],
        expedite: 'Urgency can be reviewed only after originals and execution path are clear.',
      };
    case 'police_check':
      return {
        title: 'Police-check checklist',
        pricingNote: `Based on your current pricing sheet, ${countryName} police-certificate work is estimated from ${priceText} per copy before add-ons.`,
        requiredItems:
          country === 'usa'
            ? ['Original I-783 form', 'Two original fingerprint cards', 'Passport bio page', ...(serviceLevel === 'express' ? ['SSN number'] : [])]
            : country === 'canada'
              ? ['Two valid IDs', 'Original notarised or stamped fingerprint card', 'International Fingerprinting Application Form', 'RCMP disclosure authorisation', '2-inch white-background photo']
              : country === 'united-kingdom'
                ? ['Police certificate application form', 'Proof of current residential address', 'Colour passport scan', '2-inch white-background photo', 'Signed authorisation scan']
                : country === 'singapore'
                  ? ['Applicant passport copy', 'Singapore pass copy', '2-inch white-background photo', 'Requesting-authority letter or screenshot', 'Ten-fingerprint card']
                  : country === 'malaysia'
                    ? ['Prior application details if any', 'Digital passport photo', 'Passport scan', 'Address and phone details', 'Work / education history', 'Reason and supporting evidence']
                    : country === 'indonesia'
                      ? ['Passport bio page scan', 'Entry slip', 'KITAS / visa / work permit support', 'ID photo', 'Purpose of application', 'Fingerprint scan']
                      : country === 'south-africa'
                        ? ['Passport and visa-page scan', 'Residence permit and work certificate', 'Original fingerprint card', 'Police clearance application form']
                        : ['Passport and identity document', 'Driver licence', 'One of: visa page, Medicare card, utility bill, or bank statement'],
        handlingNotes: [
          'This lane is closer to AFP NPC application + apostille rather than a simple copy-based certificate lane.',
          'If the file is not an AFP NPC, but an overseas police clearance or an already-issued certificate, the pricing basis may change.',
          'Incomplete identity support weakens both route confidence and timing.',
        ],
        expedite: 'Expedite may be workable when identity materials are complete from the start.',
      };
    case 'personal_signature':
      return {
        title: 'Personal signature-document checklist',
        pricingNote: `Based on your current pricing sheet, ${countryName} personal signature documents are estimated from ${priceText} per copy before page-based adjustments and add-ons.`,
        requiredItems: [
          'Original document posted to EGS',
          'Passport bio page',
          'If witnessing / sworn execution is required, keep the final text stable before signing',
          ...(country === 'usa' || country === 'canada' ? ['Video-signing evidence or the required local witnessing arrangement'] : []),
        ],
        handlingNotes: [
          'Typical fit: personal POAs, declarations, same-person statements, relationship declarations.',
          'Signature-sensitive files usually depend more on original handling than standard civil certificates do.',
          'If the document has already been witnessed by a JP / Legal Practitioner / Notary, note that clearly at intake.',
        ],
        expedite: 'Expedite should only be considered once originals and execution path are already clear.',
      };
    case 'personal_certificate':
    default:
      return {
        title: 'Personal certificate / academic checklist',
        pricingNote: `Based on your current pricing sheet, ${countryName} personal certificates and academic documents are estimated from ${priceText} per copy before page-based adjustments and add-ons.`,
        requiredItems: [
          'Original document or a clearly reviewable version',
          'Passport bio page',
          'For academic records, provide the exact institution-issued version if possible',
          ...(country === 'philippines' ? ['Original authorisation letter if retrieval is needed'] : []),
          ...(country === 'malaysia' ? ['Completed embassy form scan', 'Malaysian ID or PRC ID'] : []),
        ],
        handlingNotes: [
          'Typical fit: birth, marriage, death, degree, transcript, enrollment-related documents.',
          'Academic and civil certificates usually sit in the same base lane, but the receiving side may still require originals.',
          'If translation or a fresh reissue may be needed later, flag that early.',
        ],
        expedite: 'Expedite is often more workable when the certificate version is already final and usable.',
      };
  }
}
