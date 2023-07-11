import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const redirectURL = new URL(
    '/',
    process.env.NEXT_PUBLIC_NEXTAUTH_URL
      ? process.env.NEXT_PUBLIC_NEXTAUTH_URL
      : request.url,
  )

  return NextResponse.redirect(redirectURL, {
    headers: {
      'Set-Cookie': `token=; Path=/; max-age=0`,
    },
  })
}
