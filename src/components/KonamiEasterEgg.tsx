import { useCallback, useEffect, useState } from 'react'
import { useKonamiCode } from '../hooks/useKonamiCode'

export const KONAMI_EVENT = 'konami-activate'
export const BOSS_DEFEATED_EVENT = 'boss-defeated'

function KonamiEasterEgg() {
  const [visible, setVisible] = useState(false)

  const activate = useCallback(() => {
    window.dispatchEvent(new Event(KONAMI_EVENT))
  }, [])

  useKonamiCode(activate)

  useEffect(() => {
    const showVictory = () => {
      setVisible(true)
      window.setTimeout(() => setVisible(false), 8000)
    }
    window.addEventListener(BOSS_DEFEATED_EVENT, showVictory)
    return () => window.removeEventListener(BOSS_DEFEATED_EVENT, showVictory)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed inset-x-0 bottom-6 z-[100] flex justify-center px-4">
      <div className="font-pixel animate-float border-4 border-cyan bg-panel px-6 py-4 text-center text-[11px] text-cyan shadow-[6px_6px_0_0_#2a3152]">
        <p>&gt; BOSS DEFEATED — YOU WIN</p>
        <p className="mt-3 text-slate-300">
          Let's talk —{' '}
          <a
            href="mailto:mrizkywidodo@gmail.com"
            className="text-pink underline"
          >
            mrizkywidodo@gmail.com
          </a>
        </p>
      </div>
    </div>
  )
}

export default KonamiEasterEgg
