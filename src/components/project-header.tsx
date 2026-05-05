'use client'

import type { Project } from 'content-collections'

import { ArrowUpRightIcon, BuildingIcon, CalendarIcon, ClockIcon, StarIcon, UsersIcon } from 'lucide-react'
import { motion } from 'motion/react'
import { useTranslations } from 'next-intl'

import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Link } from '@/components/ui/link'
import { cn } from '@/utils/cn'

const animation = {
  hide: { x: -30, opacity: 0 },
  show: { x: 0, opacity: 1 },
}

type ProjectHeaderProps = Project

type ContextItem = { icon: React.ElementType; label: string }

function buildContextItems(props: ProjectHeaderProps): ContextItem[] {
  const items: ContextItem[] = []
  if (props.year) items.push({ icon: CalendarIcon, label: props.year })
  if (props.duration) items.push({ icon: ClockIcon, label: props.duration })
  if (props.team) items.push({ icon: UsersIcon, label: props.team })
  if (props.company) items.push({ icon: BuildingIcon, label: props.company })
  return items
}

function HeroBadges(props: { isFeatured: boolean; status?: string; projectType?: string; role?: string; featuredLabel: string }) {
  const { isFeatured, status, projectType, role, featuredLabel } = props
  if (!isFeatured && !status && !projectType && !role) return null
  return (
    <div className='flex flex-wrap items-center gap-2'>
      {isFeatured && (
        <Badge variant='secondary' className='gap-1 font-normal'>
          <StarIcon className='size-3 fill-current' aria-hidden />
          {featuredLabel}
        </Badge>
      )}
      {status && <Badge variant='outline'>{status}</Badge>}
      {projectType && <Badge variant='outline'>{projectType}</Badge>}
      {role && <Badge variant='outline'>{role}</Badge>}
    </div>
  )
}

function ContextStrip(props: { items: ContextItem[] }) {
  const { items } = props
  if (items.length === 0) return null
  return (
    <div className='mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground'>
      {items.map(({ icon: Icon, label }) => (
        <span key={label} className='inline-flex items-center gap-1.5'>
          <Icon className='size-3.5' aria-hidden />
          {label}
        </span>
      ))}
    </div>
  )
}

function KpiGrid(props: { kpis?: Project['kpis'] }) {
  const { kpis } = props
  if (!kpis || kpis.length === 0) return null
  return (
    <motion.div
      className='grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4'
      initial={animation.hide}
      animate={animation.show}
      transition={{ delay: 0.05 }}
    >
      {kpis.slice(0, 4).map((kpi) => (
        <div key={`${kpi.label}-${kpi.value}`} className='rounded-xl border bg-card/50 px-3 py-2.5'>
          <div className='text-base/tight font-semibold'>{kpi.value}</div>
          <div className='mt-0.5 text-xs text-muted-foreground'>{kpi.label}</div>
        </div>
      ))}
    </motion.div>
  )
}

const EMPTY_LIST: string[] = []

function OutcomesAndTags({
  outcomes = EMPTY_LIST,
  tags = EMPTY_LIST,
}: {
  outcomes?: string[]
  tags?: string[]
}) {
  if (outcomes.length === 0 && tags.length === 0) return null
  return (
    <motion.div
      className='space-y-3'
      initial={animation.hide}
      animate={animation.show}
      transition={{ delay: 0.1 }}
    >
      {outcomes.length > 0 && (
        <ul className='space-y-1.5 text-sm text-muted-foreground'>
          {outcomes.slice(0, 3).map((item) => (
            <li key={item} className='flex gap-2'>
              <span className='mt-1 size-1.5 shrink-0 rounded-full bg-primary/70' aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
      {tags.length > 0 && (
        <div className='flex flex-wrap gap-2'>
          {tags.slice(0, 8).map((tag) => (
            <Badge key={tag} variant='secondary' className='font-normal'>
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </motion.div>
  )
}

function HeroActions(props: { homepage?: string; github?: string; openSource?: boolean; visitWebsite: string; visitRepo: string }) {
  const { homepage, github, openSource, visitWebsite, visitRepo } = props
  const hasRepo = Boolean(github && openSource)
  if (!homepage && !hasRepo) return null
  return (
    <motion.div
      className='flex flex-col items-start gap-2 sm:flex-row sm:gap-4'
      initial={animation.hide}
      animate={animation.show}
      transition={{ delay: 0.15 }}
    >
      {homepage && (
        <Link href={homepage} className={cn(buttonVariants(), 'group')}>
          {visitWebsite}
          <ArrowUpRightIcon className='size-5 transition-transform group-hover:-rotate-12' />
        </Link>
      )}
      {github && openSource && (
        <Link href={github} className={cn(buttonVariants({ variant: 'outline' }), 'group')}>
          {visitRepo}
          <ArrowUpRightIcon className='size-5 transition-transform group-hover:-rotate-12' />
        </Link>
      )}
    </motion.div>
  )
}

function ProjectHeader(props: ProjectHeaderProps) {
  const { name, description, status, projectType, role, featuredRank, kpis, outcomes, tags, homepage, github, openSource } = props
  const t = useTranslations()
  const isFeatured = typeof featuredRank === 'number'
  const contextItems = buildContextItems(props)

  return (
    <div className='space-y-8 pt-10'>
      <motion.div className='flex flex-col gap-3' initial={animation.hide} animate={animation.show}>
        <HeroBadges
          isFeatured={isFeatured}
          status={status}
          projectType={projectType}
          role={role}
          featuredLabel={t('projects.featured-badge')}
        />
        <h1 className='text-3xl font-semibold tracking-tight sm:text-4xl'>{name}</h1>
        <p className='max-w-2xl text-muted-foreground'>{description}</p>
        <ContextStrip items={contextItems} />
      </motion.div>
      <KpiGrid kpis={kpis} />
      <OutcomesAndTags outcomes={outcomes} tags={tags} />
      <HeroActions
        homepage={homepage}
        github={github}
        openSource={openSource}
        visitWebsite={t('projects.visit-website')}
        visitRepo={t('projects.visit-repo')}
      />
    </div>
  )
}

export default ProjectHeader
