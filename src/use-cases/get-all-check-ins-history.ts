import { CheckInRepository } from '@/repositories/check-ins-repository'

interface IGetAllCheckInsHistoryUseCaseParams {
  userId: string
  page?: number
}

export class GetAllCheckInsHistoryUseCase {
  private checkInRepository

  constructor(checkInRepository: CheckInRepository) {
    this.checkInRepository = checkInRepository
  }

  async execute({ userId, page = 1 }: IGetAllCheckInsHistoryUseCaseParams) {
    const checkIns = await this.checkInRepository.findManyByUserId(userId, page)

    return { checkIns }
  }
}
