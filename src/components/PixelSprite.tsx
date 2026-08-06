type Props = {
  rows: string[]
  colorMap: Record<string, string>
  pixelSize?: number
  className?: string
  style?: React.CSSProperties
}

// Renders ASCII pixel-art (each character in `rows` is one pixel, '.' is
// transparent) as crisp <rect> pixels — no raster image asset needed.
function PixelSprite({ rows, colorMap, pixelSize = 4, className, style }: Props) {
  const width = rows[0]?.length ?? 0
  const height = rows.length

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width * pixelSize}
      height={height * pixelSize}
      shapeRendering="crispEdges"
      className={className}
      style={style}
    >
      {rows.flatMap((row, y) =>
        [...row].map((ch, x) =>
          ch === '.' ? null : (
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width={1}
              height={1}
              fill={colorMap[ch] ?? colorMap.default}
            />
          ),
        ),
      )}
    </svg>
  )
}

export default PixelSprite
