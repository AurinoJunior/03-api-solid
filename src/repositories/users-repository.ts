import { TUser, TUserCreateInput } from '@/lib/prisma'

export interface UsersRepository {
  create: (data: TUserCreateInput) => Promise<TUser>
  findByEmail: (email: string) => Promise<TUser | null>
  findById: (id: string) => Promise<TUser | null>
}
