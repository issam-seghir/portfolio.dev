'use client'

import type { Project } from 'content-collections'

import { Index } from 'flexsearch'
import { useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'

import ProjectCards from '@/components/project-cards'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Link } from '@/components/ui/link'
import { useRouter } from '@/i18n/routing'

type ProjectsBrowserProps = {
  projects: Project[]
  initialQuery?: string
  initialFeatured?: boolean
  initialOpenSource?: boolean
  initialStatus?: string
  initialType?: string
  labels: {
    all: string
    searchPlaceholder: string
    featured: string
    openSource: string
    status: string
    type: string
    any: string
    statuses: {
      live: string
      private: string
      archived: string
      inProgress: string
    }
    types: {
      saas: string
      web: string
      mobile: string
      internal: string
    }
  }
}

function norm(value: string) {
  return value.trim().toLowerCase()
}

function ProjectsBrowser(props: ProjectsBrowserProps) {
  const { projects, initialQuery, initialFeatured, initialOpenSource, initialStatus, initialType, labels } = props
  const router = useRouter()
  const searchParams = useSearchParams()

  const [q, setQ] = useState(initialQuery ?? '')
  const [featuredOnly, setFeaturedOnly] = useState(Boolean(initialFeatured))
  const [openSourceOnly, setOpenSourceOnly] = useState(Boolean(initialOpenSource))
  const [status, setStatus] = useState(initialStatus?.trim() ? norm(initialStatus) : '')
  const [type, setType] = useState(initialType?.trim() ? norm(initialType) : '')

  const flex = useMemo(() => {
    const index = new Index({ tokenize: 'forward', cache: 100 })
    for (const p of projects) {
      const text = [p.name, p.description, ...p.techstack, ...(p.tags ?? [])].join(' ').toLowerCase()
      index.add(p.slug, text)
    }
    return index
  }, [projects])

  const results = useMemo(() => {
    const filtered = projects
      .filter((p) => (featuredOnly ? Boolean(p.selected || p.featuredRank) : true))
      .filter((p) => (openSourceOnly ? Boolean(p.openSource) : true))
      .filter((p) => (status ? norm(p.status ?? '') === status : true))
      .filter((p) => (type ? norm(p.projectType ?? '') === type : true))

    const sorted = featuredOnly
      ? [...filtered].toSorted((a, b) => {
          const rankA = a.featuredRank ?? Number.POSITIVE_INFINITY
          const rankB = b.featuredRank ?? Number.POSITIVE_INFINITY
          const diff = rankA - rankB
          if (diff !== 0) return diff
          return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
        })
      : filtered

    const query = q.trim().toLowerCase()
    if (!query) return sorted
    const slugs = new Set(flex.search(query, { limit: 50 }) as string[])
    return sorted.filter((p) => slugs.has(p.slug))
  }, [featuredOnly, flex, openSourceOnly, projects, q, status, type])

  function setUrl(next: {
    q?: string
    featured?: boolean
    openSource?: boolean
    status?: string
    type?: string
  }) {
    const sp = new URLSearchParams(searchParams.toString())
    if (next.q?.trim()) sp.set('q', next.q.trim())
    else sp.delete('q')
    if (next.featured) sp.set('featured', '1')
    else sp.delete('featured')
    if (next.openSource) sp.set('openSource', '1')
    else sp.delete('openSource')
    if (next.status?.trim()) sp.set('status', next.status.trim())
    else sp.delete('status')
    if (next.type?.trim()) sp.set('type', next.type.trim())
    else sp.delete('type')
    const qs = sp.toString()
    router.replace(qs ? `/projects?${qs}` : '/projects')
  }

  return (
    <div className='space-y-6'>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-wrap items-center gap-2'>
          <Link
            href='/projects'
            onClick={() => {
              setFeaturedOnly(false)
              setOpenSourceOnly(false)
              setStatus('')
              setType('')
              setUrl({ q, featured: false, openSource: false, status: '', type: '' })
            }}
          >
            <Badge variant={featuredOnly || openSourceOnly || status || type ? 'secondary' : 'default'}>{labels.all}</Badge>
          </Link>

          <button
            type='button'
            onClick={() => {
              const next = !featuredOnly
              setFeaturedOnly(next)
              setUrl({ q, featured: next, openSource: openSourceOnly, status, type })
            }}
          >
            <Badge variant={featuredOnly ? 'default' : 'secondary'} className='font-normal'>
              {labels.featured}
            </Badge>
          </button>

          <button
            type='button'
            onClick={() => {
              const next = !openSourceOnly
              setOpenSourceOnly(next)
              setUrl({ q, featured: featuredOnly, openSource: next, status, type })
            }}
          >
            <Badge variant={openSourceOnly ? 'default' : 'secondary'} className='font-normal'>
              {labels.openSource}
            </Badge>
          </button>

          <button
            type='button'
            onClick={() => {
              const next = status === 'live' ? '' : 'live'
              setStatus(next)
              setUrl({ q, featured: featuredOnly, openSource: openSourceOnly, status: next, type })
            }}
          >
            <Badge variant={status === 'live' ? 'default' : 'secondary'} className='font-normal'>
              {labels.status}: {status === 'live' ? labels.statuses.live : labels.any}
            </Badge>
          </button>

          <button
            type='button'
            onClick={() => {
              const next = type === 'saas' ? '' : 'saas'
              setType(next)
              setUrl({ q, featured: featuredOnly, openSource: openSourceOnly, status, type: next })
            }}
          >
            <Badge variant={type === 'saas' ? 'default' : 'secondary'} className='font-normal'>
              {labels.type}: {type === 'saas' ? labels.types.saas : labels.any}
            </Badge>
          </button>
        </div>

        <div className='w-full sm:max-w-xs'>
          <Input
            value={q}
            onChange={(e) => {
              const next = e.target.value
              setQ(next)
              setUrl({ q: next, featured: featuredOnly, openSource: openSourceOnly, status, type })
            }}
            placeholder={labels.searchPlaceholder}
          />
        </div>
      </div>

      <ProjectCards projects={results} />
    </div>
  )
}

export default ProjectsBrowser

