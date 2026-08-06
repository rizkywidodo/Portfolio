import { useEffect, useRef, useState } from 'react'
import PixelSprite from './PixelSprite'
import { ALIEN_PATTERN, SHIP_COLORS, SHIP_PATTERN } from './pixelSprites'
import { playExplosion, playShoot, unlockAudio } from '../lib/sound'

type Alien = { id: string; x: number; y: number; color: string; alive: boolean }
type Bullet = { id: string; x: number; y: number }
type Explosion = { id: string; x: number; y: number; color: string }

const ALIEN_COLORS = ['#ff4fd8', '#ffe14d', '#7dffb3', '#2ee6ff']
const BULLET_SPEED = 2.4 // percent of battlefield height per frame
const HIT_RADIUS = 6 // percent
const FIRE_INTERVAL_MS = 450
const PARTICLE_ANGLES = [0, 60, 120, 180, 240, 300]

function makeWave(): Alien[] {
  const aliens: Alien[] = []
  let id = 0
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 6; col++) {
      aliens.push({
        id: `a${id++}`,
        x: 8 + col * 16.8,
        y: 10 + row * 13,
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
  const [explosions, setExplosions] = useState<Explosion[]>([])
  const [soundOn, setSoundOn] = useState(false)

  const aliensRef = useRef(aliens)
  const bulletsRef = useRef(bullets)
  const shipXRef = useRef(shipX)
  const soundOnRef = useRef(soundOn)
  useEffect(() => {
    aliensRef.current = aliens
  }, [aliens])
  useEffect(() => {
    bulletsRef.current = bullets
  }, [bullets])
  useEffect(() => {
    soundOnRef.current = soundOn
  }, [soundOn])

  // Single rAF loop: moves bullets up and checks alien collisions each
  // frame. Reads current state via refs (not the closed-over `aliens`/
  // `bullets`) so the effect never needs to restart.
  useEffect(() => {
    let raf: number

    const tick = () => {
      const currentBullets = bulletsRef.current
      const currentAliens = aliensRef.current

      if (currentBullets.length > 0) {
        const hits: Alien[] = []
        const nextBullets: Bullet[] = []

        for (const bullet of currentBullets) {
          const y = bullet.y - BULLET_SPEED
          if (y < 0) continue

          const hit = currentAliens.find(
            (a) =>
              a.alive &&
              !hits.includes(a) &&
              Math.abs(a.x - bullet.x) < HIT_RADIUS &&
              Math.abs(a.y - y) < HIT_RADIUS,
          )
          if (hit) {
            hits.push(hit)
            continue
          }
          nextBullets.push({ ...bullet, y })
        }

        setBullets(nextBullets)
        if (hits.length > 0) {
          const hitIds = new Set(hits.map((a) => a.id))
          setAliens(
            currentAliens.map((a) =>
              hitIds.has(a.id) ? { ...a, alive: false } : a,
            ),
          )
          setExplosions((prev) => [
            ...prev,
            ...hits.map((a) => ({
              id: `e${a.id}-${Date.now()}`,
              x: a.x,
              y: a.y,
              color: a.color,
            })),
          ])
          if (soundOnRef.current) playExplosion()
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

  // Auto-fire from the ship's current x, no click required.
  useEffect(() => {
    const interval = setInterval(() => {
      setBullets((prev) => [
        ...prev,
        { id: `b${Date.now()}-${Math.random()}`, x: shipXRef.current, y: 84 },
      ])
      if (soundOnRef.current) playShoot()
    }, FIRE_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [])

  const handlePointerMove = (e: React.PointerEvent) => {
    const rect = battlefieldRef.current?.getBoundingClientRect()
    if (!rect) return
    const pct = clamp(((e.clientX - rect.left) / rect.width) * 100, 3, 97)
    shipXRef.current = pct
    setShipX(pct)
  }

  const toggleSound = () => {
    setSoundOn((prev) => {
      if (!prev) unlockAudio()
      return !prev
    })
  }

  return (
    <div
      ref={battlefieldRef}
      onPointerMove={handlePointerMove}
      className="pointer-events-auto absolute inset-0 touch-none select-none"
    >
      <button
        type="button"
        onClick={toggleSound}
        className="pointer-events-auto font-pixel absolute top-20 right-2 text-[9px] text-slate-600 transition-colors hover:text-cyan"
      >
        ♪ SOUND: {soundOn ? 'ON' : 'OFF'}
      </button>
      <p className="font-pixel absolute top-20 left-2 text-[9px] text-slate-600">
        ▸ MOVE TO STEER
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

      {explosions.map((ex) => (
        <div
          key={ex.id}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${ex.x}%`, top: `${ex.y}%` }}
          onAnimationEnd={() =>
            setExplosions((prev) => prev.filter((p) => p.id !== ex.id))
          }
        >
          {PARTICLE_ANGLES.map((angle) => {
            const rad = (angle * Math.PI) / 180
            const dx = Math.cos(rad) * 18
            const dy = Math.sin(rad) * 18
            return (
              <span
                key={angle}
                className="absolute h-1 w-1"
                style={
                  {
                    background: ex.color,
                    animation: 'pixel-explode 0.4s ease-out forwards',
                    '--dx': `${dx}px`,
                    '--dy': `${dy}px`,
                  } as React.CSSProperties
                }
              />
            )
          })}
        </div>
      ))}

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
