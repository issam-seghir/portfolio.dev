'use client'

import { motion } from 'motion/react'

type PageTitleProps = {
  title: string
  description: string
}

function PageHeader(props: PageTitleProps) {
  const { title, description } = props

  return (
    <div className='flex flex-col gap-2.5 pt-12 pb-16'>
      <motion.h1
        className='text-4xl font-semibold'
        initial={{ opacity: 0, filter: 'blur(10px)', y: 10 }}
        animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {title}
        <motion.div
          className='mt-2 h-1 w-12 origin-left rounded-full bg-primary rtl:origin-right'
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        />
      </motion.h1>
      <motion.h2
        className='text-muted-foreground'
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
      >
        {description}
      </motion.h2>
    </div>
  )
}

export default PageHeader
