import { NativeAppInit } from '@/components/customer-app/NativeAppInit';

export default function AppSectionLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NativeAppInit />
      {children}
    </>
  );
}
