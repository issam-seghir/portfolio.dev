'use client'

import { ArrowRightIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Link } from '@/components/ui/link'
import { cn } from '@/utils/cn'

function EcomeniaHighlight() {
  const t = useTranslations('about')

  return (
    <div className='not-prose my-10'>
      <div className='rounded-2xl border border-border/60 bg-muted/30 p-6 text-start shadow-sm backdrop-blur-sm sm:p-8'>
        <p className='text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
          {t('featured-ecomenia.heading')}
        </p>
        <h3 className='mt-2 text-xl font-semibold tracking-tight'>{t('featured-ecomenia.title')}</h3>
        <p className='mt-3 text-sm leading-relaxed text-muted-foreground'>{t('featured-ecomenia.body')}</p>
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
  )
}

export default EcomeniaHighlight
