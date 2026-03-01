'use client'

import { cn } from '@/utils/cn'

type HoverWordsProps = {
  text: string
  className?: string
  wordClassName?: string
}

/**
 * Splits text into words and wraps each in a span with a hover underline animation.
 * Preserves spaces and works with any language (en, ar, etc.).
 */
function HoverWords({ text, className, wordClassName }: HoverWordsProps) {
  const parts = text.split(/(\s+)/)

  return (
    <span className={cn('inline', className)}>
      {parts.map((part, i) =>
        /^\s+$/.test(part) ? (
          <span key={i}>{part}</span>
        ) : (
          <span key={i} className={cn('hover-word inline', wordClassName)}>
            {part}
          </span>
        ),
      )}
    </span>
  )
}

export { HoverWords }
