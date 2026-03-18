'use client'

import { MoonIcon, SunIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { useCallback, useRef } from 'react'

import { Button } from '@/components/ui/button'

function playThemeClickSound() {
  if (typeof window === 'undefined') return
  const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!Ctx) return
  try {
    const ctx = new Ctx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.frequency.value = 520
    osc.type = 'sine'
    gain.gain.setValueAtTime(0.08, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.06)
  } catch {
    // ignore if audio fails (e.g. autoplay policy)
  }
}

function ThemeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme()
  const t = useTranslations()
  const audioContextRef = useRef<boolean>(false)

  const handleToggle = useCallback(() => {
    const next = resolvedTheme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    if (!audioContextRef.current) {
      audioContextRef.current = true
    }
    playThemeClickSound()
  }, [resolvedTheme, setTheme])

  const isDark = (resolvedTheme ?? 'light') === 'dark'
  const label = isDark ? t('theme-toggle.options.light') : t('theme-toggle.options.dark')

  return (
    <Button
      variant='ghost'
      className='size-9 p-0'
      aria-label={t('theme-toggle.toggle-theme')}
      data-testid='theme-toggle'
      onClick={handleToggle}
    >
      <SunIcon className='size-[1.15rem] transition-all dark:hidden dark:scale-0' />
      <MoonIcon className='hidden size-[1.15rem] dark:block dark:scale-100' />
      <span className='sr-only'>{label}</span>
    </Button>
  )
}

export default ThemeSwitcher
