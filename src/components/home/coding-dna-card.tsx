'use client'

import { DnaIcon } from 'lucide-react'
import { motion } from 'motion/react'
import { useTranslations } from 'next-intl'

const TRAITS = [
  { key: 'trait-night-owl', emoji: '🦉', bg: 'from-indigo-500/15 to-purple-500/15' },
  { key: 'trait-coffee', emoji: '☕', bg: 'from-amber-500/15 to-orange-500/15' },
  { key: 'trait-vim', emoji: '⌨️', bg: 'from-green-500/15 to-emerald-500/15' },
  { key: 'trait-dreams', emoji: '💭', bg: 'from-blue-500/15 to-cyan-500/15' },
  { key: 'trait-founder', emoji: '🚀', bg: 'from-violet-500/15 to-pink-500/15' },
  { key: 'trait-pixel', emoji: '🎨', bg: 'from-rose-500/15 to-red-500/15' },
  { key: 'trait-self-taught', emoji: '📚', bg: 'from-teal-500/15 to-cyan-500/15' },
  { key: 'trait-fast', emoji: '⚡', bg: 'from-yellow-500/15 to-amber-500/15' },
] as const

const STATS = [
  { key: 'coding-hours', value: '3,200+', icon: '⏱️' },
  { key: 'projects-shipped', value: '25+', icon: '📦' },
  { key: 'cups-of-coffee', value: '4,800', icon: '☕' },
] as const

function CodingDnaCard() {
  const t = useTranslations()

  return (
    <div className='flex h-full flex-col gap-4 overflow-hidden rounded-2xl p-4 shadow-feature-card transition-shadow hover:shadow-lg lg:p-6'>
      <div className='flex items-center gap-2'>
        <DnaIcon className='size-4.5' />
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
            <span className='text-sm'>{stat.icon}</span>
            <span className='text-base font-bold tabular-nums bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400'>
              {stat.value}
            </span>
            <span className='text-[10px] text-muted-foreground text-center leading-tight'>
              {t(`homepage.about-me.${stat.key}` as never)}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default CodingDnaCard
