import { ORPCError } from '@orpc/client'
import { eq, sql, sum } from 'drizzle-orm'

import { posts } from '@/db/schemas'
import { isPostSlug } from '@/lib/content'

import { cache } from '../cache'
import { publicProcedure } from '../procedures'
import { ViewsStatsOutputSchema } from '../schemas/blog.schema'
import {
  CountViewInputSchema,
  CountViewOutputSchema,
  IncrementViewInputSchema,
  IncrementViewOutputSchema,
} from '../schemas/view.schema'

const countView = publicProcedure
  .input(CountViewInputSchema)
  .output(CountViewOutputSchema)
  .handler(async ({ input, context }) => {
    const cached = await cache.posts.views.get(input.slug)
    if (cached) {
      return {
        views: cached,
      }
    }

    const [post] = await context.db.select({ views: posts.views }).from(posts).where(eq(posts.slug, input.slug))

    if (!post) {
      // A post gets its row on the first view, so a real post nobody has opened yet has 0.
      if (isPostSlug(input.slug)) return { views: 0 }
      throw new ORPCError('NOT_FOUND', {
        message: 'Post not found',
      })
    }

    const { views } = post

    await cache.posts.views.set(input.slug, views)

    return {
      views,
    }
  })

const incrementView = publicProcedure
  .input(IncrementViewInputSchema)
  .output(IncrementViewOutputSchema)
  .handler(async ({ input, context }) => {
    const [result] = await context.db
      .insert(posts)
      .values({
        slug: input.slug,
        views: 1,
      })
      .onConflictDoUpdate({
        target: posts.slug,
        set: {
          views: sql`${posts.views} + 1`,
        },
      })
      .returning()

    if (!result) {
      throw new ORPCError('INTERNAL_SERVER_ERROR', {
        message: 'Failed to increment view',
      })
    }

    const { views } = result

    await cache.posts.views.set(input.slug, views)

    return {
      views,
    }
  })

const viewsStats = publicProcedure.output(ViewsStatsOutputSchema).handler(async ({ context }) => {
  const [result] = await context.db
    .select({
      value: sum(posts.views),
    })
    .from(posts)

  const views = result?.value ? Number(result.value) : 0

  return {
    views,
  }
})

export const viewRouter = {
  count: countView,
  increment: incrementView,
  stats: viewsStats,
}
