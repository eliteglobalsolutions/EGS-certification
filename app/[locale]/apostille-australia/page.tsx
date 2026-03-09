import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { resolveLocale } from '@/lib/i18n/locale';
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
      path: '/apostille-australia',
      title: '澳洲海牙认证 Apostille 服务｜EGS Verification',
      description:
        '澳洲文件海牙认证协调服务，覆盖路径确认、材料审核、预计时效、费用说明、受理跟踪与寄送安排。',
      keywords: [
        '澳洲 海牙认证',
        'Apostille 澳洲',
        '澳洲 文件认证',
        '悉尼 海牙认证',
        '墨尔本 海牙认证',
        '布里斯班 海牙认证',
        '珀斯 海牙认证',
        '澳洲 apostille service',
        '学历海牙认证 澳洲',
        '无犯罪海牙认证 澳洲',
      ],
    });
  }

  return buildPageMetadata({
    locale,
    path: '/apostille-australia',
    title: 'Apostille Australia Service | EGS Verification',
    description:
      'Apostille coordination for Australia-issued documents with route confirmation, document review, intake, milestone tracking, and dispatch support.',
    keywords: [
      'apostille Australia',
      'apostille Sydney',
      ...AUSTRALIA_CITY_KEYWORDS,
      'document apostille service',
      'Australia apostille service',
      'apostille Melbourne',
      'apostille Brisbane',
      'apostille Perth',
      'academic document apostille Australia',
      'police check apostille Australia',
    ],
  });
}

export default async function ApostilleAustraliaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  const isZh = locale === 'zh';
  const faq = isZh
    ? [
        { q: '是否保证通过？', a: '不保证。最终接受与有效性由相关主管机构独立决定。' },
        { q: '多久可以完成？', a: '为预估时效，具体取决于目的地与机构排队情况。' },
        { q: '可以先做路径确认吗？', a: '可以。建议先做路径确认，再进入正式受理。' },
        { q: '人在墨尔本、布里斯班或其他澳洲城市，也可以办理海牙认证吗？', a: '可以。由悉尼总部统筹，但墨尔本、布里斯班、珀斯、阿德莱德、堪培拉及其他澳洲城市的客户，通常都可以通过在线受理、邮寄和回寄方式办理。' },
      ]
    : [
        { q: 'Do you guarantee acceptance?', a: 'No. Final acceptance and validity are determined by competent authorities.' },
        { q: 'How long does it take?', a: 'Timelines are estimates and depend on destination requirements and authority queues.' },
        { q: 'Can route be confirmed first?', a: 'Yes. Route confirmation is recommended before formal intake.' },
        { q: 'Can clients in Melbourne, Brisbane, or other Australian cities still arrange apostille?', a: 'Yes. Coordination is run from Sydney, but clients in Melbourne, Brisbane, Perth, Adelaide, Canberra, and other Australian cities can usually proceed through online intake, tracked mail, and return dispatch.' },
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
    name: isZh ? '澳洲海牙认证协调服务' : 'Apostille Australia coordination service',
    serviceType: isZh ? '海牙认证协调' : 'Apostille coordination',
    provider: {
      '@type': 'Organization',
      name: 'EGS Verification',
      url: `${siteUrl}/${locale}`,
    },
    areaServed: ['Australia', ...AUSTRALIA_CITY_COVERAGE],
    url: `${siteUrl}/${locale}/apostille-australia`,
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: isZh ? '首页' : 'Home',
        item: `${siteUrl}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: isZh ? '澳洲海牙认证' : 'Apostille Australia',
        item: `${siteUrl}/${locale}/apostille-australia`,
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
            <h1>{isZh ? '澳洲海牙认证（Apostille）协调服务' : 'Apostille Australia Coordination Service'}</h1>
            <p className="body-text">
              {isZh
                ? '面向澳洲签发文件的海牙认证流程协调服务。由悉尼总部统筹，但墨尔本、布里斯班、珀斯、阿德莱德、堪培拉及其他澳洲城市的客户，通常都可通过在线受理与邮寄方式办理。'
                : 'Coordination service for apostille on Australia-issued documents. The work is coordinated from Sydney, but clients in Melbourne, Brisbane, Perth, Adelaide, Canberra, and other Australian cities can usually proceed through online intake and tracked mail.'}
            </p>
            <div className="actions">
              <Link className="btn btn-primary" href={`/${locale}/intake`}>{isZh ? '开始受理' : 'Begin Intake'}</Link>
              <Link className="btn btn-secondary" href={`/${locale}/track`}>{isZh ? '查询订单' : 'Track Order'}</Link>
            </div>
            <div className="stack-sm">
              <h2>{isZh ? 'Apostille Australia 常见场景' : 'Common apostille Australia scenarios'}</h2>
              <ul className="list-plain">
                <li className="small-text">{isZh ? '出生证、结婚证、学历文件、无犯罪记录' : 'Birth, marriage, academic, and police check documents'}</li>
                <li className="small-text">{isZh ? '先路径确认，再确认原件与扫描件要求' : 'Route confirmed first, then original/scan requirements'}</li>
                <li className="small-text">{isZh ? '悉尼总部统筹，全澳城市通常可在线受理并邮寄办理' : 'Coordinated from Sydney, with online intake and mail handling available across Australian cities'}</li>
                <li className="small-text">{isZh ? '可在追踪页查看里程碑状态更新' : 'Milestone updates available on the tracking page'}</li>
              </ul>
            </div>
            <div className="stack-sm">
              <h2>{isZh ? '澳洲城市覆盖' : 'Australia-wide coverage'}</h2>
              <p className="small-text">{AUSTRALIA_CITY_COVERAGE.join(' · ')}</p>
            </div>
            <div className="footer-links">
              <Link href={`/${locale}/consular-legalisation-australia`}>
                {isZh ? '查看领事认证服务' : 'View Consular Legalisation service'}
              </Link>
              <Link href={`/${locale}/document-authentication-sydney`}>
                {isZh ? '查看悉尼文件认证服务' : 'View Document Authentication Sydney'}
              </Link>
            </div>
          </div>
        </Card>
      </Section>
    </Container>
  );
}
