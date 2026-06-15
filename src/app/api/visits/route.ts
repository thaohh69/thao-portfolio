import { NextRequest, NextResponse } from 'next/server';
import { SecurityLogger, attackDetector, SuspiciousActivityType } from '@/lib/security';
import { getClientIP } from '@/lib/api';

// Extend global to include visit tracker
declare global {
  var visitTracker: Map<string, number> | undefined;
}

// In-memory counter for demo purposes
// In production, this would use a database like Redis, PostgreSQL, or Firebase
let visitCount = 12847; // Starting with a reasonable number for professional appearance

export const GET = async () => {
  return NextResponse.json({
    success: true,
    data: { count: visitCount },
    message: 'Visit count retrieved successfully',
    status: 200
  });
};

export const POST = async (request: NextRequest) => {
  const clientIP = getClientIP(request);
  const userAgent = request.headers.get('user-agent') || '';
  
  try {
    // Security: Check if IP is blocked
    if (attackDetector.isIPBlocked(clientIP)) {
      SecurityLogger.log({
        type: 'BLOCKED_REQUEST',
        severity: 'HIGH',
        message: 'Request from blocked IP to visits endpoint',
        clientIP,
        userAgent,
        endpoint: '/api/visits',
      });
      return NextResponse.json({
        success: false,
        error: 'Access denied',
        status: 403
      }, { status: 403 });
    }

    // Enhanced bot detection
    const isBot = /bot|crawler|spider|crawling|facebookexternalhit|twitterbot|linkedinbot/i.test(userAgent);
    const now = Date.now();
    
    // Simple in-memory tracking (will reset on deployment, but better than nothing)
    if (!global.visitTracker) {
      global.visitTracker = new Map();
    }
    
    const lastVisit = global.visitTracker.get(clientIP) || 0;
    const cooldownInMs = 30 * 60 * 1000; // 30 minutes instead of 1 hour for better responsiveness
    const shouldIncrement = !isBot && (now - lastVisit > cooldownInMs);
    
    let incremented = false;
    if (shouldIncrement) {
      visitCount += 1;
      global.visitTracker.set(clientIP, now);
      incremented = true;
      
      // Log successful visit
      SecurityLogger.log({
        type: 'VISIT_RECORDED',
        severity: 'LOW',
        message: 'Visit count incremented',
        clientIP,
        userAgent,
        endpoint: '/api/visits',
      });
    } else if (isBot) {
      // Report bot activity but don't block (bots are normal for SEO)
      SecurityLogger.log({
        type: 'BOT_VISIT',
        severity: 'LOW',
        message: 'Bot visit detected',
        clientIP,
        userAgent,
        endpoint: '/api/visits',
        details: { botPattern: userAgent },
      });
    }
    
    return NextResponse.json({
      success: true,
      data: { 
        count: visitCount,
        incremented,
        clientIP: process.env.NODE_ENV === 'development' ? (request as any).ip : undefined
      },
      message: `Visit ${incremented ? 'recorded' : (isBot ? 'detected as bot' : 'cooldown active')}`,
      status: 200
    });
  } catch (error) {
    // Security logging for errors
    SecurityLogger.log({
      type: 'API_ERROR',
      severity: 'MEDIUM',
      message: `Visits API error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      clientIP,
      userAgent,
      endpoint: '/api/visits',
      details: {
        errorType: typeof error,
        errorName: error instanceof Error ? error.name : 'Unknown',
      },
    });
    
    return NextResponse.json({
      success: false,
      error: 'Failed to process visit',
      status: 500
    }, { status: 500 });
  }
};