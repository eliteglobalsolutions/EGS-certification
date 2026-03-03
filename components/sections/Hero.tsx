import { Card } from '@/components/ui/Card';
import { PageHeader } from '@/components/ui/PageHeader';
import type { AppCopy } from '@/lib/i18n/dictionaries';

export function Hero({ locale, t }: { locale: string; t: AppCopy }) {
  return (
    <Card>
      <PageHeader
        kicker={t.home.kicker}
        title={t.home.title}
        subtitle={t.home.subtitle}
        actions={[
          { label: t.home.cta1, href: `/${locale}/order/new`, variant: 'primary' },
          { label: t.home.cta2, href: `/${locale}/order/track`, variant: 'secondary' },
        ]}
      />
    </Card>
  );
}
