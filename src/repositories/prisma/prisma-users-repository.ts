import { TUserCreateInput, prisma } from '@/lib/prisma'
import { UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async create(data: TUserCreateInput) {
    return await prisma.user.create({
      data,
    })
  }

  async findByEmail(email: string) {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    })
  }

  async findById(id: string) {
    return await prisma.user.findUnique({
      where: {
        id,
      },
    })
  }
}
