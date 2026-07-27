'use server'

import { getOcean, MAX_MESSAGE_LENGTH, type Bottle } from '@/lib/ocean-store'

export type OceanStats = { drifting: number; totalSent: number; totalCaught: number }

export type SendResult =
  | { ok: true; stats: OceanStats }
  | { ok: false; error: string }

export type CatchResult =
  | { ok: true; bottle: { id: string; message: string; createdAt: number }; stats: OceanStats }
  | { ok: false; error: string; stats: OceanStats }

function statsOf(): OceanStats {
  const ocean = getOcean()
  return {
    drifting: ocean.drifting.length,
    totalSent: ocean.totalSent,
    totalCaught: ocean.totalCaught,
  }
}

export async function getStats(): Promise<OceanStats> {
  return statsOf()
}

export async function sendBottle(senderId: string, message: string): Promise<SendResult> {
  const text = message.trim()

  if (!senderId) return { ok: false, error: 'Missing sailor identity.' }
  if (text.length < 2) return { ok: false, error: 'Write something before you cork the bottle.' }
  if (text.length > MAX_MESSAGE_LENGTH) {
    return { ok: false, error: `Keep it under ${MAX_MESSAGE_LENGTH} characters.` }
  }

  const ocean = getOcean()
  const bottle: Bottle = {
    id: crypto.randomUUID(),
    message: text,
    senderId,
    createdAt: Date.now(),
  }
  ocean.drifting.push(bottle)
  ocean.totalSent += 1

  return { ok: true, stats: statsOf() }
}

export async function catchBottle(seekerId: string): Promise<CatchResult> {
  const ocean = getOcean()

  if (!seekerId) return { ok: false, error: 'Missing sailor identity.', stats: statsOf() }

  // Only bottles written by someone else can be caught.
  const candidates = ocean.drifting
    .map((bottle, index) => ({ bottle, index }))
    .filter(({ bottle }) => bottle.senderId !== seekerId)

  if (candidates.length === 0) {
    return {
      ok: false,
      error: 'The tide is empty. No one else has cast a bottle yet - send one, then come back.',
      stats: statsOf(),
    }
  }

  const pick = candidates[Math.floor(Math.random() * candidates.length)]
  // A bottle is delivered once, to a single stranger.
  ocean.drifting.splice(pick.index, 1)
  ocean.totalCaught += 1

  return {
    ok: true,
    bottle: {
      id: pick.bottle.id,
      message: pick.bottle.message,
      createdAt: pick.bottle.createdAt,
    },
    stats: statsOf(),
  }
}
