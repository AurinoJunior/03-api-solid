import { TCheckinCreateInput, prisma } from '@/lib/prisma'
import { CheckInRepository } from '../check-ins-repository'

export class PrismaCheckInRepository implements CheckInRepository {
  async create(data: TCheckinCreateInput) {
    return await prisma.checkIn.create({
      data,
    })
  }
}
