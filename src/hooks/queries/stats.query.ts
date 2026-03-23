import { useQuery } from '@tanstack/react-query'

import { orpc } from '@/orpc/client'

export function useLikeStats() {
  return useQuery(orpc.like.stats.queryOptions())
}

export function useViewStats() {
  return useQuery(orpc.view.stats.queryOptions())
}
