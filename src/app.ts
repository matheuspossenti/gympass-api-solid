import fastify from 'fastify'
import { z } from 'zod'
import { primsa } from './lib/prisma'

export const app = fastify()

app.post('/users', async (request, reply) => {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  await primsa.user.create({
    data: {
      name,
      email,
      password_hash: password,
    },
  })

  return reply.status(201).send()
})
