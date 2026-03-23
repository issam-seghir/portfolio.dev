// Based on delbaoliveira/website
// Copyright (c) Delba de Oliveira
// Source: https://github.com/delbaoliveira/website/blob/59e6f181ad75751342ceaa8931db4cbcef86b018/ui/BlurImage.tsx
//
// Modified by: Nelson Lai
'use client'

import NextImage from 'next/image'
import { useState } from 'react'

import { cn } from '@/utils/cn'

type ImageProps = {
  imageClassName?: string
  lazy?: boolean
} & React.ComponentProps<typeof NextImage>

function BlurImage(props: ImageProps) {
  const { alt, src, className, imageClassName, lazy = true, ...rest } = props
  const [isLoading, setIsLoading] = useState(true)
  const fill = 'fill' in rest && rest.fill === true

  return (
    <div
      className={cn(
        'overflow-hidden',
        fill && 'relative h-full w-full',
        isLoading && 'animate-pulse',
        className,
      )}
    >
      <NextImage
        className={cn(isLoading && 'scale-[1.02] blur-xl grayscale', fill && 'object-cover', imageClassName)}
        style={{
          transition: 'filter 700ms ease, scale 150ms ease',
        }}
        src={src}
        alt={alt}
        loading={lazy ? 'lazy' : undefined}
        priority={!lazy}
        quality={100}
        onLoad={() => {
          setIsLoading(false)
        }}
        {...rest}
      />
    </div>
  )
}

export default BlurImage
