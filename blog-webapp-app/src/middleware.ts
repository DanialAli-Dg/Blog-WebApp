import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // If the current path is "/", redirect to "/posts"
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/posts', request.url));
  }

  // Continue with the request if no redirect is needed
  return NextResponse.next();
}

// Configure the matcher to target all routes if necessary
export const config = {
  matcher: '/',
};
