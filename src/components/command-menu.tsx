'use client'

import { CommandIcon, HomeIcon, LinkIcon, LogInIcon, LogOutIcon, UserCircleIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Fragment, useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { COMMAND_MENU_SOCIAL_LINKS, HEADER_LINKS } from '@/config/links'
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'
import { useSignInDialog } from '@/hooks/use-sign-in-dialog'
import { useSignOut } from '@/hooks/use-sign-out'
import { useRouter } from '@/i18n/routing'
import { useSession } from '@/lib/auth-client'

type CommandAction = {
  title: string
  icon: React.ReactNode
  onSelect: () => void | Promise<void>
}

type CommandGroup = {
  name: string
  actions: CommandAction[]
}

function playCommandOpenSound() {
  if (typeof window === 'undefined') return
  const Ctx =
    window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!Ctx) return
  try {
    const ctx = new Ctx()
    const osc1 = ctx.createOscillator()
    const osc2 = ctx.createOscillator()
    const gain = ctx.createGain()
    osc1.connect(gain)
    osc2.connect(gain)
    gain.connect(ctx.destination)
    osc1.frequency.value = 440
    osc2.frequency.value = 554.37
    osc1.type = 'sine'
    osc2.type = 'sine'
    gain.gain.setValueAtTime(0.06, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12)
    osc1.start(ctx.currentTime)
    osc2.start(ctx.currentTime)
    osc1.stop(ctx.currentTime + 0.12)
    osc2.stop(ctx.currentTime + 0.12)
  } catch {
    // ignore if audio fails (e.g. autoplay policy)
  }
}

function CommandMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [copy] = useCopyToClipboard()
  const { data: session } = useSession()
  const t = useTranslations()
  const { openDialog } = useSignInDialog()
  const router = useRouter()
  const signOut = useSignOut({ redirectTo: '/' })

  function closeMenu() {
    setIsOpen(false)
  }

  function openMenu() {
    setIsOpen(true)
    playCommandOpenSound()
  }

  function openExternalLink(url: string) {
    closeMenu()
    window.open(url, '_blank', 'noopener')
  }

  async function copyCurrentUrl() {
    closeMenu()
    await copy({ text: globalThis.location.href })
  }

  function handleAccountNavigate() {
    closeMenu()
    router.push('/account')
  }

  function handleSignIn() {
    closeMenu()
    openDialog()
  }

  async function handleSignOut() {
    closeMenu()

    await signOut()
  }

  function handleNavigate(href: string) {
    closeMenu()
    router.push(href)
  }

  const navActions: CommandAction[] = [
    {
      title: t('common.labels.home'),
      icon: <HomeIcon />,
      onSelect: () => {
        handleNavigate('/')
      },
    },
    ...HEADER_LINKS.map((link) => ({
      title: t(link.labelKey),
      icon: link.icon,
      onSelect: () => {
        handleNavigate(link.href)
      },
    })),
  ]

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setIsOpen((prev) => {
          if (!prev) {
            playCommandOpenSound()
          }
          return !prev
        })
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const accountActions: CommandAction[] = session
    ? [
        {
          title: t('common.labels.account'),
          icon: <UserCircleIcon />,
          onSelect: handleAccountNavigate,
        },
        {
          title: t('common.sign-out'),
          icon: <LogOutIcon />,
          onSelect: handleSignOut,
        },
      ]
    : [
        {
          title: t('common.sign-in'),
          icon: <LogInIcon />,
          onSelect: handleSignIn,
        },
      ]

  const quickActions: CommandAction[] = [
    {
      title: t('command-menu.actions.copy-link'),
      icon: <LinkIcon />,
      onSelect: copyCurrentUrl,
    },
  ]

  const socialActions: CommandAction[] = COMMAND_MENU_SOCIAL_LINKS.map((link) => ({
    title: t(link.labelKey),
    icon: link.icon,
    onSelect: () => {
      openExternalLink(link.href)
    },
  }))

  const groups: CommandGroup[] = [
    { name: t('command-menu.groups.navigate'), actions: navActions },
    { name: t('common.labels.account'), actions: accountActions },
    { name: t('command-menu.groups.quick-actions'), actions: quickActions },
    { name: t('command-menu.groups.social'), actions: socialActions },
  ]

  const isMac = typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform)
  const shortcutLabel = isMac ? '⌘K' : 'Ctrl+K'

  return (
    <>
      <Button
        variant='ghost'
        size='icon'
        onClick={openMenu}
        aria-label={t('command-menu.open-menu')}
        title={t('command-menu.open-menu')}
        data-testid='command-menu-button'
        className='relative'
      >
        <CommandIcon />
        <kbd
          className='pointer-events-none absolute -bottom-0.5 -right-0.5 hidden rounded border border-border/50 bg-muted/80 px-1 font-mono text-[10px] font-medium text-muted-foreground sm:inline'
          aria-hidden
        >
          {shortcutLabel}
        </kbd>
      </Button>
      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <Command>
          <CommandInput placeholder={t('command-menu.placeholder')} />
          <CommandList>
            <CommandEmpty>{t('command-menu.no-results')}</CommandEmpty>
            {groups.map((group, index) => (
              <Fragment key={group.name}>
                <CommandGroup heading={group.name}>
                  {group.actions.map((action) => (
                    <CommandItem key={action.title} onSelect={action.onSelect}>
                      {action.icon}
                      {action.title}
                    </CommandItem>
                  ))}
                </CommandGroup>
                {index === groups.length - 1 ? null : <CommandSeparator />}
              </Fragment>
            ))}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
}

export default CommandMenu
