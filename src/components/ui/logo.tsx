import Image from 'next/image'

import { LOGO_ASPECT, LOGO_SRC } from '@/lib/logo-constants'
import { cn } from '@/utils/cn'

type LogoProps = Omit<React.ComponentProps<typeof Image>, 'src' | 'alt'> & {
  alt?: string
  /** Set on above-the-fold logos (e.g. header) so Next.js loads eagerly for LCP. */
  priority?: boolean
}

function Logo({
  width = 32,
  height,
  alt = "Issam Seghir's monogram logo",
  className,
  priority = false,
  ...rest
}: LogoProps) {
  const w = typeof width === 'number' ? width : Number(width)
  const h = height !== undefined ? (typeof height === 'number' ? height : Number(height)) : Math.round(w * LOGO_ASPECT)

  return (
    <Image
      src={LOGO_SRC}
      alt={alt}
      width={w}
      height={h}
      className={cn('object-contain', className)}
      unoptimized
      priority={priority}
      {...rest}
    />
  )
}

export { Logo }
