import fastify from 'fastify'
import cors from '@fastify/cors'
import { memoriesRoutes } from './routes/memories'

const app = fastify()
app.register(cors, {
  origin: '*',
  // ['http://localhost:3000', 'http://localhost:3001'],

  // put your options here
})

app.register(memoriesRoutes)

app
  .listen({
    port: 3333,
  })
  .then(() =>
    console.log('🚀🚀 Server is running on port http://localhost:3333 '),
  )
