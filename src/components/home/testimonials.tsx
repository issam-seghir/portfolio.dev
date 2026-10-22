import { useTranslations } from 'next-intl'

import { ClientQuote } from './client-quote'
import { TESTIMONIALS } from './testimonial-data'

/** Quotes not already shown beside a case study. */
export default function ClientVoices() {
  const t = useTranslations('homepage.testimonials')

  return (
    <section className='my-24'>
      <h2 className='font-heading text-3xl font-semibold sm:text-4xl'>{t('title')}</h2>
      <div className='mt-10 grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-start md:gap-12'>
        <ClientQuote item={TESTIMONIALS.awan} size='lg' />
        <ClientQuote
          item={TESTIMONIALS.basmat}
          length='full'
          className='rounded-xl border bg-card p-5 text-sm/relaxed'
        />
      </div>
    </section>
  )
}
