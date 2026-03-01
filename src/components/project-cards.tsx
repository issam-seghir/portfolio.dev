'use client'

import type { Project } from 'content-collections'

import { StarIcon } from 'lucide-react'
import { motion, useInView } from 'motion/react'
import { useRef } from 'react'

import BlurImage from '@/components/blur-image'
import { TiltCard } from '@/components/tilt-card'
import { Link } from '@/components/ui/link'

import { Badge } from './ui/badge'

type ProjectCardProps = Project & { index: number }
type ProjectCardsProps = {
  projects: Project[]
}

function ProjectCards(props: ProjectCardsProps) {
  const { projects } = props

  return (
    <div className='grid gap-4 md:grid-cols-2'>
      {projects.map((project, index) => (
        <ProjectCard key={project.slug} index={index} {...project} />
      ))}
    </div>
  )
}

function ProjectCard(props: ProjectCardProps) {
  const { name, description, techstack, slug, selected, index } = props
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.5, delay: index * 0.1, type: 'spring', stiffness: 100, damping: 20 }}
    >
      <TiltCard tiltAmount={4}>
        <Link href={`/projects/${slug}`} className='group relative block rounded-2xl px-2 py-4 shadow-feature-card'>
          {selected && (
            <div className='absolute top-6 right-4 z-10 flex items-center gap-1 rounded-full bg-amber-500/90 px-2.5 py-1 text-[10px] font-semibold text-white'>
              <StarIcon className='size-3' />
              Featured
            </div>
          )}
          <BlurImage
            src={`/images/projects/${slug}/cover.png`}
            width={1200}
            height={630}
            imageClassName='group-hover:scale-105'
            alt={name}
            className='rounded-lg'
          />
          <div className='flex-1 px-2 py-4'>
            <div className='space-y-2'>
              <h2 className='text-2xl font-semibold'>{name}</h2>
              <div className='text-muted-foreground'>{description}</div>
            </div>
            <div className='mt-4 flex flex-wrap gap-2'>
              {techstack.map((label) => (
                <Badge key={label} variant='outline'>
                  {label}
                </Badge>
              ))}
            </div>
          </div>
        </Link>
      </TiltCard>
    </motion.div>
  )
}

export default ProjectCards
