import { useMutation } from '@tanstack/react-query'

import { orpc } from '@/orpc/client'

export function useSendBrief() {
  return useMutation(orpc.brief.send.mutationOptions())
}
