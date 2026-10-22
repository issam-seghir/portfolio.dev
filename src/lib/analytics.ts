import posthog from 'posthog-js'

/**
 * Named events for the client funnel: hero → contact → brief sent.
 * Never put the visitor's email or message in properties.
 */
const ANALYTICS_EVENTS = [
  'cta_clicked',
  'case_study_opened',
  'brief_started',
  'brief_invalid',
  'brief_submitted',
  'brief_sent',
  'brief_failed',
] as const

export type AnalyticsEvent = (typeof ANALYTICS_EVENTS)[number]

export function isAnalyticsEvent(value: string): value is AnalyticsEvent {
  return (ANALYTICS_EVENTS as readonly string[]).includes(value)
}

/** Browser only. Does nothing when PostHog has no key (local dev, previews without analytics). */
export function track(event: AnalyticsEvent, properties?: Record<string, string | number | boolean | string[]>) {
  if (process.env.NODE_ENV === 'development') console.debug('[analytics]', event, properties ?? {})
  if (!posthog.__loaded) return
  posthog.capture(event, properties)
}
