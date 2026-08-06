const SEGMENTS = 10

// Straight pixel snake that continuously drifts across the section —
// no waiting, no turns, just a critter passing through on a loop.
function PixelSnake() {
  return (
    <div className="relative mb-8 h-8 w-full overflow-hidden" aria-hidden="true">
      <div className="animate-snake-cross absolute top-1/2 left-0 flex -translate-y-1/2 items-center gap-1">
        {Array.from({ length: SEGMENTS }, (_, i) => {
          const isHead = i === 0
          return (
            <span
              key={i}
              className={`block bg-green ${isHead ? 'relative h-6 w-6' : 'h-5 w-5'}`}
              style={{ opacity: 1 - i * 0.08 }}
            >
              {isHead && (
                <>
                  <span className="absolute top-1 right-1 h-1 w-1 bg-bg" />
                  <span className="absolute right-1 bottom-1 h-1 w-1 bg-bg" />
                </>
              )}
            </span>
          )
        })}
      </div>
    </div>
  )
}

export default PixelSnake
