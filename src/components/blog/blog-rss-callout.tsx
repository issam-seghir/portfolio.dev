'use client'

import { RssIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { buttonVariants } from '@/components/ui/button'
import { Link } from '@/i18n/routing'
import { cn } from '@/utils/cn'

export default function BlogRssCallout() {
  const t = useTranslations()

  return (
    <aside
      className='mb-10 flex flex-col gap-3 rounded-xl border border-dashed border-border/80 bg-muted/30 p-4 sm:flex-row sm:items-center sm:gap-4'
      aria-label={t('blog.rss-subscribe')}
    >
      <div className='flex items-center gap-2 font-medium'>
        <RssIcon className='size-4 shrink-0 text-primary' aria-hidden />
        {t('blog.rss-subscribe')}
      </div>
      <p className='text-sm text-muted-foreground sm:min-w-0 sm:flex-1'>{t('blog.rss-description')}</p>
      <Link href='/rss.xml' className={cn(buttonVariants(), 'shrink-0 px-4')}>
        {t('common.labels.rss')}
      </Link>
    </aside>
  )
}
