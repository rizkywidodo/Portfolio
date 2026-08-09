export const SHIP_PATTERN = [
  '...C...',
  '..CCC..',
  '..CCC..',
  '.CCCCC.',
  'CCCCCCC',
  '.F.F.F.',
  '..F.F..',
]

export const SHIP_COLORS: Record<string, string> = {
  C: 'var(--color-cyan)',
  F: 'var(--color-yellow)',
}

export const ALIEN_PATTERN = [
  '..A....A..',
  '...A..A...',
  '..AAAAAA..',
  '.AA.AA.AA.',
  'AAAAAAAAAA',
  'A.AAAAAA.A',
  'A.A....A.A',
  '..AA..AA..',
]

export const BOSS_PATTERN = [
  '...BBBBB...',
  '..BBBBBBB..',
  '.BEBBBBBEB.',
  'BBBBBBBBBBB',
  'BB.BBBBB.BB',
  'BBBB.B.BBBB',
  '.BB.....BB.',
  '..B.....B..',
]

export const BOSS_COLORS: Record<string, string> = {
  B: '#ff2b6d',
  E: 'var(--color-yellow)',
}

export const PLANET_PATTERN = [
  '...PPP...',
  '..PPPPP..',
  '.PPPdPPP.',
  'PPPPdPPPP',
  'PPdPPPPPP',
  'PPPPPPdPP',
  '.PPPPPPP.',
  '..PPPPP..',
  '...PPP...',
]

export const planetColors = (base: string, crater: string) => ({
  P: base,
  d: crater,
})

export const GRAD_PATTERN = [
  '..GGGGG..',
  '.GGGGGGG.',
  '...PPP...',
  '..PPPPP..',
  '.PPPPPPP.',
  '.PP.P.PP.',
  '..P...P..',
]

export const GRAD_COLORS: Record<string, string> = {
  G: 'var(--color-yellow)',
  P: 'var(--color-cyan)',
}

// Small on-brand control glyphs, drawn the same way as every other sprite
// on the site — replaces raw Unicode ▶/❚❚/■ so control icons match the
// hand-drawn alien/ship/boss art instead of borrowing a system font glyph.
export const PLAY_PATTERN = [
  '.......',
  '.X.....',
  '.XX....',
  '.XXX...',
  '.XXXX..',
  '.XXX...',
  '.XX....',
  '.X.....',
]

export const PAUSE_PATTERN = [
  '.......',
  '.XX.XX.',
  '.XX.XX.',
  '.XX.XX.',
  '.XX.XX.',
  '.XX.XX.',
  '.......',
]

export const STOP_PATTERN = [
  '.......',
  '.XXXXX.',
  '.XXXXX.',
  '.XXXXX.',
  '.XXXXX.',
  '.XXXXX.',
  '.......',
]
