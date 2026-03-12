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
  const businessId = `${localizedUrl(locale, siteUrl)}#local-business`;
  const faq = isZh
    ? [
        { q: '是否保证通过？', a: '不保证。最终接受与有效性由相关主管机构独立决定。' },
        { q: '多久可以完成？', a: '为预估时效，具体取决于目的地与机构排队情况。' },
        { q: '可以先做路径确认吗？', a: '可以。建议先做路径确认，再进入正式受理。' },
        { q: '人在墨尔本、布里斯班或其他澳洲城市，也可以办理海牙认证吗？', a: '可以。由悉尼总部统筹，但墨尔本、布里斯班、珀斯、阿德莱德、堪培拉及其他澳洲城市的客户，通常都可以通过在线受理、邮寄和回寄方式办理。' },
        { q: '哪些文件最常见会进入 apostille 路径？', a: '常见类别包括出生证、结婚证、学历文件、无犯罪记录，以及某些已经完成公证准备的私人文件或公司文件。真正是否适合 apostille，仍取决于文件类别、当前格式和目的地要求。' },
        { q: '如果我有很多份文件，是否一定每份都要单独处理？', a: '不一定。是否可以合并处理，要看目的地接受标准、文件之间是否属于同一组，以及最终需要的是单独证明还是组合式处理。' },
        { q: '海外签发的学历或证书能直接在澳洲做 apostille 吗？', a: '通常不能直接按澳洲签发文件处理。若文件并非澳洲机构签发，通常应先确认签发国的主管机关和 legalisation 路径。' },
        { q: '公司文件是不是天然就能直接进 DFAT？', a: '不是。很多公司文件需要先完成适当的签署、认证或公证结构，之后才能进入后续 legalisation 环节。' },
      ]
    : [
        { q: 'Do you guarantee acceptance?', a: 'No. Final acceptance and validity are determined by competent authorities.' },
        { q: 'How long does it take?', a: 'Timelines are estimates and depend on destination requirements and authority queues.' },
        { q: 'Can route be confirmed first?', a: 'Yes. Route confirmation is recommended before formal intake.' },
        { q: 'Can clients in Melbourne, Brisbane, or other Australian cities still arrange apostille?', a: 'Yes. Coordination is run from Sydney, but clients in Melbourne, Brisbane, Perth, Adelaide, Canberra, and other Australian cities can usually proceed through online intake, tracked mail, and return dispatch.' },
        { q: 'What kinds of documents most commonly move into an apostille pathway?', a: 'Common categories include birth and marriage certificates, academic records, police checks, and some private or company documents once they are in the correct form. The real answer still depends on document class, current format, and destination-side requirements.' },
        { q: 'If I have multiple documents, do they always need separate apostille handling?', a: 'Not always. Whether documents can be handled together depends on destination acceptance, whether they belong in the same file set, and whether separate certifications are required.' },
        { q: 'Can overseas-issued academic documents be apostilled in Australia?', a: 'Usually not through the same Australian-issued document pathway. If the document was issued outside Australia, the issuing country’s own legalisation chain usually needs to be checked first.' },
        { q: 'Do company documents automatically go straight to DFAT?', a: 'No. Many company documents need the right signing, certification, or notarial structure before they are ready for the legalisation stage.' },
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
      '@type': 'LocalBusiness',
      '@id': businessId,
    },
    areaServed: ['Australia', ...AUSTRALIA_CITY_COVERAGE],
    url: localizedUrl(locale, siteUrl, '/apostille-australia'),
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
        name: isZh ? '澳洲海牙认证' : 'Apostille Australia',
        item: localizedUrl(locale, siteUrl, '/apostille-australia'),
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
              <Link className="btn btn-primary" href={localizedPath(locale, '/intake')}>{isZh ? '开始受理' : 'Begin Intake'}</Link>
              <Link className="btn btn-secondary" href={localizedPath(locale, '/track')}>{isZh ? '查询订单' : 'Track Order'}</Link>
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
              <h2>{isZh ? '正式受理前常见复核点' : 'Common pre-intake review points'}</h2>
              <ul className="list-plain">
                <li className="small-text">{isZh ? '文件是否为登记机构原件、官方原始签发件，或已经完成合格公证的版本' : 'Whether the file is a registry original, official original issue, or a properly notarised version'}</li>
                <li className="small-text">{isZh ? '目的地机构要的是 apostille、authentication，还是更长的领馆链路' : 'Whether the receiving side actually needs apostille, authentication, or a longer consular chain'}</li>
                <li className="small-text">{isZh ? '多份文件能否并组，还是需要分别出具证明' : 'Whether multiple documents can travel as one set or need separate certifications'}</li>
                <li className="small-text">{isZh ? '学历、商业和私人签署文件是否还缺前置步骤' : 'Whether academic, commercial, or privately signed files still need an upstream step before submission'}</li>
              </ul>
            </div>
            <div className="stack-sm">
              <h2>{isZh ? '澳洲城市覆盖' : 'Australia-wide coverage'}</h2>
              <p className="small-text">{AUSTRALIA_CITY_COVERAGE.join(' · ')}</p>
            </div>
            <div className="footer-links">
              <Link href={localizedPath(locale, '/consular-legalisation-australia')}>
                {isZh ? '查看领事认证服务' : 'View Consular Legalisation service'}
              </Link>
              <Link href={localizedPath(locale, '/document-authentication-sydney')}>
                {isZh ? '查看悉尼文件认证服务' : 'View Document Authentication Sydney'}
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
