const colors = {
  cyan: '#2ee6ff',
  pink: '#ff4fd8',
  yellow: '#ffe14d',
}

type Props = {
  color?: keyof typeof colors
  size?: number
  className?: string
}

// A tiny 5x5 pixel-grid star, drawn with box-shadow so it stays crisp
// at any scale instead of relying on a raster asset.
function PixelStar({ color = 'cyan', size = 12, className = '' }: Props) {
  const c = colors[color]
  const px = size / 5

  return (
    <div
      className={`animate-float ${className}`}
      style={{
        width: px,
        height: px,
        background: c,
        boxShadow: `
          ${px * 2}px 0 0 ${c},
          ${-px * 2}px 0 0 ${c},
          0 ${px * 2}px 0 ${c},
          0 ${-px * 2}px 0 ${c}
        `,
      }}
    />
  )
}

export default PixelStar
