'use client'

import type { Project } from 'content-collections'

import { ArrowUpRightIcon } from 'lucide-react'
import { motion } from 'motion/react'
import { useTranslations } from 'next-intl'

import { buttonVariants } from '@/components/ui/button'
import { Link } from '@/components/ui/link'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/utils/cn'

const animation = {
  hide: {
    x: -30,
    opacity: 0,
  },
  show: {
    x: 0,
    opacity: 1,
  },
}

type ProjectHeaderProps = Project

function ProjectHeader(props: ProjectHeaderProps) {
  const { name, description, homepage, github, openSource, company, role, projectType, status, outcomes, tags } = props
  const t = useTranslations()

  return (
    <div className='space-y-8 pt-10'>
      <motion.div className='flex items-center gap-3' initial={animation.hide} animate={animation.show}>
        <div className='flex flex-col gap-3'>
          <h1 className='text-3xl font-semibold'>{name}</h1>
          <h2 className='text-muted-foreground'>{description}</h2>
          {(company || role || projectType || status) && (
            <div className='flex flex-wrap items-center gap-2 pt-1'>
              {status && <Badge variant='secondary'>{status}</Badge>}
              {projectType && <Badge variant='outline'>{projectType}</Badge>}
              {role && <Badge variant='outline'>{role}</Badge>}
              {company && <Badge variant='outline'>{company}</Badge>}
            </div>
          )}
        </div>
      </motion.div>
      {outcomes?.length || tags?.length ? (
        <motion.div
          className='space-y-3'
          initial={animation.hide}
          animate={animation.show}
          transition={{ delay: 0.05 }}
        >
          {outcomes?.length ? (
            <ul className='space-y-1.5 text-sm text-muted-foreground'>
              {outcomes.slice(0, 3).map((item) => (
                <li key={item} className='flex gap-2'>
                  <span className='mt-1 size-1.5 shrink-0 rounded-full bg-primary/70' aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : null}
          {tags?.length ? (
            <div className='flex flex-wrap gap-2'>
              {tags.slice(0, 8).map((tag) => (
                <Badge key={tag} variant='secondary' className='font-normal'>
                  {tag}
                </Badge>
              ))}
            </div>
          ) : null}
        </motion.div>
      ) : null}
      <motion.div
        className='flex flex-col items-start gap-2 sm:flex-row sm:gap-4'
        initial={animation.hide}
        animate={animation.show}
        transition={{ delay: 0.1 }}
      >
        {homepage && (
          <Link href={homepage} className={cn(buttonVariants(), 'group')}>
            {t('projects.visit-website')}
            <ArrowUpRightIcon className='size-5 transition-transform group-hover:-rotate-12' />
          </Link>
        )}
        {github && openSource && (
          <Link href={github} className={cn(buttonVariants(), 'group')}>
            {t('projects.visit-repo')}
            <ArrowUpRightIcon className='size-5 transition-transform group-hover:-rotate-12' />
          </Link>
        )}
      </motion.div>
    </div>
  )
}
export default ProjectHeader
