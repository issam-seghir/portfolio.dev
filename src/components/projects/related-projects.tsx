import type { Project } from 'content-collections'

import { ArrowUpRightIcon } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

import BlurImage from '@/components/blur-image'
import { Link } from '@/components/ui/link'

type RelatedProjectsProps = {
  projects: Project[]
}

async function RelatedProjects(props: RelatedProjectsProps) {
  const { projects } = props
  const t = await getTranslations()

  if (projects.length === 0) return null

  return (
    <section className='mt-16 border-t pt-10'>
      <h2 className='text-xl font-semibold'>{t('projects.related')}</h2>
      <div className='mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className='group relative block overflow-hidden rounded-xl border bg-card transition-colors hover:bg-accent/40'
          >
            <div className='relative aspect-40/21 w-full overflow-hidden'>
              <BlurImage
                fill
                src={`/images/projects/${project.slug}/cover.webp`}
                alt={project.name}
                className='absolute inset-0 size-full'
                imageClassName='object-cover object-center transition-transform duration-500 group-hover:scale-105'
                sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
              />
            </div>
            <div className='space-y-1 p-3'>
              <div className='flex items-start justify-between gap-2'>
                <h3 className='text-sm/tight font-semibold'>{project.name}</h3>
                <ArrowUpRightIcon className='size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100' />
              </div>
              <p className='line-clamp-2 text-xs text-muted-foreground'>{project.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default RelatedProjects
