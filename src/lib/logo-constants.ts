/**
 * Path under `public/` (no leading slash).
 * Kept under `images/` so next-intl middleware does not intercept the request (root-level `.jpg` was 404).
 */
export const LOGO_PUBLIC_FILE = 'images/logo-monogram.jpg' as const

/** URL path for `<Image src>` / `<img src>`. */
export const LOGO_SRC = `/${LOGO_PUBLIC_FILE}` as const

/** Approximate aspect height/width (shield monogram). */
export const LOGO_ASPECT = 715 / 640
