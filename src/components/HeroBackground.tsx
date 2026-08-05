import { Suspense, lazy, useEffect, useState } from 'react'

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
      {/* CSS-only ambient glow: instant paint, and the full fallback on
          mobile / reduced-motion where the 3D scene never loads. */}
      <div className="animate-float absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-accent/30 blur-3xl dark:bg-accent-dark/20" />
      <div className="animate-float absolute top-40 right-[-6rem] h-72 w-72 rounded-full bg-accent/20 blur-3xl [animation-delay:-3s] dark:bg-accent-dark/15" />

      {canRender3D && (
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      )}
    </div>
  )
}

export default HeroBackground
