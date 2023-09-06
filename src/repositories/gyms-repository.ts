import { TGym, TGymCreateInput } from '@/lib/prisma'

export interface GymsRepository {
  findById: (gymId: string) => Promise<TGym | null>
  create: (data: TGymCreateInput) => Promise<TGym>
}
