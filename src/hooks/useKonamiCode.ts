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

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false
  return (
    target.tagName === 'INPUT' ||
    target.tagName === 'TEXTAREA' ||
    target.isContentEditable
  )
}

export function useKonamiCode(onActivate: () => void) {
  const position = useRef(0)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Never hijack keys while the visitor is typing somewhere real (the
      // terminal input, or any future form field).
      if (isEditableTarget(e.target)) return

      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key
      const expected = SEQUENCE[position.current]

      if (key === expected) {
        // Only swallow the keystroke once genuinely mid-code — a single
        // matching key (e.g. one ArrowUp) is far more likely to be normal
        // page scrolling than the start of the sequence, and blocking it
        // would break keyboard scroll/navigation for every visitor.
        if (position.current > 0) e.preventDefault()
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
