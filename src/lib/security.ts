/**
 * Security Utilities
 * 
 * Comprehensive security utilities including rate limiting, input validation,
 * attack detection, and security monitoring for the application.
 */

import crypto from 'crypto';

/**
 * Advanced Rate Limiter with sliding window and memory management
 */
export class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private cleanupInterval: NodeJS.Timeout;

  constructor(
    private maxRequests: number = 100,
    private windowMs: number = 60 * 1000, // 1 minute
    private cleanupIntervalMs: number = 5 * 60 * 1000 // 5 minutes
  ) {
    // Periodic cleanup of old entries to prevent memory leaks
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, this.cleanupIntervalMs);
  }

  /**
   * Check if a client has exceeded rate limits
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
   */
  getRemainingRequests(clientId: string): number {
    const now = Date.now();
    const clientRequests = this.requests.get(clientId) || [];
    const validRequests = clientRequests.filter(
      timestamp => now - timestamp < this.windowMs
    );
    return Math.max(0, this.maxRequests - validRequests.length);
  }

  /**
   * Get time until next request is allowed
   */
  getTimeUntilReset(clientId: string): number {
    const clientRequests = this.requests.get(clientId) || [];
    if (clientRequests.length === 0) return 0;
    
    const oldestRequest = Math.min(...clientRequests);
    const resetTime = oldestRequest + this.windowMs;
    return Math.max(0, resetTime - Date.now());
  }

  /**
   * Clean up old entries to prevent memory leaks
   */
  private cleanup(): void {
    const now = Date.now();
    const cutoff = now - this.windowMs * 2; // Keep some extra buffer
    
    for (const [clientId, requests] of this.requests.entries()) {
      const validRequests = requests.filter(timestamp => timestamp > cutoff);
      
      if (validRequests.length === 0) {
        this.requests.delete(clientId);
      } else {
        this.requests.set(clientId, validRequests);
      }
    }
  }

  /**
   * Destroy the rate limiter and cleanup resources
   */
  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
    this.requests.clear();
  }
}

/**
 * Attack Detection System
 */
export class AttackDetector {
  private suspiciousIPs: Map<string, SuspiciousActivity> = new Map();
  private blockedIPs: Set<string> = new Set();

  constructor(
    private suspicionThreshold: number = 8,
    private blockDuration: number = 30 * 60 * 1000 // 30 minutes
  ) {}

  /**
   * Report suspicious activity
   */
  reportSuspiciousActivity(
    clientIP: string, 
    activityType: SuspiciousActivityType, 
    details?: string
  ): void {
    if (!this.suspiciousIPs.has(clientIP)) {
      this.suspiciousIPs.set(clientIP, {
        activities: [],
        score: 0,
        firstSeen: Date.now(),
        lastSeen: Date.now(),
      });
    }

    const activity = this.suspiciousIPs.get(clientIP)!;
    activity.activities.push({
      type: activityType,
      timestamp: Date.now(),
      details,
    });
    activity.score += this.getActivityScore(activityType);
    activity.lastSeen = Date.now();

    // Check if IP should be blocked
    if (activity.score >= this.suspicionThreshold) {
      this.blockIP(clientIP);
    }
  }

  /**
   * Check if an IP is blocked
   */
  isIPBlocked(clientIP: string): boolean {
    return this.blockedIPs.has(clientIP);
  }

  /**
   * Block an IP address
   */
  private blockIP(clientIP: string): void {
    this.blockedIPs.add(clientIP);
    
    // Auto-unblock after duration
    setTimeout(() => {
      this.blockedIPs.delete(clientIP);
      this.suspiciousIPs.delete(clientIP);
    }, this.blockDuration);

    console.warn(`[SECURITY] Blocked IP ${clientIP} due to suspicious activity`);
  }

  /**
   * Get severity score for activity type
   */
  private getActivityScore(type: SuspiciousActivityType): number {
    const scores: Record<SuspiciousActivityType, number> = {
      RATE_LIMIT_EXCEEDED: 1,
      INVALID_INPUT: 0.5,
      CSRF_VIOLATION: 2,
      XSS_ATTEMPT: 3,
      SQL_INJECTION_ATTEMPT: 3,
      MALFORMED_REQUEST: 1,
      SUSPICIOUS_USER_AGENT: 0.5,
      MULTIPLE_FAILED_REQUESTS: 1,
    };
    return scores[type] || 1;
  }

  /**
   * Destroy the attack detector and cleanup resources
   */
  destroy(): void {
    this.suspiciousIPs.clear();
    this.blockedIPs.clear();
  }
}

/**
 * Input Security Analyzer
 */
export class InputSecurityAnalyzer {
  private static XSS_PATTERNS = [
    /<script[^>]*>.*?<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /<iframe[^>]*>/gi,
    /<object[^>]*>/gi,
    /<embed[^>]*>/gi,
    /<link[^>]*>/gi,
    /<meta[^>]*>/gi,
  ];

  private static SQL_PATTERNS = [
    /('|\\')|(;|%3B)|(--)|(\s|\+)+(or|and|union|select|insert|update|delete|drop|create|alter|exec|execute)\s+/gi,
    /\b(union|select|insert|update|delete|drop|create|alter|exec|execute)\b.*\b(from|where|into|values|set|table|database|schema)\b/gi,
  ];

  private static COMMAND_INJECTION_PATTERNS = [
    /[;&|`$(){}[\]\\]/g,
    /\b(eval|exec|system|shell_exec|passthru|proc_open|popen)\b/gi,
  ];

  /**
   * Analyze input for potential security threats
   */
  static analyzeInput(input: string): SecurityAnalysisResult {
    const threats: SecurityThreat[] = [];

    // Check for XSS attempts
    for (const pattern of this.XSS_PATTERNS) {
      if (pattern.test(input)) {
        threats.push({
          type: 'XSS',
          severity: 'HIGH',
          pattern: pattern.source,
        });
      }
    }

    // Check for SQL injection attempts
    for (const pattern of this.SQL_PATTERNS) {
      if (pattern.test(input)) {
        threats.push({
          type: 'SQL_INJECTION',
          severity: 'HIGH',
          pattern: pattern.source,
        });
      }
    }

    // Check for command injection attempts
    for (const pattern of this.COMMAND_INJECTION_PATTERNS) {
      if (pattern.test(input)) {
        threats.push({
          type: 'COMMAND_INJECTION',
          severity: 'HIGH',
          pattern: pattern.source,
        });
      }
    }

    // Check input length (potential DoS)
    if (input.length > 10000) {
      threats.push({
        type: 'OVERSIZED_INPUT',
        severity: 'MEDIUM',
        details: `Input size: ${input.length} characters`,
      });
    }

    return {
      safe: threats.length === 0,
      threats,
      riskScore: this.calculateRiskScore(threats),
    };
  }

  /**
   * Calculate overall risk score
   */
  private static calculateRiskScore(threats: SecurityThreat[]): number {
    const severityScores = { LOW: 1, MEDIUM: 3, HIGH: 5, CRITICAL: 10 };
    return threats.reduce((score, threat) => {
      return score + severityScores[threat.severity];
    }, 0);
  }
}

/**
 * Security Logger for monitoring and alerting
 */
export class SecurityLogger {
  private static logEntries: SecurityLogEntry[] = [];
  private static readonly MAX_LOG_ENTRIES = 1000;

  /**
   * Log a security event
   */
  static log(event: SecurityEvent): void {
    const entry: SecurityLogEntry = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      ...event,
    };

    this.logEntries.unshift(entry);

    // Trim log entries to prevent memory issues
    if (this.logEntries.length > this.MAX_LOG_ENTRIES) {
      this.logEntries = this.logEntries.slice(0, this.MAX_LOG_ENTRIES);
    }

    // Console logging based on severity
    const logMethod = event.severity === 'CRITICAL' ? 'error' : 
                     event.severity === 'HIGH' ? 'warn' : 'info';
    
    console[logMethod](`[SECURITY][${event.type}] ${event.message}`, {
      clientIP: event.clientIP,
      userAgent: event.userAgent,
      details: event.details,
    });

    // In production, you might want to send alerts for critical events
    if (event.severity === 'CRITICAL' && process.env.NODE_ENV === 'production') {
      this.sendSecurityAlert(entry);
    }
  }

  /**
   * Get recent security log entries
   */
  static getRecentLogs(limit: number = 100): SecurityLogEntry[] {
    return this.logEntries.slice(0, limit);
  }

  /**
   * Send security alert (placeholder for real implementation)
   */
  private static sendSecurityAlert(entry: SecurityLogEntry): void {
    // In a real implementation, you might:
    // - Send email notifications
    // - Post to Slack/Discord
    // - Send to monitoring services like DataDog, New Relic
    // - Store in external logging service
    console.error(`[CRITICAL SECURITY ALERT] ${entry.message}`, entry);
  }
}

/**
 * CSRF Token Manager
 */
export class CSRFTokenManager {
  private static tokens: Map<string, CSRFToken> = new Map();
  private static readonly TOKEN_EXPIRY = 30 * 60 * 1000; // 30 minutes

  /**
   * Generate a new CSRF token
   */
  static generateToken(sessionId: string): string {
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = Date.now() + this.TOKEN_EXPIRY;

    this.tokens.set(token, {
      sessionId,
      createdAt: Date.now(),
      expiresAt,
    });

    // Clean up expired tokens
    this.cleanupExpiredTokens();

    return token;
  }

  /**
   * Validate a CSRF token
   */
  static validateToken(token: string, sessionId: string): boolean {
    const tokenData = this.tokens.get(token);
    
    if (!tokenData) {
      return false;
    }

    if (tokenData.expiresAt < Date.now()) {
      this.tokens.delete(token);
      return false;
    }

    if (tokenData.sessionId !== sessionId) {
      return false;
    }

    return true;
  }

  /**
   * Clean up expired tokens
   */
  private static cleanupExpiredTokens(): void {
    const now = Date.now();
    for (const [token, data] of this.tokens.entries()) {
      if (data.expiresAt < now) {
        this.tokens.delete(token);
      }
    }
  }
}

// Type definitions
export enum SuspiciousActivityType {
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  INVALID_INPUT = 'INVALID_INPUT',
  CSRF_VIOLATION = 'CSRF_VIOLATION',
  XSS_ATTEMPT = 'XSS_ATTEMPT',
  SQL_INJECTION_ATTEMPT = 'SQL_INJECTION_ATTEMPT',
  MALFORMED_REQUEST = 'MALFORMED_REQUEST',
  SUSPICIOUS_USER_AGENT = 'SUSPICIOUS_USER_AGENT',
  MULTIPLE_FAILED_REQUESTS = 'MULTIPLE_FAILED_REQUESTS',
}

export interface SuspiciousActivity {
  activities: Array<{
    type: SuspiciousActivityType;
    timestamp: number;
    details?: string;
  }>;
  score: number;
  firstSeen: number;
  lastSeen: number;
}

export interface SecurityAnalysisResult {
  safe: boolean;
  threats: SecurityThreat[];
  riskScore: number;
}

export interface SecurityThreat {
  type: 'XSS' | 'SQL_INJECTION' | 'COMMAND_INJECTION' | 'OVERSIZED_INPUT';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  pattern?: string;
  details?: string;
}

export interface SecurityEvent {
  type: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  message: string;
  clientIP?: string;
  userAgent?: string;
  endpoint?: string;
  details?: Record<string, unknown>;
}

export interface SecurityLogEntry extends SecurityEvent {
  id: string;
  timestamp: string;
}

export interface CSRFToken {
  sessionId: string;
  createdAt: number;
  expiresAt: number;
}

// Global instances
export const attackDetector = new AttackDetector();

// Cleanup on process exit
process.on('exit', () => {
  attackDetector.destroy?.();
});