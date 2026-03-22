import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'ja', 'zh-Hant', 'zh-Hans'],
  defaultLocale: 'en',
  localePrefix: 'always'
});

export type AppLocale = (typeof routing.locales)[number];
