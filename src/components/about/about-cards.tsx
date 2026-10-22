import { useTranslations } from 'next-intl'

import CodingDnaCard from '@/components/home/coding-dna-card'
import FunFactsCard from '@/components/home/fun-facts-card'
import LocationCard from '@/components/home/location-card'
import StacksCard from '@/components/home/stacks-card'

/** The personal cards that used to sit on the home page; they belong with the rest of the About story. */
export default function AboutCards() {
  const t = useTranslations()

  return (
    <section className='my-16'>
      <h2 className='font-heading text-3xl font-semibold'>{t('homepage.about-me.cards-title')}</h2>
      <div className='mt-8 grid gap-4'>
        <LocationCard />
        <div className='grid gap-4 md:grid-cols-2'>
          <div className='min-w-0'>
            <CodingDnaCard />
          </div>
          <div className='min-w-0'>
            <FunFactsCard />
          </div>
        </div>
        <StacksCard />
      </div>
    </section>
  )
}
