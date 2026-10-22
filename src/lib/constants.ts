import { env } from './env'

export const IS_PRODUCTION = env.NODE_ENV === 'production'

// eslint-disable-next-line unicorn/no-typeof-undefined -- window is not always defined
export const IS_SERVER = typeof globalThis.window === 'undefined'

export const GITHUB_USERNAME = 'issam-seghir'

export const MY_NAME = 'Issam Seghir'

export const MY_NAME_AR = 'عصام صغير'

export const SITE_DOMAIN = 'issam.tech'

export const SITE_GITHUB_URL = 'https://github.com/issam-seghir'
export const SITE_FACEBOOK_URL = 'https://www.facebook.com/issam.seghirr'
export const SITE_LINKEDIN_URL = 'https://www.linkedin.com/in/issam-seghir'
export const SITE_WHATSAPP_URL = 'https://wa.me/213781844146'

/** Booking page for a short intro call (e.g. Cal.com). The "Book a call" button stays hidden while this is null. */
export const SITE_BOOKING_URL: string | null = null

/** Public contact email (mailto links in UI). */
export const SITE_CONTACT_EMAIL = 'issamusma@hotmail.com'
export const SITE_CONTACT_MAILTO = `mailto:${SITE_CONTACT_EMAIL}` as const

export const OG_IMAGE_WIDTH = 1200
export const OG_IMAGE_HEIGHT = 630
export const OG_IMAGE_TYPE = 'image/png'

export const AVATAR_MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB
export const SUPPORTED_AVATAR_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const

export type AvatarMimeType = (typeof SUPPORTED_AVATAR_MIME_TYPES)[number]
