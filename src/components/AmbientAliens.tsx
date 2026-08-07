import { useState } from 'react'
import PixelSprite from './PixelSprite'
import { ALIEN_PATTERN } from './pixelSprites'

const ALIEN_COLORS = ['#ff4fd8', '#ffe14d', '#7dffb3', '#2ee6ff']
const ALIEN_COUNT = 6

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
function AmbientAliens() {
  const [drifters] = useState(makeDrifters)

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
            top: '-10%',
            willChange: 'transform',
            animation: `alien-fall ${d.duration}s linear infinite`,
            animationDelay: `${d.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

export default AmbientAliens
