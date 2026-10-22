'use client'

import type { BudgetRange, ProjectType } from '@/orpc/schemas/brief.schema'

import { ORPCError } from '@orpc/client'
import { useForm, useSelector } from '@tanstack/react-form'
import { CheckIcon } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { useId } from 'react'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { Textarea } from '@/components/ui/textarea'
import { useSendBrief } from '@/hooks/queries/brief.query'
import { SITE_CONTACT_EMAIL } from '@/lib/constants'
import { BRIEF_MESSAGE_MAX, BRIEF_MESSAGE_MIN, BUDGET_RANGES, PROJECT_TYPES } from '@/orpc/schemas/brief.schema'
import { cn } from '@/utils/cn'

type ChoiceGroupProps = {
  name: string
  legend: string
  options: Array<{ value: string; label: string }>
  value: string
  onChange: (value: string) => void
  onBlur: () => void
  error?: string
  disabled?: boolean
}

/** Native radios styled as chips: arrow keys, form semantics and screen readers work without extra code. */
function ChoiceGroup(props: ChoiceGroupProps) {
  const { name, legend, options, value, onChange, onBlur, error, disabled } = props
  const errorId = useId()

  return (
    <fieldset aria-describedby={error ? errorId : undefined} disabled={disabled}>
      <legend className='mb-2.5 text-sm font-medium'>{legend}</legend>
      <div className='flex flex-wrap gap-2'>
        {options.map((option) => (
          <label
            key={option.value}
            className={cn(
              'inline-flex min-h-10 cursor-pointer items-center gap-1.5 rounded-full border px-3.5 text-sm transition-colors select-none',
              'hover:border-foreground/40 has-focus-visible:ring-[3px] has-focus-visible:ring-ring/50',
              'has-checked:border-primary has-checked:bg-primary has-checked:text-primary-foreground',
              'has-disabled:cursor-not-allowed has-disabled:opacity-60',
              error && 'border-destructive/60',
            )}
          >
            <input
              type='radio'
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => {
                onChange(option.value)
              }}
              onBlur={onBlur}
              className='sr-only'
            />
            {value === option.value && <CheckIcon aria-hidden='true' className='size-3.5' />}
            {option.label}
          </label>
        ))}
      </div>
      {error && (
        <p id={errorId} className='mt-2 text-sm text-destructive'>
          {error}
        </p>
      )}
    </fieldset>
  )
}

function firstError(errors: unknown[]) {
  const first = errors[0]
  if (typeof first === 'string') return first
  if (first && typeof first === 'object' && 'message' in first && typeof first.message === 'string') {
    return first.message
  }
  return undefined
}

export default function BriefForm() {
  const t = useTranslations('homepage.brief')
  const locale = useLocale()
  const { mutate: sendBrief, isPending, isSuccess, error, reset: resetMutation } = useSendBrief()

  // Literal keys so `pnpm check:i18n` can see them.
  const typeOptions: Array<{ value: ProjectType; label: string }> = [
    { value: 'saas', label: t('types.saas') },
    { value: 'ecommerce', label: t('types.ecommerce') },
    { value: 'mobile', label: t('types.mobile') },
    { value: 'website', label: t('types.website') },
    { value: 'other', label: t('types.other') },
  ]
  const budgetOptions: Array<{ value: BudgetRange; label: string }> = [
    { value: 'under-3k', label: t('budgets.under-3k') },
    { value: '3k-10k', label: t('budgets.3k-10k') },
    { value: '10k-25k', label: t('budgets.10k-25k') },
    { value: '25k-plus', label: t('budgets.25k-plus') },
    { value: 'unsure', label: t('budgets.unsure') },
  ]

  const schema = z.object({
    type: z.string().refine((v) => (PROJECT_TYPES as readonly string[]).includes(v), { error: t('errors.type') }),
    budget: z.string().refine((v) => (BUDGET_RANGES as readonly string[]).includes(v), { error: t('errors.budget') }),
    email: z.email({ error: t('errors.email') }),
    message: z
      .string()
      .trim()
      .min(BRIEF_MESSAGE_MIN, { error: t('errors.message') })
      .max(BRIEF_MESSAGE_MAX),
    website: z.string(),
  })

  const form = useForm({
    defaultValues: { type: '', budget: '', email: '', message: '', website: '' },
    // Quiet until the first submit, then errors clear as each field is fixed.
    validators: { onSubmit: schema, onChange: schema },
    onSubmit: ({ value }) => {
      sendBrief({
        type: value.type as ProjectType,
        budget: value.budget as BudgetRange,
        email: value.email.trim(),
        message: value.message.trim(),
        locale: locale === 'ar' ? 'ar' : 'en',
        website: value.website || undefined,
      })
    },
  })

  const submitted = useSelector(form.store, (state) => state.submissionAttempts > 0)
  const values = useSelector(form.store, (state) => state.values)

  if (isSuccess) {
    return (
      <div role='status' className='grid content-start gap-3 py-2'>
        <span className='inline-flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground'>
          <CheckIcon aria-hidden='true' className='size-5' />
        </span>
        <p className='font-heading text-2xl font-semibold'>{t('sent-title')}</p>
        <p className='text-pretty text-muted-foreground'>{t('sent-body')}</p>
        <Button
          type='button'
          variant='outline'
          className='mt-2 w-fit'
          onClick={() => {
            form.reset()
            resetMutation()
          }}
        >
          {t('send-another')}
        </Button>
      </div>
    )
  }

  const isRateLimited = error instanceof ORPCError && error.code === 'TOO_MANY_REQUESTS'
  const mailto = `mailto:${SITE_CONTACT_EMAIL}?${new URLSearchParams({
    subject: t('mailto-subject'),
    body: [
      typeOptions.find((o) => o.value === values.type)?.label,
      budgetOptions.find((o) => o.value === values.budget)?.label,
      values.message,
    ]
      .filter(Boolean)
      .join('\n\n'),
  })
    .toString()
    .replaceAll('+', '%20')}`

  async function submitAndFocusFirstError(formElement: HTMLFormElement) {
    await form.handleSubmit()
    // Take keyboard and screen reader users straight to the first thing to fix.
    if (!form.state.isValid) {
      formElement
        .querySelector<HTMLElement>(':scope fieldset[aria-describedby] input, :scope [aria-invalid="true"]')
        ?.focus()
    }
  }

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isPending) return
    void submitAndFocusFirstError(event.currentTarget)
  }

  return (
    <form onSubmit={handleSubmit} noValidate className='grid gap-6'>
      <form.Field name='type'>
        {(field) => (
          <ChoiceGroup
            name={field.name}
            legend={t('type-label')}
            options={typeOptions}
            value={field.state.value}
            onChange={field.handleChange}
            onBlur={field.handleBlur}
            error={submitted ? firstError(field.state.meta.errors) : undefined}
            disabled={isPending}
          />
        )}
      </form.Field>

      <form.Field name='budget'>
        {(field) => (
          <ChoiceGroup
            name={field.name}
            legend={t('budget-label')}
            options={budgetOptions}
            value={field.state.value}
            onChange={field.handleChange}
            onBlur={field.handleBlur}
            error={submitted ? firstError(field.state.meta.errors) : undefined}
            disabled={isPending}
          />
        )}
      </form.Field>

      <form.Field name='email'>
        {(field) => {
          const fieldError = submitted ? firstError(field.state.meta.errors) : undefined
          return (
            <div className='grid gap-2'>
              <label htmlFor='brief-email' className='text-sm font-medium'>
                {t('email-label')}
              </label>
              <Input
                id='brief-email'
                type='email'
                name={field.name}
                autoComplete='email'
                inputMode='email'
                dir='ltr'
                className='h-11'
                value={field.state.value}
                onChange={(e) => {
                  field.handleChange(e.target.value)
                }}
                onBlur={field.handleBlur}
                aria-invalid={Boolean(fieldError)}
                aria-describedby={fieldError ? 'brief-email-error' : undefined}
                disabled={isPending}
              />
              {fieldError && (
                <p id='brief-email-error' className='text-sm text-destructive'>
                  {fieldError}
                </p>
              )}
            </div>
          )
        }}
      </form.Field>

      <form.Field name='message'>
        {(field) => {
          const fieldError = submitted ? firstError(field.state.meta.errors) : undefined
          return (
            <div className='grid gap-2'>
              <label htmlFor='brief-message' className='text-sm font-medium'>
                {t('message-label')}
              </label>
              <Textarea
                id='brief-message'
                name={field.name}
                rows={4}
                maxLength={BRIEF_MESSAGE_MAX}
                dir={field.state.value ? 'auto' : undefined}
                className='min-h-28'
                placeholder={t('message-placeholder')}
                value={field.state.value}
                onChange={(e) => {
                  field.handleChange(e.target.value)
                }}
                onBlur={field.handleBlur}
                aria-invalid={Boolean(fieldError)}
                aria-describedby={fieldError ? 'brief-message-error' : undefined}
                disabled={isPending}
              />
              {fieldError && (
                <p id='brief-message-error' className='text-sm text-destructive'>
                  {fieldError}
                </p>
              )}
            </div>
          )
        }}
      </form.Field>

      {/* Hidden from people and screen readers; only bots fill it in. */}
      <form.Field name='website'>
        {(field) => (
          <div aria-hidden='true' className='absolute inset-s-[-9999px] size-px overflow-hidden'>
            <label htmlFor='brief-website'>{t('honeypot-label')}</label>
            <input
              id='brief-website'
              name={field.name}
              type='text'
              tabIndex={-1}
              autoComplete='off'
              value={field.state.value}
              onChange={(e) => {
                field.handleChange(e.target.value)
              }}
            />
          </div>
        )}
      </form.Field>

      {error && (
        <div role='alert' className='grid gap-2 rounded-xl border border-destructive/40 p-4 text-sm'>
          <p>{isRateLimited ? t('errors.rate-limited') : t('errors.failed')}</p>
          <a href={mailto} className='w-fit font-medium text-primary underline underline-offset-4'>
            {t('errors.email-instead')}
          </a>
        </div>
      )}

      <Button type='submit' size='lg' className='min-h-11 w-full sm:w-fit' disabled={isPending}>
        {isPending && <Spinner />}
        {isPending ? t('sending') : t('submit')}
      </Button>
    </form>
  )
}
