import type { ReactNode, SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
  strokeWidth?: number;
};

function IconBase({ size = 24, strokeWidth = 1.8, children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      fill="none"
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      viewBox="0 0 24 24"
      width={size}
      {...props}
    >
      {children}
    </svg>
  );
}

export function FileCheck2(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7z" />
      <path d="M14 2v5h5" />
      <path d="m9 15 2 2 4-4" />
    </IconBase>
  );
}

export function Landmark(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m3 10 9-6 9 6" />
      <path d="M4 10h16" />
      <path d="M6 10v8" />
      <path d="M10 10v8" />
      <path d="M14 10v8" />
      <path d="M18 10v8" />
      <path d="M3 18h18" />
      <path d="M2 22h20" />
    </IconBase>
  );
}

export function Languages(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m5 8 6 6" />
      <path d="m4 14 6-6 2-3" />
      <path d="M2 5h12" />
      <path d="M7 2v3" />
      <path d="m14 19 4-9 4 9" />
      <path d="M16 15h4" />
    </IconBase>
  );
}

export function ShieldCheck(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 2 5 5v6c0 5 3.5 8.5 7 10 3.5-1.5 7-5 7-10V5z" />
      <path d="m9 12 2 2 4-4" />
    </IconBase>
  );
}
