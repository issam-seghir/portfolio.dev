'use client'

import type { ComponentType } from 'react'

import {
  SiCss,
  SiDrizzle,
  SiExpress,
  SiFastapi,
  SiFigma,
  SiFirebase,
  SiGit,
  SiHtml5,
  SiHuggingface,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiShadcnui,
  SiTailwindcss,
  SiTypescript,
} from '@icons-pack/react-simple-icons'
import { ZapIcon } from 'lucide-react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { useTranslations } from 'next-intl'
import { useRef } from 'react'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/utils/cn'

const SiOpenai = (props: React.SVGProps<SVGSVGElement>) => (
  <svg role='img' viewBox='0 0 24 24' fill='currentColor' {...props}>
    <path d='M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.739-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023-.141-.085-4.78-2.792a.783.783 0 0 0-.785 0L9.409 9.229V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365 2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z' />
  </svg>
)

type TechItem = {
  name: string
  Icon: ComponentType<React.SVGProps<SVGSVGElement>>
  /** Real brand color of the tech logo (intentionally not a theme token) */
  color: string
}

const TECH: TechItem[] = [
  {
    name: 'React',
    Icon: SiReact,
    color: '#61dafb',
  },
  {
    name: 'Next.js',
    Icon: SiNextdotjs,
    color: '#ffffff',
  },
  {
    name: 'TypeScript',
    Icon: SiTypescript,
    color: '#3178c6',
  },
  {
    name: 'Tailwind',
    Icon: SiTailwindcss,
    color: '#06b6d4',
  },
  {
    name: 'shadcn/ui',
    Icon: SiShadcnui,
    color: '#ffffff',
  },
  {
    name: 'Node.js',
    Icon: SiNodedotjs,
    color: '#339933',
  },
  {
    name: 'PostgreSQL',
    Icon: SiPostgresql,
    color: '#4169e1',
  },
  {
    name: 'Prisma',
    Icon: SiPrisma,
    color: '#ffffff',
  },
  {
    name: 'Drizzle',
    Icon: SiDrizzle,
    color: '#f9b707',
  },
  {
    name: 'Express',
    Icon: SiExpress,
    color: '#ffffff',
  },
  {
    name: 'FastAPI',
    Icon: SiFastapi,
    color: '#009688',
  },
  {
    name: 'OpenAI',
    Icon: SiOpenai,
    color: '#412991',
  },
  {
    name: 'LLM',
    Icon: SiHuggingface,
    color: '#ffac33',
  },
  {
    name: 'MongoDB',
    Icon: SiMongodb,
    color: '#47a248',
  },
  {
    name: 'Firebase',
    Icon: SiFirebase,
    color: '#ffca28',
  },
  {
    name: 'Figma',
    Icon: SiFigma,
    color: '#f24e1e',
  },
  {
    name: 'Git',
    Icon: SiGit,
    color: '#f05032',
  },
  {
    name: 'JavaScript',
    Icon: SiJavascript,
    color: '#f7df1e',
  },
  {
    name: 'HTML5',
    Icon: SiHtml5,
    color: '#e34f26',
  },
  {
    name: 'CSS3',
    Icon: SiCss,
    color: '#1572b6',
  },
]

function isWhiteBrandColor(color: string) {
  return color.toLowerCase() === '#ffffff'
}

function TechIcon({ item, index }: { item: TechItem; index: number }) {
  const { name, Icon, color } = item
  const isUseThemeAwareFill = isWhiteBrandColor(color)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        type: 'spring',
        stiffness: 180,
        damping: 16,
        delay: index * 0.04 + 0.1,
      }}
    >
      <Tooltip>
        {/* Base UI Trigger renders a <button>; use unstyled button + inner motion (not Radix asChild) */}
        <TooltipTrigger className='inline-flex size-auto min-h-0 cursor-grab border-0 bg-transparent p-0 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none active:cursor-grabbing'>
          <motion.div
            drag
            dragSnapToOrigin
            dragElastic={0.3}
            dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
            className='relative'
            whileHover={{ scale: 1.1, zIndex: 10 }}
            whileTap={{ scale: 1.3 }}
          >
            <div
              className={cn(
                'flex size-14 items-center justify-center rounded-xl border transition-colors duration-300 sm:size-16',
                'border-border/60 bg-muted/50 hover:border-border hover:bg-muted/80',
              )}
            >
              <Icon
                className={cn('size-7 sm:size-8', isUseThemeAwareFill && 'text-foreground')}
                style={isUseThemeAwareFill ? undefined : { color }}
              />
            </div>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent side='top' align='center' className='text-xs font-medium'>
          {name}
        </TooltipContent>
      </Tooltip>
    </motion.div>
  )
}

function TiltContainer({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), { stiffness: 150, damping: 20 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), { stiffness: 150, damping: 20 })

  function handleMouse(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function handleLeave() {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className='flex-1'
    >
      {children}
    </motion.div>
  )
}

export default function StacksCard() {
  const t = useTranslations()

  return (
    <div className={cn('bento-card flex h-full flex-col gap-4 overflow-hidden p-4 lg:p-6')}>
      <div className='flex items-center gap-2'>
        <ZapIcon className='size-4.5' />
        <h2 className='text-sm'>{t('homepage.about-me.stacks')}</h2>
      </div>

      <TiltContainer>
        <div className={cn('grid grid-cols-4 gap-3 sm:grid-cols-5 lg:grid-cols-8', 'place-items-center py-2')}>
          {TECH.map((item, i) => (
            <TechIcon key={item.name} item={item} index={i} />
          ))}
        </div>
      </TiltContainer>
    </div>
  )
}
