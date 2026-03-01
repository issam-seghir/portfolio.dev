'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { useCallback, useRef } from 'react'

import { cn } from '@/utils/cn'

type TiltCardProps = {
  children: React.ReactNode
  className?: string
  tiltAmount?: number
  glareEnabled?: boolean
}

function TiltCard({ children, className, tiltAmount = 6, glareEnabled = false }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [tiltAmount, -tiltAmount]), {
    stiffness: 200,
    damping: 25,
  })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-tiltAmount, tiltAmount]), {
    stiffness: 200,
    damping: 25,
  })
  const glareX = useTransform(mouseX, [-0.5, 0.5], [0, 100])
  const glareY = useTransform(mouseY, [-0.5, 0.5], [0, 100])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
    },
    [mouseX, mouseY],
  )

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0)
    mouseY.set(0)
  }, [mouseX, mouseY])

  return (
    <motion.div
      ref={ref}
      className={cn('relative', className)}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {glareEnabled && (
        <motion.div
          className='pointer-events-none absolute inset-0 z-10 rounded-2xl opacity-0 transition-opacity group-hover:opacity-100'
          style={{
            background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.15), transparent 60%)`,
          }}
        />
      )}
    </motion.div>
  )
}

export { TiltCard }
