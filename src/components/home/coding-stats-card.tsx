'use client'

import { CodeIcon } from 'lucide-react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'motion/react'
import { useTranslations } from 'next-intl'
import { useEffect, useRef } from 'react'

function AnimatedCounter({ value, duration = 2 }: { value: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const rounded = useTransform(motionValue, (latest) => Math.round(latest).toLocaleString())
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      animate(motionValue, value, { duration, ease: 'easeOut' })
    }
  }, [isInView, motionValue, value, duration])

  useEffect(() => {
    const unsubscribe = rounded.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = latest
      }
    })
    return unsubscribe
  }, [rounded])

  return <span ref={ref}>0</span>
}

const STATS = [
  { key: 'coding-hours', value: 3200, suffix: '+' },
  { key: 'projects-shipped', value: 25, suffix: '+' },
  { key: 'cups-of-coffee', value: 4800, suffix: '' },
] as const

function CodingStatsCard() {
  const t = useTranslations()

  return (
    <div className='group flex h-full flex-col gap-4 overflow-hidden rounded-2xl p-4 shadow-feature-card transition-shadow hover:shadow-lg lg:p-6'>
      <div className='flex items-center gap-2'>
        <CodeIcon className='size-4.5' />
        <h2 className='text-sm'>{t('homepage.about-me.coding-hours')}</h2>
      </div>
      <div className='grid grid-cols-3 gap-3'>
        {STATS.map((stat) => (
          <div key={stat.key} className='flex flex-col items-center gap-1'>
            <span className='text-2xl font-bold tabular-nums bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400'>
              <AnimatedCounter value={stat.value} duration={stat.value > 100 ? 2 : 1} />
              {stat.suffix}
            </span>
            <span className='text-[11px] text-muted-foreground text-center leading-tight'>
              {t(`homepage.about-me.${stat.key}` as never)}
            </span>
          </div>
        ))}
      </div>
      <div className='relative h-1.5 w-full overflow-hidden rounded-full bg-muted'>
        <motion.div
          className='absolute inset-y-0 left-0 rounded-full bg-linear-to-r from-blue-500 to-violet-500'
          initial={{ width: '0%' }}
          whileInView={{ width: '78%' }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
        />
        <span className='absolute right-1 top-1/2 -translate-y-1/2 text-[9px] font-medium text-muted-foreground'>
          {t('homepage.about-me.coding-hours-label')}
        </span>
      </div>
    </div>
  )
}

export default CodingStatsCard
