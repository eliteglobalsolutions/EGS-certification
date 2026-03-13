import Link from 'next/link';
import type { AppCopy } from '@/lib/i18n/dictionaries';
import { COMPANY_BRAND_NAME } from '@/lib/company';
import { localizedPath } from '@/lib/i18n/locale';

export function SiteFooter({ locale, t }: { locale: string; t: AppCopy }) {
  const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL;
  const year = new Date().getFullYear();
  const path = (value = '') => localizedPath(locale as 'en' | 'zh', value);
  const copyright =
    locale === 'zh'
      ? `© ${year} ${COMPANY_BRAND_NAME}. 版权所有。`
      : `© ${year} ${COMPANY_BRAND_NAME}. All rights reserved.`;

  return (
    <footer id="contact" className="site-footer" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        {t.landing.footer.contactTitle}
      </h2>

      <div className="footer-grid">
        {/* Col 1: Brand */}
        <div className="f-brand">
          <div className="nav-logo" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '13px' }}>
            <div className="logo-seal f-brand-seal">
              <span className="logo-seal-letter" style={{ color: 'var(--white)' }}>E</span>
            </div>
            <div className="logo-wordmark">
              <div className="logo-name" style={{ color: 'var(--white)' }}>EGS Verification</div>
              <div className="logo-tagline">{locale === 'zh' ? '公证认证 · 澳大利亚' : 'Apostille & Legalisation'}</div>
            </div>
          </div>
          <p>{t.landing.footer.descriptor}</p>
          <div className="f-contact">
            <div>{t.landing.footer.address}</div>
            {t.landing.footer.poBox && <div>{t.landing.footer.poBox}</div>}
            <div>{t.landing.footer.phone}</div>
            {supportEmail && <div>{supportEmail}</div>}
          </div>
        </div>

        {/* Col 2: Services */}
        <div className="f-col">
          <h4>{locale === 'zh' ? '服务' : 'Services'}</h4>
          <Link href={path('/services')}>{locale === 'zh' ? '服务总页' : 'Services overview'}</Link>
          <Link href={path('/apostille-australia')}>{locale === 'zh' ? '澳洲海牙认证' : 'Apostille Australia'}</Link>
          <Link href={path('/consular-legalisation-australia')}>{locale === 'zh' ? '领馆认证' : 'Consular Legalisation'}</Link>
          <Link href={path('/document-authentication-sydney')}>{locale === 'zh' ? '文件认证' : 'Document Authentication'}</Link>
        </div>

        {/* Col 3: Destinations */}
        <div className="f-col">
          <h4>{locale === 'zh' ? '目的地' : 'Destinations'}</h4>
          <Link href={path('/used-in/china')}>{locale === 'zh' ? '用于中国的文件' : 'Documents for China'}</Link>
          <Link href={path('/used-in/singapore')}>{locale === 'zh' ? '用于新加坡的文件' : 'Documents for Singapore'}</Link>
          <Link href={path('/used-in/united-states')}>{locale === 'zh' ? '用于美国的文件' : 'Documents for USA'}</Link>
          <Link href={path('/used-in/united-kingdom')}>{locale === 'zh' ? '用于英国的文件' : 'Documents for UK'}</Link>
          <Link href={path('/used-in/canada')}>{locale === 'zh' ? '用于加拿大的文件' : 'Documents for Canada'}</Link>
          <Link href={path('/routes')}>{locale === 'zh' ? '全部目的地 →' : 'All destinations →'}</Link>
        </div>

        {/* Col 4: Client Access + Legal */}
        <div className="f-col">
          <h4>{locale === 'zh' ? '客户入口' : 'Client Access'}</h4>
          <Link href={path('/track')}>{locale === 'zh' ? '追踪订单' : 'Track your order'}</Link>
          <Link href={path('/order/upload')}>{locale === 'zh' ? '补交文件' : 'Upload additional files'}</Link>
          <Link href={path('/samples')}>{locale === 'zh' ? '样本库' : 'Sample library'}</Link>
          <Link href={path('/guides')}>{locale === 'zh' ? '指南' : 'Guides'}</Link>
          <Link href={path('/faq')}>{locale === 'zh' ? 'FAQ 中心' : 'FAQ hub'}</Link>
          <h4 style={{ marginTop: '18px' }}>{locale === 'zh' ? '法律文件' : 'Legal'}</h4>
          <Link href={path('/legal/terms')}>{locale === 'zh' ? '服务条款' : 'Terms of Service'}</Link>
          <Link href={path('/legal/privacy')}>{locale === 'zh' ? '隐私政策' : 'Privacy Policy'}</Link>
          <Link href={path('/legal/authorisation')}>{locale === 'zh' ? '授权声明' : 'Authorisation Notice'}</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-copy">{copyright}</div>
        <div className="footer-legal">
          {t.landing.footer.roleDisclosure}
        </div>
      </div>
    </footer>
  );
}
