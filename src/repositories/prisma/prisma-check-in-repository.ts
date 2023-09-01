import { TCheckinCreateInput, TUserCreateInput, prisma } from '@/lib/prisma'
import { CheckInRepository } from '../check-in-repository'

export class PrismaCheckInRepository implements CheckInRepository {
  async create(data: TCheckinCreateInput) {
    return await prisma.checkIn.create({
      data,
    })
  }
}
