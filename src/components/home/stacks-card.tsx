'use client'

import {
  SiCss,
  SiDrizzle,
  SiExpress,
  SiFigma,
  SiFirebase,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from '@icons-pack/react-simple-icons'
import { ZapIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

const SKILL_CATEGORIES = [
  {
    labelKey: 'homepage.about-me.stacks-frontend' as const,
    skills: [
      { name: 'React', icon: SiReact },
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'Tailwind', icon: SiTailwindcss },
      { name: 'JavaScript', icon: SiJavascript },
      { name: 'HTML/CSS', icon: SiHtml5 },
    ],
  },
  {
    labelKey: 'homepage.about-me.stacks-backend' as const,
    skills: [
      { name: 'Node.js', icon: SiNodedotjs },
      { name: 'Express', icon: SiExpress },
      { name: 'PostgreSQL', icon: SiPostgresql },
      { name: 'Prisma', icon: SiPrisma },
      { name: 'Drizzle', icon: SiDrizzle },
      { name: 'MongoDB', icon: SiMongodb },
    ],
  },
  {
    labelKey: 'homepage.about-me.stacks-tools' as const,
    skills: [
      { name: 'Git', icon: SiGit },
      { name: 'Figma', icon: SiFigma },
      { name: 'Firebase', icon: SiFirebase },
      { name: 'CSS', icon: SiCss },
      { name: 'React Native', icon: SiReact },
    ],
  },
]

function StacksCard() {
  const t = useTranslations()

  return (
    <div className='flex flex-col gap-4 overflow-hidden rounded-2xl p-4 shadow-feature-card lg:p-6'>
      <div className='flex items-center gap-2'>
        <ZapIcon className='size-4.5' />
        <h2 className='text-sm'>{t('homepage.about-me.stacks')}</h2>
      </div>
      <div className='space-y-4'>
        {SKILL_CATEGORIES.map((category) => (
          <div key={category.labelKey}>
            <p className='mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider'>
              {t(category.labelKey)}
            </p>
            <div className='flex flex-wrap gap-2'>
              {category.skills.map((skill) => (
                <div
                  key={skill.name}
                  className='flex items-center gap-1.5 rounded-full border bg-muted/50 px-2.5 py-1 text-xs'
                >
                  <skill.icon className='size-3' />
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StacksCard
