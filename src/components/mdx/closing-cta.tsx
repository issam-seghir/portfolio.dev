'use client'

import { ArrowRightIcon, MailIcon } from 'lucide-react'
import { motion, useInView } from 'motion/react'
import { useTranslations } from 'next-intl'
import { useRef } from 'react'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/utils/cn'

function ClosingCTA() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const t = useTranslations()

  return (
    <motion.div
      ref={ref}
      className='not-prose relative my-12 overflow-hidden rounded-2xl'
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.5 }}
    >
      <div className='absolute inset-0 bg-linear-to-br from-blue-600 to-violet-600' />
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.12),transparent_60%)]' />

      <div className='relative flex flex-col items-center gap-5 px-6 py-14 text-center text-white'>
        <motion.h3
          className='text-2xl font-bold sm:text-3xl'
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          {t('about.cta.title')}
        </motion.h3>
        <motion.p
          className='max-w-md text-sm text-white/80'
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.4, delay: 0.25 }}
        >
          {t('about.cta.description')}
        </motion.p>
        <motion.div
          className='flex flex-wrap justify-center gap-3'
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.4, delay: 0.35 }}
        >
          <a
            href='mailto:issamusma@hotmail.com'
            className={cn(
              buttonVariants({ size: 'lg' }),
              'gap-2 bg-white text-violet-700 hover:bg-white/90',
            )}
          >
            <MailIcon className='size-4' />
            {t('about.cta.email-me')}
          </a>
          <a
            href='https://www.linkedin.com/in/issam-seghir'
            target='_blank'
            rel='noopener noreferrer'
            className={cn(
              buttonVariants({ variant: 'outline', size: 'lg' }),
              'gap-2 border-white/30 text-white hover:bg-white/10 hover:text-white',
            )}
          >
            {t('about.cta.linkedin')}
            <ArrowRightIcon className='size-4' />
          </a>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default ClosingCTA
