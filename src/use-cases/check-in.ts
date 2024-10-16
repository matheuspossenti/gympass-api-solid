import type { CheckIn } from '@prisma/client'
import type { CheckInsRepository } from '@/repositories/check-ins-repository'

interface CheckInUseCaseRequest {
  userId: string
  gymId: string
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(private checkInsRespository: CheckInsRepository) {}

  async execute({
    userId,
    gymId,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const checkInOnSameDay = await this.checkInsRespository.findByUserIdOnDate(
      userId,
      new Date(),
    )

    if (checkInOnSameDay) {
      throw new Error('User already checked in today')
    }

    const checkIn = await this.checkInsRespository.create({
      gym_id: gymId,
      user_id: userId,
    })

    return { checkIn }
  }
}
