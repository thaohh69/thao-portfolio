import { NextRequest, NextResponse } from 'next/server';
import { attackDetector } from '@/lib/security';
import { getClientIP } from '@/lib/api';

// Debug endpoint to check security status - REMOVE IN PRODUCTION
export const GET = async (request: NextRequest) => {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 404 });
  }

  const clientIP = getClientIP(request);
  
  return NextResponse.json({
    success: true,
    data: {
      clientIP,
      isBlocked: attackDetector.isIPBlocked(clientIP),
      environment: process.env.NODE_ENV,
    },
  });
};

// Debug endpoint to reset blocked IPs - REMOVE IN PRODUCTION  
export const POST = async (request: NextRequest) => {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 404 });
  }

  const { action } = await request.json();
  
  if (action === 'reset') {
    // Clear blocked IPs (this is a hack for development)
    (attackDetector as any).blockedIPs.clear();
    (attackDetector as any).suspiciousIPs.clear();
    
    return NextResponse.json({
      success: true,
      message: 'Blocked IPs cleared for development',
    });
  }

  return NextResponse.json({
    success: false,
    error: 'Invalid action',
  });
};