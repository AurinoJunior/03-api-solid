import { describe, expect, it, beforeEach } from 'vitest'
import bcryptjs from 'bcryptjs'
import { RegisterUseCase } from './register'
import { InMemoryUsersRepository } from '@/mocks/repositories/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let userRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Use cases register', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(userRepository)
  })

  it('should be able to register success', async () => {
    const user = await sut.execute({
      name: 'naruto Uzumaki',
      email: 'naruto@email.com',
      password: 'naruto123'
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to register with same email', async () => {
    await sut.execute({
      name: 'naruto Uzumaki',
      email: 'naruto@email.com',
      password: 'naruto123'
    })

    await expect(
      sut.execute({
        name: 'naruto Uzumaki',
        email: 'naruto@email.com',
        password: 'naruto123'
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should be able to create a password hash', async () => {
    const user = await sut.execute({
      name: 'naruto Uzumaki',
      email: 'naruto@email.com',
      password: 'naruto123'
    })

    expect(await bcryptjs.compare('naruto123', user.password_hash)).toBe(true)
  })
})
