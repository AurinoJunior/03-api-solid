import { TGym, TGymCreateInput } from '@/lib/prisma'
import { Decimal } from '@prisma/client/runtime/library'
import { GymsRepository } from '@/repositories/gyms-repository'

export class InMemoryGymRepository implements GymsRepository {
  public gyms: TGym[] = [
    {
      id: 'gym-001',
      title: 'Konoha Gym',
      description: 'Academia ninja de konoha',
      phone: '',
      latitude: new Decimal(-23.530222),
      longitude: new Decimal(-46.532877),
    },
  ]

  async create(data: TGymCreateInput) {
    const newGym: TGym = {
      id: `uuid-${Math.random() * 100}`,
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Decimal(Number(data.latitude)),
      longitude: new Decimal(Number(data.longitude)),
    }
    this.gyms.push(newGym)
    return newGym
  }

  async findById(gymId: string) {
    const gym = this.gyms.find((gym) => gym.id === gymId)

    if (!gym) {
      return null
    }

    return gym
  }
}
