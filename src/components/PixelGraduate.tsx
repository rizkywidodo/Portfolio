import { useEffect, useRef, useState } from 'react'
import PixelSprite from './PixelSprite'
import { GRAD_PATTERN, GRAD_COLORS } from './pixelSprites'
import { useInView } from '../hooks/useInView'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { playHop, unlockAudio } from '../lib/sound'

const SPRITE_SIZE = 3
const SPRITE_WIDTH = GRAD_PATTERN[0].length * SPRITE_SIZE
const TICK_MS = 45
const STEP = 2
const HOP_MS = 280
const HOP_HEIGHT = 10

// A tiny grad character that paces the top edge of its parent, back and
// forth, like a platformer NPC patrolling a ledge.
function PixelGraduate() {
  const { ref, inView } = useInView<HTMLDivElement>()
  const reducedMotion = usePrefersReducedMotion()
  const [trackWidth, setTrackWidth] = useState(0)
  const [x, setX] = useState(0)
  const dirRef = useRef(1)
  const xRef = useRef(0)
  const [hopY, setHopY] = useState(0)
  const hoppingRef = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const measure = () => setTrackWidth(el.clientWidth)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref])

  const maxX = Math.max(0, trackWidth - SPRITE_WIDTH)

  useEffect(() => {
    if (!inView || reducedMotion || maxX <= 0) return
    const interval = setInterval(() => {
      let next = xRef.current + dirRef.current * STEP
      if (next >= maxX) {
        next = maxX
        dirRef.current = -1
      } else if (next <= 0) {
        next = 0
        dirRef.current = 1
      }
      xRef.current = next
      setX(next)
    }, TICK_MS)
    return () => clearInterval(interval)
  }, [inView, reducedMotion, maxX])

  const handleClick = () => {
    unlockAudio()
    playHop()
    if (reducedMotion || hoppingRef.current) return

    hoppingRef.current = true
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / HOP_MS, 1)
      setHopY(-Math.sin(t * Math.PI) * HOP_HEIGHT)
      if (t < 1) {
        requestAnimationFrame(tick)
      } else {
        hoppingRef.current = false
      }
    }
    requestAnimationFrame(tick)
  }

  return (
    <div ref={ref} className="pointer-events-none absolute inset-x-0 -top-3 z-10 h-0">
      <button
        type="button"
        onClick={handleClick}
        aria-label="Say hi to the graduate"
        className="pointer-events-auto absolute cursor-pointer"
        style={{ left: maxX > 0 ? x : 0 }}
      >
        <PixelSprite
          rows={GRAD_PATTERN}
          colorMap={GRAD_COLORS}
          pixelSize={SPRITE_SIZE}
          style={{
            transform: `translateY(${hopY}px) scaleX(${dirRef.current === -1 ? -1 : 1})`,
          }}
        />
      </button>
    </div>
  )
}

export default PixelGraduate
