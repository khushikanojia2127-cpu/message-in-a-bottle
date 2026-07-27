'use client'

import { useEffect, useState } from 'react'
import { Anchor, Send, Waves } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { BottleToss } from '@/components/bottle-toss'
import { GlassBottle } from '@/components/glass-bottle'
import { catchBottle, getStats, sendBottle, type OceanStats } from '@/app/actions'
import { MAX_MESSAGE_LENGTH } from '@/lib/ocean-store'

const SAILOR_KEY = 'bottle-tide:sailor-id'

function useSailorId() {
  const [sailorId, setSailorId] = useState('')

  useEffect(() => {
    let id = window.localStorage.getItem(SAILOR_KEY)
    if (!id) {
      id = crypto.randomUUID()
      window.localStorage.setItem(SAILOR_KEY, id)
    }
    setSailorId(id)
  }, [])

  return sailorId
}

function timeAdrift(createdAt: number) {
  const seconds = Math.max(1, Math.round((Date.now() - createdAt) / 1000))
  if (seconds < 60) return `${seconds}s adrift`
  const minutes = Math.round(seconds / 60)
  if (minutes < 60) return `${minutes}m adrift`
  const hours = Math.round(minutes / 60)
  if (hours < 48) return `${hours}h adrift`
  return `${Math.round(hours / 24)}d adrift`
}

export function BottleTide({ initialStats }: { initialStats: OceanStats }) {
  const sailorId = useSailorId()
  const [stats, setStats] = useState(initialStats)
  const [message, setMessage] = useState('')
  const [pending, setPending] = useState<'send' | 'receive' | null>(null)
  const [toss, setToss] = useState<{ mode: 'send' | 'receive'; label: string } | null>(null)
  const [sendNotice, setSendNotice] = useState('')
  const [sendError, setSendError] = useState('')
  const [catchError, setCatchError] = useState('')
  const [caught, setCaught] = useState<{ message: string; createdAt: number } | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      getStats().then(setStats)
    }, 15000)
    return () => clearInterval(interval)
  }, [])

  function playToss(mode: 'send' | 'receive', label: string) {
    setToss({ mode, label })
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setToss(null)
        resolve()
      }, 2200)
    })
  }

  async function handleSend() {
    if (!sailorId || pending) return
    setSendError('')
    setSendNotice('')
    setPending('send')

    const animation = playToss('send', 'Your bottle spins out over the waves...')
    const result = await sendBottle(sailorId, message)
    await animation

    if (result.ok) {
      setStats(result.stats)
      setMessage('')
      setSendNotice('Corked, thrown, and swallowed by the tide. A stranger will fish it out.')
    } else {
      setSendError(result.error)
    }
    setPending(null)
  }

  async function handleCatch() {
    if (!sailorId || pending) return
    setCatchError('')
    setPending('receive')

    const animation = playToss('receive', 'Something glints in the current...')
    const result = await catchBottle(sailorId)
    await animation

    setStats(result.stats)
    if (result.ok) {
      setCaught({ message: result.bottle.message, createdAt: result.bottle.createdAt })
    } else {
      setCaught(null)
      setCatchError(result.error)
    }
    setPending(null)
  }

  const remaining = MAX_MESSAGE_LENGTH - message.length

  return (
    <>
      {toss && <BottleToss mode={toss.mode} label={toss.label} />}

      <div className="grid gap-5 md:grid-cols-2">
        {/* ---------- Cast a bottle ---------- */}
        <section
          aria-labelledby="cast-heading"
          className="rounded-3xl border border-border bg-card/80 p-6 shadow-[0_18px_50px_oklch(0.6_0.098_254/18%)] backdrop-blur-md sm:p-8"
        >
          <header className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-full bg-primary/15 text-primary">
              <Send className="size-5" />
            </span>
            <div>
              <h2 id="cast-heading" className="font-serif text-xl text-foreground">
                Cast a bottle
              </h2>
              <p className="text-sm text-muted-foreground">Anonymous. Unsigned. Untraceable.</p>
            </div>
          </header>

          <label htmlFor="message" className="sr-only">
            Your anonymous message
          </label>
          <textarea
            id="message"
            value={message}
            maxLength={MAX_MESSAGE_LENGTH}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Whisper it here - a confession, a hope, a warning for whoever finds this..."
            rows={5}
            className="mt-5 w-full resize-none rounded-2xl border border-input bg-secondary/45 p-4 text-base leading-relaxed text-foreground placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 focus-visible:outline-none"
          />

          <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
            <span>{remaining} characters of parchment left</span>
            <span className="font-serif tracking-widest uppercase">no names kept</span>
          </div>

          <Button
            onClick={handleSend}
            disabled={!sailorId || pending !== null || message.trim().length < 2}
            size="lg"
            className="mt-5 h-12 w-full rounded-2xl text-base"
          >
            {pending === 'send' ? 'Throwing...' : 'Throw it into the ocean'}
          </Button>

          {sendNotice && (
            <p className="mt-4 rounded-xl border border-primary/30 bg-primary/10 p-3 text-sm text-primary">
              {sendNotice}
            </p>
          )}
          {sendError && (
            <p className="mt-4 rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
              {sendError}
            </p>
          )}
        </section>

        {/* ---------- Catch a bottle ---------- */}
        <section
          aria-labelledby="catch-heading"
          className="flex flex-col rounded-3xl border border-border bg-card/80 p-6 shadow-[0_18px_50px_oklch(0.6_0.098_254/18%)] backdrop-blur-md sm:p-8"
        >
          <header className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-full bg-accent/45 text-accent-foreground">
              <Anchor className="size-5" />
            </span>
            <div>
              <h2 id="catch-heading" className="font-serif text-xl text-foreground">
                Catch a bottle
              </h2>
              <p className="text-sm text-muted-foreground">
                Every note is written by another visitor.
              </p>
            </div>
          </header>

          <div className="mt-6 flex flex-1 flex-col justify-center">
            {caught ? (
              <figure className="rounded-2xl border border-accent/45 bg-[oklch(0.96_0.026_70)] p-5 text-accent-foreground shadow-inner">
                <blockquote className="text-lg leading-relaxed whitespace-pre-wrap text-pretty italic">
                  {caught.message}
                </blockquote>
                <figcaption className="mt-4 flex items-center justify-between border-t border-accent/50 pt-3 text-xs tracking-widest uppercase">
                  <span>from a stranger</span>
                  <span>{timeAdrift(caught.createdAt)}</span>
                </figcaption>
              </figure>
            ) : (
              <div className="flex flex-col items-center gap-4 py-6 text-center">
                <GlassBottle className="h-28 w-auto opacity-70" />
                <p className="max-w-xs text-sm leading-relaxed text-muted-foreground text-pretty">
                  {catchError ||
                    'Reach into the current and pull up whatever the sea decided to hand you.'}
                </p>
              </div>
            )}
          </div>

          <Button
            onClick={handleCatch}
            disabled={!sailorId || pending !== null}
            variant="outline"
            size="lg"
            className="mt-6 h-12 w-full rounded-2xl border-accent/60 bg-accent/35 text-base text-accent-foreground hover:bg-accent/55 hover:text-accent-foreground"
          >
            {pending === 'receive'
              ? 'Reaching into the deep...'
              : caught
                ? 'Catch another bottle'
                : 'Catch a drifting bottle'}
          </Button>
        </section>
      </div>

      {/* ---------- Tide log ---------- */}
      <dl className="mt-6 grid grid-cols-3 gap-3 rounded-3xl border border-border bg-card/70 p-5 text-center backdrop-blur-md">
        <div>
          <dt className="text-xs tracking-widest text-muted-foreground uppercase">Adrift now</dt>
          <dd className="mt-1 font-serif text-2xl text-primary">{stats.drifting}</dd>
        </div>
        <div className="border-x border-border">
          <dt className="text-xs tracking-widest text-muted-foreground uppercase">Cast</dt>
          <dd className="mt-1 font-serif text-2xl text-foreground">{stats.totalSent}</dd>
        </div>
        <div>
          <dt className="text-xs tracking-widest text-muted-foreground uppercase">Fished out</dt>
          <dd className="mt-1 font-serif text-2xl text-accent-foreground">{stats.totalCaught}</dd>
        </div>
      </dl>

      <p className="mt-5 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
        <Waves className="size-4" />
        Each bottle is delivered to exactly one stranger, then it is gone forever.
      </p>
    </>
  )
}
