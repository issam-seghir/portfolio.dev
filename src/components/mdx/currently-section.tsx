'use client'

import { BookOpenIcon, CoffeeIcon, MapPinIcon, MusicIcon } from 'lucide-react'
import { motion, useInView } from 'motion/react'
import { useTranslations } from 'next-intl'
import { useRef } from 'react'

const ITEMS = [
  { icon: MapPinIcon, labelKey: 'about.currently.location', color: 'text-blue-500' },
  { icon: BookOpenIcon, labelKey: 'about.currently.reading', color: 'text-emerald-500' },
  { icon: CoffeeIcon, labelKey: 'about.currently.fuel', color: 'text-orange-500' },
  { icon: MusicIcon, labelKey: 'about.currently.listening', color: 'text-violet-500' },
] as const

function CurrentlySection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const t = useTranslations()

  return (
    <div ref={ref} className='not-prose my-10'>
      <div className='grid gap-3 sm:grid-cols-2'>
        {ITEMS.map((item, index) => {
          const Icon = item.icon
          return (
            <motion.div
              key={item.labelKey}
              className='flex items-center gap-3 rounded-xl border bg-card/50 px-4 py-3'
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.3, delay: index * 0.08 }}
            >
              <Icon className={`size-4 shrink-0 ${item.color}`} />
              <span className='text-sm text-muted-foreground'>
                {t(item.labelKey as never)}
              </span>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default CurrentlySection
