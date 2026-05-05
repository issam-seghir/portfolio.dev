import type { Metadata } from 'next'
import type { Locale } from 'next-intl'
import type { SoftwareSourceCode, WithContext } from 'schema-dts'

import { allProjects } from 'content-collections'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { use } from 'react'

import BlurImage from '@/components/blur-image'
import JsonLd from '@/components/json-ld'
import Mdx from '@/components/mdx'
import ProjectCTA from '@/components/project-cta'
import ProjectHeader from '@/components/project-header'
import ProjectNavigation from '@/components/project-navigation'
import BackToTop from '@/components/projects/back-to-top'
import MobileProjectTableOfContents from '@/components/projects/mobile-table-of-contents'
import ProjectGallery from '@/components/projects/project-gallery'
import ReadingProgress from '@/components/projects/reading-progress'
import RelatedProjects from '@/components/projects/related-projects'
import SectionChips from '@/components/projects/section-chips'
import ProjectTableOfContents from '@/components/projects/table-of-contents'
import { MY_NAME } from '@/lib/constants'
import { getLatestProjects, getProjectBySlug, getRelatedProjects } from '@/lib/content'
import { createMetadata } from '@/lib/metadata'
import { getBaseUrl } from '@/utils/get-base-url'
import { getLocalizedPath } from '@/utils/get-localized-path'

// Pure content pages — render fully at build time.
export const dynamic = 'force-static'
export const dynamicParams = false

export function generateStaticParams(): Array<{ slug: string; locale: string }> {
  return allProjects
    .filter((project) => !project.hidden)
    .map((project) => ({
      slug: project.slug,
      locale: project.locale,
    }))
}

export async function generateMetadata(props: PageProps<'/[locale]/projects/[slug]'>): Promise<Metadata> {
  const { params } = props
  const { slug, locale } = await params

  const project = getProjectBySlug(locale, slug)

  if (!project) {
    return {}
  }

  const { name, description } = project

  return createMetadata({
    pathname: `/projects/${slug}`,
    title: name,
    description,
    locale,
  })
}

function Page(props: PageProps<'/[locale]/projects/[slug]'>) {
  const { params } = props
  const { slug, locale } = use(params)

  setRequestLocale(locale as Locale)

  const project = getProjectBySlug(locale, slug)
  const url = getLocalizedPath({ locale, pathname: `/projects/${slug}` })

  if (!project) {
    notFound()
  }

  const { name, code, description, github, dateCreated, gallery, videoUrl, heroVideoUrl } = project
  const baseUrl = getBaseUrl()

  const jsonLd: WithContext<SoftwareSourceCode> = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name,
    description,
    url,
    ...(github && { codeRepository: github }),
    license: 'https://opensource.org/licenses/MIT',
    programmingLanguage: 'TypeScript',
    dateCreated,
    author: {
      '@type': 'Person',
      name: MY_NAME,
      url: baseUrl,
    },
    thumbnailUrl: `${baseUrl}/images/projects/${slug}/cover.webp`,
    inLanguage: locale,
  }

  const allProjectsForLocale = getLatestProjects(locale)
  const currentIndex = allProjectsForLocale.findIndex((p) => p.slug === slug)
  const prevProject = currentIndex > 0 ? allProjectsForLocale[currentIndex - 1] : undefined
  const nextProject =
    currentIndex < allProjectsForLocale.length - 1 ? allProjectsForLocale[currentIndex + 1] : undefined

  const related = getRelatedProjects(locale, slug, 3)

  return (
    <>
      <JsonLd json={jsonLd} />
      <ReadingProgress />
      <div className='mx-auto max-w-5xl'>
        <div className='grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]'>
          <div className='min-w-0'>
            <ProjectHeader {...project} />
            <SectionChips toc={project.toc} />
            <div className='relative my-12 overflow-hidden rounded-lg border bg-muted'>
              {heroVideoUrl ? (
                <div className='aspect-40/21 w-full'>
                  <video
                    src={heroVideoUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload='metadata'
                    className='size-full object-cover'
                  />
                </div>
              ) : (
                <div className='relative aspect-40/21 w-full'>
                  <BlurImage
                    fill
                    src={`/images/projects/${slug}/cover.webp`}
                    alt={name}
                    className='absolute inset-0 size-full rounded-lg'
                    imageClassName='object-cover object-center'
                    sizes='(max-width: 1024px) 100vw, 48rem'
                    lazy={false}
                  />
                </div>
              )}
            </div>
            <Mdx code={code} />
            <ProjectGallery slug={slug} gallery={gallery} videoUrl={videoUrl} />
            <ProjectCTA />
            <RelatedProjects projects={related} />
            <ProjectNavigation prev={prevProject} next={nextProject} />
          </div>
          <aside className='min-w-0'>
            <div className='sticky top-24'>
              <ProjectTableOfContents toc={project.toc} />
            </div>
          </aside>
        </div>
        <MobileProjectTableOfContents toc={project.toc} />
        <BackToTop />
      </div>
    </>
  )
}

export default Page
