import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prima'

export async function memoriesRoutes(app: FastifyInstance) {
  app.get('/memories', async () => {
    const memories = await prisma.memory.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    })

    return memories.map((memory) => {
      return {
        id: memory.id,
        coverUrl: memory.coverUrl,
        excertp: memory.content.substring(0, 115).concat('...'),
      }
    })
  })

  app.get('/memories/:id', async () => {})

  app.post('/memories', async () => {})
  app.put('/memories/:id', async () => {})
  app.delete('/memories:/id', async () => {})
}