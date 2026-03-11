import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { resolveLocale } from '@/lib/i18n/locale';
import { buildPageMetadata, siteUrl } from '@/lib/seo';
import { cityCopy, getCityPage, getCityPageSlugs } from '@/lib/city-pages';

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

  const cityName = cityCopy(locale, page.name);
  return buildPageMetadata({
    locale,
    path: `/cities/${page.slug}/consular-authentication`,
    title:
      locale === 'zh'
        ? `${cityName} 领事认证与 consular authentication | EGS Verification`
        : `Consular authentication ${cityName} | EGS Verification`,
    description:
      locale === 'zh'
        ? `面向${cityName}搜索意图的领事认证页面，说明非海牙目的地、authentication、使馆链路和正式受理前的路线复核重点。`
        : `A ${cityName}-focused page for consular authentication and legalisation, covering non-Hague destination routes, authentication logic, embassy chains, and pre-intake review.`,
    keywords: [
      `consular authentication ${page.name.en}`,
      `legalisation ${page.name.en}`,
      `document legalisation ${page.name.en}`,
      `embassy legalisation ${page.name.en}`,
    ],
  });
}

export default async function CityConsularAuthenticationPage({
  params,
}: {
  params: Promise<{ locale: string; city: string }>;
}) {
  const { locale: localeParam, city } = await params;
  const locale = resolveLocale(localeParam);
  const page = getCityPage(city);
  if (!page) notFound();

  const cityName = cityCopy(locale, page.name);
  const isZh = locale === 'zh';

  const faq = isZh
    ? [
        {
          q: `${cityName} 的文件是不是只要做 apostille 就行？`,
          a: `不一定。如果目的地属于非海牙或接收方明确要求 authentication / embassy legalisation，就不能只按 apostille 描述。`,
        },
        {
          q: `${cityName} 客户能否远程办理领事认证？`,
          a: '通常可以。关键仍是文件路径、使馆要求和寄送安排，而不是是否亲自在悉尼。 ',
        },
        {
          q: '领事认证为什么比 apostille 更需要先做路线复核？',
          a: '因为非海牙案件更容易受使馆、翻译、 supporting paperwork 和 destination-side wording 影响，前置判断错误会放大后续成本和时间。 ',
        },
      ]
    : [
        {
          q: `Do ${cityName} clients always need apostille rather than consular authentication?`,
          a: `No. If the destination is non-Hague or the receiving side specifically requires authentication or embassy legalisation, the matter should not be described as apostille only.`,
        },
        {
          q: `Can ${cityName} clients still handle consular authentication remotely?`,
          a: 'Usually yes. The critical issues are route logic, embassy requirements, and dispatch handling rather than physical presence in Sydney.',
        },
        {
          q: 'Why does consular authentication need route review even more than apostille?',
          a: 'Because non-Hague files are more exposed to embassy rules, translation, supporting paperwork, and destination wording. A wrong early assumption creates larger cost and timing problems later.',
        },
      ];

  return (
    <Container>
      <Section>
        <Card className="card-main">
          <div className="stack-md">
            <p className="kicker">{isZh ? '城市领事认证页' : 'City consular page'}</p>
            <h1>
              {isZh ? `${cityName} 领事认证与 consular authentication` : `Consular authentication ${cityName}`}
            </h1>
            <p className="body-text">
              {isZh
                ? `${cityName} 搜索词下的很多用户，实际上想找的是“非海牙目的地怎么处理”。这类页面不应只重复 apostille，而应明确说明 authentication、使馆链路、文件前置步骤以及是否需要翻译或额外 supporting paperwork。`
                : `Many users searching with ${cityName} are really trying to solve a non-Hague destination problem. This page therefore focuses on authentication logic, embassy chains, upstream document setup, and whether translation or extra supporting paperwork may be required.`}
            </p>
            <div className="actions">
              <Link className="btn btn-primary" href={`/${locale}/consular-legalisation-australia`}>
                {isZh ? '查看领馆认证主服务页' : 'View consular legalisation service'}
              </Link>
              <Link className="btn btn-secondary" href={`/${locale}/intake`}>
                {isZh ? '开始受理' : 'Begin intake'}
              </Link>
            </div>
          </div>
        </Card>

        <div className="guides-callouts">
          <Card className="card-sub">
            <div className="stack-sm">
              <h2>{isZh ? '这类城市页回答什么' : 'What this city page answers'}</h2>
              <ul className="samples-bullet-list">
                <li>{isZh ? '目的地是不是非海牙' : 'Whether the destination is non-Hague'}</li>
                <li>{isZh ? '文件是否先要 authentication 而不是 apostille' : 'Whether the file needs authentication rather than apostille'}</li>
                <li>{isZh ? '使馆、翻译和 supporting paperwork 会不会一起出现' : 'Whether embassy, translation, and supporting paperwork will appear together'}</li>
              </ul>
            </div>
          </Card>
        </div>

        <Card className="card-sub">
          <div className="stack-sm">
            <h2>{isZh ? '常见问题' : 'Frequently asked questions'}</h2>
            <div className="guides-faq-list">
              {faq.map((item) => (
                <div className="guides-faq-item" key={item.q}>
                  <h3>{item.q}</h3>
                  <p className="small-text">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="card-sub">
          <div className="footer-links">
            <Link href={`/${locale}/cities/${page.slug}`}>{isZh ? `返回${cityName}城市页` : `Back to ${cityName} page`}</Link>
            <Link href={`/${locale}/guides/dfat-authentication-vs-apostille-australia`}>
              {isZh ? '查看 authentication vs apostille 指南' : 'Authentication vs apostille guide'}
            </Link>
          </div>
        </Card>
      </Section>
    </Container>
  );
}
