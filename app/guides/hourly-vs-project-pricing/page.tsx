import { redirect } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

export default function LegacyGuidePage() {
  redirect({ href: '/guides/hourly-vs-project-pricing', locale: routing.defaultLocale });
}
