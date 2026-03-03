import { LegalLayout } from '@/components/legal/LegalLayout';
import { getCopy } from '@/lib/i18n/dictionaries';
import { resolveLocale } from '@/lib/i18n/locale';
import { getLegalContent, PRIVACY_VERSION } from '@/lib/legal-documents';

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
