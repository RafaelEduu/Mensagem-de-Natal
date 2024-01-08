import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function content(app: FastifyInstance) {

  app.get('/content', async () => {
    const content = await prisma.content.findMany()

    return content
  })

  app.get('/content/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const content = await prisma.content.findUniqueOrThrow({
      where: {
        id,
      }
    })

    return content
  })

  app.post('/content', async (request, response) => {
    try {
      const user = await request.jwtDecode()
      
      const bodySchema = z.object({
        content: z.string(),
      })
  
      
      const { content } = bodySchema.parse(request.body)

      const existingUser = await prisma.user.findUnique({
        where: { googleId: user.sub }
      })

      if (!existingUser) {
        return response.status(404).send({ error: 'User not found' })
      } 
  
      const contentCreated = await prisma.content.create({
        data: {
          content,
          user: {
            connect: {googleId: user.sub}
          }
        },
      })
  
      console.log({ contentCreated })
      return response.status(201).send({ contentCreated })
    } catch (error) {
      console.error(error)
      return response.status(500).send({ error: 'Something went wrong' })
    }
  })
}