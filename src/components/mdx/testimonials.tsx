'use client'

import { QuoteIcon, StarIcon } from 'lucide-react'
import Image from 'next/image'
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
  avatar?: string
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    quoteKey: 'about.testimonials.0.quote',
    nameKey: 'about.testimonials.0.name',
    roleKey: 'about.testimonials.0.role',
    initials: 'CK',
    color: 'from-blue-500 to-cyan-500',
    stars: 5,
    avatar: '/images/testimonials/coach-karim.jpg',
  },
  {
    quoteKey: 'about.testimonials.1.quote',
    nameKey: 'about.testimonials.1.name',
    roleKey: 'about.testimonials.1.role',
    initials: 'AM',
    color: 'from-violet-500 to-pink-500',
    stars: 5,
    avatar: '/images/testimonials/alla-mohamed.jpg',
  },
  {
    quoteKey: 'about.testimonials.2.quote',
    nameKey: 'about.testimonials.2.name',
    roleKey: 'about.testimonials.2.role',
    initials: 'AA',
    color: 'from-amber-500 to-orange-500',
    stars: 5,
    avatar: '/images/testimonials/abdul-aziz.jpg',
  },
  {
    quoteKey: 'about.testimonials.3.quote',
    nameKey: 'about.testimonials.3.name',
    roleKey: 'about.testimonials.3.role',
    initials: 'MA',
    color: 'from-sky-500 to-indigo-500',
    stars: 5,
    avatar: '/images/testimonials/mohamed-akram.jpg',
  },
  {
    quoteKey: 'about.testimonials.4.quote',
    nameKey: 'about.testimonials.4.name',
    roleKey: 'about.testimonials.4.role',
    initials: 'MK',
    color: 'from-lime-500 to-green-600',
    stars: 5,
    avatar: '/images/testimonials/miloud-khdoum.jpg',
  },
]

function Testimonials() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const t = useTranslations()

  return (
    <div ref={ref} className='not-prose my-10'>
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {TESTIMONIALS.map((item, index) => (
          <motion.div
            key={item.quoteKey}
            className='group relative flex flex-col rounded-2xl border bg-card/50 p-5 shadow-feature-card transition-shadow hover:shadow-lg sm:p-6'
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : undefined}
            transition={{ duration: 0.4, delay: index * 0.1, type: 'spring', stiffness: 100, damping: 20 }}
          >
            <div className='mb-3 flex items-center gap-3'>
              {item.avatar ? (
                <Image
                  src={item.avatar}
                  alt={t(item.nameKey as never)}
                  width={40}
                  height={40}
                  className='size-10 rounded-full object-cover ring-2 ring-border'
                />
              ) : (
                <div className={`flex size-10 items-center justify-center rounded-full bg-linear-to-br ${item.color} text-xs font-semibold text-white ring-2 ring-border`}>
                  {item.initials}
                </div>
              )}
              <div className='min-w-0 flex-1'>
                <p className='truncate text-sm font-semibold'>{t(item.nameKey as never)}</p>
                <p className='truncate text-xs text-muted-foreground'>{t(item.roleKey as never)}</p>
              </div>
              <div className='flex shrink-0 gap-0.5'>
                {Array.from({ length: item.stars }).map((_, i) => (
                  <StarIcon
                    key={i}
                    className='size-3 fill-amber-400 text-amber-400'
                  />
                ))}
              </div>
            </div>
            <QuoteIcon className='mb-1 size-4 text-primary/30' />
            <p className='flex-1 text-sm leading-relaxed text-muted-foreground'>
              &ldquo;{t(item.quoteKey as never)}&rdquo;
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Testimonials
