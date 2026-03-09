import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the request is for an admin route
  if (pathname.startsWith('/admin')) {
    // Allow /admin/login to be accessed without authentication
    if (pathname === '/admin/login') {
      // Check if already authenticated
      const adminAuth = request.cookies.get('adminAuth')?.value
      if (adminAuth === 'true') {
        // Redirect authenticated users away from login page to dashboard
        return NextResponse.redirect(new URL('/admin/dashboard', request.url))
      }
      return NextResponse.next()
    }

    // For all other /admin routes, check authentication
    const adminAuth = request.cookies.get('adminAuth')?.value

    if (adminAuth !== 'true') {
      // Redirect to login if not authenticated
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}
