'use client'

import createGlobe from 'cobe'
import { MapPinIcon } from 'lucide-react'
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, animate } from 'motion/react'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

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

  const [geo, setGeo] = useState<GeoData | null>(null)
  const [loading, setLoading] = useState(true)
  const [unit, setUnit] = useState<'km' | 'mi'>('km')

  const rotation = useMotionValue(0)
  const springRotation = useSpring(rotation, {
    stiffness: 280,
    damping: 40,
    mass: 1,
  })

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

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 2,
      mapSamples: 16_000,
      mapBrightness: 2,
      baseColor: [0.8, 0.8, 0.8],
      markerColor: [1, 1, 1],
      glowColor: [0.5, 0.5, 0.5],
      markers: [{ location: [ALGIERS.lat, ALGIERS.lon], size: 0.1 }],
      scale: 1.05,
      onRender: (state) => {
        state.phi = -0.05 + springRotation.get()
        state.width = width * 2
        state.height = width * 2
      },
    })

    return () => {
      globe.destroy()
      window.removeEventListener('resize', onResize)
    }
  }, [springRotation])

  useEffect(() => {
    const controller = new AbortController()

    ;(async () => {
      try {
        const res = await fetch('https://ipapi.co/json/', { signal: controller.signal })
        if (!res.ok) throw new Error('Geo lookup failed')
        const data = await res.json()
        const lat = Number(data.latitude)
        const lon = Number(data.longitude)
        setGeo({
          city: data.city ?? 'Unknown',
          country: data.country_name ?? 'Unknown',
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

    return () => controller.abort()
  }, [])

  const fadeMask = 'radial-gradient(circle at 50% 50%, rgb(0, 0, 0) 60%, rgb(0, 0, 0, 0) 70%)'
  const dist = geo ? (unit === 'km' ? geo.distance : geo.distance * 0.621_371) : 0

  return (
    <div className='overflow-hidden rounded-2xl shadow-feature-card transition-shadow hover:shadow-lg'>
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
                  pointerInteracting.current = e.clientX - pointerInteractionMovement.current
                  if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing'
                }}
                onPointerUp={() => {
                  pointerInteracting.current = null
                  if (canvasRef.current) canvasRef.current.style.cursor = 'grab'
                }}
                onPointerOut={() => {
                  pointerInteracting.current = null
                  if (canvasRef.current) canvasRef.current.style.cursor = 'grab'
                }}
                onMouseMove={(e) => {
                  if (pointerInteracting.current !== null) {
                    const delta = e.clientX - pointerInteracting.current
                    pointerInteractionMovement.current = delta
                    rotation.set(delta / 200)
                  }
                }}
                onTouchMove={(e) => {
                  if (pointerInteracting.current !== null && e.touches[0]) {
                    const delta = e.touches[0].clientX - pointerInteracting.current
                    pointerInteractionMovement.current = delta
                    rotation.set(delta / 100)
                  }
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  contain: 'layout paint size',
                  cursor: 'auto',
                  userSelect: 'none',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className='px-4 py-4 lg:px-6'>
        <AnimatePresence mode='wait'>
          {loading ? (
            <motion.p
              key='loading'
              className='flex items-center gap-2 text-sm text-muted-foreground'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              >
                🌍
              </motion.span>
              {t('homepage.about-me.location-finding')}
            </motion.p>
          ) : geo ? (
            <motion.div
              key='result'
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p className='text-sm leading-relaxed text-muted-foreground'>
                {t('homepage.about-me.location-distance-pre')}{' '}
                <button
                  type='button'
                  onClick={() => setUnit((u) => (u === 'km' ? 'mi' : 'km'))}
                  className='inline-flex cursor-pointer items-baseline gap-0.5 font-semibold text-foreground underline decoration-blue-500/50 decoration-2 underline-offset-2 transition-colors hover:decoration-blue-500'
                >
                  <AnimatedDistance value={dist} />
                  {unit}
                </button>{' '}
                {t('homepage.about-me.location-distance-post')}
              </p>
            </motion.div>
          ) : (
            <motion.p
              key='fallback'
              className='text-sm text-muted-foreground'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {t('homepage.about-me.location-fallback')}
            </motion.p>
          )}
        </AnimatePresence>
        <p className='mt-2 text-[10px] italic text-muted-foreground/30'>
          {t('homepage.about-me.location-credit')}
        </p>
      </div>
    </div>
  )
}

export default LocationCard
