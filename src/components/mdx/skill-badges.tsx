'use client'

import { motion, useInView } from 'motion/react'
import { useTranslations } from 'next-intl'
import { useRef } from 'react'

import { cn } from '@/utils/cn'

const SKILL_CATEGORIES = [
  {
    labelKey: 'about.skills.frontend',
    color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS',  'Shadcn UI', 'React Native', 'Expo'],
  },
  {
    labelKey: 'about.skills.backend',
    color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    skills: ['Node.js', 'Express', 'Python', 'FastAPI', 'tRPC', 'REST APIs'],
  },
  {
    labelKey: 'about.skills.database',
    color: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20',
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Prisma', 'Drizzle', 'Supabase', 'Firebase', 'Redis'],
  },
  {
    labelKey: 'about.skills.design',
    color: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
    skills: ['Figma', 'UI/UX Design', 'Responsive Design', 'Complex Animations', 'Lighthouse 90-100'],
  },
  {
    labelKey: 'about.skills.devops',
    color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20',
    skills: ['Docker', 'CI/CD', 'GitHub Actions', 'Vercel', 'Netlify', 'Cloudflare', 'Linux'],
  },
  {
    labelKey: 'about.skills.testing',
    color: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20',
    skills: ['Jest', 'Vitest', 'Postman', 'E2E Testing'],
  },
  {
    labelKey: 'about.skills.ai',
    color: 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20',
    skills: ['LLM Integration', 'AI APIs', 'OpenAI', 'LangChain'],
  },
] as const

function SkillBadges() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const t = useTranslations()

  return (
    <div ref={ref} className='not-prose my-10 space-y-6'>
      {SKILL_CATEGORIES.map((category, catIndex) => (
        <motion.div
          key={category.labelKey}
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : undefined}
          transition={{ duration: 0.4, delay: catIndex * 0.08 }}
        >
          <h4 className='mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground'>
            {t(category.labelKey as never)}
          </h4>
          <div className='flex flex-wrap gap-2'>
            {category.skills.map((skill, skillIndex) => (
              <motion.span
                key={skill}
                className={cn(
                  'inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-transform hover:scale-105',
                  category.color,
                )}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : undefined}
                transition={{ duration: 0.3, delay: catIndex * 0.08 + skillIndex * 0.03 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default SkillBadges
