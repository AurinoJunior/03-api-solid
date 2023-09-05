import { TGym } from '@/lib/prisma'

export interface GymsRepository {
  findById: (gymId: string) => Promise<TGym | null>
}
