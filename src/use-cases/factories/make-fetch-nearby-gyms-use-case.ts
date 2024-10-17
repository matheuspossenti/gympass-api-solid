import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function makeFetchNearbyGymsUseCase() {
  const gymsRespository = new PrismaGymsRepository()
  const useCase = new FetchNearbyGymsUseCase(gymsRespository)

  return useCase
}
