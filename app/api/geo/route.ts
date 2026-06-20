import { NextRequest, NextResponse } from 'next/server';
import { getClientIp, detectCountryFromIp, initGeoIp } from '@/src/utils/geoip';

let initialized = false;

export async function GET(request: NextRequest) {
  try {
    if (!initialized) {
      await initGeoIp();
      initialized = true;
    }

    const queryIp = request.nextUrl.searchParams.get('ip');
    const debugIp = request.nextUrl.searchParams.get('debugIp');
    const ip = debugIp || queryIp || getClientIp(request.headers);
    
    console.log('[GeoAPI] Incoming /api/geo request');
    console.log('[GeoAPI] Resolved client IP:', ip);
    
    const geo = detectCountryFromIp(ip);
    console.log('[GeoAPI] Result:', geo);
    
    return NextResponse.json({
      success: true,
      countryCode: geo.countryCode,
      country: geo.country,
      ip: ip || undefined,
      detectionMethod: 'ip-geolocation'
    });
  } catch (error: any) {
    console.error('[GeoAPI] Geo detection error:', error);
    return NextResponse.json({
      success: false,
      countryCode: 'US',
      country: 'United States',
      detectionMethod: 'fallback'
    });
  }
}

