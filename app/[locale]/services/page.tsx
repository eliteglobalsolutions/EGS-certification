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
      title: '服务范围｜海牙认证、领事认证、翻译协调｜EGS Certification',
      description: '查看 EGS 服务范围：海牙认证、领事认证路径、翻译协调、证书支持与跨境文件流程。',
      keywords: ['海牙认证服务', '领事认证服务', '文件认证流程', '翻译协调', '澳洲文件认证'],
      alternates: { canonical: `${siteUrl}/zh/services` },
    };
  }

  return {
    title: 'Services | Apostille, Legalisation, Translation Coordination | EGS Certification',
    description:
      'Explore EGS services for apostille, consular legalisation, translation coordination, and structured cross-border document workflows.',
    keywords: [
      'apostille service Australia',
      'consular legalisation service',
      'document attestation service',
      'translation coordination',
      'certificate support Australia',
    ],
    alternates: { canonical: `${siteUrl}/en/services` },
  };
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  const t = getCopy(locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.eliteglobalsolutions.co';

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: locale === 'zh' ? '国际文件认证协调服务' : 'Cross-border document coordination service',
    provider: {
      '@type': 'Organization',
      name: 'EGS Certification',
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
