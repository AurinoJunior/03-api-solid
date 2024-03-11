import { GymsRepository } from '@/repositories/gyms-repository'

interface IGetAllNearbyGymsUseCaseParams {
  userLatitude: number
  userLongitude: number
}

export class GetAllNearbyGymsUseCase {
  private gymRepository

  constructor(gymRepository: GymsRepository) {
    this.gymRepository = gymRepository
  }

  async execute({
    userLatitude,
    userLongitude
  }: IGetAllNearbyGymsUseCaseParams) {
    const gyms = await this.gymRepository.findManyNearbyGyms({
      latitude: userLatitude,
      longitude: userLongitude
    })

    return gyms
  }
}
