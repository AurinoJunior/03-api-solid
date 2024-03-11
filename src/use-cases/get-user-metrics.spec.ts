import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckInRepository } from '@/mocks/repositories/in-memory-check-in-repository'
import { GetUserMetricsUseCase } from './get-user-metrics'

let checkInRepository: InMemoryCheckInRepository
let sut: GetUserMetricsUseCase

describe('Use case get user metrics', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepository()
    sut = new GetUserMetricsUseCase(checkInRepository)
  })

  it('should be able to get count total check ins', async () => {
    await checkInRepository.create({
      user_id: 'uuid-01',
      gym_id: 'gym-001'
    })

    await checkInRepository.create({
      user_id: 'uuid-01',
      gym_id: 'gym-002'
    })

    const { checkInsCount } = await sut.execute({
      userId: 'uuid-01'
    })

    expect(checkInsCount).toBe(2)
  })
})
