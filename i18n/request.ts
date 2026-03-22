import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

function isLocale(value: string): value is (typeof routing.locales)[number] {
  return routing.locales.includes(value as (typeof routing.locales)[number]);
}

export default getRequestConfig(async ({ locale, requestLocale }) => {
  const requestedLocale = locale ?? (await requestLocale) ?? routing.defaultLocale;
  const resolvedLocale = isLocale(requestedLocale) ? requestedLocale : routing.defaultLocale;

  return {
    locale: resolvedLocale,
    messages: (await import(`../messages/${resolvedLocale}.json`)).default
  };
});
