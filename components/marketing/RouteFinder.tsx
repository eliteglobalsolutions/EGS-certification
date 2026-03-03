'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { AppCopy } from '@/lib/i18n/dictionaries';

type IssuedOption = 'au' | 'overseas';
type UsedOption = 'au' | 'china' | 'singapore' | 'eu' | 'usa' | 'other';

export function RouteFinder({
  locale,
  t,
  asModal = false,
  onClose,
}: {
  locale: string;
  t: AppCopy;
  asModal?: boolean;
  onClose?: () => void;
}) {
  const [issued, setIssued] = useState<IssuedOption | null>(null);
  const [used, setUsed] = useState<UsedOption | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const result = useMemo(() => {
    if (!issued || !used) return null;

    const likelyProcess =
      issued === 'au' && used !== 'au'
        ? t.landing.routeFinder.result.auToOverseas
        : issued === 'overseas' && used === 'au'
          ? t.landing.routeFinder.result.overseasToAu
          : t.landing.routeFinder.result.general;

    const chinaNote = used === 'china' ? t.landing.routeFinder.result.chinaNote : null;

    return { likelyProcess, chinaNote };
  }, [issued, used, t]);

  const content = (
    <div className="route-finder">
      <div className="stack-sm">
        <p className="kicker">{t.landing.routeFinder.kicker}</p>
        <h3 className="route-finder-title" id="route-finder-heading">
          {t.landing.routeFinder.title}
        </h3>
        <p className="small-text">{t.landing.routeFinder.helper}</p>
      </div>

      <div className="stack-md">
        <div className="stack-sm">
          <p className="small-text">{t.landing.routeFinder.step1Label}</p>
          <div className="route-finder-pills">
            {(['au', 'overseas'] as IssuedOption[]).map((option) => (
              <button
                aria-pressed={issued === option}
                className="pill"
                key={option}
                onClick={() => setIssued(option)}
                type="button"
              >
                {t.landing.routeFinder.issuedOptions[option]}
              </button>
            ))}
          </div>
        </div>

        <div className="stack-sm">
          <p className="small-text">{t.landing.routeFinder.step2Label}</p>
          <div className="route-finder-pills">
            {(['au', 'china', 'singapore', 'eu', 'usa', 'other'] as UsedOption[]).map((option) => (
              <button
                aria-pressed={used === option}
                className="pill"
                key={option}
                onClick={() => setUsed(option)}
                type="button"
              >
                {t.landing.routeFinder.usedOptions[option]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {result ? (
        <div className="section-card stack-sm">
          <p className="small-text">{t.landing.routeFinder.result.likelyProcessLabel}</p>
          <p className="body-text">{result.likelyProcess}</p>
          {result.chinaNote ? <p className="small-text">{result.chinaNote}</p> : null}
          <p className="small-text">{t.landing.routeFinder.result.timelineNote}</p>
          <div className="actions">
            <Link className="btn btn-primary" href={`/${locale}/order/new`}>
              {t.landing.routeFinder.ctaPrimary}
            </Link>
            <Link className="btn btn-secondary" href={`/${locale}/order/track`}>
              {t.landing.routeFinder.ctaSecondary}
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );

  useEffect(() => {
    if (!asModal) return;
    closeButtonRef.current?.focus();

    function onKeydown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose?.();
        return;
      }

      if (event.key !== 'Tab') return;
      const root = dialogRef.current;
      if (!root) return;

      const focusables = Array.from(
        root.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])')
      ).filter((el) => !el.hasAttribute('disabled'));

      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey) {
        if (active === first || !root.contains(active)) {
          event.preventDefault();
          last.focus();
        }
        return;
      }

      if (active === last || !root.contains(active)) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKeydown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeydown);
      document.body.style.overflow = previousOverflow;
    };
  }, [asModal, onClose]);

  if (asModal) {
    return (
      <div
        className="route-finder-modal"
        onClick={(e) => {
          if (e.currentTarget === e.target) onClose?.();
        }}
        role="dialog"
      >
        <div aria-labelledby="route-finder-heading" aria-modal="true" className="route-finder-dialog" ref={dialogRef}>
          <button
            aria-label={locale === 'zh' ? '关闭' : 'Close'}
            className="route-finder-close"
            onClick={onClose}
            ref={closeButtonRef}
            type="button"
          >
            ×
          </button>
          {content}
        </div>
      </div>
    );
  }

  return (
    <section className="ui-section surface-1" id="route-finder" aria-labelledby="route-finder-heading">
      <div className="page-container">{content}</div>
    </section>
  );
}
