import type { Metadata } from 'next';
import Link from 'next/link';
import { localizedPath, localizedUrl, resolveLocale } from '@/lib/i18n/locale';
import { getCopy } from '@/lib/i18n/dictionaries';
import { Button } from '@/components/ui/Button';
import { buildPrefillHref } from '@/lib/prefill';
import { destinationCountryEntries, getEntryList, getEntryText, getSearchEntry } from '@/lib/search-entry-data';
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
      path: '/resources',
      title: '资源中心｜官方认证与公证信息链接｜EGS Verification',
      description: '查看官方公证与认证信息链接，包括 DFAT 与主要使领馆资源入口。',
      keywords: ['认证资源', 'DFAT 链接', '公证信息', '使领馆认证链接', 'EGS 资源中心'],
    });
  }

  return buildPageMetadata({
    locale,
    path: '/resources',
    title: 'Resources | Official Notary and Legalisation Links | EGS Verification',
    description: 'Official resource links for notary directories, DFAT legalisation guidance, and consular information portals.',
    keywords: ['notary resources Australia', 'DFAT apostille link', 'consular legalisation links', 'EGS resources'],
  });
}

export default async function ResourcesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  const t = getCopy(locale);
  const countryResources = [
    {
      slug: 'china',
      lane: { en: 'Apostille-led', zh: '海牙主线' },
      routeHref: localizedPath(locale, '/routes/australian-apostille-for-use-in-china'),
      links: [
        {
          label: locale === 'zh' ? '中国驻澳使馆 Apostille / 认证通知' : 'PRC Embassy in Australia apostille notice',
          url: 'http://au.china-embassy.gov.cn/eng/lsfw_12/consularservices1/202311/t20231108_11175926.htm',
        },
      ],
    },
    {
      slug: 'singapore',
      lane: { en: 'Apostille-led', zh: '海牙主线' },
      routeHref: localizedPath(locale, '/routes/australian-documents-for-use-in-singapore'),
      links: [
        {
          label: locale === 'zh' ? '新加坡驻堪培拉高专署官方领事服务' : 'Singapore High Commission Canberra consular services',
          url: 'https://www.mfa.gov.sg/Overseas-Mission/Canberra/Consular-Services/Notarial-and-Legalisation-Services',
        },
      ],
    },
    {
      slug: 'usa',
      lane: { en: 'Receiving-side review', zh: '接收方审核型' },
      routeHref: localizedPath(locale, '/routes/australian-documents-for-use-in-united-states'),
      links: [
        {
          label: locale === 'zh' ? '美国国务院认证信息' : 'U.S. Department of State authentications guidance',
          url: 'https://travel.state.gov/content/travel/en/replace-certify-docs/authenticate-your-document/office-of-authentications.html',
        },
      ],
    },
    {
      slug: 'united-kingdom',
      lane: { en: 'Apostille-led', zh: '海牙主线' },
      routeHref: localizedPath(locale, '/routes/australian-documents-for-use-in-united-kingdom'),
      links: [],
    },
    {
      slug: 'canada',
      lane: { en: 'Apostille-led', zh: '海牙主线' },
      routeHref: undefined,
      links: [],
    },
    {
      slug: 'hong-kong',
      lane: { en: 'Commercial route', zh: '商业文件强路线' },
      routeHref: localizedPath(locale, '/routes/canadian-documents-for-use-in-hong-kong'),
      links: [],
    },
    {
      slug: 'uae',
      lane: { en: 'Consular legalisation', zh: '领馆认证主线' },
      routeHref: localizedPath(locale, '/routes/australian-consular-legalisation-for-use-in-uae'),
      links: [],
    },
    {
      slug: 'saudi-arabia',
      lane: { en: 'Consular / mixed path', zh: '领馆 / 混合路径' },
      routeHref: localizedPath(locale, '/routes/australian-consular-legalisation-for-use-in-saudi-arabia'),
      links: [],
    },
    {
      slug: 'kuwait',
      lane: { en: 'Consular legalisation', zh: '领馆认证主线' },
      routeHref: localizedPath(locale, '/routes/australian-consular-legalisation-for-use-in-kuwait'),
      links: [],
    },
    {
      slug: 'malaysia',
      lane: { en: 'Document-sensitive lane', zh: '文件类型敏感路径' },
      routeHref: localizedPath(locale, '/routes/australian-consular-legalisation-for-use-in-malaysia'),
      links: [
        {
          label: locale === 'zh' ? '马来西亚驻堪培拉官方入口' : 'Malaysia High Commission Canberra portal',
          url: 'https://www.kln.gov.my/web/aus_canberra/home',
        },
      ],
    },
    {
      slug: 'vietnam',
      lane: { en: 'Consular legalisation', zh: '领馆认证主线' },
      routeHref: localizedPath(locale, '/routes/australian-consular-legalisation-for-use-in-vietnam'),
      links: [
        {
          label: locale === 'zh' ? '越南驻澳使馆领事信息' : 'Embassy of Vietnam in Australia consular information',
          url: 'https://vietnamembassy.org.au/',
        },
      ],
    },
  ]
    .map((item) => {
      const entry = getSearchEntry('destination', item.slug);
      return entry ? { ...item, entry } : null;
    })
    .filter((value): value is NonNullable<typeof value> => Boolean(value));
  const priorityCountryResources = countryResources.filter((item) =>
    ['china', 'singapore', 'usa', 'united-kingdom', 'canada', 'hong-kong'].includes(item.slug),
  );
  const secondaryCountryResources = countryResources.filter((item) =>
    ['uae', 'saudi-arabia', 'kuwait', 'malaysia', 'vietnam'].includes(item.slug),
  );

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: locale === 'zh' ? '首页' : 'Home',
        item: localizedUrl(locale, siteUrl),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: locale === 'zh' ? '资源中心' : 'Resources',
        item: localizedUrl(locale, siteUrl, '/resources'),
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
          <p className="small-text">
            {locale === 'zh'
              ? '先看官方入口，再按目的地国家进入对应路线页和受理页。资源页负责快速判断，不再只做一层通用链接堆叠。'
              : 'Start from official reference points, then move into the destination-country route page and intake. This page is now structured for fast route triage rather than generic link dumping.'}
          </p>
          <p className="small-text">
            <Link className="inline-link" href={localizedPath(locale, '/guides')}>
              {locale === 'zh'
                ? '查看围绕 Apostille、DFAT、Sydney document authentication 建立的专题指南页'
                : 'Browse the dedicated guide pages built around apostille, DFAT, and Sydney document authentication queries'}
            </Link>
          </p>
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

      <article className="section-card stack-md" aria-labelledby="country-resource-heading">
        <div className="stack-sm">
          <p className="kicker">{locale === 'zh' ? '国家资源入口' : 'Country route resources'}</p>
          <h2 id="country-resource-heading">
            {locale === 'zh' ? '按目的地国家进入对应路线' : 'Destination-country resource lanes'}
          </h2>
          <p className="small-text">
            {locale === 'zh'
              ? '这层只保留高价值国家入口。主线国家用简洁卡片呈现，副线国家压缩成轻量列表，不再让所有模块同权重展开。'
              : 'This layer keeps only high-value destination lanes. Core countries are shown as compact cards, while secondary countries are reduced to a lighter list so the page does not read like another full directory.'}
          </p>
        </div>
        <div className="resources-country-grid">
          {priorityCountryResources.map(({ slug, lane, routeHref, links, entry }) => {
            const summary = entry.regionalRequirements?.[0]
              ? getEntryText(entry.regionalRequirements[0].summary, locale)
              : getEntryText(entry.scope, locale);

            return (
              <article className="resources-country-card" key={slug}>
                <div className="stack-sm">
                  <div className="resources-country-head">
                    <h3>{getEntryText(entry.name, locale)}</h3>
                    <span className="resources-country-badge">{getEntryText(lane, locale)}</span>
                  </div>
                  <p className="small-text">{summary}</p>
                  {links[0] ? (
                    <p className="small-text">
                      <a className="inline-link" href={links[0].url} rel="noreferrer noopener" target="_blank">
                        {links[0].label}
                      </a>
                    </p>
                  ) : null}
                </div>
                <div className="actions">
                  <Link className="btn btn-secondary" href={routeHref || localizedPath(locale, `/used-in/${slug}`)}>
                    {locale === 'zh' ? '查看路线' : 'View route'}
                  </Link>
                  <Link
                    className="btn btn-primary"
                    href={buildPrefillHref(locale, '/intake', { locale, destinationSlug: slug })}
                  >
                    {locale === 'zh' ? '开始受理' : 'Start intake'}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
        <div className="resources-country-list">
          <div className="stack-sm">
            <h3>{locale === 'zh' ? '其他高价值领馆路线' : 'Other high-value consular lanes'}</h3>
            <p className="small-text">
              {locale === 'zh'
                ? '这一层只保留路线入口，不再完整展开每个国家的说明。更详细的判断放在对应 route page 里。'
                : 'This layer keeps only the route entry. The fuller country-specific handling notes remain on the destination and route pages.'}
            </p>
          </div>
          <div className="resources-country-list-items">
            {secondaryCountryResources.map(({ slug, lane, routeHref, entry }) => (
              <article className="resources-country-row" key={slug}>
                <div className="stack-xs">
                  <div className="resources-country-head">
                    <h4>{getEntryText(entry.name, locale)}</h4>
                    <span className="resources-country-badge">{getEntryText(lane, locale)}</span>
                  </div>
                  <p className="small-text">{getEntryText(entry.scope, locale)}</p>
                </div>
                <div className="actions">
                  <Link className="btn btn-secondary" href={routeHref || localizedPath(locale, `/used-in/${slug}`)}>
                    {locale === 'zh' ? '查看路线' : 'View route'}
                  </Link>
                  <Link
                    className="btn btn-primary"
                    href={buildPrefillHref(locale, '/intake', { locale, destinationSlug: slug })}
                  >
                    {locale === 'zh' ? '开始受理' : 'Start intake'}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </article>

      <aside className="section-card ui-card-muted stack-sm resources-note-card" aria-labelledby="resources-note-heading">
        <h3 id="resources-note-heading">{t.resources.noteTitle}</h3>
        <p className="small-text resources-note-body">{t.resources.noteBody}</p>
        <div className="actions resources-note-actions">
          <Button href={localizedPath(locale, '/order/new')} variant="primary">
            {t.nav.start}
          </Button>
          <Link className="inline-link" href={localizedPath(locale, '/order/track')}>
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
              <Link className="inline-link" href={localizedPath(locale, '/services')}> 服务范围</Link> ·
              <Link className="inline-link" href={localizedPath(locale, '/order/new')}> 开始下单</Link> ·
              <Link className="inline-link" href={localizedPath(locale, '/samples')}> 样本库</Link>
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
              <Link className="inline-link" href={localizedPath(locale, '/services')}> Services</Link> ·
              <Link className="inline-link" href={localizedPath(locale, '/order/new')}> Start Order</Link> ·
              <Link className="inline-link" href={localizedPath(locale, '/samples')}> Sample Library</Link>
            </p>
          </>
        )}
      </article>
    </section>
  );
}
