import type { MetadataRoute } from 'next'

import { routing } from '@/i18n/routing'
import { getLocalizedPath } from '@/utils/get-localized-path'
import { getPathnames } from '@/utils/get-pathnames'

function getPriority(pathname: string): number {
  if (pathname === '/') return 1.0
  if (pathname.startsWith('/blog') || pathname.startsWith('/projects')) return 0.8
  if (pathname === '/about') return 0.7
  return 0.5
}

function getChangeFrequency(pathname: string): MetadataRoute.Sitemap[number]['changeFrequency'] {
  if (pathname === '/') return 'daily'
  if (pathname === '/blog') return 'weekly'
  if (pathname.startsWith('/blog/')) return 'monthly'
  if (pathname === '/projects') return 'weekly'
  if (pathname.startsWith('/projects/')) return 'monthly'
  return 'monthly'
}

function sitemap(): MetadataRoute.Sitemap {
  const pathnames = getPathnames().filter((p) => p !== '/design')

  return routing.locales.flatMap((locale) =>
    pathnames.map((pathname) => ({
      url: getLocalizedPath({ locale, pathname }),
      lastModified: new Date(),
      changeFrequency: getChangeFrequency(pathname),
      priority: getPriority(pathname),
    })),
  )
}

export default sitemap
