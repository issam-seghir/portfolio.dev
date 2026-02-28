'use client'

import { QuoteIcon } from 'lucide-react'
import { motion, useInView } from 'motion/react'
import { useTranslations } from 'next-intl'
import { useRef } from 'react'

const TESTIMONIALS = [
  { quoteKey: 'about.testimonials.0.quote', nameKey: 'about.testimonials.0.name', roleKey: 'about.testimonials.0.role' },
  { quoteKey: 'about.testimonials.1.quote', nameKey: 'about.testimonials.1.name', roleKey: 'about.testimonials.1.role' },
  { quoteKey: 'about.testimonials.2.quote', nameKey: 'about.testimonials.2.name', roleKey: 'about.testimonials.2.role' },
] as const

function Testimonials() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const t = useTranslations()

  return (
    <div ref={ref} className='not-prose my-10'>
      <div className='grid gap-4 md:grid-cols-3'>
        {TESTIMONIALS.map((item, index) => (
          <motion.div
            key={item.quoteKey}
            className='relative flex flex-col gap-4 rounded-xl border bg-card/50 p-6'
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <QuoteIcon className='size-5 text-primary/40' />
            <p className='flex-1 text-sm leading-relaxed text-muted-foreground'>
              &ldquo;{t(item.quoteKey as never)}&rdquo;
            </p>
            <div className='border-t pt-4'>
              <p className='text-sm font-semibold'>{t(item.nameKey as never)}</p>
              <p className='text-xs text-muted-foreground'>{t(item.roleKey as never)}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Testimonials
