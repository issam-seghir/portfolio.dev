import type { SatoriOptions } from 'next/dist/compiled/@vercel/og/satori'

import fs from 'node:fs/promises'
import path from 'node:path'

import { cache } from 'react'

function getFontPath(fontName: string) {
  return path.join(process.cwd(), 'public', 'fonts', fontName)
}

const getRegularFont = cache(async () => {
  const response = await fs.readFile(getFontPath('Geist-Regular.otf'))
  const font = Uint8Array.from(response).buffer

  return font
})

const getMediumFont = cache(async () => {
  const response = await fs.readFile(getFontPath('Geist-Medium.otf'))
  const font = Uint8Array.from(response).buffer

  return font
})

const getSemiBoldFont = cache(async () => {
  const response = await fs.readFile(getFontPath('Geist-SemiBold.otf'))
  const font = Uint8Array.from(response).buffer

  return font
})

const fetchGoogleFont = cache(async (font: string, text: string): Promise<ArrayBuffer | null> => {
  const cssURL = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(font)}&text=${encodeURIComponent(text)}`

  try {
    const cssResponse = await fetch(cssURL, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1',
      },
    })

    if (!cssResponse.ok) return null

    const css = await cssResponse.text()

    // NOTE: Google Fonts typically serves woff2, which Satori does NOT support reliably.
    // We only try to extract TTF/OTF sources; otherwise we fall back to bundled Geist.
    const match = /src:\s*url\((.+?)\)\s*format\('(?:opentype|truetype)'\)/.exec(css)
    if (!match?.[1]) return null

    const fontURL = match[1]
    const fontResponse = await fetch(fontURL)
    if (!fontResponse.ok) return null

    const fontData = await fontResponse.arrayBuffer()
    const header = new TextDecoder().decode(fontData.slice(0, 12))
    // If we got an HTML error page, bail out.
    if (header.toLowerCase().startsWith('<!doctype') || header.toLowerCase().startsWith('<html')) {
      return null
    }

    return fontData
  } catch {
    return null
  }
})

export async function getOGImageFonts(title: string): Promise<SatoriOptions['fonts']> {
  const [regularFontData, mediumFontData, semiBoldFontData, notoSansTCData, notoSansSCData] = await Promise.all([
    getRegularFont(),
    getMediumFont(),
    getSemiBoldFont(),
    fetchGoogleFont('Noto Sans TC', title),
    fetchGoogleFont('Noto Sans SC', title),
  ])

  const fonts: SatoriOptions['fonts'] = [
    {
      name: 'Geist Sans',
      data: regularFontData,
      style: 'normal',
      weight: 400,
    },
    {
      name: 'Geist Sans',
      data: mediumFontData,
      style: 'normal',
      weight: 500,
    },
    {
      name: 'Geist Sans',
      data: semiBoldFontData,
      style: 'normal',
      weight: 600,
    },
  ]

  if (notoSansTCData) {
    fonts.push({
      name: 'Noto Sans TC',
      data: notoSansTCData,
      style: 'normal',
      weight: 400,
    })
  }

  if (notoSansSCData) {
    fonts.push({
      name: 'Noto Sans SC',
      data: notoSansSCData,
      style: 'normal',
      weight: 400,
    })
  }

  return fonts
}
