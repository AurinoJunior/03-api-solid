import { GymsRepository } from '@/repositories/gyms-repository'

interface ICreateGymUseCaseParams {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

export class CreateGymUseCase {
  private gymRepository

  constructor(gymRepository: GymsRepository) {
    this.gymRepository = gymRepository
  }

  async execute({
    title,
    phone,
    description,
    latitude,
    longitude,
  }: ICreateGymUseCaseParams) {
    const gym = await this.gymRepository.create({
      title,
      phone,
      description,
      latitude,
      longitude,
    })

    return gym
  }
}
