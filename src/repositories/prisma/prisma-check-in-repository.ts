import { TCheckin, TCheckinCreateInput, prisma } from '@/lib/prisma'
import { CheckInRepository } from '../check-ins-repository'
import dayjs from 'dayjs'

export class PrismaCheckInRepository implements CheckInRepository {
  async findByUserCheckInOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate()
        }
      }
    })

    return checkIn
  }

  async findById(checkInId: string) {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id: checkInId
      }
    })

    return checkIn
  }

  async findManyByUserId(userId: string, page: number) {
    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_id: userId
      },
      take: 20,
      skip: (page - 1) * 20
    })

    return checkIns
  }

  async countByUserId(userId: string) {
    const count = await prisma.checkIn.count({
      where: {
        user_id: userId
      }
    })

    return count
  }

  async save(data: TCheckin) {
    const checkIn = await prisma.checkIn.update({
      where: {
        id: data.id
      },
      data
    })

    return checkIn
  }

  async create(data: TCheckinCreateInput) {
    const checkIn = await prisma.checkIn.create({
      data
    })

    return checkIn
  }
}
