import type { Locale } from '@/lib/i18n/dictionaries';
import { DESTINATIONS } from '@/lib/catalog';
import { getSearchEntry } from '@/lib/search-entry-data';

type PrefillInput = {
  locale: Locale;
  issuingSlug?: string;
  destinationSlug?: string;
  documentSlug?: string;
};

type PrefillValues = {
  issuingCountry?: string;
  destinationCountry?: string;
  destinationCode?: string;
  documentType?: string;
};

const destinationAliases: Record<string, string> = {
  usa: 'United States',
  'united-states': 'United States',
  'united-kingdom': 'United Kingdom',
  'hong-kong': 'Hong Kong (China)',
};

const destinationAliasesZh: Record<string, string> = {
  usa: '美国',
  'united-states': '美国',
  'united-kingdom': '英国',
  'hong-kong': '香港（中国）',
};

const documentAliases: Record<string, { en: string; zh: string }> = {
  'birth-certificate': { en: 'Birth Certificate', zh: '出生证明' },
  'marriage-certificate': { en: 'Marriage Certificate', zh: '结婚证' },
  'degree-certificate': { en: 'Degree Certificate', zh: '学历证书' },
  'academic-transcript': { en: 'Academic Transcript', zh: '成绩单' },
  'enrollment-letter': { en: 'Enrollment Letter', zh: '在读证明' },
  'offer-letter': { en: 'Offer Letter', zh: '录取通知' },
  'police-check': { en: 'Police Check', zh: '无犯罪记录' },
  'power-of-attorney': { en: 'Power of Attorney', zh: '委托书' },
  'company-documents': { en: 'Company Documents', zh: '公司文件' },
  'statutory-declaration': { en: 'Statutory Declaration', zh: '法定声明' },
};

export const DOCUMENT_TYPE_SUGGESTIONS: Record<Locale, string[]> = {
  en: [
    'AFP National Police Certificate',
    'Academic Transcript',
    'Academic Documents',
    'ABN Extract',
    'ASIC Business Name Extract',
    'ASIC Certificate of Registration',
    'ASIC Current Company Extract',
    'ASIC Current & Historical Company Extract',
    'ASIC Company Statement',
    'Bank Statement',
    'Birth Certificate',
    'Certificate of Free Sale (TGA)',
    'Certificate of Good Standing',
    'Certificate of Incorporation as an Association',
    'Certificate of Residency (ATO)',
    'Change of Name Certificate',
    'Citizenship Certificate',
    'Company Constitution',
    'Company Documents',
    'Court Document',
    'Death Certificate',
    'Degree Certificate',
    'Diploma',
    'Divorce Order',
    'Drivers Licence',
    'Employment Document',
    'Enrollment Letter',
    'Financial Statement',
    'Letter of Service',
    'Marriage Certificate',
    'Medical Report',
    'Medicare Card',
    'Offer Letter',
    'Passport',
    'Payslip',
    'Pension Entitlement Letter',
    'Police Check',
    'Power of Attorney',
    'Professional Qualification or Registration',
    'Proof of Address',
    'Relationship Certificate',
    'School Document',
    'Single Status Certificate',
    'Statutory Declaration',
    'Testamur',
    'Transcript',
    'University Document',
    'VEVO Check',
    'Written Reference',
  ],
  zh: [
    'AFP 无犯罪记录',
    'ABN 摘录',
    'ASIC 商业名称摘录',
    'ASIC 注册证书',
    'ASIC 公司当前摘录',
    'ASIC 公司当前及历史摘录',
    'ASIC 公司报表',
    'ATO 税务居民证明',
    'TGA 自由销售证书',
    '上岗 / 就业文件',
    '公司文件',
    '公司章程',
    '出生证明',
    '单身证明',
    '医学报告',
    '在读证明',
    '大学文件',
    '学历文件',
    '学历证书',
    '学校文件',
    '婚姻关系证明',
    '委托书',
    '居住地址证明',
    '成绩单',
    '护照',
    '养老金 entitlement letter',
    '执业资格 / 注册证明',
    '成绩记录',
    '授课 / 学籍证明',
    '改名证明',
    '无犯罪记录',
    '死亡证明',
    '毕业证',
    '法院文件',
    '测试姆 / Testamur',
    '澳洲签证 VEVO 查询',
    '录取通知',
    '授权书',
    '收入单 / Payslip',
    '文书声明 / Written Reference',
    '服务证明 / Letter of Service',
    '法定声明',
    '注册协会成立证书',
    '注册证书 / Citizenship Certificate',
    '离婚令',
    '结婚证',
    '自由销售证书',
    '良好存续证明',
    '财政报表',
    '身份证明 / Medicare Card',
    '身份证明文件',
    '银行流水',
    '驾驶证',
  ],
};

export function buildPrefillValues({
  locale,
  issuingSlug,
  destinationSlug,
  documentSlug,
}: PrefillInput): PrefillValues {
  const values: PrefillValues = {};

  if (issuingSlug) {
    const issuing = getSearchEntry('issuing', issuingSlug);
    if (issuing) {
      values.issuingCountry = issuing.name[locale].replace(/-issued documents$/i, '').replace(/签发文件$/, '');
    }
  }

  if (destinationSlug) {
    const destinationName =
      locale === 'zh'
        ? destinationAliasesZh[destinationSlug]
        : destinationAliases[destinationSlug];
    const matched = DESTINATIONS.find((item) =>
      destinationName
        ? (locale === 'zh' ? item.zh === destinationName : item.en === destinationName)
        : item.code.toLowerCase() === destinationSlug.toLowerCase() ||
          item.en.toLowerCase() === destinationSlug.replace(/-/g, ' ') ||
          item.zh === destinationSlug,
    );

    if (matched) {
      values.destinationCountry = locale === 'zh' ? matched.zh : matched.en;
      values.destinationCode = matched.code;
    } else if (destinationName) {
      values.destinationCountry = destinationName;
    }
  }

  if (documentSlug && documentAliases[documentSlug]) {
    values.documentType = documentAliases[documentSlug][locale];
  }

  return values;
}

export function buildPrefillHref(
  locale: Locale,
  path: string,
  input: PrefillInput,
) {
  const values = buildPrefillValues(input);
  const params = new URLSearchParams();

  if (values.issuingCountry) params.set('issuingCountry', values.issuingCountry);
  if (values.destinationCountry) params.set('destinationCountry', values.destinationCountry);
  if (values.destinationCode) params.set('destinationCode', values.destinationCode);
  if (values.documentType) params.set('documentType', values.documentType);

  const query = params.toString();
  return `/${locale}${path}${query ? `?${query}` : ''}`;
}

export function findDestinationMatch(value: string) {
  const query = value.trim().toLowerCase();
  if (!query) return undefined;

  return DESTINATIONS.find((item) => {
    const normalizedEn = item.en.toLowerCase();
    const normalizedZh = item.zh;
    return (
      item.code.toLowerCase() === query ||
      normalizedEn === query ||
      normalizedEn.replace(/\s+/g, '-') === query ||
      normalizedZh === value.trim() ||
      normalizedEn === destinationAliases[query]?.toLowerCase() ||
      normalizedZh === destinationAliasesZh[query]
    );
  });
}
