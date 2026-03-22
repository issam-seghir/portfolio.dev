'use client'

import { RssIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Link } from '@/i18n/routing'

function BlogRssCallout() {
  const t = useTranslations()

  return (
    <aside
      className='mb-10 flex flex-col gap-3 rounded-2xl border border-dashed border-border/80 bg-muted/30 px-4 py-4 sm:flex-row sm:items-center sm:gap-4'
      aria-label={t('blog.rss-subscribe')}
    >
      <div className='flex items-center gap-2 font-medium'>
        <RssIcon className='size-4 shrink-0 text-orange-600 dark:text-orange-400' aria-hidden />
        {t('blog.rss-subscribe')}
      </div>
      <p className='text-sm text-muted-foreground sm:min-w-0 sm:flex-1'>{t('blog.rss-description')}</p>
      <Link
        href='/rss.xml'
        className='inline-flex h-9 shrink-0 items-center justify-center rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90'
      >
        {t('common.labels.rss')}
      </Link>
    </aside>
  )
}

export default BlogRssCallout
