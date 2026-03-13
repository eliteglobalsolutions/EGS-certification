'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error for observability without exposing details to user
    if (process.env.NODE_ENV === 'development') {
      console.error(error);
    }
  }, [error]);

  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px' }}>
      <div style={{ maxWidth: '520px', width: '100%' }}>
        <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '2.8px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '16px', fontFamily: "'Source Sans 3', sans-serif" }}>
          Something went wrong
        </p>
        <h1 style={{ fontFamily: "'EB Garamond', serif", fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 500, color: 'var(--ink)', lineHeight: 1.2, marginBottom: '16px' }}>
          An unexpected error occurred
        </h1>
        <p style={{ fontSize: '15px', color: 'var(--ink-light)', lineHeight: 1.6, marginBottom: '32px', fontFamily: "'Source Sans 3', sans-serif" }}>
          We&apos;re unable to complete this request. Please try again, or contact us directly if the issue persists.
        </p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={reset}
            style={{ display: 'inline-block', padding: '11px 24px', background: 'var(--blue)', color: '#fff', fontSize: '14px', fontWeight: 600, fontFamily: "'Source Sans 3', sans-serif", border: 'none', cursor: 'pointer', letterSpacing: '0.02em' }}
          >
            Try again
          </button>
          <Link
            href="/en"
            style={{ display: 'inline-block', padding: '11px 24px', border: '1px solid var(--ink)', color: 'var(--ink)', fontSize: '14px', fontWeight: 600, fontFamily: "'Source Sans 3', sans-serif", textDecoration: 'none', letterSpacing: '0.02em' }}
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
