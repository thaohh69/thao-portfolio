/**
 * Security Tests
 * 
 * Comprehensive test suite for security utilities and attack prevention
 */

import { 
  RateLimiter, 
  AttackDetector, 
  InputSecurityAnalyzer,
  SuspiciousActivityType 
} from '../security';

describe('RateLimiter', () => {
  let rateLimiter: RateLimiter;

  beforeEach(() => {
    rateLimiter = new RateLimiter(3, 1000); // 3 requests per second
  });

  afterEach(() => {
    rateLimiter.destroy();
  });

  test('allows requests under limit', () => {
    expect(rateLimiter.isRateLimited('client1')).toBe(false);
    expect(rateLimiter.isRateLimited('client1')).toBe(false);
    expect(rateLimiter.isRateLimited('client1')).toBe(false);
  });

  test('blocks requests over limit', () => {
    rateLimiter.isRateLimited('client1'); // 1
    rateLimiter.isRateLimited('client1'); // 2
    rateLimiter.isRateLimited('client1'); // 3
    expect(rateLimiter.isRateLimited('client1')).toBe(true); // 4th should be blocked
  });

  test('tracks different clients separately', () => {
    rateLimiter.isRateLimited('client1');
    rateLimiter.isRateLimited('client1');
    rateLimiter.isRateLimited('client1');
    
    // client2 should not be affected
    expect(rateLimiter.isRateLimited('client2')).toBe(false);
  });

  test('resets after time window', async () => {
    const shortLimiter = new RateLimiter(1, 100); // 1 request per 100ms
    
    expect(shortLimiter.isRateLimited('client1')).toBe(false);
    expect(shortLimiter.isRateLimited('client1')).toBe(true);
    
    // Wait for window to reset
    await new Promise(resolve => setTimeout(resolve, 150));
    
    expect(shortLimiter.isRateLimited('client1')).toBe(false);
    shortLimiter.destroy();
  });

  test('returns correct remaining requests', () => {
    expect(rateLimiter.getRemainingRequests('client1')).toBe(3);
    rateLimiter.isRateLimited('client1');
    expect(rateLimiter.getRemainingRequests('client1')).toBe(2);
  });
});

describe('AttackDetector', () => {
  let detector: AttackDetector;

  beforeEach(() => {
    detector = new AttackDetector(3, 1000); // Block after 3 suspicious activities
  });

  test('tracks suspicious activities', () => {
    detector.reportSuspiciousActivity('ip1', SuspiciousActivityType.XSS_ATTEMPT);
    detector.reportSuspiciousActivity('ip1', SuspiciousActivityType.SQL_INJECTION_ATTEMPT);
    
    expect(detector.isIPBlocked('ip1')).toBe(false); // Not blocked yet
    
    detector.reportSuspiciousActivity('ip1', SuspiciousActivityType.RATE_LIMIT_EXCEEDED);
    
    expect(detector.isIPBlocked('ip1')).toBe(true); // Should be blocked now
  });

  test('does not block different IPs', () => {
    detector.reportSuspiciousActivity('ip1', SuspiciousActivityType.XSS_ATTEMPT);
    detector.reportSuspiciousActivity('ip1', SuspiciousActivityType.SQL_INJECTION_ATTEMPT);
    detector.reportSuspiciousActivity('ip1', SuspiciousActivityType.CSRF_VIOLATION);
    
    expect(detector.isIPBlocked('ip1')).toBe(true);
    expect(detector.isIPBlocked('ip2')).toBe(false);
  });

  test('blocks high severity activities quickly', () => {
    // XSS attempts have high severity (score 3)
    detector.reportSuspiciousActivity('ip1', SuspiciousActivityType.XSS_ATTEMPT);
    
    expect(detector.isIPBlocked('ip1')).toBe(true);
  });
});

describe('InputSecurityAnalyzer', () => {
  describe('XSS Detection', () => {
    test('detects script tags', () => {
      const input = '<script>alert("xss")</script>';
      const result = InputSecurityAnalyzer.analyzeInput(input);
      
      expect(result.safe).toBe(false);
      expect(result.threats).toHaveLength(1);
      expect(result.threats[0].type).toBe('XSS');
      expect(result.threats[0].severity).toBe('HIGH');
    });

    test('detects javascript: protocol', () => {
      const input = 'Click here: javascript:alert("xss")';
      const result = InputSecurityAnalyzer.analyzeInput(input);
      
      expect(result.safe).toBe(false);
      expect(result.threats.some(t => t.type === 'XSS')).toBe(true);
    });

    test('detects event handlers', () => {
      const input = '<img src="x" onerror="alert(\'xss\')">';
      const result = InputSecurityAnalyzer.analyzeInput(input);
      
      expect(result.safe).toBe(false);
      expect(result.threats.some(t => t.type === 'XSS')).toBe(true);
    });

    test('allows safe HTML-like content', () => {
      const input = 'I love <3 programming and HTML tags like <div> are cool';
      const result = InputSecurityAnalyzer.analyzeInput(input);
      
      expect(result.safe).toBe(true);
      expect(result.threats).toHaveLength(0);
    });
  });

  describe('SQL Injection Detection', () => {
    test('detects basic SQL injection', () => {
      const input = "admin'; DROP TABLE users; --";
      const result = InputSecurityAnalyzer.analyzeInput(input);
      
      expect(result.safe).toBe(false);
      expect(result.threats.some(t => t.type === 'SQL_INJECTION')).toBe(true);
    });

    test('detects UNION attacks', () => {
      const input = "1 UNION SELECT password FROM users";
      const result = InputSecurityAnalyzer.analyzeInput(input);
      
      expect(result.safe).toBe(false);
      expect(result.threats.some(t => t.type === 'SQL_INJECTION')).toBe(true);
    });

    test('allows normal text with SQL keywords', () => {
      const input = "I want to select the best database for my project";
      const result = InputSecurityAnalyzer.analyzeInput(input);
      
      expect(result.safe).toBe(true);
      expect(result.threats).toHaveLength(0);
    });
  });

  describe('Command Injection Detection', () => {
    test('detects shell metacharacters', () => {
      const input = 'test && rm -rf /';
      const result = InputSecurityAnalyzer.analyzeInput(input);
      
      expect(result.safe).toBe(false);
      expect(result.threats.some(t => t.type === 'COMMAND_INJECTION')).toBe(true);
    });

    test('detects dangerous functions', () => {
      const input = 'eval("malicious code")';
      const result = InputSecurityAnalyzer.analyzeInput(input);
      
      expect(result.safe).toBe(false);
      expect(result.threats.some(t => t.type === 'COMMAND_INJECTION')).toBe(true);
    });
  });

  describe('Oversized Input Detection', () => {
    test('detects extremely long inputs', () => {
      const input = 'a'.repeat(15000);
      const result = InputSecurityAnalyzer.analyzeInput(input);
      
      expect(result.safe).toBe(false);
      expect(result.threats.some(t => t.type === 'OVERSIZED_INPUT')).toBe(true);
    });

    test('allows reasonable length inputs', () => {
      const input = 'This is a reasonable length message for testing';
      const result = InputSecurityAnalyzer.analyzeInput(input);
      
      expect(result.safe).toBe(true);
    });
  });

  describe('Risk Score Calculation', () => {
    test('calculates correct risk scores', () => {
      // High severity threat
      const highRiskInput = '<script>alert("xss")</script>';
      const highRiskResult = InputSecurityAnalyzer.analyzeInput(highRiskInput);
      expect(highRiskResult.riskScore).toBeGreaterThanOrEqual(5);

      // Multiple threats
      const multiThreatInput = '<script>alert("xss")</script> AND 1=1; DROP TABLE users;';
      const multiThreatResult = InputSecurityAnalyzer.analyzeInput(multiThreatInput);
      expect(multiThreatResult.riskScore).toBeGreaterThan(highRiskResult.riskScore);
    });
  });

  describe('Edge Cases', () => {
    test('handles empty input', () => {
      const result = InputSecurityAnalyzer.analyzeInput('');
      expect(result.safe).toBe(true);
      expect(result.threats).toHaveLength(0);
    });

    test('handles special characters safely', () => {
      const input = '!@#$%^&*()_+-=[]{}|;:,.<>?';
      const result = InputSecurityAnalyzer.analyzeInput(input);
      expect(result.safe).toBe(true);
    });

    test('handles Unicode characters', () => {
      const input = '你好世界 🌍 Привет мир';
      const result = InputSecurityAnalyzer.analyzeInput(input);
      expect(result.safe).toBe(true);
    });
  });
});