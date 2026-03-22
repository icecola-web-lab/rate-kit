'use client';

import { Globe } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { cn } from '@/lib/utils';

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations('language');

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-full border border-border bg-white/90 p-1 shadow-sm">
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
  );
}
