'use client'

import { useEffect } from 'react'

import { isAnalyticsEvent, track } from '@/lib/analytics'

/**
 * Sends a named event when someone clicks an element marked up like:
 *   <a data-track='cta_clicked' data-track-cta='contact' data-track-location='hero'>
 * Each data-track-* attribute becomes a property, so server components need no client code.
 */
export default function ClickTracker() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return
      const element = event.target.closest<HTMLElement>('[data-track]')
      const name = element?.dataset.track
      if (!element || !name) return

      if (!isAnalyticsEvent(name)) {
        if (process.env.NODE_ENV === 'development') console.warn(`Unknown analytics event "${name}"`)
        return
      }

      const properties: Record<string, string> = {}
      for (const [key, value] of Object.entries(element.dataset)) {
        if (key === 'track' || !key.startsWith('track') || value === undefined) continue
        // data-track-cta → dataset.trackCta → "cta"
        properties[key.charAt(5).toLowerCase() + key.slice(6)] = value
      }
      track(name, properties)
    }

    // Capture phase, so the event is sent before a link navigates away.
    document.addEventListener('click', handleClick, { capture: true })
    return () => {
      document.removeEventListener('click', handleClick, { capture: true })
    }
  }, [])

  return null
}
