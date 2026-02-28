'use client'

import { BriefcaseIcon, GraduationCapIcon } from 'lucide-react'
import { motion, useInView } from 'motion/react'
import { useTranslations } from 'next-intl'
import { useRef } from 'react'

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

const variants = {
  initial: { y: 40, opacity: 0 },
  animate: { y: 0, opacity: 1 },
}

function Experience() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const t = useTranslations()

  return (
    <motion.div
      initial='initial'
      animate={isInView ? 'animate' : 'initial'}
      variants={variants}
      ref={ref}
      transition={{ duration: 0.5 }}
      className='relative my-24'
    >
      <motion.h2
        className='text-center text-3xl font-semibold'
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {t('homepage.experience.title')}
      </motion.h2>

      <div className='relative mx-auto mt-12 max-w-2xl'>
        <div className='absolute top-0 bottom-0 left-6 w-px bg-border md:left-1/2 md:-translate-x-px' />

        {TIMELINE_ITEMS.map((item, index) => (
          <motion.div
            key={item.titleKey}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: index * 0.15 }}
            className='relative mb-8 flex items-start gap-6 md:mb-12'
          >
            <div className='relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border bg-background shadow-sm md:absolute md:left-1/2 md:-translate-x-1/2'>
              {item.type === 'work' ? (
                <BriefcaseIcon className='size-5 text-muted-foreground' />
              ) : (
                <GraduationCapIcon className='size-5 text-muted-foreground' />
              )}
            </div>

            <div className='flex-1 rounded-2xl p-4 shadow-feature-card md:w-[calc(50%-3rem)] md:odd:ml-auto md:odd:mr-0 md:even:ml-0 md:even:mr-auto'>
              <p className='text-xs font-medium text-muted-foreground'>{t(item.periodKey as never)}</p>
              <h3 className='mt-1 text-base font-semibold'>{t(item.titleKey as never)}</h3>
              <p className='text-sm text-muted-foreground'>{t(item.companyKey as never)}</p>
              <p className='mt-2 text-sm text-muted-foreground'>{t(item.descriptionKey as never)}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default Experience
