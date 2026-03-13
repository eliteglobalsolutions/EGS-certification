import { headers } from 'next/headers';
import Link from 'next/link';

export default async function LocaleNotFound() {
  const requestHeaders = await headers();
  const lang = requestHeaders.get('x-egs-html-lang') || 'en';
  const isZh = lang === 'zh';
  const locale = isZh ? 'zh' : 'en';

  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px' }}>
      <div style={{ maxWidth: '520px', width: '100%' }}>
        <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '2.8px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '16px', fontFamily: "'Source Sans 3', sans-serif" }}>
          404
        </p>
        <h1 style={{ fontFamily: "'EB Garamond', serif", fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 500, color: 'var(--ink)', lineHeight: 1.2, marginBottom: '16px' }}>
          {isZh ? '页面未找到' : 'Page not found'}
        </h1>
        <p style={{ fontSize: '16px', color: 'var(--ink-light)', lineHeight: 1.6, marginBottom: '32px', fontFamily: "'Source Sans 3', sans-serif" }}>
          {isZh
            ? '您访问的页面不存在或已被移动。请使用以下链接返回网站。'
            : "The page you're looking for doesn't exist or has been moved."}
        </p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link
            href={`/${locale}`}
            style={{ display: 'inline-block', padding: '11px 24px', background: 'var(--blue)', color: '#fff', fontSize: '14px', fontWeight: 600, fontFamily: "'Source Sans 3', sans-serif", textDecoration: 'none', letterSpacing: '0.02em' }}
          >
            {isZh ? '返回首页' : 'Return to Home'}
          </Link>
          <Link
            href={`/${locale}/intake`}
            style={{ display: 'inline-block', padding: '11px 24px', border: '1px solid var(--ink)', color: 'var(--ink)', fontSize: '14px', fontWeight: 600, fontFamily: "'Source Sans 3', sans-serif", textDecoration: 'none', letterSpacing: '0.02em' }}
          >
            {isZh ? '正式受理' : 'Begin Application'}
          </Link>
        </div>
      </div>
    </div>
  );
}
