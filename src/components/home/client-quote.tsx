import type { TestimonialItem } from './testimonial-data'

import { useMessages, useTranslations } from 'next-intl'

import { TestimonialAvatar } from '@/components/testimonial-avatar'
import { cn } from '@/utils/cn'

import { AVATAR_TONE, splitByHighlights } from './testimonial-data'

type ClientQuoteProps = {
  item: TestimonialItem
  /** `short` shows the one-sentence excerpt; `full` the whole quote. */
  length?: 'short' | 'full'
  size?: 'sm' | 'lg'
  className?: string
}

type TestimonialMessages = { about?: { testimonials?: Array<{ highlights?: string[] }> } }

/** Literal keys (not built at runtime) so `pnpm check:i18n` can see them. Order matches `about.testimonials`. */
function useTestimonialText() {
  const t = useTranslations('about')
  return [
    {
      quote: t('testimonials.0.quote'),
      short: t('testimonials.0.short'),
      name: t('testimonials.0.name'),
      role: t('testimonials.0.role'),
    },
    {
      quote: t('testimonials.1.quote'),
      short: t('testimonials.1.short'),
      name: t('testimonials.1.name'),
      role: t('testimonials.1.role'),
    },
    {
      quote: t('testimonials.2.quote'),
      short: t('testimonials.2.short'),
      name: t('testimonials.2.name'),
      role: t('testimonials.2.role'),
    },
    {
      quote: t('testimonials.3.quote'),
      short: t('testimonials.3.short'),
      name: t('testimonials.3.name'),
      role: t('testimonials.3.role'),
    },
    {
      quote: t('testimonials.4.quote'),
      short: t('testimonials.4.short'),
      name: t('testimonials.4.name'),
      role: t('testimonials.4.role'),
    },
  ]
}

export function ClientQuote(props: ClientQuoteProps) {
  const { item, length = 'short', size = 'sm', className } = props
  const messages = useMessages() as TestimonialMessages
  const entry = useTestimonialText()[item.index]
  if (!entry) return null

  const text = length === 'short' ? entry.short : entry.quote
  const highlights = messages.about?.testimonials?.[item.index]?.highlights ?? []
  const { name, role } = entry

  return (
    <figure className={cn('grid gap-4', className)}>
      <blockquote
        className={cn(
          size === 'lg' ? 'font-heading text-2xl/snug font-medium text-balance sm:text-3xl/snug' : 'text-pretty',
        )}
      >
        <p>
          {splitByHighlights(text, highlights).map((seg, i) =>
            seg.type === 'highlight' ? (
              <span key={i} className='testimonial-highlight'>
                {seg.value}
              </span>
            ) : (
              <span key={i}>{seg.value}</span>
            ),
          )}
        </p>
      </blockquote>
      <figcaption className='flex items-center gap-3'>
        <TestimonialAvatar
          name={name}
          initials={item.initials}
          color={AVATAR_TONE}
          avatar={item.avatar}
          countryFlag={item.countryFlag}
          size='sm'
        />
        <span className='min-w-0 text-sm'>
          <span className='block font-medium'>{name}</span>
          <span className='block text-muted-foreground'>{role}</span>
        </span>
      </figcaption>
    </figure>
  )
}
