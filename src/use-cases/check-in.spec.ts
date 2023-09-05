import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCheckInRepository } from '@/mocks/repositories/in-memory-check-in-repository'
import { InMemoryGymRepository } from '@/mocks/repositories/in-memory-gym-repository'
import { CheckInUseCase } from './check-in'

let checkInRepository: InMemoryCheckInRepository
let gymRepository: InMemoryGymRepository
let sut: CheckInUseCase

describe('Use case check-in', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepository()
    gymRepository = new InMemoryGymRepository()
    sut = new CheckInUseCase(checkInRepository, gymRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      userId: 'uuid-01',
      gymId: 'gym-001',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8)) // 2023-1-20 11h

    await sut.execute({ userId: 'uuid-01', gymId: 'gym-001' })

    await expect(
      sut.execute({ userId: 'uuid-01', gymId: 'gym-001' }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in on different day', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8)) // 2023-1-20 11h
    await sut.execute({ userId: 'uuid-01', gymId: 'gym-001' })

    vi.setSystemTime(new Date(2023, 1, 20, 8)) // 2023-2-20 11h
    const { checkIn } = await sut.execute({
      userId: 'uuid-01',
      gymId: 'gym-001',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
