import { TCheckin, TCheckinCreateInput } from '@/lib/prisma'

export interface CheckInRepository {
  create: (data: TCheckinCreateInput) => Promise<TCheckin>
}
