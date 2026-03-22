import type { AppLocale } from '@/i18n/routing';

export const siteConfig = {
  name: 'Rate Kit',
  shortName: 'Rate Kit',
  description: 'Free hourly rate, day rate, and retainer calculators for freelancers, consultants, and small studios.',
  keywords: ['hourly rate calculator', 'day rate calculator', 'retainer calculator', 'freelance pricing', 'consulting rates'],
  category: 'business',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rate-kit.vercel.app',
  defaultLocale: 'en' as AppLocale,
  localeMetadata: {
    en: {
      bcp47: 'en',
      og: 'en_US'
    },
    ja: {
      bcp47: 'ja',
      og: 'ja_JP'
    },
    'zh-Hant': {
      bcp47: 'zh-Hant',
      og: 'zh_TW'
    },
    'zh-Hans': {
      bcp47: 'zh-Hans',
      og: 'zh_CN'
    }
  }
} as const;

export function getLocaleMetadata(locale: AppLocale) {
  return siteConfig.localeMetadata[locale] ?? siteConfig.localeMetadata[siteConfig.defaultLocale];
}

export function toAbsoluteUrl(path: string) {
  return new URL(path, siteConfig.url).toString();
}
