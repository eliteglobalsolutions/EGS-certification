'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import type { Session, User } from '@supabase/supabase-js';
import { getSupabaseBrowserClient } from '@/lib/supabase/browser';

export function AppSessionGate({
  children,
  locale,
}: {
  children: (session: Session, user: User) => React.ReactNode;
  locale: 'en' | 'zh';
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null);
      setLoading(false);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession ?? null);
      setLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!loading && !session) {
      const next = pathname ? `?next=${encodeURIComponent(pathname)}` : '';
      router.replace(`/${locale}/app/auth${next}`);
    }
  }, [loading, locale, pathname, router, session]);

  if (loading || !session?.user) {
    return (
      <section className="customer-app-loading">
        <div className="customer-app-loading-card">
          <p>{locale === 'zh' ? '正在载入客户系统…' : 'Loading customer app…'}</p>
        </div>
      </section>
    );
  }

  return <>{children(session, session.user)}</>;
}
