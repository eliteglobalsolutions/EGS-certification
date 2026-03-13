import type { Metadata } from 'next';
import { LegalLayout } from '@/components/legal/LegalLayout';
import { getCopy } from '@/lib/i18n/dictionaries';
import { resolveLocale } from '@/lib/i18n/locale';
import { buildPageMetadata } from '@/lib/seo';
import { getLegalContent, PRIVACY_VERSION } from '@/lib/legal-documents';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  return buildPageMetadata({
    locale,
    path: '/legal/privacy',
    title: locale === 'zh' ? '隐私政策 | EGS Verification' : 'Privacy Policy | EGS Verification',
    description: locale === 'zh' ? 'EGS Verification 隐私政策，说明我们如何收集、使用和保护您的个人信息。' : 'EGS Verification privacy policy covering how we collect, use, and protect your personal information.',
    keywords: ['privacy policy', 'EGS Verification privacy'],
  });
}

export default async function LegalPrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  const t = getCopy(locale);
  const docs = getLegalContent(locale);

  return (
    <LegalLayout
      kicker={t.common.privacy}
      title={t.privacy.title}
      subtitle={t.privacy.subtitle}
      version={`v${PRIVACY_VERSION}`}
      content={docs.privacy}
    />
  );
}
