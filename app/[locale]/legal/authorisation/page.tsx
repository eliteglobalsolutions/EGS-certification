import type { Metadata } from 'next';
import { LegalLayout } from '@/components/legal/LegalLayout';
import { getCopy } from '@/lib/i18n/dictionaries';
import { resolveLocale } from '@/lib/i18n/locale';
import { buildPageMetadata } from '@/lib/seo';
import { AUTH_VERSION, getLegalContent } from '@/lib/legal-documents';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  return buildPageMetadata({
    locale,
    path: '/legal/authorisation',
    title: locale === 'zh' ? '授权声明 | EGS Verification' : 'Client Authorisation | EGS Verification',
    description: locale === 'zh' ? 'EGS Verification 客户授权声明，确认下单前的同意内容。' : 'EGS Verification client authorisation and consent declaration required before intake and payment.',
    keywords: ['client authorisation', 'EGS Verification authorisation'],
  });
}

export default async function LegalAuthorisationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  const t = getCopy(locale);
  const docs = getLegalContent(locale);

  return (
    <LegalLayout
      kicker={t.common.authorisation}
      title={t.common.authorisation}
      subtitle={locale === 'zh' ? '下单前授权与同意声明。' : 'Authorisation and consent declaration before intake/payment.'}
      version={`v${AUTH_VERSION}`}
      content={docs.auth}
    />
  );
}
