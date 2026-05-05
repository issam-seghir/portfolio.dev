import * as z from 'zod'

const schema = z.object({
  q: z.string().optional(),
  featured: z.coerce.boolean().optional(),
  openSource: z.coerce.boolean().optional(),
  status: z.string().optional(),
  type: z.string().optional(),
})

function pickFirst(value: unknown): unknown {
  if (Array.isArray(value)) return value[0]
  return value
}

export function loadProjectsParams(searchParams: unknown): z.infer<typeof schema> {
  if (!searchParams || typeof searchParams !== 'object') {
    return {}
  }

  const raw = searchParams as Record<string, unknown>
  const candidate = {
    q: pickFirst(raw.q),
    featured: pickFirst(raw.featured),
    openSource: pickFirst(raw.openSource),
    status: pickFirst(raw.status),
    type: pickFirst(raw.type),
  }

  const parsed = schema.safeParse(candidate)
  return parsed.success ? parsed.data : {}
}

