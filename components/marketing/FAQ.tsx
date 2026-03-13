import Link from 'next/link';
import type { AppCopy } from '@/lib/i18n/dictionaries';

const faqCategories = [
  { label: 'All questions', href: '/faq', className: 'active' },
  { label: 'Apostille & Legalisation', href: '/faq#core', className: '' },
  { label: 'Australian Documents', href: '/faq#au-docs', className: '' },
  { label: 'Education & My eQuals', href: '/faq#education', className: '' },
  { label: 'Timing, Fees & Intake', href: '/faq#process', className: '' },
  { label: 'Overseas-issued Documents', href: '/faq#overseas', className: '' },
];

const faqCategoriesZh = [
  { label: '全部问题', href: '/zh/faq', className: 'active' },
  { label: 'Apostille 与领馆认证', href: '/zh/faq#core', className: '' },
  { label: '澳洲文件', href: '/zh/faq#au-docs', className: '' },
  { label: '学历与 My eQuals', href: '/zh/faq#education', className: '' },
  { label: '时效、费用与受理', href: '/zh/faq#process', className: '' },
  { label: '海外签发文件', href: '/zh/faq#overseas', className: '' },
];

export function MarketingFAQ({ t, locale }: { t: AppCopy; locale?: string }) {
  const isZh = locale === 'zh';
  const categories = isZh ? faqCategoriesZh : faqCategories;
  const faqPath = isZh ? '/zh/faq' : '/en/faq';

  return (
    <section id="faq" className="faq-section" aria-labelledby="faq-heading">
      <div className="page-container">
        <div className="sec-head">
          <p className="sec-kicker">{t.landing.faq.kicker}</p>
          <h2 id="faq-heading" className="sec-h">{t.landing.faq.title}</h2>
          <p className="sec-sub">
            {t.landing.faq.subtitleNote}{' '}
            <Link href={faqPath} style={{ color: 'var(--blue)' }}>
              {t.landing.faq.subtitleCta} →
            </Link>
          </p>
        </div>

        <div className="faq-wrap">
          <nav className="faq-sidebar" aria-label={isZh ? 'FAQ 分类' : 'FAQ categories'}>
            <div className="faq-sidebar-label">{isZh ? '分类' : 'Categories'}</div>
            {categories.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className={cat.className}
              >
                {cat.label}
              </Link>
            ))}
          </nav>

          <div className="faq-body-col">
            {t.landing.faq.items.map((item) => (
              <details className="faq-item-new" key={item.q}>
                <summary className="faq-q-new">
                  <span>{item.q}</span>
                  <span className="faq-toggle-icon" aria-hidden="true">+</span>
                </summary>
                <div className="faq-answer-new">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
