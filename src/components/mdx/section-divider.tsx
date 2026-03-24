'use client'

import { cn } from '@/utils/cn'

function SectionDivider({ className }: { className?: string }) {
  return (
    <div className={cn('not-prose my-12 flex items-center justify-center gap-3', className)} aria-hidden>
      <span className='h-px flex-1 bg-border/60' />
      <span className='size-1.5 rounded-full bg-border' />
      <span className='size-1.5 rounded-full bg-primary/40' />
      <span className='size-1.5 rounded-full bg-border' />
      <span className='h-px flex-1 bg-border/60' />
    </div>
  )
}

export default SectionDivider
