'use client'

import { GlobeIcon } from 'lucide-react'
import { motion } from 'motion/react'
import { useTranslations } from 'next-intl'

import { cn } from '@/utils/cn'

const LANGUAGES = [
  { key: 'language-arabic', flag: '🇩🇿', level: 100 },
  { key: 'language-english', flag: '🇬🇧', level: 90 },
  { key: 'language-french', flag: '🇫🇷', level: 60 },
] as const

function LanguagesCard() {
  const t = useTranslations()

  return (
    <div className={cn('bento-card flex h-full flex-col gap-4 overflow-hidden p-4 lg:p-6')}>
      <div className='flex items-center gap-2'>
        <GlobeIcon className='size-4.5' />
        <h2 className='text-sm'>{t('homepage.about-me.languages')}</h2>
      </div>
      <div className='flex flex-col gap-3'>
        {LANGUAGES.map((lang, i) => (
          <div key={lang.key} className='flex flex-col gap-1.5'>
            <div className='flex items-center justify-between'>
              <span className='flex items-center gap-2 text-xs'>
                <span className='text-base'>{lang.flag}</span>
                {t(`homepage.about-me.${lang.key}` as never)}
              </span>
              <span className='text-[10px] text-muted-foreground tabular-nums'>{lang.level}%</span>
            </div>
            <div className='h-1.5 w-full overflow-hidden rounded-full bg-muted'>
              <motion.div
                className='h-full rounded-full bg-linear-to-r from-blue-500 to-violet-500'
                initial={{ width: '0%' }}
                whileInView={{ width: `${lang.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.15 + 0.2, ease: 'easeOut' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LanguagesCard
