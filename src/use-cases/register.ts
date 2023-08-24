import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { UsersRepository } from '@/repositories/users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface IRegisterUseCaseParams {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  private userRepository

  constructor(userRepository: UsersRepository) {
    this.userRepository = userRepository
  }

  async execute({ name, email, password }: IRegisterUseCaseParams) {
    const passwordHash = bcrypt.hashSync(password, 5)

    const userWithSameEmail = await this.userRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    await this.userRepository.create({
      name,
      email,
      password_hash: passwordHash,
    })
  }
}
