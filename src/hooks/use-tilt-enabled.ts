import { useEffect, useState } from 'react'

/**
 * True when the device supports hover with a fine pointer (mouse / trackpad).
 * False for most phones and tablets — avoids awkward 3D tilt while scrolling.
 */
export function useTiltEnabled() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const mq = globalThis.matchMedia('(hover: hover) and (pointer: fine)')
    function update() {
      setEnabled(mq.matches)
    }
    update()
    mq.addEventListener('change', update)
    return () => {
      mq.removeEventListener('change', update)
    }
  }, [])

  return enabled
}
