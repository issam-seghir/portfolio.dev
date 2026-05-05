import type { Metadata } from 'next'
import type { Locale } from 'next-intl'
import type { CollectionPage, WithContext } from 'schema-dts'

import { getTranslations, setRequestLocale } from 'next-intl/server'

import JsonLd from '@/components/json-ld'
import PageHeader from '@/components/page-header'
import ProjectsBrowser from '@/components/projects/projects-browser'
import { MY_NAME } from '@/lib/constants'
import { getLatestProjects } from '@/lib/content'
import { createMetadata } from '@/lib/metadata'
import { loadProjectsParams } from '@/lib/projects-params'
import { getBaseUrl } from '@/utils/get-base-url'
import { getLocalizedPath } from '@/utils/get-localized-path'

export async function generateMetadata(props: PageProps<'/[locale]/projects'>): Promise<Metadata> {
  const { params } = props
  const { locale } = await params

  const t = await getTranslations({ locale: locale as Locale })
  const title = t('common.labels.projects')
  const description = t('projects.description')

  return createMetadata({
    pathname: '/projects',
    title,
    description,
    locale,
  })
}

async function Page(props: PageProps<'/[locale]/projects'>) {
  const { params, searchParams } = props
  const { locale } = await params

  setRequestLocale(locale as Locale)

  const t = await getTranslations({ locale: locale as Locale })
  const title = t('common.labels.projects')
  const description = t('projects.description')
  const url = getLocalizedPath({ locale, pathname: '/projects' })

  const projects = getLatestProjects(locale)
  const parsed = loadProjectsParams(searchParams)
  const { q, featured, openSource, status, type } = parsed

  const jsonLd: WithContext<CollectionPage> = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': url,
    name: title,
    description,
    url,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: projects.map((project, index) => ({
        '@type': 'SoftwareSourceCode',
        name: project.name,
        description: project.description,
        url: `${url}/${project.slug}`,
        position: index + 1,
      })),
    },
    isPartOf: {
      '@type': 'WebSite',
      name: MY_NAME,
      url: getBaseUrl(),
    },
    inLanguage: locale,
  }

  return (
    <>
      <JsonLd json={jsonLd} />
      <PageHeader title={title} description={description} />
      <ProjectsBrowser
        projects={projects}
        initialQuery={q}
        initialFeatured={featured}
        initialOpenSource={openSource}
        initialStatus={status}
        initialType={type}
        labels={{
          all: t('projects.filters.all'),
          searchPlaceholder: t('projects.filters.search-placeholder'),
          featured: t('projects.filters.featured'),
          openSource: t('projects.filters.open-source'),
          status: t('projects.filters.status'),
          type: t('projects.filters.type'),
          any: t('projects.filters.any'),
          statuses: {
            live: t('projects.filters.statuses.live'),
            private: t('projects.filters.statuses.private'),
            archived: t('projects.filters.statuses.archived'),
            inProgress: t('projects.filters.statuses.in-progress'),
          },
          types: {
            saas: t('projects.filters.types.saas'),
            web: t('projects.filters.types.web'),
            mobile: t('projects.filters.types.mobile'),
            internal: t('projects.filters.types.internal'),
          },
        }}
      />
    </>
  )
}

export default Page
