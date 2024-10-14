import { env } from '@/env'
import { PrismaClient } from '@prisma/client'

export const primsa = new PrismaClient({
  log: env.NODE_ENV === 'dev' ? ['query'] : [],
})
