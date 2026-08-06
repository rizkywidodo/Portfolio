import { useEffect, useRef, useState } from 'react'
import PixelSprite from './PixelSprite'
import { ALIEN_PATTERN, SHIP_COLORS, SHIP_PATTERN } from './pixelSprites'
import { playExplosion, playShoot, unlockAudio } from '../lib/sound'
import { KONAMI_EVENT } from './KonamiEasterEgg'

type Alien = {
  id: string
  x: number
  y: number
  color: string
  hidden: boolean
}
type Bullet = { id: string; x: number; y: number }
type Explosion = { id: string; x: number; y: number; color: string }

const ALIEN_COLORS = ['#ff4fd8', '#ffe14d', '#7dffb3', '#2ee6ff']
const ALIEN_COUNT = 16
const DESCEND_PER_TICK = 0.28 // percent of battlefield height
const DESCEND_EVERY_N_FRAMES = 3
const RESPAWN_DELAY_MS = 220
const BULLET_SPEED = 2.4 // percent of battlefield height per frame
const HIT_RADIUS = 6 // percent
const FIRE_INTERVAL_MS = 450
const PARTICLE_ANGLES = [0, 60, 120, 180, 240, 300]
const POINTS_PER_HIT = 10
const HIGH_SCORE_KEY = 'invaders-high-score'
const RAINBOW_DURATION_MS = 6000

const randomColor = () =>
  ALIEN_COLORS[Math.floor(Math.random() * ALIEN_COLORS.length)]
const randomX = () => 5 + Math.random() * 90

function makePool(): Alien[] {
  return Array.from({ length: ALIEN_COUNT }, (_, i) => ({
    id: `a${i}`,
    x: randomX(),
    y: Math.random() * 60 - 10, // staggered so it's already full on first paint
    color: randomColor(),
    hidden: false,
  }))
}

const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n))

function SpaceInvaders() {
  const battlefieldRef = useRef<HTMLDivElement>(null)
  const [shipX, setShipX] = useState(50)
  const [aliens, setAliens] = useState<Alien[]>(() => makePool())
  const [bullets, setBullets] = useState<Bullet[]>([])
  const [explosions, setExplosions] = useState<Explosion[]>([])
  const [soundOn, setSoundOn] = useState(true)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [rainbow, setRainbow] = useState(false)

  const aliensRef = useRef(aliens)
  const bulletsRef = useRef(bullets)
  const shipXRef = useRef(shipX)
  const soundOnRef = useRef(soundOn)
  const frameRef = useRef(0)
  const respawnTimeouts = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    aliensRef.current = aliens
  }, [aliens])
  useEffect(() => {
    bulletsRef.current = bullets
  }, [bullets])
  useEffect(() => {
    soundOnRef.current = soundOn
  }, [soundOn])

  // First real click anywhere on the page satisfies the browser's
  // autoplay-gesture requirement, so sound-on-by-default actually works
  // once the visitor interacts at all (not just with this widget).
  useEffect(() => {
    const unlock = () => unlockAudio()
    window.addEventListener('pointerdown', unlock, { once: true })
    return () => window.removeEventListener('pointerdown', unlock)
  }, [])

  useEffect(() => {
    return () => {
      for (const t of respawnTimeouts.current) clearTimeout(t)
    }
  }, [])

  useEffect(() => {
    const stored = Number(localStorage.getItem(HIGH_SCORE_KEY))
    if (Number.isFinite(stored)) setHighScore(stored)
  }, [])

  useEffect(() => {
    const handleKonami = () => {
      setRainbow(true)
      window.setTimeout(() => setRainbow(false), RAINBOW_DURATION_MS)
    }
    window.addEventListener(KONAMI_EVENT, handleKonami)
    return () => window.removeEventListener(KONAMI_EVENT, handleKonami)
  }, [])

  // Single rAF loop: descends aliens, moves bullets up, and checks
  // collisions each frame. Reads current state via refs (not the
  // closed-over `aliens`/`bullets`) so the effect never needs to restart.
  useEffect(() => {
    let raf: number

    const tick = () => {
      frameRef.current += 1
      const currentBullets = bulletsRef.current
      let currentAliens = aliensRef.current

      if (frameRef.current % DESCEND_EVERY_N_FRAMES === 0) {
        currentAliens = currentAliens.map((a) => {
          if (a.hidden) return a
          const y = a.y + DESCEND_PER_TICK
          return y > 78
            ? { ...a, x: randomX(), y: -8, color: randomColor() }
            : { ...a, y }
        })
        aliensRef.current = currentAliens
        setAliens(currentAliens)
      }

      if (currentBullets.length > 0) {
        const hits: Alien[] = []
        const nextBullets: Bullet[] = []

        for (const bullet of currentBullets) {
          const y = bullet.y - BULLET_SPEED
          if (y < 0) continue

          const hit = currentAliens.find(
            (a) =>
              !a.hidden &&
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
          setAliens((prev) =>
            prev.map((a) => (hitIds.has(a.id) ? { ...a, hidden: true } : a)),
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

          setScore((prev) => {
            const next = prev + hits.length * POINTS_PER_HIT
            setHighScore((prevHigh) => {
              if (next <= prevHigh) return prevHigh
              localStorage.setItem(HIGH_SCORE_KEY, String(next))
              return next
            })
            return next
          })

          const t = setTimeout(() => {
            setAliens((prev) =>
              prev.map((a) =>
                hitIds.has(a.id)
                  ? { ...a, x: randomX(), y: -8, color: randomColor(), hidden: false }
                  : a,
              ),
            )
          }, RESPAWN_DELAY_MS)
          respawnTimeouts.current.push(t)
        }
      }

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

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
        className="pointer-events-auto font-pixel absolute top-20 right-4 border-2 border-border bg-panel/90 px-2 py-1 text-[10px] text-cyan transition-colors hover:border-cyan"
      >
        ♪ SOUND: {soundOn ? 'ON' : 'OFF'}
      </button>
      <p className="font-pixel absolute top-20 left-4 border-2 border-border bg-panel/90 px-2 py-1 text-[10px] text-yellow">
        ▸ MOVE TO STEER
      </p>
      <p className="font-pixel absolute top-20 left-1/2 -translate-x-1/2 border-2 border-border bg-panel/90 px-2 py-1 text-[10px] text-green">
        SCORE {score} · HI {highScore}
      </p>

      <div
        style={rainbow ? { animation: 'pixel-rainbow 1s linear infinite' } : undefined}
      >
        {aliens.map(
          (a) =>
            !a.hidden && (
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
      </div>

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
