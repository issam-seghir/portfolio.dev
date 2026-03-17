'use client'

import { motion, useInView } from 'motion/react'
import { useTranslations } from 'next-intl'
import { useRef } from 'react'

import { AnimatedLine } from '@/components/ui/animated-line'
import { buttonVariants } from '@/components/ui/button'
import { HoverWords } from '@/components/ui/hover-words'
import { Link } from '@/components/ui/link'
import { cn } from '@/utils/cn'

import CodingDnaCard from './coding-dna-card'
import CurrentlyCard from './currently-card'
import FunFactsCard from './fun-facts-card'
import LocationCard from './location-card'
import StacksCard from './stacks-card'

function BentoItem({
  children,
  className,
  isInView,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  isInView: boolean
  delay?: number
}) {
  return (
    <motion.div
      className={cn('min-w-0', className)}
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : undefined}
      transition={{ duration: 0.5, delay, type: 'spring', stiffness: 100, damping: 20 }}
    >
      {children}
    </motion.div>
  )
}

function AboutMe() {
  const cardsRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardsRef, { once: true, margin: '-80px' })
  const t = useTranslations()

  return (
    <div ref={cardsRef} className='relative my-24'>
      <div>
        <motion.h2
          className='text-center text-3xl font-semibold'
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : undefined}
          transition={{ duration: 0.3 }}
        >
          {t('homepage.about-me.title')}
        </motion.h2>
        <motion.div
          className='flex justify-center'
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : undefined}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          <AnimatedLine delay={0.2} duration={0.4} />
        </motion.div>
      </div>

      <motion.p
        className='mx-auto mt-4 max-w-xl text-center text-muted-foreground'
        initial={{ opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <HoverWords text={t('homepage.about-me.intro')} />
      </motion.p>

      {/* Row 1: Location — full width for the Mapbox map */}
      <div className='mt-12'>
        <BentoItem isInView={isInView} delay={0.1}>
          <LocationCard />
        </BentoItem>
      </div>

      {/* Row 2: My Coding DNA + Fun Facts */}
      <div className='mt-4 grid gap-4 md:grid-cols-2'>
        <BentoItem isInView={isInView} delay={0.15}>
          <CodingDnaCard />
        </BentoItem>
        <BentoItem isInView={isInView} delay={0.2}>
          <FunFactsCard />
        </BentoItem>
      </div>

      {/* Row 3: Tech Stack — full width for the floating icons */}
      <div className='mt-4'>
        <BentoItem isInView={isInView} delay={0.25}>
          <StacksCard />
        </BentoItem>
      </div>

      <motion.div
        className='my-8 flex items-center justify-center'
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <Link href='/about' className={cn(buttonVariants({ variant: 'outline' }))}>
          {t('homepage.about-me.more')}
        </Link>
      </motion.div>
    </div>
  )
}

export default AboutMe
