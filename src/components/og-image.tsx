import { SITE_DOMAIN } from '@/lib/constants'
import { LOGO_ASPECT } from '@/lib/logo-constants'

function getFontSize(title: string) {
  const baseSize = 80
  if (title.length <= 30) return baseSize
  const minSize = 50

  const maxChars = 80

  if (title.length >= maxChars) return minSize

  const scale = 1 - (title.length - 20) / (maxChars - 20)
  return Math.round(minSize + (baseSize - minSize) * scale)
}

type OGImageProps = {
  title: string
  url?: string
  /** Base64 data URL for the logo (required for Satori / ImageResponse). */
  logoDataUrl: string
}

function OGImage(props: OGImageProps) {
  const { title, url, logoDataUrl } = props
  const fontSize = getFontSize(title)
  const logoW = 50
  const logoH = Math.round(logoW * LOGO_ASPECT)

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#0b1620',
        padding: 50,
        color: '#e8eeec',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- Satori OG pipeline; data URL only */}
      <img
        src={logoDataUrl}
        alt=''
        width={logoW}
        height={logoH}
        style={{ position: 'absolute', left: 50, top: 50, objectFit: 'contain' }}
      />
      <div style={{ fontSize, maxWidth: 740, fontWeight: 600 }}>{title}</div>
      <div
        style={{
          display: 'flex',
          fontSize: 30,
          position: 'absolute',
          right: 50,
          bottom: 50,
          fontWeight: 500,
          color: '#9aa9ae',
        }}
      >
        {SITE_DOMAIN}
        {url}
      </div>
    </div>
  )
}

export default OGImage
