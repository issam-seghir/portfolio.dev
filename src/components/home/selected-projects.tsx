'use client'

import type { Project } from 'content-collections'

import { ArrowUpRightIcon, LightbulbIcon } from 'lucide-react'
import { motion, useInView } from 'motion/react'
import { useTranslations } from 'next-intl'
import { useRef } from 'react'

import BlurImage from '@/components/blur-image'
import { TiltCard } from '@/components/tilt-card'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Link } from '@/components/ui/link'
import { cn } from '@/utils/cn'

type CardProps = {
  project: Project
  index: number
}

type SelectedProjectsProps = {
  projects: Project[]
}

function SelectedProjects(props: SelectedProjectsProps) {
  const { projects } = props
  const projectsRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(projectsRef, { once: true, margin: '-100px' })
  const t = useTranslations()

  return (
    <div ref={projectsRef} className='relative my-24'>
      <motion.h2
        className='text-center text-3xl font-semibold'
        initial={{ y: 30, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : undefined}
        transition={{ duration: 0.4 }}
      >
        {t('homepage.selected-projects.title')}
      </motion.h2>
      <div className='mt-12 grid gap-4 md:grid-cols-2'>
        {projects.map((project, index) => (
          <Card key={project.slug} project={project} index={index} />
        ))}
      </div>
      <motion.div
        className='my-8 flex items-center justify-center'
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <Link href='/projects' className={cn(buttonVariants({ variant: 'outline' }))}>
          {t('homepage.selected-projects.more')}
        </Link>
      </motion.div>
    </div>
  )
}

function Card(props: CardProps) {
  const { project, index } = props
  const { slug, name, description, techstack } = project
  const t = useTranslations()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : undefined}
      transition={{ duration: 0.5, delay: index * 0.12, type: 'spring', stiffness: 100, damping: 20 }}
    >
      <TiltCard tiltAmount={4}>
        <Link
          href={`/projects/${slug}`}
          className='group relative block rounded-2xl p-2 shadow-feature-card'
        >
          <div className='flex items-center justify-between p-4'>
            <div className='flex items-center gap-3'>
              <LightbulbIcon className='size-4.5' />
              <h2>{t('homepage.selected-projects.card')}</h2>
            </div>
            <ArrowUpRightIcon className='size-4.5 opacity-0 transition-opacity group-hover:opacity-100' />
          </div>
          {/* Fixed aspect + object-cover so 4:3 (and other) covers aren’t squashed in the card frame */}
          <div className='relative aspect-[40/21] w-full overflow-hidden rounded-lg'>
            <BlurImage
              fill
              src={`/images/projects/${slug}/cover.png`}
              alt={description}
              className='absolute inset-0 size-full rounded-lg'
              imageClassName='object-cover object-center'
              sizes='(max-width: 768px) 100vw, 50vw'
              lazy={false}
              fetchPriority='high'
            />
          </div>
          <div className='pointer-events-none absolute inset-x-2 bottom-[46px] h-36 rounded-b-lg bg-linear-to-t from-black/85 via-black/50 to-transparent' />
          <div className='absolute bottom-16 left-7 flex flex-col transition-[left] ease-out group-hover:left-8'>
            <h3 className='text-2xl font-semibold text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.7)]'>{name}</h3>
            <p className='mt-2 text-neutral-100 [text-shadow:0_1px_8px_rgba(0,0,0,0.75)]'>{description}</p>
          </div>
          {techstack.length > 0 && (
            <div className='flex flex-wrap gap-1.5 px-4 pb-3 pt-2'>
              {techstack.slice(0, 4).map((tech) => (
                <Badge key={tech} variant='outline' className='text-[10px]'>
                  {tech}
                </Badge>
              ))}
              {techstack.length > 4 && (
                <Badge variant='outline' className='text-[10px]'>
                  +{techstack.length - 4}
                </Badge>
              )}
            </div>
          )}
        </Link>
      </TiltCard>
    </motion.div>
  )
}

export default SelectedProjects
