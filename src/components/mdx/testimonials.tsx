'use client'

import { QuoteIcon, StarIcon } from 'lucide-react'
import { motion, useInView } from 'motion/react'
import { useTranslations } from 'next-intl'
import { useRef } from 'react'

type TestimonialItem = {
  quoteKey: string
  nameKey: string
  roleKey: string
  initials: string
  color: string
  stars: number
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    quoteKey: 'about.testimonials.0.quote',
    nameKey: 'about.testimonials.0.name',
    roleKey: 'about.testimonials.0.role',
    initials: 'AB',
    color: 'from-blue-500 to-cyan-500',
    stars: 5,
  },
  {
    quoteKey: 'about.testimonials.1.quote',
    nameKey: 'about.testimonials.1.name',
    roleKey: 'about.testimonials.1.role',
    initials: 'SM',
    color: 'from-violet-500 to-pink-500',
    stars: 5,
  },
  {
    quoteKey: 'about.testimonials.2.quote',
    nameKey: 'about.testimonials.2.name',
    roleKey: 'about.testimonials.2.role',
    initials: 'YK',
    color: 'from-emerald-500 to-teal-500',
    stars: 5,
  },
]

function Testimonials() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const t = useTranslations()

  return (
    <div ref={ref} className='not-prose my-10'>
      <div className='columns-1 gap-4 space-y-4 md:columns-2 lg:columns-3'>
        {TESTIMONIALS.map((item, index) => (
          <motion.div
            key={item.quoteKey}
            className='group relative break-inside-avoid rounded-2xl border bg-card/50 p-6 shadow-feature-card transition-shadow hover:shadow-lg'
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : undefined}
            transition={{ duration: 0.4, delay: index * 0.1, type: 'spring', stiffness: 100, damping: 20 }}
          >
            <div className='mb-3 flex items-center justify-between'>
              <QuoteIcon className='size-5 text-primary/30' />
              <div className='flex gap-0.5'>
                {Array.from({ length: item.stars }).map((_, i) => (
                  <StarIcon
                    key={i}
                    className='size-3.5 fill-amber-400 text-amber-400'
                  />
                ))}
              </div>
            </div>
            <p className='text-sm leading-relaxed text-muted-foreground'>
              &ldquo;{t(item.quoteKey as never)}&rdquo;
            </p>
            <div className='mt-4 flex items-center gap-3 border-t pt-4'>
              <div className={`flex size-9 items-center justify-center rounded-full bg-linear-to-br ${item.color} text-xs font-semibold text-white`}>
                {item.initials}
              </div>
              <div>
                <p className='text-sm font-semibold'>{t(item.nameKey as never)}</p>
                <p className='text-xs text-muted-foreground'>{t(item.roleKey as never)}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Testimonials
