import * as z from 'zod'

export const PROJECT_TYPES = ['saas', 'ecommerce', 'mobile', 'website', 'other'] as const
export const BUDGET_RANGES = ['under-3k', '3k-10k', '10k-25k', '25k-plus', 'unsure'] as const

export type ProjectType = (typeof PROJECT_TYPES)[number]
export type BudgetRange = (typeof BUDGET_RANGES)[number]

export const BRIEF_MESSAGE_MIN = 10
export const BRIEF_MESSAGE_MAX = 2000

export const SendBriefInputSchema = z.object({
  type: z.enum(PROJECT_TYPES),
  budget: z.enum(BUDGET_RANGES),
  email: z.email().max(254),
  message: z.string().trim().min(BRIEF_MESSAGE_MIN).max(BRIEF_MESSAGE_MAX),
  locale: z.enum(['en', 'ar']),
  /** Hidden field people never see. Bots that fill every input give themselves away here. */
  website: z.string().max(200).optional(),
})
