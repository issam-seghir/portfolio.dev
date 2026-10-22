'use client'

import { FingerprintIcon } from 'lucide-react'
import { motion } from 'motion/react'
import { useTranslations } from 'next-intl'

import { cn } from '@/utils/cn'

const TRAITS = [
  { key: 'trait-curious', emoji: '🧠' },
  { key: 'trait-creative', emoji: '🎨' },
  { key: 'trait-founder', emoji: '🚀' },
  { key: 'trait-perfectionist', emoji: '✨' },
  { key: 'trait-dreamer', emoji: '💭' },
  { key: 'trait-resilient', emoji: '🦁' },
  { key: 'trait-self-taught', emoji: '📚' },
  { key: 'trait-unboxed', emoji: '💡' },
] as const

const STATS = [
  { key: 'stat-experience', value: '3+', icon: '📅' },
  { key: 'stat-projects', value: '11+', icon: '📦' },
  { key: 'stat-coffee', value: '∞', icon: '🪄' },
] as const

function CodingDnaCard() {
  const t = useTranslations()

  return (
    <div className={cn('bento-card flex h-full flex-col gap-4 overflow-hidden p-4 lg:p-6')}>
      <div className='flex items-center gap-2'>
        <FingerprintIcon className='size-4.5' />
        <h2 className='text-sm'>{t('homepage.about-me.coding-dna')}</h2>
      </div>

      <div className='grid grid-cols-2 gap-2'>
        {TRAITS.map((trait, i) => (
          <motion.div
            key={trait.key}
            className='flex cursor-default items-center gap-2 rounded-lg bg-muted p-2.5 transition-colors hover:bg-accent'
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 + 0.1, type: 'spring', stiffness: 200, damping: 15 }}
          >
            <span className='text-lg leading-none'>{trait.emoji}</span>
            <span className='text-xs/tight font-medium'>{t(`homepage.about-me.${trait.key}` as never)}</span>
          </motion.div>
        ))}
      </div>

      <div className='mt-auto grid grid-cols-3 gap-2 border-t pt-3'>
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.key}
            className='flex flex-col items-center gap-0.5'
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 + 0.4, duration: 0.4 }}
          >
            <span className='text-2xl'>{stat.icon}</span>
            <span className='text-base font-bold text-primary tabular-nums'>{stat.value}</span>
            <span className='text-center text-[13px] leading-tight text-muted-foreground'>
              {t(`homepage.about-me.${stat.key}` as never)}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default CodingDnaCard
