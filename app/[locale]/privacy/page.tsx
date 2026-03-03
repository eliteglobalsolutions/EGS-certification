import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { PageHeader } from '@/components/ui/PageHeader';
import { resolveLocale } from '@/lib/i18n/locale';
import { getCopy } from '@/lib/i18n/dictionaries';
import { getLegalContent, PRIVACY_VERSION } from '@/lib/legal-documents';

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  const t = getCopy(locale);
  const docs = getLegalContent(locale);

  return (
    <Container>
      <Section>
        <Card>
          <PageHeader kicker={t.common.privacy} title={t.privacy.title} subtitle={t.privacy.subtitle} />
          <p className="small-text">{t.privacy.draft} · v{PRIVACY_VERSION}</p>
        </Card>
        <Card muted>
          <pre className="small-text" style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{docs.privacy}</pre>
        </Card>
      </Section>
    </Container>
  );
}
