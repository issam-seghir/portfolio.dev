import type { Viewport } from 'next'

import '@/styles/globals.css'

import { SpeedInsights } from '@vercel/speed-insights/next'
import { Geist, Geist_Mono, Noto_Sans_Arabic } from 'next/font/google'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

import Analytics from '@/components/analytics'
import Hello from '@/components/hello'
import Providers from '@/components/providers'
import SignInDialog from '@/components/sign-in-dialog'
import { routing } from '@/i18n/routing'
import { cn } from '@/utils/cn'

export function generateStaticParams(): Array<{ locale: string }> {
  return routing.locales.map((locale) => ({ locale }))
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const notoSansArabic = Noto_Sans_Arabic({
  variable: '--font-noto-sans-arabic',
  subsets: ['arabic'],
  display: 'swap',
})

async function Layout(props: LayoutProps<'/[locale]'>) {
  const { children, params } = props
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  return (
    <html
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className={cn(geistSans.variable, geistMono.variable, notoSansArabic.variable)}
      data-scroll-behavior='smooth'
      suppressHydrationWarning
    >
      <body className='relative flex min-h-screen flex-col'>
        <NuqsAdapter>
          <Providers>
            <NextIntlClientProvider>
              <Hello />
              {children}
              <Analytics />
              <SignInDialog />
            </NextIntlClientProvider>
          </Providers>
        </NuqsAdapter>
        <SpeedInsights />
      </body>
    </html>
  )
}

export default Layout
