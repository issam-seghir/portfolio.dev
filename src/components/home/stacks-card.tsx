'use client'

import {
  SiCss,
  SiDrizzle,
  SiExpress,
  SiFigma,
  SiFirebase,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from '@icons-pack/react-simple-icons'
import { ZapIcon } from 'lucide-react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { useTranslations } from 'next-intl'
import { useRef } from 'react'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/utils/cn'

type TechItem = {
  name: string
  Icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element
  color: string
  glow: string
  floatDelay: number
  floatDuration: number
  floatY: number
}

const TECH: TechItem[] = [
  { name: 'React', Icon: SiReact, color: '#61dafb', glow: 'rgba(97,218,251,0.4)', floatDelay: 0, floatDuration: 4, floatY: 6 },
  { name: 'Next.js', Icon: SiNextdotjs, color: '#ffffff', glow: 'rgba(255,255,255,0.2)', floatDelay: 0.5, floatDuration: 4.5, floatY: 5 },
  { name: 'TypeScript', Icon: SiTypescript, color: '#3178c6', glow: 'rgba(49,120,198,0.4)', floatDelay: 1, floatDuration: 5, floatY: 7 },
  { name: 'Tailwind', Icon: SiTailwindcss, color: '#06b6d4', glow: 'rgba(6,182,212,0.4)', floatDelay: 0.3, floatDuration: 4.2, floatY: 5 },
  { name: 'Node.js', Icon: SiNodedotjs, color: '#339933', glow: 'rgba(51,153,51,0.35)', floatDelay: 0.7, floatDuration: 4.8, floatY: 6 },
  { name: 'PostgreSQL', Icon: SiPostgresql, color: '#4169e1', glow: 'rgba(65,105,225,0.35)', floatDelay: 1.2, floatDuration: 5.2, floatY: 4 },
  { name: 'Prisma', Icon: SiPrisma, color: '#ffffff', glow: 'rgba(255,255,255,0.15)', floatDelay: 0.4, floatDuration: 3.8, floatY: 5 },
  { name: 'Drizzle', Icon: SiDrizzle, color: '#f9b707', glow: 'rgba(249,183,7,0.35)', floatDelay: 0.9, floatDuration: 4.4, floatY: 6 },
  { name: 'Express', Icon: SiExpress, color: '#ffffff', glow: 'rgba(255,255,255,0.15)', floatDelay: 1.4, floatDuration: 4.6, floatY: 4 },
  { name: 'MongoDB', Icon: SiMongodb, color: '#47a248', glow: 'rgba(71,162,72,0.35)', floatDelay: 0.6, floatDuration: 5.0, floatY: 5 },
  { name: 'Firebase', Icon: SiFirebase, color: '#ffca28', glow: 'rgba(255,202,40,0.35)', floatDelay: 1.1, floatDuration: 4.3, floatY: 7 },
  { name: 'Figma', Icon: SiFigma, color: '#f24e1e', glow: 'rgba(242,78,30,0.35)', floatDelay: 0.2, floatDuration: 4.7, floatY: 5 },
  { name: 'Git', Icon: SiGit, color: '#f05032', glow: 'rgba(240,80,50,0.35)', floatDelay: 0.8, floatDuration: 3.6, floatY: 4 },
  { name: 'JavaScript', Icon: SiJavascript, color: '#f7df1e', glow: 'rgba(247,223,30,0.3)', floatDelay: 1.3, floatDuration: 4.1, floatY: 6 },
  { name: 'HTML5', Icon: SiHtml5, color: '#e34f26', glow: 'rgba(227,79,38,0.35)', floatDelay: 0.5, floatDuration: 4.9, floatY: 5 },
  { name: 'CSS3', Icon: SiCss, color: '#1572b6', glow: 'rgba(21,114,182,0.35)', floatDelay: 1.0, floatDuration: 5.1, floatY: 4 },
]

function FloatingIcon({ item, index }: { item: TechItem; index: number }) {
  const { name, Icon, color, glow, floatDelay, floatDuration, floatY } = item

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
        <TooltipTrigger asChild>
          <motion.div
            drag
            dragSnapToOrigin
            dragElastic={0.3}
            dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
            className='relative cursor-grab active:cursor-grabbing'
            animate={{ y: [-floatY, floatY, -floatY] }}
            transition={{
              y: {
                duration: floatDuration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: floatDelay,
              },
            }}
            whileHover={{ scale: 1.2, zIndex: 10 }}
            whileTap={{ scale: 1.3 }}
          >
            <div
              className='flex size-14 items-center justify-center rounded-2xl border border-white/8 bg-white/4 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/8 sm:size-16'
              style={{
                boxShadow: `0 0 0px ${glow}, inset 0 1px 0 rgba(255,255,255,0.06)`,
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLDivElement).style.boxShadow =
                  `0 0 28px ${glow}, 0 0 60px ${glow.replace(/[\d.]+\)$/, '0.15)')}, inset 0 1px 0 rgba(255,255,255,0.1)`
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLDivElement).style.boxShadow =
                  `0 0 0px ${glow}, inset 0 1px 0 rgba(255,255,255,0.06)`
              }}
            >
              <Icon className='size-7 sm:size-8' style={{ color }} />
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

function StacksCard() {
  const t = useTranslations()

  return (
    <div className='flex h-full flex-col gap-4 overflow-hidden rounded-2xl p-4 shadow-feature-card transition-shadow hover:shadow-lg lg:p-6'>
      <div className='flex items-center gap-2'>
        <ZapIcon className='size-4.5' />
        <h2 className='text-sm'>{t('homepage.about-me.stacks')}</h2>
      </div>

      <TiltContainer>
        <div className={cn(
          'grid grid-cols-4 gap-3 sm:grid-cols-5 lg:grid-cols-8',
          'place-items-center py-2'
        )}>
          {TECH.map((item, i) => (
            <FloatingIcon key={item.name} item={item} index={i} />
          ))}
        </div>
      </TiltContainer>
    </div>
  )
}

export default StacksCard
