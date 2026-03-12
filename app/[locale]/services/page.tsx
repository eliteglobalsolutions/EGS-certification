import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { PageHeader } from '@/components/ui/PageHeader';
import { InfoRow } from '@/components/ui/InfoRow';
import { ServiceLanes } from '@/components/marketing/ServiceLanes';
import { RouteChecker } from '@/components/marketing/RouteChecker';
import { resolveLocale } from '@/lib/i18n/locale';
import { getCopy } from '@/lib/i18n/dictionaries';
import Link from 'next/link';
import { buildPageMetadata, siteUrl } from '@/lib/seo';
import {
  AUSTRALIA_CITY_COVERAGE,
  AUSTRALIA_CITY_KEYWORDS,
  INTERNATIONAL_ROUTE_COVERAGE,
  INTERNATIONAL_ROUTE_KEYWORDS,
  KEY_DESTINATION_CITY_COVERAGE,
  KEY_DESTINATION_CITY_KEYWORDS,
} from '@/lib/australia-city-coverage';

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
      path: '/services',
      title: '服务范围｜海牙认证、领事认证、翻译协调｜EGS Verification',
      description: '查看 EGS 服务范围：海牙认证、领事认证路径、翻译协调、证书支持与跨境文件流程。',
      keywords: [
        '海牙认证服务',
        '领事认证服务',
        '文件认证流程',
        '翻译协调',
        '澳洲文件认证',
        '国际文件认证服务',
        '悉尼文件认证服务',
        '美国 文件认证',
        '加拿大 文件认证',
        '新加坡 文件认证',
        '英国 文件认证',
        '纽约 文件认证',
        '多伦多 文件认证',
        '伦敦 文件认证',
      ],
    });
  }

  return buildPageMetadata({
    locale,
    path: '/services',
    title: 'Services | Apostille, Legalisation, Translation Coordination | EGS Verification',
    description:
      'Explore EGS services for apostille, consular legalisation, translation coordination, and structured cross-border document workflows.',
    keywords: [
      'apostille service Australia',
      'consular legalisation service',
      'document attestation service',
      'translation coordination',
        'certificate support Australia',
        'document legalisation Australia',
        'Sydney document authentication service',
        ...AUSTRALIA_CITY_KEYWORDS,
        ...INTERNATIONAL_ROUTE_KEYWORDS,
        ...KEY_DESTINATION_CITY_KEYWORDS,
      ],
  });
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  const t = getCopy(locale);
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: locale === 'zh' ? '国际文件认证协调服务' : 'Cross-border document coordination service',
    provider: {
      '@type': 'Organization',
      name: 'EGS Verification',
      url: `${siteUrl}/${locale}`,
    },
    areaServed: 'Worldwide',
    serviceType: ['Apostille', 'Consular legalisation', 'Document authentication coordination'],
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: locale === 'zh' ? '首页' : 'Home',
        item: `${siteUrl}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: locale === 'zh' ? '服务' : 'Services',
        item: `${siteUrl}/${locale}/services`,
      },
    ],
  };

  const servicesFaqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: locale === 'zh' ? '海牙认证和领馆认证如何判断？' : 'How are apostille and consular legalisation determined?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            locale === 'zh'
              ? '路径取决于签发地、目的地和机构规则，复核后确认最终路径。'
              : 'Route depends on issuing country, destination, and authority rules. Final route is confirmed after review.',
        },
      },
      {
        '@type': 'Question',
        name: locale === 'zh' ? '时效可以保证吗？' : 'Can timeline be guaranteed?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            locale === 'zh'
              ? '不能保证，页面时效为预估值，受机构排队和目的地要求影响。'
              : 'No. Timelines are estimates and remain subject to authority queues and destination requirements.',
        },
      },
      {
        '@type': 'Question',
        name: locale === 'zh' ? '人在墨尔本、布里斯班或其他澳洲城市也可以办理吗？' : 'Can clients in Melbourne, Brisbane, or other Australian cities still use the service?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            locale === 'zh'
              ? '可以。悉尼总部统筹，墨尔本、布里斯班、珀斯、阿德莱德、堪培拉及其他澳洲城市通常都可以通过在线受理、邮寄和回寄方式办理。'
              : 'Yes. Coordination is run from Sydney, but clients in Melbourne, Brisbane, Perth, Adelaide, Canberra, and other Australian cities can usually proceed through online intake, tracked mail, and return dispatch.',
        },
      },
      {
        '@type': 'Question',
        name: locale === 'zh' ? '是否也覆盖美国、加拿大、新加坡和英国等热门路线？' : 'Do you also cover popular routes involving the USA, Canada, Singapore, and the UK?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            locale === 'zh'
              ? '是。除澳洲主线外，也持续处理美国、加拿大、新加坡和英国相关文件的跨境使用路径。具体要求仍按签发地、目的地和接收机构规则逐案确认。'
              : 'Yes. Alongside the Australia main lane, we regularly handle routes involving the United States, Canada, Singapore, and the United Kingdom. Exact handling still depends on issuing country, destination, and receiving-side requirements.',
        },
      },
      {
        '@type': 'Question',
        name: locale === 'zh' ? '这些国家下面的主要城市也可以覆盖吗？' : 'Can major cities within those countries also be covered?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            locale === 'zh'
              ? '可以。常见受理场景包括美国、加拿大、新加坡和英国下的主要城市与机构使用场景，例如纽约、多伦多、新加坡、伦敦等。最终仍以具体接收机构要求为准。'
              : 'Yes. Common routes also cover major city and institution-side use within the United States, Canada, Singapore, and the United Kingdom, including places such as New York, Toronto, Singapore, and London. Final handling still depends on the actual receiving institution.',
        },
      },
    ],
  };

  return (
    <Container>
      <Section>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesFaqJsonLd) }}
        />
        <Card>
          <PageHeader
            kicker={t.services.kicker}
            title={t.services.title}
            subtitle={t.services.subtitle}
            actions={[
              { label: t.services.ctaStart, href: `/${locale}/intake`, variant: 'primary' },
              { label: t.services.ctaTrack, href: `/${locale}/track`, variant: 'secondary' },
            ]}
          />
        </Card>

        <Card muted>
          <div className="stack-sm">
            <p className="kicker">{locale === 'zh' ? '澳洲城市覆盖' : 'Australia-wide coverage'}</p>
            <p className="small-text">
              {locale === 'zh'
                ? '虽然由悉尼总部统筹，但墨尔本、布里斯班、珀斯、阿德莱德、堪培拉及其他澳洲城市的客户，通常都可以通过在线 intake、邮寄和回寄方式处理文件。'
                : 'Coordination is run from Sydney, but clients in Melbourne, Brisbane, Perth, Adelaide, Canberra, and other Australian cities can usually proceed through online intake, tracked mail, and return dispatch.'}
            </p>
            <p className="small-text">{AUSTRALIA_CITY_COVERAGE.join(' · ')}</p>
            <div className="footer-links">
              <Link href={`/${locale}/cities/melbourne`}>{locale === 'zh' ? '墨尔本页面' : 'Melbourne page'}</Link>
              <Link href={`/${locale}/cities/brisbane`}>{locale === 'zh' ? '布里斯班页面' : 'Brisbane page'}</Link>
              <Link href={`/${locale}/cities/adelaide`}>{locale === 'zh' ? '阿德莱德页面' : 'Adelaide page'}</Link>
              <Link href={`/${locale}/cities/canberra`}>{locale === 'zh' ? '堪培拉页面' : 'Canberra page'}</Link>
            </div>
            <div className="footer-links">
              <Link href={`/${locale}/cities/melbourne/consular-authentication`}>{locale === 'zh' ? '墨尔本领事认证页' : 'Melbourne consular page'}</Link>
              <Link href={`/${locale}/cities/brisbane/consular-authentication`}>{locale === 'zh' ? '布里斯班领事认证页' : 'Brisbane consular page'}</Link>
              <Link href={`/${locale}/cities/adelaide/consular-authentication`}>{locale === 'zh' ? '阿德莱德领事认证页' : 'Adelaide consular page'}</Link>
              <Link href={`/${locale}/cities/canberra/consular-authentication`}>{locale === 'zh' ? '堪培拉领事认证页' : 'Canberra consular page'}</Link>
            </div>
          </div>
        </Card>

        <Card muted>
          <div className="stack-sm">
            <p className="kicker">{locale === 'zh' ? '国际热门覆盖' : 'International route coverage'}</p>
            <p className="small-text">
              {locale === 'zh'
                ? '除澳洲主线外，也持续处理美国、加拿大、新加坡和英国等热门跨境文件路线。具体路径仍按签发地、目的地和接收机构要求复核。'
                : 'Alongside the Australia main lane, we also handle high-value routes involving the United States, Canada, Singapore, and the United Kingdom. Final route choice still depends on issuing country, destination, and receiving-side requirements.'}
            </p>
            <p className="small-text">{INTERNATIONAL_ROUTE_COVERAGE.join(' · ')}</p>
            <div className="footer-links">
              <Link href={`/${locale}/used-in/china`}>{locale === 'zh' ? '用于中国' : 'Used in China'}</Link>
              <Link href={`/${locale}/used-in/canada`}>{locale === 'zh' ? '用于加拿大' : 'Used in Canada'}</Link>
              <Link href={`/${locale}/used-in/singapore`}>{locale === 'zh' ? '用于新加坡' : 'Used in Singapore'}</Link>
              <Link href={`/${locale}/used-in/united-states`}>{locale === 'zh' ? '用于美国' : 'Used in United States'}</Link>
              <Link href={`/${locale}/used-in/united-kingdom`}>{locale === 'zh' ? '用于英国' : 'Used in United Kingdom'}</Link>
              <Link href={`/${locale}/used-in/new-zealand`}>{locale === 'zh' ? '用于新西兰' : 'Used in New Zealand'}</Link>
            </div>
          </div>
        </Card>

        <Card muted>
          <div className="stack-sm">
            <p className="kicker">{locale === 'zh' ? '相关指南与文件页' : 'Related guides and document pages'}</p>
            <p className="small-text">
              {locale === 'zh'
                ? '如果你已经知道文件类型或目的地国家，直接进入指南页、文件页或常见问题页会更高效。'
                : 'If you already know the document type or destination country, moving directly into guides, document pages, and FAQs is usually more efficient.'}
            </p>
            <div className="footer-links">
              <Link href={`/${locale}/guides`}>{locale === 'zh' ? '查看指南页' : 'Browse guides'}</Link>
              <Link href={`/${locale}/faq`}>{locale === 'zh' ? '查看 FAQ' : 'View FAQ'}</Link>
              <Link href={`/${locale}/documents/academic-transcript`}>{locale === 'zh' ? '学术成绩单' : 'Academic transcript'}</Link>
              <Link href={`/${locale}/documents/birth-certificate`}>{locale === 'zh' ? '出生证明' : 'Birth certificate'}</Link>
              <Link href={`/${locale}/documents/company-documents`}>{locale === 'zh' ? '公司文件' : 'Company documents'}</Link>
              <Link href={`/${locale}/documents/police-check`}>{locale === 'zh' ? '无犯罪记录' : 'Police check'}</Link>
            </div>
          </div>
        </Card>

        <Card muted>
          <div className="stack-sm">
            <p className="kicker">{locale === 'zh' ? '海外城市覆盖' : 'Destination-city coverage'}</p>
            <p className="small-text">
              {locale === 'zh'
                ? '常见受理路线也覆盖这些国家下的主要城市与机构场景。公开页只做城市级别覆盖说明，具体接收要求仍按实际机构复核。'
                : 'Common routes also cover major destination cities and institution-side use within these countries. Public pages only surface city-level coverage; final receiving requirements are still confirmed against the actual institution.'}
            </p>
            <div className="grid-2">
              {Object.entries(KEY_DESTINATION_CITY_COVERAGE).map(([country, cities]) => (
                <div className="state-block stack-sm" key={country}>
                  <strong>{country}</strong>
                  <p className="small-text">{cities.join(' · ')}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <ServiceLanes locale={locale} t={t} />
        <RouteChecker locale={locale} t={t} />

        <Card>
          <div className="stack-md">
            <p className="kicker">{t.services.explainerTitle}</p>
            <p className="small-text">{t.services.explainerLead}</p>
            <div className="grid-2">
              {t.services.explainerCards.map((card) => (
                <div className="state-block stack-sm" key={card.title}>
                  <strong>{card.title}</strong>
                  <p className="small-text">{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card muted>
          <div className="stack-sm">
            <p className="kicker">{t.services.docRefTitle}</p>
            <p className="small-text">{t.services.docRefLead}</p>
            <ul className="list-plain">
              {t.services.docRefs.map((item) => (
                <li className="small-text" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <Card>
          <div className="stack-sm">
            <p className="kicker">{t.services.fullTypeTitle}</p>
            <ul className="list-plain">
              {t.services.fullTypes.map((item) => (
                <li className="small-text" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Card>

        {t.services.sections.map((item) => (
          <Card key={item.title} muted>
            <div className="stack-md">
              <h3>{item.title}</h3>
              <InfoRow label={locale === 'zh' ? '服务定义' : 'What it is'} value={item.what} />
              <InfoRow label={locale === 'zh' ? '常见材料' : 'Required documents'} value={item.docs} />
              <InfoRow label={locale === 'zh' ? '预计时效' : 'Estimated timeline'} value={item.timeline} />
              <InfoRow label={locale === 'zh' ? '收费说明' : 'Pricing'} value={item.pricing} />
              <InfoRow label={locale === 'zh' ? '补充说明' : 'Notes'} value={item.note} />
            </div>
          </Card>
        ))}

        <Card muted>
          <div className="stack-sm">
            <p className="kicker">{locale === 'zh' ? '检索参考' : 'Search reference'}</p>
            {locale === 'zh' ? (
              <>
                <p className="small-text">
                  常见检索词：澳洲海牙认证、澳洲领事认证、Apostille Australia、consular legalisation Australia、悉尼文件认证、
                  澳洲文件跨境认证、学历文件认证、无犯罪记录认证、公司文件认证、委托书认证。
                </p>
                <p className="small-text">
                  本页内容用于说明办理路径与材料准备逻辑，最终受理要求以目的地机构规则为准。
                </p>
              </>
            ) : (
              <>
                <p className="small-text">
                  Common search terms: apostille Australia, consular legalisation Australia, document authentication Sydney,
                  cross-border document legalisation, academic document legalisation, police check legalisation, company document authentication,
                  power of attorney legalisation.
                </p>
                <p className="small-text">
                  This page explains route logic and preparation scope. Final requirements remain subject to destination authority rules.
                </p>
              </>
            )}
          </div>
        </Card>

        <Card>
          <div className="stack-sm">
            <p className="kicker">{locale === 'zh' ? '热门检索页面' : 'Popular search pages'}</p>
            <div className="footer-links">
              <Link href={`/${locale}/apostille-australia`}>
                {locale === 'zh' ? '澳洲海牙认证服务' : 'Apostille Australia'}
              </Link>
              <Link href={`/${locale}/consular-legalisation-australia`}>
                {locale === 'zh' ? '澳洲领事认证服务' : 'Consular Legalisation Australia'}
              </Link>
              <Link href={`/${locale}/document-authentication-sydney`}>
                {locale === 'zh' ? '悉尼文件认证服务' : 'Document Authentication Sydney'}
              </Link>
            </div>
          </div>
        </Card>
      </Section>
    </Container>
  );
}
