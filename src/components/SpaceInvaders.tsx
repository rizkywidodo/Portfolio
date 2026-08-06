import { useEffect, useRef, useState } from 'react'
import PixelSprite from './PixelSprite'
import { ALIEN_PATTERN, SHIP_COLORS, SHIP_PATTERN } from './pixelSprites'

type Alien = { id: string; x: number; y: number; color: string; alive: boolean }
type Bullet = { id: string; x: number; y: number }

const ALIEN_COLORS = ['#ff4fd8', '#ffe14d', '#7dffb3', '#2ee6ff']
const BULLET_SPEED = 2.2 // percent of battlefield height per frame
const HIT_RADIUS = 7 // percent

function makeWave(): Alien[] {
  const aliens: Alien[] = []
  let id = 0
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 4; col++) {
      aliens.push({
        id: `a${id++}`,
        x: 20 + col * 22,
        y: 15 + row * 16,
        color: ALIEN_COLORS[(row + col) % ALIEN_COLORS.length],
        alive: true,
      })
    }
  }
  return aliens
}

const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n))

function SpaceInvaders() {
  const battlefieldRef = useRef<HTMLDivElement>(null)
  const [shipX, setShipX] = useState(50)
  const [aliens, setAliens] = useState<Alien[]>(() => makeWave())
  const [bullets, setBullets] = useState<Bullet[]>([])

  const aliensRef = useRef(aliens)
  const bulletsRef = useRef(bullets)
  useEffect(() => {
    aliensRef.current = aliens
  }, [aliens])
  useEffect(() => {
    bulletsRef.current = bullets
  }, [bullets])

  // Single rAF loop: moves bullets up and checks alien collisions each
  // frame. Reads current state via refs (not the closed-over `aliens`/
  // `bullets`) so the effect never needs to restart.
  useEffect(() => {
    let raf: number

    const tick = () => {
      const currentBullets = bulletsRef.current
      const currentAliens = aliensRef.current

      if (currentBullets.length > 0) {
        const hitIds = new Set<string>()
        const nextBullets: Bullet[] = []

        for (const bullet of currentBullets) {
          const y = bullet.y - BULLET_SPEED
          if (y < 0) continue

          const hit = currentAliens.find(
            (a) =>
              a.alive &&
              !hitIds.has(a.id) &&
              Math.abs(a.x - bullet.x) < HIT_RADIUS &&
              Math.abs(a.y - y) < HIT_RADIUS,
          )
          if (hit) {
            hitIds.add(hit.id)
            continue
          }
          nextBullets.push({ ...bullet, y })
        }

        setBullets(nextBullets)
        if (hitIds.size > 0) {
          setAliens(
            currentAliens.map((a) =>
              hitIds.has(a.id) ? { ...a, alive: false } : a,
            ),
          )
        }
      }

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  // New wave after the current one is fully cleared.
  useEffect(() => {
    if (aliens.length > 0 && aliens.every((a) => !a.alive)) {
      const t = setTimeout(() => setAliens(makeWave()), 1500)
      return () => clearTimeout(t)
    }
  }, [aliens])

  const shipXFromPointer = (clientX: number) => {
    const rect = battlefieldRef.current?.getBoundingClientRect()
    if (!rect) return shipX
    return clamp(((clientX - rect.left) / rect.width) * 100, 5, 95)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    setShipX(shipXFromPointer(e.clientX))
  }

  const handlePointerDown = (e: React.PointerEvent) => {
    const x = shipXFromPointer(e.clientX)
    setShipX(x)
    setBullets((prev) => [
      ...prev,
      { id: `b${Date.now()}-${Math.random()}`, x, y: 84 },
    ])
  }

  return (
    <div
      ref={battlefieldRef}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      className="pointer-events-auto absolute inset-y-0 right-0 w-[38%] touch-none select-none"
    >
      <p className="font-pixel absolute top-2 right-2 text-[9px] text-slate-600">
        ▸ SHOOT THE ALIENS
      </p>

      {aliens.map(
        (a) =>
          a.alive && (
            <PixelSprite
              key={a.id}
              rows={ALIEN_PATTERN}
              colorMap={{ A: a.color }}
              pixelSize={4}
              className="animate-float absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${a.x}%`, top: `${a.y}%` }}
            />
          ),
      )}

      {bullets.map((b) => (
        <div
          key={b.id}
          className="absolute h-3 w-0.75 -translate-x-1/2 bg-yellow"
          style={{ left: `${b.x}%`, top: `${b.y}%` }}
        />
      ))}

      <PixelSprite
        rows={SHIP_PATTERN}
        colorMap={SHIP_COLORS}
        pixelSize={5}
        className="absolute top-[86%] -translate-x-1/2"
        style={{ left: `${shipX}%` }}
      />
    </div>
  )
}

export default SpaceInvaders
