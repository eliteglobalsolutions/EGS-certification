'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    Tawk_API: Record<string, unknown>;
    Tawk_LoadStart: Date;
  }
}

export function TawkChat({ email }: { email?: string }) {
  useEffect(() => {
    if (document.querySelector('script[src*="tawk.to"]')) return;

    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    if (email) {
      window.Tawk_API.visitor = { email };
    }

    const s1 = document.createElement('script');
    const s0 = document.getElementsByTagName('script')[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/69bbb0dc65362b1c3680b180/1jk2ilneq';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode!.insertBefore(s1, s0);
  }, []);

  // Once script is loaded, update visitor email if available
  useEffect(() => {
    if (!email) return;
    const api = window.Tawk_API;
    if (typeof api?.setAttributes === 'function') {
      (api.setAttributes as (attrs: Record<string, string>, cb: () => void) => void)(
        { email },
        () => {},
      );
    }
  }, [email]);

  return null;
}
