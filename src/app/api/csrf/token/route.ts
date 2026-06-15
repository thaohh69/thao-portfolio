import { NextRequest, NextResponse } from 'next/server';
import { CSRFTokenManager } from '@/lib/security';
import crypto from 'crypto';

export const GET = async (request: NextRequest) => {
  try {
    // Generate a session ID based on client info
    // In a real app, you'd use actual session management
    const clientIP = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
                     request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || '';
    
    // Create a pseudo-session ID (in production, use proper session management)
    const sessionId = crypto
      .createHash('sha256')
      .update(`${clientIP}-${userAgent}-${Date.now()}`)
      .digest('hex')
      .substring(0, 16);

    const token = CSRFTokenManager.generateToken(sessionId);

    const response = NextResponse.json({
      success: true,
      data: { token, sessionId },
      message: 'CSRF token generated',
    });

    // Set the session ID in a secure cookie
    response.cookies.set('session-id', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 60, // 30 minutes
    });

    return response;
  } catch (error) {
    console.error('Error generating CSRF token:', error);
    return NextResponse.json(
      { error: 'Failed to generate CSRF token' },
      { status: 500 }
    );
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const { token } = await request.json();
    const sessionId = request.cookies.get('session-id')?.value;

    if (!token || !sessionId) {
      return NextResponse.json(
        { error: 'Missing token or session' },
        { status: 400 }
      );
    }

    const isValid = CSRFTokenManager.validateToken(token, sessionId);

    return NextResponse.json({
      success: true,
      data: { valid: isValid },
      message: isValid ? 'Token is valid' : 'Token is invalid',
    });
  } catch (error) {
    console.error('Error validating CSRF token:', error);
    return NextResponse.json(
      { error: 'Failed to validate CSRF token' },
      { status: 500 }
    );
  }
};