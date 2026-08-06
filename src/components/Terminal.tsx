import { useEffect, useRef, useState } from 'react'

type Line = { command?: string; output: string[] }

const COMMANDS: Record<string, string[]> = {
  whoami: [
    'Muhammad Rizky Widodo',
    'Informatics Engineering graduate, ITS 2025',
    'Full-stack developer, currently job hunting.',
  ],
  skills: [
    'Frontend:   React, TypeScript, Vite, HTML, CSS, JavaScript',
    'Backend:    Supabase (PostgreSQL), Flask, Python, SQL',
    'DevOps:     Vercel, Cloudflare, Git/GitHub, SMTP (Brevo)',
    'Product:    PRD/BRD writing, Figma, Microsoft Forms, Excel',
  ],
  contact: [
    'Email:    mrizkywidodo@gmail.com',
    'LinkedIn: linkedin.com/in/muhammad-rizky-widodo',
  ],
  education: [
    'Institut Teknologi Sepuluh Nopember (ITS)',
    'Bachelor of Informatics Engineering',
    'GPA 3.32 · TOEFL ITP 540 · Class of 2025',
  ],
  projects: [
    '3 case studies from an internship at MRT Jakarta.',
    "Type 'open projects' or use the nav above to see them.",
  ],
  sudo: ["Permission denied. This isn't your terminal, it's mine."],
}

const HELP_LINES = [
  'Available commands:',
  '  whoami      about me',
  '  education   degree & scores',
  '  skills      tech stack',
  '  projects    case studies',
  '  contact     email & linkedin',
  '  clear       clear the screen',
  '  help        show this list',
]

function runCommand(raw: string): string[] {
  const cmd = raw.trim().toLowerCase()
  if (cmd === '') return []
  if (cmd === 'help') return HELP_LINES
  if (cmd === 'open projects') {
    window.location.hash = '#/projects'
    return ['Opening /projects...']
  }
  if (COMMANDS[cmd]) return COMMANDS[cmd]
  return [`command not found: ${cmd}`, "type 'help' for a list of commands"]
}

function Terminal() {
  const [history, setHistory] = useState<Line[]>([
    {
      output: [
        'RW_ terminal v1.0 — type "help" to get started',
      ],
    },
  ])
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [history])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const command = input
    if (command.trim().toLowerCase() === 'clear') {
      setHistory([])
    } else {
      setHistory((prev) => [...prev, { command, output: runCommand(command) }])
    }
    setInput('')
  }

  return (
    <section id="terminal" className="mx-auto max-w-5xl px-6 py-24">
      <h2 className="font-pixel text-xl text-cyan">// TERMINAL</h2>
      <p className="mt-4 max-w-xl text-sm text-slate-400">
        Try it — type a command below.
      </p>

      <div
        className="mt-10 border-4 border-border bg-panel p-6 text-sm"
        onClick={() => inputRef.current?.focus()}
      >
        <div ref={scrollRef} className="max-h-80 space-y-3 overflow-y-auto">
          {history.map((line, i) => (
            <div key={i}>
              {line.command !== undefined && (
                <p className="text-cyan">
                  <span className="text-green">guest@rizky</span>
                  <span className="text-slate-500">:~$</span> {line.command}
                </p>
              )}
              {line.output.map((text, j) => (
                <p key={j} className="text-slate-400">
                  {text}
                </p>
              ))}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="mt-3 flex items-center gap-2">
          <span className="text-green">guest@rizky</span>
          <span className="text-slate-500">:~$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoComplete="off"
            spellCheck={false}
            className="flex-1 bg-transparent text-cyan caret-cyan outline-none"
          />
        </form>
      </div>
    </section>
  )
}

export default Terminal
