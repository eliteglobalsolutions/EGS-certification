import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';

export function LegalLayout({
  kicker,
  title,
  subtitle,
  version,
  content,
}: {
  kicker: string;
  title: string;
  subtitle: string;
  version: string;
  content: string;
}) {
  return (
    <Container>
      <Section>
        <Card>
          <PageHeader kicker={kicker} title={title} subtitle={subtitle} />
          <p className="small-text">{version}</p>
        </Card>
        <Card muted>
          <pre className="small-text" style={{ whiteSpace: 'pre-wrap', margin: 0 }}>
            {content}
          </pre>
        </Card>
      </Section>
    </Container>
  );
}
