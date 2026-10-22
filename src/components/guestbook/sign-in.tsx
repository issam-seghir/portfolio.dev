'use client'

import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { useSignInDialog } from '@/hooks/use-sign-in-dialog'

export default function SignIn() {
  const t = useTranslations()
  const { openDialog } = useSignInDialog()

  return (
    <>
      <Button onClick={openDialog}>{t('common.sign-in')}</Button>
      <span className='ms-2'>{t('guestbook.signin.description')}</span>
    </>
  )
}
