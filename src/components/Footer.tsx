import { useEffect, useState } from 'react'

function formatUptime(ms: number) {
  const totalSeconds = Math.floor(ms / 1000)
  const h = String(Math.floor(totalSeconds / 3600)).padStart(2, '0')
  const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0')
  const s = String(totalSeconds % 60).padStart(2, '0')
  return `${h}:${m}:${s}`
}

function Footer() {
  const [uptime, setUptime] = useState('00:00:00')

  useEffect(() => {
    const start = Date.now()
    const interval = setInterval(() => {
      setUptime(formatUptime(Date.now() - start))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <footer className="border-t-4 border-border px-6 py-6 text-center font-pixel text-[11px] text-muted">
      <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
        <span className="inline-flex items-center gap-1.5 text-green">
          <span className="animate-blink h-1.5 w-1.5 bg-green" />
          [ONLINE] OPEN TO WORK
        </span>
        <span className="text-border">·</span>
        <span>SESSION UPTIME {uptime}</span>
      </p>
      <p className="mt-3">© {new Date().getFullYear()} MUHAMMAD RIZKY WIDODO</p>
    </footer>
  )
}

export default Footer
