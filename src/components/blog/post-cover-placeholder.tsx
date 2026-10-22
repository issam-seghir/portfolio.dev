import { cn } from '@/utils/cn'

type PostCoverPlaceholderProps = {
  className?: string
}

/** Stands in for a missing post cover: the hero's grid texture with the doorway from the logo. */
export default function PostCoverPlaceholder(props: PostCoverPlaceholderProps) {
  const { className } = props

  return (
    <div
      aria-hidden='true'
      className={cn(
        'relative flex aspect-1200/630 w-full items-end justify-center overflow-hidden rounded-lg bg-muted/40',
        'bg-[linear-gradient(var(--grid-line)_1px,transparent_1px),linear-gradient(90deg,var(--grid-line)_1px,transparent_1px)] bg-size-[24px_24px]',
        className,
      )}
    >
      <svg viewBox='0 0 100 130' className='h-3/4 text-primary/60 transition-colors group-hover:text-primary'>
        <path
          d='M8 130V62C8 32 26 10 50 10S92 32 92 62V130'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          vectorEffect='non-scaling-stroke'
        />
        <rect x='46' y='0' width='8' height='8' rx='1.5' className='fill-highlight' />
      </svg>
    </div>
  )
}
