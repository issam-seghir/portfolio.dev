'use client'

import { motion, useInView } from 'motion/react'
import { useTranslations } from 'next-intl'
import { useRef } from 'react'

const SKILL_CATEGORIES = [
  {
    labelKey: 'about.skills.frontend',
    skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'shadcn/ui', 'React Native', 'Expo'],
  },
  {
    labelKey: 'about.skills.backend',
    skills: ['Node.js', 'Express', 'FastAPI', 'Python', 'tRPC', 'REST APIs'],
  },
  {
    labelKey: 'about.skills.database',
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Prisma', 'Drizzle', 'Supabase', 'Firebase', 'Redis'],
  },
  {
    labelKey: 'about.skills.design',
    skills: ['Figma', 'UI/UX Design', 'Responsive Design', 'Complex Animations', 'Lighthouse 90-100'],
  },
  {
    labelKey: 'about.skills.devops',
    skills: ['Docker', 'CI/CD', 'GitHub Actions', 'Vercel', 'Netlify', 'Cloudflare', 'Linux'],
  },
  {
    labelKey: 'about.skills.testing',
    skills: ['Jest', 'Vitest', 'Postman', 'E2E Testing'],
  },
  {
    labelKey: 'about.skills.ai',
    skills: ['LLM', 'OpenAI', 'AI APIs', 'LangChain'],
  },
] as const

function SkillBadges() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const t = useTranslations()

  return (
    <div ref={ref} className='not-prose my-10 space-y-6 text-start'>
      {SKILL_CATEGORIES.map((category, catIndex) => (
        <motion.div
          key={category.labelKey}
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.4, delay: catIndex * 0.08 }}
        >
          <h4 className='mb-3 text-xs font-semibold tracking-widest text-muted-foreground uppercase'>
            {t(category.labelKey as never)}
          </h4>
          <div className='flex flex-wrap gap-2'>
            {category.skills.map((skill, skillIndex) => (
              <motion.span
                key={skill}
                className='inline-flex items-center rounded-sm border bg-secondary/60 px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:border-primary/30 hover:bg-primary/10'
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
