'use client'

import { SiGithub } from '@icons-pack/react-simple-icons'
import { MailIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

import BlurImage from '@/components/blur-image'
import { buttonVariants } from '@/components/ui/button'
import { MY_NAME, SITE_GITHUB_URL, SITE_LINKEDIN_URL } from '@/lib/constants'
import { cn } from '@/utils/cn'

const LinkedInIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg role='img' viewBox='0 0 24 24' fill='currentColor' width='1em' height='1em' {...props}>
    <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
  </svg>
)

type AboutHeroProps = {
  description: string
}

export function AboutHero({ description }: AboutHeroProps) {
  const t = useTranslations()

  return (
    <>
      {/* Hero section */}
      <div className='flex flex-col items-center gap-6 pt-16 pb-12 md:flex-row md:items-start md:gap-12'>
        <div className='relative shrink-0'>
          <BlurImage
            src='/images/avatar.png'
            className='size-36 rounded-full ring-2 ring-border md:size-44'
            width={1024}
            height={1024}
            alt={`${MY_NAME}'s photo`}
            lazy={false}
          />
          <div className='absolute inset-0 -z-10 bg-linear-to-tl from-blue-600 to-violet-600 opacity-20 blur-3xl' />
        </div>

        <div className='flex flex-col items-center gap-4 text-center md:items-start md:text-left'>
          <div>
            <h1 className='text-4xl font-bold tracking-tight'>{MY_NAME}</h1>
            <p className='mt-1 text-lg text-muted-foreground'>{t('about.role')}</p>
          </div>

          <p className='max-w-lg text-muted-foreground'>{description}</p>

          <div className='flex items-center gap-2'>
            <span className='relative flex size-2'>
              <span className='absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75' />
              <span className='relative inline-flex size-2 rounded-full bg-green-500' />
            </span>
            <span className='text-sm text-green-600 dark:text-green-400'>
              {t('about.available')}
            </span>
          </div>

          <div className='flex flex-wrap gap-2'>
            <a
              href='mailto:issamusma@hotmail.com'
              className={cn(buttonVariants({ size: 'sm' }), 'gap-1.5')}
            >
              <MailIcon className='size-3.5' />
              {t('about.contact')}
            </a>
            <a
              href={SITE_LINKEDIN_URL}
              target='_blank'
              rel='noopener noreferrer'
              className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'gap-1.5')}
            >
              <LinkedInIcon className='size-3.5' />
              LinkedIn
            </a>
            <a
              href={SITE_GITHUB_URL}
              target='_blank'
              rel='noopener noreferrer'
              className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'gap-1.5')}
            >
              <SiGithub className='size-3.5' />
              GitHub
            </a>
          </div>
        </div>
      </div>

      {/* Stat badges */}
      <div className='mb-12 grid grid-cols-2 gap-4 sm:grid-cols-4'>
        {[
          { value: '5+', labelKey: 'about.stat-years' },
          { value: '20+', labelKey: 'about.stat-projects' },
          { value: '10+', labelKey: 'about.stat-clients' },
          { value: '3+', labelKey: 'about.stat-countries' },
        ].map((stat) => (
          <div key={stat.labelKey} className='flex flex-col items-center rounded-2xl p-4 shadow-feature-card'>
            <span className='text-2xl font-bold'>{stat.value}</span>
            <span className='text-xs text-muted-foreground'>{t(stat.labelKey as never)}</span>
          </div>
        ))}
      </div>
    </>
  )
}
