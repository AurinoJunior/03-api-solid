import { UsersRepository } from '@/repositories/users-repository'
import { ResourceNotFoundError } from './errors'

interface IGetUserProfileUseCaseRequest {
  userId: string
}

export class GetUserProfileUseCase {
  private userRepository

  constructor(userRepository: UsersRepository) {
    this.userRepository = userRepository
  }

  async execute({ userId }: IGetUserProfileUseCaseRequest) {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return user
  }
}
