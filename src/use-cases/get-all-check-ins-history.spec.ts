import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckInRepository } from '@/mocks/repositories/in-memory-check-in-repository'
import { GetAllCheckInsHistoryUseCase } from './get-all-check-ins-history'

let checkInRepository: InMemoryCheckInRepository
let sut: GetAllCheckInsHistoryUseCase

describe('Use case get all check ins history', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepository()
    sut = new GetAllCheckInsHistoryUseCase(checkInRepository)
  })

  it('should be able to get all history check ins', async () => {
    await checkInRepository.create({
      user_id: 'uuid-01',
      gym_id: 'gym-001'
    })

    await checkInRepository.create({
      user_id: 'uuid-01',
      gym_id: 'gym-002'
    })

    const { checkIns } = await sut.execute({
      userId: 'uuid-01'
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-001' }),
      expect.objectContaining({ gym_id: 'gym-002' })
    ])
  })

  it('should be able to get all paginated history', async () => {
    for (let i = 1; i <= 25; i++) {
      await checkInRepository.create({
        user_id: 'uuid-01',
        gym_id: `gym-00${i}`
      })
    }

    const { checkIns } = await sut.execute({
      userId: 'uuid-01',
      page: 2
    })

    expect(checkIns).toHaveLength(5)
  })
})
