// Shared in-memory "ocean" of drifting bottles.
// Every message here is written by a real visitor - nothing is seeded.

export type Bottle = {
  id: string
  message: string
  senderId: string
  createdAt: number
}

type OceanState = {
  drifting: Bottle[]
  totalSent: number
  totalCaught: number
}

const globalForOcean = globalThis as unknown as { __ocean?: OceanState }

export function getOcean(): OceanState {
  if (!globalForOcean.__ocean) {
    globalForOcean.__ocean = { drifting: [], totalSent: 0, totalCaught: 0 }
  }
  return globalForOcean.__ocean
}

export const MAX_MESSAGE_LENGTH = 500
