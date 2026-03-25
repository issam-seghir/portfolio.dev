'use client'

import { ChevronLeftIcon, ChevronRightIcon, QuoteIcon } from 'lucide-react'
import { AnimatePresence, motion, useInView } from 'motion/react'
import { useLocale, useMessages, useTranslations } from 'next-intl'
import { useCallback, useMemo, useRef, useState } from 'react'

import { TestimonialAvatar, type TestimonialCountryFlag } from '@/components/testimonial-avatar'
import { Marquee } from '@/components/ui/marquee'
import { cn } from '@/utils/cn'

type Segment = { type: 'text'; value: string } | { type: 'highlight'; value: string }

function splitByHighlights(text: string, phrases: string[]): Segment[] {
  if (!phrases.length) return [{ type: 'text', value: text }]
  const segments: Segment[] = []
  let remaining = text
  const sortedPhrases = [...phrases].filter(Boolean).sort((a, b) => b.length - a.length)

  while (remaining.length > 0) {
    let earliestIndex = -1
    let matchedPhrase = ''

    for (const phrase of sortedPhrases) {
      if (!phrase) continue
      const idx = remaining.indexOf(phrase)
      if (idx !== -1 && (earliestIndex === -1 || idx < earliestIndex)) {
        earliestIndex = idx
        matchedPhrase = phrase
      }
    }

    if (earliestIndex === -1) {
      segments.push({ type: 'text', value: remaining })
      break
    }
    if (earliestIndex > 0) {
      segments.push({ type: 'text', value: remaining.slice(0, earliestIndex) })
    }
    segments.push({ type: 'highlight', value: matchedPhrase })
    remaining = remaining.slice(earliestIndex + matchedPhrase.length)
  }

  return segments
}

type TestimonialItem = {
  quoteKey: string
  nameKey: string
  roleKey: string
  initials: string
  color: string
  avatar?: string
  countryFlag?: TestimonialCountryFlag
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    quoteKey: 'about.testimonials.0.quote',
    nameKey: 'about.testimonials.0.name',
    roleKey: 'about.testimonials.0.role',
    initials: 'CK',
    color: 'from-blue-500 to-cyan-500',
    avatar: '/images/testimonials/karim.png',
  },
  {
    quoteKey: 'about.testimonials.1.quote',
    nameKey: 'about.testimonials.1.name',
    roleKey: 'about.testimonials.1.role',
    initials: 'AM',
    color: 'from-violet-500 to-pink-500',
    avatar: '/images/testimonials/alla-mohamed.png',
  },
  {
    quoteKey: 'about.testimonials.2.quote',
    nameKey: 'about.testimonials.2.name',
    roleKey: 'about.testimonials.2.role',
    initials: 'AA',
    color: 'from-amber-500 to-orange-500',
    countryFlag: 'sa',
  },
  {
    quoteKey: 'about.testimonials.3.quote',
    nameKey: 'about.testimonials.3.name',
    roleKey: 'about.testimonials.3.role',
    initials: 'MA',
    color: 'from-sky-500 to-indigo-500',
    avatar: '/images/testimonials/mohamed-akram.jpg',
  },
  {
    quoteKey: 'about.testimonials.4.quote',
    nameKey: 'about.testimonials.4.name',
    roleKey: 'about.testimonials.4.role',
    initials: 'MK',
    color: 'from-lime-500 to-green-600',
    avatar: '/images/testimonials/miloud-khdoum.png',
  },
]

function HomeTestimonials() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const t = useTranslations()

  return (
    <div ref={ref} className='relative my-24'>
      <motion.h2
        className='text-center text-3xl font-semibold'
        initial={{ y: 30, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : undefined}
        transition={{ duration: 0.3 }}
      >
        {t('homepage.testimonials.title')}
      </motion.h2>
      <motion.p
        className='mx-auto mt-3 max-w-md text-center text-muted-foreground'
        initial={{ opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {t('homepage.testimonials.subtitle')}
      </motion.p>

      <motion.div
        className='mt-12 hidden md:block'
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Marquee duration={40} pauseOnHover fade>
          {[...TESTIMONIALS, ...TESTIMONIALS].map((item, idx) => (
            <TestimonialCard key={`${item.nameKey}-${idx}`} item={item} />
          ))}
        </Marquee>
      </motion.div>

      <motion.div
        className='mt-10 md:hidden'
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <MobileTestimonials />
      </motion.div>
    </div>
  )
}

function MobileTestimonials() {
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(0)
  const locale = useLocale()
  const isRtl = locale === 'ar'
  const t = useTranslations()

  const next = useCallback(() => {
    setDirection(1)
    setActive((prev) => (prev + 1) % TESTIMONIALS.length)
  }, [])

  const prev = useCallback(() => {
    setDirection(-1)
    setActive((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  }, [])

  const swipeRef = useRef<{ startX: number; startTime: number } | null>(null)

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    swipeRef.current = { startX: e.touches[0]!.clientX, startTime: Date.now() }
  }, [])

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!swipeRef.current) return
      const deltaX = e.changedTouches[0]!.clientX - swipeRef.current.startX
      const elapsed = Date.now() - swipeRef.current.startTime
      const velocity = Math.abs(deltaX) / elapsed

      if (Math.abs(deltaX) > 50 || velocity > 0.3) {
        const swipedLeft = isRtl ? deltaX > 0 : deltaX < 0
        if (swipedLeft) next()
        else prev()
      }
      swipeRef.current = null
    },
    [next, prev, isRtl],
  )

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -200 : 200, opacity: 0 }),
  }

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'}>
      <div
        className='relative mx-auto min-h-[280px] overflow-hidden px-4'
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode='wait' custom={direction}>
          <motion.div
            key={active}
            custom={direction}
            variants={variants}
            initial='enter'
            animate='center'
            exit='exit'
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <TestimonialCard item={TESTIMONIALS[active]!} mobile />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className='mt-6 flex items-center justify-center gap-4'>
        <button
          type='button'
          onClick={prev}
          className='flex size-9 items-center justify-center rounded-full border bg-card transition-colors hover:bg-accent'
          aria-label={t('homepage.testimonials.prev')}
        >
          <ChevronLeftIcon className='size-4' />
        </button>

        <div className='flex gap-1.5'>
          {TESTIMONIALS.map((_, i) => (
            <button
              type='button'
              key={i}
              onClick={() => {
                setDirection(i > active ? 1 : -1)
                setActive(i)
              }}
              className={cn(
                'h-1.5 rounded-full transition-all duration-300',
                i === active ? 'w-6 bg-primary' : 'w-1.5 bg-muted-foreground/30',
              )}
              aria-label={t('homepage.testimonials.go-to', { n: i + 1 })}
            />
          ))}
        </div>

        <button
          type='button'
          onClick={next}
          className='flex size-9 items-center justify-center rounded-full border bg-card transition-colors hover:bg-accent'
          aria-label={t('homepage.testimonials.next')}
        >
          <ChevronRightIcon className='size-4' />
        </button>
      </div>
    </div>
  )
}

function TestimonialCard({ item, mobile }: { item: TestimonialItem; mobile?: boolean }) {
  const t = useTranslations()
  const locale = useLocale()
  const messages = useMessages() as { about?: { testimonials?: Array<{ highlights?: string[] }> } }
  const quote = t(item.quoteKey as never)
  const testimonialIndex = useMemo(() => {
    const m = item.quoteKey.match(/\.(\d+)\.quote$/)
    return m ? Number(m[1]) : -1
  }, [item.quoteKey])
  const highlights =
    testimonialIndex >= 0 ? messages?.about?.testimonials?.[testimonialIndex]?.highlights : undefined
  const segments = useMemo(
    () => (Array.isArray(highlights) && highlights.length > 0 ? splitByHighlights(quote, highlights) : null),
    [quote, highlights],
  )

  return (
    <div
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className={cn(
        'group relative rounded-2xl border bg-card p-6 shadow-feature-card transition-shadow hover:shadow-lg',
        mobile ? 'w-full' : 'mx-2 w-[340px] shrink-0',
      )}
    >
      <div className='mb-4 flex items-center gap-3'>
        <TestimonialAvatar
          name={t(item.nameKey as never)}
          initials={item.initials}
          color={item.color}
          avatar={item.avatar}
          countryFlag={item.countryFlag}
          size='md'
        />
        <div className='min-w-0'>
          <p className='truncate text-sm font-semibold'>{t(item.nameKey as never)}</p>
          <p className='truncate text-xs text-muted-foreground'>{t(item.roleKey as never)}</p>
        </div>
      </div>

      <QuoteIcon className='mb-2 size-4 text-muted-foreground/30' />
      <p className='text-sm leading-relaxed text-muted-foreground'>
        {segments ? (
          <>
            {segments.map((seg, i) =>
              seg.type === 'highlight' ? (
                <span key={i} className='testimonial-highlight'>
                  {seg.value}
                </span>
              ) : (
                <span key={i}>{seg.value}</span>
              ),
            )}
          </>
        ) : (
          quote
        )}
      </p>
    </div>
  )
}

export default HomeTestimonials
