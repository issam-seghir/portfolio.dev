'use client'

import { MailIcon, RocketIcon } from 'lucide-react'
import { motion, useInView } from 'motion/react'
import { useTranslations } from 'next-intl'
import { useRef } from 'react'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/utils/cn'

function ProjectCTA() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const t = useTranslations()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.5 }}
      className='mt-16 rounded-2xl border bg-linear-to-br from-blue-50 to-violet-50 p-8 text-center dark:from-blue-950/30 dark:to-violet-950/30'
    >
      <RocketIcon className='mx-auto mb-4 size-8 text-blue-600 dark:text-blue-400' />
      <h3 className='text-xl font-semibold'>{t('projects.cta.title')}</h3>
      <p className='mx-auto mt-2 max-w-md text-sm text-muted-foreground'>
        {t('projects.cta.description')}
      </p>
      <a
        href='mailto:issamusma@hotmail.com'
        className={cn(buttonVariants(), 'mt-6 gap-2')}
      >
        <MailIcon className='size-4' />
        {t('projects.cta.button')}
      </a>
    </motion.div>
  )
}

export default ProjectCTA
