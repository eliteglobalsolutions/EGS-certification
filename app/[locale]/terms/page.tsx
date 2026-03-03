import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { PageHeader } from '@/components/ui/PageHeader';
import { resolveLocale } from '@/lib/i18n/locale';
import { getCopy } from '@/lib/i18n/dictionaries';
import { getLegalContent, TOS_VERSION } from '@/lib/legal-documents';

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  const t = getCopy(locale);
  const docs = getLegalContent(locale);

  return (
    <Container>
      <Section>
        <Card>
          <PageHeader kicker={t.common.terms} title={t.terms.title} subtitle={t.terms.subtitle} />
          <p className="small-text">{t.terms.draft} · v{TOS_VERSION}</p>
        </Card>
        <Card muted>
          <pre className="small-text" style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{docs.tos}</pre>
        </Card>
      </Section>
    </Container>
  );
}
