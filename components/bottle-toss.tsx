'use client'

import { GlassBottle } from '@/components/glass-bottle'

export function BottleToss({
  mode,
  label,
}: {
  mode: 'send' | 'receive'
  label: string
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[oklch(0.13_0.04_248/72%)] backdrop-blur-sm"
    >
      <div className="relative flex h-80 w-full max-w-md items-center justify-center">
        {/* splash ripples on the water line */}
        <span
          data-motion
          className="absolute bottom-10 size-24 rounded-full border-2 border-primary/60"
          style={{ animation: 'ripple 1.6s ease-out 0.5s infinite' }}
        />
        <span
          data-motion
          className="absolute bottom-10 size-24 rounded-full border border-accent/50"
          style={{ animation: 'ripple 1.6s ease-out 1s infinite' }}
        />

        <div
          data-motion
          className="absolute top-1/2 left-1/2"
          style={{
            animation: `${mode === 'send' ? 'toss-away' : 'toss-in'} 2.2s ease-in-out forwards`,
          }}
        >
          <GlassBottle className="h-40 w-auto drop-shadow-[0_10px_30px_oklch(0.75_0.13_195/45%)]" />
        </div>
      </div>

      <p className="absolute bottom-24 px-6 text-center font-serif text-lg tracking-wide text-primary text-balance">
        {label}
      </p>
    </div>
  )
}
