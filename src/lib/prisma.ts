import { env } from '@/env'
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient({
  log: env.NODE_ENV === 'dev' ? ['query'] : [],
})

type UserCreateInput = Prisma.UserCreateInput

export { prisma, UserCreateInput }
