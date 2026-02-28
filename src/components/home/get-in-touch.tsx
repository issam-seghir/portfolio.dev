'use client'

import { SiGithub } from '@icons-pack/react-simple-icons'
import { MailIcon, SendIcon } from 'lucide-react'
import { motion, useInView } from 'motion/react'
import { useTranslations } from 'next-intl'
import { useRef } from 'react'

import { buttonVariants } from '@/components/ui/button'
import { SITE_GITHUB_URL, SITE_LINKEDIN_URL } from '@/lib/constants'
import { cn } from '@/utils/cn'

const LinkedInIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg role='img' viewBox='0 0 24 24' fill='currentColor' width='1em' height='1em' {...props}>
    <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
  </svg>
)

const variants = {
  initial: { y: 40, opacity: 0 },
  animate: { y: 0, opacity: 1 },
}

function GetInTouch() {
  const cardsRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardsRef, { once: true, margin: '-100px' })
  const t = useTranslations()

  return (
    <motion.div
      className='relative my-24 overflow-hidden rounded-2xl p-8 shadow-feature-card md:p-12'
      initial='initial'
      animate={isInView ? 'animate' : 'initial'}
      variants={variants}
      ref={cardsRef}
      transition={{ duration: 0.5 }}
    >
      <div className='relative z-10 mx-auto max-w-xl text-center'>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.1 }}
          className='mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-muted'
        >
          <SendIcon className='size-7 text-muted-foreground' />
        </motion.div>

        <h2 className='text-3xl font-semibold'>{t('homepage.get-in-touch.title')}</h2>
        <p className='mt-3 text-muted-foreground'>{t('homepage.get-in-touch.description')}</p>

        <div className='mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center'>
          <a
            href='mailto:issamusma@hotmail.com'
            className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}
          >
            <MailIcon className='size-4' />
            {t('homepage.get-in-touch.email')}
          </a>
          <a
            href={SITE_LINKEDIN_URL}
            target='_blank'
            rel='noopener noreferrer'
            className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'gap-2')}
          >
            <LinkedInIcon className='size-4' />
            LinkedIn
          </a>
          <a
            href={SITE_GITHUB_URL}
            target='_blank'
            rel='noopener noreferrer'
            className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'gap-2')}
          >
            <SiGithub className='size-4' />
            GitHub
          </a>
        </div>

        <p className='mt-6 text-sm text-muted-foreground'>
          {t('homepage.get-in-touch.availability')}
        </p>
      </div>
    </motion.div>
  )
}

export default GetInTouch
