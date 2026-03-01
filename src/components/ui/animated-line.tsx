'use client'

import { motion } from 'motion/react'
import { cn } from '@/utils/cn'

type AnimatedLineProps = {
  className?: string
  delay?: number
  duration?: number
}

function AnimatedLine({ className, delay = 0.3, duration = 0.6 }: AnimatedLineProps) {
  return (
    <motion.span
      className={cn(
        'mt-2 block h-[3px] w-16 rounded-full bg-linear-to-r from-blue-500 to-violet-500',
        className,
      )}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ transformOrigin: 'left' }}
    />
  )
}

export { AnimatedLine }
