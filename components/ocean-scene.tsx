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
        <circle cx="48" cy="14" r="2" fill="oklch(0.34 0.078 274)" />
      </svg>
    </div>
  )
}

export function OceanScene() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
      {/* pastel dusk surface fading into soft aqua depth */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.93_0.05_15)_0%,oklch(0.94_0.035_60)_14%,oklch(0.93_0.04_205)_38%,oklch(0.89_0.05_192)_66%,oklch(0.85_0.055_240)_100%)]" />

      {/* soft light shafts */}
      <div
        data-motion
        className="absolute -top-1/4 left-[8%] h-[150%] w-40 bg-[linear-gradient(180deg,oklch(0.99_0.02_60/85%),transparent)] blur-2xl"
        style={{ animation: 'caustics 11s ease-in-out infinite' }}
      />
      <div
        data-motion
        className="absolute -top-1/4 left-[42%] h-[150%] w-24 bg-[linear-gradient(180deg,oklch(0.97_0.04_20/70%),transparent)] blur-2xl"
        style={{ animation: 'caustics 14s ease-in-out 2s infinite' }}
      />
      <div
        data-motion
        className="absolute -top-1/4 right-[16%] h-[150%] w-32 bg-[linear-gradient(180deg,oklch(0.98_0.025_195/80%),transparent)] blur-2xl"
        style={{ animation: 'caustics 17s ease-in-out 4s infinite' }}
      />

      {/* reef + mermaid silhouette scene */}
      <div
        data-motion
        className="absolute -inset-x-[8%] bottom-0 h-[72vh] bg-cover bg-bottom bg-no-repeat opacity-70"
        style={{
          backgroundImage: 'url(/images/reef-scene.png)',
          animation: 'drift 40s ease-in-out infinite',
          maskImage:
            'linear-gradient(180deg, transparent 0%, oklch(0 0 0 / 55%) 22%, black 55%), linear-gradient(90deg, transparent 0%, black 12%, black 88%, transparent 100%)',
          maskComposite: 'intersect',
        }}
      />

      {/* fish schools */}
      <Fish top="18%" color="oklch(0.78 0.09 15)" duration="46s" delay="0s" scale={0.75} />
      <Fish top="34%" color="oklch(0.66 0.09 250)" duration="62s" delay="6s" scale={1} />
      <Fish top="52%" color="oklch(0.74 0.08 190)" duration="54s" delay="14s" scale={0.6} />
      <Fish top="70%" color="oklch(0.78 0.09 15)" duration="72s" delay="22s" scale={0.9} />

      {/* rising bubbles */}
      {BUBBLES.map((bubble) => (
        <span
          key={bubble.left}
          data-motion
          className="absolute bottom-0 rounded-full border border-[oklch(0.99_0.015_200/85%)] bg-[oklch(1_0_0/45%)]"
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
        className="absolute -inset-x-[6%] bottom-0 h-[32vh] bg-cover bg-bottom bg-no-repeat opacity-95"
        style={{
          backgroundImage: 'url(/images/coral-foreground.png)',
          animation: 'sway 18s ease-in-out infinite',
          maskImage: 'linear-gradient(180deg, transparent 0%, oklch(0 0 0 / 60%) 28%, black 62%)',
        }}
      />

      {/* pale wash so text stays readable over the reef */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.97_0.02_205/72%)_0%,oklch(0.94_0.03_200/45%)_45%,oklch(0.85_0.055_240/30%)_100%)]" />
    </div>
  )
}
