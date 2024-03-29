import { TGym, TGymCreateInput } from '@/lib/prisma'
import { Decimal } from '@prisma/client/runtime/library'
import {
  GymsRepository,
  IFindManyNearbyGyms
} from '@/repositories/gyms-repository'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'

export class InMemoryGymRepository implements GymsRepository {
  public gyms: TGym[] = [
    {
      id: 'gym-001',
      title: 'Konoha Gym',
      description: 'Academia ninja de konoha',
      phone: '',
      latitude: new Decimal(-23.530222),
      longitude: new Decimal(-46.532877)
    }
  ]

  async create(data: TGymCreateInput) {
    const newGym: TGym = {
      id: `uuid-${Math.random() * 100}`,
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Decimal(Number(data.latitude)),
      longitude: new Decimal(Number(data.longitude))
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

  async searchMany(query: string, page: number) {
    const gyms = this.gyms
      .filter((gym) => gym.title.includes(query))
      .slice((page - 1) * 20, page * 20)

    return gyms
  }

  async findManyNearbyGyms(params: IFindManyNearbyGyms) {
    return this.gyms.filter((gym) => {
      const distance = getDistanceBetweenCoordinates(
        {
          latitude: params.latitude,
          longitude: params.longitude
        },
        {
          latitude: Number(gym.latitude),
          longitude: Number(gym.longitude)
        }
      )

      return distance < 10
    })
  }
}
