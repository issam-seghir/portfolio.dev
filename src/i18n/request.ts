import { hasLocale } from 'next-intl'
import { getRequestConfig } from 'next-intl/server'

import { routing } from './routing'
import { loadMessages } from './utils'

// Prefer an explicit override (Server Actions / Route Handlers), then the
// middleware-provided locale. Avoid importing `next/root-params` in this
// module — Next throws "'next/root-params' can only be used inside the App
// Directory" when this file is pulled into the middleware graph.
export default getRequestConfig(
  // eslint-disable-next-line @typescript-eslint/no-deprecated -- requestLocale remains required until root-params works outside App Router
  async ({ locale: localeOverride, requestLocale }) => {
    const requested = localeOverride ?? (await requestLocale)
    const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale

    const messages = await loadMessages(locale)

    return {
      locale,
      messages,
      formats: {
        dateTime: {
          short: {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          },
          long: {
            dateStyle: 'medium',
            timeStyle: 'short',
          },
        },
      },
    }
  },
)
