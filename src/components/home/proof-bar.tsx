import { useTranslations } from 'next-intl'

/** Client names as text until logos (and permission to use them) arrive. */
const CLIENTS = ['Awan', 'Ecomenia', 'Basmat Design', 'Compos Solution', 'Creative Book']

export default function ProofBar() {
  const t = useTranslations()
  const items = [
    { value: t('homepage.proof.items.0.value'), label: t('homepage.proof.items.0.label') },
    { value: t('homepage.proof.items.1.value'), label: t('homepage.proof.items.1.label') },
    { value: t('homepage.proof.items.2.value'), label: t('homepage.proof.items.2.label') },
    { value: t('homepage.proof.items.3.value'), label: t('homepage.proof.items.3.label') },
  ]

  return (
    <section aria-label={t('homepage.proof.label')} className='mb-24'>
      <dl className='grid grid-cols-2 border-y md:grid-cols-4'>
        {items.map((item) => (
          <div
            key={item.value}
            className='flex flex-col-reverse gap-1 py-5 pe-4 not-first:ps-4 max-md:even:border-s max-md:nth-3:ps-0 max-md:nth-[n+3]:border-t md:not-first:border-s'
          >
            <dt className='text-sm/snug text-muted-foreground'>{item.label}</dt>
            <dd className='font-heading text-3xl font-bold'>{item.value}</dd>
          </div>
        ))}
      </dl>
      <div className='mt-5 flex flex-wrap items-baseline gap-x-7 gap-y-2'>
        <span className='text-sm text-muted-foreground'>{t('homepage.proof.built-for')}</span>
        {CLIENTS.map((name) => (
          <span key={name} lang='en' className='font-heading text-lg font-semibold text-foreground/80'>
            {name}
          </span>
        ))}
      </div>
    </section>
  )
}
