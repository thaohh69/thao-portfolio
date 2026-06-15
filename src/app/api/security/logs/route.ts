import { NextRequest, NextResponse } from 'next/server';
import { SecurityLogger } from '@/lib/security';

// This endpoint is for debugging and monitoring purposes only
// In production, you should secure this endpoint or remove it entirely

export const GET = async (request: NextRequest) => {
  // Basic authentication check (you should implement proper auth)
  const authHeader = request.headers.get('authorization');
  const expectedAuth = process.env.SECURITY_LOGS_TOKEN;
  
  if (process.env.NODE_ENV === 'production') {
    if (!authHeader || !expectedAuth || authHeader !== `Bearer ${expectedAuth}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
  }

  try {
    const limit = parseInt(request.nextUrl.searchParams.get('limit') || '100');
    const logs = SecurityLogger.getRecentLogs(limit);
    
    return NextResponse.json({
      success: true,
      data: {
        logs,
        total: logs.length,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Error fetching security logs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch security logs' },
      { status: 500 }
    );
  }
};

export const DELETE = async (request: NextRequest) => {
  // Basic authentication check
  const authHeader = request.headers.get('authorization');
  const expectedAuth = process.env.SECURITY_LOGS_TOKEN;
  
  if (!authHeader || !expectedAuth || authHeader !== `Bearer ${expectedAuth}`) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  // This would clear logs - implement with caution
  return NextResponse.json({
    success: false,
    message: 'Log clearing not implemented for security reasons'
  }, { status: 501 });
};