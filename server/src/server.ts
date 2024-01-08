import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import fastify from 'fastify'
import { authRoutes } from './routes/auth'
import { content } from './routes/content'

const app = fastify()

app.register(jwt, {
  secret: 'kasjdmkalsdmioakmdoiwqmdaksmfkdaslmcnoja'
})
app.register(content)
app.register(cors, {
  origin: ['http://localhost:3000'],
})
app.register(authRoutes)

app
  .listen({
    port: 3333,
  })
  .then(() => console.log('Server Running'))