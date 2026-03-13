import type { Metadata } from 'next';
import { LegalLayout } from '@/components/legal/LegalLayout';
import { getCopy } from '@/lib/i18n/dictionaries';
import { resolveLocale } from '@/lib/i18n/locale';
import { buildPageMetadata } from '@/lib/seo';
import { getLegalContent, TOS_VERSION } from '@/lib/legal-documents';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  return buildPageMetadata({
    locale,
    path: '/legal/terms',
    title: locale === 'zh' ? '服务条款 | EGS Verification' : 'Terms of Service | EGS Verification',
    description: locale === 'zh' ? 'EGS Verification 服务条款，规定我们文件协调服务的使用条件。' : 'EGS Verification terms of service governing the use of our document coordination services.',
    keywords: ['terms of service', 'EGS Verification terms'],
  });
}

export default async function LegalTermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  const t = getCopy(locale);
  const docs = getLegalContent(locale);

  return (
    <LegalLayout
      kicker={t.common.terms}
      title={t.terms.title}
      subtitle={t.terms.subtitle}
      version={`v${TOS_VERSION}`}
      content={docs.tos}
    />
  );
}
