import { TGym } from '@/lib/prisma'
import { Decimal } from '@prisma/client/runtime/library'
import { GymsRepository } from '@/repositories/gyms-repository'

export class InMemoryGymRepository implements GymsRepository {
  public gyms: TGym[] = [
    {
      id: 'gym-001',
      title: 'Konoha Gym',
      description: 'Academia ninja de konoha',
      phone: '',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    },
  ]

  async findById(gymId: string) {
    const gym = this.gyms.find((gym) => gym.id === gymId)

    if (!gym) {
      return null
    }

    return gym
  }
}
