import type { Project } from 'content-collections'

import { useTranslations } from 'next-intl'

import BlurImage from '@/components/blur-image'
import ProjectCoverTransition from '@/components/project-cover-transition'
import { Link } from '@/components/ui/link'

type ProjectCardsProps = {
  projects: Project[]
}

const MAX_TAGS = 4

function ProjectCards(props: ProjectCardsProps) {
  const { projects } = props

  return (
    <div className='grid gap-x-6 gap-y-12 md:grid-cols-2'>
      {projects.map((project) => (
        <ProjectCard key={project.slug} {...project} />
      ))}
    </div>
  )
}

function ProjectCard(props: Project) {
  const { name, description, techstack, slug, selected } = props
  const t = useTranslations()
  const extra = techstack.length - MAX_TAGS

  return (
    <Link href={`/projects/${slug}`} className='group block rounded-xl'>
      <ProjectCoverTransition slug={slug}>
        <div className='relative aspect-40/21 w-full overflow-hidden rounded-xl border bg-muted'>
          <BlurImage
            fill
            src={`/images/projects/${slug}/cover.webp`}
            alt={name}
            className='absolute inset-0 size-full'
            imageClassName='object-cover object-center'
            sizes='(max-width: 768px) 100vw, 50vw'
          />
          {selected && (
            <span className='absolute inset-e-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-sm bg-highlight px-2 py-1 text-xs font-medium text-highlight-foreground'>
              {t('projects.featured-badge')}
            </span>
          )}
        </div>
      </ProjectCoverTransition>
      <h2 className='mt-4 font-heading text-xl font-semibold group-hover:text-primary'>{name}</h2>
      <p className='mt-1 text-pretty text-muted-foreground'>{description}</p>
      {techstack.length > 0 && (
        <ul className='mt-3 flex flex-wrap gap-1.5'>
          {techstack.slice(0, MAX_TAGS).map((tech) => (
            <li key={tech} className='rounded-sm bg-secondary px-2 py-0.5 text-xs text-muted-foreground'>
              {tech}
            </li>
          ))}
          {extra > 0 && <li className='rounded-sm px-1 py-0.5 text-xs text-muted-foreground'>+{extra}</li>}
        </ul>
      )}
    </Link>
  )
}

export default ProjectCards
