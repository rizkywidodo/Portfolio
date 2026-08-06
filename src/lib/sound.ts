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
