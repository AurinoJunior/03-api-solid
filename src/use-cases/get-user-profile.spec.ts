import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '@/mocks/repositories/in-memory-users-repository'
import { ResourceNotFoundError } from './errors'
import { GetUserProfileUseCase } from './get-user-profile'

let userRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Use case get user profile', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(userRepository)
  })

  it('should be able to get user profile', async () => {
    const user = await sut.execute({ userId: 'uuid-01' })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should be able to not found user if id not exists', async () => {
    await expect(
      sut.execute({ userId: 'user not exists' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
