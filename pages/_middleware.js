import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export const middleware = async (req) => {
  const token = await getToken({ req, secret: process.env.JWT_SECRET })

  const url = req.nextUrl.clone()

  // Allow request if token exists or for next-auth request
  if (url.pathname.includes('/api/auth') || token) {
    return NextResponse.next()
  }

  // Redirect to login if no token or login request
  if (!token && url.pathname !== '/login') {
    url.pathname = '/login'
    return NextResponse.rewrite(url)
  }
}
