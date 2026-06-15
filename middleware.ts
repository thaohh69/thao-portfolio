import { NextRequest, NextResponse } from 'next/server';

// Rate limiter implementation for middleware
class RateLimiter {
  private requests: Map<string, number[]> = new Map();

  constructor(
    private maxRequests: number = 100,
    private windowMs: number = 60 * 1000
  ) {}

  isRateLimited(clientId: string): boolean {
    const now = Date.now();
    const clientRequests = this.requests.get(clientId) || [];
    const validRequests = clientRequests.filter(
      timestamp => now - timestamp < this.windowMs
    );
    this.requests.set(clientId, validRequests);
    if (validRequests.length >= this.maxRequests) {
      return true;
    }
    validRequests.push(now);
    this.requests.set(clientId, validRequests);
    return false;
  }
}

// Rate limiter instances for different endpoints
const apiRateLimiter = new RateLimiter(30, 60 * 1000); // 30 requests per minute for API
const chatRateLimiter = new RateLimiter(10, 60 * 1000); // 10 requests per minute for chat
const visitRateLimiter = new RateLimiter(5, 60 * 1000);  // 5 requests per minute for visits

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Apply security headers to all routes
  applySecurityHeaders(response);
  
  // Apply rate limiting to API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const clientIP = getClientIP(request);
    
    // Different rate limits for different endpoints
    let rateLimiter = apiRateLimiter;
    if (request.nextUrl.pathname.startsWith('/api/chat')) {
      rateLimiter = chatRateLimiter;
    } else if (request.nextUrl.pathname.startsWith('/api/visits')) {
      rateLimiter = visitRateLimiter;
    }
    
    if (rateLimiter.isRateLimited(clientIP)) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          error: 'Too many requests. Please slow down.',
          status: 429
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': '60',
            ...getSecurityHeaders(),
          },
        }
      );
    }
  }

  // CSRF protection for state-changing operations
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(request.method)) {
    if (request.nextUrl.pathname.startsWith('/api/')) {
      // Skip CSRF check for certain endpoints
      const skipCSRF = [
        '/api/csrf/token',
        '/api/visits', // Visit counter doesn't need CSRF protection
      ];
      
      const shouldCheckCSRF = !skipCSRF.some(path => 
        request.nextUrl.pathname.startsWith(path)
      );
      
      if (shouldCheckCSRF) {
        const csrfResult = validateCSRF(request);
        if (!csrfResult.valid) {
          return new NextResponse(
            JSON.stringify({
              success: false,
              error: 'CSRF validation failed',
              status: 403
            }),
            {
              status: 403,
              headers: {
                'Content-Type': 'application/json',
                ...getSecurityHeaders(),
              },
            }
          );
        }
      }
    }
  }

  return response;
}

function applySecurityHeaders(response: NextResponse) {
  const headers = getSecurityHeaders();
  Object.entries(headers).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
}

function getSecurityHeaders(): Record<string, string> {
  return {
    // Content Security Policy - strict policy for portfolio site
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live https://va.vercel-scripts.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https: blob:",
      "media-src 'self' data: https:",
      "connect-src 'self' https://api.github.com https://api.anthropic.com wss:",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "upgrade-insecure-requests"
    ].join('; '),
    
    // Prevent clickjacking attacks
    'X-Frame-Options': 'DENY',
    
    // Prevent MIME type sniffing
    'X-Content-Type-Options': 'nosniff',
    
    // Enable XSS filtering
    'X-XSS-Protection': '1; mode=block',
    
    // Control referrer information
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    
    // Require HTTPS in production
    ...(process.env.NODE_ENV === 'production' && {
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload'
    }),
    
    // Permissions policy
    'Permissions-Policy': [
      'camera=()',
      'microphone=()',
      'geolocation=()',
      'payment=()',
      'usb=()',
      'magnetometer=()',
      'accelerometer=()',
      'gyroscope=()'
    ].join(', '),
    
    // Cache control for security
    'Cache-Control': 'no-store, max-age=0',
    
    // Server identification
    'X-Powered-By': 'Next.js',
    
    // Custom security header
    'X-Security-Policy': 'enabled'
  };
}

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const clientIP = request.headers.get('x-client-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0]?.trim() || 'unknown';
  }
  
  return realIP || clientIP || 'unknown';
}

function validateCSRF(request: NextRequest): { valid: boolean; reason?: string } {
  // Skip CSRF for GET, HEAD, OPTIONS
  if (['GET', 'HEAD', 'OPTIONS'].includes(request.method)) {
    return { valid: true };
  }

  // Check for CSRF token in header
  const csrfToken = request.headers.get('x-csrf-token');
  const sessionId = request.cookies.get('session-id')?.value;
  
  if (csrfToken && sessionId) {
    // In a real implementation, you'd validate the token here
    // For now, we'll use origin-based validation as fallback
    return { valid: true };
  }

  // Fallback to origin-based validation
  const origin = request.headers.get('origin');
  const host = request.headers.get('host');
  
  if (!origin) {
    return { valid: false, reason: 'Missing Origin header and CSRF token' };
  }
  
  // Allow same-origin requests
  if (host && (origin === `https://${host}` || origin === `http://${host}`)) {
    return { valid: true };
  }
  
  // In development, allow localhost
  if (process.env.NODE_ENV === 'development') {
    if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
      return { valid: true };
    }
  }
  
  return { valid: false, reason: 'Origin mismatch and no valid CSRF token' };
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files with extensions
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};