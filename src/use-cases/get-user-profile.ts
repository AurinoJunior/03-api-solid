import { UsersRepository } from '@/repositories/users-repository'
import bcryptjs from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { ResourceNotFoundError } from './errors'

interface GetUserProfileUseCaseRequest {
  userId: string
}

export class GetUserProfileUseCase {
  private userRepository

  constructor(userRepository: UsersRepository) {
    this.userRepository = userRepository
  }

  async execute({ userId }: GetUserProfileUseCaseRequest) {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return user
  }
}
