'use client'

import { SiGithub } from '@icons-pack/react-simple-icons'
import { MailIcon, SendIcon } from 'lucide-react'
import { motion, useInView } from 'motion/react'
import { useTranslations } from 'next-intl'
import { useRef } from 'react'

import { buttonVariants } from '@/components/ui/button'
import { SITE_GITHUB_URL, SITE_LINKEDIN_URL, SITE_WHATSAPP_URL } from '@/lib/constants'
import { cn } from '@/utils/cn'

const LinkedInIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg role='img' viewBox='0 0 24 24' fill='currentColor' width='1em' height='1em' {...props}>
    <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
  </svg>
)

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg role='img' viewBox='0 0 24 24' fill='currentColor' width='1em' height='1em' {...props}>
    <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z' />
  </svg>
)

function GetInTouch() {
  const cardsRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardsRef, { once: true, margin: '-100px' })
  const t = useTranslations()

  return (
    <div ref={cardsRef} className='relative my-24'>
      <motion.div
        className='relative overflow-hidden rounded-2xl p-px'
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : undefined}
        transition={{ duration: 0.5 }}
      >
        <div className='absolute inset-0 rounded-2xl bg-linear-to-r from-blue-500/20 via-violet-500/20 to-blue-500/20 animate-[spin_8s_linear_infinite] blur-sm' />
        <div className='relative rounded-2xl bg-background p-8 shadow-feature-card md:p-12'>
          <div className='relative z-10 mx-auto max-w-xl text-center'>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : undefined}
              transition={{ duration: 0.4, delay: 0.1, type: 'spring', stiffness: 200 }}
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
                href={SITE_WHATSAPP_URL}
                target='_blank'
                rel='noopener noreferrer'
                className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'gap-2')}
              >
                <WhatsAppIcon className='size-4' />
                WhatsApp
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

            <div className='mt-6 flex items-center justify-center gap-2'>
              <div className='size-2 rounded-full bg-green-500' />
              <p className='text-sm text-muted-foreground'>
                {t('homepage.get-in-touch.availability')}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default GetInTouch
