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
      path: '/consular-legalisation-australia',
      title: '澳洲领事认证 Legalisation 服务｜EGS Verification',
      description:
        '面向非海牙目的地的澳洲领事认证协调服务，覆盖路径确认、材料准备、预计时效、进度跟踪与寄送安排。',
      keywords: [
        '澳洲 领事认证',
        'Legalisation 澳洲',
        '非海牙 认证',
        '使馆 认证 澳洲',
        '墨尔本 领事认证',
        '布里斯班 领事认证',
        '珀斯 领事认证',
        '澳洲 文件领事认证',
        '阿联酋 认证 澳洲',
        '中国使馆认证 澳洲文件',
      ],
    });
  }

  return buildPageMetadata({
    locale,
    path: '/consular-legalisation-australia',
    title: 'Consular Legalisation Australia Service | EGS Verification',
    description:
      'Consular legalisation coordination for non-Hague destinations, including route confirmation, document handling guidance, tracking, and dispatch support.',
    keywords: [
      'consular legalisation Australia',
      'document legalisation Sydney',
      ...AUSTRALIA_CITY_KEYWORDS,
      'non Hague legalisation',
      'embassy legalisation Australia',
      'consulate legalisation service',
      'document legalisation Melbourne',
      'document legalisation Brisbane',
      'document legalisation Perth',
      'Australia document legalisation',
    ],
  });
}

export default async function ConsularLegalisationAustraliaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  const isZh = locale === 'zh';
  const faq = isZh
    ? [
        { q: '非海牙目的地是否都一样？', a: '不同目的地要求不同，实际链路需按目的地与主管机构规则确认。' },
        { q: '是否可加急？', a: '可提供优先处理选项，但最终时效仍受机构排队影响。' },
        { q: '能否查询进度？', a: '可以，订单创建后可在追踪页面查看状态更新。' },
        { q: '人在墨尔本、布里斯班或其他澳洲城市，也可以办理领事认证吗？', a: '可以。由悉尼总部统筹，但墨尔本、布里斯班、珀斯、阿德莱德、堪培拉及其他澳洲城市的客户，通常都可以通过在线受理、邮寄和回寄方式办理。' },
      ]
    : [
        { q: 'Are all non-Hague routes the same?', a: 'No. Pathways vary by destination and authority requirements.' },
        { q: 'Is express available?', a: 'Priority handling may be available, but final timing still depends on authority queues.' },
        { q: 'Can I track status?', a: 'Yes. Order status is available after intake through the tracking page.' },
        { q: 'Can clients in Melbourne, Brisbane, or other Australian cities still arrange consular legalisation?', a: 'Yes. Coordination is run from Sydney, but clients in Melbourne, Brisbane, Perth, Adelaide, Canberra, and other Australian cities can usually proceed through online intake, tracked mail, and return dispatch.' },
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
    name: isZh ? '澳洲领事认证协调服务' : 'Consular legalisation Australia coordination service',
    serviceType: isZh ? '领事认证协调' : 'Consular legalisation coordination',
    provider: {
      '@type': 'Organization',
      name: 'EGS Verification',
      url: `${siteUrl}/${locale}`,
    },
    areaServed: ['Australia', ...AUSTRALIA_CITY_COVERAGE],
    url: `${siteUrl}/${locale}/consular-legalisation-australia`,
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
        name: isZh ? '澳洲领事认证' : 'Consular Legalisation Australia',
        item: `${siteUrl}/${locale}/consular-legalisation-australia`,
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
            <h1>{isZh ? '澳洲领事认证（Legalisation）协调服务' : 'Consular Legalisation Australia Coordination Service'}</h1>
            <p className="body-text">
              {isZh
                ? '针对非海牙目的地文件使用场景，提供领事认证链路的行政协调服务。由悉尼总部统筹，但墨尔本、布里斯班、珀斯、阿德莱德、堪培拉及其他澳洲城市的客户，通常也可通过在线受理与邮寄方式办理。'
                : 'Administrative coordination for consular legalisation pathways for non-Hague destinations. The work is coordinated from Sydney, but clients in Melbourne, Brisbane, Perth, Adelaide, Canberra, and other Australian cities can also proceed through online intake and tracked mail.'}
            </p>
            <div className="actions">
              <Link className="btn btn-primary" href={`/${locale}/intake`}>{isZh ? '开始受理' : 'Begin Intake'}</Link>
              <Link className="btn btn-secondary" href={`/${locale}/track`}>{isZh ? '查询订单' : 'Track Order'}</Link>
            </div>
            <div className="stack-sm">
              <h2>{isZh ? 'Consular Legalisation 常见场景' : 'Common consular legalisation scenarios'}</h2>
              <ul className="list-plain">
                <li className="small-text">{isZh ? '用于非海牙目的地的认证链路' : 'Used for non-Hague destination pathways'}</li>
                <li className="small-text">{isZh ? '可能涉及多机构环节与原件流转' : 'May involve multi-authority stages and original handling'}</li>
                <li className="small-text">{isZh ? '悉尼总部统筹，全澳城市通常可在线受理并邮寄办理' : 'Coordinated from Sydney, with online intake and mail handling available across Australian cities'}</li>
                <li className="small-text">{isZh ? '最终受理由目的地机构独立决定' : 'Final acceptance is determined by destination authorities'}</li>
              </ul>
            </div>
            <div className="stack-sm">
              <h2>{isZh ? '澳洲城市覆盖' : 'Australia-wide coverage'}</h2>
              <p className="small-text">{AUSTRALIA_CITY_COVERAGE.join(' · ')}</p>
            </div>
            <div className="footer-links">
              <Link href={`/${locale}/apostille-australia`}>
                {isZh ? '查看海牙认证服务' : 'View Apostille Australia service'}
              </Link>
              <Link href={`/${locale}/document-authentication-sydney`}>
                {isZh ? '查看悉尼文件认证服务' : 'View Document Authentication Sydney'}
              </Link>
              <Link href={`/${locale}/cities/melbourne/consular-authentication`}>
                {isZh ? '查看城市型领事认证页面' : 'View city-based consular pages'}
              </Link>
            </div>
          </div>
        </Card>
      </Section>
    </Container>
  );
}
