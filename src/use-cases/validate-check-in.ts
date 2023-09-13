import { CheckInRepository } from '@/repositories/check-ins-repository'
import { ResourceNotFoundError } from './errors'

interface IValidateCheckInUseCaseParams {
  checkInId: string
}

export class ValidateCheckInUseCase {
  private checkInRepository

  constructor(checkInRepository: CheckInRepository) {
    this.checkInRepository = checkInRepository
  }

  async execute({ checkInId }: IValidateCheckInUseCaseParams) {
    const checkIn = await this.checkInRepository.findById(checkInId)

    if (!checkIn) throw new ResourceNotFoundError()

    checkIn.validated_at = new Date()

    await this.checkInRepository.save(checkIn)

    return {
      checkIn,
    }
  }
}
