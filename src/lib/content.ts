import 'server-only'

import { allPages, allPosts, allProjects, type Project } from 'content-collections'

import { STORE_PRODUCTS, type StoreCategory } from '@/config/store-products'

/** Project that is safe to expose publicly (not hidden). */
export type PublicProject = Project

function isVisible(project: Project): boolean {
  return !project.hidden
}

export type StoreSort = 'newest' | 'price-asc' | 'price-desc' | 'name'

export type GetStoreProductsParams = {
  q?: string
  category?: StoreCategory | 'all'
  sort?: StoreSort
  page?: number
  perPage?: number
}

export type GetStoreProductsResult = {
  products: typeof STORE_PRODUCTS
  total: number
  totalPages: number
  page: number
  perPage: number
}

export function getStoreProducts(
  locale: string,
  params: GetStoreProductsParams = {},
): GetStoreProductsResult {
  const { q = '', category = 'all', sort = 'newest', page = 1, perPage = 9 } = params

  let filtered = STORE_PRODUCTS.filter((p) => p.locale === locale)

  if (q.trim()) {
    const query = q.toLowerCase().trim()
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query),
    )
  }

  if (category !== 'all') {
    filtered = filtered.filter((p) => p.category === category)
  }

  const sorted = [...filtered].sort((a, b) => {
    switch (sort) {
      case 'newest': {
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
      }
      case 'price-asc': {
        return (a.price ?? Infinity) - (b.price ?? Infinity)
      }
      case 'price-desc': {
        return (b.price ?? -Infinity) - (a.price ?? -Infinity)
      }
      case 'name': {
        return a.name.localeCompare(b.name)
      }
      default: {
        return 0
      }
    }
  })

  const total = sorted.length
  const totalPages = Math.max(1, Math.ceil(total / perPage))
  const safePage = Math.max(1, Math.min(page, totalPages))
  const start = (safePage - 1) * perPage
  const products = sorted.slice(start, start + perPage)

  return {
    products,
    total,
    totalPages,
    page: safePage,
    perPage,
  }
}

export function getLatestPosts(locale: string, limit: number = allPosts.length) {
  return allPosts
    .filter((post) => post.locale === locale)
    .toSorted((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit)
}

export function getLatestProjects(locale: string, limit: number = allProjects.length) {
  return allProjects
    .filter((project) => project.locale === locale && isVisible(project))
    .toSorted((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime())
    .slice(0, limit)
}

/**
 * Find related projects for a given project, ranked by:
 *  1. Tag overlap (Jaccard-ish) – more shared tags wins
 *  2. Same `projectType`
 *  3. Recency
 */
export function getRelatedProjects(
  locale: string,
  slug: string,
  limit = 3,
): PublicProject[] {
  const current = allProjects.find((p) => p.slug === slug && p.locale === locale)
  if (!current) return []

  const currentTags = new Set((current.tags ?? []).map((t) => t.toLowerCase()))

  const scored = allProjects
    .filter((p) => p.locale === locale && p.slug !== slug && isVisible(p))
    .map((p) => {
      const tags = new Set((p.tags ?? []).map((t) => t.toLowerCase()))
      let overlap = 0
      for (const tag of tags) if (currentTags.has(tag)) overlap += 1
      const sameType = current.projectType && p.projectType === current.projectType ? 1 : 0
      const recency = new Date(p.dateCreated).getTime()
      return { project: p, overlap, sameType, recency }
    })
    .toSorted((a, b) => {
      if (b.overlap !== a.overlap) return b.overlap - a.overlap
      if (b.sameType !== a.sameType) return b.sameType - a.sameType
      return b.recency - a.recency
    })

  return scored.slice(0, limit).map((s) => s.project)
}

/** Featured on the home page; full catalog lives at `/projects`. */
export const HOMEPAGE_SELECTED_PROJECTS_LIMIT = 4

export function getSelectedProjects(locale: string, limit?: number) {
  function getRank(p: (typeof allProjects)[number]) {
    // Lower rank = higher priority; unranked items come last.
    return p.featuredRank ?? Number.POSITIVE_INFINITY
  }

  const sorted = allProjects
    .filter((project) => project.selected && project.locale === locale && isVisible(project))
    .toSorted((a, b) => {
      const rankDiff = getRank(a) - getRank(b)
      if (rankDiff !== 0) return rankDiff
      return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
    })

  return limit === undefined ? sorted : sorted.slice(0, limit)
}

export function getPostBySlug(locale: string, slug: string) {
  return allPosts.find((p) => p.slug === slug && p.locale === locale)
}

export function getProjectBySlug(locale: string, slug: string) {
  return allProjects.find((p) => p.slug === slug && p.locale === locale && isVisible(p))
}

export function getPageBySlug(locale: string, slug: string) {
  return allPages.find((p) => p.slug === slug && p.locale === locale)
}
