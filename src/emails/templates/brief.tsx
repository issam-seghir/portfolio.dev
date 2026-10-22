import type { BudgetRange, ProjectType } from '@/orpc/schemas/brief.schema'

import { Body, Button, Container, Head, Html, Preview, Section, Tailwind, Text } from 'react-email'

import GeistFont from '../components/geist-font'
import Logo from '../components/logo'

/** The emails are written in English for me, whatever language the client used. */
export const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
  saas: 'SaaS product',
  ecommerce: 'E-commerce',
  mobile: 'Mobile app',
  website: 'Website',
  other: 'Something else',
}

export const BUDGET_LABELS: Record<BudgetRange, string> = {
  'under-3k': 'Under $3k',
  '3k-10k': '$3k to $10k',
  '10k-25k': '$10k to $25k',
  '25k-plus': '$25k+',
  unsure: 'Not sure yet',
}

type BriefEmailTemplateProps = {
  type: ProjectType
  budget: BudgetRange
  email: string
  message: string
  locale: 'en' | 'ar'
}

function BriefEmailTemplate(props: BriefEmailTemplateProps) {
  const { type, budget, email, message, locale } = props
  const rows = [
    ['Project', PROJECT_TYPE_LABELS[type]],
    ['Budget', BUDGET_LABELS[budget]],
    ['Email', email],
    ['Site language', locale === 'ar' ? 'Arabic' : 'English'],
  ]

  return (
    <Html>
      <Head>
        <GeistFont />
      </Head>
      <Preview>
        New brief: {PROJECT_TYPE_LABELS[type]}, {BUDGET_LABELS[budget]}
      </Preview>
      <Tailwind>
        <Body className='m-auto bg-white p-1'>
          <Container className='mx-auto w-full max-w-165 rounded-2xl border border-solid border-[#e5e5e5] bg-white p-8'>
            <Logo />
            <Text className='m-0 p-0 text-xl font-semibold text-gray-900'>New project brief</Text>
            <Section className='mt-6'>
              {rows.map(([label, value]) => (
                <Text key={label} className='m-0 py-1 text-base text-gray-700'>
                  <span className='text-gray-500'>{label}: </span>
                  {value}
                </Text>
              ))}
            </Section>
            <Section className='mt-6 rounded-xl border border-solid border-[#e5e5e5] bg-gray-50 p-6'>
              <Text className='m-0 p-0 text-base whitespace-pre-wrap text-gray-900' dir='auto'>
                {message}
              </Text>
            </Section>
            <Button
              className='mt-6 rounded-4xl bg-gray-900 px-8 py-2.5 align-middle text-sm font-medium text-white'
              href={`mailto:${email}`}
            >
              Reply
            </Button>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

BriefEmailTemplate.PreviewProps = {
  type: 'saas',
  budget: '3k-10k',
  email: 'founder@example.com',
  message: 'A booking app for clinics in Riyadh, Arabic first. We want to launch in March.',
  locale: 'ar',
} satisfies BriefEmailTemplateProps

export default BriefEmailTemplate
