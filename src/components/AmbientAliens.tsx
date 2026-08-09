import { useState } from 'react'
import PixelSprite from './PixelSprite'
import { ALIEN_PATTERN } from './pixelSprites'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const ALIEN_COLORS = [
  'var(--color-pink)',
  'var(--color-yellow)',
  'var(--color-green)',
  'var(--color-cyan)',
]
const ALIEN_COUNT = 6
const START_TOP = -40 // px, just above the section so they visibly fall in

type Drifter = { x: number; duration: number; delay: number; color: string }

function makeDrifters(): Drifter[] {
  return Array.from({ length: ALIEN_COUNT }, () => ({
    x: 5 + Math.random() * 90,
    duration: 14 + Math.random() * 10,
    delay: -Math.random() * 20,
    color: ALIEN_COLORS[Math.floor(Math.random() * ALIEN_COLORS.length)],
  }))
}

// Lightweight stand-in for SpaceInvaders on phones/tablets: a handful of
// aliens drifting down on plain CSS keyframes, no rAF/state loop driving
// them — cheap enough to leave running forever on low-power devices.
//
// They fall from above the section, behind the hero text (which sits in
// its own `z-10` stacking context) — same "background critters drifting
// past" effect as the desktop planets/stars, just animated. The section's
// own `overflow-hidden` clips them once they fall past its bottom edge.
function AmbientAliens() {
  const [drifters] = useState(makeDrifters)
  const reducedMotion = usePrefersReducedMotion()

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {drifters.map((d, i) => (
        <PixelSprite
          key={i}
          rows={ALIEN_PATTERN}
          colorMap={{ A: d.color }}
          pixelSize={4}
          className="absolute"
          style={{
            left: `${d.x}%`,
            // Reduced motion: rest the aliens spread down the section
            // instead of running the fall loop forever.
            top: reducedMotion ? `${12 + (i % 4) * 22}%` : START_TOP,
            willChange: reducedMotion ? undefined : 'transform',
            animation: reducedMotion
              ? 'none'
              : `alien-fall ${d.duration}s linear infinite`,
            animationDelay: `${d.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

export default AmbientAliens
