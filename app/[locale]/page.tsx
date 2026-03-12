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
import { Card } from '@/components/ui/Card';
import Link from 'next/link';
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
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'EGS Verification',
    url: siteUrl,
    inLanguage: [locale === 'zh' ? 'zh-CN' : 'en-AU'],
  };
  const priorityCountries = [
    { slug: 'china', label: locale === 'zh' ? '文件用于中国' : 'Documents for use in China' },
    { slug: 'canada', label: locale === 'zh' ? '文件用于加拿大' : 'Documents for use in Canada' },
    { slug: 'singapore', label: locale === 'zh' ? '文件用于新加坡' : 'Documents for use in Singapore' },
    { slug: 'united-states', label: locale === 'zh' ? '文件用于美国' : 'Documents for use in the United States' },
    { slug: 'united-kingdom', label: locale === 'zh' ? '文件用于英国' : 'Documents for use in the United Kingdom' },
    { slug: 'new-zealand', label: locale === 'zh' ? '文件用于新西兰' : 'Documents for use in New Zealand' },
  ];
  const priorityPages = [
    { href: `/${locale}/services`, label: locale === 'zh' ? '服务总页' : 'Services overview' },
    { href: `/${locale}/guides`, label: locale === 'zh' ? '指南页' : 'Guides' },
    { href: `/${locale}/faq`, label: locale === 'zh' ? '常见问题' : 'FAQ hub' },
    { href: `/${locale}/resources`, label: locale === 'zh' ? '资源中心' : 'Resources' },
    { href: `/${locale}/post-documents`, label: locale === 'zh' ? '邮寄文件说明' : 'Post documents' },
    { href: `/${locale}/legal/authorisation`, label: locale === 'zh' ? '授权说明' : 'Authorisation notice' },
  ];

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <SiteNav locale={locale} t={t} />
        <Hero locale={locale} t={t} />
        <Card muted>
          <div className="stack-md">
            <div className="stack-sm">
              <p className="kicker">{locale === 'zh' ? '核心页面' : 'Core pages'}</p>
              <h2>{locale === 'zh' ? '主要国家页、服务页与流程页' : 'Priority destination, service, and process pages'}</h2>
              <p className="small-text">
                {locale === 'zh'
                  ? '从首页直接进入主要国家页、服务说明、指南页和 FAQ，可以让搜索引擎和客户都更快找到核心路线。'
                  : 'These direct text links help both search engines and customers discover the site’s main route, service, guide, and FAQ pages faster.'}
              </p>
            </div>
            <div className="grid-2">
              <div className="stack-sm">
                <p className="kicker">{locale === 'zh' ? '主要国家页' : 'Priority destination pages'}</p>
                <div className="footer-links">
                  {priorityCountries.map((item) => (
                    <Link key={item.slug} href={`/${locale}/used-in/${item.slug}`}>
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="stack-sm">
                <p className="kicker">{locale === 'zh' ? '主要站内入口' : 'Priority site links'}</p>
                <div className="footer-links">
                  {priorityPages.map((item) => (
                    <Link key={item.href} href={item.href}>
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>
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
