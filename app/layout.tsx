import type { Metadata, Viewport } from 'next';
import { AnalyticsScript } from '@/components/analytics-script';
import { siteConfig, toAbsoluteUrl } from '@/lib/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  category: siteConfig.category,
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    title: siteConfig.name,
    statusBarStyle: 'default'
  },
  openGraph: {
    type: 'website',
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    url: siteConfig.url,
    images: [
      {
        url: toAbsoluteUrl('/opengraph-image'),
        width: 1200,
        height: 630,
        alt: siteConfig.name
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [toAbsoluteUrl('/opengraph-image')]
  },
  robots: {
    index: true,
    follow: true
  }
};

export const viewport: Viewport = {
  themeColor: '#f8fafc'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased">
        <AnalyticsScript />
        {children}
      </body>
    </html>
  );
}
