import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const rediretUrl = new URL('/', req.url)

  return NextResponse.redirect(rediretUrl, {
    // sending to the page with 0 will delete the cookie
    headers: {
      'Set-Cookie': `token=; Path=/; max-age=0`,
    },
  })
}
