import { useEffect, useState } from 'react'
import AmbientAliens from './AmbientAliens'
import PixelSprite from './PixelSprite'
import SpaceInvaders from './SpaceInvaders'
import { PLANET_PATTERN, planetColors } from './pixelSprites'

const stars = [
  { x: 6, y: 10 }, { x: 14, y: 28 }, { x: 22, y: 6 }, { x: 30, y: 45 },
  { x: 9, y: 60 }, { x: 38, y: 15 }, { x: 45, y: 55 }, { x: 4, y: 80 },
  { x: 58, y: 8 }, { x: 66, y: 30 }, { x: 74, y: 60 }, { x: 82, y: 12 },
  { x: 90, y: 45 }, { x: 96, y: 70 }, { x: 50, y: 85 }, { x: 26, y: 90 },
  { x: 70, y: 88 }, { x: 12, y: 40 },
]

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    () => window.matchMedia('(min-width: 1024px)').matches,
  )

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 1024px)')
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  return isDesktop
}

function HeroBackground() {
  // On narrow screens the Hero text wraps to full width, leaving no clear
  // space for the full battlefield, so the interactive game + star/planet
  // decor is desktop/tablet only. Mobile/tablet gets a CSS-only ambient
  // drift instead of the JS game loop — cheap enough to run forever.
  const isDesktop = useIsDesktop()

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute top-24 -right-16 h-72 w-72 rounded-full bg-cyan/10 blur-3xl" />

      {isDesktop ? (
        <>
          {stars.map((star, i) => (
            <span
              key={i}
              className="animate-blink absolute h-0.75 w-0.75 bg-slate-300"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                animationDelay: `${(i % 6) * 0.3}s`,
              }}
            />
          ))}

          <PixelSprite
            rows={PLANET_PATTERN}
            colorMap={planetColors('#4a7dff', '#26418f')}
            pixelSize={4}
            className="animate-float absolute opacity-70"
            style={{ left: '4%', top: '6%' }}
          />
          <PixelSprite
            rows={PLANET_PATTERN}
            colorMap={planetColors('#ff4fd8', '#a01e8a')}
            pixelSize={3}
            className="animate-float absolute opacity-60 [animation-delay:-3s]"
            style={{ left: '2%', top: '85%' }}
          />

          <SpaceInvaders />
        </>
      ) : (
        <AmbientAliens />
      )}
    </div>
  )
}

export default HeroBackground
