'use client'

import { FingerprintIcon } from 'lucide-react'
import { motion } from 'motion/react'
import { useTranslations } from 'next-intl'

import { cn } from '@/utils/cn'

const TRAITS = [
  { key: 'trait-curious', emoji: '🧠', bg: 'from-blue-500/15 to-cyan-500/15' },
  { key: 'trait-creative', emoji: '🎨', bg: 'from-rose-500/15 to-pink-500/15' },
  { key: 'trait-founder', emoji: '🚀', bg: 'from-violet-500/15 to-purple-500/15' },
  { key: 'trait-perfectionist', emoji: '✨', bg: 'from-amber-500/15 to-yellow-500/15' },
  { key: 'trait-dreamer', emoji: '💭', bg: 'from-indigo-500/15 to-blue-500/15' },
  { key: 'trait-resilient', emoji: '🦁', bg: 'from-orange-500/15 to-red-500/15' },
  { key: 'trait-self-taught', emoji: '📚', bg: 'from-teal-500/15 to-emerald-500/15' },
  { key: 'trait-unboxed', emoji: '💡', bg: 'from-green-500/15 to-lime-500/15' },
] as const

const STATS = [
  { key: 'stat-experience', value: '4+', icon: '📅' },
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
            className={`flex items-center gap-2 rounded-xl bg-linear-to-br p-2.5 ${trait.bg} cursor-default transition-all hover:scale-[1.03] hover:brightness-110`}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 + 0.1, type: 'spring', stiffness: 200, damping: 15 }}
          >
            <span className='text-lg leading-none'>{trait.emoji}</span>
            <span className='text-xs font-medium leading-tight'>
              {t(`homepage.about-me.${trait.key}` as never)}
            </span>
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
            <span className='bg-linear-to-r from-blue-600 to-violet-600 bg-clip-text text-base font-bold tabular-nums text-transparent dark:from-blue-400 dark:to-violet-400'>
              {stat.value}
            </span>
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
