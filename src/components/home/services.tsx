import { useTranslations } from 'next-intl'

import { cn } from '@/utils/cn'

/** The bilingual offer is the one that sets this practice apart, so it carries the brand colour. */
const BILINGUAL_SERVICE = 3

export default function Services() {
  const t = useTranslations('homepage.services')
  const services = [
    { title: t('items.0.title'), body: t('items.0.body') },
    { title: t('items.1.title'), body: t('items.1.body') },
    { title: t('items.2.title'), body: t('items.2.body') },
    { title: t('items.3.title'), body: t('items.3.body') },
  ]
  const steps = [
    { title: t('steps.0.title'), body: t('steps.0.body') },
    { title: t('steps.1.title'), body: t('steps.1.body') },
    { title: t('steps.2.title'), body: t('steps.2.body') },
    { title: t('steps.3.title'), body: t('steps.3.body') },
  ]

  return (
    <section id='services' className='my-24 scroll-mt-28'>
      <h2 className='font-heading text-3xl font-semibold sm:text-4xl'>{t('title')}</h2>
      <ul className='mt-8 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4'>
        {services.map((item, i) => (
          <li
            key={i}
            className={cn(
              'grid content-start gap-2 border-t-2 pt-4',
              i === BILINGUAL_SERVICE ? 'border-primary' : 'border-foreground',
            )}
          >
            <h3 className='font-heading text-xl font-semibold'>{item.title}</h3>
            <p className='text-sm/relaxed text-pretty text-muted-foreground'>{item.body}</p>
          </li>
        ))}
      </ul>

      <h3 className='mt-16 font-heading text-2xl font-semibold'>{t('process-title')}</h3>
      <ol className='mt-6 grid sm:grid-cols-2 lg:grid-cols-4'>
        {steps.map((step, i) => (
          <li
            key={i}
            className='grid content-start gap-1 border-t py-4 pe-4 sm:not-first:ps-4 sm:even:border-s sm:max-lg:nth-3:ps-0 lg:not-first:border-s'
          >
            <span className='font-mono text-xs text-primary'>{i + 1}</span>
            <span className='font-medium'>{step.title}</span>
            <span className='text-sm/relaxed text-pretty text-muted-foreground'>{step.body}</span>
          </li>
        ))}
      </ol>
    </section>
  )
}
