'use client'

import type { TOC } from '@/mdx-plugins'

import { Link } from '@/components/ui/link'

type SectionChipsProps = {
  toc: TOC[]
}

/**
 * Mobile-only horizontal chips below the hero that anchor to top-level sections.
 * Only renders depth=2 entries so the strip doesn't get noisy.
 */
function SectionChips(props: SectionChipsProps) {
  const { toc } = props
  const top = toc.filter((item) => item.depth === 2)

  if (top.length === 0) return null

  return (
    <nav
      aria-label='Sections'
      className='-mx-4 mt-6 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden'
    >
      {top.map((item) => (
        <Link
          key={item.url}
          href={`#${item.url}`}
          className='shrink-0 rounded-full border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground'
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}

export default SectionChips
