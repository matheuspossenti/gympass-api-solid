import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  try {
    const getProfileUseCase = makeGetUserProfileUseCase()

    const { user } = await getProfileUseCase.execute({
      userId: request.user.sub,
    })

    return reply.status(200).send({
      user: {
        ...user,
        password_hash: undefined,
      },
    })
  } catch (error) {}

  return reply.status(200).send()
}
