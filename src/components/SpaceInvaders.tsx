import { useEffect, useRef, useState } from 'react'
import PixelSprite from './PixelSprite'
import {
  ALIEN_PATTERN,
  BOSS_COLORS,
  BOSS_PATTERN,
  SHIP_COLORS,
  SHIP_PATTERN,
} from './pixelSprites'
import { playExplosion, playShoot, unlockAudio } from '../lib/sound'
import { BOSS_DEFEATED_EVENT, KONAMI_EVENT } from './KonamiEasterEgg'

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
const BOSS_MAX_HP = 25
const BOSS_HIT_RADIUS = 13 // percent, bigger target than a regular alien
const BOSS_Y = 22 // percent, fixed height — the boss doesn't descend
const BOSS_SWAY_SPEED = 45 // lower = faster left-right sway
const BOSS_SWAY_RANGE = 28 // percent either side of center
const BOSS_DEFEAT_BONUS = 500
const CONFETTI_COUNT = 16

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
  const [playing, setPlaying] = useState(false)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [bossActive, setBossActive] = useState(false)
  const [bossHp, setBossHp] = useState(BOSS_MAX_HP)
  const [bossX, setBossX] = useState(50)

  const aliensRef = useRef(aliens)
  const bulletsRef = useRef(bullets)
  const shipXRef = useRef(shipX)
  const playingRef = useRef(playing)
  const bossActiveRef = useRef(bossActive)
  const bossHpRef = useRef(bossHp)
  const bossXRef = useRef(bossX)
  const frameRef = useRef(0)
  const respawnTimeouts = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    aliensRef.current = aliens
  }, [aliens])
  useEffect(() => {
    bulletsRef.current = bullets
  }, [bullets])
  useEffect(() => {
    playingRef.current = playing
  }, [playing])

  useEffect(() => {
    return () => {
      for (const t of respawnTimeouts.current) clearTimeout(t)
    }
  }, [])

  useEffect(() => {
    const stored = Number(localStorage.getItem(HIGH_SCORE_KEY))
    if (Number.isFinite(stored)) setHighScore(stored)
  }, [])

  // Konami code spawns a boss instead of just a color effect — reusing
  // the existing bullet/explosion machinery for a real mini boss fight.
  useEffect(() => {
    const handleKonami = () => {
      if (bossActiveRef.current) return
      bossHpRef.current = BOSS_MAX_HP
      setBossHp(BOSS_MAX_HP)
      bossActiveRef.current = true
      setBossActive(true)
      playingRef.current = true
      setPlaying(true)
      unlockAudio()
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

      const bossFight = bossActiveRef.current
      if (bossFight) {
        const bx = 50 + Math.sin(frameRef.current / BOSS_SWAY_SPEED) * BOSS_SWAY_RANGE
        bossXRef.current = bx
        setBossX(bx)
      }

      if (currentBullets.length > 0) {
        const hits: Alien[] = []
        const nextBullets: Bullet[] = []
        let bossHitCount = 0

        for (const bullet of currentBullets) {
          const y = bullet.y - BULLET_SPEED
          if (y < 0) continue

          if (bossFight) {
            if (
              Math.abs(bossXRef.current - bullet.x) < BOSS_HIT_RADIUS &&
              Math.abs(BOSS_Y - y) < BOSS_HIT_RADIUS
            ) {
              bossHitCount += 1
              continue
            }
            nextBullets.push({ ...bullet, y })
            continue
          }

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

        if (bossFight && bossHitCount > 0) {
          const nextHp = Math.max(0, bossHpRef.current - bossHitCount)
          bossHpRef.current = nextHp
          setBossHp(nextHp)
          if (playingRef.current) playExplosion()
          setExplosions((prev) => [
            ...prev,
            {
              id: `boss-hit-${Date.now()}`,
              x: bossXRef.current,
              y: BOSS_Y,
              color: '#ff2b6d',
            },
          ])

          if (nextHp <= 0) {
            bossActiveRef.current = false
            setBossActive(false)
            setExplosions((prev) => [
              ...prev,
              ...Array.from({ length: CONFETTI_COUNT }, (_, i) => ({
                id: `confetti-${i}-${Date.now()}`,
                x: 15 + Math.random() * 70,
                y: 10 + Math.random() * 45,
                color: randomColor(),
              })),
            ])
            setScore((prev) => {
              const next = prev + BOSS_DEFEAT_BONUS
              setHighScore((prevHigh) => {
                if (next <= prevHigh) return prevHigh
                localStorage.setItem(HIGH_SCORE_KEY, String(next))
                return next
              })
              return next
            })
            window.dispatchEvent(new Event(BOSS_DEFEATED_EVENT))
          }
        } else if (hits.length > 0) {
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
          if (playingRef.current) playExplosion()

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

  // Auto-fire from the ship's current x, no click required — only while playing.
  useEffect(() => {
    if (!playing) return
    const interval = setInterval(() => {
      setBullets((prev) => [
        ...prev,
        { id: `b${Date.now()}-${Math.random()}`, x: shipXRef.current, y: 84 },
      ])
      playShoot()
    }, FIRE_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [playing])

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!playingRef.current) return
    const rect = battlefieldRef.current?.getBoundingClientRect()
    if (!rect) return
    const pct = clamp(((e.clientX - rect.left) / rect.width) * 100, 3, 97)
    shipXRef.current = pct
    setShipX(pct)
  }

  const togglePlaying = () => {
    setPlaying((prev) => {
      const next = !prev
      if (next) unlockAudio()
      else setBullets([])
      return next
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
        onClick={togglePlaying}
        className={`pointer-events-auto font-pixel absolute top-20 right-4 border-2 px-2 py-1 text-[10px] transition-colors ${
          playing
            ? 'border-pink bg-panel/90 text-pink hover:border-cyan hover:text-cyan'
            : 'border-cyan bg-panel/90 text-cyan hover:border-pink hover:text-pink'
        }`}
      >
        {playing ? '■ STOP' : '▶ PLAY'}
      </button>
      <p className="font-pixel absolute top-20 left-4 border-2 border-border bg-panel/90 px-2 py-1 text-[10px] text-yellow">
        {playing ? '▸ MOVE TO STEER' : '▸ PRESS PLAY TO DEFEND'}
      </p>
      <p className="font-pixel absolute top-20 left-1/2 -translate-x-1/2 border-2 border-border bg-panel/90 px-2 py-1 text-[10px] text-green">
        SCORE {score} · HI {highScore}
      </p>

      {!bossActive &&
        aliens.map(
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

      {bossActive && (
        <div
          className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2"
          style={{ left: `${bossX}%`, top: `${BOSS_Y}%` }}
        >
          <p className="font-pixel text-[9px] text-pink">BOSS</p>
          <div className="h-2 w-32 border-2 border-border bg-panel">
            <div
              className="h-full bg-pink transition-[width] duration-150"
              style={{ width: `${(bossHp / BOSS_MAX_HP) * 100}%` }}
            />
          </div>
          <PixelSprite rows={BOSS_PATTERN} colorMap={BOSS_COLORS} pixelSize={9} />
        </div>
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

      {playing && (
        <PixelSprite
          rows={SHIP_PATTERN}
          colorMap={SHIP_COLORS}
          pixelSize={5}
          className="absolute top-[86%] -translate-x-1/2"
          style={{ left: `${shipX}%` }}
        />
      )}
    </div>
  )
}

export default SpaceInvaders
