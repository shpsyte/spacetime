import 'dotenv/config'

import fastify from 'fastify'
import cors from '@fastify/cors'
import { memoriesRoutes } from './routes/memories'
import { authRoute } from './routes/auth'
import jwt from '@fastify/jwt'

const app = fastify()
app.register(cors, {
  origin: '*',
  // ['http://localhost:3000', 'http://localhost:3001'],

  // put your options here
})
app.register(jwt, {
  secret: 'space-2f095052-d782-437e-b69d-0239a8ff1e52',
})

app.register(memoriesRoutes)
app.register(authRoute)

app
  .listen({
    port: 3333,
    // host: '0.0.0.0', // to work on docker/mobile
  })
  .then(() =>
    console.log('🚀🚀 Server is running on port http://localhost:3333 '),
  )
