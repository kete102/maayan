export function WaveDivider({
  className = '',
  flip = false,
}: {
  className?: string
  flip?: boolean
}) {
  return (
    <div className={className} aria-hidden="true">
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="h-12 w-full md:h-20"
        style={flip ? { transform: 'rotate(180deg)' } : undefined}
      >
        <path
          d="M0,40 C240,80 480,0 720,32 C960,64 1200,16 1440,40 L1440,80 L0,80 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  )
}
