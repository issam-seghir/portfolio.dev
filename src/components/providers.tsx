'use client'

import { Provider as JotaiProvider } from 'jotai'
import { MotionConfig } from 'motion/react'
import { ThemeProvider } from 'next-themes'

import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'

import QueryProvider from './query-provider'

type ProvidesProps = {
  children: React.ReactNode
}

function Providers(props: ProvidesProps) {
  const { children } = props

  return (
    <JotaiProvider>
      <QueryProvider>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem={false}
          storageKey='theme'
          disableTransitionOnChange
        >
          <TooltipProvider>
            <MotionConfig reducedMotion='user'>{children}</MotionConfig>
            <Toaster
              toastOptions={{
                duration: 2500,
              }}
              visibleToasts={5}
              expand
            />
          </TooltipProvider>
        </ThemeProvider>
      </QueryProvider>
    </JotaiProvider>
  )
}

export default Providers
