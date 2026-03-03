'use client';

import Link from 'next/link';
import type { PointerEvent, Ref } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

export function Button({
  children,
  variant = 'primary',
  href,
  type = 'button',
  onClick,
  disabled,
  buttonRef,
}: {
  children: React.ReactNode;
  variant?: Variant;
  href?: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
  disabled?: boolean;
  buttonRef?: Ref<HTMLButtonElement>;
}) {
  const className = `btn btn-${variant}`;

  // Lightweight ripple without changing Button API or layout.
  const handleRipple = (event: PointerEvent<HTMLElement>) => {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.25;
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    const ripple = document.createElement('span');
    ripple.className = 'btn-ripple';
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    target.appendChild(ripple);
    window.setTimeout(() => ripple.remove(), 340);
  };

  if (href) {
    return (
      <Link className={className} href={href} onPointerDown={handleRipple}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={className}
      disabled={disabled}
      onClick={onClick}
      onPointerDown={handleRipple}
      ref={buttonRef}
      type={type}
    >
      {children}
    </button>
  );
}
