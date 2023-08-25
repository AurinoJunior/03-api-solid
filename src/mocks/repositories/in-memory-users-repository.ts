import { TUser, TUserCreateInput } from '@/lib/prisma'
import { UsersRepository } from '@/repositories/users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public user: TUser[] = []

  async create(data: TUserCreateInput) {
    const user: TUser = {
      id: 'uuid-example',
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
}
