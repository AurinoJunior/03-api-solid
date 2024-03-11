import { UsersRepository } from '@/repositories/users-repository'
import bcryptjs from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

export class AuthenticateUseCase {
  private userRepository

  constructor(userRepository: UsersRepository) {
    this.userRepository = userRepository
  }

  async execute({ email, password }: AuthenticateUseCaseRequest) {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await bcryptjs.compare(
      password,
      user.password_hash
    )

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return user
  }
}
