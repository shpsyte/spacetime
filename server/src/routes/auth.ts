import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import axios from 'axios'
import { prisma } from '../lib/prima'

export async function authRoute(app: FastifyInstance) {
  app.post('/register', async (req) => {
    const bodySchema = z.object({
      code: z.string(),
    })

    const { code } = bodySchema.parse(req.body)

    const response = await axios.post(
      'https://github.com/login/oauth/access_token',
      null, // body
      {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },
        headers: {
          Accept: 'application/json',
        },
      },
    )

    const { access_token } = response.data

    const userSchema = z.object({
      id: z.number(),
      login: z.string(),
      avatar_url: z.string().url(),
      name: z.string(),
    })

    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })

    // console.log('userInfo', userResponse.data)
    const userInfo = userSchema.parse(userResponse.data)

    // check if user exists
    let user = await prisma.user.findUnique({
      where: {
        githubId: userInfo.id,
      },
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          githubId: userInfo.id,
          name: userInfo.name,
          login: userInfo.login,
          avatarUrl: userInfo.avatar_url,
        },
      })
    }

    const token = app.jwt.sign(
      {
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
      {
        sub: user.id.toString(),
        expiresIn: '30 days',
      },
    )

    return {
      token,
    }
  })
}
