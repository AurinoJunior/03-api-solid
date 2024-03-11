import { TCheckin, TCheckinCreateInput } from '@/lib/prisma'

export interface CheckInRepository {
  create: (data: TCheckinCreateInput) => Promise<TCheckin>
  save: (checkIn: TCheckin) => Promise<TCheckin | null>
  findById: (checkInId: string) => Promise<TCheckin | null>
  countByUserId: (userId: string) => Promise<number>
  findManyByUserId: (userId: string, page: number) => Promise<TCheckin[]>
  findByUserCheckInOnDate: (
    userId: string,
    date: Date
  ) => Promise<TCheckin | null>
}
