import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SiteNav } from '@/components/marketing/SiteNav';
import { Hero } from '@/components/marketing/Hero';
import { DataStrip } from '@/components/marketing/DataStrip';
import { TimingSection } from '@/components/marketing/TimingSection';
import { DestinationsGrid } from '@/components/marketing/DestinationsGrid';
import { ProcessStepper } from '@/components/marketing/ProcessStepper';
import { ServiceStandards } from '@/components/marketing/ServiceStandards';
import { Testimonials } from '@/components/marketing/Testimonials';
import { MarketingFAQ } from '@/components/marketing/FAQ';
import { CTABand } from '@/components/marketing/CTABand';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { MobileActionBar } from '@/components/marketing/MobileActionBar';
import { TickerStrip } from '@/components/marketing/TickerStrip';
import { resolveLocale } from '@/lib/i18n/locale';
import { getCopy } from '@/lib/i18n/dictionaries';
import { buildPageMetadata, siteUrl } from '@/lib/seo';
import { localizedPath, localizedUrl } from '@/lib/i18n/locale';
import {
  COMPANY_ADDRESS,
  COMPANY_BRAND_NAME,
  COMPANY_EMAIL,
  COMPANY_LEGAL_NAME,
} from '@/lib/company';

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
      path: '',
      title: 'EGS Verification｜澳洲海牙认证与领事认证｜国际文件协调',
      description:
        'EGS 提供澳洲与海外文件跨境认证协调：Apostille、领事认证、文件上传、订单追踪与合规流程管理。',
      keywords: [
        '澳洲海牙认证',
        '澳洲领事认证',
        '国际文件认证',
        '悉尼文件认证',
        'apostille 澳洲',
        'legalisation 澳洲',
        '澳洲文件认证服务',
        'Sydney document authentication',
      ],
    });
  }

  return buildPageMetadata({
    locale,
    path: '',
    title: 'EGS Verification | Apostille & Legalisation Australia | Global Coordination',
    description:
      'Apostille and legalisation coordination for Australia-issued and overseas-issued documents. Route check, secure intake, and order tracking.',
    keywords: [
      'apostille Australia',
      'legalisation Australia',
      'document authentication Sydney',
      'consular legalisation service',
      'cross border document coordination',
      'track apostille order',
      'document legalisation Australia',
      'Australia document authentication service',
    ],
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  const t = getCopy(locale);
  const path = (value = '') => localizedPath(locale, value);
  const url = (value = '') => localizedUrl(locale, siteUrl, value);
  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${url()}#local-business`,
    name: COMPANY_BRAND_NAME,
    legalName: COMPANY_LEGAL_NAME,
    url: url(),
    image: `${siteUrl}/opengraph-image`,
    email: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || COMPANY_EMAIL,
    telephone: '1300 990 666',
    priceRange: '$$',
    areaServed: 'Worldwide',
    knowsAbout: [
      'Apostille',
      'Consular legalisation',
      'Document authentication',
      'International document coordination',
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY_ADDRESS.split(',')[0],
      addressLocality: 'Sydney',
      addressRegion: 'NSW',
      postalCode: '2000',
      addressCountry: 'AU',
    },
    description: t.landing.hero.subtitle,
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.landing.faq.items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: COMPANY_BRAND_NAME,
    url: siteUrl,
    inLanguage: [locale === 'zh' ? 'zh-CN' : 'en-AU'],
  };

  return (
    <Container>
      <Section>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <SiteNav locale={locale} t={t} />
        <Hero locale={locale} t={t} />
        <TickerStrip locale={locale} />
        <DataStrip t={t} />
        <TimingSection t={t} />
        <DestinationsGrid locale={locale} t={t} />
        <ProcessStepper locale={locale} t={t} />
        <ServiceStandards locale={locale} t={t} />
        <Testimonials locale={locale} t={t} />
        <MarketingFAQ t={t} locale={locale} />
        <CTABand locale={locale} t={t} />
        <SiteFooter locale={locale} t={t} />
        <MobileActionBar locale={locale} t={t} />
      </Section>
    </Container>
  );
}
