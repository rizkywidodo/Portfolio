import { useEffect, useRef, useState } from 'react'

const CELL = 8
const ROWS = 5
const LENGTH = 10
const TICK_MS = 140
const TURN_CHANCE = 0.18

type Dir = { dx: number; dy: number }
type Cell = { x: number; y: number }

const HORIZONTAL: Dir[] = [
  { dx: 1, dy: 0 },
  { dx: -1, dy: 0 },
]
const VERTICAL: Dir[] = [
  { dx: 0, dy: 1 },
  { dx: 0, dy: -1 },
]

const mod = (n: number, m: number) => ((n % m) + m) % m

// Classic grid-locked Snake movement (right-angle turns only, wraps at the
// edges) — not a lap across the screen, it just wanders the footer forever.
function FooterSnake() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [segments, setSegments] = useState<Cell[]>([])

  const colsRef = useRef(0)
  const dirRef = useRef<Dir>({ dx: 1, dy: 0 })
  const segmentsRef = useRef<Cell[]>([])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return

    const measure = () => {
      const cols = Math.max(10, Math.floor(el.clientWidth / CELL))
      colsRef.current = cols
      if (segmentsRef.current.length === 0) {
        const startY = Math.floor(ROWS / 2)
        const startX = Math.floor(cols / 2)
        const initial = Array.from({ length: LENGTH }, (_, i) => ({
          x: mod(startX - i, cols),
          y: startY,
        }))
        segmentsRef.current = initial
        setSegments(initial)
      }
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      const cols = colsRef.current
      if (cols === 0) return

      if (Math.random() < TURN_CHANCE) {
        const horizontal = dirRef.current.dx !== 0
        const options = horizontal ? VERTICAL : HORIZONTAL
        dirRef.current = options[Math.floor(Math.random() * options.length)]
      }

      const head = segmentsRef.current[0]
      const { dx, dy } = dirRef.current
      const nextHead = { x: mod(head.x + dx, cols), y: mod(head.y + dy, ROWS) }
      const nextSegments = [nextHead, ...segmentsRef.current.slice(0, LENGTH - 1)]
      segmentsRef.current = nextSegments
      setSegments(nextSegments)
    }, TICK_MS)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      ref={trackRef}
      className="relative mx-auto mb-6 w-full max-w-md overflow-hidden"
      style={{ height: ROWS * CELL }}
      aria-hidden="true"
    >
      {segments.map((seg, i) => (
        <span
          key={i}
          className="absolute bg-green"
          style={{
            left: seg.x * CELL,
            top: seg.y * CELL,
            width: CELL - 2,
            height: CELL - 2,
            opacity: 1 - i * 0.07,
          }}
        />
      ))}
    </div>
  )
}

export default FooterSnake
