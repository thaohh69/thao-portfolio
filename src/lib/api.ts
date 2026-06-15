/**
 * API Utilities
 * 
 * Centralized API client with consistent error handling, response formatting,
 * and request/response interceptors for the application.
 */

import { NextResponse } from 'next/server';

/**
 * Standard API response interface
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  status?: number;
}

/**
 * API error types
 */
export enum ApiErrorType {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  RATE_LIMITED = 'RATE_LIMITED',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  EXTERNAL_API_ERROR = 'EXTERNAL_API_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
}

/**
 * Custom API error class with enhanced error information
 * 
 * @example
 * ```typescript
 * throw new ApiError(
 *   'Resource not found',
 *   ApiErrorType.NOT_FOUND,
 *   404,
 *   { resourceId: 'user-123' }
 * );
 * ```
 */
export class ApiError extends Error {
  public type: ApiErrorType;
  public status: number;
  public details?: Record<string, unknown>;

  constructor(
    message: string,
    type: ApiErrorType = ApiErrorType.INTERNAL_ERROR,
    status: number = 500,
    details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'ApiError';
    this.type = type;
    this.status = status;
    this.details = details;
  }
}

/**
 * HTTP client configuration
 */
export interface HttpClientConfig {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
  retries?: number;
  retryDelay?: number;
}

/**
 * Request options interface
 */
export interface RequestOptions extends RequestInit {
  timeout?: number;
  retries?: number;
  retryDelay?: number;
}

/**
 * Default configuration
 */
const DEFAULT_CONFIG: HttpClientConfig = {
  timeout: 10000, // 10 seconds
  retries: 3,
  retryDelay: 1000, // 1 second
  headers: {
    'Content-Type': 'application/json',
  },
};

/**
 * Creates a standardized API success response
 * 
 * @param data - Response data
 * @param message - Optional success message
 * @param status - HTTP status code
 * @returns NextResponse with standardized format
 */
export function createSuccessResponse<T>(
  data: T,
  message?: string,
  status: number = 200
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      message,
      status,
    },
    { 
      status,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      }
    }
  );
}

/**
 * Creates a standardized API error response
 * 
 * @param error - Error message or ApiError instance
 * @param status - HTTP status code
 * @param details - Optional error details
 * @returns NextResponse with standardized error format
 */
export function createErrorResponse(
  error: string | ApiError,
  status: number = 500,
  details?: Record<string, unknown>
): NextResponse<ApiResponse> {
  const errorMessage = error instanceof ApiError ? error.message : error;
  const errorStatus = error instanceof ApiError ? error.status : status;
  const errorDetails = error instanceof ApiError ? error.details : details;

  return NextResponse.json(
    {
      success: false,
      error: errorMessage,
      status: errorStatus,
      ...(errorDetails && { details: errorDetails }),
    },
    { 
      status: errorStatus,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      }
    }
  );
}

/**
 * Sleep utility for retry delays
 */
const sleep = (ms: number): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms));

/**
 * HTTP Client class with built-in retry logic and error handling
 * 
 * Features:
 * - Automatic retry with exponential backoff
 * - Request/response interceptors
 * - Timeout handling
 * - Error classification and handling
 * - TypeScript support with generics
 * 
 * @example
 * ```typescript
 * const client = new HttpClient({
 *   baseURL: 'https://api.example.com',
 *   timeout: 5000,
 *   retries: 3
 * });
 * 
 * const data = await client.get<UserData>('/users/123');
 * const result = await client.post<ApiResponse>('/users', userData);
 * ```
 */
export class HttpClient {
  private config: HttpClientConfig;

  constructor(config: Partial<HttpClientConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * Makes an HTTP request with retry logic
   * 
   * @param url - Request URL
   * @param options - Request options
   * @returns Promise with response data
   */
  private async request<T>(
    url: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const {
      timeout = this.config.timeout,
      retries = this.config.retries,
      retryDelay = this.config.retryDelay,
      ...fetchOptions
    } = options;

    // Merge headers
    const headers = {
      ...this.config.headers,
      ...fetchOptions.headers,
    };

    // Create full URL
    const fullUrl = this.config.baseURL 
      ? `${this.config.baseURL}${url}` 
      : url;

    let lastError: Error = new Error('Max retries exceeded');

    for (let attempt = 0; attempt <= (retries || 0); attempt++) {
      try {
        // Create abort controller for timeout
        const controller = new AbortController();
        const timeoutId = timeout ? setTimeout(() => controller.abort(), timeout) : null;

        const response = await fetch(fullUrl, {
          ...fetchOptions,
          headers,
          signal: controller.signal,
        });

        if (timeoutId) clearTimeout(timeoutId);

        if (!response.ok) {
          throw new ApiError(
            `HTTP ${response.status}: ${response.statusText}`,
            this.getErrorTypeFromStatus(response.status),
            response.status
          );
        }

        const data = await response.json();
        return data;

      } catch (error) {
        lastError = error as Error;

        // Don't retry on certain errors
        if (error instanceof ApiError) {
          if ([401, 403, 404, 422].includes(error.status)) {
            throw error;
          }
        }

        // Don't retry on last attempt
        if (attempt === (retries || 0)) {
          break;
        }

        // Wait before retry
        if (retryDelay) {
          await sleep(retryDelay * Math.pow(2, attempt)); // Exponential backoff
        }
      }
    }

    throw lastError;
  }

  /**
   * Maps HTTP status codes to error types
   */
  private getErrorTypeFromStatus(status: number): ApiErrorType {
    switch (status) {
      case 400:
        return ApiErrorType.VALIDATION_ERROR;
      case 401:
        return ApiErrorType.UNAUTHORIZED;
      case 403:
        return ApiErrorType.FORBIDDEN;
      case 404:
        return ApiErrorType.NOT_FOUND;
      case 429:
        return ApiErrorType.RATE_LIMITED;
      default:
        return ApiErrorType.EXTERNAL_API_ERROR;
    }
  }

  /**
   * GET request
   */
  async get<T>(url: string, options: Omit<RequestOptions, 'method' | 'body'> = {}): Promise<T> {
    return this.request<T>(url, { ...options, method: 'GET' });
  }

  /**
   * POST request
   */
  async post<T>(
    url: string, 
    data?: Record<string, unknown> | FormData | string, 
    options: Omit<RequestOptions, 'method'> = {}
  ): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * PUT request
   */
  async put<T>(
    url: string, 
    data?: Record<string, unknown> | FormData | string, 
    options: Omit<RequestOptions, 'method'> = {}
  ): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * DELETE request
   */
  async delete<T>(url: string, options: Omit<RequestOptions, 'method' | 'body'> = {}): Promise<T> {
    return this.request<T>(url, { ...options, method: 'DELETE' });
  }

  /**
   * PATCH request
   */
  async patch<T>(
    url: string, 
    data?: Record<string, unknown> | FormData | string, 
    options: Omit<RequestOptions, 'method'> = {}
  ): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }
}

/**
 * Default HTTP client instance
 */
export const httpClient = new HttpClient();

/**
 * GitHub API client with authentication
 */
export const githubClient = new HttpClient({
  baseURL: 'https://api.github.com',
  headers: {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'AI-Portfolio-App',
    ...(process.env.GITHUB_TOKEN && 
        process.env.GITHUB_TOKEN !== 'your_github_token_here' && {
      'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
    }),
  },
});

/**
 * Validates API request body against a schema
 * 
 * @param body - Request body to validate
 * @param requiredFields - Array of required field names
 * @returns Validation result
 */
export function validateRequestBody<T extends Record<string, unknown>>(
  body: unknown,
  requiredFields: (keyof T)[]
): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!body || typeof body !== 'object') {
    errors.push('Request body must be a valid JSON object');
    return { isValid: false, errors };
  }

  for (const field of requiredFields) {
    if (!(field in body) || (body as any)[field] === undefined || (body as any)[field] === null) {
      errors.push(`Field '${String(field)}' is required`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Extracts client IP from request headers
 * 
 * @param request - Next.js request object
 * @returns Client IP address
 */
export function getClientIP(request: Request): string {
  const headers = request.headers;
  return (
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headers.get('x-real-ip') ||
    headers.get('x-client-ip') ||
    'unknown'
  );
}

/**
 * Simple bot detection based on user agent
 * 
 * @param request - Next.js request object
 * @returns True if request appears to be from a bot
 */
export function detectBot(request: Request): boolean {
  const userAgent = request.headers.get('user-agent') || '';
  return /bot|crawler|spider|crawling|scraper/i.test(userAgent);
}

/**
 * Rate limiting utilities
 */
export class RateLimiter {
  private requests: Map<string, number[]> = new Map();

  constructor(
    private maxRequests: number = 100,
    private windowMs: number = 60 * 1000 // 1 minute
  ) {}

  /**
   * Check if a client has exceeded rate limits
   * 
   * @param clientId - Client identifier (usually IP address)
   * @returns True if client is rate limited
   */
  isRateLimited(clientId: string): boolean {
    const now = Date.now();
    const clientRequests = this.requests.get(clientId) || [];

    // Remove old requests outside the window
    const validRequests = clientRequests.filter(
      timestamp => now - timestamp < this.windowMs
    );

    // Update the requests array
    this.requests.set(clientId, validRequests);

    // Check if limit exceeded
    if (validRequests.length >= this.maxRequests) {
      return true;
    }

    // Add current request
    validRequests.push(now);
    this.requests.set(clientId, validRequests);

    return false;
  }

  /**
   * Get remaining requests for a client
   * 
   * @param clientId - Client identifier
   * @returns Number of remaining requests
   */
  getRemainingRequests(clientId: string): number {
    const clientRequests = this.requests.get(clientId) || [];
    return Math.max(0, this.maxRequests - clientRequests.length);
  }
}

/**
 * Default rate limiter instance
 */
export const defaultRateLimiter = new RateLimiter();

/**
 * Wraps an API handler with error handling
 * 
 * @param handler - API handler function
 * @returns Wrapped handler with error handling
 */
export function withErrorHandling<T extends unknown[], R>(
  handler: (...args: T) => Promise<R>
) {
  return async (...args: T): Promise<R | NextResponse<ApiResponse>> => {
    try {
      return await handler(...args);
    } catch (error) {
      console.error('API Error:', error);

      if (error instanceof ApiError) {
        return createErrorResponse(error);
      }

      return createErrorResponse(
        'Internal server error',
        500,
        process.env.NODE_ENV === 'development' ? (error as Record<string, unknown>) : undefined
      );
    }
  };
}