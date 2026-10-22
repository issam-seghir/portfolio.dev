'use client'

import { SparklesIcon } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useTranslations } from 'next-intl'
import { useCallback, useState } from 'react'

import { cn } from '@/utils/cn'

const FACTS = [
  { key: 'homepage.about-me.fun-fact-1', emoji: '✍️' },
  { key: 'homepage.about-me.fun-fact-2', emoji: '🎨' },
  { key: 'homepage.about-me.fun-fact-3', emoji: '🚀' },
  { key: 'homepage.about-me.fun-fact-4', emoji: '🗣️' },
  { key: 'homepage.about-me.fun-fact-5', emoji: '🖌️' },
  { key: 'homepage.about-me.fun-fact-6', emoji: '🌙' },
  { key: 'homepage.about-me.fun-fact-7', emoji: '🤝' },
  { key: 'homepage.about-me.fun-fact-8', emoji: '🧩' },
] as const

function FunFactsCard() {
  const t = useTranslations()
  const [index, setIndex] = useState(0)
  const [clickCount, setClickCount] = useState(0)

  const handleClick = useCallback(() => {
    setIndex((prev) => (prev + 1) % FACTS.length)
    setClickCount((c) => c + 1)
  }, [])

  const fact = FACTS[index] ?? FACTS[0]

  return (
    <button
      type='button'
      onClick={handleClick}
      className={cn(
        'bento-card group flex size-full cursor-pointer flex-col gap-3 p-4 active:scale-[0.98] lg:p-6',
        'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none',
      )}
    >
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <SparklesIcon className='size-4.5' />
          <h2 className='text-sm'>{t('homepage.about-me.fun-facts')}</h2>
        </div>
        <div className='flex items-center gap-1.5'>
          {FACTS.map((_, i) => (
            <span
              key={i}
              className={cn(
                'size-1.5 rounded-full transition-[background-color,scale] duration-200',
                i === index ? 'scale-130 bg-primary' : 'bg-muted-foreground/30',
              )}
            />
          ))}
        </div>
      </div>

      <div className='relative flex flex-1 items-center justify-center overflow-hidden'>
        <AnimatePresence mode='wait'>
          <motion.div
            key={index}
            className='flex w-full flex-col items-center gap-3 rounded-xl bg-muted p-4'
            initial={{ opacity: 0, x: 30, filter: 'blur(6px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -30, filter: 'blur(6px)' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <motion.span
              className='text-3xl'
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 12, delay: 0.1 }}
            >
              {fact.emoji}
            </motion.span>
            <p className='text-center text-sm/relaxed'>{t(fact.key as never)}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className='flex items-center justify-between'>
        <span className='text-[10px] text-muted-foreground transition-colors group-hover:text-foreground'>
          {t('homepage.about-me.fun-facts-tap')} <span className='inline-block rtl:-scale-x-100'>→</span>
        </span>
        {clickCount >= 3 && (
          <motion.span
            className='text-[10px] text-muted-foreground'
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {clickCount} taps!
          </motion.span>
        )}
      </div>
    </button>
  )
}

export default FunFactsCard
