import ReactMarkdown from 'react-markdown';
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
        <div className="legal-header">
          <PageHeader kicker={kicker} title={title} subtitle={subtitle} />
          <p className="legal-version">{version}</p>
        </div>
        <div className="legal-body">
          <ReactMarkdown
            components={{
              h1: ({ children }) => <h1 className="legal-h1">{children}</h1>,
              h2: ({ children }) => <h2 className="legal-h2">{children}</h2>,
              h3: ({ children }) => <h3 className="legal-h3">{children}</h3>,
              p: ({ children }) => <p className="legal-p">{children}</p>,
              ul: ({ children }) => <ul className="legal-ul">{children}</ul>,
              ol: ({ children }) => <ol className="legal-ol">{children}</ol>,
              li: ({ children }) => <li className="legal-li">{children}</li>,
              strong: ({ children }) => <strong className="legal-strong">{children}</strong>,
              em: ({ children }) => <em className="legal-em">{children}</em>,
              hr: () => <hr className="legal-hr" />,
              blockquote: ({ children }) => <blockquote className="legal-blockquote">{children}</blockquote>,
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </Section>
    </Container>
  );
}
