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
    path: '/services/legalisation',
    title:
      locale === 'zh'
        ? '领事认证服务｜Legalisation 路线与文件准备说明'
        : 'Legalisation Service | Consular legalisation route guidance and document preparation',
    description:
      locale === 'zh'
        ? '查看 EGS 的 legalisation 服务说明：非海牙国家常见路径、常见文件类型、时效范围与 intake 前要确认的事项。'
        : 'Review EGS legalisation service guidance for non-Hague destinations, including common document types, route steps, timing ranges, and intake-first checks.',
    keywords: locale === 'zh'
      ? ['领事认证服务', 'legalisation service', '文件领馆认证', '非海牙国家文件路线']
      : ['legalisation service', 'consular legalisation', 'document legalisation route', 'non-Hague document route'],
  });
}

export default async function LegalisationServicePage({
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
      { '@type': 'ListItem', position: 3, name: locale === 'zh' ? '领事认证服务' : 'Legalisation service', item: localizedUrl(locale, siteUrl, '/services/legalisation') },
    ],
  };

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: locale === 'zh' ? '领事认证协调服务' : 'Consular legalisation coordination service',
    provider: {
      '@type': 'LocalBusiness',
      '@id': businessId,
    },
    areaServed: 'Worldwide',
    serviceType: 'Consular legalisation coordination',
    url: localizedUrl(locale, siteUrl, '/services/legalisation'),
  };

  return (
    <Container>
      <Section>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />

        <Card>
          <PageHeader
            kicker={locale === 'zh' ? 'Legalisation 服务' : 'Legalisation service'}
            title={locale === 'zh' ? '领事认证服务' : 'Legalisation service'}
            subtitle={
              locale === 'zh'
                ? '适用于文件拟用于非海牙路径国家的常见场景。公开页面仅说明通常逻辑，最终是否需要 Authentication、领馆合法化、翻译或原件，仍按目的地和接收机构要求复核。'
                : 'Used where documents are intended for non-Hague destinations. Public pages explain the usual logic only; final handling still depends on whether authentication, embassy legalisation, translation, or originals are required by the destination and receiving side.'
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
                <strong>{locale === 'zh' ? '常见国家' : 'Typical destinations'}</strong>
                <p className="small-text">
                  {locale === 'zh'
                    ? '阿联酋、沙特、科威特、马来西亚、越南，以及其他不按 Apostille 接收的国家或机构。'
                    : 'The UAE, Saudi Arabia, Kuwait, Malaysia, Vietnam, and other destinations or authorities that do not accept the apostille route.'}
                </p>
              </div>
              <div className="state-block stack-sm">
                <strong>{locale === 'zh' ? '常见文件' : 'Common documents'}</strong>
                <p className="small-text">
                  {locale === 'zh'
                    ? '公司文件、学历文件、无犯罪记录、民事证书，以及需随翻译和 supporting records 一起提交的文件包。'
                    : 'Company documents, academic records, police checks, civil certificates, and document packs that may need translation or supporting records.'}
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="stack-md">
            <h2>{locale === 'zh' ? '通常先确认什么' : 'What we usually confirm first'}</h2>
            <InfoRow
              label={locale === 'zh' ? '国家路径' : 'Destination route'}
              value={
                locale === 'zh'
                  ? '先确认目的地是否为非海牙路径，以及是否需要 embassy / consular legalisation。'
                  : 'Start by confirming whether the destination is non-Hague and whether embassy or consular legalisation is actually required.'
              }
            />
            <InfoRow
              label={locale === 'zh' ? '前置步骤' : 'Upstream steps'}
              value={
                locale === 'zh'
                  ? '不少文件不会直接进入领事认证，前面可能先要补正确版本、做 notarial handling、或完成 DFAT authentication。'
                  : 'Many files do not move straight to consular legalisation. The route may first require the correct certificate version, notarial handling, or DFAT authentication.'
              }
            />
            <InfoRow
              label={locale === 'zh' ? '接收机构格式' : 'Receiving-side format'}
              value={
                locale === 'zh'
                  ? '不同领馆、大学、雇主或政府机关，对翻译、原件、issue date 和 supporting papers 的要求可能不同。'
                  : 'Different embassies, universities, employers, and authorities may still vary on translation, originals, issue dates, and supporting papers.'
              }
            />
          </div>
        </Card>

        <Card muted>
          <div className="stack-md">
            <h2>{locale === 'zh' ? '常见流程' : 'Typical legalisation workflow'}</h2>
            <ul className="list-plain">
              {(locale === 'zh'
                ? [
                    '确认使用国家及接收机构是否明确要求 legalisation 路径。',
                    '判断文件是否适合直接进入前置认证，还是需要先补 supporting records。',
                    '如适用，先完成上游认证，再进入领馆 / 使馆路径。',
                    '最后按接收机构要求准备翻译、回寄和提交文件包。',
                  ]
                : [
                    'Confirm that the destination and receiving authority actually require the legalisation route.',
                    'Assess whether the file can move into the upstream authentication chain or needs supporting records first.',
                    'Where required, complete the upstream authentication stage before embassy or consular handling.',
                    'Prepare translation, return dispatch, and the final submission pack in the format required by the end user.',
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
              <Link href={localizedPath(locale, '/consular-legalisation-australia')}>{locale === 'zh' ? '澳洲领事认证页' : 'Consular legalisation Australia'}</Link>
              <Link href={localizedPath(locale, '/used-in/spain')}>{locale === 'zh' ? '用于西班牙' : 'Documents for use in Spain'}</Link>
              <Link href={localizedPath(locale, '/used-in/singapore')}>{locale === 'zh' ? '用于新加坡' : 'Documents for use in Singapore'}</Link>
              <Link href={localizedPath(locale, '/used-in/united-arab-emirates')}>{locale === 'zh' ? '用于阿联酋' : 'Documents for use in the UAE'}</Link>
              <Link href={localizedPath(locale, '/documents/company-documents')}>{locale === 'zh' ? '公司文件' : 'Company documents'}</Link>
              <Link href={localizedPath(locale, '/faq')}>{locale === 'zh' ? '查看 FAQ' : 'View FAQ'}</Link>
            </div>
            <p className="small-text">
              {locale === 'zh'
                ? 'EGS 是独立文件协调服务，不是公证人、律师事务所或政府机构。最终签发、认证和接收结果仍取决于相关主管机关和接收机构。'
                : 'EGS is an independent document coordination service. We are not a notary, law firm, or government authority. Final issuance, authentication, and acceptance remain subject to the relevant authorities and receiving institutions.'}
            </p>
          </div>
        </Card>
      </Section>
    </Container>
  );
}
