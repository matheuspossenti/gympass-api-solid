import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'

export const app = fastify()

const prisma = new PrismaClient()

prisma.user.create({
  data: {
    name: 'Matheus',
    email: 'matheus.possenti242@gmaiol.com',
  },
})
