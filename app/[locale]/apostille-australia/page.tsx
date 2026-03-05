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
      title: '澳洲海牙认证 Apostille 服务｜ELITE GLOBAL SOLUTIONS PTY LTD',
      description: '澳洲文件海牙认证协调服务：先确认路径、材料、时效和费用，再进入受理流程。',
      keywords: ['澳洲 海牙认证', 'Apostille 澳洲', '澳洲 文件认证', '悉尼 海牙认证'],
      alternates: { canonical: `${siteUrl}/zh/apostille-australia` },
    };
  }

  return {
    title: 'Apostille Australia Service | ELITE GLOBAL SOLUTIONS PTY LTD',
    description: 'Apostille coordination for Australia-issued documents with route check, intake, and tracking.',
    keywords: ['apostille Australia', 'apostille Sydney', 'document apostille service'],
    alternates: { canonical: `${siteUrl}/en/apostille-australia` },
  };
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
      ]
    : [
        { q: 'Do you guarantee acceptance?', a: 'No. Final acceptance and validity are determined by competent authorities.' },
        { q: 'How long does it take?', a: 'Timelines are estimates and depend on destination requirements and authority queues.' },
        { q: 'Can route be confirmed first?', a: 'Yes. Route confirmation is recommended before formal intake.' },
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
            <h1>{isZh ? '澳洲海牙认证（Apostille）协调服务' : 'Apostille Australia Coordination Service'}</h1>
            <p className="body-text">
              {isZh
                ? '面向澳洲签发文件的海牙认证流程协调服务。先做路径确认，再进行文件受理、处理节点跟踪与寄送。'
                : 'Coordination service for apostille on Australia-issued documents, with route confirmation, secure intake, milestone tracking, and dispatch.'}
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
                <li className="small-text">{isZh ? '可在追踪页查看里程碑状态更新' : 'Milestone updates available on the tracking page'}</li>
              </ul>
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
