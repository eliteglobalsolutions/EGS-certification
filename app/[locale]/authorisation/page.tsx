import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { PageHeader } from '@/components/ui/PageHeader';
import { resolveLocale } from '@/lib/i18n/locale';
import { getCopy } from '@/lib/i18n/dictionaries';
import { getLegalContent, AUTH_VERSION } from '@/lib/legal-documents';

export default async function AuthorisationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  const t = getCopy(locale);
  const docs = getLegalContent(locale);

  return (
    <Container>
      <Section>
        <Card>
          <PageHeader kicker={t.common.authorisation} title={t.common.authorisation} subtitle={locale === 'zh' ? '用于下单前授权确认。' : 'Used for pre-payment authorisation consent.'} />
          <p className="small-text">v{AUTH_VERSION}</p>
        </Card>
        <Card muted>
          <pre className="small-text" style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{docs.auth}</pre>
        </Card>
      </Section>
    </Container>
  );
}
