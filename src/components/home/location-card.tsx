'use client'

import createGlobe from 'cobe'
import { MapPinIcon } from 'lucide-react'
import { animate, AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { useEffect, useRef, useState } from 'react'

import { cn } from '@/utils/cn'

/**
 * COBE presets (WebGL needs RGB floats, so CSS tokens can't be passed directly).
 * Marker colors mirror `--primary` (#0c6b5b light / #46bfa3 dark) from globals.css; the rest stays neutral.
 */
function globeStyle(isDark: boolean) {
  if (isDark) {
    return {
      dark: 1,
      diffuse: 2,
      mapBrightness: 2,
      baseColor: [0.8, 0.8, 0.8] as [number, number, number],
      markerColor: [0.275, 0.749, 0.639] as [number, number, number],
      glowColor: [0.5, 0.5, 0.5] as [number, number, number],
    }
  }
  return {
    dark: 0,
    diffuse: 1.2,
    mapBrightness: 6,
    baseColor: [0.92, 0.94, 0.93] as [number, number, number],
    markerColor: [0.047, 0.42, 0.357] as [number, number, number],
    glowColor: [0.85, 0.88, 0.86] as [number, number, number],
  }
}

const ALGIERS = { lat: 36.7538, lon: 3.0588 }

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

function AnimatedDistance({ value }: { value: number }) {
  const motionValue = useMotionValue(0)
  const display = useTransform(motionValue, (v) => Math.round(v).toLocaleString())
  const [text, setText] = useState('0')

  useEffect(() => {
    const controls = animate(motionValue, value, { duration: 1.5, ease: 'easeOut' })
    return controls.stop
  }, [motionValue, value])

  useEffect(() => {
    const unsubscribe = display.on('change', setText)
    return unsubscribe
  }, [display])

  return <span>{text}</span>
}

type GeoData = {
  city: string
  country: string
  lat: number
  lon: number
  distance: number
}

function LocationCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<number | null>(null)
  const pointerInteractionMovement = useRef(0)
  const t = useTranslations()
  const { resolvedTheme } = useTheme()

  const [geo, setGeo] = useState<GeoData | null>(null)
  const [loading, setLoading] = useState(true)
  const [unit, setUnit] = useState<'km' | 'mi'>('km')

  const rotation = useMotionValue(0)
  const springRotation = useSpring(rotation, {
    stiffness: 280,
    damping: 40,
    mass: 1,
  })

  const isDarkGlobe = (resolvedTheme ?? 'light') === 'dark'

  // Recreate globe only when light/dark palette changes. Do NOT list springRotation here — it would
  // tear down WebGL on re-renders and break drag; the animation loop always reads springRotation.get().
  useEffect(() => {
    let width = 0

    function onResize() {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth
      }
    }

    onResize()
    window.addEventListener('resize', onResize)

    if (!canvasRef.current) return

    const style = globeStyle(isDarkGlobe)

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: -0.05,
      theta: 0,
      mapSamples: 16_000,
      markers: [{ location: [ALGIERS.lat, ALGIERS.lon], size: 0.1 }],
      scale: 1.05,
      ...style,
    })

    let raf = 0
    const tick = () => {
      globe.update({
        phi: -0.05 + springRotation.get(),
        width: width * 2,
        height: width * 2,
      })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      globe.destroy()
      window.removeEventListener('resize', onResize)
    }
  }, [isDarkGlobe])

  useEffect(() => {
    const controller = new AbortController()

    void (async () => {
      try {
        const res = await fetch('https://ipapi.co/json/', { signal: controller.signal })
        if (!res.ok) throw new Error('Geo lookup failed')
        const data = (await res.json()) as Record<string, unknown>
        const lat = Number(data.latitude)
        const lon = Number(data.longitude)
        setGeo({
          city: typeof data.city === 'string' ? data.city : 'Unknown',
          country: typeof data.country_name === 'string' ? data.country_name : 'Unknown',
          lat,
          lon,
          distance: haversineKm(ALGIERS.lat, ALGIERS.lon, lat, lon),
        })
      } catch {
        setGeo(null)
      } finally {
        setLoading(false)
      }
    })()

    return () => {
      controller.abort()
    }
  }, [])

  const fadeMask = 'radial-gradient(circle at 50% 50%, rgb(0, 0, 0) 60%, rgb(0, 0, 0, 0) 70%)'
  let dist = 0
  if (geo) {
    dist = unit === 'km' ? geo.distance : geo.distance * 0.621371
  }

  let locationStatus = (
    <motion.p
      key='fallback'
      className='text-sm text-muted-foreground'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {t('homepage.about-me.location-fallback')}
    </motion.p>
  )

  if (loading) {
    locationStatus = (
      <motion.p
        key='loading'
        className='flex items-center gap-2 text-sm text-muted-foreground'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
          🌍
        </motion.span>
        {t('homepage.about-me.location-finding')}
      </motion.p>
    )
  } else if (geo) {
    locationStatus = (
      <motion.div
        key='result'
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <p className='text-sm/relaxed text-muted-foreground'>
          {t('homepage.about-me.location-distance-pre')}{' '}
          <button
            type='button'
            onClick={() => {
              setUnit((u) => (u === 'km' ? 'mi' : 'km'))
            }}
            className='inline-flex cursor-pointer items-baseline gap-0.5 font-semibold text-foreground underline decoration-primary/50 decoration-2 underline-offset-2 transition-colors hover:decoration-primary'
          >
            <AnimatedDistance value={dist} />
            {unit}
          </button>{' '}
          {t('homepage.about-me.location-distance-post')}
        </p>
      </motion.div>
    )
  }

  return (
    <div className={cn('bento-card overflow-hidden')}>
      <div className='relative flex h-60 flex-col gap-6 p-4 lg:p-6'>
        <div className='flex items-center gap-2'>
          <MapPinIcon className='size-4.5' />
          <h2 className='text-sm'>{t('homepage.about-me.location')}</h2>
        </div>
        <div className='absolute inset-x-0 -bottom-44 mx-auto aspect-square h-84 lg:-bottom-48 lg:h-96'>
          <div className='flex size-full items-center justify-center overflow-visible'>
            <div
              style={{
                width: '100%',
                aspectRatio: '1/1',
                maxWidth: 800,
                WebkitMaskImage: fadeMask,
                maskImage: fadeMask,
              }}
            >
              <canvas
                ref={canvasRef}
                onPointerDown={(e) => {
                  e.currentTarget.setPointerCapture(e.pointerId)
                  pointerInteracting.current = e.clientX - pointerInteractionMovement.current
                  e.currentTarget.style.cursor = 'grabbing'
                }}
                onPointerMove={(e) => {
                  if (pointerInteracting.current === null) return
                  const delta = e.clientX - pointerInteracting.current
                  pointerInteractionMovement.current = delta
                  rotation.set(delta / 200)
                }}
                onPointerUp={(e) => {
                  try {
                    e.currentTarget.releasePointerCapture(e.pointerId)
                  } catch {
                    /* not captured */
                  }
                  pointerInteracting.current = null
                  e.currentTarget.style.cursor = 'grab'
                }}
                onPointerCancel={(e) => {
                  try {
                    e.currentTarget.releasePointerCapture(e.pointerId)
                  } catch {
                    /* not captured */
                  }
                  pointerInteracting.current = null
                  e.currentTarget.style.cursor = 'grab'
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  contain: 'layout paint size',
                  cursor: 'grab',
                  touchAction: 'none',
                  userSelect: 'none',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className='p-4 lg:px-6'>
        <AnimatePresence mode='wait'>{locationStatus}</AnimatePresence>
        <p className='mt-2 text-[10px] text-muted-foreground italic'>{t('homepage.about-me.location-credit')}</p>
      </div>
    </div>
  )
}

export default LocationCard
