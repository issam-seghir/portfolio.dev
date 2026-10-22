'use client'

import type { StoreProduct } from '@/config/store-products'

import { useTranslations } from 'next-intl'

import { buttonVariants } from '@/components/ui/button'
import { Link } from '@/components/ui/link'
import { cn } from '@/utils/cn'

import StoreFilters from './store-filters'
import StorePagination from './store-pagination'
import StoreProductCard from './store-product-card'

type StoreClientProps = {
  products: StoreProduct[]
  totalPages: number
  page: number
}

function StoreClient(props: StoreClientProps) {
  const { products, totalPages, page } = props
  const t = useTranslations('store')

  return (
    <div className='space-y-8'>
      <StoreFilters />

      {products.length === 0 ? (
        <div className='rounded-xl border bg-card/50 p-12 text-center'>
          <p className='mb-4 text-lg font-medium'>{t('empty.title')}</p>
          <p className='mb-6 text-muted-foreground'>{t('empty.description')}</p>
          <Link href='/' className={cn(buttonVariants())}>
            {t('cta.custom-button')}
          </Link>
        </div>
      ) : (
        <>
          <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {products.map((product) => (
              <StoreProductCard key={product.id} {...product} />
            ))}
          </div>

          <StorePagination page={page} totalPages={totalPages} />
        </>
      )}

      <section className='rounded-xl border bg-muted/30 p-8 text-center'>
        <p className='mb-4 font-medium'>{t('cta.custom-title')}</p>
        <p className='mx-auto mb-6 max-w-md text-sm text-muted-foreground'>{t('cta.custom-description')}</p>
        <Link href='/' className={cn(buttonVariants())}>
          {t('cta.custom-button')}
        </Link>
      </section>
    </div>
  )
}

export default StoreClient
