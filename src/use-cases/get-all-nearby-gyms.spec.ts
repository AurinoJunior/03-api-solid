import { describe, expect, it, beforeEach } from 'vitest'
import { InMemoryGymRepository } from '@/mocks/repositories/in-memory-gym-repository'
import { GetAllNearbyGymsUseCase } from './get-all-nearby-gyms'

let gymRepository: InMemoryGymRepository
let sut: GetAllNearbyGymsUseCase

describe('Use cases get all nearby gyms', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymRepository()
    sut = new GetAllNearbyGymsUseCase(gymRepository)
  })

  it('should be able to find all nearby gyms', async () => {
    await gymRepository.create({
      title: 'Mungiwara Gym',
      description: null,
      phone: null,
      latitude: -23.326838,
      longitude: -46.720605,
    })

    const gyms = await sut.execute({
      userLatitude: -23.530222,
      userLongitude: -46.532877,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Konoha Gym' })])
  })
})
