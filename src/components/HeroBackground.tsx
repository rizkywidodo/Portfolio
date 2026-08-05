import { Suspense, lazy, useEffect, useState } from 'react'
import PixelStar from './PixelStar'

// Heavy (three.js) — only fetched when actually rendered, so mobile /
// reduced-motion visitors never pay for this bundle.
const HeroScene = lazy(() => import('./HeroScene'))

function useCanRender3D() {
  const [canRender, setCanRender] = useState(false)

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    const isDesktop = window.matchMedia('(min-width: 768px)').matches
    setCanRender(!reducedMotion && isDesktop)
  }, [])

  return canRender
}

function HeroBackground() {
  const canRender3D = useCanRender3D()

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* Soft ambient light wash behind the gem — kept blurred since this
          reads as lighting, not pixel art, so it doesn't fight the crisp
          pixel elements. */}
      <div className="absolute top-24 -right-16 h-72 w-72 rounded-full bg-cyan/20 blur-3xl" />

      <PixelStar
        color="pink"
        size={10}
        className="absolute top-32 left-[8%] [animation-delay:-1s]"
      />
      <PixelStar
        color="yellow"
        size={8}
        className="absolute top-[55%] left-[20%] [animation-delay:-3s]"
      />
      <PixelStar
        color="cyan"
        size={10}
        className="absolute top-[20%] left-[55%] [animation-delay:-2s]"
      />
      <PixelStar
        color="pink"
        size={8}
        className="absolute top-[70%] left-[45%] [animation-delay:-4s]"
      />

      {canRender3D && (
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      )}
    </div>
  )
}

export default HeroBackground
