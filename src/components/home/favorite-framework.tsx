'use client'

import { DownloadIcon, FileTextIcon } from 'lucide-react'
import { motion } from 'motion/react'
import { useTranslations } from 'next-intl'

function ResumeCard() {
  const t = useTranslations()

  return (
    <motion.a
      href='/resume.pdf'
      target='_blank'
      rel='noopener noreferrer'
      className='group flex h-full flex-col items-center justify-center gap-4 rounded-2xl p-4 shadow-feature-card transition-all hover:shadow-lg lg:p-6'
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className='flex size-16 items-center justify-center rounded-2xl bg-linear-to-br from-blue-500/10 to-violet-500/10 ring-2 ring-blue-500/20'
        whileHover={{ rotate: [0, -3, 3, 0] }}
        transition={{ duration: 0.4 }}
      >
        <FileTextIcon className='size-7 text-blue-500' />
      </motion.div>
      <div className='flex flex-col items-center gap-1'>
        <h2 className='text-sm font-medium'>{t('homepage.about-me.resume')}</h2>
        <span className='flex items-center gap-1 text-xs text-muted-foreground'>
          <DownloadIcon className='size-3' />
          {t('homepage.about-me.download-resume')}
        </span>
      </div>
    </motion.a>
  )
}

export default ResumeCard
