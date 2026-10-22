/**
 * Path under `public/` (no leading slash) for places that need the logo as a file
 * (OG images via Satori). Kept under `images/` so next-intl middleware does not intercept it.
 */
export const LOGO_PUBLIC_FILE = 'images/brand/logo-mark.svg' as const

/** Height / width of the arch mark (viewBox 72 × 90). */
export const LOGO_ASPECT = 90 / 72
