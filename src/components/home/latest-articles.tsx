'use client'

import type { Post } from 'content-collections'

import { ArrowUpRightIcon, PencilIcon } from 'lucide-react'
import { motion, useInView } from 'motion/react'
import { useTranslations } from 'next-intl'
import { useRef } from 'react'

import BlurImage from '@/components/blur-image'
import { buttonVariants } from '@/components/ui/button'
import { Link } from '@/components/ui/link'
import { useCountLike } from '@/hooks/queries/like.query'
import { useCountView } from '@/hooks/queries/view.query'
import { useFormattedDate } from '@/hooks/use-formatted-date'
import { cn } from '@/utils/cn'

type LatestArticlesProps = {
  posts: Post[]
}

function LatestArticles(props: LatestArticlesProps) {
  const { posts } = props
  const projectsRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(projectsRef, { once: true, margin: '-100px' })
  const t = useTranslations()

  return (
    <div ref={projectsRef} className='my-24'>
      <motion.h2
        className='text-center text-2xl font-semibold sm:text-3xl'
        initial={{ y: 30, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : undefined}
        transition={{ duration: 0.3 }}
      >
        {t('homepage.latest-articles.title')}
      </motion.h2>
      <div className='mt-8 grid grid-cols-1 gap-4 sm:mt-12 md:grid-cols-2'>
        {posts.map((post, index) => (
          <Card key={post.slug} post={post} index={index} />
        ))}
      </div>
      <motion.div
        className='my-8 flex items-center justify-center'
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <Link href='/blog' className={cn(buttonVariants({ variant: 'outline' }))}>
          {t('homepage.latest-articles.more')}
        </Link>
      </motion.div>
    </div>
  )
}

type CardProps = {
  post: Post
  index: number
}

function Card(props: CardProps) {
  const { post, index } = props
  const formattedDate = useFormattedDate(post.date)
  const t = useTranslations()
  const viewsQuery = useCountView({ slug: post.slug })
  const likesQuery = useCountLike({ slug: post.slug })

  return (
    <div>
      <Link href={`/blog/${post.slug}`} className='group relative block rounded-2xl p-2 shadow-feature-card'>
          <div className='flex items-center justify-between px-3 py-3 sm:p-4'>
            <div className='flex items-center gap-2 sm:gap-3'>
              <PencilIcon className='size-4 sm:size-4.5' />
              <h2 className='text-sm sm:text-base'>{t('homepage.latest-articles.card')}</h2>
            </div>
            <ArrowUpRightIcon className='size-4 opacity-0 transition-opacity group-hover:opacity-100 sm:size-4.5' />
          </div>

          {/* Fixed aspect ratio reserves space before image decode — avoids mobile layout jump */}
          <div className='relative aspect-1200/630 w-full overflow-hidden rounded-lg bg-muted/30'>
            <BlurImage
              fill
              sizes='(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px'
              src={`/images/blog/${post.slug}/cover.png`}
              alt={post.title}
              className='rounded-lg'
              imageClassName='object-cover'
              lazy={index >= 2}
            />
          </div>

          <div className='flex flex-wrap items-center justify-between gap-1 px-3 pt-3 text-xs text-muted-foreground sm:gap-2 sm:px-2 sm:pt-4 sm:text-sm'>
            <span className='shrink-0'>{formattedDate ?? '--'}</span>
            <div className='flex min-h-5 min-w-0 flex-wrap items-center gap-2 tabular-nums'>
              {likesQuery.isLoading && <span className='text-muted-foreground/50'>…</span>}
              {likesQuery.isError && t('common.error')}
              {likesQuery.isSuccess && <span>{t('common.likes', { count: likesQuery.data.likes })}</span>}
              <span className='text-muted-foreground/40'>&middot;</span>
              {viewsQuery.isLoading && <span className='text-muted-foreground/50'>…</span>}
              {viewsQuery.isError && t('common.error')}
              {viewsQuery.isSuccess && <span>{t('common.views', { count: viewsQuery.data.views })}</span>}
            </div>
          </div>

          <div className='flex flex-col px-3 py-3 transition-transform ease-out group-hover:translate-x-0.5 sm:px-2 sm:py-4'>
            <h3 className='text-lg font-semibold sm:text-2xl'>{post.title}</h3>
            <p className='mt-1.5 text-sm text-muted-foreground sm:mt-2 sm:text-base'>{post.summary}</p>
          </div>
        </Link>
    </div>
  )
}

export default LatestArticles
