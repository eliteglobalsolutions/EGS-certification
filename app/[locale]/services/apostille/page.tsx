import type { Metadata } from 'next';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { InfoRow } from '@/components/ui/InfoRow';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { localizedPath, localizedUrl, resolveLocale } from '@/lib/i18n/locale';
import { buildPageMetadata, siteUrl } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);

  return buildPageMetadata({
    locale,
    path: '/services/apostille',
    title:
      locale === 'zh'
        ? '海牙认证服务｜澳洲及海外文件 Apostille 路线说明'
        : 'Apostille Service | Apostille route guidance for Australia and overseas documents',
    description:
      locale === 'zh'
        ? '查看 EGS 的 Apostille 服务说明：常见文件类型、适用国家、基本流程、时间范围与 intake 前需要确认的事项。'
        : 'Review EGS apostille service guidance for Australia-issued and overseas-issued documents, including common file types, country fit, route steps, and intake-first checks.',
    keywords: locale === 'zh'
      ? ['海牙认证服务', 'apostille 澳洲', '文件用于海外', '文件认证路线']
      : ['apostille service', 'apostille Australia', 'document apostille route', 'documents for overseas use'],
  });
}

export default async function ApostilleServicePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  const businessId = `${localizedUrl(locale, siteUrl, '')}#local-business`;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: locale === 'zh' ? '首页' : 'Home', item: localizedUrl(locale, siteUrl, '') },
      { '@type': 'ListItem', position: 2, name: locale === 'zh' ? '服务' : 'Services', item: localizedUrl(locale, siteUrl, '/services') },
      { '@type': 'ListItem', position: 3, name: locale === 'zh' ? '海牙认证服务' : 'Apostille service', item: localizedUrl(locale, siteUrl, '/services/apostille') },
    ],
  };

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: locale === 'zh' ? '海牙认证协调服务' : 'Apostille coordination service',
    provider: {
      '@type': 'LocalBusiness',
      '@id': businessId,
    },
    areaServed: 'Worldwide',
    serviceType: 'Apostille coordination',
    url: localizedUrl(locale, siteUrl, '/services/apostille'),
  };

  return (
    <Container>
      <Section>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />

        <Card>
          <PageHeader
            kicker={locale === 'zh' ? 'Apostille 服务' : 'Apostille service'}
            title={locale === 'zh' ? '海牙认证服务' : 'Apostille service'}
            subtitle={
              locale === 'zh'
                ? '适用于文件拟用于海牙公约成员国的常见场景。公开页面只说明通常的路径逻辑，最终仍以签发地、目的地和接收机构要求为准。'
                : 'Used where documents are intended for Hague Apostille Convention destinations. Public pages explain the usual route logic only; final handling still depends on issuing country, destination, and receiving-side requirements.'
            }
            actions={[
              { label: locale === 'zh' ? 'Check My Route' : 'Check My Route', href: `${localizedPath(locale)}#route-checker`, variant: 'secondary' },
              { label: locale === 'zh' ? 'Begin Intake' : 'Begin Intake', href: localizedPath(locale, '/intake'), variant: 'primary' },
            ]}
          />
        </Card>

        <Card muted>
          <div className="stack-md">
            <h2>{locale === 'zh' ? '常见适用场景' : 'Common use cases'}</h2>
            <div className="grid-2">
              <div className="state-block stack-sm">
                <strong>{locale === 'zh' ? '常见文件' : 'Common documents'}</strong>
                <p className="small-text">
                  {locale === 'zh'
                    ? '出生证明、结婚证、无犯罪记录、学历证书、成绩单、公司注册文件，以及部分公证后的私文书。'
                    : 'Birth certificates, marriage certificates, police checks, degree certificates, transcripts, company registry records, and some notarised private documents.'}
                </p>
              </div>
              <div className="state-block stack-sm">
                <strong>{locale === 'zh' ? '常见目的地' : 'Typical destinations'}</strong>
                <p className="small-text">
                  {locale === 'zh'
                    ? '中国、美国、加拿大、新加坡、英国、新西兰及其他适用 Apostille 的成员地区。'
                    : 'China, the United States, Canada, Singapore, the United Kingdom, New Zealand, and other destinations that accept apostille.'}
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="stack-md">
            <h2>{locale === 'zh' ? '通常先确认什么' : 'What we usually confirm first'}</h2>
            <InfoRow
              label={locale === 'zh' ? '文件类型' : 'Document type'}
              value={
                locale === 'zh'
                  ? '先判断是公共文件、学校文件、公司文件，还是需要先做 notarial handling 的私文书。'
                  : 'First confirm whether the file is a public document, academic record, company document, or a private document that may need notarial handling first.'
              }
            />
            <InfoRow
              label={locale === 'zh' ? '目的地国家' : 'Destination country'}
              value={
                locale === 'zh'
                  ? 'Apostille 是否适用，首先取决于目的地是否按海牙路径接收。'
                  : 'Whether apostille is appropriate depends first on whether the destination accepts the Hague route.'
              }
            />
            <InfoRow
              label={locale === 'zh' ? '接收机构要求' : 'Receiving-side requirements'}
              value={
                locale === 'zh'
                  ? '同一国家下，不同学校、雇主、注册机构或移民机关对原件、翻译、issue date 的要求可能不同。'
                  : 'Within the same country, universities, employers, licensing bodies, and immigration authorities may still differ on originals, translation, or issue-date requirements.'
              }
            />
          </div>
        </Card>

        <Card muted>
          <div className="stack-md">
            <h2>{locale === 'zh' ? '常见流程' : 'Typical apostille workflow'}</h2>
            <ul className="list-plain">
              {(locale === 'zh'
                ? [
                    '确认文件是否适合直接走 Apostille，或是否需要前置步骤。',
                    '确认拟使用国家和接收机构的格式要求。',
                    '如需要，先补发正确版本、补 supporting records、或处理翻译。',
                    '完成 Apostille 路线后，再按最终接收方要求整理提交包。',
                  ]
                : [
                    'Confirm whether the file can move directly to apostille or requires an upstream step first.',
                    'Check destination-country and receiving-side format requirements.',
                    'If needed, order the correct version, gather supporting records, or arrange translation.',
                    'After apostille, structure the final submission pack in the form required by the end user.',
                  ]
              ).map((item) => (
                <li className="small-text" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <Card muted>
          <div className="stack-sm">
            <p className="kicker">{locale === 'zh' ? '相关页面' : 'Related pages'}</p>
            <div className="footer-links">
              <Link href={localizedPath(locale, '/used-in/china')}>{locale === 'zh' ? '用于中国' : 'Documents for use in China'}</Link>
              <Link href={localizedPath(locale, '/used-in/canada')}>{locale === 'zh' ? '用于加拿大' : 'Documents for use in Canada'}</Link>
              <Link href={localizedPath(locale, '/used-in/spain')}>{locale === 'zh' ? '用于西班牙' : 'Documents for use in Spain'}</Link>
              <Link href={localizedPath(locale, '/documents/birth-certificate')}>{locale === 'zh' ? '出生证明' : 'Birth certificate'}</Link>
              <Link href={localizedPath(locale, '/documents/academic-transcript')}>{locale === 'zh' ? '学术成绩单' : 'Academic transcript'}</Link>
              <Link href={localizedPath(locale, '/guides')}>{locale === 'zh' ? '查看指南页' : 'Browse guides'}</Link>
            </div>
            <p className="small-text">
              {locale === 'zh'
                ? 'EGS 是独立文件协调服务，不是公证人、律师事务所或政府机构。最终签发和接收结果仍以相关主管机关和接收机构要求为准。'
                : 'EGS is an independent document coordination service. We are not a notary, law firm, or government authority. Final issuance and acceptance remain subject to the relevant authorities and receiving institutions.'}
            </p>
          </div>
        </Card>
      </Section>
    </Container>
  );
}
