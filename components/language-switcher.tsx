'use client';

import { ChevronDown, Globe } from 'lucide-react';
import { useEffect, useState, useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { cn } from '@/lib/utils';

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('language');
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setIsOpen(false);
  }, [locale, pathname]);

  function handleLocaleChange(nextLocale: (typeof routing.locales)[number]) {
    setIsOpen(false);

    if (nextLocale === locale) {
      return;
    }

    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <>
      <div className="relative w-full sm:hidden">
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls="language-switcher-menu"
          onClick={() => setIsOpen((open) => !open)}
          disabled={isPending}
          className="inline-flex w-full items-center justify-between rounded-2xl border border-border bg-white px-4 py-3 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <span className="inline-flex min-w-0 items-center gap-2">
            <Globe aria-hidden="true" className="h-4 w-4 shrink-0" />
            <span className="truncate">
              {t('label')}: {t(locale)}
            </span>
          </span>
          <ChevronDown aria-hidden="true" className={cn('h-4 w-4 shrink-0 transition-transform', isOpen && 'rotate-180')} />
        </button>
        {isOpen ? (
          <div id="language-switcher-menu" className="absolute left-0 right-0 z-20 mt-2 overflow-hidden rounded-2xl border border-border bg-white shadow-lg">
            <div className="flex flex-col p-1">
              {routing.locales.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleLocaleChange(item)}
                  disabled={isPending}
                  className={cn(
                    'rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70',
                    item === locale ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-blue-50 hover:text-blue-800'
                  )}
                >
                  {t(item)}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>
      <div className="hidden max-w-full flex-wrap items-center gap-2 rounded-full border border-border bg-white/90 p-1 shadow-sm sm:flex">
        <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium text-muted-foreground">
          <Globe aria-hidden="true" className="h-3.5 w-3.5" />
          {t('label')}
        </span>
        {routing.locales.map((item) => (
          <Link
            key={item}
            href={pathname}
            locale={item}
            className={cn(
              'rounded-full px-3 py-1 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              item === locale ? 'bg-blue-600 text-white hover:bg-blue-700' : 'text-slate-600 hover:bg-blue-50 hover:text-blue-800'
            )}
          >
            {t(item)}
          </Link>
        ))}
      </div>
    </>
  );
}
