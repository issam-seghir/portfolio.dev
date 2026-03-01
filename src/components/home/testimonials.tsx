'use client'

import { QuoteIcon } from 'lucide-react'
import { motion, useInView } from 'motion/react'
import { useTranslations } from 'next-intl'
import { useRef } from 'react'

import { Marquee } from '@/components/ui/marquee'

type TestimonialItem = {
  quoteKey: string
  nameKey: string
  roleKey: string
  initials: string
  color: string
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    quoteKey: 'about.testimonials.0.quote',
    nameKey: 'about.testimonials.0.name',
    roleKey: 'about.testimonials.0.role',
    initials: 'AB',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    quoteKey: 'about.testimonials.1.quote',
    nameKey: 'about.testimonials.1.name',
    roleKey: 'about.testimonials.1.role',
    initials: 'SM',
    color: 'from-violet-500 to-pink-500',
  },
  {
    quoteKey: 'about.testimonials.2.quote',
    nameKey: 'about.testimonials.2.name',
    roleKey: 'about.testimonials.2.role',
    initials: 'YK',
    color: 'from-emerald-500 to-teal-500',
  },
]

function HomeTestimonials() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const t = useTranslations()

  return (
    <div ref={ref} className='relative my-24'>
      <motion.h2
        className='text-center text-3xl font-semibold'
        initial={{ y: 30, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : undefined}
        transition={{ duration: 0.3 }}
      >
        {t('homepage.testimonials.title')}
      </motion.h2>
      <motion.p
        className='mx-auto mt-3 max-w-md text-center text-muted-foreground'
        initial={{ opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {t('homepage.testimonials.subtitle')}
      </motion.p>

      <motion.div
        className='mt-12'
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Marquee duration={40} pauseOnHover fade>
          {[...TESTIMONIALS, ...TESTIMONIALS].map((item, idx) => (
            <TestimonialCard key={`${item.nameKey}-${idx}`} item={item} />
          ))}
        </Marquee>
      </motion.div>
    </div>
  )
}

function TestimonialCard({ item }: { item: TestimonialItem }) {
  const t = useTranslations()

  return (
    <div className='group relative mx-2 w-[340px] shrink-0 rounded-2xl border bg-card p-6 shadow-feature-card transition-shadow hover:shadow-lg'>
      <QuoteIcon className='mb-3 size-5 text-muted-foreground/40' />
      <p className='text-sm leading-relaxed text-muted-foreground'>
        {t(item.quoteKey as never)}
      </p>
      <div className='mt-4 flex items-center gap-3'>
        <div className={`flex size-9 items-center justify-center rounded-full bg-linear-to-br ${item.color} text-xs font-semibold text-white`}>
          {item.initials}
        </div>
        <div>
          <p className='text-sm font-medium'>{t(item.nameKey as never)}</p>
          <p className='text-xs text-muted-foreground'>{t(item.roleKey as never)}</p>
        </div>
      </div>
    </div>
  )
}

export default HomeTestimonials
