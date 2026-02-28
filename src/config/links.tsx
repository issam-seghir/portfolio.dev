import type { useTranslations } from 'next-intl'

import { SiFacebook, SiGithub } from '@icons-pack/react-simple-icons'
import { FlameIcon, MessageCircleIcon, MonitorIcon, PencilIcon, UserCircleIcon } from 'lucide-react'

import { SITE_FACEBOOK_URL, SITE_GITHUB_URL, SITE_LINKEDIN_URL } from '@/lib/constants'

const LinkedInIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg role='img' viewBox='0 0 24 24' fill='currentColor' width='1em' height='1em' {...props}>
    <title>LinkedIn</title>
    <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
  </svg>
)

// Seems that next-intl doesn't expose the type for translation key,
// so we extract it here
type TranslationKey = Parameters<ReturnType<typeof useTranslations<never>>>[0]

type HeaderLinks = Array<{
  icon: React.ReactNode
  href: string
  key: string
  labelKey: TranslationKey
}>

export const HEADER_LINKS: HeaderLinks = [
  {
    icon: <PencilIcon className='size-3.5' />,
    href: '/blog',
    key: 'blog',
    // i18n-check t('common.labels.blog')
    labelKey: 'common.labels.blog',
  },
  {
    icon: <MessageCircleIcon className='size-3.5' />,
    href: '/guestbook',
    key: 'guestbook',
    // i18n-check t('common.labels.guestbook')
    labelKey: 'common.labels.guestbook',
  },
  {
    icon: <MonitorIcon className='size-3.5' />,
    href: '/uses',
    key: 'uses',
    // i18n-check t('common.labels.uses')
    labelKey: 'common.labels.uses',
  },
  {
    icon: <FlameIcon className='size-3.5' />,
    href: '/projects',
    key: 'projects',
    // i18n-check t('common.labels.projects')
    labelKey: 'common.labels.projects',
  },
  {
    icon: <UserCircleIcon className='size-3.5' />,
    href: '/about',
    key: 'about',
    // i18n-check t('common.labels.about')
    labelKey: 'common.labels.about',
  },
]

type FooterLinks = Array<{
  id: number
  links: Array<{
    href: string
    labelKey: TranslationKey
  }>
}>

export const FOOTER_LINKS: FooterLinks = [
  {
    id: 1,
    links: [
      // i18n-check t('common.labels.home')
      { href: '/', labelKey: 'common.labels.home' },
      // i18n-check t('common.labels.blog')
      { href: '/blog', labelKey: 'common.labels.blog' },
      // i18n-check t('common.labels.about')
      { href: '/about', labelKey: 'common.labels.about' },
      // i18n-check t('common.labels.dashboard')
      { href: '/dashboard', labelKey: 'common.labels.dashboard' },
    ],
  },
  {
    id: 2,
    links: [
      // i18n-check t('common.labels.guestbook')
      { href: '/guestbook', labelKey: 'common.labels.guestbook' },
      // i18n-check t('common.labels.uses')
      { href: '/uses', labelKey: 'common.labels.uses' },
      // i18n-check t('common.labels.projects')
      { href: '/projects', labelKey: 'common.labels.projects' },
    ],
  },
  {
    id: 3,
    links: [
      // i18n-check t('common.labels.facebook')
      { href: SITE_FACEBOOK_URL, labelKey: 'common.labels.facebook' },
      // i18n-check t('common.labels.linkedin')
      { href: SITE_LINKEDIN_URL, labelKey: 'common.labels.linkedin' },
      // i18n-check t('common.labels.github')
      { href: SITE_GITHUB_URL, labelKey: 'common.labels.github' },
    ],
  },
  {
    id: 4,
    links: [
      // i18n-check t('common.labels.terms')
      { href: '/terms', labelKey: 'common.labels.terms' },
      // i18n-check t('common.labels.privacy')
      { href: '/privacy', labelKey: 'common.labels.privacy' },
    ],
  },
]

type SocialLinks = Array<{
  href: string
  title: string
  icon: React.ReactNode
}>

export const SOCIAL_LINKS: SocialLinks = [
  {
    href: SITE_GITHUB_URL,
    title: 'GitHub',
    icon: <SiGithub />,
  },
  {
    href: SITE_LINKEDIN_URL,
    title: 'LinkedIn',
    icon: <LinkedInIcon />,
  },
  {
    href: SITE_FACEBOOK_URL,
    title: 'Facebook',
    icon: <SiFacebook />,
  },
]

type AccountSidebarLinks = Array<{
  href: string
  labelKey: TranslationKey
}>

export const ACCOUNT_SIDEBAR_LINKS: AccountSidebarLinks = [
  {
    href: '/account',
    // i18n-check t('common.labels.account')
    labelKey: 'common.labels.account',
  },
  {
    href: '/account/settings',
    // i18n-check t('common.labels.settings')
    labelKey: 'common.labels.settings',
  },
]
