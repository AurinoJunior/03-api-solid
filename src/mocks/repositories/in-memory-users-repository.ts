import { TUser, TUserCreateInput } from '@/lib/prisma'
import { UsersRepository } from '@/repositories/users-repository'
import { hashSync } from 'bcryptjs'

export class InMemoryUsersRepository implements UsersRepository {
  public user: TUser[] = [
    {
      id: 'uuid-01',
      name: 'Kakashi Hatage',
      email: 'kakashi@email.com',
      created_at: new Date(),
      password_hash: hashSync('kakashi', 5),
    },
  ]

  async create(data: TUserCreateInput) {
    const user: TUser = {
      id: `uuid-${Math.random() * 100}`,
      name: data.name,
      email: data.email,
      created_at: new Date(),
      password_hash: data.password_hash,
    }
    this.user.push(user)
    return user
  }

  async findByEmail(email: string) {
    const user = this.user.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findById(userId: string) {
    const user = this.user.find((item) => item.id === userId)

    if (!user) {
      return null
    }

    return user
  }
}
