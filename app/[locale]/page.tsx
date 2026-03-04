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
import Link from 'next/link';
import { Card } from '@/components/ui/Card';

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
      title: 'EGS Certification｜澳洲海牙认证与领事认证｜国际文件协调',
      description:
        'EGS 提供澳洲与海外文件跨境认证协调：Apostille、领事认证、文件上传、订单追踪与合规流程管理。',
      keywords: [
        '澳洲海牙认证',
        '澳洲领事认证',
        '国际文件认证',
        '悉尼文件认证',
        'apostille 澳洲',
        'legalisation 澳洲',
      ],
      alternates: { canonical: `${siteUrl}/zh` },
    };
  }

  return {
    title: 'EGS Certification | Apostille & Legalisation Australia | Global Coordination',
    description:
      'Apostille and legalisation coordination for Australia-issued and overseas-issued documents. Route check, secure intake, and order tracking.',
    keywords: [
      'apostille Australia',
      'legalisation Australia',
      'document authentication Sydney',
      'consular legalisation service',
      'cross border document coordination',
      'track apostille order',
    ],
    alternates: { canonical: `${siteUrl}/en` },
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  const t = getCopy(locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.eliteglobalsolutions.co';

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'EGS Certification',
    url: `${siteUrl}/${locale}`,
    email: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || undefined,
    telephone: '1300 990 666',
    address: {
      '@type': 'PostalAddress',
      postOfficeBoxNumber: 'PO Box 97',
      streetAddress: 'PO Box 97',
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
        <Card>
          <div className="stack-sm">
            <p className="kicker">{locale === 'zh' ? '相关服务页面' : 'Related services'}</p>
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
        <MarketingFAQ t={t} />
        <Testimonials locale={locale} t={t} />
        <SiteFooter locale={locale} t={t} />
        <MobileActionBar locale={locale} t={t} />
      </Section>
    </Container>
  );
}
