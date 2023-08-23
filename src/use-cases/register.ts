import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { PrismaUsersRepository } from '@/repositories/prisma-users-repository'

interface IRegisterUseCaseParams {
  name: string
  email: string
  password: string
}

export async function registerUseCase({
  name,
  email,
  password,
}: IRegisterUseCaseParams) {
  const passwordHash = bcrypt.hashSync(password, 5)

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    throw new Error('Email already exists')
  }

  const prismaRepository = new PrismaUsersRepository()

  await prismaRepository.create({
    name,
    email,
    password_hash: passwordHash,
  })
}
