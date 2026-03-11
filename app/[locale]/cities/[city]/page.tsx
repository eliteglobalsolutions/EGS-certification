import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { resolveLocale } from '@/lib/i18n/locale';
import { buildPageMetadata, siteUrl } from '@/lib/seo';
import { cityCopy, getCityPage, getCityPageSlugs, getCityPages } from '@/lib/city-pages';

export async function generateStaticParams() {
  const slugs = getCityPageSlugs();
  return slugs.flatMap((city) => [{ locale: 'en', city }, { locale: 'zh', city }]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; city: string }>;
}): Promise<Metadata> {
  const { locale: localeParam, city } = await params;
  const locale = resolveLocale(localeParam);
  const page = getCityPage(city);
  if (!page) return {};

  return buildPageMetadata({
    locale,
    path: `/cities/${page.slug}`,
    title: `${cityCopy(locale, page.title)} | EGS Verification`,
    description: cityCopy(locale, page.description),
    keywords: page.keywords,
  });
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ locale: string; city: string }>;
}) {
  const { locale: localeParam, city } = await params;
  const locale = resolveLocale(localeParam);
  const page = getCityPage(city);
  if (!page) notFound();

  const otherCities = getCityPages().filter((entry) => entry.slug !== page.slug);
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: cityCopy(locale, page.title),
    provider: {
      '@type': 'Organization',
      name: 'EGS Verification',
      url: `${siteUrl}/${locale}`,
    },
    areaServed: [cityCopy(locale, page.name), cityCopy(locale, page.state), 'Australia'],
    url: `${siteUrl}/${locale}/cities/${page.slug}`,
  };

  return (
    <Container>
      <Section>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />
        <div className="guides-page-layout">
          <article className="guides-main">
            <Card className="card-main">
              <div className="stack-md">
                <p className="kicker">{locale === 'zh' ? '城市落地页' : 'City landing page'}</p>
                <h1>{cityCopy(locale, page.title)}</h1>
                <p className="body-text">{cityCopy(locale, page.description)}</p>
                <p className="small-text">{cityCopy(locale, page.intro)}</p>
                <div className="actions">
                  <Link className="btn btn-primary" href={`/${locale}/intake`}>
                    {locale === 'zh' ? '开始受理' : 'Begin intake'}
                  </Link>
                  <Link className="btn btn-secondary" href={`/${locale}/apostille-australia`}>
                    {locale === 'zh' ? '查看 apostille 主服务页' : 'View apostille service page'}
                  </Link>
                </div>
              </div>
            </Card>

            <Card className="card-sub">
              <div className="stack-sm">
                <h2>{locale === 'zh' ? '这页主要回答什么' : 'What this city page clarifies'}</h2>
                <ul className="samples-bullet-list">
                  {page.bullets.map((item) => (
                    <li key={item.en}>{cityCopy(locale, item)}</li>
                  ))}
                </ul>
              </div>
            </Card>

            <Card className="card-sub">
              <div className="stack-sm">
                <h2>{locale === 'zh' ? '常见问题' : 'Frequently asked questions'}</h2>
                <div className="guides-faq-list">
                  {page.faq.map((item) => (
                    <div className="guides-faq-item" key={item.q.en}>
                      <h3>{cityCopy(locale, item.q)}</h3>
                      <p className="small-text">{cityCopy(locale, item.a)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </article>

          <aside className="guides-sidebar">
            <Card className="card-sub">
              <div className="stack-sm">
                <h2>{locale === 'zh' ? '继续查看' : 'Continue'}</h2>
                <div className="footer-links">
                  <Link href={`/${locale}/guides/apostille-sydney-australia-dfat`}>
                    {locale === 'zh' ? 'Sydney / DFAT 指南' : 'Sydney / DFAT guide'}
                  </Link>
                  <Link href={`/${locale}/document-authentication-sydney`}>
                    {locale === 'zh' ? 'Sydney document authentication' : 'Sydney document authentication'}
                  </Link>
                  <Link href={`/${locale}/consular-legalisation-australia`}>
                    {locale === 'zh' ? '领馆认证服务页' : 'Consular legalisation service'}
                  </Link>
                </div>
              </div>
            </Card>

            <Card className="card-sub">
              <div className="stack-sm">
                <h2>{locale === 'zh' ? '其他重点城市' : 'Other target cities'}</h2>
                <div className="guides-related-list">
                  {otherCities.map((entry) => (
                    <Link className="guides-related-link" href={`/${locale}/cities/${entry.slug}`} key={entry.slug}>
                      {cityCopy(locale, entry.title)}
                    </Link>
                  ))}
                </div>
              </div>
            </Card>
          </aside>
        </div>
      </Section>
    </Container>
  );
}
