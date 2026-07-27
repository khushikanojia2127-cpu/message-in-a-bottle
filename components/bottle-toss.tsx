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
      className="fixed inset-0 z-50 flex items-center justify-center bg-[linear-gradient(180deg,oklch(0.95_0.04_20/88%),oklch(0.89_0.05_205/92%))] backdrop-blur-sm"
    >
      <div className="relative flex h-80 w-full max-w-md items-center justify-center">
        {/* splash ripples on the water line */}
        <span
          data-motion
          className="absolute bottom-10 size-24 rounded-full border-2 border-primary/50"
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
          <GlassBottle className="h-40 w-auto drop-shadow-[0_12px_28px_oklch(0.6_0.098_254/35%)]" />
        </div>
      </div>

      <p className="absolute bottom-24 px-6 text-center font-serif text-lg tracking-wide text-foreground text-balance">
        {label}
      </p>
    </div>
  )
}
