import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '@/mocks/repositories/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors'

let userRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Use cases authenticate', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(userRepository)
  })

  it('should be able to authenticate', async () => {
    const user = await sut.execute({
      email: 'kakashi@email.com',
      password: 'kakashi',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should be able to authenticate with wrong email', async () => {
    await expect(
      sut.execute({
        email: '',
        password: 'kakashi',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should be able to authenticate with wrong password', async () => {
    await expect(
      sut.execute({
        email: 'kakashi@email.com',
        password: '',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
