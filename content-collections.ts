import type { Context, Meta } from '@content-collections/core'

import { existsSync } from 'node:fs'
import path from 'node:path'

import { defineCollection, defineConfig } from '@content-collections/core'
import { compileMDX } from '@content-collections/mdx'
import * as z from 'zod'

import { getTOC, rehypePlugins, remarkPlugins } from '@/mdx-plugins'

type BaseDoc = {
  _meta: Meta
  content: string
}

function getReadingTime(content: string): number {
  const words = content
    .replaceAll(/<[^<>]*>/g, '')
    .split(/\s+/)
    .filter(Boolean).length
  return Math.max(1, Math.ceil(words / 230))
}

async function transform<D extends BaseDoc>(document: D, context: Context) {
  const code = await compileMDX(context, document, {
    remarkPlugins,
    rehypePlugins,
  })
  const [locale, fileName] = document._meta.path.split(/[/\\]/)

  if (!locale || !fileName) {
    throw new Error(`Invalid path: ${document._meta.path}`)
  }

  return {
    ...document,
    code,
    locale,
    slug: fileName,
    toc: await getTOC(document.content),
    readingTime: getReadingTime(document.content),
  }
}

const posts = defineCollection({
  name: 'Post',
  directory: 'src/content/blog',
  include: '**/*.mdx',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    modifiedTime: z.string(),
    summary: z.string(),
    content: z.string(),
  }),
  transform: async (document, context) => {
    const post = await transform(document, context)
    // Several posts have no cover; cards show a branded placeholder instead of a broken image.
    const cover = `/images/blog/${post.slug}/cover.png`
    return { ...post, cover: existsSync(path.join(process.cwd(), 'public', cover)) ? cover : null }
  },
})

const projects = defineCollection({
  name: 'Project',
  directory: 'src/content/projects',
  include: '**/*.mdx',
  schema: z.object({
    name: z.string(),
    description: z.string(),
    homepage: z.string().optional(),
    github: z.string().optional(),
    openSource: z.boolean().optional().default(false),
    hidden: z.boolean().optional().default(false),
    techstack: z.array(z.string()),
    selected: z.boolean().optional().default(false),
    /** Paid client work, or a demo / clone built to practise. */
    kind: z.enum(['client', 'experiment']).optional().default('client'),
    featuredRank: z.number().int().min(1).optional(),
    company: z.string().optional(),
    role: z.string().optional(),
    projectType: z.enum(['SaaS', 'Web', 'Mobile', 'Internal', 'Landing', 'Open-source', 'Other']).optional(),
    status: z.enum(['Live', 'Private', 'Archived', 'In progress']).optional(),
    tags: z.array(z.string()).optional(),
    outcomes: z.array(z.string()).optional(),
    year: z.string().optional(),
    duration: z.string().optional(),
    team: z.string().optional(),
    kpis: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
        }),
      )
      .optional(),
    gallery: z
      .array(
        z.union([
          z.string(),
          z.object({
            src: z.string(),
            alt: z.string().optional(),
            caption: z.string().optional(),
          }),
        ]),
      )
      .optional(),
    heroVideoUrl: z.string().optional(),
    heroLottie: z
      .object({
        src: z.string(),
      })
      .optional(),
    videoUrl: z.string().optional(),
    dateCreated: z.string(),
    content: z.string(),
  }),
  transform,
})

const pages = defineCollection({
  name: 'Page',
  directory: 'src/content/pages',
  include: '**/*.mdx',
  schema: z.object({
    content: z.string(),
  }),
  transform,
})

export default defineConfig({
  content: [posts, projects, pages],
})
