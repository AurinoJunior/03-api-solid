import { describe, expect, it, beforeEach } from 'vitest'
import { InMemoryGymRepository } from '@/mocks/repositories/in-memory-gym-repository'
import { SearchGymsUseCase } from './search-gyms'

let gymRepository: InMemoryGymRepository
let sut: SearchGymsUseCase

describe('Use cases search gyms', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymRepository()
    sut = new SearchGymsUseCase(gymRepository)
  })

  it('should be able to search gyms', async () => {
    const gyms = await sut.execute({
      query: 'Konoha',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
  })

  it('should be able to search gyms paginated', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymRepository.create({
        title: `Konoha Gym-${i}`,
        description: null,
        phone: null,
        latitude: -23.530257,
        longitude: -46.53211,
      })
    }

    const gyms = await sut.execute({
      query: 'Konoha',
      page: 2,
    })

    expect(gyms).toHaveLength(3)
  })
})
