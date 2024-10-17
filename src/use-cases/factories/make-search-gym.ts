import { SearchGymsUseCase } from '../search-gym'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function makeSearchGymsUseCase() {
  const gymsRespository = new PrismaGymsRepository()
  const useCase = new SearchGymsUseCase(gymsRespository)

  return useCase
}
