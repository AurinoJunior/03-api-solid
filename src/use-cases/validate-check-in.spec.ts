import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCheckInRepository } from '@/mocks/repositories/in-memory-check-in-repository'
import { ResourceNotFoundError } from './errors'
import { ValidateCheckInUseCase } from './validate-check-in'
import { LateCheckInValidateError } from './errors/late-check-in-validate-error'

let checkInRepository: InMemoryCheckInRepository
let sut: ValidateCheckInUseCase

describe('Use case validate check-in', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepository()
    sut = new ValidateCheckInUseCase(checkInRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate check-in', async () => {
    const createdCheckIn = await checkInRepository.create({
      user_id: 'uuid-01',
      gym_id: 'gym-001'
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInRepository.checkIns[0].validated_at).toEqual(expect.any(Date))
  })

  it('should not be able to validate an inexistent check-in', async () => {
    await expect(
      sut.execute({
        checkInId: 'inexistent-check-in-id'
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to validate the check-in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40))

    const createdCheckIn = await checkInRepository.create({
      user_id: 'uuid-01',
      gym_id: 'gym-001'
    })

    vi.advanceTimersByTime(1000 * 60 * 21) // Advance 21 Minutes

    await expect(() =>
      sut.execute({
        checkInId: createdCheckIn.id
      })
    ).rejects.toBeInstanceOf(LateCheckInValidateError)
  })
})
