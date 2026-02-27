import './globals.css';
import { AppProviders } from '@/components/providers/AppProviders';
import { SiteShell } from '@/components/layout/SiteShell';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppProviders>
          <SiteShell>{children}</SiteShell>
        </AppProviders>
      </body>
    </html>
  );
}
