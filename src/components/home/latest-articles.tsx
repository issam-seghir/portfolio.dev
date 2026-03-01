'use client'

import type { Post } from 'content-collections'

import { ArrowUpRightIcon, PencilIcon } from 'lucide-react'
import { motion, useInView } from 'motion/react'
import { useTranslations } from 'next-intl'
import { useRef } from 'react'

import BlurImage from '@/components/blur-image'
import { TiltCard } from '@/components/tilt-card'
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
        className='text-center text-3xl font-semibold'
        initial={{ y: 30, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : undefined}
        transition={{ duration: 0.3 }}
      >
        {t('homepage.latest-articles.title')}
      </motion.h2>
      <div className='mt-12 grid gap-4 md:grid-cols-2'>
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
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const viewsQuery = useCountView({ slug: post.slug })
  const likesQuery = useCountLike({ slug: post.slug })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.5, delay: index * 0.12, type: 'spring', stiffness: 100, damping: 20 }}
    >
      <TiltCard tiltAmount={3}>
        <Link href={`/blog/${post.slug}`} className='group relative block rounded-2xl p-2 shadow-feature-card'>
          <div className='flex items-center justify-between p-4'>
            <div className='flex items-center gap-3'>
              <PencilIcon className='size-4.5' />
              <h2>{t('homepage.latest-articles.card')}</h2>
            </div>
            <ArrowUpRightIcon className='size-4.5 opacity-0 transition-opacity group-hover:opacity-100' />
          </div>
          <BlurImage
            width={1200}
            height={630}
            src={`/images/blog/${post.slug}/cover.png`}
            alt={post.title}
            className='rounded-lg'
          />
          <div className='flex items-center justify-between gap-2 px-2 pt-4 text-sm text-muted-foreground'>
            {formattedDate ?? '--'}
            <div className='flex gap-2'>
              {likesQuery.isLoading && '--'}
              {likesQuery.isError && t('common.error')}
              {likesQuery.isSuccess && <div>{t('common.likes', { count: likesQuery.data.likes })}</div>}
              <div>&middot;</div>
              {viewsQuery.isLoading && '--'}
              {viewsQuery.isError && t('common.error')}
              {viewsQuery.isSuccess && <div>{t('common.views', { count: viewsQuery.data.views })}</div>}
            </div>
          </div>
          <div className='flex flex-col px-2 py-4 transition-transform ease-out group-hover:translate-x-0.5'>
            <h3 className='text-2xl font-semibold'>{post.title}</h3>
            <p className='mt-2 text-muted-foreground'>{post.summary}</p>
          </div>
        </Link>
      </TiltCard>
    </motion.div>
  )
}

export default LatestArticles
