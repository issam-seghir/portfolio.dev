import type { TestimonialItem } from './testimonial-data'

import { ArrowUpRightIcon } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'

import BlurImage from '@/components/blur-image'
import ProjectCoverTransition from '@/components/project-cover-transition'
import { buttonVariants } from '@/components/ui/button-variants'
import { Link } from '@/components/ui/link'
import { getProjectBySlug } from '@/lib/content'
import { cn } from '@/utils/cn'

import { ClientQuote } from './client-quote'
import { TESTIMONIALS } from './testimonial-data'

/** Client work with a project page, a cover and a named client quote. Copy lives in `homepage.case-studies.items`. */
const CASE_STUDIES: Array<{ slug: string; quote: TestimonialItem }> = [
  { slug: 'ecomenia', quote: TESTIMONIALS.ecomenia },
  { slug: 'compos-resto', quote: TESTIMONIALS.compos },
  { slug: 'creative-book', quote: TESTIMONIALS.creativeBook },
]

const ROWS = ['problem', 'built', 'outcome'] as const

export default function CaseStudies() {
  const t = useTranslations('homepage.case-studies')
  const locale = useLocale()

  return (
    <section id='work' className='my-24 scroll-mt-28'>
      <div className='flex flex-wrap items-end justify-between gap-4'>
        <h2 className='font-heading text-3xl font-semibold sm:text-4xl'>{t('title')}</h2>
        <Link href='/projects' className={cn(buttonVariants({ variant: 'outline' }))}>
          {t('more')}
        </Link>
      </div>

      <div className='mt-6 divide-y'>
        {CASE_STUDIES.map(({ slug, quote }, index) => {
          const project = getProjectBySlug(locale, slug)
          if (!project) return null
          const key = `items.${slug}` as const
          const href = `/projects/${slug}`

          return (
            <article
              key={slug}
              className='group/case grid gap-6 py-10 md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] md:items-start md:gap-10'
            >
              {/* Same destination as the title link, so it stays out of the tab order */}
              <Link href={href} tabIndex={-1} aria-hidden='true' className='scroll-rise block rounded-xl'>
                <ProjectCoverTransition slug={slug}>
                  <div className='relative aspect-16/10 overflow-hidden rounded-xl border bg-muted'>
                    <BlurImage
                      fill
                      src={`/images/projects/${slug}/cover.webp`}
                      alt=''
                      className='absolute inset-0 size-full'
                      imageClassName='object-cover object-center group-hover/case:scale-[1.04] group-has-focus-visible/case:scale-[1.04] motion-reduce:scale-100!'
                      style={{ transition: 'filter 700ms ease, scale 500ms cubic-bezier(0.2, 0.8, 0.2, 1)' }}
                      sizes='(max-width: 768px) 100vw, 640px'
                      lazy={index > 0}
                    />
                    <span className='absolute inset-s-3 bottom-3 rounded-md bg-background px-2.5 py-1 text-xs font-medium opacity-0 transition-[translate,opacity] duration-250 group-hover/case:translate-y-0 group-hover/case:opacity-100 group-has-focus-visible/case:translate-y-0 group-has-focus-visible/case:opacity-100 motion-safe:translate-y-2'>
                      {t('read')}
                    </span>
                  </div>
                </ProjectCoverTransition>
              </Link>

              <div className='grid min-w-0 gap-5'>
                <div className='grid gap-2'>
                  <p className='text-sm text-muted-foreground'>
                    <bdi lang='en'>{t(`${key}.client` as never)}</bdi>
                    {t('separator')}
                    {t(`${key}.role` as never)}
                  </p>
                  <h3 className='font-heading text-2xl/tight font-semibold text-balance'>
                    <Link href={href} className='hover:text-primary'>
                      {t(`${key}.title` as never)}
                    </Link>
                  </h3>
                </div>

                <dl className='grid gap-2 text-sm/relaxed'>
                  {ROWS.map((row) => (
                    <div key={row} className='grid grid-cols-[6.5rem_minmax(0,1fr)] gap-3'>
                      <dt className='text-muted-foreground'>{t(row)}</dt>
                      <dd>{t(`${key}.${row}` as never)}</dd>
                    </div>
                  ))}
                </dl>

                <ClientQuote item={quote} className='rounded-xl border bg-card p-4 text-sm/relaxed' />

                <Link
                  href={href}
                  className='inline-flex w-fit items-center gap-1.5 text-sm font-medium text-primary hover:underline'
                >
                  {t('read')}
                  <ArrowUpRightIcon
                    aria-hidden='true'
                    className='size-4 transition-[translate] duration-250 group-hover/case:translate-x-0.5 group-hover/case:-translate-y-0.5 rtl:-scale-x-100 rtl:group-hover/case:-translate-x-0.5'
                  />
                </Link>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
