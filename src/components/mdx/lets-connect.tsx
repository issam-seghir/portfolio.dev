'use client'

import { SiFacebook, SiGithub } from '@icons-pack/react-simple-icons'
import { ArrowUpRightIcon, MailIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

import {
  SITE_FACEBOOK_URL,
  SITE_GITHUB_URL,
  SITE_LINKEDIN_URL,
  SITE_WHATSAPP_URL,
} from '@/lib/constants'
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

const LINKS = [
  {
    href: 'mailto:issamusma@hotmail.com',
    icon: MailIcon,
    label: 'Email',
    labelKey: 'about.connect.email',
  },
  {
    href: SITE_WHATSAPP_URL,
    icon: WhatsAppIcon,
    label: 'WhatsApp',
    labelKey: 'about.connect.whatsapp',
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
