import { createNavigation } from 'next-intl/navigation'
import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'ar'] as const,
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  localeDetection: true,
  localeCookie: {
    secure: true,
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 365,
  },
})

export const localeLabels: Record<(typeof routing.locales)[number], string> = {
  en: 'English',
  ar: 'العربية',
}

export const { Link, usePathname, useRouter, redirect } = createNavigation(routing)
