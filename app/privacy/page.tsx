import { redirect } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

export default function LegacyPrivacyPage() {
  redirect({ href: '/privacy', locale: routing.defaultLocale });
}
