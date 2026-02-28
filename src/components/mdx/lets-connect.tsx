'use client'

import { SiFacebook, SiGithub, SiX } from '@icons-pack/react-simple-icons'
import { ArrowUpRightIcon, MailIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

import {
  SITE_FACEBOOK_URL,
  SITE_GITHUB_URL,
  SITE_LINKEDIN_URL,
  SITE_X_URL,
} from '@/lib/constants'
import { cn } from '@/utils/cn'

const LinkedInIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg role='img' viewBox='0 0 24 24' fill='currentColor' width='1em' height='1em' {...props}>
    <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
  </svg>
)

const LINKS = [
  {
    href: 'mailto:issamusma@hotmail.com',
    icon: MailIcon,
    label: 'Email',
    labelKey: 'about.connect.email',
  },
  {
    href: SITE_LINKEDIN_URL,
    icon: LinkedInIcon,
    label: 'LinkedIn',
    labelKey: 'about.connect.linkedin',
  },
  {
    href: SITE_GITHUB_URL,
    icon: SiGithub,
    label: 'GitHub',
    labelKey: 'about.connect.github',
  },
  {
    href: SITE_X_URL,
    icon: SiX,
    label: 'X',
    labelKey: 'about.connect.x',
  },
  {
    href: SITE_FACEBOOK_URL,
    icon: SiFacebook,
    label: 'Facebook',
    labelKey: 'about.connect.facebook',
  },
] as const

function LetsConnect() {
  const t = useTranslations()

  return (
    <div className='not-prose my-10'>
      <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
        {LINKS.map((link) => {
          const Icon = link.icon
          const isExternal = link.href.startsWith('http')

          return (
            <a
              key={link.href}
              href={link.href}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              className={cn(
                'group flex items-center gap-4 rounded-xl border bg-card/50 p-4',
                'transition-all duration-200 hover:border-primary/40 hover:bg-accent/50 hover:shadow-md',
              )}
            >
              <span className='flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground'>
                <Icon className='size-5' />
              </span>
              <span className='flex-1 font-medium'>{t(link.labelKey as never)}</span>
              <ArrowUpRightIcon
                className={cn(
                  'size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground',
                )}
              />
            </a>
          )
        })}
      </div>
    </div>
  )
}

export default LetsConnect
