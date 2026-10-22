import { useLocale, useTranslations } from 'next-intl'

import BlurImage from '@/components/blur-image'
import { buttonVariants } from '@/components/ui/button-variants'
import { MY_NAME, MY_NAME_AR } from '@/lib/constants'
import { cn } from '@/utils/cn'

export default function Hero() {
  const t = useTranslations()
  const locale = useLocale()
  const isArabic = locale === 'ar'

  // The name in the page's language leads; the other script sits under it at equal weight.
  const names = isArabic
    ? [
        { text: MY_NAME_AR, lang: 'ar' },
        { text: MY_NAME, lang: 'en' },
      ]
    : [
        { text: MY_NAME, lang: 'en' },
        { text: MY_NAME_AR, lang: 'ar' },
      ]

  return (
    <section id='hero' className='relative mt-8 mb-12 md:mt-16'>
      {/* Kufic grid texture: hero only */}
      <div
        aria-hidden='true'
        className='pointer-events-none absolute -inset-x-6 -top-32 bottom-0 -z-10 bg-[linear-gradient(var(--grid-line)_1px,transparent_1px),linear-gradient(90deg,var(--grid-line)_1px,transparent_1px)] mask-[linear-gradient(to_bottom,black_30%,transparent)] bg-size-[24px_24px] sm:-inset-x-8'
      />

      <div className='grid gap-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-12'>
        <div className='animate-in duration-500 fill-mode-both fade-in slide-in-from-bottom-2'>
          <p className='inline-flex items-center gap-2 rounded-full bg-highlight-soft px-3 py-1 text-sm text-foreground'>
            <span aria-hidden='true' className='size-2 rounded-[2px] bg-highlight' />
            {t('homepage.hero.available')}
          </p>

          <h1 className='mt-6 font-heading font-bold'>
            <span lang={names[0]?.lang} className='block text-6xl/[1] sm:text-7xl/[1] lg:text-8xl/[1]'>
              {names[0]?.text}
            </span>
            <span
              lang={names[1]?.lang}
              className='mt-3 block text-5xl/snug text-primary sm:text-6xl/snug lg:text-7xl/snug'
            >
              {names[1]?.text}
            </span>
          </h1>

          <p className='mt-6 max-w-[46ch] text-lg/relaxed font-light text-balance sm:text-xl/relaxed'>
            {t('homepage.hero.tagline')}
          </p>

          <div className='mt-8 flex flex-wrap gap-3'>
            <a href='#contact' className={cn(buttonVariants({ size: 'lg' }))}>
              {t('homepage.hero.cta-contact')}
            </a>
            <a href='#work' className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}>
              {t('homepage.hero.cta-projects')}
            </a>
          </div>

          <p className='mt-6 text-sm text-muted-foreground'>{t('homepage.hero.location-timezone')}</p>
        </div>

        {/* The photo stands in the doorway from the logo (same arch, normalised to the box) */}
        <svg aria-hidden='true' className='absolute size-0'>
          <clipPath id='hero-arch' clipPathUnits='objectBoundingBox'>
            <path d='M0 1V.4615C0 .2019.2188 0 .5 0S1 .2019 1 .4615V1Z' />
          </clipPath>
        </svg>
        <div className='relative w-52 sm:w-60 md:w-64 lg:w-72'>
          {/* Door frame: drawn on first load, then the photo rises into the doorway and the keystone sets */}
          <svg
            aria-hidden='true'
            viewBox='0 0 100 130'
            preserveAspectRatio='none'
            className='doorway-frame pointer-events-none absolute -inset-s-2.5 -top-2.5 h-[calc(100%+0.625rem)] w-[calc(100%+1.25rem)] overflow-visible text-primary'
          >
            <path
              d='M0 130V60C0 26.25 21.88 0 50 0S100 26.25 100 60V130'
              pathLength='1'
              fill='none'
              stroke='currentColor'
              strokeWidth='1.5'
              vectorEffect='non-scaling-stroke'
            />
          </svg>
          <span
            aria-hidden='true'
            className='doorway-keystone absolute inset-x-0 -top-4 mx-auto size-3 rounded-[2px] bg-highlight'
          />
          <div className='relative aspect-10/13 [clip-path:url(#hero-arch)]'>
            <div className='doorway-photo size-full'>
              <BlurImage
                src='/images/avatar-2.png'
                className='relative size-full'
                imageClassName='object-cover object-center'
                fill
                alt={t('homepage.hero.photo-alt', { name: MY_NAME })}
                lazy={false}
                sizes='(max-width: 768px) 288px, 288px'
                quality={100}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
