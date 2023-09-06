import { CheckInRepository } from '@/repositories/check-ins-repository'

interface IGetUserMetricsUseCaseParams {
  userId: string
}

export class GetUserMetricsUseCase {
  private checkInRepository

  constructor(checkInRepository: CheckInRepository) {
    this.checkInRepository = checkInRepository
  }

  async execute({ userId }: IGetUserMetricsUseCaseParams) {
    const checkInsCount = await this.checkInRepository.countByUserId(userId)

    return { checkInsCount }
  }
}
