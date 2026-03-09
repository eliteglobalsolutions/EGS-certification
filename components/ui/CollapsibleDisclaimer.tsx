'use client';
import { useI18n } from '@/components/providers/AppProviders';

export function CollapsibleDisclaimer() {
  const { t } = useI18n();
  return (
    <details className="disclaimer">
      <summary>{t('disclaimerTitle')}</summary>
      <p>{t('disclaimerBody')}</p>
    </details>
  );
}
