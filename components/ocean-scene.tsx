const BUBBLES = [
  { left: '6%', size: 10, delay: '0s', duration: '17s' },
  { left: '14%', size: 6, delay: '3s', duration: '13s' },
  { left: '23%', size: 14, delay: '7s', duration: '21s' },
  { left: '35%', size: 8, delay: '1.5s', duration: '15s' },
  { left: '44%', size: 5, delay: '9s', duration: '12s' },
  { left: '56%', size: 12, delay: '4.5s', duration: '19s' },
  { left: '66%', size: 7, delay: '11s', duration: '16s' },
  { left: '75%', size: 9, delay: '2.5s', duration: '14s' },
  { left: '84%', size: 5, delay: '6s', duration: '18s' },
  { left: '93%', size: 13, delay: '8.5s', duration: '22s' },
]

function Fish({
  className,
  color,
  duration,
  delay,
  top,
  scale,
}: {
  className?: string
  color: string
  duration: string
  delay: string
  top: string
  scale: number
}) {
  return (
    <div
      data-motion
      className={className}
      style={{
        position: 'absolute',
        top,
        animation: `swim ${duration} linear ${delay} infinite`,
        transform: `scale(${scale})`,
      }}
    >
      <svg width="72" height="34" viewBox="0 0 72 34" aria-hidden="true">
        <path
          d="M4 17c10-13 30-17 44-9 6 3 10 7 12 9-2 2-6 6-12 9-14 8-34 4-44-9z"
          fill={color}
          opacity="0.85"
        />
        <path d="M4 17 0 5c8 2 10 7 10 12S8 27 0 29z" fill={color} opacity="0.6" />
        <circle cx="48" cy="14" r="2" fill="oklch(0.19 0.05 244)" />
      </svg>
    </div>
  )
}

export function OceanScene() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
      {/* depth gradient: sunlit surface fading to abyss */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.36_0.09_215)_0%,oklch(0.27_0.07_232)_35%,oklch(0.19_0.055_244)_70%,oklch(0.13_0.04_248)_100%)]" />

      {/* light shafts */}
      <div
        data-motion
        className="absolute -top-1/4 left-[8%] h-[150%] w-40 bg-[linear-gradient(180deg,oklch(0.9_0.08_195/45%),transparent)] blur-2xl"
        style={{ animation: 'caustics 11s ease-in-out infinite' }}
      />
      <div
        data-motion
        className="absolute -top-1/4 left-[42%] h-[150%] w-24 bg-[linear-gradient(180deg,oklch(0.9_0.08_195/40%),transparent)] blur-2xl"
        style={{ animation: 'caustics 14s ease-in-out 2s infinite' }}
      />
      <div
        data-motion
        className="absolute -top-1/4 right-[16%] h-[150%] w-32 bg-[linear-gradient(180deg,oklch(0.9_0.08_195/35%),transparent)] blur-2xl"
        style={{ animation: 'caustics 17s ease-in-out 4s infinite' }}
      />

      {/* reef + mermaid silhouette scene */}
      <div
        data-motion
        className="absolute inset-x-0 bottom-0 h-[70vh] bg-cover bg-bottom bg-no-repeat opacity-60"
        style={{ backgroundImage: 'url(/images/reef-scene.png)', animation: 'drift 40s ease-in-out infinite' }}
      />

      {/* fish schools */}
      <Fish top="18%" color="oklch(0.79 0.12 82)" duration="46s" delay="0s" scale={0.75} />
      <Fish top="34%" color="oklch(0.75 0.13 195)" duration="62s" delay="6s" scale={1} />
      <Fish top="52%" color="oklch(0.68 0.1 200)" duration="54s" delay="14s" scale={0.6} />
      <Fish top="70%" color="oklch(0.79 0.12 82)" duration="72s" delay="22s" scale={0.9} />

      {/* rising bubbles */}
      {BUBBLES.map((bubble) => (
        <span
          key={bubble.left}
          data-motion
          className="absolute bottom-0 rounded-full border border-[oklch(0.95_0.03_190/60%)] bg-[oklch(0.9_0.05_195/25%)]"
          style={{
            left: bubble.left,
            width: bubble.size,
            height: bubble.size,
            animation: `rise ${bubble.duration} linear ${bubble.delay} infinite`,
          }}
        />
      ))}

      {/* foreground coral seabed */}
      <div
        data-motion
        className="absolute inset-x-0 bottom-0 h-[30vh] bg-cover bg-bottom bg-no-repeat opacity-90"
        style={{
          backgroundImage: 'url(/images/coral-foreground.png)',
          animation: 'sway 18s ease-in-out infinite',
        }}
      />

      {/* vignette so text stays readable */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,oklch(0.13_0.04_248/85%)_100%)]" />
    </div>
  )
}
