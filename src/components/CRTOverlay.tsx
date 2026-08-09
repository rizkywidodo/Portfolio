import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const BOOT_KEY = 'crt-booted'
const BOOT_LINES = ['RW_ terminal v1.0 — booting...', '[OK] loading identity', '[OK] loading case studies']

// The whole site is framed as something running on a CRT — scanlines and a
// vignette sit above every page permanently, and the very first paint of a
// session gets a brief boot sequence that power-flickers into the real
// page. Session-scoped (sessionStorage), not per-page: it plays once when
// the tab opens, not every time you navigate between routes.
//
// The boot screen's own CSS animation (crt-power-on, index.css) drives
// when it disappears via onAnimationEnd, not a duplicated JS timer — a
// hardcoded setTimeout here previously fell out of sync with the CSS
// duration when that got tuned, cutting the fade off mid-transition.
function CRTOverlay() {
  const reducedMotion = usePrefersReducedMotion()
  // Read-only initializer (StrictMode-safe, no side effect during render);
  // the sessionStorage write happens separately in the effect below.
  const [booting, setBooting] = useState(
    () => !reducedMotion && sessionStorage.getItem(BOOT_KEY) !== '1',
  )

  useEffect(() => {
    if (booting) sessionStorage.setItem(BOOT_KEY, '1')
  }, [booting])

  return (
    <>
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[150] crt-vignette" />
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[160] crt-scanlines" />
      {!reducedMotion && (
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[170] crt-ambient-flicker" />
      )}
      {booting && (
        <div
          aria-hidden="true"
          onAnimationEnd={() => setBooting(false)}
          className="pointer-events-none fixed inset-0 z-[300] flex flex-col items-center justify-center gap-2 bg-bg crt-boot-screen"
        >
          {BOOT_LINES.map((line) => (
            <p key={line} className="font-pixel text-[11px] text-green">
              {line}
            </p>
          ))}
        </div>
      )}
    </>
  )
}

export default CRTOverlay
