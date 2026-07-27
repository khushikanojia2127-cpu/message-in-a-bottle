export function GlassBottle({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 128"
      className={className}
      role="img"
      aria-label="Corked pirate glass bottle holding a rolled note"
    >
      {/* cork */}
      <rect x="25" y="4" width="14" height="14" rx="3" fill="oklch(0.62 0.09 62)" />
      <rect x="24" y="15" width="16" height="5" rx="2" fill="oklch(0.5 0.08 58)" />
      {/* neck */}
      <rect x="27" y="19" width="10" height="18" fill="oklch(0.62 0.11 178 / 45%)" />
      {/* body */}
      <path
        d="M27 34c0 6-13 12-13 26v50c0 8 5 14 18 14s18-6 18-14V60c0-14-13-20-13-26z"
        fill="oklch(0.62 0.13 182 / 42%)"
        stroke="oklch(0.86 0.1 190 / 70%)"
        strokeWidth="2"
      />
      {/* rolled note inside */}
      <rect
        x="22"
        y="66"
        width="20"
        height="34"
        rx="4"
        transform="rotate(-8 32 83)"
        fill="oklch(0.9 0.05 84)"
      />
      <rect
        x="26"
        y="74"
        width="12"
        height="2"
        rx="1"
        transform="rotate(-8 32 83)"
        fill="oklch(0.55 0.07 60 / 70%)"
      />
      <rect
        x="26"
        y="81"
        width="12"
        height="2"
        rx="1"
        transform="rotate(-8 32 83)"
        fill="oklch(0.55 0.07 60 / 70%)"
      />
      <rect
        x="26"
        y="88"
        width="8"
        height="2"
        rx="1"
        transform="rotate(-8 32 83)"
        fill="oklch(0.55 0.07 60 / 70%)"
      />
      {/* glass highlight */}
      <path
        d="M22 62c-2 6-2 12-2 20v28"
        stroke="oklch(0.97 0.02 190 / 60%)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      {/* twine around the neck */}
      <path
        d="M26 24h12M26 29h12"
        stroke="oklch(0.79 0.12 82)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}
