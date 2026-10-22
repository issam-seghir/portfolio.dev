'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

import { buttonVariants } from '@/components/ui/button-variants'
import { cn } from '@/utils/cn'

/**
 * Phones only. Shows once the hero's own button has scrolled away, and hides again
 * when the contact section is on screen or already passed.
 */
export default function MobileCtaBar() {
  const t = useTranslations('homepage')
  const [heroOut, setHeroOut] = useState(false)
  const [contactReached, setContactReached] = useState(false)

  useEffect(() => {
    const hero = document.querySelector('#hero')
    const contact = document.querySelector('#contact')
    if (!hero || !contact) return

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === hero) setHeroOut(!entry.isIntersecting)
        // Above the viewport (top < 0) counts as reached, so the bar stays off over the footer.
        if (entry.target === contact) setContactReached(entry.isIntersecting || entry.boundingClientRect.top < 0)
      }
    })
    observer.observe(hero)
    observer.observe(contact)

    return () => {
      observer.disconnect()
    }
  }, [])

  const visible = heroOut && !contactReached

  return (
    <div
      inert={!visible}
      className={cn(
        'fixed inset-x-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex items-center justify-between gap-3 rounded-xl border bg-background/90 py-2 ps-4 pe-2 shadow-lg backdrop-blur-md transition-[translate,opacity] duration-300 ease-out motion-reduce:transition-none md:hidden',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-[calc(100%+2rem)] opacity-0',
      )}
    >
      <span className='text-sm text-muted-foreground'>{t('mobile-bar.note')}</span>
      <a
        href='#contact'
        data-track='cta_clicked'
        data-track-cta='contact'
        data-track-location='mobile_bar'
        className={cn(buttonVariants({ size: 'lg' }), 'min-h-11 shrink-0')}
      >
        {t('hero.cta-contact')}
      </a>
    </div>
  )
}
