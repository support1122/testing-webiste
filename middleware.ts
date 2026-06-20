import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Add noindex header for Next.js image optimization routes
  if (pathname.startsWith('/_next/image')) {
    const response = NextResponse.next();
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return response;
  }

  // Skip for API routes, static files
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/favicon.ico')
  ) {
    return NextResponse.next();
  }

  // Allow en-ca paths through
  if (pathname.startsWith('/en-ca')) {
    return NextResponse.next();
  }

  // Only check geo on root path
  if (pathname === '/') {
    // Use Vercel's built-in geo header (no fetch needed)
    const country = request.headers.get('x-vercel-ip-country') ||
                    request.geo?.country ||
                    '';

    if (country === 'CA') {
      const url = request.nextUrl.clone();
      url.pathname = '/en-ca';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|favicon.ico).*)'],
};
