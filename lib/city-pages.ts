type Locale = 'en' | 'zh';

export type SupportedCitySlug = 'melbourne' | 'brisbane' | 'adelaide' | 'canberra';

type CityPage = {
  slug: SupportedCitySlug;
  name: { en: string; zh: string };
  state: { en: string; zh: string };
  title: { en: string; zh: string };
  description: { en: string; zh: string };
  keywords: string[];
  intro: { en: string; zh: string };
  bullets: Array<{ en: string; zh: string }>;
  faq: Array<{ q: { en: string; zh: string }; a: { en: string; zh: string } }>;
};

const cityPages: CityPage[] = [
  {
    slug: 'melbourne',
    name: { en: 'Melbourne', zh: '墨尔本' },
    state: { en: 'Victoria', zh: '维州' },
    title: {
      en: 'Apostille and document authentication Melbourne',
      zh: '墨尔本海牙认证与文件认证',
    },
    description: {
      en: 'A Melbourne-focused landing page for apostille, document authentication, and legalisation coordination, with Sydney-run intake, tracked mail, and route review.',
      zh: '面向墨尔本搜索意图的海牙认证、文件认证与 legalisation 协调页面，说明由悉尼统筹的受理、邮寄和路线复核方式。',
    },
    keywords: [
      'apostille Melbourne',
      'document authentication Melbourne',
      'legalisation Melbourne',
      'apostille service Melbourne',
    ],
    intro: {
      en: 'Clients in Melbourne usually do not need a separate legalisation system. In practice, the work is coordinated from Sydney, while Melbourne-origin clients can proceed through online intake, document review, tracked dispatch, and return delivery.',
      zh: '墨尔本客户通常并不需要一套完全独立的认证体系。实务上，案件仍可由悉尼统筹，而墨尔本客户通过在线受理、文件复核、可追踪寄送和回寄即可推进。',
    },
    bullets: [
      { en: 'Suitable for personal, academic, and many commercial document lanes', zh: '适用于个人、学历以及不少商业文件路径' },
      { en: 'Route review still matters before payment or dispatch', zh: '在付款或寄送前仍应先做路线复核' },
      { en: 'Melbourne location changes logistics, not the underlying authority rules', zh: '墨尔本地点主要改变物流，不改变底层主管机关规则' },
    ],
    faq: [
      {
        q: { en: 'Can Melbourne clients still use a Sydney-coordinated apostille service?', zh: '墨尔本客户也能走悉尼统筹的 apostille 服务吗？' },
        a: { en: 'Yes. The city affects handling logistics more than the legal route itself.', zh: '可以。城市主要影响物流安排，而不是法律路径本身。' },
      },
      {
        q: { en: 'Do Melbourne university documents always go straight to apostille?', zh: '墨尔本大学文件一定直接走 apostille 吗？' },
        a: { en: 'Not automatically. The document class, issuing structure, and destination-side requirement still need checking.', zh: '不一定。仍要先看文件类别、签发结构和目的地要求。' },
      },
    ],
  },
  {
    slug: 'brisbane',
    name: { en: 'Brisbane', zh: '布里斯班' },
    state: { en: 'Queensland', zh: '昆州' },
    title: {
      en: 'Apostille and document authentication Brisbane',
      zh: '布里斯班海牙认证与文件认证',
    },
    description: {
      en: 'A Brisbane search-intent page covering apostille, DFAT pathway review, document authentication, and practical intake from Queensland.',
      zh: '面向布里斯班搜索意图的页面，覆盖 apostille、DFAT 路线复核、文件认证以及昆州客户的实际受理方式。',
    },
    keywords: [
      'apostille Brisbane',
      'document authentication Brisbane',
      'legalisation Brisbane',
      'apostille service Brisbane',
    ],
    intro: {
      en: 'Brisbane clients often search for a local city solution, but the operational question is usually document readiness rather than postcode. A Queensland-based file can still move efficiently through review, intake, and dispatch without the client being in Sydney.',
      zh: '布里斯班客户常常会先找本地城市解法，但实务上更关键的通常不是邮编，而是文件是否已经准备好。昆州客户的案件同样可以在不身处悉尼的情况下，通过复核、受理和寄送高效推进。',
    },
    bullets: [
      { en: 'Useful for apostille, authentication, and mixed destination routes', zh: '适用于 apostille、authentication 及混合目的地路线' },
      { en: 'Queensland clients can still proceed by tracked mail', zh: '昆州客户同样可以通过可追踪邮寄推进' },
      { en: 'The receiving country still determines whether apostille is the right route', zh: '最终是否走 apostille 仍由目的地决定' },
    ],
    faq: [
      {
        q: { en: 'Do Brisbane clients need to visit Sydney in person?', zh: '布里斯班客户需要亲自到悉尼吗？' },
        a: { en: 'Usually no. Most matters can be handled through remote intake and tracked dispatch if the document path is clear.', zh: '通常不需要。只要文件路径清楚，多数案件都能通过远程受理和可追踪寄送处理。' },
      },
      {
        q: { en: 'Can Queensland-issued civil documents be reviewed remotely first?', zh: '昆州签发的民事文件能先远程预审吗？' },
        a: { en: 'Yes. A remote pre-review is often the best way to confirm format before any physical submission.', zh: '可以。先做远程预审通常是确认格式的最佳方式。' },
      },
    ],
  },
  {
    slug: 'adelaide',
    name: { en: 'Adelaide', zh: '阿德莱德' },
    state: { en: 'South Australia', zh: '南澳' },
    title: {
      en: 'Apostille and document legalisation Adelaide',
      zh: '阿德莱德海牙认证与文件认证',
    },
    description: {
      en: 'An Adelaide landing page for apostille and document legalisation search intent, focusing on route review, document form, and dispatch from South Australia.',
      zh: '面向阿德莱德搜索意图的海牙认证与文件 legalisation 页面，重点说明路线复核、文件形式与南澳客户寄送安排。',
    },
    keywords: [
      'apostille Adelaide',
      'document legalisation Adelaide',
      'document authentication Adelaide',
      'apostille service Adelaide',
    ],
    intro: {
      en: 'Adelaide clients usually need clarity on whether the file can move remotely and whether the city changes the legalisation logic. In most cases, Adelaide changes the handling path only at the logistics layer. The route itself still depends on document class and destination rules.',
      zh: '阿德莱德客户通常最关心两件事：文件能否远程办理，以及城市本身会不会改变认证逻辑。大多数情况下，阿德莱德只改变物流层，不改变认证路线本身。真正决定路线的仍是文件类别和目的地规则。',
    },
    bullets: [
      { en: 'Strong fit for civil, academic, and selected company documents', zh: '适合民事、学历和部分公司文件' },
      { en: 'Adelaide location does not remove the need for route confirmation', zh: '身在阿德莱德也不意味着可以跳过路线确认' },
      { en: 'Grouped company files should be checked before promising combined handling', zh: '公司文件是否能组合处理，应先复核再承诺' },
    ],
    faq: [
      {
        q: { en: 'Can Adelaide company documents be legalised as one set?', zh: '阿德莱德公司文件能否作为一组一起处理？' },
        a: { en: 'Sometimes yes, but only if the receiving side and signing structure support grouped handling.', zh: '有时可以，但前提是接收方和签署结构都允许组合处理。' },
      },
      {
        q: { en: 'Is apostille always the right route for Adelaide files?', zh: '阿德莱德文件一定都走 apostille 吗？' },
        a: { en: 'No. The city does not decide the route. The destination and document type do.', zh: '不是。城市并不决定路线，决定路线的是目的地和文件类型。' },
      },
    ],
  },
  {
    slug: 'canberra',
    name: { en: 'Canberra', zh: '堪培拉' },
    state: { en: 'ACT', zh: '首都领地' },
    title: {
      en: 'Apostille and document authentication Canberra',
      zh: '堪培拉海牙认证与文件认证',
    },
    description: {
      en: 'A Canberra search page for apostille, authentication, and legalisation matters, with emphasis on route review and embassy-sensitive pathways.',
      zh: '面向堪培拉搜索意图的 apostille、authentication 和 legalisation 页面，重点说明路线复核和使馆敏感型路径。',
    },
    keywords: [
      'apostille Canberra',
      'document authentication Canberra',
      'legalisation Canberra',
      'apostille service Canberra',
    ],
    intro: {
      en: 'Canberra search intent often overlaps with embassy-sensitive matters because users associate the city with consular handling. That does not mean every Canberra query is a consular file, but it does mean route review should be especially clear where authentication, embassy, and destination-side acceptance might all interact.',
      zh: '堪培拉搜索意图常常和使馆敏感型案件重叠，因为用户会把这座城市和领事流程联想到一起。这并不意味着所有 Canberra 搜索都是使馆案，但确实意味着：凡是 authentication、使馆环节和目的地接受标准相互交叉的案件，都更需要清晰路线复核。',
    },
    bullets: [
      { en: 'Useful for apostille, authentication, and embassy-sensitive route screening', zh: '适合 apostille、authentication 和使馆敏感型路线筛查' },
      { en: 'Canberra searchers often need route clarification before cost or timing', zh: '搜索 Canberra 的用户常常应先明确路线，再谈价格和时效' },
      { en: 'Consular matters should not be mislabeled as apostille just because of search wording', zh: '不能因为搜索词习惯就把领馆案误写成 apostille' },
    ],
    faq: [
      {
        q: { en: 'Does a Canberra query usually mean embassy legalisation?', zh: '搜 Canberra 是否通常意味着使馆认证？' },
        a: { en: 'Not always, but it often signals that the route may be embassy-sensitive and should be checked carefully.', zh: '不一定，但常常意味着这条路径可能对使馆环节更敏感，值得更仔细复核。' },
      },
      {
        q: { en: 'Can apostille and consular routes both appear in Canberra-related searches?', zh: '和 Canberra 相关的搜索里会同时出现 apostille 和领馆路线吗？' },
        a: { en: 'Yes. That is why route pages and pre-intake review are especially important for Canberra search intent.', zh: '会。这也是为什么面对 Canberra 搜索意图时，路线页和受理前复核特别重要。' },
      },
    ],
  },
];

export function getCityPage(slug: string) {
  return cityPages.find((city) => city.slug === slug);
}

export function getCityPageSlugs() {
  return cityPages.map((city) => city.slug);
}

export function getCityPages() {
  return cityPages;
}

export function cityCopy(locale: Locale, value: { en: string; zh: string }) {
  return value[locale];
}
