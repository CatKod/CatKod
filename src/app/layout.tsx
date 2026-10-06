import type { Metadata, Viewport } from 'next';
import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google';
import { site } from '@/content/site';
import './globals.css';

/**
 * Fonts are self-hosted by next/font, so nothing is requested from
 * fonts.gstatic.com at runtime. That avoids leaking a visitor's IP to a
 * third party, which matters for a site aimed at a Japanese employer.
 */
const archivo = Archivo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-archivo',
  weight: ['600', '700', '800'],
});

const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plex-sans',
  weight: ['400', '500', '600'],
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plex-mono',
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    'Embedded Firmware Engineer',
    'STM32H7',
    'CAN bus',
    'CAN 2.0B',
    'FDCAN',
    'MISRA C',
    'State Machine',
    'ESP32',
    'ESP-IDF',
    'FreeRTOS',
    'Edge AI',
    'Embedded Engineer Japan',
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: site.url },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: site.url,
    siteName: `${site.name} — ${site.role}`,
    title: `${site.name} — ${site.role}`,
    description: site.description,
    // A static PNG rather than an `opengraph-image.tsx` route: the Satori
    // renderer behind next/og fails on newer Node runtimes, and a build that
    // only works on one Node version is not a build worth shipping.
    //
    // Left as a bare path on purpose: Next *does* apply basePath to metadata
    // image URLs (unlike images.unoptimized <img> src), and it resolves them
    // against site.url, producing the absolute URL crawlers need. Prefixing
    // here by hand would yield /CatKod/CatKod/og-image.png.
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.role}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — ${site.role}`,
    description: site.description,
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

export const viewport: Viewport = {
  themeColor: '#0b0d10',
  colorScheme: 'dark',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  alternateName: site.handle,
  jobTitle: site.role,
  description: site.positioning,
  url: site.url,
  email: `mailto:${site.email}`,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Hanoi',
    addressCountry: 'VN',
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Hanoi University of Science and Technology',
  },
  knowsLanguage: ['Vietnamese', 'English', 'Japanese'],
  knowsAbout: [
    'Embedded Systems',
    'STM32',
    'CAN bus',
    'FDCAN',
    'MISRA C',
    'State Machines',
    'ESP32',
    'MQTT',
    'Edge AI',
    'Real-time firmware',
  ],
  sameAs: [site.links.github, site.links.linkedin, site.links.facebook],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${plexSans.variable} ${plexMono.variable}`}>
      <body>
        <a className="skip" href="#content">
          Skip to content
        </a>
        <script
          type="application/ld+json"
          // JSON.stringify escapes the content for a <script> body context.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
