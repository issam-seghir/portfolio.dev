'use client'

import NumberFlow from '@number-flow/react'
import { SiGithub } from '@icons-pack/react-simple-icons'
import { MailIcon } from 'lucide-react'
import { motion, useInView } from 'motion/react'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

import BlurImage from '@/components/blur-image'
import { buttonVariants } from '@/components/ui/button'
import { MY_NAME, SITE_CONTACT_MAILTO, SITE_GITHUB_URL, SITE_LINKEDIN_URL, SITE_WHATSAPP_URL } from '@/lib/constants'
import { cn } from '@/utils/cn'

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg role='img' viewBox='0 0 24 24' fill='currentColor' width='1em' height='1em' {...props}>
    <title>WhatsApp</title>
    <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z' />
  </svg>
)

const LinkedInIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg role='img' viewBox='0 0 24 24' fill='currentColor' width='1em' height='1em' {...props}>
    <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
  </svg>
)

/** Matches `CodingDnaCard` stats on the homepage About Me section */
const STATS = [
  { kind: 'count' as const, value: 4, suffix: '+', labelKey: 'homepage.about-me.stat-experience' },
  { kind: 'count' as const, value: 11, suffix: '+', labelKey: 'homepage.about-me.stat-projects' },
  { kind: 'symbol' as const, display: '∞', emoji: '🪄', labelKey: 'homepage.about-me.stat-coffee' },
] as const

export function AboutHero() {
  const t = useTranslations()
  const statsRef = useRef<HTMLDivElement>(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-50px' })
  const [animateStats, setAnimateStats] = useState(false)

  useEffect(() => {
    if (statsInView) {
      const timer = setTimeout(() => setAnimateStats(true), 200)
      return () => clearTimeout(timer)
    }
    return undefined
  }, [statsInView])

  return (
    <>
      {/* Hero section */}
      <div className='flex min-w-0 w-full flex-col items-center gap-8 pt-12 pb-10 sm:pt-16 sm:pb-12 md:flex-row md:items-start md:gap-10 lg:gap-12'>
        <div className='relative shrink-0'>
          <BlurImage
            src='/images/avatar.png'
            className='size-32 rounded-full ring-2 ring-border sm:size-36 md:size-44'
            width={1024}
            height={1024}
            alt={`${MY_NAME}'s photo`}
            lazy={false}
          />
          <div className='absolute inset-0 -z-10 bg-linear-to-tl from-blue-600 to-violet-600 opacity-20 blur-3xl' />
        </div>

        <div className='flex min-w-0 w-full max-w-xl flex-1 flex-col items-center gap-4 text-center md:max-w-none md:items-start md:text-start'>
          <div className='min-w-0'>
            <h1 className='text-balance text-3xl font-bold tracking-tight sm:text-4xl'>{MY_NAME}</h1>
            <p
              className={cn(
                'mt-1 text-base font-medium sm:text-lg',
                'bg-linear-to-r from-blue-600 via-violet-600 to-blue-600 bg-clip-text text-transparent',
                'dark:from-blue-400 dark:via-violet-400 dark:to-blue-400',
              )}
            >
              {t('about.role')}
            </p>
          </div>

          <p className='max-w-lg text-pretty text-base leading-relaxed text-foreground/95 md:max-w-2xl md:text-[1.0625rem]'>
            {t('about.description')}
          </p>

          <div className='flex items-center justify-center gap-2 md:justify-start'>
            <span className='relative flex size-2'>
              <span className='absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75' />
              <span className='relative inline-flex size-2 rounded-full bg-green-500' />
            </span>
            <span className='text-sm text-green-600 dark:text-green-400'>{t('about.available')}</span>
          </div>

          <div className='flex w-full max-w-md flex-wrap justify-center gap-2 sm:max-w-none md:justify-start'>
            <a
              href={SITE_CONTACT_MAILTO}
              className={cn(
                buttonVariants({ size: 'sm' }),
                'min-h-10 gap-1.5 px-4 sm:min-h-9',
              )}
            >
              <MailIcon className='size-3.5 shrink-0' aria-hidden />
              {t('about.contact')}
            </a>
            <a
              href={SITE_WHATSAPP_URL}
              target='_blank'
              rel='noopener noreferrer'
              className={cn(
                buttonVariants({ variant: 'outline', size: 'sm' }),
                'min-h-10 gap-1.5 px-4 sm:min-h-9',
              )}
            >
              <WhatsAppIcon className='size-3.5 shrink-0' aria-hidden />
              {t('about.connect.whatsapp')}
            </a>
            <a
              href={SITE_LINKEDIN_URL}
              target='_blank'
              rel='noopener noreferrer'
              className={cn(
                buttonVariants({ variant: 'outline', size: 'sm' }),
                'min-h-10 gap-1.5 px-4 sm:min-h-9',
              )}
            >
              <LinkedInIcon className='size-3.5 shrink-0' aria-hidden />
              LinkedIn
            </a>
            <a
              href={SITE_GITHUB_URL}
              target='_blank'
              rel='noopener noreferrer'
              className={cn(
                buttonVariants({ variant: 'outline', size: 'sm' }),
                'min-h-10 gap-1.5 px-4 sm:min-h-9',
              )}
            >
              <SiGithub className='size-3.5 shrink-0' aria-hidden />
              GitHub
            </a>
          </div>
        </div>
      </div>

      {/* Animated stat badges */}
      <motion.div
        ref={statsRef}
        className='mb-12 grid min-w-0 grid-cols-3 gap-2 sm:mb-16 sm:gap-4'
        initial={{ opacity: 0, y: 30 }}
        animate={statsInView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {STATS.map((stat, index) => (
          <motion.div
            key={stat.labelKey}
            className='group flex min-w-0 flex-col items-center gap-1 rounded-2xl border border-border/60 bg-card/30 p-3 shadow-feature-card transition-colors hover:bg-accent/30 sm:gap-1.5 sm:p-5'
            initial={{ opacity: 0, y: 20 }}
            animate={statsInView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.4, delay: 0.1 + index * 0.08 }}
          >
            {stat.kind === 'count' ? (
              <span className='text-2xl font-bold tabular-nums text-blue-600 dark:text-blue-400 sm:text-3xl'>
                <NumberFlow
                  value={animateStats ? stat.value : 0}
                  suffix={stat.suffix}
                  className='text-inherit'
                />
              </span>
            ) : (
              <span className='flex flex-row items-center gap-1'>
                <span className='text-xl leading-none sm:text-2xl' aria-hidden>
                  {stat.emoji}
                </span>
                <span className='text-2xl font-bold tabular-nums text-blue-600 dark:text-blue-400 sm:text-3xl'>
                  {stat.display}
                </span>
              </span>
            )}
            <span className='text-center text-[11px] leading-snug text-foreground/75 sm:text-xs'>
              {t(stat.labelKey as never)}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </>
  )
}
