import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const CANADA_CODE = 'CA';
const STORAGE_KEY = 'ff_country_code_v1';

// Cache for country codes (in-memory for server-side)
const countryCache = new Map<string, { code: string; expiresAt: number }>();
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

async function fetchCountryFromLocalApi(ip: string, request: NextRequest): Promise<string | null> {
  try {
    const url = new URL('/api/geo', request.url);
    if (ip) {
      url.searchParams.set('ip', ip);
    }
    
    const response = await fetch(url.toString(), {
      headers: {
        'x-forwarded-for': ip || '',
        'x-real-ip': ip || '',
      },
      cache: 'no-store' // Don't cache in middleware
    });

    if (!response.ok) {
      console.warn('[Middleware] Local geo API not ok:', response.status);
      return null;
    }

    const data = await response.json();
    return data?.countryCode || null;
  } catch (error) {
    console.error('[Middleware] Failed to fetch country from local API:', error);
    return null;
  }
}

function getClientIp(request: NextRequest): string | null {
  // Check various headers for IP
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const cfIp = request.headers.get('cf-connecting-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  if (realIp) {
    return realIp;
  }
  if (cfIp) {
    return cfIp;
  }
  
  // Fallback - return null if no IP found
  return null;
}

function detectCountryFallback(request: NextRequest): string {
  // Try to detect from Accept-Language header
  const acceptLanguage = request.headers.get('accept-language') || '';
  
  // Check for French Canadian
  if (acceptLanguage.includes('fr-CA')) {
    return 'CA';
  }
  
  // Default to US
  return 'US';
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Add noindex header for Next.js image optimization routes (crawlable but not indexable)
  if (pathname.startsWith('/_next/image')) {
    const response = NextResponse.next();
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return response;
  }
  
  // Skip middleware for API routes, static files, and other _next routes
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/favicon.ico')
  ) {
    return NextResponse.next();
  }

  // If already on /en-ca path, allow it
  if (pathname.startsWith('/en-ca')) {
    return NextResponse.next();
  }

  // Only check for redirect on root path
  if (pathname === '/') {
    const ip = getClientIp(request);
    
    let countryCode: string | null = null;
    const now = Date.now();
    
    // Only check cache if we have an IP
    if (ip) {
      const cached = countryCache.get(ip);
      
      if (cached && cached.expiresAt > now) {
        countryCode = cached.code;
      } else {
        // Try to fetch from local Next.js API (faster, no backend dependency)
        countryCode = await fetchCountryFromLocalApi(ip, request);
        
        // Cache the result if we got one
        if (countryCode) {
          countryCache.set(ip, {
            code: countryCode,
            expiresAt: now + CACHE_TTL_MS
          });
        }
      }
    }
    
    // Fallback to browser detection if no IP or backend failed
    if (!countryCode) {
      countryCode = detectCountryFallback(request);
    }

    // Redirect to /en-ca if Canada detected
    if (countryCode === CANADA_CODE) {
      const url = request.nextUrl.clone();
      url.pathname = '/en-ca';
      console.log('[Middleware] Redirecting to /en-ca for Canada user');
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - favicon.ico (favicon file)
     * Note: _next/image is included to add noindex headers
     */
    '/((?!api|_next/static|favicon.ico).*)',
  ],
};

