'use client'

import { MailIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Link } from '@/components/ui/link'
import { FOOTER_SECTIONS, FOOTER_SOCIAL_LINKS } from '@/config/links'
import { MY_NAME, SITE_CONTACT_MAILTO } from '@/lib/constants'

import LocaleSwitcher from './locale-switcher'

function LayoutFooter() {
  const t = useTranslations()

  return (
    <footer className='relative mx-auto mb-6 flex min-w-0 w-full max-w-5xl flex-col overflow-x-clip rounded-2xl border border-border/40 bg-background/30 px-6 py-10 saturate-100 backdrop-blur-md sm:px-8'>
      <div className='grid gap-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.2fr)_repeat(3,minmax(0,1fr))] lg:gap-8'>
        <div className='flex flex-col gap-4 sm:col-span-2 lg:col-span-1'>
          <p className='font-heading text-lg font-semibold tracking-tight text-foreground'>{MY_NAME}</p>
          <p className='max-w-sm text-sm leading-relaxed text-muted-foreground'>{t('layout.footer.tagline')}</p>
          <a
            href={SITE_CONTACT_MAILTO}
            className='inline-flex w-fit items-center gap-2 text-sm font-medium text-foreground underline-offset-4 transition-colors hover:text-primary hover:underline'
          >
            <MailIcon aria-hidden className='size-4 shrink-0' />
            {t('about.connect.email')}
          </a>
          <ul aria-label={t('layout.footer.social-aria')} className='flex flex-wrap gap-2 pt-1'>
            {FOOTER_SOCIAL_LINKS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className='inline-flex size-10 items-center justify-center rounded-full border border-border/60 bg-background/50 text-muted-foreground transition-colors hover:border-border hover:bg-accent hover:text-foreground'
                  aria-label={t(item.labelKey)}
                >
                  {item.icon}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {FOOTER_SECTIONS.map((section) => (
          <nav
            key={section.id}
            aria-labelledby={`footer-heading-${section.id}`}
            className='flex flex-col gap-3'
          >
            <h2
              id={`footer-heading-${section.id}`}
              className='text-xs font-semibold uppercase tracking-wider text-muted-foreground'
            >
              {t(section.titleKey)}
            </h2>
            <ul className='flex flex-col gap-2'>
              {section.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className='text-sm text-muted-foreground transition-colors hover:text-foreground'
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className='mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-border/40 pt-8'>
        <p className='text-sm text-muted-foreground'>
          {t('layout.footer.copyright', {
            year: new Date().getFullYear(),
            name: MY_NAME,
          })}
        </p>
        <LocaleSwitcher />
      </div>
    </footer>
  )
}

export default LayoutFooter
