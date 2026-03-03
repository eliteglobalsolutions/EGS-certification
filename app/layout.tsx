import './globals.css';
import { TopLoader } from '@/components/ui/TopLoader';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TopLoader />
        {children}
      </body>
    </html>
  );
}
