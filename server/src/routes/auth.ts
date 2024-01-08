import axios from 'axios'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
export async function authRoutes(app: FastifyInstance) {
  app.post('/register', async (request) => {
    const bodySchema = z.object({
      access_token: z.string(),
    })

    const { access_token } = bodySchema.parse(request.body)

    const userResponse = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${access_token}`,  
      },
    })

    const userSchema = z.object({
      id: z.string(),
      email: z.string(),
      name: z.string(),
    })

    const userInfo = userSchema.parse(userResponse.data)

    let user = await prisma.user.findUnique({
      where: {
        googleId: userResponse.data.id
      },
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          googleId: userResponse.data.id,
          email: userResponse.data.email,
          name: userResponse.data.name,
        },
      })
    }

    const token = app.jwt.sign(
      {
        name: userResponse.data.name,
      },
      {
        sub: userResponse.data.id,
        expiresIn: '30 days',
      },
    )

    console.log(token)

    return token
  })
}