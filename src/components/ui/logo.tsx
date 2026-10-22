import { cn } from '@/utils/cn'

type LogoProps = Omit<React.ComponentProps<'svg'>, 'width' | 'height'> & {
  /** Rendered width in px; height follows the mark's 4:5 aspect. */
  width?: number
  /** Accessible name. Ignored when `aria-hidden` is set. */
  title?: string
}

/**
 * Brand mark: lowercase "is" inside an Algiers Casbah doorway arch.
 * Colours come from theme tokens, so it follows light and dark mode.
 */
function Logo(props: LogoProps) {
  const { width = 32, title = 'Issam Seghir', className, ...rest } = props
  const decorative = rest['aria-hidden'] === true || rest['aria-hidden'] === 'true'

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='14 8 72 90'
      width={width}
      height={Math.round(width * 1.25)}
      role={decorative ? undefined : 'img'}
      className={cn('shrink-0', className)}
      {...rest}
    >
      {decorative ? null : <title>{title}</title>}
      <path d='M18 94V49.2C18 27.6 32 10.8 50 10.8s32 16.8 32 38.4V94Z' className='fill-primary' />
      <g
        transform='translate(21 28) scale(.58)'
        fill='none'
        className='stroke-background'
        strokeWidth='11'
        strokeLinecap='round'
      >
        <rect x='17.5' y='20' width='11' height='11' rx='1.5' className='fill-highlight' stroke='none' />
        <path d='M23 82V42' />
        <path d='M76 45c-4-5-11-7-18-7-10 0-16 4-16 11s6 9 17 11 18 4 18 12-7 10-18 10c-8 0-15-2-19-7' />
      </g>
    </svg>
  )
}

export { Logo }
