import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'
const app = fastify()

const prisma = new PrismaClient()

app.get('/users', async (request, reply) => {
  const user = await prisma.user.findMany()
  return user
})

app
  .listen({
    port: 3333,
  })
  .then(() =>
    console.log('🚀🚀 Server is running on port http://localhost:3333 '),
  )
