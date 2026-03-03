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
      title: '澳洲领事认证 Legalisation 服务｜EGS Certification',
      description: '面向非海牙目的地的领事认证协调服务，覆盖路径确认、材料要求、处理进度与寄送。 ',
      keywords: ['澳洲 领事认证', 'Legalisation 澳洲', '非海牙 认证', '使馆 认证 澳洲'],
      alternates: { canonical: `${siteUrl}/zh/consular-legalisation-australia` },
    };
  }

  return {
    title: 'Consular Legalisation Australia Service | EGS Certification',
    description: 'Consular legalisation coordination for non-Hague destinations, with route confirmation and tracking.',
    keywords: ['consular legalisation Australia', 'document legalisation Sydney', 'non Hague legalisation'],
    alternates: { canonical: `${siteUrl}/en/consular-legalisation-australia` },
  };
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
      ]
    : [
        { q: 'Are all non-Hague routes the same?', a: 'No. Pathways vary by destination and authority requirements.' },
        { q: 'Is express available?', a: 'Priority handling may be available, but final timing still depends on authority queues.' },
        { q: 'Can I track status?', a: 'Yes. Order status is available after intake through the tracking page.' },
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
            <h1>{isZh ? '澳洲领事认证（Legalisation）协调服务' : 'Consular Legalisation Australia Coordination Service'}</h1>
            <p className="body-text">
              {isZh
                ? '针对非海牙目的地文件使用场景，提供领事认证链路的行政协调服务。路径与时效受目的地和机构要求影响。'
                : 'Administrative coordination for consular legalisation pathways for non-Hague destinations. Route and timeline vary by destination and authority requirements.'}
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
                <li className="small-text">{isZh ? '最终受理由目的地机构独立决定' : 'Final acceptance is determined by destination authorities'}</li>
              </ul>
            </div>
            <div className="footer-links">
              <Link href={`/${locale}/apostille-australia`}>
                {isZh ? '查看海牙认证服务' : 'View Apostille Australia service'}
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
