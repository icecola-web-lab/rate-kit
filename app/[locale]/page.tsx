import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ArrowRight, CalendarDays, Clock3, Wallet } from 'lucide-react';
import { StructuredData } from '@/components/structured-data';
import { Link } from '@/i18n/navigation';
import type { AppLocale } from '@/i18n/routing';
import { buildPageMetadata } from '@/lib/seo';
import { buildFaqSchema, buildSoftwareApplicationSchema, buildWebSiteSchema } from '@/lib/structured-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type LocalePageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: LocalePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home.meta' });
  return buildPageMetadata({ locale, path: '/', title: t('title'), description: t('description') });
}

export default async function HomePage({ params }: LocalePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('home');

  const cards = [
    { icon: Clock3, href: '/hourly-rate-calculator', title: t('cards.hourlyRate.title'), description: t('cards.hourlyRate.description'), cta: t('cards.hourlyRate.cta') },
    { icon: CalendarDays, href: '/day-rate-calculator', title: t('cards.dayRate.title'), description: t('cards.dayRate.description'), cta: t('cards.dayRate.cta') },
    { icon: Wallet, href: '/retainer-calculator', title: t('cards.retainer.title'), description: t('cards.retainer.description'), cta: t('cards.retainer.cta') }
  ];

  const audience = t.raw('audience') as string[];
  const value = t.raw('value') as string[];
  const faq = t.raw('faq') as Array<{ question: string; answer: string }>;
  const appLocale = locale as AppLocale;

  const schemas = [
    buildWebSiteSchema(appLocale),
    buildSoftwareApplicationSchema({
      locale: appLocale,
      path: '/',
      name: 'Rate Kit',
      description: t('description')
    }),
    buildFaqSchema(appLocale, faq)
  ];

  return (
    <main>
      <StructuredData data={schemas} />
      <section className="container pt-10 sm:pt-16">
        <div className="rounded-[1.75rem] border border-border bg-gradient-to-br from-white to-slate-50 p-8 shadow-soft sm:p-12">
          <span className="section-kicker">{t('eyebrow')}</span>
          <h1 className="mt-5 max-w-4xl text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">{t('title')}</h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">{t('description')}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/hourly-rate-calculator">{t('primaryCta')}</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/guides/hourly-vs-project-pricing">{t('secondaryCta')}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container pt-10 sm:pt-14">
        <div className="mb-6 flex flex-col gap-3">
          <span className="section-kicker">{t('toolsKicker')}</span>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">{t('toolsTitle')}</h2>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Card key={card.href} className="h-full">
                <CardHeader className="space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                    <Icon aria-hidden="true" className="h-6 w-6" />
                  </div>
                  <CardTitle>{card.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex h-[calc(100%-8rem)] flex-col justify-between gap-5">
                  <p className="text-sm leading-7 text-muted-foreground">{card.description}</p>
                  <Link href={card.href} className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    {card.cta}
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="container grid gap-4 py-10 sm:grid-cols-2 sm:py-14">
        <Card>
          <CardHeader>
            <CardTitle>{t('audienceTitle')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm leading-7 text-muted-foreground sm:text-base">
              {audience.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t('valueTitle')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm leading-7 text-muted-foreground sm:text-base">
              {value.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="container pb-10 sm:pb-14">
        <Card>
          <CardHeader>
            <span className="section-kicker w-fit">{t('faqKicker')}</span>
            <CardTitle className="mt-3">{t('faqTitle')}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            {faq.map((item) => (
              <div key={item.question} className="rounded-2xl border border-border bg-white p-5">
                <h3 className="text-lg font-semibold text-foreground">{item.question}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground sm:text-base">{item.answer}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
