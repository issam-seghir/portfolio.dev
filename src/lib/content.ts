import 'server-only'

import { allPages, allPosts, allProjects } from 'content-collections'

import { STORE_PRODUCTS, type StoreCategory } from '@/config/store-products'

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
      case 'newest':
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
      case 'price-asc':
        return (a.price ?? Infinity) - (b.price ?? Infinity)
      case 'price-desc':
        return (b.price ?? -Infinity) - (a.price ?? -Infinity)
      case 'name':
        return a.name.localeCompare(b.name)
      default:
        return 0
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
    .filter((project) => project.locale === locale && !project.hidden)
    .toSorted((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime())
    .slice(0, limit)
}

/** Featured on the home page; full catalog lives at `/projects`. */
export const HOMEPAGE_SELECTED_PROJECTS_LIMIT = 4

export function getSelectedProjects(locale: string, limit?: number) {
  function getRank(p: (typeof allProjects)[number]) {
    // Lower rank = higher priority; unranked items come last.
    return p.featuredRank ?? Number.POSITIVE_INFINITY
  }

  const sorted = allProjects
    .filter((project) => project.selected && project.locale === locale && !project.hidden)
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
  return allProjects.find((p) => p.slug === slug && p.locale === locale && !p.hidden)
}

export function getPageBySlug(locale: string, slug: string) {
  return allPages.find((p) => p.slug === slug && p.locale === locale)
}
