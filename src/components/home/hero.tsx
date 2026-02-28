'use client'

import { motion } from 'motion/react'
import { useTranslations } from 'next-intl'

import BlurImage from '@/components/blur-image'
import { buttonVariants } from '@/components/ui/button'
import { Link } from '@/components/ui/link'
import { MY_NAME } from '@/lib/constants'
import { cn } from '@/utils/cn'

function Hero() {
  const t = useTranslations()

  return (
    <div className='my-16 space-y-8'>
      <div className='flex justify-between gap-8'>
        <div className='flex flex-col gap-5'>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
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

          <motion.h1
            className='text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {t('homepage.hero.greeting')}
            <br />
            <span className='bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400'>
              {t('homepage.hero.tagline')}
            </span>
          </motion.h1>

          <motion.p
            className='max-w-lg text-base text-muted-foreground sm:text-lg'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {t('homepage.hero.description')}
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
          className='relative hidden size-32 shrink-0 md:block lg:size-40'
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <BlurImage
            src='/images/avatar.png'
            className='size-full rounded-full ring-2 ring-border'
            width={1024}
            height={1024}
            alt={`${MY_NAME}'s photo`}
            lazy={false}
          />
          <div className='absolute inset-0 -z-10 bg-linear-to-tl from-blue-600 to-violet-600 opacity-30 blur-3xl' />
        </motion.div>
      </div>
    </div>
  )
}

export default Hero
