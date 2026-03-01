'use client'

import { BriefcaseIcon, GraduationCapIcon } from 'lucide-react'
import { motion, useInView, useScroll, useTransform } from 'motion/react'
import { useTranslations } from 'next-intl'
import { useRef } from 'react'

import { cn } from '@/utils/cn'

type TimelineItem = {
  titleKey: string
  companyKey: string
  periodKey: string
  descriptionKey: string
  type: 'work' | 'education'
}

const TIMELINE_ITEMS: TimelineItem[] = [
  {
    titleKey: 'homepage.experience.items.founder.title',
    companyKey: 'homepage.experience.items.founder.company',
    periodKey: 'homepage.experience.items.founder.period',
    descriptionKey: 'homepage.experience.items.founder.description',
    type: 'work',
  },
  {
    titleKey: 'homepage.experience.items.freelance.title',
    companyKey: 'homepage.experience.items.freelance.company',
    periodKey: 'homepage.experience.items.freelance.period',
    descriptionKey: 'homepage.experience.items.freelance.description',
    type: 'work',
  },
  {
    titleKey: 'homepage.experience.items.fullstack.title',
    companyKey: 'homepage.experience.items.fullstack.company',
    periodKey: 'homepage.experience.items.fullstack.period',
    descriptionKey: 'homepage.experience.items.fullstack.description',
    type: 'work',
  },
  {
    titleKey: 'homepage.experience.items.education.title',
    companyKey: 'homepage.experience.items.education.company',
    periodKey: 'homepage.experience.items.education.period',
    descriptionKey: 'homepage.experience.items.education.description',
    type: 'education',
  },
]

function Experience() {
  const ref = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const t = useTranslations()

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 80%', 'end 60%'],
  })
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div ref={ref} className='relative my-24'>
      <motion.h2
        className='text-center text-3xl font-semibold'
        initial={{ y: 30, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : undefined}
        transition={{ duration: 0.3 }}
      >
        {t('homepage.experience.title')}
      </motion.h2>

      <div ref={timelineRef} className='relative mx-auto mt-12 max-w-2xl'>
        <div className='absolute top-0 bottom-0 left-6 w-px bg-border md:left-1/2 md:-translate-x-px' />
        <motion.div
          className='absolute top-0 left-6 w-px origin-top bg-linear-to-b from-blue-500 to-violet-500 md:left-1/2 md:-translate-x-px'
          style={{ scaleY: lineScaleY, height: '100%' }}
        />

        {TIMELINE_ITEMS.map((item, index) => (
          <motion.div
            key={item.titleKey}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.5, delay: index * 0.15, type: 'spring', stiffness: 100, damping: 20 }}
            className='relative mb-8 flex items-start gap-6 md:mb-12'
          >
            <motion.div
              className={cn(
                'relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border shadow-sm md:absolute md:left-1/2 md:-translate-x-1/2',
                item.type === 'work'
                  ? 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950'
                  : 'border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950',
              )}
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : undefined}
              transition={{ duration: 0.4, delay: index * 0.15 + 0.1, type: 'spring', stiffness: 200, damping: 15 }}
            >
              {item.type === 'work' ? (
                <BriefcaseIcon className='size-5 text-blue-600 dark:text-blue-400' />
              ) : (
                <GraduationCapIcon className='size-5 text-emerald-600 dark:text-emerald-400' />
              )}
            </motion.div>

            <div className='flex-1 rounded-2xl p-4 shadow-feature-card md:w-[calc(50%-3rem)] md:odd:ml-auto md:odd:mr-0 md:even:ml-0 md:even:mr-auto'>
              <p className='text-xs font-medium text-muted-foreground'>{t(item.periodKey as never)}</p>
              <h3 className='mt-1 text-base font-semibold'>{t(item.titleKey as never)}</h3>
              <p className='text-sm text-muted-foreground'>{t(item.companyKey as never)}</p>
              <p className='mt-2 text-sm text-muted-foreground'>{t(item.descriptionKey as never)}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Experience
