import type { Metadata } from 'next';
import Link from 'next/link';
import { resolveLocale } from '@/lib/i18n/locale';
import { getCopy } from '@/lib/i18n/dictionaries';
import { Button } from '@/components/ui/Button';

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
      title: '资源中心｜官方认证与公证信息链接｜EGS Verification',
      description: '查看官方公证与认证信息链接，包括 DFAT 与主要使领馆资源入口。',
      keywords: ['认证资源', 'DFAT 链接', '公证信息', '使领馆认证链接', 'EGS 资源中心'],
      alternates: { canonical: `${siteUrl}/zh/resources` },
    };
  }

  return {
    title: 'Resources | Official Notary and Legalisation Links | EGS Verification',
    description: 'Official resource links for notary directories, DFAT legalisation guidance, and consular information portals.',
    keywords: ['notary resources Australia', 'DFAT apostille link', 'consular legalisation links', 'EGS resources'],
    alternates: { canonical: `${siteUrl}/en/resources` },
  };
}

export default async function ResourcesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  const t = getCopy(locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.eliteglobalsolutions.co';

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
        name: locale === 'zh' ? '资源中心' : 'Resources',
        item: `${siteUrl}/${locale}/resources`,
      },
    ],
  };

  return (
    <section className="ui-section" aria-labelledby="resources-heading">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="page-header">
        <div className="stack-sm">
          <h1 id="resources-heading">{t.resources.title}</h1>
          <p className="body-text">{t.resources.subtitle}</p>
          <p className="small-text">{t.resources.disclaimer}</p>
        </div>
      </div>

      <div className="grid-3 resources-grid">
        <article className="section-card stack-sm" aria-labelledby="notary-heading">
          <h2 id="notary-heading">{t.resources.sections.notary.title}</h2>
          <p className="small-text">{t.resources.sections.notary.body}</p>
          <ul className="list-plain">
            {t.resources.sections.notary.links.map((item) => (
              <li key={item.url}>
                <a className="inline-link" href={item.url} rel="noreferrer noopener" target="_blank">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </article>

        <article className="section-card stack-sm" aria-labelledby="dfat-heading">
          <h2 id="dfat-heading">{t.resources.sections.dfat.title}</h2>
          <p className="small-text">{t.resources.sections.dfat.body}</p>
          <ul className="list-plain">
            {t.resources.sections.dfat.links.map((item) => (
              <li key={item.url}>
                <a className="inline-link" href={item.url} rel="noreferrer noopener" target="_blank">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </article>

        <article className="section-card stack-sm" aria-labelledby="consular-heading">
          <h2 id="consular-heading">{t.resources.sections.consular.title}</h2>
          <p className="small-text">{t.resources.sections.consular.body}</p>
          <ul className="list-plain">
            {t.resources.sections.consular.links.map((item) => (
              <li key={item.url}>
                <a className="inline-link" href={item.url} rel="noreferrer noopener" target="_blank">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </article>
      </div>

      <aside className="section-card ui-card-muted stack-sm resources-note-card" aria-labelledby="resources-note-heading">
        <h3 id="resources-note-heading">{t.resources.noteTitle}</h3>
        <p className="small-text resources-note-body">{t.resources.noteBody}</p>
        <div className="actions resources-note-actions">
          <Button href={`/${locale}/order/new`} variant="primary">
            {t.nav.start}
          </Button>
          <Link className="inline-link" href={`/${locale}/order/track`}>
            {t.nav.track}
          </Link>
        </div>
      </aside>

      <article className="section-card stack-sm" aria-label={locale === 'zh' ? '资源检索参考' : 'Resource search reference'}>
        <p className="kicker">{locale === 'zh' ? '资源检索参考' : 'Resource search reference'}</p>
        {locale === 'zh' ? (
          <>
            <p className="small-text">
              常见检索词：DFAT apostille、澳洲公证目录、领馆认证要求、使馆认证预约、澳洲文件认证官方信息、海外文件认证要求。
            </p>
            <p className="small-text">
              相关页面：
              <Link className="inline-link" href={`/${locale}/services`}> 服务范围</Link> ·
              <Link className="inline-link" href={`/${locale}/order/new`}> 开始下单</Link> ·
              <Link className="inline-link" href={`/${locale}/samples`}> 样本库</Link>
            </p>
          </>
        ) : (
          <>
            <p className="small-text">
              Common search terms: DFAT apostille, Australia notary directory, consular legalisation requirements, embassy legalisation appointment,
              document authentication official information, overseas document legalisation pathway.
            </p>
            <p className="small-text">
              Related pages:
              <Link className="inline-link" href={`/${locale}/services`}> Services</Link> ·
              <Link className="inline-link" href={`/${locale}/order/new`}> Start Order</Link> ·
              <Link className="inline-link" href={`/${locale}/samples`}> Sample Library</Link>
            </p>
          </>
        )}
      </article>
    </section>
  );
}
