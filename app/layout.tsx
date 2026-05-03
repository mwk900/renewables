import type { Metadata } from 'next';
import { DM_Serif_Display, DM_Sans } from 'next/font/google';
import './globals.css';

const dmSerif = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-dm-serif',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Meridian Energy Solutions — UK Renewable Energy Developer',
  description:
    'Solar farms, onshore wind, and battery storage projects across the UK. From feasibility to grid connection.',
  metadataBase: new URL('https://meridian-energy.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Meridian Energy Solutions — UK Renewable Energy Developer',
    description:
      'Solar farms, onshore wind, and battery storage projects across the UK. From feasibility to grid connection.',
    url: 'https://meridian-energy.vercel.app',
    siteName: 'Meridian Energy Solutions',
    type: 'website',
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Meridian Energy Solutions — UK Renewable Energy Developer',
    description:
      'Solar farms, onshore wind, and battery storage projects across the UK. From feasibility to grid connection.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSerif.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-navy text-text-primary">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Meridian Energy Solutions',
              description: 'UK renewable energy developer. Solar, wind, and battery storage from feasibility to grid connection.',
              url: 'https://meridian-energy.vercel.app',
            }),
          }}
        />
        <div className="relative z-[1] flex flex-col flex-1">
          {children}
        </div>
      </body>
    </html>
  );
}
