import { describe, expect, it, beforeEach } from 'vitest'
import { InMemoryGymRepository } from '@/mocks/repositories/in-memory-gym-repository'
import { CreateGymUseCase } from './create-gym'

let gymRepository: InMemoryGymRepository
let sut: CreateGymUseCase

describe('Use cases register', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymRepository()
    sut = new CreateGymUseCase(gymRepository)
  })

  it('should be able to register gym success', async () => {
    const gym = await sut.execute({
      title: 'Mungiwara Gym',
      description: null,
      phone: null,
      latitude: -23.530257,
      longitude: -46.53211,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
