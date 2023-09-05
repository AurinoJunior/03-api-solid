import { CheckInRepository } from '@/repositories/check-ins-repository'
import { GymsRepository } from '@/repositories/gyms-repository'
import { ResourceNotFoundError } from './errors'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'

interface ICheckInUseCaseParams {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
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

  async execute({
    gymId,
    userId,
    userLatitude,
    userLongitude,
  }: ICheckInUseCaseParams) {
    const gym = await this.gymRepository.findById(gymId)

    if (!gym) throw new ResourceNotFoundError()

    const distance = getDistanceBetweenCoordinates(
      {
        latitude: userLatitude,
        longitude: userLongitude,
      },
      {
        latitude: Number(gym.latitude),
        longitude: Number(gym.longitude),
      },
    )

    const MAX_DISTANCE_IN_KILOMETE = 0.1

    if (distance > MAX_DISTANCE_IN_KILOMETE) throw new Error()

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
