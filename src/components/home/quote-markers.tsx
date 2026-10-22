'use client'

import { useEffect } from 'react'

/**
 * Sweeps the saffron marker under each quote's key phrase once, as the quote scrolls in.
 * Markers already on screen when the page loads are left as they are, so nothing flickers,
 * and with motion turned off every marker simply stays drawn.
 */
export default function QuoteMarkers() {
  useEffect(() => {
    if (globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const marker = entry.target as HTMLElement
          marker.dataset.sweep = 'play'
          observer.unobserve(marker)
        }
      },
      { rootMargin: '0px 0px -15% 0px' },
    )

    for (const marker of document.querySelectorAll<HTMLElement>('.testimonial-highlight')) {
      const { top, bottom } = marker.getBoundingClientRect()
      if (top < window.innerHeight && bottom > 0) continue
      marker.dataset.sweep = 'pending'
      observer.observe(marker)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return null
}
