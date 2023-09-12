import { TGym, TGymCreateInput } from '@/lib/prisma'

export interface IFindManyNearbyGyms {
  latitude: number
  longitude: number
}

export interface GymsRepository {
  findById: (gymId: string) => Promise<TGym | null>
  create: (data: TGymCreateInput) => Promise<TGym>
  searchMany: (query: string, page: number) => Promise<TGym[]>
  findManyNearbyGyms: (params: IFindManyNearbyGyms) => Promise<TGym[]>
}
