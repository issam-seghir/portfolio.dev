import { Resend } from 'resend'

import { env } from '@/lib/env'

type SendEmailOptions = {
  subject: string
  to: string
  react: React.ReactNode
  replyTo?: string
}

/** Resend only sends from a verified domain, so production needs EMAIL_FROM on that domain. */
const DEFAULT_FROM = 'Issam Seghir <issamusma@hotmail.com>'

export async function sendEmail(options: SendEmailOptions) {
  if (!env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY is not set. Skipping email sending.')
    return
  }

  const { subject, to, react, replyTo } = options
  const resend = new Resend(env.RESEND_API_KEY)

  return resend.emails.send({
    from: env.EMAIL_FROM ?? DEFAULT_FROM,
    to,
    subject,
    react,
    replyTo,
  })
}
