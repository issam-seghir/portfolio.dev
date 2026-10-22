'use client'

import { BrainIcon, CodeIcon, FlameIcon, PencilRulerIcon, RepeatIcon, RocketIcon } from 'lucide-react'
import { motion, useInView } from 'motion/react'
import { useTranslations } from 'next-intl'
import { useRef } from 'react'

const STEPS = [
  {
    icon: RocketIcon,
    titleKey: 'about.capabilities.saas',
    descKey: 'about.capabilities.saas-desc',
  },
  {
    icon: BrainIcon,
    titleKey: 'about.capabilities.ai',
    descKey: 'about.capabilities.ai-desc',
  },
  {
    icon: CodeIcon,
    titleKey: 'about.capabilities.enterprise',
    descKey: 'about.capabilities.enterprise-desc',
  },
  {
    icon: RepeatIcon,
    titleKey: 'about.capabilities.api',
    descKey: 'about.capabilities.api-desc',
  },
  {
    icon: PencilRulerIcon,
    titleKey: 'about.capabilities.ui',
    descKey: 'about.capabilities.ui-desc',
  },
  {
    icon: FlameIcon,
    titleKey: 'about.capabilities.performance',
    descKey: 'about.capabilities.performance-desc',
  },
] as const

function ProcessSteps() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const t = useTranslations()

  return (
    <div ref={ref} className='not-prose my-10'>
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {STEPS.map((step, index) => {
          const Icon = step.icon
          return (
            <motion.div
              key={step.titleKey}
              className='group relative flex min-w-0 flex-col gap-3 rounded-xl border bg-card/50 p-5 text-start transition-colors hover:bg-accent/40'
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <span className='text-xs font-bold text-muted-foreground tabular-nums'>0{index + 1}</span>
              <div className='flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary'>
                <Icon className='size-5' />
              </div>
              <h3 className='text-sm font-semibold'>{t(step.titleKey as never)}</h3>
              <p className='text-xs/relaxed text-muted-foreground'>{t(step.descKey as never)}</p>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default ProcessSteps
