import type { TestimonialCountryFlag } from '@/components/testimonial-avatar'

export type TestimonialItem = {
  /** Index into `about.testimonials` in the messages files. */
  index: number
  initials: string
  avatar?: string
  countryFlag?: TestimonialCountryFlag
}

/** Single brand treatment for initials avatars (overrides the shared avatar's gradient via tailwind-merge). */
export const AVATAR_TONE = 'from-primary to-primary text-primary-foreground'

export const TESTIMONIALS = {
  creativeBook: { index: 0, initials: 'CK', avatar: '/images/testimonials/karim.png' },
  basmat: { index: 1, initials: 'AM', avatar: '/images/testimonials/alla-mohamed.png' },
  awan: { index: 2, initials: 'AA', countryFlag: 'sa' },
  compos: { index: 3, initials: 'MA', avatar: '/images/testimonials/mohamed-akram.jpg' },
  ecomenia: { index: 4, initials: 'MK', avatar: '/images/testimonials/miloud-khdoum.png' },
} satisfies Record<string, TestimonialItem>

export type Segment = { type: 'text' | 'highlight'; value: string }

/** Splits a quote into plain and highlighted runs, longest phrase first. */
export function splitByHighlights(text: string, phrases: string[]): Segment[] {
  const sorted = phrases.filter(Boolean).toSorted((a, b) => b.length - a.length)
  const segments: Segment[] = []
  let remaining = text

  while (remaining.length > 0) {
    let at = -1
    let match = ''
    for (const phrase of sorted) {
      const idx = remaining.indexOf(phrase)
      if (idx !== -1 && (at === -1 || idx < at)) {
        at = idx
        match = phrase
      }
    }
    if (at === -1) {
      segments.push({ type: 'text', value: remaining })
      break
    }
    if (at > 0) segments.push({ type: 'text', value: remaining.slice(0, at) })
    segments.push({ type: 'highlight', value: match })
    remaining = remaining.slice(at + match.length)
  }

  return segments
}
