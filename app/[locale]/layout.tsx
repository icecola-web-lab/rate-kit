import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { LanguageSwitcher } from '@/components/language-switcher';
import { MainNav } from '@/components/main-nav';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { siteConfig } from '@/lib/site';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type LocaleLayoutProps = Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>;

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const footer = await getTranslations({ locale, namespace: 'footer' });
  const common = await getTranslations({ locale, namespace: 'common' });

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <div className="page-shell">
        <a
          href="#main-content"
          className="sr-only absolute left-4 top-4 z-50 rounded-md bg-background px-3 py-2 text-sm font-medium text-foreground shadow-sm focus:not-sr-only focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          {common('skipToMainContent')}
        </a>
        <header className="border-b border-border bg-white/85 backdrop-blur">
          <div className="container flex flex-col gap-4 py-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <Link href="/" className="text-xl font-semibold tracking-tight text-foreground">
                  {siteConfig.name}
                </Link>
              </div>
              <LanguageSwitcher />
            </div>
            <MainNav />
          </div>
        </header>
        <div id="main-content" tabIndex={-1}>
          {children}
        </div>
        <footer className="border-t border-border bg-white/80">
          <div className="container flex flex-col gap-2 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <span>{siteConfig.name}</span>
            <span>{footer('note')}</span>
          </div>
        </footer>
      </div>
    </NextIntlClientProvider>
  );
}
