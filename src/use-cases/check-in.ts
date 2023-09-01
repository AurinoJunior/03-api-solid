import { CheckInRepository } from '@/repositories/check-in-repository'

interface ICheckInUseCaseParams {
  userId: string
  gymId: string
}

export class CheckInUseCase {
  private checkInRepository

  constructor(checkInRepository: CheckInRepository) {
    this.checkInRepository = checkInRepository
  }

  async execute({ gymId, userId }: ICheckInUseCaseParams) {
    const checkIn = await this.checkInRepository.create({
      user_id: userId,
      gym_id: gymId,
    })

    return checkIn
  }
}
