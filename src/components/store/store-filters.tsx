'use client'

import { SearchIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useQueryStates } from 'nuqs'

import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { storeParamsParsers } from '@/lib/store-params-parsers'

import { Button } from '../ui/button'

const CATEGORIES = ['all', 'course', 'template', 'service'] as const
const SORT_OPTIONS = ['newest', 'price-asc', 'price-desc', 'name'] as const

function StoreFilters() {
  const t = useTranslations('store.filters')
  const [params, setParams] = useQueryStates(storeParamsParsers)

  return (
    <div className='flex flex-col gap-4 rounded-2xl border bg-card/50 p-4 shadow-sm md:flex-row md:items-center md:gap-6'>
      <div className='flex-1'>
        <InputGroup>
          <InputGroupAddon>
            <SearchIcon className='text-muted-foreground' />
          </InputGroupAddon>
          <InputGroupInput
            type='search'
            value={params.q}
            onChange={(e) => setParams({ q: e.target.value || null, page: 1 })}
            placeholder={t('search-placeholder')}
            aria-label={t('search-placeholder')}
            className='w-full pl-12'
          />
        </InputGroup>
      </div>
      <div className='flex flex-wrap items-center gap-2'>
        {CATEGORIES.map((cat) => (
          <Button
            key={cat}
            variant={params.category === cat ? 'default' : 'outline'}
            size='sm'
            onClick={() => setParams({ category: cat, page: 1 })}
          >
            {t(`category.${cat}`)}
          </Button>
        ))}
      </div>
      <div className='flex items-center gap-2'>
        <span className='text-sm text-muted-foreground'>{t('sort-label')}</span>
        <Select
          value={params.sort}
          onValueChange={(value) =>
            setParams({ sort: value as (typeof SORT_OPTIONS)[number], page: 1 })
          }
        >
          <SelectTrigger className='w-[180px]'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((opt) => (
              <SelectItem key={opt} value={opt}>
                {t(`sort.${opt}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default StoreFilters
