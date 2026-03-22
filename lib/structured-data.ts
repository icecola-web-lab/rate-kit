import type { AppLocale } from '@/i18n/routing';
import { getLocalizedPath } from '@/lib/seo';
import { getLocaleMetadata, siteConfig, toAbsoluteUrl } from '@/lib/site';

type FaqItem = {
  question: string;
  answer: string;
};

type BreadcrumbItem = {
  name: string;
  path: string;
};

export function buildWebSiteSchema(locale: AppLocale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    description: siteConfig.description,
    inLanguage: getLocaleMetadata(locale).bcp47,
    url: toAbsoluteUrl(getLocalizedPath(locale, '/'))
  };
}

export function buildSoftwareApplicationSchema({
  locale,
  path,
  name,
  description
}: {
  locale: AppLocale;
  path: string;
  name: string;
  description: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any',
    isAccessibleForFree: true,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    inLanguage: getLocaleMetadata(locale).bcp47,
    url: toAbsoluteUrl(getLocalizedPath(locale, path))
  };
}

export function buildFaqSchema(locale: AppLocale, items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: getLocaleMetadata(locale).bcp47,
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };
}

export function buildArticleSchema({
  locale,
  path,
  title,
  description
}: {
  locale: AppLocale;
  path: string;
  title: string;
  description: string;
}) {
  const url = toAbsoluteUrl(getLocalizedPath(locale, path));

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    inLanguage: getLocaleMetadata(locale).bcp47,
    mainEntityOfPage: url,
    url,
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url
    }
  };
}

export function buildBreadcrumbSchema(locale: AppLocale, items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: toAbsoluteUrl(getLocalizedPath(locale, item.path))
    }))
  };
}
