'use client'

import { SparklesIcon } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useTranslations } from 'next-intl'
import { useCallback, useEffect, useRef, useState } from 'react'

const FACTS = [
  { key: 'homepage.about-me.fun-fact-1', emoji: '🧒', bg: 'from-amber-500/10 to-orange-500/10' },
  { key: 'homepage.about-me.fun-fact-2', emoji: '💭', bg: 'from-indigo-500/10 to-purple-500/10' },
  { key: 'homepage.about-me.fun-fact-3', emoji: '⌨️', bg: 'from-green-500/10 to-emerald-500/10' },
  { key: 'homepage.about-me.fun-fact-4', emoji: '🏗️', bg: 'from-blue-500/10 to-cyan-500/10' },
  { key: 'homepage.about-me.fun-fact-5', emoji: '☕', bg: 'from-amber-600/10 to-yellow-500/10' },
  { key: 'homepage.about-me.fun-fact-6', emoji: '🌙', bg: 'from-violet-500/10 to-pink-500/10' },
  { key: 'homepage.about-me.fun-fact-7', emoji: '🐉', bg: 'from-red-500/10 to-orange-500/10' },
  { key: 'homepage.about-me.fun-fact-8', emoji: '🎬', bg: 'from-teal-500/10 to-cyan-500/10' },
] as const

function FunFactsCard() {
  const t = useTranslations()
  const [index, setIndex] = useState(0)
  const [clickCount, setClickCount] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval>>(null)

  const next = useCallback(() => {
    setIndex((prev) => (prev + 1) % FACTS.length)
  }, [])

  const handleClick = useCallback(() => {
    next()
    setClickCount((c) => c + 1)
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(next, 5000)
  }, [next])

  useEffect(() => {
    timerRef.current = setInterval(next, 5000)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [next])

  const fact = FACTS[index]!

  return (
    <button
      type='button'
      onClick={handleClick}
      className='group flex h-full w-full cursor-pointer flex-col gap-3 rounded-2xl p-4 shadow-feature-card transition-all hover:shadow-lg active:scale-[0.98] lg:p-6'
    >
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <SparklesIcon className='size-4.5' />
          <h2 className='text-sm'>{t('homepage.about-me.fun-facts')}</h2>
        </div>
        <div className='flex items-center gap-1.5'>
          {FACTS.map((_, i) => (
            <motion.div
              key={i}
              className='size-1.5 rounded-full'
              animate={{
                backgroundColor: i === index ? 'rgb(99 102 241)' : 'rgb(156 163 175 / 0.3)',
                scale: i === index ? 1.3 : 1,
              }}
              transition={{ duration: 0.2 }}
            />
          ))}
        </div>
      </div>

      <div className='relative flex flex-1 items-center justify-center overflow-hidden'>
        <AnimatePresence mode='wait'>
          <motion.div
            key={index}
            className={`flex w-full flex-col items-center gap-3 rounded-xl bg-linear-to-br p-4 ${fact.bg}`}
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
            <p className='text-sm text-center leading-relaxed'>
              {t(fact.key as never)}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className='flex items-center justify-between'>
        <span className='text-[10px] text-muted-foreground/50 group-hover:text-muted-foreground transition-colors'>
          {t('homepage.about-me.fun-facts-tap')} →
        </span>
        {clickCount >= 3 && (
          <motion.span
            className='text-[10px] text-muted-foreground/50'
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
