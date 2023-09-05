import { CheckInRepository } from '@/repositories/check-ins-repository'
import { GymsRepository } from '@/repositories/gyms-repository'
import { ResourceNotFoundError } from './errors'

interface ICheckInUseCaseParams {
  userId: string
  gymId: string
}

export class CheckInUseCase {
  private checkInRepository
  private gymRepository

  constructor(
    checkInRepository: CheckInRepository,
    gymRepository: GymsRepository,
  ) {
    this.checkInRepository = checkInRepository
    this.gymRepository = gymRepository
  }

  async execute({ gymId, userId }: ICheckInUseCaseParams) {
    const gym = await this.gymRepository.findById(gymId)

    if (!gym) throw new ResourceNotFoundError()

    const checkInOnSameDay =
      await this.checkInRepository.findByUserCheckInOnDate(userId, new Date())

    if (checkInOnSameDay) throw new Error()

    const checkIn = await this.checkInRepository.create({
      user_id: userId,
      gym_id: gymId,
    })

    return { checkIn }
  }
}
