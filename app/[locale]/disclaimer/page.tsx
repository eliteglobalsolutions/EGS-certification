import { resolveLocale } from '@/lib/i18n/locale';
import { getCopy } from '@/lib/i18n/dictionaries';
import { PageHeader } from '@/components/ui/PageHeader';

export default async function DisclaimerPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  const t = getCopy(locale);

  return (
    <section className="section-card stack-md">
      <PageHeader kicker={t.common.compliance} title={t.home.footer.disclaimerLink} subtitle={t.common.disclaimer} />
      <p className="small-text">{t.home.complianceBody}</p>
    </section>
  );
}
