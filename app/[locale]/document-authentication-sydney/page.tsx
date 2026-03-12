import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { localizedPath, localizedUrl, resolveLocale } from '@/lib/i18n/locale';
import { buildPageMetadata, siteUrl } from '@/lib/seo';
import { AUSTRALIA_CITY_COVERAGE, AUSTRALIA_CITY_KEYWORDS } from '@/lib/australia-city-coverage';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);

  if (locale === 'zh') {
    return buildPageMetadata({
      locale,
      path: '/document-authentication-sydney',
      title: '悉尼文件认证服务｜EGS Verification',
      description:
        '悉尼文件认证协调服务，面向澳洲和海外签发文件，覆盖路径确认、材料审核、处理跟踪与全球寄送。',
      keywords: [
        '悉尼 文件认证',
        'document authentication sydney',
        'document authentication melbourne',
        'document authentication brisbane',
        'document authentication perth',
        'document authentication adelaide',
        '澳洲 文件 认证 服务',
        '公证 认证 悉尼',
        'Sydney apostille service',
        'Melbourne apostille service',
        '悉尼 海牙认证 服务',
        '悉尼 领事认证 服务',
      ],
    });
  }

  return buildPageMetadata({
    locale,
    path: '/document-authentication-sydney',
    title: 'Document Authentication Sydney Service | EGS Verification',
    description:
      'Document authentication coordination in Sydney for Australia-issued and overseas-issued documents, with route confirmation, review, status tracking, and dispatch support.',
    keywords: [
      'document authentication Sydney',
      ...AUSTRALIA_CITY_KEYWORDS,
      'document certification Sydney',
      'legalisation service Sydney',
      'Sydney apostille service',
      'Melbourne apostille service',
      'Brisbane apostille service',
      'Perth apostille service',
      'Sydney document legalisation',
      'notary and apostille Sydney',
    ],
  });
}

export default async function DocumentAuthenticationSydneyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  const isZh = locale === 'zh';
  const businessId = `${localizedUrl(locale, siteUrl)}#local-business`;
  const faq = isZh
    ? [
        { q: '只受理澳洲文件吗？', a: '不是。支持澳洲签发与海外签发文件的跨境使用协调。' },
        { q: '总部在哪里？', a: '总部位于悉尼，服务覆盖全球受理与寄送场景。' },
        { q: '人在墨尔本、布里斯班或其他澳洲城市，也可以办理吗？', a: '可以。悉尼总部统筹，墨尔本、布里斯班、珀斯、阿德莱德、堪培拉及其他澳洲城市都可通过在线受理、邮寄和回寄方式处理。' },
        { q: '是否提供法律意见？', a: '不提供。EGS 为独立行政协调机构。' },
        { q: '哪些文件最常见会进入 Sydney document authentication 流程？', a: '常见类别包括个人身份证明、学历文件、商业文件、授权书和部分法院或银行类文件，但每一类文件的起步形式和后续路径都可能不同。' },
        { q: '如果文件最终用于非海牙国家，会怎样？', a: '这通常意味着不只是 apostille，而是要先判断 authentication 与后续使馆或领馆环节是否存在。Sydney 页面更适合先回答“路径怎么分流”，而不是默认所有文件都走同一路。' },
        { q: '多个公司文件能否一起安排？', a: '有时可以，但要看接收方是否接受组合式文件组、是否需要分别签章，以及公司签署结构是否已经合格。' },
      ]
    : [
        { q: 'Do you only handle Australia-issued documents?', a: 'No. We coordinate cross-border use for both Australia-issued and overseas-issued documents.' },
        { q: 'Where is your headquarters?', a: 'EGS is headquartered in Sydney, with global intake and dispatch coverage.' },
        { q: 'Can I still use the service if I am in Melbourne, Brisbane, or another Australian city?', a: 'Yes. Coordination is run from Sydney, but clients in Melbourne, Brisbane, Perth, Adelaide, Canberra, and other Australian cities can still proceed through online intake, tracked mail, and return dispatch.' },
        { q: 'Do you provide legal advice?', a: 'No. EGS operates as an independent administrative intermediary.' },
        { q: 'What kinds of files most often come through a Sydney document authentication workflow?', a: 'Common categories include personal identity documents, academic records, commercial documents, powers of attorney, and some court or banking papers, but each category can still require a different starting format and route.' },
        { q: 'What changes if the document is for a non-Hague destination?', a: 'That usually means the workflow should not be described as apostille only. The file may need authentication logic and, depending on the destination, an embassy or consular follow-up stage as well.' },
        { q: 'Can multiple company documents be handled together?', a: 'Sometimes yes, but that depends on whether the receiving side accepts a grouped file set, whether separate certifications are required, and whether the company signing structure is already in order.' },
      ];

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: isZh ? '悉尼文件认证协调服务' : 'Document authentication Sydney coordination service',
    serviceType: isZh ? '文件认证协调' : 'Document authentication coordination',
    provider: {
      '@type': 'LocalBusiness',
      '@id': businessId,
    },
    areaServed: ['Australia', ...AUSTRALIA_CITY_COVERAGE],
    url: localizedUrl(locale, siteUrl, '/document-authentication-sydney'),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: isZh ? '首页' : 'Home',
        item: localizedUrl(locale, siteUrl),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: isZh ? '悉尼文件认证' : 'Document Authentication Sydney',
        item: localizedUrl(locale, siteUrl, '/document-authentication-sydney'),
      },
    ],
  };

  return (
    <Container>
      <Section>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <Card>
          <div className="stack-md">
            <p className="kicker">{isZh ? '服务页面' : 'Service page'}</p>
            <h1>{isZh ? '悉尼文件认证协调服务' : 'Document Authentication Sydney Coordination Service'}</h1>
            <p className="body-text">
              {isZh
                ? '由悉尼总部统筹的文件认证协调服务，支持澳洲签发与海外签发文件的跨境使用场景。除悉尼外，墨尔本、布里斯班、珀斯、阿德莱德、堪培拉及其他澳洲城市也可通过在线受理与邮寄方式办理。实际认证路径与处理时效以目的地和主管机构要求为准。'
                : 'Sydney-coordinated document authentication service for cross-border use of Australia-issued and overseas-issued documents. Clients in Melbourne, Brisbane, Perth, Adelaide, Canberra, and other Australian cities can also proceed through online intake and tracked mail. Final pathway and timeline still depend on destination and authority requirements.'}
            </p>
            <div className="actions">
              <Link className="btn btn-primary" href={localizedPath(locale, '/intake')}>
                {isZh ? '开始受理' : 'Begin Intake'}
              </Link>
              <Link className="btn btn-secondary" href={localizedPath(locale, '/track')}>
                {isZh ? '查询订单' : 'Track Order'}
              </Link>
            </div>
            <div className="stack-sm">
              <h2>{isZh ? 'Sydney document authentication 使用范围' : 'Sydney document authentication scope'}</h2>
              <ul className="list-plain">
                <li className="small-text">{isZh ? '悉尼总部统筹，支持全球用户在线受理' : 'Sydney HQ coordination with global online intake'}</li>
                <li className="small-text">{isZh ? '支持澳洲签发与海外签发文件路径' : 'Supports both Australia-issued and overseas-issued document routes'}</li>
                <li className="small-text">{isZh ? '墨尔本、布里斯班、珀斯、阿德莱德、堪培拉及其他澳洲城市可通过邮寄与回寄方式处理' : 'Melbourne, Brisbane, Perth, Adelaide, Canberra, and other Australian cities can proceed by tracked mail and return dispatch'}</li>
                <li className="small-text">{isZh ? '可按规则寄送至全球可达地址' : 'Dispatch to eligible international addresses where permitted'}</li>
              </ul>
            </div>
            <div className="stack-sm">
              <h2>{isZh ? '澳洲城市覆盖' : 'Australia-wide city coverage'}</h2>
              <p className="small-text">
                {isZh
                  ? '以下城市的客户通常都可在线提交 intake，再按要求邮寄或回寄文件。'
                  : 'Clients in the following cities can usually complete intake online and proceed by mail or return dispatch as required.'}
              </p>
              <p className="small-text">{AUSTRALIA_CITY_COVERAGE.join(' · ')}</p>
            </div>
            <div className="footer-links">
              <Link href={localizedPath(locale, '/apostille-australia')}>
                {isZh ? '查看海牙认证服务' : 'View Apostille Australia service'}
              </Link>
              <Link href={localizedPath(locale, '/consular-legalisation-australia')}>
                {isZh ? '查看领事认证服务' : 'View Consular Legalisation service'}
              </Link>
              <Link href={localizedPath(locale, '/guides')}>
                {isZh ? '查看搜索型指南库' : 'View search-intent guides'}
              </Link>
            </div>
          </div>
        </Card>
      </Section>
    </Container>
  );
}
