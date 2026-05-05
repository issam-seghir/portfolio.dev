'use client'

import { motion, useScroll, useSpring } from 'motion/react'

function ReadingProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.2,
  })

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className='pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-primary/70'
    />
  )
}

export default ReadingProgress
