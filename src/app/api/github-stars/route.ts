import { NextResponse } from 'next/server';
import { SecurityLogger } from '@/lib/security';

// Disable static generation for this route to prevent caching issues
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Use environment variable or fallback to hardcoded repo
const REPO_URL = 'https://api.github.com/repos/chigili/ai-portfolio';

export const GET = async (request: Request) => {
  const clientIP = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
                   request.headers.get('x-real-ip') || 'unknown';
  const userAgent = request.headers.get('user-agent') || '';
  
  try {
    const response = await fetch(REPO_URL, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'ai-portfolio-app',
        ...(process.env.GITHUB_TOKEN && {
          'Authorization': `token ${process.env.GITHUB_TOKEN}`
        })
      },
      next: { revalidate: 300 } // Cache for 5 minutes
    });

    if (!response.ok) {
      throw new Error(`GitHub API responded with ${response.status}`);
    }

    const data = await response.json();
    const stars = data.stargazers_count || 1;
    
    // Log successful API call
    SecurityLogger.log({
      type: 'GITHUB_API_SUCCESS',
      severity: 'LOW',
      message: 'GitHub stars retrieved successfully',
      clientIP,
      userAgent,
      endpoint: '/api/github-stars',
    });
    
    return NextResponse.json({
      success: true,
      data: { stars },
      message: 'Stars retrieved successfully',
      status: 200
    });
  } catch (error) {
    console.error('GitHub API error:', error);
    
    // Security logging for errors
    SecurityLogger.log({
      type: 'EXTERNAL_API_ERROR',
      severity: 'MEDIUM',
      message: `GitHub API error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      clientIP,
      userAgent,
      endpoint: '/api/github-stars',
      details: {
        errorType: typeof error,
        errorName: error instanceof Error ? error.name : 'Unknown',
      },
    });
    
    // Return a fallback value instead of failing completely
    return NextResponse.json({
      success: true,
      data: { stars: 1 },
      message: 'Using fallback star count',
      status: 200
    });
  }
};