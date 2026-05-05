import { ConstructionIcon, RocketIcon } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

import { Link } from '@/components/ui/link'

type SoonProps = {
  title: string
  description: string
}

async function Soon(props: SoonProps) {
  const { title, description } = props
  const t = await getTranslations()

  return (
    <div className='rounded-2xl border bg-card p-8'>
      <div className='flex items-start gap-4'>
        <div className='rounded-xl border bg-muted p-3'>
          <ConstructionIcon className='size-5' aria-hidden />
        </div>
        <div className='min-w-0'>
          <h2 className='text-xl font-semibold'>{title}</h2>
          <p className='mt-2 text-sm text-muted-foreground'>{description}</p>
          <div className='mt-6 flex flex-wrap gap-3'>
            <Link href='/' className='inline-flex items-center gap-2 rounded-xl border bg-accent px-4 py-2 text-sm'>
              <RocketIcon className='size-4' aria-hidden /> {t('common.labels.home')}
            </Link>
            <Link href='/projects' className='inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm'>
              {t('common.labels.projects')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Soon

