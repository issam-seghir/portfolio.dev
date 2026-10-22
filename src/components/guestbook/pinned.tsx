import { MessageCircleIcon, PinIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function Pinned() {
  const t = useTranslations()

  return (
    <div className='relative overflow-hidden rounded-xl border bg-card text-card-foreground'>
      {/* Pin Icon */}
      <div className='absolute inset-e-4 top-4'>
        <PinIcon className='size-5 rotate-45 text-muted-foreground' />
      </div>

      <div className='relative p-6'>
        <div className='flex items-start gap-4'>
          <div className='hidden size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 sm:flex'>
            <MessageCircleIcon className='size-5 text-primary' />
          </div>
          <div className='space-y-4'>
            <h2 className='text-xl font-semibold'>{t('guestbook.pinned.greeting')}</h2>
            <p className='text-sm text-muted-foreground'>{t('guestbook.pinned.description')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
