import { TCheckin, TCheckinCreateInput } from '@/lib/prisma'
import { CheckInRepository } from '@/repositories/check-in-repository'

export class InMemoryCheckInRepository implements CheckInRepository {
  public checkIns: TCheckin[] = []

  async create(data: TCheckinCreateInput) {
    const checkIn: TCheckin = {
      id: `uuid-${Math.random() * 100}`,
      created_at: new Date(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
    }

    this.checkIns.push(checkIn)
    return checkIn
  }
}
