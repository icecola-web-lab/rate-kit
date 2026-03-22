import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type LocalePageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: LocalePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legal.terms' });
  return buildPageMetadata({ locale, path: '/terms', title: t('title'), description: t('title') });
}

export default async function TermsPage({ params }: LocalePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('legal.terms');
  const paragraphs = t.raw('paragraphs') as string[];

  return (
    <main className="container py-10 sm:py-14">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{t('title')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 prose-muted">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </CardContent>
      </Card>
    </main>
  );
}
