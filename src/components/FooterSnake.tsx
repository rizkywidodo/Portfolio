const SEGMENTS = 9

function FooterSnake() {
  return (
    <div className="relative mb-5 h-4 w-full overflow-hidden" aria-hidden="true">
      <div className="animate-snake-cross absolute top-1/2 left-0 flex -translate-y-1/2 items-center gap-0.5">
        {Array.from({ length: SEGMENTS }, (_, i) => {
          const isHead = i === 0
          const wave = Math.sin((i / (SEGMENTS - 1)) * Math.PI * 1.6) * 5
          return (
            <span
              key={i}
              className={`block bg-green ${isHead ? 'relative h-3 w-3' : 'h-2.5 w-2.5'}`}
              style={{
                transform: `translateY(${wave}px)`,
                opacity: 1 - i * 0.08,
              }}
            >
              {isHead && (
                <>
                  <span className="absolute top-0.5 right-0.5 h-0.5 w-0.5 bg-bg" />
                  <span className="absolute right-0.5 bottom-0.5 h-0.5 w-0.5 bg-bg" />
                </>
              )}
            </span>
          )
        })}
      </div>
    </div>
  )
}

export default FooterSnake
