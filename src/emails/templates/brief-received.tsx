import { Body, Container, Head, Html, Preview, Tailwind, Text } from 'react-email'

import GeistFont from '../components/geist-font'
import Logo from '../components/logo'

/**
 * Goes to whatever address was typed into the form, so it never repeats what was typed.
 * Echoing the message would let anyone use the form to send their own text to strangers.
 */
const COPY = {
  en: {
    subject: 'Your brief reached me',
    preview: "I'll reply within 24 hours.",
    title: 'Thanks, your brief reached me',
    body: 'I read every brief myself and will reply within 24 hours, with questions or a time for a short call. If you think of anything else, reply to this email.',
    signoff: 'Issam Seghir',
  },
  ar: {
    subject: 'وصلني موجز مشروعك',
    preview: 'سأرد خلال 24 ساعة.',
    title: 'شكرًا، وصلني موجز مشروعك',
    body: 'أقرأ كل موجز بنفسي وسأرد خلال 24 ساعة، بأسئلة أو بموعد لمكالمة قصيرة. إن تذكرت شيئًا آخر، رد على هذه الرسالة.',
    signoff: 'عصام صغير',
  },
} as const

type BriefReceivedEmailTemplateProps = {
  locale: 'en' | 'ar'
}

export function getBriefReceivedSubject(locale: 'en' | 'ar') {
  return COPY[locale].subject
}

function BriefReceivedEmailTemplate(props: BriefReceivedEmailTemplateProps) {
  const { locale } = props
  const copy = COPY[locale]
  const dir = locale === 'ar' ? 'rtl' : 'ltr'

  return (
    <Html lang={locale} dir={dir}>
      <Head>
        <GeistFont />
      </Head>
      <Preview>{copy.preview}</Preview>
      <Tailwind>
        <Body className='m-auto bg-white p-1'>
          <Container
            dir={dir}
            className='mx-auto w-full max-w-165 rounded-2xl border border-solid border-[#e5e5e5] bg-white p-8'
          >
            <Logo />
            <Text className='m-0 p-0 text-xl font-semibold text-gray-900'>{copy.title}</Text>
            <Text className='mx-0 mt-3 mb-0 p-0 text-base text-gray-700'>{copy.body}</Text>
            <Text className='mx-0 mt-6 mb-0 p-0 text-base text-gray-900'>{copy.signoff}</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

BriefReceivedEmailTemplate.PreviewProps = {
  locale: 'en',
} satisfies BriefReceivedEmailTemplateProps

export default BriefReceivedEmailTemplate
