'use client'

import { ArrowRightIcon, RocketIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Link } from '@/components/ui/link'
import { cn } from '@/utils/cn'

function EcomeniaHighlight() {
  const t = useTranslations('about')

  return (
    <div className='not-prose my-10'>
      <div
        className={cn(
          'relative overflow-hidden rounded-2xl border border-border/60 bg-muted/30 shadow-sm backdrop-blur-sm',
          'border-s-4 border-s-primary/70',
        )}
      >
        <div
          className='pointer-events-none absolute inset-0 bg-linear-to-br from-primary/4 via-transparent to-violet-500/4'
          aria-hidden
        />

        <div className='relative p-6 text-start sm:p-8'>
          <div className='flex items-center gap-2'>
            <span className='flex size-7 items-center justify-center rounded-md bg-primary/10 text-primary'>
              <RocketIcon className='size-3.5' />
            </span>
            <p className='text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
              {t('featured-ecomenia.heading')}
            </p>
          </div>

          <h3 className='mt-3 text-xl font-semibold tracking-tight'>{t('featured-ecomenia.title')}</h3>
          <p className='mt-2 text-sm leading-relaxed text-muted-foreground'>{t('featured-ecomenia.body')}</p>

          <Link
            href='/projects'
            className={cn(
              'mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary',
              'underline-offset-4 hover:underline',
            )}
          >
            {t('featured-ecomenia.cta')}
            <ArrowRightIcon className='size-4 rtl:rotate-180' aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default EcomeniaHighlight
