import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';
import { headers } from 'next/headers';
import { TopLoader } from '@/components/ui/TopLoader';
import { siteUrl } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const requestHeaders = await headers();
  const htmlLang = requestHeaders.get('x-egs-html-lang') || 'en';
  const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || 'AW-17994379586';

  return (
    <html lang={htmlLang}>
      <body>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${googleAdsId}`}
          strategy="afterInteractive"
        />
        <Script id="google-ads-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${googleAdsId}');
          `}
        </Script>
        <TopLoader />
        {children}
      </body>
    </html>
  );
}
