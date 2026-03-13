'use client';

import Link from 'next/link';
import type { AppCopy, Locale } from '@/lib/i18n/dictionaries';
import { localizedPath } from '@/lib/i18n/locale';

export function Hero({ locale, t }: { locale: Locale; t: AppCopy }) {
  const intakeHref = localizedPath(locale, '/intake');

  const issuingOptions =
    locale === 'zh'
      ? ['澳大利亚', '美国', '英国', '新加坡', '中国', '加拿大', '新西兰', '其他']
      : ['Australia', 'United States', 'United Kingdom', 'Singapore', 'China', 'Canada', 'New Zealand', 'Other'];

  const destinationOptions =
    locale === 'zh'
      ? ['中国', '新加坡', '美国', '英国', '香港', '加拿大', '阿联酋', '西班牙', '新西兰', '其他']
      : ['China', 'Singapore', 'United States', 'United Kingdom', 'Hong Kong', 'Canada', 'UAE', 'Spain', 'New Zealand', 'Other'];

  const docTypeOptions =
    locale === 'zh'
      ? ['出生证明', '结婚证', '学历证书 / 成绩单', 'AFP 无犯罪记录', '公司文件', '声明书 / 宣誓书', '其他']
      : ['Birth Certificate', 'Marriage Certificate', 'Academic Transcript / Degree', 'AFP Police Check', 'Company Documents', 'Declaration / Affidavit', 'Other'];

  const speedOptions =
    locale === 'zh'
      ? ['标准', '加急（视路径而定）']
      : ['Standard', 'Express (where available)'];

  const assuranceItems = locale === 'zh'
    ? [
        '付款前确认路径与所需材料',
        '安全收件，严格控制访问权限并执行脱敏流程',
        '独立中介机构——非律所，亦非政府机关',
      ]
    : [
        'Route and requirements confirmed before payment is taken',
        'Secure document intake with controlled access and redaction',
        'Independent intermediary — not a law firm or government authority',
      ];

  return (
    <div className="hero">
      <div className="hero-grid page-container">
        {/* ── LEFT ── */}
        <div className="hero-left">
          <div className="kicker">
            <div className="kicker-rule"></div>
            <span className="kicker-text">{t.landing.hero.eyebrow}</span>
          </div>

          <h1>
            {locale === 'zh' ? (
              <>
                海牙认证与领馆认证<br />
                协调办理，适用于<em>澳大利亚</em><br />
                及国际文件
              </>
            ) : (
              <>
                Apostille &amp; Legalisation<br />
                Coordination for <em>Australia</em><br />
                and International Documents
              </>
            )}
          </h1>

          <p className="hero-lead">{t.landing.hero.subtitle}</p>

          <ul className="assurance-list">
            {assuranceItems.map((item) => (
              <li key={item}>
                <span className="assurance-bullet"></span>
                {item}
              </li>
            ))}
          </ul>

          <div className="hero-cta">
            <Link href={intakeHref} className="btn-primary">
              {locale === 'zh' ? '提交申请' : 'Begin Application'} →
            </Link>
            <a href="#route-check" className="link-secondary">
              {locale === 'zh' ? '先查看路线' : 'Check my route first'}
            </a>
          </div>
        </div>

        {/* ── RIGHT: Route Check Panel ── */}
        <div className="hero-right" id="route-check">
          <div className="panel">
            <div className="panel-head">
              <div className="panel-title">
                {locale === 'zh' ? '路线确认' : 'Route Check'}
              </div>
              <div className="panel-flag">
                {locale === 'zh' ? '付款前确认' : 'No payment required'}
              </div>
            </div>

            <div className="panel-body">
              <div className="f-group">
                <label className="f-label">
                  {locale === 'zh' ? '文件签发地' : 'Document issued in'}
                </label>
                <select className="f-select" defaultValue="">
                  <option value="" disabled>
                    {locale === 'zh' ? '选择国家…' : 'Select country…'}
                  </option>
                  {issuingOptions.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>

              <div className="f-group">
                <label className="f-label">
                  {locale === 'zh' ? '目的地' : 'For use in'}
                </label>
                <select className="f-select" defaultValue="">
                  <option value="" disabled>
                    {locale === 'zh' ? '选择目的地…' : 'Select destination…'}
                  </option>
                  {destinationOptions.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>

              <div className="f-group">
                <label className="f-label">
                  {locale === 'zh' ? '文件类型' : 'Document type'}
                </label>
                <select className="f-select" defaultValue="">
                  <option value="" disabled>
                    {locale === 'zh' ? '选择类型…' : 'Select type…'}
                  </option>
                  {docTypeOptions.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>

              <div className="f-group">
                <label className="f-label">
                  {locale === 'zh' ? '处理偏好' : 'Processing preference'}
                </label>
                <select className="f-select">
                  {speedOptions.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>

              <Link href={intakeHref} className="btn-route">
                {locale === 'zh' ? '确认路线' : 'Confirm Route'}
              </Link>
            </div>

            <div className="panel-foot">
              <span>
                {locale === 'zh'
                  ? '路线预估在正式承诺前提供。'
                  : 'Route estimates provided before any commitment.'}
              </span>
              <div style={{ display: 'flex', gap: '14px', flexShrink: 0 }}>
                <Link href={localizedPath(locale, '/faq')}>
                  {locale === 'zh' ? 'Apostille 与认证的区别' : 'Apostille vs Legalisation'}
                </Link>
                <Link href={localizedPath(locale, '/guides')}>
                  {locale === 'zh' ? '指南 →' : 'Guides →'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
