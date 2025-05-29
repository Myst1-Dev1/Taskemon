import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const tokenCookie = request.cookies.get('user-token');
  const pathname = request.nextUrl.pathname;

  if (!tokenCookie && ['/panel', '/awards', '/historic'].includes(pathname)) {
    const homeUrl = new URL('/', request.url);
    return NextResponse.redirect(homeUrl);
  }

  if (tokenCookie && pathname === '/') {
    const panelUrl = new URL('/panel', request.url);
    return NextResponse.redirect(panelUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/panel', '/awards', '/historic'],
};