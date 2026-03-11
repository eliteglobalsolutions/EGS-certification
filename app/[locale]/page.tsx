import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SiteNav } from '@/components/marketing/SiteNav';
import { Hero } from '@/components/marketing/Hero';
import { CoverageFlags } from '@/components/marketing/CoverageFlags';
import { RouteChecker } from '@/components/marketing/RouteChecker';
import { ProcessStepper } from '@/components/marketing/ProcessStepper';
import { PricingSection } from '@/components/marketing/PricingSection';
import { MobileActionBar } from '@/components/marketing/MobileActionBar';
import { Testimonials } from '@/components/marketing/Testimonials';
import { MarketingFAQ } from '@/components/marketing/FAQ';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { resolveLocale } from '@/lib/i18n/locale';
import { getCopy } from '@/lib/i18n/dictionaries';
import { buildPageMetadata, siteUrl } from '@/lib/seo';

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
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'EGS Verification',
    url: `${siteUrl}/${locale}`,
    email: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || undefined,
    telephone: '1300 990 666',
    address: {
      '@type': 'PostalAddress',
      postOfficeBoxNumber: 'PO Box 97',
      addressLocality: 'Edgecliff',
      addressRegion: 'NSW',
      postalCode: '2027',
      addressCountry: 'AU',
    },
    areaServed: 'Worldwide',
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

  return (
    <Container>
      <Section>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <SiteNav locale={locale} t={t} />
        <Hero locale={locale} t={t} />
        <CoverageFlags locale={locale} t={t} />
        <RouteChecker locale={locale} t={t} />
        <ProcessStepper locale={locale} t={t} />
        <PricingSection locale={locale} t={t} />
        <MarketingFAQ t={t} />
        <Testimonials locale={locale} t={t} />
        <SiteFooter locale={locale} t={t} />
        <MobileActionBar locale={locale} t={t} />
      </Section>
    </Container>
  );
}
