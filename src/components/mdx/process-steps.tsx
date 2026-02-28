'use client'

import { BrainIcon, CodeIcon, PencilRulerIcon, RepeatIcon, RocketIcon } from 'lucide-react'
import { motion, useInView } from 'motion/react'
import { useTranslations } from 'next-intl'
import { useRef } from 'react'

const STEPS = [
  { icon: BrainIcon, titleKey: 'about.process.understand', descKey: 'about.process.understand-desc', color: 'text-blue-500' },
  { icon: PencilRulerIcon, titleKey: 'about.process.design', descKey: 'about.process.design-desc', color: 'text-violet-500' },
  { icon: CodeIcon, titleKey: 'about.process.build', descKey: 'about.process.build-desc', color: 'text-emerald-500' },
  { icon: RocketIcon, titleKey: 'about.process.ship', descKey: 'about.process.ship-desc', color: 'text-orange-500' },
  { icon: RepeatIcon, titleKey: 'about.process.iterate', descKey: 'about.process.iterate-desc', color: 'text-pink-500' },
] as const

function ProcessSteps() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const t = useTranslations()

  return (
    <div ref={ref} className='not-prose my-10'>
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-5'>
        {STEPS.map((step, index) => {
          const Icon = step.icon
          return (
            <motion.div
              key={step.titleKey}
              className='group relative flex flex-col gap-3 rounded-xl border bg-card/50 p-5 transition-colors hover:bg-accent/40'
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <span className='text-xs font-bold text-muted-foreground/60'>
                0{index + 1}
              </span>
              <div className={`flex size-10 items-center justify-center rounded-lg bg-accent ${step.color}`}>
                <Icon className='size-5' />
              </div>
              <h3 className='text-sm font-semibold'>{t(step.titleKey as never)}</h3>
              <p className='text-xs leading-relaxed text-muted-foreground'>
                {t(step.descKey as never)}
              </p>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default ProcessSteps
