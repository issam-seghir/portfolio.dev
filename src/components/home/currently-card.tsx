'use client'

import { ActivityIcon, BookOpenIcon, HammerIcon, GraduationCapIcon } from 'lucide-react'
import { motion } from 'motion/react'
import { useTranslations } from 'next-intl'

const ITEMS = [
  { key: 'currently-learning', icon: GraduationCapIcon, color: 'text-green-500' },
  { key: 'currently-building', icon: HammerIcon, color: 'text-blue-500' },
  { key: 'currently-reading', icon: BookOpenIcon, color: 'text-amber-500' },
] as const

function CurrentlyCard() {
  const t = useTranslations()

  return (
    <div className='flex h-full flex-col gap-4 overflow-hidden rounded-2xl p-4 shadow-feature-card transition-shadow hover:shadow-lg lg:p-6'>
      <div className='flex items-center gap-2'>
        <ActivityIcon className='size-4.5' />
        <h2 className='text-sm'>{t('homepage.about-me.currently')}</h2>
        <span className='relative flex size-2'>
          <span className='absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75' />
          <span className='relative inline-flex size-2 rounded-full bg-green-500' />
        </span>
      </div>
      <div className='flex flex-col gap-3'>
        {ITEMS.map((item, i) => (
          <motion.div
            key={item.key}
            className='flex items-center gap-3 rounded-lg border bg-muted/30 px-3 py-2 transition-colors hover:bg-muted/60'
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 + 0.2, duration: 0.3 }}
          >
            <item.icon className={`size-4 shrink-0 ${item.color}`} />
            <span className='text-xs'>{t(`homepage.about-me.${item.key}` as never)}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default CurrentlyCard
