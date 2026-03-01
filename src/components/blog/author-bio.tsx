'use client'

import { useTranslations } from 'next-intl'

import BlurImage from '@/components/blur-image'
import { Link } from '@/components/ui/link'
import { MY_NAME, SITE_GITHUB_URL, SITE_LINKEDIN_URL } from '@/lib/constants'

function AuthorBio() {
  const t = useTranslations()

  return (
    <div className='mt-12 flex items-start gap-4 rounded-2xl border bg-card p-6'>
      <BlurImage
        src='/images/avatar.png'
        className='size-14 shrink-0 rounded-full ring-2 ring-border'
        width={128}
        height={128}
        alt={`${MY_NAME}'s photo`}
      />
      <div>
        <p className='font-semibold'>{MY_NAME}</p>
        <p className='mt-1 text-sm text-muted-foreground'>
          {t('about.role')}
        </p>
        <div className='mt-3 flex gap-3 text-sm'>
          <Link href={SITE_GITHUB_URL} className='text-muted-foreground hover:text-foreground'>
            GitHub
          </Link>
          <Link href={SITE_LINKEDIN_URL} className='text-muted-foreground hover:text-foreground'>
            LinkedIn
          </Link>
          <Link href='/about' className='text-muted-foreground hover:text-foreground'>
            {t('homepage.hero.cta-about')}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AuthorBio
