import { Reader } from '@maxmind/geoip2-node';
import fs from 'fs';
import path from 'path';

// Type assertion for Reader with country method
type GeoIPReader = Reader & {
  country: (ip: string) => {
    country?: {
      isoCode?: string;
      names?: {
        en?: string;
      };
    };
  } | null;
};

let geoReader: GeoIPReader | null = null;
const ipCache = new Map<string, { countryCode: string; country: string; expiresAt: number }>();
const TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

function resolveDatabasePath(): string | null {
  const candidates: string[] = [];

  if (process.env.GEOIP_DB_PATH) {
    candidates.push(process.env.GEOIP_DB_PATH);
  }

  candidates.push(path.resolve(process.cwd(), 'lib', 'GeoLite2-Country.mmdb'));
  
  // Check in root
  candidates.push(path.resolve(process.cwd(), 'GeoLite2-Country.mmdb'));
  
  // Check in public folder (fallback)
  candidates.push(path.resolve(process.cwd(), 'public', 'GeoLite2-Country.mmdb'));
  
  // Check in Utils folder (if copied)
  candidates.push(path.resolve(process.cwd(), 'Utils', 'GeoLite2-Country.mmdb'));
  
  // Check backend Utils folder (fallback for development)
  candidates.push(path.resolve(process.cwd(), '..', 'flashfire-backend', 'Utils', 'GeoLite2-Country.mmdb'));

  for (const p of candidates) {
    try {
      if (p && fs.existsSync(p)) {
        return p;
      }
    } catch (_) {
      // ignore
    }
  }

  return null;
}

export async function initGeoIp(): Promise<void> {
  try {
    const dbPath = resolveDatabasePath();
    if (!dbPath) {
      console.warn('[GeoIP] Database not found. Set GEOIP_DB_PATH or place GeoLite2-Country.mmdb in public folder. Falling back to default.');
      return;
    }
    const buffer = fs.readFileSync(dbPath);
    geoReader = (await Reader.openBuffer(buffer)) as GeoIPReader;
    console.log(`✅ [GeoIP] Database loaded from: ${dbPath}`);
  } catch (error: any) {
    console.error('❌ [GeoIP] Failed to load database:', error.message);
  }
}

export function getClientIp(headers: Headers): string | null {
  // Check various headers for IP
  const forwarded = headers.get('x-forwarded-for');
  const realIp = headers.get('x-real-ip');
  const cfIp = headers.get('cf-connecting-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  if (realIp) {
    return realIp;
  }
  if (cfIp) {
    return cfIp;
  }
  
  return null;
}

export function detectCountryFromIp(ip: string | null): { countryCode: string; country: string } {
  if (!ip) {
    console.warn('[GeoIP] No IP found on request; returning default US');
    return { countryCode: 'US', country: 'United States' };
  }

  // Normalize IPv6-mapped IPv4
  const normalizedIp = ip.replace('::ffff:', '');

  // Cleanup expired cache entries lazily
  const now = Date.now();
  const cached = ipCache.get(normalizedIp);
  if (cached && cached.expiresAt > now) {
    console.log(`[GeoIP] Cache hit for ${normalizedIp}: ${cached.countryCode}`);
    return { countryCode: cached.countryCode, country: cached.country };
  }

  let result: { countryCode: string; country: string } = { countryCode: 'US', country: 'United States' };

  if (geoReader) {
    try {
      const lookup = geoReader.country(normalizedIp);
      if (lookup?.country) {
        result = {
          countryCode: lookup.country.isoCode || 'US',
          country: lookup.country.names?.en || lookup.country.isoCode || 'United States'
        };
        console.log(`[GeoIP] Lookup for ${normalizedIp}: ${result.countryCode}`);
      }
    } catch (e: any) {
      // localhost or unroutable IPs will often throw
      if (normalizedIp === '127.0.0.1' || normalizedIp === '::1' || normalizedIp === 'localhost') {
        result = { countryCode: 'US', country: 'United States (Local)' };
      } else {
        console.warn('[GeoIP] Lookup error:', normalizedIp, e.message);
      }
    }
  } else {
    // No DB: treat localhost specially
    if (normalizedIp === '127.0.0.1' || normalizedIp === '::1' || normalizedIp === 'localhost') {
      result = { countryCode: 'US', country: 'United States (Local)' };
    }
  }

  ipCache.set(normalizedIp, { ...result, expiresAt: now + TTL_MS });
  console.log(`[GeoIP] Cache store ${normalizedIp} -> ${result.countryCode} (ttl ${TTL_MS / (60*60*1000)}h)`);
  return result;
}

// Initialize on module load (for API routes)
if (typeof window === 'undefined') {
  initGeoIp().catch(console.error);
}

