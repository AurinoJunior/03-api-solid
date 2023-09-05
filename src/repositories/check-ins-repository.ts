import { TCheckin, TCheckinCreateInput } from '@/lib/prisma'

export interface CheckInRepository {
  findByUserCheckInOnDate: (
    userId: string,
    date: Date,
  ) => Promise<TCheckin | null>
  create: (data: TCheckinCreateInput) => Promise<TCheckin>
}
