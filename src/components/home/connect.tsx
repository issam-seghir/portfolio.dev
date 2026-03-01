'use client'

import { LinkIcon } from 'lucide-react'
import { motion } from 'motion/react'
import { useTranslations } from 'next-intl'

import { Link } from '@/components/ui/link'
import { SOCIAL_LINKS } from '@/config/links'

function Connect() {
  const t = useTranslations()

  return (
    <div className='flex h-full flex-col gap-4 rounded-2xl p-4 shadow-feature-card transition-shadow hover:shadow-lg lg:p-6'>
      <div className='flex items-center gap-2'>
        <LinkIcon className='size-4.5' />
        <h2 className='text-sm'>{t('homepage.about-me.connect')}</h2>
      </div>
      <div className='flex flex-col gap-2'>
        {SOCIAL_LINKS.map((link, i) => {
          const { href, title, icon } = link

          return (
            <motion.div
              key={href}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 + 0.15, duration: 0.3 }}
            >
              <Link
                href={href}
                className='group/link flex w-full items-center gap-3 rounded-lg border bg-muted/30 px-3 py-2.5 text-muted-foreground transition-all hover:bg-muted/60 hover:text-foreground [&>svg]:size-4'
              >
                {icon}
                <span className='text-sm'>{title}</span>
                <span className='ms-auto text-xs opacity-0 transition-opacity group-hover/link:opacity-100'>
                  ↗
                </span>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default Connect
