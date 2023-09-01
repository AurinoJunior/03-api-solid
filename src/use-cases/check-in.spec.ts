import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckInRepository } from '@/mocks/repositories/in-memory-check-in-repository'
import { CheckInUseCase } from './check-in'

let checkInRepository: InMemoryCheckInRepository
let sut: CheckInUseCase

describe('Use case check-in', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepository()
    sut = new CheckInUseCase(checkInRepository)
  })

  it('should be able to check in', async () => {
    const user = await sut.execute({ userId: 'uuid-01', gymId: 'gym-0001' })

    expect(user.id).toEqual(expect.any(String))
  })
})
