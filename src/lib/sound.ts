let ctx: AudioContext | null = null

function getContext() {
  if (!ctx) ctx = new AudioContext()
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

// Call once from a real user gesture (click) so the browser's autoplay
// policy allows audio afterward — nothing plays until this has run.
export function unlockAudio() {
  getContext()
}

export function playShoot() {
  const audio = getContext()
  const osc = audio.createOscillator()
  const gain = audio.createGain()
  osc.type = 'square'
  osc.frequency.setValueAtTime(880, audio.currentTime)
  osc.frequency.exponentialRampToValueAtTime(220, audio.currentTime + 0.1)
  gain.gain.setValueAtTime(0.06, audio.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + 0.1)
  osc.connect(gain).connect(audio.destination)
  osc.start()
  osc.stop(audio.currentTime + 0.1)
}

export function playCoin() {
  const audio = getContext()
  const now = audio.currentTime
  ;[988, 1319].forEach((freq, i) => {
    const start = now + i * 0.08
    const osc = audio.createOscillator()
    const gain = audio.createGain()
    osc.type = 'square'
    osc.frequency.setValueAtTime(freq, start)
    gain.gain.setValueAtTime(0.07, start)
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.15)
    osc.connect(gain).connect(audio.destination)
    osc.start(start)
    osc.stop(start + 0.15)
  })
}

export function playInsert() {
  const audio = getContext()
  const osc = audio.createOscillator()
  const gain = audio.createGain()
  osc.type = 'square'
  osc.frequency.setValueAtTime(180, audio.currentTime)
  osc.frequency.exponentialRampToValueAtTime(90, audio.currentTime + 0.09)
  gain.gain.setValueAtTime(0.12, audio.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + 0.1)
  osc.connect(gain).connect(audio.destination)
  osc.start()
  osc.stop(audio.currentTime + 0.1)
}

export function playSelect() {
  const audio = getContext()
  const osc = audio.createOscillator()
  const gain = audio.createGain()
  osc.type = 'square'
  osc.frequency.setValueAtTime(520, audio.currentTime)
  gain.gain.setValueAtTime(0.05, audio.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + 0.07)
  osc.connect(gain).connect(audio.destination)
  osc.start()
  osc.stop(audio.currentTime + 0.07)
}

export function playHop() {
  const audio = getContext()
  const osc = audio.createOscillator()
  const gain = audio.createGain()
  osc.type = 'square'
  osc.frequency.setValueAtTime(300, audio.currentTime)
  osc.frequency.exponentialRampToValueAtTime(700, audio.currentTime + 0.12)
  gain.gain.setValueAtTime(0.08, audio.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + 0.15)
  osc.connect(gain).connect(audio.destination)
  osc.start()
  osc.stop(audio.currentTime + 0.15)
}

export function playGameOver() {
  const audio = getContext()
  const now = audio.currentTime
  const notes = [392, 349, 294, 220] // descending G4-F4-D4-A3, classic "you died" jingle
  notes.forEach((freq, i) => {
    const start = now + i * 0.12
    const osc = audio.createOscillator()
    const gain = audio.createGain()
    osc.type = 'square'
    osc.frequency.setValueAtTime(freq, start)
    gain.gain.setValueAtTime(0.09, start)
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.22)
    osc.connect(gain).connect(audio.destination)
    osc.start(start)
    osc.stop(start + 0.22)
  })
}

export function playExplosion() {
  const audio = getContext()
  const duration = 0.25
  const bufferSize = Math.floor(audio.sampleRate * duration)
  const buffer = audio.createBuffer(1, bufferSize, audio.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize)
  }

  const noise = audio.createBufferSource()
  noise.buffer = buffer

  const filter = audio.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.setValueAtTime(1400, audio.currentTime)

  const gain = audio.createGain()
  gain.gain.setValueAtTime(0.18, audio.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + duration)

  noise.connect(filter).connect(gain).connect(audio.destination)
  noise.start()
}
