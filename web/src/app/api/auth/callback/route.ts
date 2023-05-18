import { api } from '@/lib/api'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const code = searchParams.get('code')

  const register = await api.post('/register', {
    code,
  })
  const { token } = register.data

  const rediretUrl = new URL('/', req.url)

  const cookieExiresInSeconds = 60 * 60 * 24 * 365 // 1 year

  return NextResponse.redirect(rediretUrl, {
    headers: {
      'Set-Cookie': `token=${token}; Path=/; max-age=${cookieExiresInSeconds}`,
    },
  })
}
