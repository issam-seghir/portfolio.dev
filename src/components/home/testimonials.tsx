'use client'

import { QuoteIcon } from 'lucide-react'
import Image from 'next/image'
import { motion, useInView } from 'motion/react'
import { useLocale, useMessages, useTranslations } from 'next-intl'
import { useMemo, useRef } from 'react'

import { Marquee } from '@/components/ui/marquee'

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
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    quoteKey: 'about.testimonials.0.quote',
    nameKey: 'about.testimonials.0.name',
    roleKey: 'about.testimonials.0.role',
    initials: 'CK',
    color: 'from-blue-500 to-cyan-500',
    avatar: '/images/testimonials/coach-karim.jpg',
  },
  {
    quoteKey: 'about.testimonials.1.quote',
    nameKey: 'about.testimonials.1.name',
    roleKey: 'about.testimonials.1.role',
    initials: 'AM',
    color: 'from-violet-500 to-pink-500',
  },
  {
    quoteKey: 'about.testimonials.2.quote',
    nameKey: 'about.testimonials.2.name',
    roleKey: 'about.testimonials.2.role',
    initials: 'AA',
    color: 'from-amber-500 to-orange-500',
  },
  {
    quoteKey: 'about.testimonials.3.quote',
    nameKey: 'about.testimonials.3.name',
    roleKey: 'about.testimonials.3.role',
    initials: 'MA',
    color: 'from-sky-500 to-indigo-500',
  },
  {
    quoteKey: 'about.testimonials.4.quote',
    nameKey: 'about.testimonials.4.name',
    roleKey: 'about.testimonials.4.role',
    initials: 'MK',
    color: 'from-lime-500 to-green-600',
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
        className='mt-12'
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
    </div>
  )
}

function TestimonialCard({ item }: { item: TestimonialItem }) {
  const t = useTranslations()
  const locale = useLocale()
  const messages = useMessages() as { about?: { testimonials?: Array<{ highlights?: string[] }> } }
  const quote = t(item.quoteKey as never)
  const testimonialIndex = useMemo(() => {
    const m = item.quoteKey.match(/\.(\d+)\.quote$/)
    return m ? Number(m[1]) : -1
  }, [item.quoteKey])
  const highlights = testimonialIndex >= 0 ? messages?.about?.testimonials?.[testimonialIndex]?.highlights : undefined
  const segments = useMemo(
    () => (Array.isArray(highlights) && highlights.length > 0 ? splitByHighlights(quote, highlights) : null),
    [quote, highlights]
  )

  return (
    <div
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className='group relative mx-2 w-[340px] shrink-0 rounded-2xl border bg-card p-6 shadow-feature-card transition-shadow hover:shadow-lg'
    >
      <QuoteIcon className='mb-3 size-5 text-muted-foreground/40' />
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
              )
            )}
          </>
        ) : (
          quote
        )}
      </p>
      <div className='mt-4 flex items-center gap-3'>
        {item.avatar ? (
          <Image
            src={item.avatar}
            alt={t(item.nameKey as never)}
            width={36}
            height={36}
            className='size-9 rounded-full object-cover'
          />
        ) : (
          <div className={`flex size-9 items-center justify-center rounded-full bg-linear-to-br ${item.color} text-xs font-semibold text-white`}>
            {item.initials}
          </div>
        )}
        <div>
          <p className='text-sm font-medium'>{t(item.nameKey as never)}</p>
          <p className='text-xs text-muted-foreground'>{t(item.roleKey as never)}</p>
        </div>
      </div>
    </div>
  )
}

export default HomeTestimonials
