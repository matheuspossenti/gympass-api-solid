import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'
import { MaxDistanceError } from './errors/max-distance-error'

let checkInsRespository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(async () => {
    checkInsRespository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRespository, gymsRepository)

    await gymsRepository.create({
      id: 'gym-id',
      title: 'Gym Name',
      description: '',
      phone: '',
      latitude: -27.0077083,
      longitude: -51.1619002,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: -27.0077083,
      userLongitude: -51.1619002,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: -27.0077083,
      userLongitude: -51.1619002,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-id',
        userId: 'user-id',
        userLatitude: -27.0077083,
        userLongitude: -51.1619002,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check in twice in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: -27.0077083,
      userLongitude: -51.1619002,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: -27.0077083,
      userLongitude: -51.1619002,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    gymsRepository.items.push({
      id: 'gym-id',
      title: 'Gym Name',
      description: '',
      phone: '',
      latitude: new Decimal(-27.0029394),
      longitude: new Decimal(-51.07157),
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-id',
        userId: 'user-id',
        userLatitude: -27.9077083,
        userLongitude: -51.1619002,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
