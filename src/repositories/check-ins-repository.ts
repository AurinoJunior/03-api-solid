import { TCheckin, TCheckinCreateInput } from '@/lib/prisma'

export interface CheckInRepository {
  create: (data: TCheckinCreateInput) => Promise<TCheckin>
  countByUserId: (userId: string) => Promise<number>
  findManyByUserId: (userId: string, page: number) => Promise<TCheckin[]>
  findByUserCheckInOnDate: (
    userId: string,
    date: Date,
  ) => Promise<TCheckin | null>
}
