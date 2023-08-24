import { env } from '@/env'
import { PrismaClient, Prisma, User } from '@prisma/client'

const prisma = new PrismaClient({
  log: env.NODE_ENV === 'dev' ? ['query'] : [],
})

type TUserCreateInput = Prisma.UserCreateInput
type TUser = User

export { prisma, TUserCreateInput, TUser }
