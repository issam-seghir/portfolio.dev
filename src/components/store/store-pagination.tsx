'use client'

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useQueryStates } from 'nuqs'

import { Button } from '@/components/ui/button'
import { storeParamsParsers } from '@/lib/store-params-parsers'

type StorePaginationProps = {
  page: number
  totalPages: number
}

function StorePagination(props: StorePaginationProps) {
  const { page, totalPages } = props
  const t = useTranslations('store.pagination')
  const [, setParams] = useQueryStates(storeParamsParsers)

  if (totalPages <= 1) return null

  const canPrev = page > 1
  const canNext = page < totalPages

  const pageNumbers: number[] = []
  const maxVisible = 5
  let start = Math.max(1, page - Math.floor(maxVisible / 2))
  let end = Math.min(totalPages, start + maxVisible - 1)
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }
  for (let i = start; i <= end; i++) {
    pageNumbers.push(i)
  }

  return (
    <nav
      className='flex flex-wrap items-center justify-center gap-2 pt-8'
      aria-label={t('aria-label')}
    >
      <Button
        variant='outline'
        size='sm'
        disabled={!canPrev}
        onClick={() => setParams({ page: page - 1 })}
        aria-label={t('prev')}
      >
        <ChevronLeftIcon className='size-4' />
      </Button>
      <div className='flex items-center gap-1'>
        {pageNumbers.map((n) => (
          <Button
            key={n}
            variant={n === page ? 'default' : 'outline'}
            size='sm'
            onClick={() => setParams({ page: n })}
            aria-current={n === page ? 'page' : undefined}
            aria-label={t('page', { n })}
          >
            {n}
          </Button>
        ))}
      </div>
      <Button
        variant='outline'
        size='sm'
        disabled={!canNext}
        onClick={() => setParams({ page: page + 1 })}
        aria-label={t('next')}
      >
        <ChevronRightIcon className='size-4' />
      </Button>
    </nav>
  )
}

export default StorePagination
