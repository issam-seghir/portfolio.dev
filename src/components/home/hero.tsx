'use client'

import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { useTranslations } from 'next-intl'
import { useCallback, useEffect, useRef, useState } from 'react'

import BlurImage from '@/components/blur-image'
import { AnimatedLine } from '@/components/ui/animated-line'
import { BorderBeam } from '@/components/ui/border-beam'
import { buttonVariants } from '@/components/ui/button'
import { HoverWords } from '@/components/ui/hover-words'
import { Link } from '@/components/ui/link'
import { MY_NAME } from '@/lib/constants'
import { cn } from '@/utils/cn'

const TAGLINES = [
  'homepage.hero.tagline',
  'homepage.hero.tagline-2',
  'homepage.hero.tagline-3',
] as const

function DescriptionWithHighlight({ text, highlight }: { text: string; highlight: string }) {
  if (!text.includes(highlight)) {
    return <HoverWords text={text} />
  }
  const [before, after] = text.split(highlight)
  return (
    <>
      {before && <HoverWords text={before} />}
      <motion.span
        className='relative inline-block font-semibold bg-clip-text text-transparent bg-linear-to-r from-blue-600 via-violet-600 to-blue-600 dark:from-blue-400 dark:via-violet-400 dark:to-blue-400 bg-[length:200%_auto] animate-[shimmer_3s_linear_infinite]'
        initial={{ opacity: 0, y: 2 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        {highlight}
      </motion.span>
      {after && <HoverWords text={after} />}
    </>
  )
}

function Hero() {
  const t = useTranslations()
  const [taglineIndex, setTaglineIndex] = useState(0)
  const avatarRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 20 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 20 })

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % TAGLINES.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!avatarRef.current) return
      const rect = avatarRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      mouseX.set(x)
      mouseY.set(y)
    },
    [mouseX, mouseY],
  )

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0)
    mouseY.set(0)
  }, [mouseX, mouseY])

  return (
    <div className='relative my-20 space-y-10 md:my-28'>
      <div className='pointer-events-none absolute inset-0 -z-10'>
        <div className='absolute -top-32 left-1/2 size-[500px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.12),transparent_70%)] blur-3xl dark:bg-[radial-gradient(circle,rgba(59,130,246,0.08),transparent_70%)]' />
        <div className='absolute -top-20 left-1/4 size-[400px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.1),transparent_70%)] blur-3xl dark:bg-[radial-gradient(circle,rgba(139,92,246,0.06),transparent_70%)]' />
      </div>

      <div className='flex justify-between gap-8'>
        <div className='flex flex-col gap-6'>
          <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.5 }}
            className='flex items-center gap-2'
          >
            <span className='relative flex size-2.5'>
              <span className='absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75' />
              <span className='relative inline-flex size-2.5 rounded-full bg-green-500' />
            </span>
            <span className='text-sm font-medium text-green-600 dark:text-green-400'>
              {t('homepage.hero.available')}
            </span>
          </motion.div>

          <div>
            <motion.h1
              className='text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl'
              initial={{ opacity: 0, filter: 'blur(10px)', scale: 0.95 }}
              animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {t('homepage.hero.greeting')}
              <br />
              <span className='relative inline-block'>
                <AnimatePresence mode='wait'>
                  <motion.span
                    key={taglineIndex}
                    className='inline-block bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400'
                    initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
                    transition={{ duration: 0.4 }}
                  >
                    {t(TAGLINES[taglineIndex] as never)}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.h1>
            <AnimatedLine delay={0.4} duration={0.5} />
          </div>

          <motion.p
            className='max-w-lg text-base text-muted-foreground sm:text-lg leading-relaxed'
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <DescriptionWithHighlight
              text={t('homepage.hero.description')}
              highlight={t('homepage.hero.description-highlight')}
            />
          </motion.p>

          <motion.div
            className='flex flex-wrap gap-3'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Link href='/projects' className={cn(buttonVariants())}>
              {t('homepage.hero.cta-projects')}
            </Link>
            <Link href='/about' className={cn(buttonVariants({ variant: 'outline' }))}>
              {t('homepage.hero.cta-about')}
            </Link>
          </motion.div>

          <motion.p
            className='text-sm text-muted-foreground'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            {t('homepage.hero.location-timezone')}
          </motion.p>
        </div>

        <motion.div
          ref={avatarRef}
          className='relative hidden w-44 shrink-0 md:block lg:w-56 aspect-[224/150] overflow-hidden rounded-xl ring-2 ring-border'
          initial={{ scale: 0, opacity: 0, filter: 'blur(20px)' }}
          animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.6, delay: 0.2, type: 'spring', stiffness: 200, damping: 20 }}
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <BlurImage
            src='/images/avatar-2.png'
            className='relative size-full'
            imageClassName='object-cover object-center rounded-xl'
            fill
            alt={`${MY_NAME}'s photo`}
            lazy={false}
            sizes='(max-width: 1024px) 352px, 448px'
            quality={100}
            unoptimized
          />
          <div className='absolute inset-0 -z-10 bg-linear-to-tl from-blue-600 to-violet-600 opacity-30 blur-3xl' />
          <BorderBeam duration={6} size={200} borderWidth={2} colorFrom='transparent' colorTo='rgb(59 130 246)' />
          <BorderBeam duration={6} delay={3} size={200} borderWidth={2} colorFrom='transparent' colorTo='rgb(139 92 246)' reverse />
        </motion.div>
      </div>

      <motion.div
        className='flex justify-center'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className='text-muted-foreground/50'
        >
          <svg width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
            <path d='M12 5v14M5 12l7 7 7-7' />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Hero
