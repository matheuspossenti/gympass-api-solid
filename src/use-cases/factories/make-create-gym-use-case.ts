import { CreateGymUseCase } from '../create-gym'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function makeCreateGymUseCase() {
  const gymsRespository = new PrismaGymsRepository()
  const useCase = new CreateGymUseCase(gymsRespository)

  return useCase
}
