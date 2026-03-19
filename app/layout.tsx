import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';
import { headers } from 'next/headers';
import { DM_Sans, Cormorant_Garamond } from 'next/font/google';
import { TopLoader } from '@/components/ui/TopLoader';
import { siteUrl } from '@/lib/seo';

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'EGS Verification',
  url: 'https://eliteglobalsolutions.co',
  description:
    'Independent document coordination service providing apostille and consular legalisation for Australian and international documents.',
  areaServed: 'Worldwide',
  serviceType: 'Document Apostille and Legalisation Coordination',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'AU',
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const requestHeaders = await headers();
  const htmlLang = requestHeaders.get('x-egs-html-lang') || 'en';
  const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || 'AW-17994379586';

  return (
    <html lang={htmlLang} className={`${dmSans.variable} ${cormorant.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
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
