import { LegalLayout } from '@/components/legal/LegalLayout';
import { getCopy } from '@/lib/i18n/dictionaries';
import { resolveLocale } from '@/lib/i18n/locale';
import { AUTH_VERSION, getLegalContent } from '@/lib/legal-documents';

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
