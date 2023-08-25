import { describe, expect, it } from 'vitest'
import bcryptjs from 'bcryptjs'
import { RegisterUseCase } from './register'
import { InMemoryUsersRepository } from '@/mocks/repositories/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

describe('Use cases register', () => {
  it('should be able to register success', async () => {
    const userRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(userRepository)

    const user = await registerUseCase.execute({
      name: 'naruto Uzumaki',
      email: 'naruto@email.com',
      password: 'naruto123',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to register with same email', async () => {
    const userRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(userRepository)

    await registerUseCase.execute({
      name: 'naruto Uzumaki',
      email: 'naruto@email.com',
      password: 'naruto123',
    })

    await expect(
      registerUseCase.execute({
        name: 'naruto Uzumaki',
        email: 'naruto@email.com',
        password: 'naruto123',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should be able to create a password hash', async () => {
    const userRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(userRepository)

    const user = await registerUseCase.execute({
      name: 'naruto Uzumaki',
      email: 'naruto@email.com',
      password: 'naruto123',
    })

    expect(await bcryptjs.compare('naruto123', user.password_hash)).toBe(true)
  })
})
