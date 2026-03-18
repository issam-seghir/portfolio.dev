'use client'

import type { StoreProduct } from '@/config/store-products'

import { StarIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

import BlurImage from '@/components/blur-image'
import { Badge } from '@/components/ui/badge'
import { Link } from '@/components/ui/link'

type StoreProductCardProps = StoreProduct

function StoreProductCard(props: StoreProductCardProps) {
  const { name, description, price, category, image, link, featured } = props
  const t = useTranslations('store')

  return (
    <article className='group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-shadow hover:shadow-md'>
      <Link href={link} className='relative block'>
        <div className='relative aspect-video overflow-hidden'>
          <BlurImage
            src={image}
            alt={name}
            width={400}
            height={225}
            className='object-cover'
            imageClassName='transition-transform duration-300 group-hover:scale-105'
          />
          {featured && (
            <div className='absolute top-3 end-3 z-10 flex items-center gap-1 rounded-full bg-amber-500/90 px-2.5 py-1 text-[10px] font-semibold text-white'>
              <StarIcon className='size-3' />
              {t('featured')}
            </div>
          )}
        </div>
        <div className='flex flex-1 flex-col p-4'>
          <Badge variant='outline' className='mb-2 w-fit text-xs'>
            {t(`categories.${category}`)}
          </Badge>
          <h3 className='text-lg font-semibold'>{name}</h3>
          <p className='mt-2 line-clamp-2 text-sm text-muted-foreground'>{description}</p>
          <div className='mt-4 flex items-center justify-between'>
            {price != null ? (
              <span className='font-medium'>{t('price-format', { value: price })}</span>
            ) : (
              <span className='text-sm text-muted-foreground'>{t('price-inquire')}</span>
            )}
            <span className='text-sm font-medium text-primary group-hover:underline'>
              {t('cta.view')}
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}

export default StoreProductCard
