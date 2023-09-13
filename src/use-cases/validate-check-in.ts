import { CheckInRepository } from '@/repositories/check-ins-repository'
import { ResourceNotFoundError } from './errors'
import dayjs from 'dayjs'
import { LateCheckInValidateError } from './errors/late-check-in-validate-error'

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

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )

    const MAX_MINUTES = 20
    if (distanceInMinutesFromCheckInCreation > MAX_MINUTES) {
      throw new LateCheckInValidateError()
    }

    checkIn.validated_at = new Date()

    await this.checkInRepository.save(checkIn)

    return {
      checkIn,
    }
  }
}
