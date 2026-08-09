import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const CELL = 20
const LENGTH = 10
const TICK_MS = 140
const TURN_CHANCE = 0.18
const SNAKE_COUNT = 3

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

function initialSegments(cols: number, rows: number, index: number): Cell[] {
  const startY = mod(Math.floor((rows * (index + 1)) / (SNAKE_COUNT + 1)), rows)
  const startX = mod(Math.floor(cols / 2) + index * 5, cols)
  return Array.from({ length: LENGTH }, (_, i) => ({
    x: mod(startX - i, cols),
    y: startY,
  }))
}

// One classic grid-locked Snake (right-angle turns only, wraps at the
// edges), sized to whatever arena its parent gives it.
function Snake({
  cols,
  rows,
  index,
  active,
}: {
  cols: number
  rows: number
  index: number
  active: boolean
}) {
  const colsRef = useRef(cols)
  const rowsRef = useRef(rows)
  useEffect(() => {
    colsRef.current = cols
    rowsRef.current = rows
  }, [cols, rows])

  const dirRef = useRef<Dir>({ dx: 1, dy: 0 })
  const segmentsRef = useRef<Cell[]>(initialSegments(cols, rows, index))
  const [segments, setSegments] = useState<Cell[]>(segmentsRef.current)

  useEffect(() => {
    if (!active) return
    const interval = setInterval(() => {
      const c = colsRef.current
      const r = rowsRef.current

      if (Math.random() < TURN_CHANCE) {
        const horizontal = dirRef.current.dx !== 0
        const options = horizontal ? VERTICAL : HORIZONTAL
        dirRef.current = options[Math.floor(Math.random() * options.length)]
      }

      const head = segmentsRef.current[0]
      const { dx, dy } = dirRef.current
      const nextHead = { x: mod(head.x + dx, c), y: mod(head.y + dy, r) }
      const nextSegments = [nextHead, ...segmentsRef.current.slice(0, LENGTH - 1)]
      segmentsRef.current = nextSegments
      setSegments(nextSegments)
    }, TICK_MS)
    return () => clearInterval(interval)
  }, [active])

  return (
    <>
      {segments.map((seg, i) => {
        const isHead = i === 0
        return (
          <span
            key={i}
            className="absolute bg-green"
            style={{
              left: seg.x * CELL,
              top: seg.y * CELL,
              width: CELL - 2,
              height: CELL - 2,
              opacity: 1 - i * 0.08,
            }}
          >
            {isHead && (
              <>
                <span className="absolute top-1 right-1 h-1 w-1 bg-bg" />
                <span className="absolute right-1 bottom-1 h-1 w-1 bg-bg" />
              </>
            )}
          </span>
        )
      })}
    </>
  )
}

function PixelSnake() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ cols: 0, rows: 0 })
  const [inView, setInView] = useState(true)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const el = trackRef.current
    if (!el) return

    const measure = () => {
      const cols = Math.max(10, Math.floor(el.clientWidth / CELL))
      const rows = Math.max(10, Math.floor(el.clientHeight / CELL))
      setSize((prev) =>
        prev.cols === cols && prev.rows === rows ? prev : { cols, rows },
      )
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Purely decorative and would otherwise crawl forever: stop ticking once
  // scrolled out of view, and don't auto-move at all under reduced motion.
  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '200px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const active = inView && !reducedMotion

  return (
    <div
      ref={trackRef}
      className="pointer-events-none absolute inset-0"
      aria-hidden="true"
    >
      {size.cols > 0 &&
        size.rows > 0 &&
        Array.from({ length: SNAKE_COUNT }, (_, i) => (
          <Snake key={i} cols={size.cols} rows={size.rows} index={i} active={active} />
        ))}
    </div>
  )
}

export default PixelSnake
