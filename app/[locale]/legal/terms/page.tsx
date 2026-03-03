import { LegalLayout } from '@/components/legal/LegalLayout';
import { getCopy } from '@/lib/i18n/dictionaries';
import { resolveLocale } from '@/lib/i18n/locale';
import { getLegalContent, TOS_VERSION } from '@/lib/legal-documents';

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
