'use client'

import type { VariantProps } from 'class-variance-authority'

import { Button as ButtonPrimitive } from '@base-ui/react/button'

import { buttonVariants } from '@/components/ui/button-variants'
import { cn } from '@/utils/cn'

type ButtonProps = ButtonPrimitive.Props & VariantProps<typeof buttonVariants>

function Button(props: ButtonProps) {
  const { className, variant = 'default', size = 'default', ...rest } = props

  return <ButtonPrimitive data-slot='button' className={cn(buttonVariants({ variant, size, className }))} {...rest} />
}

export { Button }

export { buttonVariants } from '@/components/ui/button-variants'
