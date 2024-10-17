import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { CreateGymUseCase } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to create a gym', async () => {
    const { gym } = await sut.execute({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -27.0077083,
      longitude: -51.1619002,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
