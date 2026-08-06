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
  C: '#2ee6ff',
  F: '#ffe14d',
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
