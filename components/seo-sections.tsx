import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export type SeoContentSection = {
  title: string;
  paragraphs: string[];
};

export type SeoFaqItem = {
  question: string;
  answer: string;
};

export function SeoSections({ sections }: { sections: SeoContentSection[] }) {
  return (
    <section className="mt-8 grid gap-4">
      {sections.map((section) => (
        <Card key={section.title}>
          <CardHeader>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">{section.title}</h2>
          </CardHeader>
          <CardContent className="space-y-4 prose-muted">
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </CardContent>
        </Card>
      ))}
    </section>
  );
}

export function SeoFaqSection({ title, items }: { title: string; items: SeoFaqItem[] }) {
  return (
    <section className="mt-8">
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h2>
        </CardHeader>
        <CardContent className="grid gap-4">
          {items.map((item) => (
            <div key={item.question} className="rounded-2xl border border-border bg-white p-5">
              <h3 className="text-lg font-semibold text-foreground">{item.question}</h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground sm:text-base">{item.answer}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}
