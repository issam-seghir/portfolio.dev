import { DownloadIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

function ResumeCard() {
  const t = useTranslations()

  return (
    <a
      href='/resume.pdf'
      target='_blank'
      rel='noopener noreferrer'
      className='flex flex-col gap-6 rounded-2xl p-4 shadow-feature-card transition-colors hover:bg-accent lg:p-6'
    >
      <div className='flex items-center gap-2'>
        <DownloadIcon className='size-4.5' />
        <h2 className='text-sm'>{t('homepage.about-me.resume')}</h2>
      </div>
      <div className='flex flex-col items-center justify-center gap-2'>
        <div className='flex size-16 items-center justify-center rounded-2xl bg-muted'>
          <span className='text-2xl font-bold text-muted-foreground'>CV</span>
        </div>
        <span className='text-xs text-muted-foreground'>{t('homepage.about-me.download-resume')}</span>
      </div>
    </a>
  )
}

export default ResumeCard
