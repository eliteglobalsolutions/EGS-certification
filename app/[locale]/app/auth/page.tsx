'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import type { Locale } from '@/lib/i18n/dictionaries';
import { getSupabaseBrowserClient } from '@/lib/supabase/browser';

export default function CustomerAuthPage() {
  const params = useParams<{ locale: Locale }>();
  const locale = params.locale;
  const router = useRouter();
  const search = useSearchParams();
  const next = search.get('next') || `/${locale}/app`;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) {
        router.replace(next);
      }
    });
  }, [next, router]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    const supabase = getSupabaseBrowserClient();
    const payload = { email: email.trim(), password };

    const result =
      mode === 'signup'
        ? await supabase.auth.signUp(payload)
        : await supabase.auth.signInWithPassword(payload);

    setLoading(false);

    if (result.error) {
      setError(result.error.message);
      return;
    }

    if (mode === 'signup' && !result.data.session) {
      setMessage(locale === 'zh' ? '注册成功，请检查邮箱确认登录。' : 'Account created. Check your email to confirm sign-in.');
      return;
    }

    router.replace(next);
  }

  return (
    <main className="customer-auth-shell">
      {/* Decorative background rings */}
      <div className="customer-auth-globe">
        <div className="customer-auth-globe-ring" style={{ width: 300, height: 300 }} />
        <div className="customer-auth-globe-ring" style={{ width: 200, height: 300 }} />
        <div className="customer-auth-globe-ring" style={{ width: 100, height: 300 }} />
      </div>

      <div className="customer-auth-content">
        {/* Seal / brand */}
        <div className="customer-auth-seal">
          <div className="customer-auth-seal-inner" />
          <span className="customer-auth-seal-letter">E</span>
        </div>
        <p className="customer-auth-brand-name">EGS Verification</p>
        <p className="customer-auth-brand-sub">{locale === 'zh' ? '客户门户' : 'Customer Portal'}</p>

        {/* Gold rule */}
        <div className="customer-auth-rule" />

        {/* Form card */}
        <div className="customer-auth-form-card">
          <div className="customer-auth-form-intro">
            <strong>{mode === 'signup' ? (locale === 'zh' ? '创建客户账户' : 'Create your customer account') : (locale === 'zh' ? '登录客户账户' : 'Sign in to your customer account')}</strong>
            <p>
              {mode === 'signup'
                ? locale === 'zh'
                  ? '注册后，新的订单会自动归属到你的账户。'
                  : 'New orders will attach to your account after sign-up.'
                : locale === 'zh'
                  ? '登录后可查看自己的订单、文件与支付状态。'
                  : 'View your orders, files, and payment state after sign-in.'}
            </p>
          </div>

          <div className="customer-auth-tabs">
            <button className={mode === 'signin' ? 'is-active' : ''} onClick={() => setMode('signin')} type="button">
              {locale === 'zh' ? '登录' : 'Sign In'}
            </button>
            <button className={mode === 'signup' ? 'is-active' : ''} onClick={() => setMode('signup')} type="button">
              {locale === 'zh' ? '注册' : 'Create Account'}
            </button>
          </div>

          <form onSubmit={onSubmit} style={{ display: 'contents' }}>
            <label className="customer-auth-field">
              <span>Email</span>
              <input className="input" onChange={(e) => setEmail(e.target.value)} type="email" value={email} />
            </label>

            <label className="customer-auth-field">
              <span>{locale === 'zh' ? '密码' : 'Password'}</span>
              <input className="input" onChange={(e) => setPassword(e.target.value)} type="password" value={password} />
            </label>

            <button className="customer-auth-submit" disabled={loading} type="submit">
              {loading
                ? locale === 'zh' ? '处理中…' : 'Working…'
                : mode === 'signup'
                  ? locale === 'zh' ? '创建账户' : 'Create Account'
                  : locale === 'zh' ? '登录' : 'Sign In'}
            </button>

            {message ? <p className="small-text" style={{ color: 'rgba(255,255,255,0.62)', margin: 0 }}>{message}</p> : null}
            {error ? <p className="error-text" style={{ margin: 0 }}>{error}</p> : null}
          </form>
        </div>

        <Link className="customer-auth-back" href={`/${locale}`}>
          {locale === 'zh' ? '返回官网' : 'Back to website'}
        </Link>
      </div>
    </main>
  );
}
