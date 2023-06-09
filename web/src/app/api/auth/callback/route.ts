import { api } from '@/lib/api'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const code = searchParams.get('code')

  try {
    const register = await api.post('/register', {
      code,
    })
    const redirectTo = req.cookies.get('redirectTo')?.value || '/'
    const { token } = register.data

    const rediretUrl = new URL(redirectTo, req.url)

    const cookieExiresInSeconds = 60 * 60 * 24 * 365 // 1 year

    return NextResponse.redirect(rediretUrl, {
      headers: {
        'Set-Cookie': `token=${token}; Path=/; max-age=${cookieExiresInSeconds}`,
      },
    })
  } catch (error) {
    console.log('Error', error)
  }
}
