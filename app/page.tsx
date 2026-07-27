import { Shell } from 'lucide-react'

import { getStats } from '@/app/actions'
import { BottleTide } from '@/components/bottle-tide'
import { OceanScene } from '@/components/ocean-scene'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const initialStats = await getStats()

  return (
    <main className="relative min-h-svh">
      <OceanScene />

      <div className="relative mx-auto flex min-h-svh w-full max-w-5xl flex-col justify-center px-4 py-14 sm:px-6 sm:py-20">
        <header className="mb-10 text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-1.5 text-xs tracking-[0.2em] text-primary uppercase backdrop-blur-md">
            <Shell className="size-3.5" />
            anonymous tides
          </p>
          <h1 className="mt-6 font-serif text-4xl leading-tight text-balance text-foreground sm:text-6xl">
            Message in a Bottle
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
            Seal a secret in a pirate&apos;s glass bottle and hurl it into the deep. Somewhere past
            the coral and the mermaid&apos;s rock, a stranger will uncork it - and you can fish out
            theirs.
          </p>
        </header>

        <BottleTide initialStats={initialStats} />
      </div>
    </main>
  )
}
