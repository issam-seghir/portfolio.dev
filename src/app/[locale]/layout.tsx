import '@/styles/globals.css'

import type { Viewport } from 'next'

import { SpeedInsights } from '@vercel/speed-insights/next'
import { JetBrains_Mono, Readex_Pro, Reem_Kufi } from 'next/font/google'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
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
    { media: '(prefers-color-scheme: light)', color: '#f5f7f4' },
    { media: '(prefers-color-scheme: dark)', color: '#0b1620' },
  ],
}

// Both families cover Arabic and Latin, so en and ar share one type system.
const readexPro = Readex_Pro({
  variable: '--font-text',
  subsets: ['latin', 'arabic'],
  display: 'swap',
})

const reemKufi = Reem_Kufi({
  variable: '--font-display',
  subsets: ['latin', 'arabic'],
  display: 'swap',
})

const jetBrainsMono = JetBrains_Mono({
  variable: '--font-mono-main',
  subsets: ['latin'],
  display: 'swap',
})

async function Layout(props: LayoutProps<'/[locale]'>) {
  const { children, params } = props
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <html
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className={cn(readexPro.variable, reemKufi.variable, jetBrainsMono.variable)}
      data-scroll-behavior='smooth'
      suppressHydrationWarning
    >
      <body className='relative flex min-h-screen flex-col overflow-x-clip'>
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
