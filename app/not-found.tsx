import Link from 'next/link';

export default function RootNotFound() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--paper)', padding: '48px 24px' }}>
      <div style={{ maxWidth: '520px', width: '100%' }}>
        <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '2.8px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '16px', fontFamily: "'Source Sans 3', sans-serif" }}>
          404
        </p>
        <h1 style={{ fontFamily: "'EB Garamond', serif", fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 500, color: 'var(--ink)', lineHeight: 1.2, marginBottom: '16px' }}>
          Page not found
        </h1>
        <p style={{ fontSize: '16px', color: 'var(--ink-light)', lineHeight: 1.6, marginBottom: '32px', fontFamily: "'Source Sans 3', sans-serif" }}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Use the links below to return to the site.
        </p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link
            href="/en"
            style={{ display: 'inline-block', padding: '11px 24px', background: 'var(--blue)', color: '#fff', fontSize: '14px', fontWeight: 600, fontFamily: "'Source Sans 3', sans-serif", textDecoration: 'none', letterSpacing: '0.02em' }}
          >
            Return to Home
          </Link>
          <Link
            href="/en/intake"
            style={{ display: 'inline-block', padding: '11px 24px', border: '1px solid var(--ink)', color: 'var(--ink)', fontSize: '14px', fontWeight: 600, fontFamily: "'Source Sans 3', sans-serif", textDecoration: 'none', letterSpacing: '0.02em' }}
          >
            Begin Application
          </Link>
        </div>
      </div>
    </div>
  );
}
