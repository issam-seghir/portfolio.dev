import type { Project } from 'content-collections'

import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Link } from '@/components/ui/link'

type ProjectNavigationProps = {
  prev: Project | undefined
  next: Project | undefined
}

function ProjectNavigation({ prev, next }: ProjectNavigationProps) {
  const t = useTranslations()

  if (!prev && !next) return null

  return (
    <div className='mt-12 grid grid-cols-2 gap-4 border-t pt-8'>
      {prev ? (
        <Link
          href={`/projects/${prev.slug}`}
          className='group flex items-center gap-3 rounded-xl p-4 transition-colors hover:bg-accent'
        >
          <ArrowLeftIcon className='size-4 text-muted-foreground transition-transform group-hover:-translate-x-1' />
          <div className='min-w-0'>
            <p className='text-xs text-muted-foreground'>{t('projects.nav.previous')}</p>
            <p className='truncate text-sm font-medium'>{prev.name}</p>
          </div>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`/projects/${next.slug}`}
          className='group flex items-center justify-end gap-3 rounded-xl p-4 text-right transition-colors hover:bg-accent'
        >
          <div className='min-w-0'>
            <p className='text-xs text-muted-foreground'>{t('projects.nav.next')}</p>
            <p className='truncate text-sm font-medium'>{next.name}</p>
          </div>
          <ArrowRightIcon className='size-4 text-muted-foreground transition-transform group-hover:translate-x-1' />
        </Link>
      ) : (
        <div />
      )}
    </div>
  )
}

export default ProjectNavigation
