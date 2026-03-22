import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import { getLocaleMetadata, siteConfig, toAbsoluteUrl } from '@/lib/site';

export function getLocalizedPath(locale: string, path = '/') {
  return path === '/' ? `/${locale}` : `/${locale}${path}`;
}

export function getAlternates(path = '/') {
  return {
    'x-default': getLocalizedPath(routing.defaultLocale, path),
    ...Object.fromEntries(routing.locales.map((locale) => [locale, getLocalizedPath(locale, path)]))
  };
}

export function buildPageMetadata({
  locale,
  path,
  title,
  description
}: {
  locale: string;
  path: string;
  title: string;
  description: string;
}): Metadata {
  const localeMetadata = getLocaleMetadata(locale as (typeof routing.locales)[number]);

  return {
    applicationName: siteConfig.name,
    title,
    description,
    keywords: [...siteConfig.keywords],
    category: siteConfig.category,
    alternates: {
      canonical: getLocalizedPath(locale, path),
      languages: getAlternates(path)
    },
    robots: {
      index: true,
      follow: true
    },
    openGraph: {
      title,
      description,
      url: toAbsoluteUrl(getLocalizedPath(locale, path)),
      siteName: siteConfig.name,
      locale: localeMetadata.og,
      type: 'website',
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
      title,
      description,
      images: [toAbsoluteUrl('/opengraph-image')]
    }
  };
}
