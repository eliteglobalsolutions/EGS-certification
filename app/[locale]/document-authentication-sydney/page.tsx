import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { resolveLocale } from '@/lib/i18n/locale';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.eliteglobalsolutions.co';

  if (locale === 'zh') {
    return {
      title: '悉尼文件认证服务｜EGS Certification',
      description:
        '悉尼文件认证协调服务：面向澳洲和海外签发文件，覆盖路径确认、受理、处理跟踪与寄送。',
      keywords: ['悉尼 文件认证', 'document authentication sydney', '澳洲 文件 认证 服务', '公证 认证 悉尼'],
      alternates: { canonical: `${siteUrl}/zh/document-authentication-sydney` },
    };
  }

  return {
    title: 'Document Authentication Sydney Service | EGS Certification',
    description:
      'Document authentication coordination in Sydney for Australia-issued and overseas-issued documents, with route check and status tracking.',
    keywords: ['document authentication Sydney', 'document certification Sydney', 'legalisation service Sydney'],
    alternates: { canonical: `${siteUrl}/en/document-authentication-sydney` },
  };
}

export default async function DocumentAuthenticationSydneyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  const isZh = locale === 'zh';
  const faq = isZh
    ? [
        { q: '只受理澳洲文件吗？', a: '不是。支持澳洲签发与海外签发文件的跨境使用协调。' },
        { q: '总部在哪里？', a: '总部位于悉尼，服务覆盖全球受理与寄送场景。' },
        { q: '是否提供法律意见？', a: '不提供。EGS 为独立行政协调机构。' },
      ]
    : [
        { q: 'Do you only handle Australia-issued documents?', a: 'No. We coordinate cross-border use for both Australia-issued and overseas-issued documents.' },
        { q: 'Where is your headquarters?', a: 'EGS is headquartered in Sydney, with global intake and dispatch coverage.' },
        { q: 'Do you provide legal advice?', a: 'No. EGS operates as an independent administrative intermediary.' },
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

  return (
    <Container>
      <Section>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <Card>
          <div className="stack-md">
            <p className="kicker">{isZh ? '服务页面' : 'Service page'}</p>
            <h1>{isZh ? '悉尼文件认证协调服务' : 'Document Authentication Sydney Coordination Service'}</h1>
            <p className="body-text">
              {isZh
                ? '由悉尼总部统筹的文件认证协调服务，支持澳洲签发与海外签发文件的跨境使用场景。实际认证路径与处理时效以目的地和主管机构要求为准。'
                : 'Sydney-coordinated document authentication service for cross-border use of Australia-issued and overseas-issued documents. Final pathway and timeline depend on destination and authority requirements.'}
            </p>
            <div className="actions">
              <Link className="btn btn-primary" href={`/${locale}/intake`}>
                {isZh ? '开始受理' : 'Begin Intake'}
              </Link>
              <Link className="btn btn-secondary" href={`/${locale}/track`}>
                {isZh ? '查询订单' : 'Track Order'}
              </Link>
            </div>
            <div className="stack-sm">
              <h2>{isZh ? 'Sydney document authentication 使用范围' : 'Sydney document authentication scope'}</h2>
              <ul className="list-plain">
                <li className="small-text">{isZh ? '悉尼总部统筹，支持全球用户在线受理' : 'Sydney HQ coordination with global online intake'}</li>
                <li className="small-text">{isZh ? '支持澳洲签发与海外签发文件路径' : 'Supports both Australia-issued and overseas-issued document routes'}</li>
                <li className="small-text">{isZh ? '可按规则寄送至全球可达地址' : 'Dispatch to eligible international addresses where permitted'}</li>
              </ul>
            </div>
            <div className="footer-links">
              <Link href={`/${locale}/apostille-australia`}>
                {isZh ? '查看海牙认证服务' : 'View Apostille Australia service'}
              </Link>
              <Link href={`/${locale}/consular-legalisation-australia`}>
                {isZh ? '查看领事认证服务' : 'View Consular Legalisation service'}
              </Link>
            </div>
          </div>
        </Card>
      </Section>
    </Container>
  );
}
