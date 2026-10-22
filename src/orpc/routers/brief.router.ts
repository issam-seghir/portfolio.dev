import { ORPCError } from '@orpc/client'

import { BriefEmailTemplate, BriefReceivedEmailTemplate, getBriefReceivedSubject } from '@/emails'
import { BUDGET_LABELS, PROJECT_TYPE_LABELS } from '@/emails/templates/brief'
import { SITE_CONTACT_EMAIL } from '@/lib/constants'
import { env } from '@/lib/env'
import { briefRatelimit } from '@/lib/kv'
import { sendEmail } from '@/lib/resend'
import { getIp } from '@/utils/get-ip'

import { publicProcedure } from '../procedures'
import { SendBriefInputSchema } from '../schemas/brief.schema'
import { EmptyOutputSchema } from '../schemas/common.schema'

const sendBrief = publicProcedure
  .input(SendBriefInputSchema)
  .output(EmptyOutputSchema)
  .handler(async ({ input, context }) => {
    // A filled hidden field means a bot. Answer as if it worked so it doesn't learn anything.
    if (input.website) return

    const { success } = await briefRatelimit.limit(getIp(context.headers))
    if (!success) throw new ORPCError('TOO_MANY_REQUESTS')

    // Without email the brief would vanish, so fail loudly and let the form offer a mailto link.
    if (!env.RESEND_API_KEY) {
      throw new ORPCError('SERVICE_UNAVAILABLE', { message: 'RESEND_API_KEY is not set' })
    }

    const myInbox = env.AUTHOR_EMAIL ?? SITE_CONTACT_EMAIL

    const toMe = await sendEmail({
      to: myInbox,
      replyTo: input.email,
      subject: `Brief: ${PROJECT_TYPE_LABELS[input.type]}, ${BUDGET_LABELS[input.budget]}`,
      react: BriefEmailTemplate({
        type: input.type,
        budget: input.budget,
        email: input.email,
        message: input.message,
        locale: input.locale,
      }),
    })

    const failure = toMe ? toMe.error?.message : 'no response'
    if (failure) {
      throw new ORPCError('INTERNAL_SERVER_ERROR', { message: `Brief email failed: ${failure}` })
    }

    // The brief already reached me; a failed confirmation shouldn't show the client an error.
    const confirmation = await sendEmail({
      to: input.email,
      replyTo: myInbox,
      subject: getBriefReceivedSubject(input.locale),
      react: BriefReceivedEmailTemplate({ locale: input.locale }),
    })
    if (confirmation?.error) {
      console.warn('Brief confirmation email failed:', confirmation.error.message)
    }
  })

export const briefRouter = {
  send: sendBrief,
}
