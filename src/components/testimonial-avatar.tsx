import BlurImage from '@/components/blur-image'
import { cn } from '@/utils/cn'

/** Vector flags in `public/images/flags/` (e.g. from flagcdn.com, CC0-style country data). */
const COUNTRY_FLAGS = {
  sa: { src: '/images/flags/sa.svg' as const, label: 'Saudi Arabia' },
} as const

export type TestimonialCountryFlag = keyof typeof COUNTRY_FLAGS

type TestimonialAvatarProps = {
  name: string
  initials: string
  color: string
  avatar?: string
  countryFlag?: TestimonialCountryFlag
  size?: 'sm' | 'md'
}

export function TestimonialAvatar({
  name,
  initials,
  color,
  avatar,
  countryFlag,
  size = 'md',
}: TestimonialAvatarProps) {
  const dim = size === 'sm' ? 40 : 44
  const box = size === 'sm' ? 'size-10' : 'size-11'

  const mediaShell = cn('shrink-0 rounded-full ring-2 ring-border', box)

  const avatarShell = cn('relative shrink-0 overflow-hidden rounded-full ring-2 ring-border min-h-0', box)

  if (countryFlag && COUNTRY_FLAGS[countryFlag]) {
    const { src, label } = COUNTRY_FLAGS[countryFlag]
    return (
      <BlurImage
        src={src}
        alt={label}
        title={label}
        fill
        sizes={`${dim}px`}
        className={avatarShell}
        imageClassName='rounded-full object-cover'
        lazy
      />
    )
  }

  if (avatar) {
    return (
      <BlurImage
        src={avatar}
        alt={name}
        fill
        sizes={`${dim}px`}
        className={avatarShell}
        imageClassName='rounded-full object-cover'
        lazy
      />
    )
  }

  return (
    <div
      className={cn(
        mediaShell,
        'flex items-center justify-center bg-linear-to-br text-xs font-semibold text-white',
        color,
      )}
    >
      {initials}
    </div>
  )
}
