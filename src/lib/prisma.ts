import { env } from '@/env'
import { PrismaClient, Prisma, User, CheckIn, Gym } from '@prisma/client'

const prisma = new PrismaClient({
  log: env.NODE_ENV === 'dev' ? ['query'] : [],
})

type TUserCreateInput = Prisma.UserCreateInput
type TUser = User

type TCheckinCreateInput = Prisma.CheckInUncheckedCreateInput
type TCheckin = CheckIn

type TGymCreateInput = Prisma.GymCreateInput
type TGym = Gym

export {
  prisma,
  TUserCreateInput,
  TUser,
  TCheckinCreateInput,
  TCheckin,
  TGym,
  TGymCreateInput,
}
