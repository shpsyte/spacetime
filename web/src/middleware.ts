import { NextResponse, NextRequest } from 'next/server'

const signin = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`
export function middleware(request: NextRequest) {
  // get the cookies of the request

  const token = request.cookies.get('token')?.value

  if (!token) {
    return NextResponse.redirect(new URL(signin))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/memories/:path*',
}
