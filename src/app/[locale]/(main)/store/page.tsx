import type { Metadata } from 'next'
import type { Locale } from 'next-intl'
import type { WebPage, WithContext } from 'schema-dts'

import { getTranslations, setRequestLocale } from 'next-intl/server'

import JsonLd from '@/components/json-ld'
import PageHeader from '@/components/page-header'
import StoreClient from '@/components/store/store-client'
import { MY_NAME } from '@/lib/constants'
import { getStoreProducts } from '@/lib/content'
import { createMetadata } from '@/lib/metadata'
import { loadStoreParams } from '@/lib/store-params'
import { getBaseUrl } from '@/utils/get-base-url'
import { getLocalizedPath } from '@/utils/get-localized-path'

export async function generateMetadata(props: PageProps<'/[locale]/store'>): Promise<Metadata> {
  const { params } = props
  const { locale } = await params

  const t = await getTranslations({ locale: locale as Locale })
  const title = t('common.labels.store')
  const description = t('store.description')

  return createMetadata({
    pathname: '/store',
    title,
    description,
    locale,
  })
}

async function StorePage(props: PageProps<'/[locale]/store'>) {
  const { params, searchParams } = props
  const { locale } = await params
  const parsed = await loadStoreParams(searchParams)

  setRequestLocale(locale as Locale)

  const t = await getTranslations({ locale: locale as Locale })
  const title = t('common.labels.store')
  const description = t('store.description')
  const url = getLocalizedPath({ locale, pathname: '/store' })

  const { products, total, totalPages, page, perPage } = getStoreProducts(locale, {
    q: parsed.q,
    category: parsed.category,
    sort: parsed.sort,
    page: parsed.page,
    perPage: 9,
  })

  const jsonLd: WithContext<WebPage> = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url,
    isPartOf: {
      '@type': 'WebSite',
      name: MY_NAME,
      url: getBaseUrl(),
    },
  }

  return (
    <>
      <JsonLd json={jsonLd} />
      <PageHeader title={title} description={description} />
      <StoreClient
        products={products}
        total={total}
        totalPages={totalPages}
        page={page}
        perPage={perPage}
      />
    </>
  )
}

export default StorePage
