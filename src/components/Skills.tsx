import { useState } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import PixelSprite from './PixelSprite'
import { PAUSE_PATTERN, PLAY_PATTERN } from './pixelSprites'

const coreStack = ['React', 'TypeScript', 'Supabase', 'Vite', 'PRD/BRD Writing']

const alsoWorkedWith = [
  'HTML',
  'CSS',
  'JavaScript',
  'Python',
  'Flask',
  'SQL',
  'Vercel',
  'Git/GitHub',
  'Figma',
  'Cloudflare',
  'SMTP (Brevo)',
]

const SECONDS_PER_ITEM = 2.2

function Skills() {
  const reducedMotion = usePrefersReducedMotion()
  const [paused, setPaused] = useState(false)
  const effectivelyPaused = paused || reducedMotion
  const duration = alsoWorkedWith.length * 2 * SECONDS_PER_ITEM

  return (
    <section id="skills" className="border-t-4 border-border">
      <div className="mx-auto max-w-5xl px-6 pt-16 pb-10 lg:pt-24 lg:pb-16">
        <h2 className="font-pixel text-xl text-cyan">// SKILLS</h2>

        <p className="font-pixel mt-10 text-[11px] tracking-widest text-muted">
          CORE STACK
        </p>
        <div className="mt-4 flex flex-wrap gap-4">
          {coreStack.map((skill) => (
            <span
              key={skill}
              className="font-pixel border-4 border-cyan bg-panel px-5 py-3 text-[12px] tracking-wide text-cyan shadow-[0_0_18px_rgba(46,230,255,0.35)]"
            >
              {skill.toUpperCase()}
            </span>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-between gap-4">
          <p className="font-pixel text-[11px] tracking-widest text-muted">
            ALSO WORKED WITH
          </p>
          <button
            type="button"
            onClick={() => setPaused((prev) => !prev)}
            aria-pressed={effectivelyPaused}
            aria-label={
              effectivelyPaused ? 'Resume scrolling list' : 'Pause scrolling list'
            }
            className="group cursor-pointer border-2 border-border px-2 py-1.5 transition-colors hover:border-cyan"
          >
            <PixelSprite
              rows={effectivelyPaused ? PLAY_PATTERN : PAUSE_PATTERN}
              colorMap={{ X: 'currentColor' }}
              pixelSize={2}
              className="text-muted transition-colors group-hover:text-cyan"
            />
          </button>
        </div>
        <div
          className="relative mt-4 overflow-hidden mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <ul className="sr-only">
            {alsoWorkedWith.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
          <div
            aria-hidden="true"
            className="flex w-max items-center gap-3 whitespace-nowrap"
            style={{
              animationName: 'marquee-left',
              animationDuration: `${duration}s`,
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
              animationPlayState: effectivelyPaused ? 'paused' : 'running',
            }}
          >
            {[...alsoWorkedWith, ...alsoWorkedWith].map((skill, i) => (
              <span
                key={i}
                className="font-pixel border-2 border-border px-3 py-1.5 text-[11px] tracking-wide text-slate-400"
              >
                {skill.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
