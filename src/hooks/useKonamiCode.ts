import { useEffect, useRef } from 'react'

const SEQUENCE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
]

export function useKonamiCode(onActivate: () => void) {
  const position = useRef(0)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key
      const expected = SEQUENCE[position.current]

      if (key === expected) {
        position.current += 1
        if (position.current === SEQUENCE.length) {
          position.current = 0
          onActivate()
        }
      } else {
        position.current = key === SEQUENCE[0] ? 1 : 0
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onActivate])
}
