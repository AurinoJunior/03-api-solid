import { GymsRepository } from '@/repositories/gyms-repository'

interface ISearchGymsUseCaseParams {
  query: string
  page: number
}

export class SearchGymsUseCase {
  private gymRepository

  constructor(gymRepository: GymsRepository) {
    this.gymRepository = gymRepository
  }

  async execute({ query, page }: ISearchGymsUseCaseParams) {
    const gyms = await this.gymRepository.searchMany(query, page)

    return gyms
  }
}
