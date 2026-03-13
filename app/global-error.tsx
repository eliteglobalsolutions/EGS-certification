'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.error(error);
    }
  }, [error]);

  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "'Source Sans 3', Arial, sans-serif", background: '#f5f4f1', color: '#0e1519' }}>
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px' }}>
          <div style={{ maxWidth: '520px', width: '100%' }}>
            <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '2.8px', textTransform: 'uppercase', color: '#9a7140', marginBottom: '16px' }}>
              Critical error
            </p>
            <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '32px', fontWeight: 500, lineHeight: 1.2, marginBottom: '16px' }}>
              Something went wrong
            </h1>
            <p style={{ fontSize: '15px', color: '#5c6b75', lineHeight: 1.6, marginBottom: '32px' }}>
              A critical error occurred. Please refresh the page or return to the home page.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                onClick={reset}
                style={{ padding: '11px 24px', background: '#1b3a5c', color: '#fff', fontSize: '14px', fontWeight: 600, border: 'none', cursor: 'pointer', letterSpacing: '0.02em' }}
              >
                Try again
              </button>
              <a
                href="/en"
                style={{ display: 'inline-block', padding: '11px 24px', border: '1px solid #0e1519', color: '#0e1519', fontSize: '14px', fontWeight: 600, textDecoration: 'none', letterSpacing: '0.02em' }}
              >
                Return to Home
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
